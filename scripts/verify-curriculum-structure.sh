#!/usr/bin/env bash
# Curriculum structure checks — safe to run at ANY phase tag, before/after scaffold.
# Phase-specific checks only run if that phase's docs exist at the current checkout.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
ERR=0

fail()  { echo "VERIFY FAIL: $*" >&2; ERR=1; }
need()  { [[ -f "$1" ]] || fail "missing $1"; }
skill() { need ".claude/skills/$1/SKILL.md"; }
agent() { need ".claude/agents/$1.md"; }

# ---- Phase 00 (always required) ----
for f in \
  docs/phase-00/STARTER-KIT.md \
  docs/phase-00/README.md \
  docs/phase-00/intention-monorepo.md \
  docs/phase-00/PREREQUISITES.md \
  docs/phase-00/RUN-ORDER.md \
  docs/phase-00/VERIFY.md \
  docs/phase-00/DEMO-GRADE-BAR.md \
  CLAUDE.md \
  ; do need "$f"; done

# Pipeline + convention skills (slash-invoked workflows live at .claude/skills/<name>/SKILL.md)
for s in intention prd plan run-plan monorepo-turbo prd-alignment; do skill "$s"; done
for a in monorepo-builder app-builder-http-workspace app-builder-team-wiki \
         app-builder-pipeline-crm app-builder-ops-pulse; do agent "$a"; done

# ---- Phase 01 (only if present at this checkout) ----
if [[ -d docs/phase-01 ]]; then
  for f in \
    docs/phase-01/README.md docs/phase-01/DEMO-GRADE-BAR.md \
    docs/phase-01/PREREQUISITES.md docs/phase-01/RUN-ORDER.md \
    docs/phase-01/intention-quickbooks-killer.md docs/phase-01/intention-trello-killer.md \
    docs/phase-01/intention-twitter-killer.md docs/phase-01/intention-facebook-killer.md \
    ; do need "$f"; done
  for s in research test-browser surrealdb nextjs-saas ios-swiftui; do skill "$s"; done
  for a in surrealdb-builder nextjs-saas-builder ios-builder saas-researcher; do agent "$a"; done
fi

# ---- Phase 02 (only if present at this checkout) ----
if [[ -d docs/phase-02 ]]; then
  for f in docs/phase-02/README.md docs/phase-02/RUN-ORDER.md; do need "$f"; done
  for s in scan-errors fix-errors monitor harden commit pr-eval \
           web-architecture ios-architecture data-architecture \
           pr-requirements quality-gates; do skill "$s"; done
  for a in error-scanner error-fixer arch-monitor arch-hardener \
           commit-agent pr-evaluator; do agent "$a"; done
fi

# Cursor alignment (only if this checkout ships .cursor/)
if [[ -d .cursor ]]; then
  need .cursor/rules/golfergeek-curriculum.mdc
fi

# If monorepo already scaffolded, expect node
if [[ -f turbo.json ]]; then
  command -v node >/dev/null 2>&1 || fail "turbo.json present but node not in PATH"
fi

if [[ $ERR -ne 0 ]]; then
  echo "Verify finished with errors." >&2
  exit 1
fi
echo "OK: curriculum structure checks passed."
