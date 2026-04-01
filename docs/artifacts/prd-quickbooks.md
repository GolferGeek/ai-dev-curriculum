# PRD — QuickBooks Killer (Web A)

**Intention:** [intention-quickbooks.md](./intention-quickbooks.md)

## Summary

A self-hosted invoicing and expense tracker for freelancers. Users sign up, create invoices for clients, log expenses, and view a real-time profit/loss dashboard — all backed by SurrealDB with per-user data isolation. The app ships as a Next.js 14 App Router project inside the curriculum monorepo.

## Goals

Each goal maps to a Demo-grade minimum from the intention.

### G1 — Auth (Intention #1)

- User can sign up with email + password; account is created in SurrealDB.
- User can sign in; a session token (JWT) is stored in an HTTP-only cookie.
- Unauthenticated requests to any route except `/signin` and `/signup` redirect to `/signin`.
- User can sign out; cookie is cleared and they are redirected to `/signin`.
- **Acceptance:** Playwright test signs up a new user, signs out, signs back in, and verifies redirect when not authenticated.

### G2 — Invoices CRUD (Intention #2)

- User can create an invoice: client name (text), one or more line items (description + amount), due date (date picker).
- Invoice list page shows all invoices for the current user with status (unpaid / paid), client, total, due date.
- Invoice detail page shows full line items and totals.
- User can mark an unpaid invoice as paid (sets `paid_at` timestamp).
- **Acceptance:** Playwright test creates an invoice with 2 line items, verifies it appears in the list, opens detail, marks as paid, and confirms status change.

### G3 — Expenses CRUD (Intention #3)

- User can create an expense: description, amount, category (dropdown), date.
- Expense list shows all expenses for the current user sorted by date descending, with a running total column.
- **Acceptance:** Playwright test creates 2 expenses, verifies list order and running total.

### G4 — Income tracking (Intention #4)

- Paid invoices automatically count as income (sum of paid invoice totals).
- Dashboard displays: total income, total expenses, net (income - expenses).
- **Acceptance:** After marking an invoice as paid, dashboard net value updates correctly.

### G5 — Dashboard (Intention #5)

- Dashboard is the post-login landing page (`/dashboard`).
- Shows: outstanding invoices (count + total amount), recent expenses (last 5), net profit/loss.
- At least one visual element: a color-coded profit/loss indicator (green for profit, red for loss).
- **Acceptance:** Playwright test logs in, verifies dashboard sections render with correct data after seeding invoices and expenses.

### G6 — Persistence and data isolation (Intention #6)

- All entities stored in SurrealDB tables: `user`, `invoice`, `line_item`, `expense`.
- Data survives server restart.
- Users only see their own records (enforced at the DB level via record access `WHERE` clauses).
- **Acceptance:** Two different test users cannot see each other's invoices.

## Non-goals

- Payment gateway integration (Stripe, PayPal).
- Tax calculations or filing features.
- Multi-currency support.
- Team / multi-user shared accounting.
- PDF export or print-friendly views.
- Email delivery of invoices.

## Success criteria

1. `npm run build` passes from the monorepo root.
2. `npm run test` passes (Playwright tests in `apps/quickbooks-killer/`).
3. All six goals above have at least one passing Playwright test.
4. SurrealDB schema applies cleanly via `npm run db:setup` in `packages/surrealdb/`.
5. App runs on port 3100 with `npm run dev`.

## Test expectations (Playwright)

| Flow | File | What it tests |
|------|------|---------------|
| Auth round-trip | `e2e/auth.spec.ts` | Signup, signin, signout, redirect |
| Invoice lifecycle | `e2e/invoices.spec.ts` | Create, list, detail, mark paid |
| Expense lifecycle | `e2e/expenses.spec.ts` | Create, list, running total |
| Dashboard accuracy | `e2e/dashboard.spec.ts` | Shows correct totals after CRUD |

## Open questions

1. Should categories for expenses be user-defined or a fixed list? **Decision: fixed list for v1** (e.g., Office, Travel, Software, Marketing, Other).
2. Line item quantities — just description + amount, or description + quantity + rate? **Decision: description + amount for v1** to keep it simple.
