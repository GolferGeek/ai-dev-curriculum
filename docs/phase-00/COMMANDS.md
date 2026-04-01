# Commands (Claude Code) — Phase 00 workflow

These are the **slash commands** (or equivalent) the course ships with. They map to **skills** the model loads and **agents** that own specific roles. Exact paths live under **`.claude/`** when the starter kit is implemented.

| Command | Purpose |
|---------|---------|
| **`/intention`** | Guided pass to capture or refine an **intention** artifact (markdown): why we’re building, for whom, what “good” and “out of scope” mean. Used for the **monorepo** first; same shape for **product** work later. |
| **`/prd`** | Turn the current intention into a **PRD**: requirements, non-goals, success criteria, open questions. |
| **`/plan`** | From PRD + intention, produce an **implementation plan**: milestones, risks, how we’ll verify, file/package touchpoints. |
| **`/run-plan`** | Execute the agreed plan: scaffold or modify the repo **using** the monorepo agent (or app builders) so work lands in the right **apps/** and **packages/**—not a free-form chat dump. |

## Typical order — monorepo first

1. Align on **[intention-monorepo](./intention-monorepo.md)** (given; you may still run `/intention` to restate or extend it).
2. `/prd` → `/plan` for the **workspace shell** (Turbo, `apps/`, `packages/`).
3. `/run-plan` → monorepo agent applies the plan and creates the Turbo layout.

## Typical order — first app (starter for 00)

1. **Pick one** product track; open the **given** [app intention](./README.md#tracks-pick-one) (you do **not** write the intention from scratch).
2. `/prd` and `/plan` from **that** intention (challenge passes: PRD vs intention, plan vs PRD).
3. `/run-plan` with the **app-specific builder agent** (one of four) so the scaffold matches the track you chose.

## Agents (overview)

- **Monorepo agent** (+ skills): Turbo layout, boundaries, conventions—used with `/run-plan` for the shell.
- **Track agents** (to be wired): builders oriented toward **HTTP workspace**, **wiki**, **CRM**, or **ops pulse**—so `/run-plan` for the app phase isn’t generic mush.

See the repo’s **`.claude/`** tree once Phase 00 is implemented for names and file layout.
