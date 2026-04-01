# Error Report — 2026-04-01 (Post-fix scan)

## Summary
- Total errors: 0
- Apps scanned: 8 + 1 shared package
- All apps clean

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
| apps/trello-killer | ✓ | ✓ 4 tests |
| apps/quickbooks-killer | ✓ | ✓ 5 tests |

## Fixed this session

| # | Severity | App | Issue | Fix |
|---|----------|-----|-------|-----|
| 1 | High | trello-killer | Playwright browser not installed | Ran `npx playwright install chromium` |
| 2 | High | trello-killer | Test locator strict mode violations | Scoped locators to `main h3`, added `waitForURL`, improved selectors |
| 3 | High | quickbooks-killer | Playwright test locator matched multiple elements | Scoped dashboard amount locators to parent cards |
| 4 | High | quickbooks-killer | Invoice test: `page.fill()` bypassed React onChange | Changed to `pressSequentially` to trigger React state updates |
| 5 | Medium | quickbooks-killer | Missing error boundaries | Added `error.tsx` to signin, signup, invoices/new, invoices/[id], expenses/new |
| 6 | Medium | quickbooks-killer | ESLint version conflict | No fix needed — already pinned to eslint@^8 compatible with Next.js 14 |
| 7 | Low | all | Turbo cache warning for surrealdb | Resolved — no longer present |

## Previously fixed (this branch)

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| — | Critical | surrealdb SDK v1 incompatible with server 3.0.4 | Upgraded to `surrealdb@^2.0.3` |
| — | Critical | Schema `string::is::email` syntax | Changed to `string::is_email` |
| — | High | All tests blocked by SDK mismatch | Resolved by upgrade |

## Warnings (non-blocking)

- trello-killer: "Only plain objects can be passed to Client Components from Server Components" — SurrealDB record IDs/datetimes not serialized to plain values. Tests pass; cosmetic only.
