# Phase 00 — Overview

*One page: what today is, what you're learning, what you keep. Share this link at open; re-read at close. Not a printed handout — a bookmark.*

**Thesis:** For a well-scoped slice, the agent build is often fast. **The lesson is bracket the work** — define well, build, then prove hard. Your job is to **steer and verify**, never to trust the scroll.

---

## What we're doing today

| Block | What happens |
|---|---|
| **Setup + framing** | Clone, open the repo, get the agent running — while we land the mental model (harness, pipeline, why verification matters). |
| **Part A — Monorepo shell** | Provided [intention](./intention-monorepo.md) → `/intention` → `/prd` → `/plan` → `/run-plan` with **monorepo-builder**. You get `apps/`, `packages/`, `turbo.json`. |
| **Part B — First app** | Pick a track (HTTP workspace, team wiki, pipeline CRM, or ops pulse). Provided intention → same pipeline → track **app-builder** agent. |
| **Closing bracket** | **Predict** before build; **reflect** after. Prove it: `npm run build` → lint → `npm run test` → verify against the intention → open in the browser. |

The build often finishes in under an hour for these slices. **Nobody watches the progress bar** — that window is for concepts and discussion.

---

## What you're learning (high level)

- **Bracket the work** — `( intention ) · build · ( build · lint · test · verify · browser )`. A full product is many iterations of that pattern; size each effort so both brackets fit.
- **The pipeline** — intention → PRD → plan → build. Same four slash skills in every phase and on real work at home.
- **The challenge pass** — at each step, read what the agent produced and ask: *does this match what I meant?* before moving on.
- **Steer and verify, never trust** — the model is fast and confident; bad output is usually bad context, not a bad model.
- **Monorepo as operating system** — **documents** (`docs/`) hold decisions and memory; **skills & agents** (`.claude/`) hold workflows — reviewed and merged like code.
- **Field notes, not doctrine** — this repo is a scout's trail markers; the **discipline** (define → verify) outlasts any single harness or model.

---

## What you leave with (ongoing process + artifacts)

**In the repo after today:**

- A **working Turbo monorepo** — shared `packages/`, deployable `apps/`, one place for every product you add next.
- **One demo-grade app** — a credible tool slice, not a hello-world (your track choice).
- **`docs/artifacts/`** from *your* run — intention, PRD, and plan you can point at when something drifts.

**In your head for every project after:**

- The **pipeline** you'll reuse in Phase 01+ and at work: `/intention` → `/prd` → `/plan` → `/run-plan` → prove.
- The habit of **predict-then-compare** — say what the agent will do before it runs; judge the result against that.
- A map to the **operating model** you'll grow over the week — [MONOREPO-OPERATING-MODEL.md](../../MONOREPO-OPERATING-MODEL.md), [adoption kit](../../../marketing/adoption-kit/README.md), `docs/ai-program/`.

---

## Where to go next

| When | Open |
|---|---|
| **Before you type** | [PREREQUISITES.md](./PREREQUISITES.md) |
| **Step by step** | [RUN-ORDER.md](./RUN-ORDER.md) |
| **During the lab** | [README.md](./README.md) — full narrative |
| **End of day self-check** | [TALKING-POINTS.md](./TALKING-POINTS.md) — can you explain each concept? |
| **Instructors** | [TEACHING.md](./TEACHING.md) · [lesson plan](../../../marketing/lesson-plans/phase-00.md) |
