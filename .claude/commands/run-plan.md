---
description: Execute the agreed plan — invoke the monorepo agent or track app builder to apply changes under apps/ and packages/.
---

# /run-plan

When the user runs this command:

1. Load **plan** (and PRD/intention for context). Refuse if plan is missing or ambiguous—send them back to `/plan`.
2. Determine **phase**:
   - **Monorepo shell only** → invoke agent **monorepo-builder** (see `.claude/agents/monorepo-builder.md`): Turbo, `apps/`, `packages/`, `turbo.json`, root package scripts.
   - **First app** → invoke the **track** agent matching their choice: `app-builder-http-workspace`, `app-builder-team-wiki`, `app-builder-pipeline-crm`, or `app-builder-ops-pulse`.
3. Apply changes in small commits or logical steps; run **build/lint** if configured and fix trivial issues.
4. Summarize what was created and what the learner should run next (`pnpm dev`, etc.).

Arguments: `$ARGUMENTS` — optional `monorepo` | `track-a` | `track-b` | `track-c` | `track-d` if not obvious from plan.
