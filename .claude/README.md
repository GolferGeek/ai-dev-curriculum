# `.claude/` — Claude Code project config

**Human-readable map:** [docs/phase-00/STARTER-KIT.md](../docs/phase-00/STARTER-KIT.md) — what each **command**, **skill**, and **agent** is for.

## Commands

- **`/intention`** — Capture product intent (phase 00 tracks or phase 01 SaaS killers)
- **`/prd`** — Turn intention into PRD with goals, non-goals, success criteria
- **`/plan`** — Create implementation plan from PRD (names agents per milestone)
- **`/run-plan`** — Execute plan via specialized agents
- **`/research`** — (Phase 01) Research a SaaS product to scope a killer app
- **`/test-browser`** — (Phase 01) Visually test a running app in Chrome

## Skills

- **monorepo-turbo** — Turbo monorepo discipline (apps/, packages/, turbo.json)
- **prd-alignment** — Trace goals to intention, flag drift
- **surrealdb** — (Phase 01) SurrealDB schema, auth scopes, queries, local setup
- **nextjs-saas** — (Phase 01) Next.js App Router, auth middleware, server actions, Tailwind
- **ios-swiftui** — (Phase 01) SwiftUI views, SwiftData, Xcode project, xcodebuild

## Agents

### Phase 00
- **monorepo-builder** — Builds Turbo shell (Part A)
- **app-builder-http-workspace** — Track A: mini Postman
- **app-builder-team-wiki** — Track B: wiki/runbooks
- **app-builder-pipeline-crm** — Track C: kanban CRM
- **app-builder-ops-pulse** — Track D: ops dashboard

### Phase 01
- **saas-researcher** — Scopes SaaS killer apps, drafts intentions
- **surrealdb-builder** — SurrealDB setup, schema, auth, seed data
- **nextjs-saas-builder** — Next.js SaaS app (web tracks)
- **ios-builder** — SwiftUI iOS app (iOS tracks)
