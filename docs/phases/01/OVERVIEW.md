# Phase 01 — Overview

*One page: what today is, what you're learning, what you keep. Share this link at open; re-read at close. Not a printed handout — a bookmark.*

**Prereq:** Phase 00 complete — Turbo monorepo + one track app working.

**Thesis:** **SaaS was the bargain; scoped AI build is the reopening** — but only if you bring **development discipline** back: real auth, real data, proof the trust boundary holds. This is **vibe *engineering***, not vibe coding.

---

## What we're doing today

| Block | What happens |
|---|---|
| **Act I — SaaS Killers** | Short history of the SaaS trade; why build is back (2025–26); David vs Goliath + moving port — *why ownable product slices matter now.* |
| **Act II — Not vibe coding** | Name vibe coding (Lovable, Replit, etc.); credit platform guardrails; contrast with **our** pipeline + auth proof. |
| **Pick a killer + delivery platform** | QuickBooks, Trello, Twitter, or Facebook intention. Twitter/Facebook may be delivered as web or native iOS; **predict** where auth will be weak. |
| **Pipeline build** | `/intention` → `/prd` → `/plan` → `/run-plan` — **SurrealDB + auth first**, then Next.js app (~60–90 min agent time). |
| **Auth reflect + breach test** | Walk signup → sign-in → protected data; **second user** — can B see A's data? Build · test · browser. **This is the lesson.** |

Nobody watches the progress bar during the build — that window is for economics, security research, and discussion.

**Platform choice:** intentions describe the business capability, not an immutable UI stack. The supplied Twitter and Facebook references are SwiftUI examples; clients may convert either effort to Next.js + SurrealDB. Web is the cohort default, and native iOS is an optional Mac/Xcode path.

---

## What you're learning (high level)

- **The SaaS bargain** — subscription traded custom fit for speed; dev bench shrank; backlog went underground — and **scoped AI build reopens** narrow tools.
- **David vs Goliath / moving port** — incumbents are broad and slow to pivot; small teams can re-aim when models, harnesses, and guardrails shift.
- **Vibe coding vs vibe engineering** — prompt-to-preview is real (Lovable, Replit); **accountability** is intention + inspectable auth + proof.
- **Real stack** — SurrealDB (schema + auth scopes), Next.js (server actions = trust boundary), multi-agent plan (data layer before UI).
- **Auth chain** — signup · sign-in · protected routes · **per-user data isolation** — the closing bracket for this phase.
- **Challenge pass** — same pipeline as Phase 00; leverage is still **upstream** in the intention.

---

## What you leave with (ongoing process + artifacts)

**In the repo after today:**

- A **SaaS killer app** in `apps/<name>` — demo-grade slice with **real auth and SurrealDB data** (not localStorage).
- **`docs/artifacts/`** from your run — intention, PRD, plan for this product.
- **Portfolio context** — same monorepo pattern as Phase 00; add `docs/projects/<name>/` when you promote the idea.

**In your head for every real app after:**

- **Don't vibe-code auth** — prove isolation; second-user test before you call it done.
- **Data before UI** — `surrealdb-builder` then app builder; schema is the contract.
- **Trust boundaries** — server actions, DB scopes, secrets never in the client bundle.
- **Path to guardrails** — Phase 02 asks whether a reviewer would approve what you built today.

---

## Where to go next

| When | Open |
|---|---|
| **Before you type** | [PREREQUISITES.md](./PREREQUISITES.md) — SurrealDB required |
| **Step by step** | [RUN-ORDER.md](./RUN-ORDER.md) — includes auth breach checklist |
| **During the lab** | [README.md](./README.md) — full narrative |
| **Toolkit map** | [STARTER-KIT.md](./STARTER-KIT.md) · [COMMANDS.md](./COMMANDS.md) |
| **End of day self-check** | [TALKING-POINTS.md](./TALKING-POINTS.md) |
| **Prove it's done** | [VERIFY.md](./VERIFY.md) · [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) |
| **Instructors** | [TEACHING.md](./TEACHING.md) · [lesson plan](../../../marketing/lesson-plans/phase-01.md) |
