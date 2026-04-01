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

## Tests (once monorepo + apps exist)

Until Part A/B add `turbo.json` and `apps/*`, only the **structure script** above is required. When implemented:

| Layer | Expectation |
|--------|------------|
| **Monorepo** | Root `npm run build` and `npm run test` (`turbo run build` / `turbo run test`). Each app under `apps/*` declares `build` and `test`. |
| **Browsers** | Documented Playwright install (e.g. `postinstall` or `npx playwright install`); consistent env for browser path if used. |
| **Track apps** | **Vite + React** under **`apps/`** — **demo-grade** per [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) and each **`intention-*.md`**. |
| **Run + browser** | **Run** the app after build; Playwright should cover **at least one meaningful interaction** per app. Prefer **`http://localhost:<port>`** for Vite. |
| **CI** | Optional: `npm ci` → `verify-curriculum-structure.sh` → `npm run build` → `npm run test`. |

Keep **curriculum tests** separate from product tests if useful, e.g. **`tests/curriculum/`** only checking invariants. Maintainer loop (rollback → fix README → retry) is in the **root README**.

### README-driven validation

If a maintainer cannot get from **clone + README + `docs/phase-00/`** to a green build **without extra chat**, **roll back** to the checkpoint commit in the README, **fix the docs or scripts**, **commit + push**, and run the flow again.

## “Wipe and retry”

Safe to delete: **generated app folders** under `apps/*` and temporary artifacts if you need a clean **`/run-plan`**.  
Do **not** delete: **`.claude/`**, **`docs/phase-00/`**, **`CLAUDE.md`**, **`.cursor/rules/`**, **`scripts/verify-curriculum-structure.sh`**.
