# Phase 02 — Quality engineering

**Prereqs:** Phase 01 complete (at least one SaaS killer app built and working).

Welcome to the quality phase. You've built a working app — now you're going to learn how professional development teams **keep it working** as they iterate, scale, and ship. The tools in this phase are what separate a prototype from a product.

---

## What this phase is about

In phase 01, you built an app and it worked. But ask yourself:

- Did you check if there are lint errors? TypeScript warnings? Failing edge cases in tests?
- Did you check if the architecture is clean? Is anything talking to the database directly instead of going through the shared package? Is auth handled consistently?
- When you commit and push, how confident are you that a code reviewer would approve it?

This phase gives you **six commands** that answer those questions automatically. They work in three pairs — each pair has a **scanner** that finds problems and a **fixer** that solves them.

---

## The toolkit at a glance

### Pair 1: Build quality — find and fix errors

| Command | What it does |
|---------|-------------|
| **`/scan-errors [app]`** | Runs build, lint, and tests. Writes every error to a report, classified by severity. Does **not** fix anything. |
| **`/fix-errors [app]`** | Reads the error report, groups related errors, fixes them in batches, then re-scans. Iterates until zero errors. |

**Why it exists:** Running `npm run build`, fixing one error, rebuilding, fixing another, rebuilding... is painful. `/scan-errors` captures everything at once. `/fix-errors` groups related errors (one missing import might cause 10 cascading failures) and fixes the root cause, not each symptom. After fixing everything, it re-scans to catch anything the fixes broke — and repeats up to 3 rounds.

### Pair 2: Architectural quality — find and fix design violations

| Command | What it does |
|---------|-------------|
| **`/monitor [app]`** | Scans your code against the **architecture skills** — the rules your team has decided matter. Writes a findings report. Does **not** fix anything. |
| **`/harden [app]`** | Reads the findings report, fixes the violations, then runs `/scan-errors` to make sure the fixes didn't break the build. |

**Why it exists:** Your app can build and pass tests while still having serious architectural problems — database calls scattered through UI components, auth tokens in localStorage, API routes that skip authentication. The build doesn't catch these. `/monitor` does, because it reads the **architecture skills** (more on those below) and checks every file against them.

### Pair 3: Ship quality — commit, create PRs, and review

| Command | What it does |
|---------|-------------|
| **`/commit`** | Before committing, runs error scan + architecture monitor + PR requirements check. Only commits if everything passes. Blocks if anything fails. |
| **`/commit push`** | Same checks, then commits and pushes to remote. |
| **`/commit pr`** | Same checks, then commits, pushes, and **creates a PR** on GitHub. |
| **`/pr-evals`** | Lists all open PRs — pick one to evaluate. |
| **`/pr-eval <PR>`** | Evaluates a PR against all rules. **Approves** on GitHub if clean. **Requests changes** if must-fix issues exist. When it finds a new violation pattern, it **adds it** to the rules so `/commit` catches it next time. |

**Why it exists:** `/commit pr` is your pre-flight checklist + launch in one command. `/pr-evals` gives you a dashboard of what's waiting for review. `/pr-eval` is the code reviewer — and its superpower is the **feedback loop**: every new issue it finds becomes a rule that `/commit` enforces automatically going forward. When the review passes, it approves the PR on GitHub so you don't have to context-switch to the browser.

---

## The skills that power it all

The commands above are the interface. The **skills** are the brains. Each skill is a document full of rules that the agents read and enforce. Here's what each one covers:

### `system-architecture` — how apps work together

This is the big-picture skill. It covers:
- **Shared packages are contracts.** Apps talk to the database through `packages/surrealdb/`, never directly. If we swap databases tomorrow, only the package changes — no app code touched.
- **Schema files are the data contract.** Types in your code must match types in the `.surql` schema files.
- **Auth follows a standard flow.** SurrealDB issues JWTs → web apps store them in HTTP-only cookies → iOS apps store them in Keychain. The JWT carries `$auth.id` which the database uses for row-level permissions.
- **Port assignments and namespaces** are standardized so apps don't step on each other.
- **Monorepo boundaries:** apps depend on packages, never on sibling apps.

