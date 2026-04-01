# Commands (Claude Code) — Phase 00 workflow

These are the **slash commands** you'll use. Each one takes a file as input and produces a file as output. The chain looks like this:

```
/intention <intention-file>  →  docs/artifacts/intention.md
/prd docs/artifacts/intention.md  →  docs/artifacts/prd.md
/plan docs/artifacts/prd.md  →  docs/artifacts/plan.md
/run-plan docs/artifacts/plan.md  →  built code in apps/ and packages/
```

## Command reference

| Command | Input | Output | What it does |
|---------|-------|--------|-------------|
| **`/intention`** | A provided intention file (e.g. `docs/phase-00/intention-monorepo.md`) | `docs/artifacts/intention.md` | Reviews and refines the intention with you. |
| **`/prd`** | The refined intention file | `docs/artifacts/prd.md` | Turns intention into goals, non-goals, success criteria, test expectations. |
| **`/plan`** | The PRD file | `docs/artifacts/plan.md` | Turns PRD into milestones, agent assignments, risks, verification steps. |
| **`/run-plan`** | The plan file | Code in `apps/` and `packages/` | Invokes agents to build the code. |

## Typical order — monorepo first

```
/intention docs/phase-00/intention-monorepo.md
/prd docs/artifacts/intention.md
/plan docs/artifacts/prd.md
/run-plan docs/artifacts/plan.md
```

## Typical order — first app (pick A–D)

```
/intention docs/phase-00/intention-http-workspace.md
/prd docs/artifacts/intention.md
/plan docs/artifacts/prd.md
/run-plan docs/artifacts/plan.md
```

(Substitute your track's intention file for Track B, C, or D.)

## Challenge passes

Before each step, the command checks the previous artifact:
- `/prd` checks: does the PRD cover every item in the intention?
- `/plan` checks: does the plan deliver every PRD goal?
- `/run-plan` checks: is the plan clear enough to build from?

If something doesn't match, the command flags it and asks you to fix it before proceeding.

## Agents (who gets invoked by `/run-plan`)

- **monorepo-builder** — creates the Turbo layout (Part A)
- **app-builder-http-workspace** — Track A: mini Postman
- **app-builder-team-wiki** — Track B: wiki / runbooks
- **app-builder-pipeline-crm** — Track C: pipeline CRM
- **app-builder-ops-pulse** — Track D: ops dashboard
