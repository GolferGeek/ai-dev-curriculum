# AI Development Curriculum — repository passport

This repository is a five-day, developer-only AI-assisted software development
program and a working monorepo operating model.

## Source of truth

- `docs/` contains organizational memory, teaching material, decisions, and
  learner guidance.
- `ai/skills/` and `ai/agents/` contain canonical reusable AI capabilities.
- `.claude/`, `.cursor/`, `.agents/`, and `.codex/` contain generated
  harness-specific projections.
- `completed/apps/` contains finished reference implementations.
- `apps/` is the learner's active development workspace.

Do not edit generated skills or agents directly. Edit `ai/`, then run:

```bash
npm run ai:generate
npm run ai:check
```

## AI program questions

For questions about approved harnesses/models, LLM usage, agent authority,
coding governance, reusable skills/agents, MCP or A2A, security/data, quality,
or program modernization, consult `docs/ai-program/README.md` and the relevant
facets. Follow `docs/ai-program/PROGRAM-CONTRACT.md`: cite scope, owner,
freshness, decisions, conflicts, and gaps. Do not turn a course default into
client policy or silently activate a proposed change.

## Required validation

Run the checks that match the change:

```bash
./scripts/verify-curriculum-structure.sh
npm run ai:check
npm run ai:program:check
npm run mindmaps:check
npm run build
npm test
```

For documentation changes, also build MkDocs with the dependencies in
`docs/requirements.txt`. For presentation changes, render every slide, inspect
each slide at full size, and run overflow checks.

## Curriculum quality bar

- The audience is professional software developers.
- Instructor-facing and participant-facing artifacts must be complete teaching
  material, not outlines or starter prose.
- Every phase must cover preparation, instruction, lab execution,
  verification, recovery, and follow-through.
- Commands, paths, prerequisites, timing, and cross-references must agree.
- Tool-specific claims must be dated and verified against current primary
  documentation.
- The course supports Cursor, Claude Code, and Codex. Cursor is the recommended
  common environment, not a mandatory client policy.

## Git and delivery model

- Use `main` as the continuing course branch.
- Use one immutable starter-kit tag after its clean-clone state is verified.
- Do not create phase branches or phase tags.
- Preserve user work and unrelated changes.
- Treat generated artifacts, temporary renders, and local credentials as
  non-source files.
