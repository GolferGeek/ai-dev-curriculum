# The Claude starter kit — what this repo intends, what you start with, what each item does

This document is the **map** for the **`.claude/`** directory in this project. In live sessions we **walk this tree** so you see **commands** (what you invoke), **skills** (what the model auto-applies), and **agents** (who executes **`/run-plan`** for monorepo vs each product track).

---

## What we intend to do

1. **Part A — House:** Establish a **Turbo monorepo** (`apps/`, `packages/`, `turbo.json`) using a **provided** [intention for the monorepo](./intention-monorepo.md), then **PRD → plan → `/run-plan`** with the **monorepo builder** agent.
2. **Part B — First app:** Pick **one** of four [product tracks](./README.md); use the **given** app intention, then **PRD → plan → `/run-plan`** with the matching **track builder** agent.
3. **Same vocabulary everywhere:** `/intention`, `/prd`, `/plan`, `/run-plan` — see [COMMANDS.md](./COMMANDS.md).

Artifacts (intention / PRD / plan markdown) usually live under **`docs/artifacts/`** unless you choose another path and tell the commands.

---

## What you’re starting with

| Piece | Role |
|--------|------|
| **This repo** | Curriculum + starter **Claude Code** layout; not a finished production system until you run the plans. |
| **`docs/phase-00/`** | Intentions (monorepo + four apps), command workflow, this starter-kit explainer. |
| **`.claude/`** | Commands, skills, agents you use with Claude Code in this project. |
| **`CLAUDE.md`** (repo root) | Short project rules for the assistant—points here and to `docs/`. |

---

## `.claude/commands/` — you invoke these

| File | Slash command | What it does |
|------|----------------|---------------|
| `intention.md` | `/intention` | Shape or update an **intention** artifact; works for monorepo or a product track; points at provided intention files in `docs/phase-00/`. |
| `prd.md` | `/prd` | Build or refresh a **PRD** from the active intention. |
| `plan.md` | `/plan` | Build an implementation **plan** from intention + PRD (milestones, risks, `apps/` / `packages/` touchpoints). |
| `run-plan.md` | `/run-plan` | **Execute** the plan by delegating to the **monorepo-builder** agent or one of the **four track** app builders. |

---

## `.claude/skills/` — model applies when relevant

| File | Skill | What it does |
|------|--------|---------------|
| `monorepo-turbo.md` | **monorepo-turbo** | Keeps Turbo layout disciplined: `apps/` vs `packages/`, `turbo.json`, root scripts, package-manager consistency. |
| `prd-alignment.md` | **prd-alignment** | Keeps PRDs and plans **aligned** with intention—traceability, non-goals, drift checks. |

Skills are **not** a separate chat; they guide behavior when Claude is editing or reviewing artifacts in scope.

---

## `.claude/agents/` — specialized executors for `/run-plan`

| File | Agent | When `/run-plan` uses it |
|------|--------|---------------------------|
| `monorepo-builder.md` | **monorepo-builder** | Part A only: create/extend the **Turbo shell**, not full product features. |
| `app-builder-http-workspace.md` | **app-builder-http-workspace** | Track A — HTTP workspace (mini Postman style). |
| `app-builder-team-wiki.md` | **app-builder-team-wiki** | Track B — wiki / runbooks. |
| `app-builder-pipeline-crm.md` | **app-builder-pipeline-crm** | Track C — CRM / pipeline board. |
| `app-builder-ops-pulse.md` | **app-builder-ops-pulse** | Track D — ops pulse dashboard. |

Each agent file embeds a **pointer** to the matching **intention** under `docs/phase-00/`.

---

## How to use this in teaching

1. Open **this document** and the **`.claude/`** folder side by side.
2. Read **commands** aloud as “what humans type”; read **skills** as “how we keep quality”; read **agents** as “who runs the plan.”
3. Run **`/run-plan`** only after a **plan** exists—otherwise send learners back to **`/plan`**.

---

## Cursor vs Claude Code (important)

- **Claude Code** runs **slash commands** from **`.claude/commands/`** (`/intention`, `/prd`, `/plan`, `/run-plan`). Skills and agents under **`.claude/skills/`** and **`.claude/agents/`** are built for that path.
- **Cursor** does **not** execute those as native `/` commands. The project includes **`.cursor/rules/golfergeek-curriculum.mdc`** so Cursor’s agent follows the **same docs and artifact flow**. In Cursor, treat each command file as a **prompt recipe** or use **@** to attach `docs/phase-00/` and `.claude/commands/`.
- **Not automatic:** Cursor is **not** “calling Claude skills” remotely—both tools share **files and rules**; Claude Code is where slash commands are **guaranteed** to bind.

Self-serve checklist: [RUN-ORDER.md](./RUN-ORDER.md) · Prerequisites: [PREREQUISITES.md](./PREREQUISITES.md) · Verification: [VERIFY.md](./VERIFY.md).

## See also

- [Phase 00 README](./README.md) — Part A / Part B flow  
- [COMMANDS.md](./COMMANDS.md) — order of operations  
- [intention-monorepo.md](./intention-monorepo.md) — monorepo intention  
