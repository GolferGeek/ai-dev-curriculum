# PRD — Trello Killer (Web B)

## Summary

A self-hosted kanban board application built with Next.js 14 and SurrealDB. Users sign up, create boards, add lists and cards, move cards between lists, and manage their tasks through a multi-panel UI. All data is persisted in SurrealDB and scoped per user.

## Goals

### G1 — Authentication

Users can sign up with email/password and sign in. Authenticated sessions use JWT cookies. Protected routes redirect to `/signin` when unauthenticated. Logout clears the cookie and redirects to `/signin`.

**Acceptance criteria:**
- Sign-up form accepts email + password, creates a SurrealDB user, signs in automatically.
- Sign-in form authenticates against SurrealDB, sets a JWT cookie.
- Visiting `/boards` without a valid cookie redirects to `/signin`.
- Clicking "Sign out" clears the cookie and redirects.

### G2 — Boards CRUD

Signed-in users can create boards (name required), see a list of their boards, and click to open one.

**Acceptance criteria:**
- Boards page lists all boards owned by the signed-in user.
- "New Board" action accepts a name and creates the board.
- Clicking a board navigates to `/boards/[id]`.
- Empty state shown when the user has no boards.

### G3 — Lists (Columns)

Users can add named lists to a board. Lists display left-to-right, ordered by a `position` field.

**Acceptance criteria:**
- Board detail page shows lists as columns.
- "Add List" creates a new list with a name and appends it to the right.
- Lists render in `position` order.

### G4 — Cards

Users can add cards (title required, description optional) to a list. Cards display top-to-bottom within a list ordered by `position`. Cards can be moved between lists.

**Acceptance criteria:**
- Each list column shows its cards in position order.
- "Add Card" creates a card with a title in the target list.
- A card can be moved to a different list via dropdown/select or drag-and-drop.
- After moving, the card appears in the new list and is removed from the old one.

### G5 — Card Detail

Clicking a card opens a detail view (modal or page) where the user can edit title, description, and which list the card belongs to.

**Acceptance criteria:**
- Clicking a card shows its title, description, and current list.
- User can edit title and description and save.
- User can change the card's list from the detail view.

### G6 — Persistence and Data Ownership

All data stored in SurrealDB. Data survives server restart. Users only see their own boards.

**Acceptance criteria:**
- After creating boards/lists/cards, refreshing the page shows the same data.
- User A cannot see User B's boards.

## Non-goals

- Real-time collaboration (WebSockets, live cursors).
- File attachments on cards.
- Calendar or Gantt view.
- Mobile-responsive layout.
- Card labels, due dates, checklists (stretch only).
- Board sharing between users.

## Success criteria

1. `npm run build` succeeds from the monorepo root.
2. Playwright tests pass for the core flows.
3. A new user can: sign up, create a board, add 3 lists, add cards, move a card between lists, edit a card, sign out, sign back in and see all data intact.
4. The UI has a sidebar (or board selector) + board columns + card detail — three distinct regions.

## Test expectations (Playwright)

1. **Auth flow** — sign up with new credentials, verify redirect to boards page, sign out, sign back in.
2. **Board CRUD** — create a board, verify it appears in the list, open it.
3. **List management** — add lists to a board, verify they appear as columns.
4. **Card lifecycle** — add a card, open card detail, edit title/description, save, verify changes.
5. **Card move** — move a card from one list to another, verify it appears in the new list.
6. **Full flow** — sign up → create board → add lists → add cards → move card → sign out → sign in → verify persistence.

## Open questions

1. Should card ordering within a list use integer positions (simple) or fractional positions (avoids reindexing)? **Decision: integer positions, reindex on move — simpler for v1.**
2. Should the card detail be a modal overlay or a separate page? **Decision: modal overlay to keep board context visible.**

## Next step

Pass this file to `/plan` to produce `docs/artifacts/plan-trello.md`.
