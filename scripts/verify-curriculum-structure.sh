#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
ERR=0

fail()  { echo "VERIFY FAIL: $*" >&2; ERR=1; }
need()  { [[ -f "$1" ]] || fail "missing $1"; }
skill() { need ".claude/skills/$1/SKILL.md"; }
agent() { need ".claude/agents/$1.md"; }

need AGENTS.md
need CLAUDE.md
need ai/functions.json
need ai/README.md
need apps/README.md
need completed/apps/README.md
need docs/ai-program/README.md
need scripts/generate-ai-tooling.mjs
need scripts/verify-ai-program.mjs

phase_documents=(
  README.md
  OVERVIEW.md
  PREREQUISITES.md
  COMMANDS.md
  STARTER-KIT.md
  RUN-ORDER.md
  TALKING-POINTS.md
  TEACHING.md
  DEMO-GRADE-BAR.md
  VERIFY.md
)

for phase in 00 01 02 03 04 05 05.5 06; do
  for document in "${phase_documents[@]}"; do
    need "docs/phases/$phase/$document"
  done
done

for deck in \
  phase-00-opening-ai-dev.pptx \
  phase-01-saas-killers.pptx \
  phase-02-quality-engineering.pptx \
  phase-03-project-memory.pptx \
  phase-04-agent-to-agent-future.pptx \
  phase-05-skill-scouting.pptx \
  phase-05-5-skills-registry.pptx \
  phase-06-model-evaluation.pptx; do
  need "marketing/decks/$deck"
done

for lesson in 00 01 02 03 04 05 05.5 06; do
  need "marketing/lesson-plans/phase-$lesson.md"
done

for capability in intention prd plan run-plan scan-errors fix-errors monitor \
  harden commit pr-eval research test-browser skill-scout skill-evaluate \
  skill-publish skill-maintain ai-program-advisor; do
  skill "$capability"
done

for role in monorepo-builder error-scanner error-fixer arch-monitor \
  arch-hardener commit-agent pr-evaluator terrain-scout ai-program-steward; do
  agent "$role"
done

for projection in \
  .claude/skills/.generated.json \
  .claude/agents/.generated.json \
  .cursor/skills/.generated.json \
  .cursor/agents/.generated.json \
  .agents/skills/.generated.json \
  .codex/agents/.generated.json; do
  need "$projection"
done

need .cursor/rules/golfergeek-curriculum.mdc

if [[ -f turbo.json ]]; then
  command -v node >/dev/null 2>&1 || fail "turbo.json present but node not in PATH"
fi

if [[ $ERR -ne 0 ]]; then
  echo "Verify finished with errors." >&2
  exit 1
fi

echo "OK: curriculum structure checks passed."
