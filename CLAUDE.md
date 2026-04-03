# AI Dev Curriculum — project context for Claude

This repository is the **GolferGeek AI development curriculum** and starter kit. Prefer **Turborepo** conventions once the monorepo exists: `apps/`, `packages/`, root `turbo.json`.

**Start here (learners):** [docs/phase-00/README.md](docs/phase-00/README.md)  
**Phase 01 (SaaS killers):** [docs/phase-01/README.md](docs/phase-01/README.md)  
**Phase 02 (Quality engineering):** [docs/phase-02/README.md](docs/phase-02/README.md)  
**Phase 03 (Research):** [docs/phase-03/README.md](docs/phase-03/README.md)  
**Phase 04 (Protocols):** [docs/phase-04/README.md](docs/phase-04/README.md)  
**What’s in `.claude/`:** [docs/phase-00/STARTER-KIT.md](docs/phase-00/STARTER-KIT.md)

## Commands & pipeline

All commands are in `.claude/skills/`. The full development pipeline:

```
/intention → /prd → /plan → /run-plan → /scan-errors → /fix-errors → /monitor → /harden → /commit pr → /pr-evals → /pr-eval → /ingest → /map → /security-scan → /git-story → /improve → /deep-dive → /author-agent
```

### Build phase
| Command | What it does |
|---------|-------------|
| `/intention` | Review or create an intention file → feeds `/prd` |
| `/research` | Research a SaaS product to scope a killer app |
| `/prd` | Turn intention into a PRD |
| `/plan` | Turn PRD into an implementation plan |
| `/run-plan` | Execute the plan — invoke assigned agents to build code |
| `/test-browser` | Visually test a running app in Chrome |

### Quality phase
| Command | What it does |
|---------|-------------|
| `/scan-errors` | Scan for build, lint, test errors → error report |
| `/fix-errors` | Fix errors from the report, iterate until clean |
| `/monitor` | Scan for architecture violations |
| `/harden` | Fix architecture violations |

### Ship phase
| Command | What it does |
|---------|-------------|
| `/commit` | Quality gate → commit (add `push` or `pr` flag) |
| `/commit pr` | Quality gate → commit → push → create PR |
| `/pr-evals` | List open PRs → pick one to evaluate |
| `/pr-eval 42` | Full review → approve or request changes on GitHub |

### Research phase
| Command | What it does |
|---------|-------------|
| `/ingest` | Whole-repo orientation → ingest report |
| `/map` | Map entry/exit points, data flow, auth boundaries |
| `/security-scan` | Find vulnerabilities, auth gaps, exposed secrets |
| `/git-story` | Git history: hotspots, churn, contributors, velocity |
| `/improve` | Dead code, missing tests, tech debt, performance |
| `/deep-dive [area]` | Specialist focus: frontend, backend, data, or path |
| `/author-agent` | Create custom agents/skills from observed patterns |

### Agents
Delegate execution to the appropriate agent per the active plan:
- **Phase 00:** **monorepo-builder** or **track** app builders (http-workspace, team-wiki, pipeline-crm, ops-pulse).
- **Phase 01:** **saas-researcher** → **surrealdb-builder** → **nextjs-saas-builder** (web) or **ios-builder** (iOS).
- **Phase 02:** **error-scanner** / **error-fixer**, **arch-monitor** / **arch-hardener**, **commit-agent** / **pr-evaluator**.
- **Phase 03:** **repo-researcher**, **security-researcher**, **git-historian**, **agent-author**.
- **Phase 04:** **protocol-architect**, **agent-service-builder**, **dashboard-builder**.

## Quality bar

**When implementing apps:** meet the phase’s **DEMO-GRADE-BAR.md** and per-track **Demo-grade minimums** in `intention-*.md` — **credible product slices**, not single starter screens. After code exists, validate with root `npm run build`, `npm run test`, and the verify script (`./scripts/verify-curriculum-structure.sh`).
