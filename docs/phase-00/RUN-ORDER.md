# Run order — step-by-step checklist

## Before you start

1. Read [PREREQUISITES.md](./PREREQUISITES.md).
2. Clone the repo and start a work branch from the phase tag (phases are git **tags** — snapshots; your own branch avoids detached-HEAD confusion):

   ```bash
   git clone https://github.com/GolferGeek/ai-dev-curriculum.git
   cd ai-dev-curriculum
   git checkout -b my-phase-00 phase-00
   ```

3. Open the folder in **Claude Code**.

## Part A — Monorepo shell

| Step | What to type | What happens |
|------|-------------|-------------|
| 1 | Read [intention-monorepo.md](./intention-monorepo.md) | Understand why we're building a monorepo. |
| 2 | `/intention docs/phase-00/intention-monorepo.md` | Reviews the intention with you. Outputs `docs/artifacts/intention.md`. |
| 3 | `/prd docs/artifacts/intention.md` | Builds PRD from intention. Outputs `docs/artifacts/prd.md`. |
| 4 | Review the PRD — does every goal trace to the intention? | Challenge pass. Fix before proceeding. |
| 5 | `/plan docs/artifacts/prd.md` | Builds plan from PRD. Outputs `docs/artifacts/plan.md`. |
| 6 | Review the plan — does it cover every PRD goal? | Challenge pass. Fix before proceeding. |
| 7 | `/run-plan docs/artifacts/plan.md` | Invokes **monorepo-builder**. Creates `apps/`, `packages/`, `turbo.json`. |
| 8 | `./scripts/verify-curriculum-structure.sh` | Green means you're good. |

## Between parts — archive your Part A artifacts

Part B writes to the same `docs/artifacts/` filenames and would silently overwrite Part A's. Before starting Part B:

```bash
mkdir -p docs/artifacts/monorepo
mv docs/artifacts/intention.md docs/artifacts/prd.md docs/artifacts/plan.md docs/artifacts/monorepo/
```

## Part B — First app (pick A–D)

| Step | What to type | What happens |
|------|-------------|-------------|
| 1 | Choose a track from the [README](./README.md#part-b--your-first-app-pick-one). | Pick what interests you. |
| 2 | `/intention docs/phase-00/intention-<track>.md` | Reviews the track intention. Outputs `docs/artifacts/intention.md`. |
| 3 | `/prd docs/artifacts/intention.md` | Builds PRD. Outputs `docs/artifacts/prd.md`. |
| 4 | Review PRD — does it cover all Demo-grade minimums? | Challenge pass. |
| 5 | `/plan docs/artifacts/prd.md` | Builds plan. Outputs `docs/artifacts/plan.md`. |
| 6 | Review plan — does it deliver every PRD goal? | Challenge pass. |
| 7 | `/run-plan docs/artifacts/plan.md` | Invokes the track agent. Builds the app in `apps/`. |
| 8 | `npm install` | Install the dependencies the agent added. |
| 9 | `npx playwright install chromium` | One-time browser download (~110 MB). Linux may also need `npx playwright install-deps`. |
| 10 | `npm run build` | Does it compile? |
| 11 | `npm run test` | Do tests pass? |

Replace `<track>` with: `http-workspace`, `team-wiki`, `pipeline-crm`, or `ops-pulse`.

> **Locked-down network?** If outbound calls are blocked (school/work), have the agent mock the demo API in tests (Playwright `page.route`) — the intentions explicitly allow "a documented mock." 

## If something fails

1. Capture the error (build, test, or verify script).
2. Fix forward **or** reset uncommitted app work and re-run `/run-plan docs/artifacts/plan.md` from a clean plan.
3. Keep `.claude/`, `docs/phase-00/`, `CLAUDE.md` — wipe generated **app** code only if you need a clean retry.
