---
description: Produce an implementation plan from PRD + intention — milestones, risks, verification, touchpoints (apps/packages).
---

# /plan

When the user runs this command:

1. Load **intention** and **PRD** (default: `docs/artifacts/` or paths from `$ARGUMENTS`).
2. Produce a **plan**: milestones in order, risks, how we’ll verify each milestone, which **apps/** or **packages/** files change (high level).
3. For **monorepo work**, align with Turbo: root scripts, `turbo.json`, package boundaries.
4. For **phase-00 app work**, name the track (HTTP workspace, wiki, CRM, ops pulse) and keep scope shippable.
5. For **phase-01 SaaS killers**:
   - **Web apps** (QuickBooks/Trello killer): plan should include SurrealDB setup milestone (schema, auth scopes, seed data via **surrealdb-builder**), then Next.js app milestone (pages, API routes, auth flow via **nextjs-saas-builder**).
   - **iOS apps** (Twitter/Facebook killer): plan should include SwiftData models, SwiftUI views, and optionally SurrealDB sync via **ios-builder**.
   - Name which **agents** handle which milestones.
6. Write or update `docs/artifacts/plan.md`.

Run a **sanity check**: does the plan justify the PRD and still match the intention?

Arguments: `$ARGUMENTS` — optional paths.
