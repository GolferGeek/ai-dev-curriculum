# Phase 01 — Build a SaaS killer

**Prereqs:** Phase 00 complete (Turbo monorepo + one app track working). See [PREREQUISITES.md](./PREREQUISITES.md).

You have a monorepo. You have the command pipeline (`/intention` → `/prd` → `/plan` → `/run-plan`). Now use them to build something **real** — a SaaS killer app with **authentication**, **database**, and **product-grade UI** in about two hours.

---

## What's new in this phase

Phase 00 gave you Vite + React apps with localStorage. Phase 01 upgrades the stack:

| Layer | Phase 00 | Phase 01 |
|-------|----------|----------|
| **Database** | localStorage | **SurrealDB** (local, schema-driven) |
| **Auth** | None | **SurrealDB scopes** (signup/signin, JWT) |
| **Web framework** | Vite + React | **Next.js 14 (App Router)** |
| **Mobile** | — | **SwiftUI + SwiftData** (iOS tracks) |
| **Visual QA** | Manual | **Chrome browser tools** (`/test-browser`) |

---

## New agents, skills, and commands

These are already set up in `.claude/` — here's what they do and why.

### Agents

| Agent | What it does | When it runs |
|-------|-------------|--------------|
| **saas-researcher** | Analyzes a SaaS product to scope a buildable killer app. Drafts intention files. | Before `/intention` — helps you pick and scope your target. |
| **surrealdb-builder** | Sets up SurrealDB locally, defines schemas, configures auth scopes, creates seed data. | First step of `/run-plan` — builds the data layer before the app. |
| **nextjs-saas-builder** | Builds the Next.js app — pages, auth flows, API routes, dashboard, Playwright tests. | Second step of `/run-plan` for web tracks (QuickBooks, Trello). |
| **ios-builder** | Builds the SwiftUI app — views, SwiftData models, xcodebuild validation, XCTest. | `/run-plan` for iOS tracks (Twitter, Facebook). |

### Skills

| Skill | What it enforces |
|-------|-----------------|
| **surrealdb** | Schema file conventions, auth scope patterns, SurrealQL best practices, local dev setup. |
| **nextjs-saas** | App Router patterns, auth middleware, server actions, Tailwind, monorepo integration. |
| **ios-swiftui** | SwiftUI views, SwiftData models, Xcode project structure, xcodebuild CLI, testing. |
| **monorepo-turbo** | (From phase 00) Turbo conventions — still applies for workspace structure. |
| **prd-alignment** | (From phase 00) Traces goals to intention, flags drift — still applies. |

### Commands

| Command | What it does |
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
| **iOS A** | [intention-twitter-killer.md](./intention-twitter-killer.md) | Twitter | SwiftUI + SwiftData | Personal feed — posts, follows, timeline |
| **iOS B** | [intention-facebook-killer.md](./intention-facebook-killer.md) | Facebook | SwiftUI + SwiftData | Family/friend circle — profiles, friends, feed, photos |

> **Mac with Xcode?** You can pick an iOS track. **No Xcode?** Stick with Web A or Web B.

---

## The process (same muscle, bigger tools)

### 1. Research & intention (~15 min)

```
/research quickbooks        # or trello, twitter, facebook, custom
/intention                  # refine the draft into your intention file
```

Read the provided intention file for your track. Restate or tighten it with `/intention` — or start from the research agent's draft if you went custom.

### 2. PRD & plan (~15 min)

```
/prd                        # turn intention into requirements
/plan                       # turn PRD into milestones with agent assignments
```

The plan should name **which agents** handle which milestones:
- **surrealdb-builder** → database schema, auth scopes, seed data
- **nextjs-saas-builder** or **ios-builder** → the app itself

### 3. Build (~60 min)

```
/run-plan                   # agents build in order: DB first, then app
```

This invokes agents sequentially. The SurrealDB agent builds the data layer, then the app agent builds on top of it.

### 4. Test & verify (~30 min)

```
npm run build               # does it compile?
npm run test                # do Playwright tests pass?
/test-browser               # visual QA in Chrome
```

For iOS:
```
xcodebuild -scheme <AppName> -destination 'platform=iOS Simulator,name=iPhone 16' build test
```

---

## Quality bar

See [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) plus the **Demo-grade minimums** in each track's `intention-*.md`.

The bar is the same as phase 00: **credible product slices**, not starter screens. But now "credible" includes **real auth** (sign up, sign in, protected routes) and **real data** (SurrealDB, not just localStorage).

---

## Why this order

- **Same pipeline:** `/intention` → `/prd` → `/plan` → `/run-plan` — you already know it.
- **More agents:** The new agents carry domain expertise (SurrealDB, Next.js SaaS patterns, SwiftUI) so you don't need to be an expert.
- **Real stack:** Auth + database + framework = what production apps actually look like.
- **Choice matters:** Pick the product that interests you — motivation drives better work in a 2-hour session.
