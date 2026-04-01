# Architecture Monitor Report — 2026-04-01

## Summary
- Total findings: 5
- High: 2 | Medium: 2 | Low: 1

---

## quickbooks-killer (Next.js) — CLEAN

All checks pass:
- DB access only through `@curriculum/surrealdb` -- no direct imports
- Auth tokens in HTTP-only cookies via middleware (`middleware.ts`, `lib/auth.ts`)
- Server components by default; `"use client"` only on interactive components (Sidebar, InvoiceForm, ExpenseForm, error boundaries)
- Error boundaries (`error.tsx`) on every route segment (root, dashboard, invoices, invoices/new, invoices/[id], expenses, expenses/new, signin, signup)
- Empty states for invoices list, expenses list, and dashboard recent expenses
- No `any` types, no `@ts-ignore`
- No hardcoded secrets in app code
- No `console.log` in production code (only `console.error` for DB errors, which is allowed)

---

## trello-killer (Next.js) — CLEAN

All checks pass:
- DB access only through `@curriculum/surrealdb` -- no direct imports
- Auth tokens in HTTP-only cookies via middleware (`middleware.ts`, `lib/auth.ts`)
- Server components by default; `"use client"` only on interactive components (BoardView, AddCardForm, AddListForm, CardDetailModal, CardItem, MoveCardSelect, NewBoardForm, Sidebar, error boundaries)
- Error boundaries on every route segment (root, boards, boards/[id], signin, signup)
- Empty state for boards list
- No `any` types, no `@ts-ignore`
- No hardcoded secrets in app code
- No `console.log` in production code (only `console.error`)

---

## twitter-killer (SwiftUI iOS) — FINDINGS

### High

1. `twitter-killer/twitter-killer/Models/Follow.swift:6-8` — Follow model uses plain optional properties (`var follower: User?`, `var followed: User?`) without `@Relationship` declarations. Missing inverse relationship means SwiftData cannot maintain referential integrity or enforce delete rules on follows. When a User is deleted, orphaned Follow records will remain. Rule: `ios-architecture` -- "Model relationships use `@Relationship`. No manual ID lookups or string-based foreign keys."

### Medium

(none)

### Low

(none)

---

## facebook-killer (SwiftUI iOS) — FINDINGS

### High

1. `facebook-killer/facebook-killer/App/FacebookKillerApp.swift:12` — App uses `-UITest` launch argument instead of the standardized `--uitesting`. The architecture rule requires `--uitesting` for clean-state testing so that all apps share a consistent launch argument convention. UI tests in `facebook-killerUITests/UITests.swift:11` also use `-UITest`. Rule: `ios-architecture` -- "Support `--uitesting` launch argument that switches to in-memory storage and clears UserDefaults."

### Medium

(none)

### Low

(none)

---

## packages/surrealdb (Shared Package) — FINDINGS

### High

(none)

### Medium

1. `packages/surrealdb/schema/000-quickbooks.surql:31` — Hardcoded JWT signing key `'quickbooks-killer-secret-key-change-in-prod'` in schema file. While marked with a TODO comment, this is a hardcoded secret checked into version control. Rule: `pr-requirements` -- "No hardcoded secrets, tokens, or credentials." Also `system-architecture` -- credentials from env vars.

2. `packages/surrealdb/schema/001-trello.surql:31` — Hardcoded JWT signing key `'trello-killer-secret-key-change-in-prod'` in schema file. Same issue as above. Rule: `pr-requirements` -- "No hardcoded secrets, tokens, or credentials."

### Low

1. `packages/surrealdb/src/connection.ts:24-25` — Root connection defaults to `"root"/"root"` credentials via env var fallbacks. While these are sensible dev defaults and sourced from env vars, the fallback values are weak credentials that could accidentally be used in a non-dev environment. Rule: `data-architecture` -- "Connection config uses environment variables."

---

## http-workspace (Vite/React, Phase-0) — CLEAN

Phase-0 app using localStorage for local-first persistence. No SurrealDB, no auth tokens, no server components expected. All types are explicit. Empty states present (history list, response panel).

---

## team-wiki (Vite/React, Phase-0) — CLEAN

Phase-0 app using localStorage. All types explicit. Empty state for page selection. Search functionality present.

---

## pipeline-crm (Vite/React, Phase-0) — CLEAN

Phase-0 app using localStorage. All types explicit. Kanban board with deal detail drawer. Activity notes with empty state handling.

---

## ops-pulse (Vite/React, Phase-0) — CLEAN

Phase-0 app using localStorage. All types explicit. Checks dashboard with status tiles. Incident log with manual entry. Empty states handled.

---

## Cross-App Architecture Checks

| Check | Status |
|-------|--------|
| Apps import only from `@curriculum/surrealdb`, never `surrealdb` directly | PASS |
| Schema files in `packages/surrealdb/schema/` | PASS (2 files: quickbooks, trello) |
| All query functions properly typed (no `any`) | PASS |
| Separate namespaces per app domain | PASS (quickbooks, trello) |
| Auth tokens in HTTP-only cookies (web) | PASS |
| No `@ts-ignore` or `@ts-nocheck` anywhere | PASS |
| No `console.log` in production code | PASS (only in CLI scripts) |
| No direct `import Surreal` in app code | PASS |
| Apps never import from sibling apps | PASS |
| SwiftData for iOS persistence | PASS |
| Accessibility identifiers on interactive elements (iOS) | PASS |
| `--uitesting` launch argument support (iOS) | FAIL -- facebook-killer uses `-UITest` |
| No `sleep()` in UI tests | PASS |
| Error boundaries on every route segment (web) | PASS |
| Empty states for lists/collections | PASS |
