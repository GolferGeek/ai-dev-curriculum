# Intention — Trello killer (Web B)

## Why this exists

Project management tools charge per-seat fees for what is fundamentally **a board with lists and cards**. A **self-hosted kanban app** gives individuals and small teams drag-and-drop task management with zero vendor lock-in and full data ownership.

This track demonstrates **interactive UI + real-time data**: agents should produce something with **draggable cards, multiple boards, and persistent state**, not a static grid.

## Who it's for

Developers, freelancers, and small teams who want **kanban boards** to organize projects, track tasks, and collaborate — without paying per seat for Trello, Asana, or Monday.

## Demo-grade minimums (non-negotiable for "done")

Ship a **multi-area UI** (board selector/sidebar + board view + card detail), not a single page.

1. **Auth** — Sign up and sign in with SurrealDB scopes. Protected routes redirect unauthenticated users to login. Logout works.
2. **Boards** — Create a new board with a name. View list of boards. Open a board to see its lists and cards.
3. **Lists** — Add lists (columns) to a board with names (e.g. "To Do", "In Progress", "Done"). Rename or reorder lists.
4. **Cards** — Add cards to a list with: title, description (optional). View card detail. Edit card. Move a card between lists (drag-and-drop or move action).
5. **Card detail** — Click a card to see/edit: title, description, which list it's in. Optional: labels, due date, checklist.
6. **Persistence** — All data in SurrealDB. Survives server restart. Each user sees only their own boards.

## What "great" adds (when time allows)

- Drag-and-drop with smooth animations (e.g. `@hello-pangea/dnd` or similar).
- Card labels with colors and filtering.
- Due dates with overdue highlighting.
- Board sharing / collaboration (multiple users on one board).
- Activity log on cards (who moved what, when).

## Out of scope for the first version

- Real-time collaboration (WebSockets / live cursors) — document as follow-on.
- File attachments on cards.
- Calendar or Gantt view.
- Mobile-responsive layout (desktop-first is fine).

## Success

A user can **sign up, create a board, add lists and cards, move cards between lists, and see everything persisted** — and the UI looks like a **credible project management tool**, not a CSS grid demo.

## How this feeds PRD → plan → app

This file is the **product intention**. The PRD should restate each numbered **Demo-grade minimum** as a **requirement with testable acceptance criteria**. The plan should assign:
- **surrealdb-builder** → tables (users, boards, lists, cards), auth scopes, seed data with a sample board/lists/cards, ordering fields for list and card position.
- **nextjs-saas-builder** → pages (login, signup, boards list, board detail with lists/cards, card detail modal or page), auth middleware, API routes for CRUD + card moves.

If anything is ambiguous, prefer the **stricter** reading and [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md).
