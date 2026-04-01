# AI Dev Curriculum — project context for Claude

This repository is the **GolferGeek AI development curriculum** and starter kit. Prefer **Turborepo** conventions once the monorepo exists: `apps/`, `packages/`, root `turbo.json`.

**Start here (learners):** [docs/phase-00/README.md](docs/phase-00/README.md)  
**Phase 01 (SaaS killers):** [docs/phase-01/README.md](docs/phase-01/README.md)  
**Phase 02 (Quality engineering):** [docs/phase-02/README.md](docs/phase-02/README.md)  
**What’s in `.claude/`:** [docs/phase-00/STARTER-KIT.md](docs/phase-00/STARTER-KIT.md)

## Commands & agents

Use **`/intention`**, **`/prd`**, **`/plan`**, **`/run-plan`** as defined in `.claude/commands/`. Phase 01 adds **`/research`** and **`/test-browser`**.

Delegate execution to the appropriate agent per the active plan:
- **Phase 00:** **monorepo-builder** or **track** app builders (http-workspace, team-wiki, pipeline-crm, ops-pulse).
- **Phase 01:** **saas-researcher** → **surrealdb-builder** → **nextjs-saas-builder** (web) or **ios-builder** (iOS).
- **Phase 02:** **error-scanner** / **error-fixer**, **arch-monitor** / **arch-hardener**, **commit-agent** / **pr-evaluator**.

## Quality bar

**When implementing apps:** meet the phase’s **DEMO-GRADE-BAR.md** and per-track **Demo-grade minimums** in `intention-*.md` — **credible product slices**, not single starter screens. After code exists, validate with root `npm run build`, `npm run test`, and the verify script (`./scripts/verify-curriculum-structure.sh`).
