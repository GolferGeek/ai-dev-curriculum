# Phase 01 — Build a SaaS killer

*Last verified: June 2026*
**Start here:** [OVERVIEW.md](./OVERVIEW.md) — one-page summary (today · learn · leave with).
*Talking points: [TALKING-POINTS.md](./TALKING-POINTS.md) — the concepts you should be able to explain after this phase.*

**Prereqs:** Phase 00 complete (Turbo monorepo + one app track working). See [PREREQUISITES.md](./PREREQUISITES.md).

You have a monorepo. You have the pipeline. Phase 01 is two things in one session: **why ownable SaaS slices are back** (SaaS Killers), and **how to build one with real auth** — vibe *engineering*, not vibe coding. You'll produce a credible killer app with **SurrealDB**, **Next.js**, signup/sign-in, and **per-user data** you can prove in ~two hours of focused work.

---

## What's new in this phase

Phase 00 gave you Vite + React apps with localStorage. Phase 01 adds **economics + accountability**:

| Theme | Phase 00 | Phase 01 |
|-------|----------|----------|
| **Why build** | Pipeline + monorepo | **SaaS Killers** — the bargain, the reopening, ownable slices |
| **How build** | Single app-builder agent | **Multi-agent** — DB/auth first, then app |
| **Accountability** | Bracket the work | **Not vibe coding** — prove auth + **per-user isolation** |
| **Database** | localStorage | **SurrealDB** (schema + auth scopes) |
| **Auth** | None | Signup · sign-in · protected routes · isolation |
| **Web framework** | Vite + React | **Next.js 16 (App Router)** |
| **Visual QA** | Manual | **`/test-browser`** + breach test |

---

## New agents and skills

These are already set up in `.claude/` — here's what they do and why.

### Agents

| Agent | What it does | When it runs |
|-------|-------------|--------------|
| **saas-researcher** | Analyzes a SaaS product to scope a buildable killer app. Drafts intention files. | Before `/intention` — helps you pick and scope your target. |
| **surrealdb-builder** | Sets up SurrealDB locally, defines schemas, configures auth scopes, creates seed data. | First step of `/run-plan` — builds the data layer before the app. |
| **nextjs-saas-builder** | Builds the Next.js app — pages, auth flows, API routes, dashboard, Playwright tests. | Second step of `/run-plan` for any web delivery, including web versions of Twitter or Facebook. |
| **ios-builder** | Builds the SwiftUI app — views, SwiftData models, xcodebuild validation, XCTest. | Optional Mac-only delivery for Twitter or Facebook. |

### Skills

| Skill | What it enforces |
|-------|-----------------|
| **surrealdb** | Schema file conventions, auth scope patterns, SurrealQL best practices, local dev setup. |
| **nextjs-saas** | App Router patterns, auth middleware, server actions, Tailwind, monorepo integration. |
| **ios-swiftui** | SwiftUI views, SwiftData models, Xcode project structure, xcodebuild CLI, testing. |
| **monorepo-turbo** | (From phase 00) Turbo conventions — still applies for workspace structure. |
| **prd-alignment** | (From phase 00) Traces goals to intention, flags drift — still applies. |

### Slash-invoked skills

| Slash skill | What it does |
|---------|-------------|
| **`/research`** | Invokes saas-researcher to analyze a SaaS product and draft an intention. Use this first if you want help scoping. |
| **`/intention`** | (Updated) Now supports phase-01 SaaS killers — QuickBooks, Trello, Twitter, Facebook, or custom. |
| **`/prd`** | (Same) Turns intention into PRD with goals, non-goals, success criteria. |
| **`/plan`** | (Updated) Now plans multi-agent builds — SurrealDB setup milestone, then app build milestone. |
| **`/run-plan`** | (Updated) Invokes agents in order: surrealdb-builder first, then nextjs-saas-builder or ios-builder. |
| **`/test-browser`** | Uses Chrome browser tools to visually walk through your running app and report what works. |

---

## Pick your SaaS killer

Choose one (or bring your own — run `/research custom` to scope it):

