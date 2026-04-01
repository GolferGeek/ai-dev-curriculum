# Intention — Pipeline CRM (Track C)

## Why this exists

Small teams still track deals, partners, or intake in spreadsheets. A **simple CRM with a board** makes **stage**, **ownership**, and **history** visible—so the next conversation isn’t “what did we last say?” dug out of email.

This track is the **“we can ship a board product fast”** demo: cards, columns, detail, and motion—not a purple banner that says “Pipeline.”

## Who it’s for

Founders, sales-adjacent engineers, or internal teams tracking **opportunities** or **requests** through a **pipeline** (not necessarily “sales” in the strict sense—could be partnerships, hiring, or project intake).

## Demo-grade minimums (non-negotiable for “done”)

Ship a **working pipeline**, not a static kanban screenshot.

1. **Records** — **At least 8–12 seed records** (mix of names/stages) with **core fields**: title, **stage**, optional owner/amount—your PRD can name the entity (`Deal`, `Lead`, etc.).
2. **Board** — **≥ 3 stages** as columns; user can **move a card** between stages (**drag-and-drop preferred**; stage dropdown on detail is acceptable if drag is out of scope—document the choice).
3. **Detail** — Clicking a record opens **detail view** (drawer, modal, or route) showing fields and an **activity / notes timeline**.
4. **Notes** — User can **append a note** with timestamp (client-side time is fine); list shows **newest first** or chronological—be consistent.
5. **Find** — **Filter or search** so the board doesn’t break at 20+ items (text filter by title is enough for v1).
6. **Persistence** — Pipeline state survives refresh (**`localStorage`** or equivalent).

## What “great” adds (when time allows)

- Column totals or weighted pipeline value.
- Tags or priority.
- Export board snapshot as JSON.

## Out of scope for the first version

- Email sync, calendar integration, billing—**none** required for v1; manual entry is the point for speed.

## Success

Moving a card **feels like progress**; opening a record **answers** “where are we?” with **notes that stick** after reload—credible **mini-CRM**, not a UI mock.

## How this feeds PRD → plan → app

This file is the **product intention** before **`/prd`**. The PRD should name the **entity** (e.g. Deal / Lead) and tie every **Demo-grade minimum** to acceptance criteria. The plan should specify **≥3 stage names**, **seed data** (8–12 records), **move interaction** (drag-and-drop vs. stage control—pick one and commit), **detail surface** (drawer/modal/route), **notes model** (append-only, newest-first), **filter UI**, and **`localStorage` shape**. Do not ship a static board; [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) applies.
