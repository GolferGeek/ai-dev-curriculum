# AI Development Curriculum

A five-day, developer-only program for learning AI-assisted software
development by building, verifying, governing, and maintaining real software
with coding agents.

The repository is both the course and the operating model:

- `docs/` holds teaching material, decisions, and organizational memory.
- `ai/` holds canonical skills and specialized agents.
- Claude Code, Cursor, and Codex projections are generated and committed.
- `apps/` is the learner's active workspace.
- `completed/apps/` contains finished reference implementations.

The durable take-home product is a started company-owned
[`docs/ai-program/`](docs/ai-program/README.md): a standard folder-backed AI
governance and GRC structure, canonical skills and agents, and an application
experience for browsing the program and asking qualified questions about its
health, gaps, changes, staleness, and conflicts.

## Start once, continue all week

There are no phase branches and no phase tags. Create one learner branch from
the immutable starter-kit tag and keep adding work to it:

```bash
git clone https://github.com/GolferGeek/ai-dev-curriculum.git
cd ai-dev-curriculum
git switch -c learner/my-work starter-kit-v1
npm install
```

The complete documentation and reference implementations remain available
throughout the program. Learners build in `apps/` and compare against
`completed/apps/` when the instructor directs them to do so. Reference
applications are evidence and recovery aids, not hidden answers.

Before class, complete [the pre-class setup](docs/pre-class-setup.md) and verify
one supported harness:

- Cursor is the recommended common development environment.
- Claude Code is fully supported.
- Codex is fully supported.

The client chooses policy. The curriculum does not require one vendor.

## Program progression

| Module | What developers learn | Start here |
|---|---|---|
| **00 — First AI build** | Intention → PRD → plan → agent-assisted build → verification | [Phase 00](docs/phases/00/README.md) |
| **01 — Product delivery** | Build credible product slices with auth, data, and tests | [Phase 01](docs/phases/01/README.md) |
| **02 — Quality engineering** | Scan, fix, monitor, harden, and ship | [Phase 02](docs/phases/02/README.md) |
| **03 — Brownfield understanding** | Investigate unfamiliar code before changing it | [Phase 03](docs/phases/03/README.md) |
| **04 — Agent systems** | Build observable agent-to-agent workflows and boundaries | [Phase 04](docs/phases/04/README.md) |
| **05 — Capability governance** | Part A: scout/evaluate; Part B: publish, maintain, and retire trusted capability | [Phase 05](docs/phases/05/README.md) · [Part B](docs/phases/05.5/README.md) |
| **06 — Model evaluation** | Test models on your workload and route work using evidence | [Phase 06](docs/phases/06/README.md) |
| **07 — AI Program capstone** | Operate the folder-backed Governance & GRC product and complete one governed change | [Phase 07](docs/phases/07/README.md) |

The instructor schedule combines modules into five teachable days. Learners use
the same repository, branch, documents, and AI operating layer from beginning
to end.

## Working directories

```text
ai/                       canonical skills and agents by function
apps/                     learner-built applications
completed/apps/           finished reference implementations
docs/phases/              learner and instructor phase packages
docs/ai-program/          company-owned AI Program and application content graph
marketing/lesson-plans/   expanded lectures and facilitation
marketing/decks/          PowerPoint teaching decks
packages/                 active shared packages
```

See [the completed-app index](completed/apps/README.md) before running a
reference implementation.

## Canonical skills and agents

Capabilities are organized by function in `ai/`:

1. Foundation and planning.
2. Application delivery.
3. Quality and release.
4. Research and understanding.
5. Protocols and agent systems.
6. Skill and agent governance.
7. Model and tool evaluation.

Generate and validate the harness projections:

```bash
npm run ai:generate
npm run ai:check
```

Do not edit `.claude/skills/`, `.claude/agents/`, `.cursor/skills/`,
`.cursor/agents/`, `.agents/skills/`, or `.codex/agents/` directly. Their
source is [`ai/`](ai/README.md).

## Repository checks

```bash
./scripts/verify-curriculum-structure.sh
npm run ai:check
npm run ai:program:check
npm run docs:links
npm run mindmaps:check
npm run build
npm test
npm run completed:check
```

Documentation and presentation artifacts have additional validation described
in [the curriculum hardening plan](docs/CURRICULUM-HARDENING-PLAN.md). The
[readiness assessment](docs/CURRICULUM-READINESS-ASSESSMENT.md) records the
marketability decision, evidence, known limits, and cohort release gate.

## Useful entry points

- [Curriculum index](docs/index.md)
- [Five-day syllabus](marketing/week-long-syllabus.md)
- [Curriculum readiness assessment](docs/CURRICULUM-READINESS-ASSESSMENT.md)
- [Instructor lesson plans](marketing/lesson-plans/README.md)
- [AI program](docs/ai-program/README.md)
- [Monorepo operating model](docs/MONOREPO-OPERATING-MODEL.md)
- [Harness instruction map](docs/guardrails/02-harness-instruction-layers.md)
- [Pre-class setup](docs/pre-class-setup.md)
- [Accounts, subscriptions, and keys](docs/accounts-and-keys.md)

---

Maintained by [GolferGeek](https://github.com/GolferGeek).
