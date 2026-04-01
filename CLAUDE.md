# AI Dev Curriculum — project context for Claude

This repository is the **GolferGeek AI development curriculum** and starter kit. Prefer **Turborepo** conventions once the monorepo exists: `apps/`, `packages/`, root `turbo.json`.

**Start here (learners):** [docs/phase-00/README.md](docs/phase-00/README.md)  
**What’s in `.claude/`:** [docs/phase-00/STARTER-KIT.md](docs/phase-00/STARTER-KIT.md)

Use **`/intention`**, **`/prd`**, **`/plan`**, **`/run-plan`** as defined in `.claude/commands/`. Delegate execution to **monorepo-builder** or the **track** app builders per the active plan.

**Checkpoint tree:** no monorepo in git yet — `./scripts/verify-curriculum-structure.sh` checks curriculum files only. **When implementing apps:** meet [docs/phase-00/DEMO-GRADE-BAR.md](docs/phase-00/DEMO-GRADE-BAR.md) and per-track **Demo-grade minimums** in `docs/phase-00/intention-*.md` — **credible product slices**, not single starter screens. After code exists, validate with root `npm run build`, `npm run test`, and the verify script as documented.