| Track | Intention file | Target SaaS | Stack | One-line pitch |
|-------|---------------|-------------|-------|---------------|
| **Web A** | [intention-quickbooks-killer.md](./intention-quickbooks-killer.md) | QuickBooks | Next.js + SurrealDB | Invoices, income/expenses, simple dashboard — what freelancers actually use |
| **Web B** | [intention-trello-killer.md](./intention-trello-killer.md) | Trello | Next.js + SurrealDB | Kanban boards, cards, drag-and-drop, collaboration |
| **Social A** | [intention-twitter-killer.md](./intention-twitter-killer.md) | Twitter | **Your choice:** Next.js + SurrealDB, or SwiftUI + SwiftData on Mac | Personal feed — posts, follows, timeline |
| **Social B** | [intention-facebook-killer.md](./intention-facebook-killer.md) | Facebook | **Your choice:** Next.js + SurrealDB, or SwiftUI + SwiftData on Mac | Family/friend circle — profiles, friends, feed, photos |

> **The product intention does not lock the platform.** Twitter and Facebook have supplied iOS reference implementations, but a learner or client may change either effort to a web application. The cohort default is Next.js + SurrealDB so every participant can use Windows, macOS, or Linux. Native iOS remains an opt-in choice for Mac/Xcode users.

---

## The process (same muscle, bigger tools)

### 1. Research & intention (~15 min)

Read the provided intention file for your track. Then review and refine it:

```
/intention docs/phases/01/intention-quickbooks-killer.md
```

Output: `docs/artifacts/intention.md`

(Substitute your track's file: `intention-trello-killer.md`, `intention-twitter-killer.md`, or `intention-facebook-killer.md`.)

For a **custom** SaaS killer, run `/research "your idea"` first to get a draft, then `/intention docs/artifacts/intention.md` to refine it.

### 2. PRD (~10 min)

Pass the refined intention to `/prd`:

```
/prd docs/artifacts/intention.md
```

Output: `docs/artifacts/prd.md`

Review it: Does every Demo-grade minimum have a matching goal with testable acceptance criteria? Are non-goals explicit? Fix before proceeding.

### 3. Plan (~10 min)

Pass the PRD to `/plan`:

```
/plan docs/artifacts/prd.md
```

Output: `docs/artifacts/plan.md`

The plan should record the chosen delivery platform and name **which agents** handle which milestones:
- **surrealdb-builder** → database schema, auth scopes, seed data
- **nextjs-saas-builder** for web, or **ios-builder** for the optional native iOS delivery → the app itself

Review it: Does every PRD goal have a milestone? Are verification steps included? Fix before proceeding.

### 4. Build (~60 min)

Pass the plan to `/run-plan`:

```
/run-plan docs/artifacts/plan.md
```

This invokes agents sequentially. For web apps: SurrealDB agent builds the data layer first, then the Next.js agent builds the app on top. For iOS: the iOS agent builds everything.

### 5. Test & verify (~30 min)

**Required:** [VERIFY.md](./VERIFY.md) — auth chain + **second-user isolation test**. A green preview is not done.

**Web apps (class default):**
```
npm run build               # does it compile?
npm run test                # do Playwright tests pass?
/test-browser               # visual QA in Chrome
# Manual: user A vs user B — can B see A's data? (RUN-ORDER Part B)
```

**iOS apps:**
```
xcodebuild -scheme <AppName> -destination 'platform=iOS Simulator,name=iPhone 17' build test
```

---

## Quality bar

See [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) plus the **Demo-grade minimums** in each track's `intention-*.md`.

The bar is the same as phase 00: **credible product slices**, not starter screens. But now "credible" includes **real auth** (sign up, sign in, protected routes) and **real data** (SurrealDB, not just localStorage).

---

## Why this order

- **Same pipeline:** `/intention` → `/prd` → `/plan` → `/run-plan` — you already know it.
- **SaaS killer, not clone:** Scoped fit beats feature parity — David, not a failed Goliath imitation.
- **Data before UI:** SurrealDB agent first — the anti-vibe-coding pattern.
- **Proof over preview:** Second-user test separates demo from breach.
- **Choice matters:** Pick the product that motivates you — motivation drives better work in a 2-hour session.

---

## Quick reference

- **One-page summary:** [OVERVIEW.md](./OVERVIEW.md)
- **Step-by-step:** [RUN-ORDER.md](./RUN-ORDER.md) — Part A build · Part B auth proof
- **Instructor guide:** [TEACHING.md](./TEACHING.md)
- **Slash skills:** [COMMANDS.md](./COMMANDS.md) · **Toolkit map:** [STARTER-KIT.md](./STARTER-KIT.md)
- **Quality bar:** [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) · **Verify:** [VERIFY.md](./VERIFY.md)
- **Prerequisites:** [PREREQUISITES.md](./PREREQUISITES.md)
