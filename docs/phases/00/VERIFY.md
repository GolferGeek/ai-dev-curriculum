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

- Canonical `ai/` files and the generated Claude Code, Cursor, and Codex
  projections exist.
- **`docs/phases/00/`** starter docs exist.
- If **`turbo.json`** exists, basic keys are present.

Exit non-zero if something critical is missing.

## Tests (once monorepo + apps exist)

Until Part A/B add `turbo.json` and `apps/*`, only the **structure script** above is required. When implemented:

| Layer | Expectation |
|--------|------------|
| **Monorepo** | Root `npm run build` and `npm run test` (`turbo run build` / `turbo run test`). Each app under `apps/*` declares `build` and `test`. |
| **Browsers** | Documented Playwright install (e.g. `postinstall` or `npx playwright install`); consistent env for browser path if used. |
| **Track apps** | **Vite + React** under **`apps/`** — **demo-grade** per [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) and each **`intention-*.md`**. |
| **Run + prove** | After build: **lint** → **`npm run test`** (on first effort: unit + API/HTTP where applicable + Playwright e2e) → **verify** vs demo-grade bar → **browser** (open app or `/test-browser`). Prefer **`http://localhost:<port>`** for Vite. |
| **CI** | Optional: `npm ci` → `verify-curriculum-structure.sh` → `npm run build` → `npm run test`. |

Keep **curriculum tests** separate from product tests if useful, e.g. **`tests/curriculum/`** only checking invariants. Maintainer loop (rollback → fix README → retry) is in the **root README**.

### README-driven validation

If a maintainer cannot get from **clone + README + `docs/phases/00/`** to a
green build **without extra chat**, create a clean retry branch from
`starter-kit-v1`, fix the docs or scripts on the maintainer branch, commit and
push, and run the flow again.

## “Wipe and retry”

Safe to delete: **generated app folders** under `apps/*` and temporary artifacts if you need a clean **`/run-plan`**.  
Do **not** delete: **`ai/`**, generated harness directories, **`docs/phases/00/`**,
**`AGENTS.md`**, **`CLAUDE.md`**, **`.cursor/rules/`**, or
**`scripts/verify-curriculum-structure.sh`**.
