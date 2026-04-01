# Intention — Trello Killer (Web B) — Refined

## Why this exists

Project management tools charge per-seat fees for what is fundamentally **a board with lists and cards**. A **self-hosted kanban app** gives individuals and small teams drag-and-drop task management with zero vendor lock-in and full data ownership.

This track demonstrates **interactive UI + real-time data**: the agent should produce something with **draggable cards, multiple boards, and persistent state** — not a static grid.

## Who it's for

Developers, freelancers, and small teams who want **kanban boards** to organize projects, track tasks, and collaborate — without paying per seat for Trello, Asana, or Monday.

## Demo-grade minimums (non-negotiable for "done")

Ship a **multi-area UI** (board selector/sidebar + board view + card detail), not a single page.

1. **Auth** — Sign up and sign in with SurrealDB access methods. Protected routes redirect unauthenticated users to `/signin`. Logout clears the session.
2. **Boards** — Create a new board (name required). List all boards for the signed-in user. Click a board to open it.
3. **Lists** — Add named lists (columns) to a board (e.g. "To Do", "In Progress", "Done"). Lists display left-to-right. Position field controls ordering.
4. **Cards** — Add cards to a list with title (required) and description (optional). Cards display top-to-bottom within a list, ordered by position. Move a card between lists via a dropdown/select or drag-and-drop.
5. **Card detail** — Click a card to view/edit: title, description, which list it belongs to. Save persists immediately.
6. **Persistence** — All data in SurrealDB. Survives server restart. Each user sees only their own boards (ownership scoped by user).

## What "great" adds (stretch, time permitting)

- Drag-and-drop with smooth animations (`@hello-pangea/dnd` or similar).
- Card labels with colors and filtering.
- Due dates with overdue highlighting.
- Board sharing / collaboration (multiple users on one board).
- Activity log on cards.

## Out of scope (first version)

- Real-time collaboration (WebSockets / live cursors).
- File attachments on cards.
- Calendar or Gantt view.
- Mobile-responsive layout (desktop-first is fine).

## Success

A user can **sign up, create a board, add lists and cards, move cards between lists, and see everything persisted** — and the UI looks like a **credible project management tool**, not a CSS grid demo.

## Next step

Pass this file to `/prd` to produce `docs/artifacts/prd-trello.md`.
