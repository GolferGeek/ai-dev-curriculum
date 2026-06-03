# AI Development Curriculum

A hands-on, phased curriculum for learning **AI-assisted development** — building real software by directing AI agents.

This repo contains the **complete curriculum** with all phases, apps, tools, and documentation. To follow along step by step, start at Phase 00 **on your own branch** (phases are git tags — reference snapshots):

```bash
git clone https://github.com/GolferGeek/ai-dev-curriculum.git
cd ai-dev-curriculum
git checkout -b my-phase-00 phase-00
```

When you finish a phase: commit your work on your branch, then start the next phase from its tag (`git checkout -b my-phase-01 phase-01`). Each phase tag contains the **reference implementation** of everything before it, so you always begin the next phase from a known-good state — your own version stays safe on your previous branch.

---

## Phases

| Phase | What you learn | Start here |
|-------|---------------|------------|
| **00 — Your first AI build** | The pipeline: intention → PRD → plan → build | `git checkout -b my-phase-00 phase-00` |
| **01 — SaaS killers** | Real apps with auth, databases, and tests | `git checkout -b my-phase-01 phase-01` |
| **02 — Quality engineering** | Scan, fix, monitor, harden, and ship | `git checkout -b my-phase-02 phase-02` |
| **03 — Research** | Understand any codebase, create your own tools | `git checkout -b my-phase-03 phase-03` |
| **04 — Protocols** | Agents talking to agents (and paying for things) | `git checkout -b my-phase-04 phase-04` |
| **05 — Skills Browser** | Discover and explore the skill ecosystem | `git checkout -b my-phase-05 phase-05` |
| **06 — Model Eval Lab** | Which model should you actually use? | `git checkout -b my-phase-06 phase-06` |

Each phase builds on the last. Start at 00 and work forward.

## What's in each phase

- **Phase 00:** 4 commands (`/intention`, `/prd`, `/plan`, `/run-plan`), 5 agents, 2 skills. You build a Turborepo monorepo with 4 demo apps.
- **Phase 01:** Adds `/research`, `/test-browser`, SaaS-focused agents and skills. You build 4 SaaS killer apps (QuickBooks, Trello, Twitter, Facebook clones) with SurrealDB and auth.
- **Phase 02:** Adds `/scan-errors`, `/fix-errors`, `/monitor`, `/harden`, `/commit`, `/pr-eval`, `/pr-evals`. Quality engineering pipeline with zero-tolerance gates.
- **Phase 03:** Adds `/ingest`, `/map`, `/security-scan`, `/git-story`, `/improve`, `/deep-dive`, `/author-agent`. Research tools and custom agent creation.
- **Phase 04:** Protocol skills and specialized agents. You build a multi-agent demo with A2A discovery, task delegation, x402 payment gates, AP2 mandates, and a real-time protocol dashboard.
- **Phase 05:** Skill ecosystem knowledge and catalog agents. You build a Skills Browser — search, filter, and preview 1,000+ free skills from across the ecosystem.
- **Phase 06:** Analyst prompts and evaluation agents. You build a Model Eval Lab — test 13 models with 10 real analyst prompts, judged by 4 AI judges, with speed metrics and a tournament dashboard.

## Quick links

- [Pre-class setup](docs/pre-class-setup.md) — for live cohorts: do this before the first session
- [Accounts, subscriptions & API keys](docs/accounts-and-keys.md) — what you're paying for (often nothing)
- [Phase 00 Guide](docs/phase-00/README.md)
- [Phase 01 Guide](docs/phase-01/README.md)
- [Phase 02 Guide](docs/phase-02/README.md)
- [Phase 03 Guide](docs/phase-03/README.md)
- [Phase 04 Guide](docs/phase-04/README.md)
- [Phase 05 Guide](docs/phase-05/README.md)
- [Phase 06 Guide](docs/phase-06/README.md)
- [What's in `.claude/`](docs/phase-00/STARTER-KIT.md)

---

*Built with [Claude Code](https://claude.com/claude-code). Maintained by [GolferGeek](https://github.com/GolferGeek).*
