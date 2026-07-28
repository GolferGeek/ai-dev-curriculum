# Phase 01 — Instructor Teaching Guide

*This is the **instructor-facing** companion to Phase 01. It is not a checklist of what to type — that's [RUN-ORDER.md](./RUN-ORDER.md). It's not the learner cheat sheet either — that's [TALKING-POINTS.md](./TALKING-POINTS.md). **Share at open:** [OVERVIEW.md](./OVERVIEW.md) — one-page learner anchor (today · learn · leave with). The **content lecture** (citations, SaaS history, vibe coding, security research) lives in [marketing/lesson-plans/phase-01.md](../../../marketing/lesson-plans/phase-01.md). This document is **what you teach, in what order, and where you stop the build to explain it.***

*Shared room mechanics (predict-then-compare, don't watch the scroll, parallel sessions) are the same as Phase 00 — see [Phase 00 TEACHING.md](../00/TEACHING.md) for the spine. Phase 01 adds **Act I (SaaS Killers)** and **Act II (real apps, not vibe coding)** before the auth lab.*

---

## The core reality of this phase

**The build often takes ~60–90 minutes — longer than Phase 00 because there's a real database and auth chain. The build is still not the lesson.** If you spend the afternoon watching `/run-plan` scroll, you have wasted the room.

Phase 00 taught **bracket the work** on a Vite app. Phase 01 raises the stakes: **persistence, identity, and the trust boundary.** A broken UI in Phase 00 was embarrassing. A broken **auth** in Phase 01 is a **data breach**.

> **The one idea this phase exists to deliver:** **SaaS was the bargain; scoped AI build is the reopening — but only if you bring development discipline back in-house.** You can spin up an app on Lovable in an hour (*vibe coding*). This phase is **vibe *engineering***: intention → multi-agent build → **prove the auth-and-data chain** — including *user B cannot see user A's data*. Speed without that proof is how the industry ships breaches in an afternoon.

The value is in what wraps around the build:

1. **Teach Act I** — SaaS bargain, curve bends back, David/Goliath + moving port ([lesson plan §0](../../../marketing/lesson-plans/phase-01.md)).
2. **Teach Act II** — vibe coding vs what we do; name Lovable/Replit fairly; land auth as the trust boundary.
3. **Review the intention together** — critique the provided killer intention; predict where auth will be weak.
4. **Build** (~60 min agent time). Nobody watches the scroll. Window = security research, D01-* discussions, vibe-coding contrast.
5. **Reflect** — **auth breach attempt** is the centerpiece. Walk the chain; try to break isolation; prove with tests + browser.

---

### Rough timing (Day 1 afternoon — follows Phase 00 on the same day)

| Block | ~Time | What's happening |
|---|---|---|
| **Act I — SaaS Killers** | 25–30 min | Lesson plan §0: SaaS bargain, 2025–26 signals, David/Goliath, moving port. Deck or whiteboard. |
| **Act II — Not vibe coding** | 35–40 min | Lesson plan §1: define vibe coding, fair Lovable/Replit credit, tech stack, security research (Base44, Escape, Lovable CVE). |
| **Intention walk-through + predict** | 20–25 min | Open track intention; Demo-grade minimums; **predict auth weaknesses** before `/run-plan`. |
| **Build** | 60–90 min | `/intention` → `/prd` → `/plan` → `/run-plan`. Teach during the run (D01-*). |
| **Auth reflect + breach test** | 45–60 min | Walk chain; second user; protected URL; closing bracket. **This is the lesson.** |

If Phase 00 ran long, compress Act I to 15 min — keep the breach test; never skip it.

---

## Connect to Phase 00 (60 seconds at the open)

> Yesterday you **bracketed the work** on a scoped slice — intention, build, prove. Today we ask *what* you're building and *why now*: the **SaaS killer** — an ownable product slice with **real auth and real data**, not localStorage. Phase 00's monorepo is where it lands: `apps/<name>` + your pipeline. Phase 02 will ask whether you'd **ship** it — scanners, gates, hygiene. Today we ask whether it's **safe**.

---

## Act I — "SaaS Killers" (deliver from lesson plan §0)

**Do not re-write the lecture here.** Deliver [lesson plan §0](../../../marketing/lesson-plans/phase-01.md) — three beats:

### 0a. The SaaS bargain (~8 min)

Land the trade your learners lived through:

- Custom software: slow, expensive, per-machine installs, licensing, hardware, servers, DB setup.
- **SaaS:** gleeful outsourcing — subscription, middle-of-the-road fit, **stop staffing dev** for every workflow.
- Real dev shrank to ERP/CRM + integrations; the rest went underground (spreadsheets, workarounds).

**Say it fairly:** SaaS didn't kill software — it became the **default answer** when build was too slow.

**Discussion hook:** "What do you pay for today that almost fits — but not quite?"

### 0b. The curve bends back (~10 min)

**Scoped build got cheap again.** Cite *(verify before cohort)*:

- **Retool 2026** — 35% replaced at least one SaaS tool with custom build; 78% building more in 2026 *(vendor survey)*.
- **Thomson Reuters / Feb 2026** — Anthropic **Claude Cowork Legal plugin** (packaged workflows + tools = **skills shape**); market repriced legal/data software; TRI **~16–19%** in a day.
- **Anecdote:** people you know — "put *this* information *here* for *these* people."

**Land:** Replace **narrow misfit tools**, not every Salesforce tomorrow. Ownable, scoped, verifiable.

### 0c. David, Goliath, and the moving port (~8 min)

**David vs Goliath**

- Goliath = incumbent SaaS (breadth, brand, compliance packaging, sales machine).
- David = SMB + **intention + pipeline + agents** — scoped killers, faster iteration.
- When the terrain shifts (models, harnesses, guardrails), Goliath's roadmap wobbles; David re-aims the **next slice**.

**Ocean / moving port**

- Big orgs **stake the ground** — LLM choice, harness standard, governance, procurement, training.
- AI **moves the port**. Aircraft carriers can't turn on a quarter.
- Small boats still face waves (security, comprehension debt) — **guardrails in Phase 02** — but they can say *"port's changing — off we go."*

**Bridge to Act II:** Today we build one **credible killer** with auth you can inspect. Speed is back; **accountability** comes back with it.

---

## Act II — "Real apps: not vibe coding" (deliver from lesson plan §1)

### Vibe coding — name it (~12 min)

Many learners have done this without the label.

**Start concrete:**

> "Go to Lovable or Replit, describe an app, ship by end of day. That's vibe coding — even when it works."

Then cite **Willison (Oct 2025)** — vibe coding vs **vibe engineering**. Karpathy named the vibe; Willison named accountability.

**Be fair about platforms:**

- Lovable, Replit Agent, Bolt **are** adding guardrails, RLS templates, secure Next.js patterns, pre-ship checks. **Say that.** They're not frozen in 2024 failure mode.
- **Then land the distinction:** platform guardrails on **their** rails ≠ **your** repo, **your** SurrealDB scopes, **your** second-user test.

Use the table in [lesson plan §1a](../../../marketing/lesson-plans/phase-01.md) on screen or whiteboard.

**The line:**

> *Lovable can get you running in an hour. Phase 01 is the same *class* of app in **your monorepo**, with auth you can **open and prove**. That's the job.*

### Technology — pause-and-teach anchors (~10 min)

Don't deep-dive implementation — enough to **steer**:

| Term | One sentence + why it matters today |
|---|---|
| **SurrealDB** | Schema + **auth scopes in the data layer** — identity isn't bolted on in the UI only. |
| **Next.js App Router** | Server vs client code — **server actions** are a **trust boundary** (see React2Shell). |
| **Signup / sign-in / JWT** | Create identity vs prove it; tamper-evident wristband for the session. |
| **Per-user isolation** | DB scopes records to owner — **the test Phase 01 lives or dies on.** |
| **`/test-browser`** | Eyes on the running app — transcript isn't proof. |

Point at [TALKING-POINTS.md](./TALKING-POINTS.md) for learner self-check later.

### Security research — centerpiece (~12 min)

Pick **two** primary sources live; keep Base44 as the story anchor if you only pick one:

- **Wiz / Base44 (Jul 2025)** — auth bypass via non-secret `app_id`; undocumented endpoints; *any* private app.
- **Escape.tech (2025)** — 5,600+ vibe-coded apps scanned; secrets in frontend bundles.
- **Lovable CVE-2025-48757** — RLS misconfiguration; frontend checks bypassed.
- **React CVE-2025-55182 (Dec 2025)** — server actions as attack surface; trust boundaries matter.

**Land Act II:** fast enough to ship a real app **and** a breach in an afternoon. Separating the two = **verify the auth-and-data chain**. That's this lab.

---

## Intention walk-through (critique + predict)

Open the chosen [intention-*.md](./intention-quickbooks-killer.md) — go straight to **Demo-grade minimums**.

**Pause-and-teach:**

- **At auth minimum** — "If this line weren't here, what would the agent ship?" (Pretty dashboard, fake login.)
- **At data model** — schema becomes SurrealDB contract; ambiguity here = slop in prod.
- **At agent split** — `surrealdb-builder` **first**, then `nextjs-saas-builder` — data before UI is the anti-vibe-coding pattern.

**Predict (do not skip):**

- What screens? What does signup look like?
- **Where will auth be weak?** (Client-only checks? Missing scope on queries? ID in URL?)
- Write on the board — compare after build **and** after breach test.

---

## Build (teach while it runs)

Kick off [RUN-ORDER.md](./RUN-ORDER.md) steps 2–7. **Do not narrate the scroll.**

### What to teach during the run

| Step running | Primary discussion | Tie to lab |
|---|---|---|
| **`/intention` / `/prd`** | [D01-1 — Corporate context layers](../../../marketing/lesson-plans/discussion-topics.md) | Brand/policy as loadable context — not decoration |
| **`/plan`** | Multi-agent sequencing — why DB before app | Intention forces the split |
| **`/run-plan` (SurrealDB agent)** | Auth scopes, schema as contract | Open `schema.surql` or equivalent when it lands |
| **`/run-plan` (app agent)** | [D01-3 — Decision boundaries](../../../marketing/lesson-plans/discussion-topics.md) | Secrets hygiene — D01-4 |
| **While tests run** | Vibe coding failures — Base44 story again | "Would Lovable have caught this?" |

**Parallel sessions:** `/run-plan` in one terminal; discussion in the room.

**If build finishes early:** start `/test-browser` or second track — never fill time with scroll-watching.

---

## Reflect — auth breach test (the bulk of the lesson)

Work through **in order**. This block is non-negotiable.

### 1. Walk the chain (out loud, on the running app)

Signup → sign-in → land on protected content → refresh → still signed in → sign out → protected URL **redirects or rejects**.

Use `/test-browser` if helpful — still **you** narrate what proof means.

### 2. Attempt the breach

- Create **user A** and **user B**.
- As B: can you see A's invoices/cards/posts? Direct URL with A's record id?
- Signed out: hit a protected API or page — what happens?
- Optional: open DevTools / network — is a token or record id enough to leak data?

**Whatever happens, teach from it.** Green UI with broken isolation = Lovable CVE class. Fixed isolation = vibe engineering.

### 3. Closing bracket

`npm run build` → `npm run test` → verify against intention Demo-grade minimums → `/test-browser` or manual browser.

### 4. Prediction vs reality

Board from predict step: where did auth fail or hold?

### 5. Business close

"What would you refuse to ship?" → Phase 02 gates, Phase 03 brownfield caution.

---

## Discussion prompts (keep in your back pocket)

- "Would you trust this app with your own client's invoice data — why or why not?"
- "What's the difference between **looks logged in** and **is authenticated**?"
- "If we deployed this to the internet tonight, what's the first thing a attacker tries?"
- "Lovable added guardrails — what guardrails exist **in this repo** after today?"
- "David beat Goliath with a slingshot — what's **our** slingshot vs Salesforce?"

## Likely questions (and the honest answer)

- **"Why not just use Lovable?"** — For learning and **ownership**: your repo, your schema, your proof chain. Lovable is valid for prototypes; this course is for **ownable product slices** in a monorepo you'll keep building in.
- **"Is SurrealDB production-ready?"** — For this phase, it's the **auth-in-the-DB-layer** teaching vehicle. Skeptics exist — don't bet the company on hype; do learn the **isolation pattern** that transfers to Postgres + RLS.
- **"Can we skip signup and use a demo user?"** — Only if the intention's Demo-grade minimums are met **and** you still prove isolation between two real accounts. Fake login fails the bar.
- **"Twitter/Facebook tracks say iOS — why web?"** — **Class default:** one stack, every OS. iOS is opt-in on Mac only — see [PREREQUISITES.md](./PREREQUISITES.md).
- **"Build failed — are we done?"** — Fix forward or reset app folder and re-run plan. **Reflect** on what the failure teaches about scoping and challenge passes.

## Failure modes to welcome as teaching moments

- **Auth UI with no server enforcement** → client-only gate; run breach test, it fails, fix upstream in intention/plan.
- **Tests pass but second user sees first user's data** → *the* Phase 01 lesson; do not hand-wave.
- **Secrets in client bundle** → Escape.tech story, live.
- **Agent skipped SurrealDB agent** → plan drift; challenge pass lesson.
- **"It works on my machine" but DB not running** → ops reality; SurrealDB prerequisite.

---

## What they must leave Phase 01 believing

1. **SaaS was the bargain; scoped AI build is the reopening** — David can own narrow fit; Goliath wobbles when the port moves.
2. **Vibe coding ≠ this course** — Lovable path is real and improving; **vibe engineering** is intention + auth + proof you can defend.
3. **"Real" means the whole chain** — signup → sign-in → protected routes → **per-user persisted data**.
4. **Multi-agent pipeline** — data layer before UI; intention enables the split.
5. **Auth failures are data breaches** — the second-user test is non-negotiable.
6. **Guardrails come back in-house** — Phase 02 makes shipping discipline repeatable; today you felt *why*.

*Content lecture and citations: [phase-01.md](../../../marketing/lesson-plans/phase-01.md). Typed steps: [RUN-ORDER.md](./RUN-ORDER.md). Learner concepts: [TALKING-POINTS.md](./TALKING-POINTS.md). Discussion scripts: [D01-*](../../../marketing/lesson-plans/discussion-topics.md).*
