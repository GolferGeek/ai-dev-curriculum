# `.claude/` — Claude Code project config

**Human-readable map:** [docs/phase-00/STARTER-KIT.md](../docs/phase-00/STARTER-KIT.md) — what each **command**, **skill**, and **agent** is for.

## Commands

### Build pipeline (Phase 00+)
- **`/intention <file>`** — Review/refine an intention file → `docs/artifacts/intention.md`
- **`/prd <intention>`** — Turn intention into PRD → `docs/artifacts/prd.md`
- **`/plan <prd>`** — Create implementation plan → `docs/artifacts/plan.md`
- **`/run-plan <plan>`** — Execute plan via specialized agents

### Research & testing (Phase 01+)
- **`/research`** — Research a SaaS product to scope a killer app
- **`/test-browser`** — Visually test a running app in Chrome

### Quality engineering (Phase 02+)
- **`/scan-errors [app]`** — Scan for build/lint/test errors → `docs/artifacts/error-report.md`
- **`/fix-errors [app]`** — Fix errors from the report in batches, iterate to zero
- **`/monitor [app]`** — Scan for architectural violations → `docs/artifacts/monitor-report.md`
- **`/harden [app]`** — Fix architectural violations, verify build still passes
- **`/commit [push]`** — Pre-commit quality gate: scan + monitor + PR check → commit
- **`/pr-eval <PR>`** — Evaluate a PR, feed new rules back to pr-requirements

## Skills

### Build conventions (Phase 00+)
- **monorepo-turbo** — Turbo monorepo discipline (apps/, packages/, turbo.json)
- **prd-alignment** — Trace goals to intention, flag drift

### Technology patterns (Phase 01+)
- **surrealdb** — SurrealDB schema, auth scopes, queries, local setup
- **nextjs-saas** — Next.js App Router, auth middleware, server actions, Tailwind
- **ios-swiftui** — SwiftUI views, SwiftData, Xcode project, xcodebuild

### Architecture rules (Phase 02+)
- **system-architecture** — Cross-app rules: shared packages as contracts, payload formats, port assignments, auth flow, monorepo boundaries
- **web-architecture** — Database abstraction, auth in middleware, server components, error handling
- **ios-architecture** — SwiftData only, accessibility IDs, UI testing, thin views
- **data-architecture** — Version-controlled schemas, shared package, SurrealDB auth
- **pr-requirements** — Living PR acceptance criteria (grows via /pr-eval feedback)
- **quality-gates** — Build/lint/test commands per app type, error classification
- **terminal-reporting** — How agents report progress and results: tables, charts, status updates

## Agents

### Phase 00 — Build
- **monorepo-builder** — Turbo shell (Part A)
- **app-builder-http-workspace** — Track A: mini Postman
- **app-builder-team-wiki** — Track B: wiki/runbooks
- **app-builder-pipeline-crm** — Track C: kanban CRM
- **app-builder-ops-pulse** — Track D: ops dashboard

### Phase 01 — SaaS killers
- **saas-researcher** — Scopes SaaS killer apps, drafts intentions
- **surrealdb-builder** — SurrealDB setup, schema, auth, seed data
- **app-builder-quickbooks-killer** — Web A: invoices, expenses, dashboard (Next.js + SurrealDB)
- **app-builder-trello-killer** — Web B: boards, lists, cards (Next.js + SurrealDB)
- **app-builder-twitter-killer** — iOS A: feed, posts, follows (SwiftUI + SwiftData)
- **app-builder-facebook-killer** — iOS B: profiles, friends, feed (SwiftUI + SwiftData)

### Phase 02 — Quality engineering
- **error-scanner** — Finds build/lint/test errors (report only)
- **error-fixer** — Fixes errors in batches, iterates to zero
- **arch-monitor** — Finds architectural violations (report only)
- **arch-hardener** — Fixes architectural violations
- **commit-agent** — Pre-commit quality gate
- **pr-evaluator** — Reviews PRs, feeds back new rules
