---
description: Execute the agreed plan — invoke the appropriate agent(s) to apply changes under apps/ and packages/.
---

# /run-plan

When the user runs this command:

1. Load **plan** (and PRD/intention for context). Refuse if plan is missing or ambiguous—send them back to `/plan`.
2. Determine **phase and target**:
   - **Phase 00 — Monorepo shell** → invoke agent **monorepo-builder**: Turbo, `apps/`, `packages/`, `turbo.json`, root package scripts.
   - **Phase 00 — Track app** → invoke the **track** agent: `app-builder-http-workspace`, `app-builder-team-wiki`, `app-builder-pipeline-crm`, or `app-builder-ops-pulse`.
   - **Phase 01 — SaaS killer (web)** → invoke in order:
     1. **surrealdb-builder** — schema, auth scopes, seed data, shared package.
     2. **nextjs-saas-builder** — Next.js app with pages, API routes, SurrealDB integration.
   - **Phase 01 — SaaS killer (iOS)** → invoke:
     1. **surrealdb-builder** (if plan includes server sync) — schema, auth, seed data.
     2. **ios-builder** — SwiftUI app with SwiftData, views, xcodebuild validation.
3. Apply changes in small commits or logical steps; run **build/lint** if configured and fix trivial issues.
4. Summarize what was created and what the learner should run next (`npm run dev`, `surreal start`, `xcodebuild`, etc.).

Arguments: `$ARGUMENTS` — optional `monorepo` | `track-a..d` | `quickbooks` | `trello` | `twitter` | `facebook` | `ios` | `web` if not obvious from plan.
