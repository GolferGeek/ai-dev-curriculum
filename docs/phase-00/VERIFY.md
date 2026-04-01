# Verify — structure and tests

## Goals

1. **Monorepo in place** — Turbo, `apps/`, `packages/`, root workspace config (once Part A is done).
2. **Whatever track was chosen** — the selected app **builds** and **tests** pass (once Part B is implemented and tests are added).

## Structure script (always)

From repo root:

```bash
./scripts/verify-curriculum-structure.sh
```

Checks (non-exhaustive; extend as the repo grows):

- Required **`.claude/`** files exist (commands, skills, agents).
- **`docs/phase-00/`** starter docs exist.
- If **`turbo.json`** exists, basic keys are present.

Exit non-zero if something critical is missing.

## Tests (to add with implementation)

**Phase 00** ships **documentation and verify script** first. When **`/run-plan`** generates real apps:

| Layer | Suggestion |
|--------|------------|
| **Monorepo** | Root `turbo run test` (or `pnpm test`) — each package declares `test`. |
| **Track-specific** | Minimum **smoke test** per app: renders or API health (e.g. Vitest/Playwright/Jest — pick one stack in the plan). |
| **CI** | Optional GitHub Action: install → `verify-curriculum-structure.sh` → `turbo run build test`. |

Keep **curriculum tests** separate from product tests if useful, e.g. **`tests/curriculum/`** only checking invariants (“monorepo has `apps/web` when Track A chosen”). That avoids coupling to one product’s UI.

## “Wipe and retry”

Safe to delete: **generated app folders** under `apps/*` and temporary artifacts if you need a clean **`/run-plan`**.  
Do **not** delete: **`.claude/`**, **`docs/phase-00/`**, **`CLAUDE.md`**, **`.cursor/rules/`**, **`scripts/verify-curriculum-structure.sh`**.
