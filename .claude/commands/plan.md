---
description: Produce an implementation plan from PRD + intention — milestones, risks, verification, touchpoints (apps/packages).
---

# /plan

When the user runs this command:

1. Load **intention** and **PRD** (default: `docs/artifacts/` or paths from `$ARGUMENTS`).
2. Produce a **plan**: milestones in order, risks, how we’ll verify each milestone, which **apps/** or **packages/** files change (high level).
3. For **monorepo work**, align with Turbo: root scripts, `turbo.json`, package boundaries.
4. For **app work**, name the track (HTTP workspace, wiki, CRM, ops pulse) and keep scope shippable.
5. Write or update `docs/artifacts/plan.md`.

Run a **sanity check**: does the plan justify the PRD and still match the intention?

Arguments: `$ARGUMENTS` — optional paths.
