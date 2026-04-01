# Error Report — 2026-04-01 (Round 2)

## Summary
- Total errors: 3 (was 5)
- Critical: 0 ✓ (was 1) | High: 0 ✓ (was 1) | Medium: 2 | Low: 1
- Apps scanned: quickbooks-killer
- Packages scanned: @curriculum/surrealdb

## Fixes applied (round 1)

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | Critical | surrealdb SDK v1 incompatible with server 3.0.4 | Upgraded to `surrealdb@^2.0.3`, changed all 9 files from `import Surreal from` to `import { Surreal } from` |
| 2 | Critical | Schema `string::is::email` syntax error | Changed to `string::is_email` in schema.surql |
| 3 | High | Playwright tests blocked by SDK mismatch | Resolved by SDK upgrade above |

## Remaining

### @curriculum/surrealdb
- No errors remaining ✓

### quickbooks-killer

#### Medium
- [package.json] **ESLint dependency conflicts.** ESLint 9 incompatible with Next.js 14's eslint-config-next. ESLint 8 has circular plugin config issue. Needs Next.js-specific ESLint setup or upgrade to Next.js 15.
- [src/app/] **No error boundaries.** Pages do not have `error.tsx` files.

#### Low
- [general] Lint script not functional due to above ESLint issues.

## Status

```
┌──────────────┬───────┬───────┬───────────┐
│ Severity     │ Found │ Fixed │ Remaining │
├──────────────┼───────┼───────┼───────────┤
│ Critical     │     2 │     2 │         0 │
│ High         │     1 │     1 │         0 │
│ Medium       │     2 │     0 │         2 │
│ Low          │     1 │     0 │         1 │
└──────────────┴───────┴───────┴───────────┘
```
