# Intention — QuickBooks killer (Web A)

## Why this exists

Most freelancers and small business owners use maybe 10% of QuickBooks: create an invoice, track what came in, track what went out, see if they're ahead or behind. A **self-hosted invoicing and expense tracker** gives them exactly that — no subscription, no bloat, their data on their machine.

This track is also a **demo of full-stack SaaS velocity**: agents should produce something with **real auth, real data, and a real dashboard**, not a signup page that leads nowhere.

## Who it's for

Freelancers, solo consultants, and small business owners who want to **send invoices**, **log income and expenses**, and **see a simple profit/loss dashboard** without paying $30/month for features they'll never touch.

## Demo-grade minimums (non-negotiable for "done")

Ship a **multi-area UI** (sidebar nav + main content), not a single page.

1. **Auth** — Sign up and sign in with SurrealDB scopes. Protected routes redirect unauthenticated users to login. Logout works.
2. **Invoices** — Create an invoice with: client name, line items (description + amount), due date. View invoice list. View single invoice detail. Mark invoice as paid.
3. **Expenses** — Log an expense with: description, amount, category, date. View expense list with running total.
4. **Income tracking** — Paid invoices automatically count as income. Dashboard shows total income, total expenses, and net (profit/loss).
5. **Dashboard** — Landing page after login showing: outstanding invoices count + total, recent expenses, net profit/loss summary. Not just numbers — at least one visual element (chart, progress bar, or color-coded status).
6. **Persistence** — All data in SurrealDB. Survives server restart. Each user sees only their own data.

## What "great" adds (when time allows)

- PDF invoice generation or print-friendly view.
- Expense categories with filtering and breakdown chart.
- Recurring invoice templates.
- Client management (list of clients with contact info).

## Out of scope for the first version

- Real payment processing (Stripe, PayPal) — document as follow-on.
- Tax calculations or tax filing.
- Multi-currency support.
- Team/multi-user accounting (single user per account is fine).

## Success

A freelancer can **sign up, create an invoice for a client, log a few expenses, and immediately see their profit/loss on a dashboard** — and the UI looks like a **credible financial tool**, not a homework assignment.

## How this feeds PRD → plan → app

This file is the **product intention**. The PRD should restate each numbered **Demo-grade minimum** as a **requirement with testable acceptance criteria**. The plan should assign:
- **surrealdb-builder** → tables (users, invoices, line_items, expenses), auth scopes, seed data with sample invoices/expenses.
- **nextjs-saas-builder** → pages (login, signup, dashboard, invoices list/detail/create, expenses list/create), auth middleware, API routes or server actions for CRUD.

If anything is ambiguous, prefer the **stricter** reading and [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md).
