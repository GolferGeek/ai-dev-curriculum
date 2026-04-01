# Error Report — 2026-04-01 (Full Codebase Scan)

## Summary
- Total errors: 9
- Critical: 0 | High: 5 | Medium: 3 | Low: 1
- Apps scanned: 8 + 1 shared package
- Clean apps: packages/surrealdb, http-workspace, team-wiki, pipeline-crm, ops-pulse, twitter-killer, facebook-killer
- Apps with errors: quickbooks-killer, trello-killer

## Clean ✓

| App | Build | Tests |
|-----|-------|-------|
| packages/surrealdb | ✓ | — |
| apps/http-workspace | ✓ | ✓ (cached) |
| apps/team-wiki | ✓ | ✓ (cached) |
| apps/pipeline-crm | ✓ | ✓ (cached) |
| apps/ops-pulse | ✓ | ✓ (cached) |
| apps/twitter-killer | ✓ | ✓ 12 tests |
| apps/facebook-killer | ✓ | ✓ 10 tests |

## apps/quickbooks-killer — ERRORS

### High
1. **[test] Playwright tests fail — webServer exited early.** `npm run test` fails with `Error: Process from config.webServer exited early`. Playwright config starts Next.js dev server but it crashes (likely missing SurrealDB connection or env config).

### Medium
2. **[lint] ESLint not configured.** `.eslintrc.json` exists but `eslint` and `eslint-config-next` have version conflicts (ESLint 9 vs Next.js 14). Lint script non-functional.
3. **[build] No error boundaries.** Pages under `src/app/` have no `error.tsx` files.

### Low
4. **[warning] Turbo cache warning.** `no output files found for task @curriculum/surrealdb#build`.

## apps/trello-killer — ERRORS

### High
5. **[test] Playwright browser not installed.** All 4 tests fail: `Please run: npx playwright install`. Chromium binary missing.
6. **[test] e2e/auth.spec.ts:6** — redirects test (blocked by #5)
7. **[test] e2e/auth.spec.ts:11** — signup/signin flow (blocked by #5)
8. **[test] e2e/boards.spec.ts:6** — board creation (blocked by #5)
9. **[test] e2e/full-flow.spec.ts:6** — full e2e flow (blocked by #5)

## Root cause analysis

| Root cause | Errors caused | Fix |
|-----------|--------------|-----|
| Missing Playwright browser (trello) | 4 high (#5-9) | `npx playwright install chromium` in trello-killer |
| QuickBooks webServer crash | 1 high (#1) | Fix Playwright config / SurrealDB env for test |
| ESLint version conflict | 1 medium (#2) | Pin eslint@^8 with compatible config |
| Missing error boundaries | 1 medium (#3) | Add error.tsx to app routes |
| Turbo cache config | 1 low (#4) | Add build outputs to surrealdb package |

## Previously fixed (this branch)

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| — | Critical | surrealdb SDK v1 incompatible with server 3.0.4 | Upgraded to `surrealdb@^2.0.3` |
| — | Critical | Schema `string::is::email` syntax | Changed to `string::is_email` |
| — | High | All tests blocked by SDK mismatch | Resolved by upgrade |
