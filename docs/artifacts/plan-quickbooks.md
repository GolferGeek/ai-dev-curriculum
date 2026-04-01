# Plan — QuickBooks Killer (Web A)

**PRD:** [prd-quickbooks.md](./prd-quickbooks.md)
**Intention:** [intention-quickbooks.md](./intention-quickbooks.md)

---

## Milestone 1 — SurrealDB schema, auth, and seed data

**Agent:** surrealdb-builder

### What gets built

- `packages/surrealdb/package.json` — shared package `@curriculum/surrealdb`, type: module
- `packages/surrealdb/schema.surql` — full schema: namespace, database, tables (`user`, `invoice`, `line_item`, `expense`), fields, indexes, `DEFINE ACCESS` for record-level auth
- `packages/surrealdb/src/connection.ts` — SurrealDB connection helper (Surreal class wrapper)
- `packages/surrealdb/src/auth.ts` — signup, signin, signout helpers
- `packages/surrealdb/src/queries.ts` — typed query helpers for invoices, expenses, dashboard aggregates
- `packages/surrealdb/src/index.ts` — barrel export
- `packages/surrealdb/scripts/apply-schema.ts` — applies schema.surql to running SurrealDB, creates namespace/database first, tolerates "already exists" errors
- `packages/surrealdb/scripts/seed.ts` — inserts demo user + sample invoices + sample expenses

### Files created

```
packages/surrealdb/
  package.json
  tsconfig.json
  schema.surql
  src/
    index.ts
    connection.ts
    auth.ts
    queries.ts
  scripts/
    apply-schema.ts
    seed.ts
```

### Verification

```bash
cd packages/surrealdb && npm run db:setup   # applies schema
cd packages/surrealdb && npm run db:seed    # seeds demo data
```

### PRD goals covered

- G6 (persistence, data isolation) — schema + access controls
- G1 (auth) — DEFINE ACCESS for signup/signin
- Partial G2, G3, G4 — table definitions for invoices, expenses, line items

---

## Milestone 2 — Next.js app

**Agent:** nextjs-saas-builder

### What gets built

- `apps/quickbooks-killer/` — Next.js 14 App Router, Tailwind CSS, port 3100
- **Auth pages:** `/signin`, `/signup` — forms calling SurrealDB auth helpers; JWT stored in cookie; middleware redirects unauthenticated users
- **Dashboard:** `/dashboard` — outstanding invoices count+total, recent expenses, net profit/loss, color-coded indicator
- **Invoices:** `/invoices` (list), `/invoices/new` (create form with dynamic line items), `/invoices/[id]` (detail + mark-as-paid button)
- **Expenses:** `/expenses` (list with running total), `/expenses/new` (create form with category dropdown)
- **Layout:** sidebar navigation (Dashboard, Invoices, Expenses, Sign Out), main content area
- **Playwright tests:** `e2e/auth.spec.ts`, `e2e/invoices.spec.ts`, `e2e/expenses.spec.ts`, `e2e/dashboard.spec.ts`

### Files created

```
apps/quickbooks-killer/
  package.json
  tsconfig.json
  next.config.js
  tailwind.config.js
  postcss.config.js
  playwright.config.ts
  middleware.ts
  app/
    layout.tsx
    page.tsx              (redirects to /dashboard)
    globals.css
    signin/page.tsx
    signup/page.tsx
    dashboard/page.tsx
    invoices/
      page.tsx
      new/page.tsx
      [id]/page.tsx
    expenses/
      page.tsx
      new/page.tsx
  components/
    Sidebar.tsx
    DashboardCard.tsx
    InvoiceForm.tsx
    ExpenseForm.tsx
  lib/
    surreal.ts            (server-side SurrealDB client)
    auth.ts               (cookie helpers, getCurrentUser)
    actions.ts            (server actions for CRUD)
  e2e/
    auth.spec.ts
    invoices.spec.ts
    expenses.spec.ts
    dashboard.spec.ts
```

### Verification

```bash
npm run build                    # from monorepo root
npm run test                     # runs Playwright tests
cd apps/quickbooks-killer && npm run dev   # starts on port 3100
```

### PRD goals covered

- G1 (auth) — signin/signup pages, middleware, cookie management
- G2 (invoices) — full CRUD + mark as paid
- G3 (expenses) — create + list with running total
- G4 (income tracking) — dashboard aggregation
- G5 (dashboard) — visual layout with profit/loss indicator

---

## Risks

| Risk | Mitigation |
|------|-----------|
| SurrealDB not running when app starts | Connection helper retries with clear error message; README documents `surreal start` command |
| SurrealDB JS SDK version mismatch | Pin `surrealdb` npm package to latest stable; use documented API only |
| Playwright tests flaky due to DB state | Each test file uses fresh signup to isolate data; cleanup not needed due to per-user scoping |
| Cookie-based JWT may not work in middleware | Use `next/headers` cookies API; test early in milestone 2 |

---

## Verification (final)

```bash
# From monorepo root:
npm run build          # all workspaces compile
npm run test           # Playwright tests pass
```