This is the skill a tech lead maintains. It answers: "How does our system fit together?"

### `web-architecture` — rules for Next.js apps

- All database access through the shared package — never `import Surreal` in app code
- Auth tokens managed by middleware only — never in components or localStorage
- Server components by default — `"use client"` only when interactivity requires it
- Every page has error handling and every list has an empty state
- API routes must validate auth before any database call

### `ios-architecture` — rules for SwiftUI apps

- SwiftData for all persistence — no Core Data, no UserDefaults for domain data
- Accessibility identifiers on all interactive elements (for XCUITest)
- Support `--uitesting` launch argument for clean-state testing
- Views are thin — extract business logic to models or helpers
- Every list has an empty state

### `data-architecture` — rules for the SurrealDB layer

- All schemas in version-controlled `.surql` files — no ad-hoc SQL
- Schemas must be idempotent (safe to run twice)
- SurrealDB 3.x syntax (`DEFINE ACCESS`, not old `DEFINE SCOPE`)
- Row-level permissions via `$auth.id` — the database enforces data isolation, not the app

### `pr-requirements` — the living checklist

This is the PR acceptance criteria — what must be true before code ships. It covers build quality, test quality, architecture compliance, code quality, and commit hygiene.

**The special thing about this skill:** it grows. When `/pr-eval` reviews a PR and finds a problem that isn't covered by the existing rules, it **adds a new rule**. Next time someone runs `/commit`, that new rule is part of the checklist. Your quality bar gets higher every sprint.

### `quality-gates` — what to run and how to classify

Defines the exact build/lint/test commands for each app type (Next.js vs SwiftUI) and how to classify errors:
- **Critical:** build fails, app won't start
- **High:** tests fail, features broken
- **Medium:** lint violations, warnings
- **Low:** style issues, unused imports

### `terminal-reporting` — how agents talk to you

All phase-02 agents follow a consistent reporting format so you always know what's happening:

- **During work:** live progress tables showing what's running, what's been found, what agents are working on
- **After work:** clean summary tables with severity counts, specific issues listed, report file path, and "next step" suggestion
- **During commit:** a checklist showing each quality gate as it passes or fails
- **During PR eval:** progress through files being reviewed, accumulating issue counts

You'll see tables like this throughout the phase — they're designed to be scannable at a glance so you're never wondering "what's it doing?"

---

## The agents behind the scenes

You don't invoke agents directly — the commands do it for you. But here's who does the work:

| Agent | Job | Skills it reads |
|-------|-----|----------------|
| **error-scanner** | Finds build/lint/test errors | quality-gates |
| **error-fixer** | Fixes errors in batches | quality-gates + app-specific architecture |
| **arch-monitor** | Finds architectural violations | system-architecture, pr-requirements + app-specific |
| **arch-hardener** | Fixes architectural violations | system-architecture, pr-requirements + app-specific |
| **commit-agent** | Pre-commit quality gate | quality-gates, pr-requirements, system-architecture |
| **pr-evaluator** | Reviews PRs, feeds back new rules | quality-gates, pr-requirements, system-architecture |

Each command can target **one app** (e.g. `/scan-errors quickbooks`) or **all apps** (e.g. `/scan-errors` with no argument). When targeting all apps, the agent becomes an orchestrator — spinning up per-app workers. iOS apps always run sequentially (they share the simulator).

---

## Let's do it — step by step

You'll work with the SaaS killer app you built in Phase 01. The examples below use `quickbooks` — substitute your app name.

### Step 1: Scan for errors

```
/scan-errors quickbooks
```

This runs the build, linter, and tests for the QuickBooks killer. It writes every error it finds to `docs/artifacts/error-report.md`, grouped by app and classified by severity.

Open the report and read it. You'll see things like:
- TypeScript errors (critical)
- Test failures (high)  
- Lint violations (medium)
- Warnings (low)

