# Phase 00 — Monorepo shell, then your first app

**What every item in `.claude/` is for:** [STARTER-KIT.md](./STARTER-KIT.md) — intentions, starting point, commands, skills, agents.

This phase has **two beats**, both using the same **command** vocabulary: **`/intention`**, **`/prd`**, **`/plan`**, **`/run-plan`**. Details: [COMMANDS.md](./COMMANDS.md).

---

## Part A — Turbo monorepo (the house)

1. **Intention** — We treat the workspace as a **Turbo monorepo** with `apps/` and `packages/`. The canonical intention is **[intention-monorepo.md](./intention-monorepo.md)** (provided so you’re not inventing structure from a blank page).
2. **PRD & plan** — You still **practice the pipeline**: turn that intention into a **PRD**, then a **plan** (boundaries, scripts, what Turbo runs first). Challenge passes apply (does the PRD match the intention? does the plan justify the PRD?).
3. **Build** — Run **`/run-plan`** with the **monorepo agent** (+ its skills) so the repo becomes the **actual** Turbo layout—commands and agents do the heavy lifting; you stay in the loop.

**Kit:** Specialized **monorepo agent**, **skills** for Turbo conventions, and the commands above—implemented under **`.claude/`** in the starter repo.

---

## Part B — First app (pick one track)

After the monorepo exists:

1. **Choose** one product below—HTTP workspace, wiki, CRM, or ops pulse.
2. **Intention** — **Given for you** in this folder (starter for app 00). You **don’t** brainstorm the product from zero here; you **align** and then write **PRD** and **plan**.
3. **`/prd`** → **`/plan`** from that intention; iterate until PRD and plan match intention.
4. **`/run-plan`** — Use the **track-specific builder agent** (wired for that product shape) so scaffolding matches what you picked.

### Tracks (pick one)

| Track | Intention file | One-line idea |
|--------|----------------|---------------|
| A | [intention-http-workspace.md](./intention-http-workspace.md) | Mini Postman: collections, requests, environments, history |
| B | [intention-team-wiki.md](./intention-team-wiki.md) | Team wiki / runbook hub: spaces, markdown, search |
| C | [intention-pipeline-crm.md](./intention-pipeline-crm.md) | Pipeline CRM: kanban + records + activity |
| D | [intention-ops-pulse.md](./intention-ops-pulse.md) | Ops pulse: checks, status tiles, incident log |

Open **only** the intention for the track you chose for **why**; PRD and plan carry **what** and **how**.

---

## Why this order

- **House first:** One Turbo monorepo, one set of conventions—then every app lands in a **known** place.
- **Commands everywhere:** Same **intention → PRD → plan → run plan** muscle for **workspace** and **product**.
- **Starter for 00:** App intentions are **provided** so time goes to **artifacts and agents**, not ideation from a cold start.

Course prompts will walk challenge passes before each **`/run-plan`**.
