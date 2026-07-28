---
user-invocable: false
name: monorepo-turbo
description: Apply when scaffolding or changing Turbo monorepo layout — apps/, packages/, turbo.json, root scripts, pnpm/npm workspace.
---

# Monorepo (Turbo)

When this skill applies:

- Prefer **Turborepo** at repo root with `turbo.json` pipelines: `build`, `test`, `lint` as the project defines.
- Place deployable apps under **`apps/`** (e.g. `apps/web`, `apps/api`); shared code under **`packages/`** (e.g. `packages/ui`, `packages/config`, `packages/types`).
- Use the **package manager** already chosen in the repo (document in root README); do not mix lockfiles.
- Keep **boundaries**: apps depend on packages; avoid apps importing sibling apps without a documented reason.
- After structural changes, suggest **`turbo run build`** (or equivalent) from root to validate the graph.
