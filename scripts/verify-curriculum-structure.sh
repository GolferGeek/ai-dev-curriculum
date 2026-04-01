#!/usr/bin/env bash
# Curriculum structure checks — safe to run before/after monorepo scaffold.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
ERR=0

fail() { echo "VERIFY FAIL: $*" >&2; ERR=1; }

# Required curriculum docs
for f in \
  docs/phase-00/STARTER-KIT.md \
  docs/phase-00/README.md \
  docs/phase-00/intention-monorepo.md \
  docs/phase-00/PREREQUISITES.md \
  docs/phase-00/RUN-ORDER.md \
  docs/phase-00/VERIFY.md \
  docs/phase-00/DEMO-GRADE-BAR.md \
  CLAUDE.md \
  ; do
  [[ -f "$f" ]] || fail "missing $f"
done

# Claude Code kit — phase 00
for f in \
  .claude/commands/intention.md \
  .claude/commands/prd.md \
  .claude/commands/plan.md \
  .claude/commands/run-plan.md \
  .claude/skills/monorepo-turbo.md \
  .claude/skills/prd-alignment.md \
  .claude/agents/monorepo-builder.md \
  .claude/agents/app-builder-http-workspace.md \
  .claude/agents/app-builder-team-wiki.md \
  .claude/agents/app-builder-pipeline-crm.md \
  .claude/agents/app-builder-ops-pulse.md \
  ; do
  [[ -f "$f" ]] || fail "missing $f"
done

# Claude Code kit — phase 01
for f in \
  .claude/commands/research.md \
  .claude/commands/test-browser.md \
  .claude/skills/surrealdb.md \
  .claude/skills/nextjs-saas.md \
  .claude/skills/ios-swiftui.md \
  .claude/agents/surrealdb-builder.md \
  .claude/agents/nextjs-saas-builder.md \
  .claude/agents/ios-builder.md \
  .claude/agents/saas-researcher.md \
  ; do
  [[ -f "$f" ]] || fail "missing $f"
done

# Phase 01 docs
for f in \
  docs/phase-01/README.md \
  docs/phase-01/DEMO-GRADE-BAR.md \
  docs/phase-01/PREREQUISITES.md \
  docs/phase-01/RUN-ORDER.md \
  docs/phase-01/intention-quickbooks-killer.md \
  docs/phase-01/intention-trello-killer.md \
  docs/phase-01/intention-twitter-killer.md \
  docs/phase-01/intention-facebook-killer.md \
  ; do
  [[ -f "$f" ]] || fail "missing $f"
done

# Cursor alignment (optional but recommended for this repo)
[[ -f .cursor/rules/golfergeek-curriculum.mdc ]] || fail "missing .cursor/rules/golfergeek-curriculum.mdc"

# If monorepo already scaffolded, expect turbo
if [[ -f turbo.json ]]; then
  command -v node >/dev/null 2>&1 || fail "turbo.json present but node not in PATH"
fi

if [[ $ERR -ne 0 ]]; then
  echo "Verify finished with errors." >&2
  exit 1
fi
echo "OK: curriculum structure checks passed."
