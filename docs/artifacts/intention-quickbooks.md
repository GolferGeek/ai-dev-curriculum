# Intention — QuickBooks Killer (Web A)

## Why

Freelancers and micro-businesses use a fraction of QuickBooks: send invoices, record expenses, check whether they are profitable. They pay $30+/month for features they never open. A **self-hosted invoicing and expense tracker** gives them that core loop with zero subscription cost and full data ownership.

For the curriculum this track proves **full-stack SaaS velocity**: real auth, real persistence, and a real dashboard — not a landing page that leads nowhere.

## Who

Solo freelancers, consultants, and 1–5 person shops who need to **create invoices, log expenses, and see profit/loss at a glance** without enterprise accounting overhead.

## Demo-grade minimums (non-negotiable)

The app must ship a **multi-area UI** (sidebar navigation + main content area), not a single page.

1. **Auth** — Signup and signin backed by SurrealDB record access. Protected routes redirect unauthenticated users to `/signin`. Logout clears session.
2. **Invoices** — Create an invoice (client name, one or more line items with description + amount, due date). List all invoices. View single invoice detail. Mark an invoice as paid.
3. **Expenses** — Create an expense (description, amount, category, date). List expenses with a running total.
4. **Income tracking** — Paid invoices count as income automatically. Dashboard shows total income, total expenses, and net profit/loss.
5. **Dashboard** — Post-login landing showing: outstanding invoice count + total, recent expenses, net profit/loss. Includes at least one visual element (chart, progress bar, or color-coded indicator).
6. **Persistence** — All data lives in SurrealDB, survives restart, and is scoped per user (row-level access).

## Out of scope

- Payment gateway integration (Stripe, PayPal) — document as follow-on.
- Tax calculation or filing.
- Multi-currency support.
- Multi-user / team accounting (one user per account is sufficient).
- PDF invoice export (nice-to-have, not required).

## Success

A freelancer can **sign up, create an invoice, log expenses, and see profit/loss on a dashboard** within two minutes. The UI looks like a **credible financial tool** — clean layout, clear numbers, professional feel — not a homework assignment.