Don't fix anything manually yet. That's what the next command is for.

### Step 2: Fix the errors

```
/fix-errors quickbooks
```

This reads `docs/artifacts/error-report.md`, groups related errors by root cause, and fixes them in priority order — critical first, then high, medium, low.

After fixing everything, it runs `/scan-errors` again automatically. If new errors appeared (a fix can break something else), it fixes those too. Up to 3 rounds.

When it's done, your error report should show zero critical and high errors.

### Step 3: Monitor architecture

```
/monitor quickbooks
```

Now we go deeper than "does it build." This scans your code against the architecture skills — `web-architecture`, `data-architecture`, `system-architecture` — and writes findings to `docs/artifacts/monitor-report.md`.

You'll likely find things like:
- A component importing `surrealdb` directly instead of using the shared package (high)
- A page missing an empty state for new users (medium)
- An API route that doesn't check auth before querying (high)

Read the report. Each finding tells you which rule it violates and where.

### Step 4: Harden the architecture

```
/harden quickbooks
```

This reads the monitor report and fixes each violation. Then it runs `/scan-errors` to make sure the architectural fixes didn't break the build.

After this step, your app should be clean: zero build errors AND zero architectural violations.

### Step 5: Commit and create a PR

```
/commit pr
```

This is the quality gate + ship in one command. Before committing, it runs:
1. Error scan (build + lint + test)
2. Architecture monitor (all rules)
3. PR requirements check (every item in `pr-requirements`)

If **anything** fails, it blocks the commit and tells you exactly what to fix. No guessing.

If everything passes, it commits, pushes to your branch, and creates a PR on GitHub. You'll get the PR URL back.

You can also commit without creating a PR:

```
/commit                         # just commit locally
/commit push                    # commit and push (no PR)
```

### Step 6: Review open PRs

```
/pr-evals
```

This lists all open PRs in the repo. Pick one and it runs a full evaluation on it.

Or evaluate a specific PR directly:

```
/pr-eval 42
```

The evaluator reads every changed file, checks it against all architecture rules and PR requirements, and produces a structured review: verdict, issues, suggestions.

- **If the PR is clean:** it runs `gh pr review --approve` — the PR is approved on GitHub.
- **If there are must-fix issues:** it runs `gh pr review --request-changes` with the list of what needs fixing.

**The feedback loop:** If the evaluator finds a violation that the current rules don't cover, it adds a new rule to `.claude/skills/pr-requirements/SKILL.md`. Next time anyone runs `/commit`, that rule is part of the checklist. The system gets smarter every time.

---

## The feedback loop — the most important concept

```
Developer builds → /commit pr → gates pass → PR created on GitHub
                                                     ↓
                   /pr-evals → pick PR → /pr-eval → approved (or changes requested)
                                              ↓
                   Finds new pattern → adds to pr-requirements → /commit catches it next time
```

Your quality rules **evolve with your codebase**. Every code review makes future commits better. This is how professional teams scale quality without slowing down — the rules remember what humans discovered.

---

## Quick reference

- **Step-by-step checklist:** [RUN-ORDER.md](./RUN-ORDER.md)
- **Architecture skills:** `.claude/skills/system-architecture/`, `web-architecture/`, `ios-architecture/`, `data-architecture/`
- **PR requirements:** `.claude/skills/pr-requirements/SKILL.md`
- **Error report:** `docs/artifacts/error-report.md` (created by `/scan-errors`)
- **Monitor report:** `docs/artifacts/monitor-report.md` (created by `/monitor`)

---

## Why this matters

- **Phase 00** taught you the pipeline: intention → PRD → plan → build
- **Phase 01** taught you to build real apps with auth and databases
- **Phase 02** teaches you to **keep them healthy** — automated scanning, architectural governance, quality gates, and evolving rules

These are the tools that let a team of developers ship fast without shipping broken. The agents carry the expertise. The skills carry the rules. The commands give you control. And the feedback loop means the system gets better every time someone uses it.
