# Plan — Trello Killer (Web B)

**PRD:** `docs/artifacts/prd-trello.md`
**Intention:** `docs/artifacts/intention-trello.md`

## Milestones

### Milestone 1 — SurrealDB Schema, Auth, and Seed Data

**Agent:** surrealdb-builder

**What gets built:**
- `packages/surrealdb/schema/001-trello.surql` — tables for `board`, `list`, `card` with position fields, foreign keys, and permissions scoped to the authenticated user.
- Reuse the existing `user` table and `DEFINE ACCESS` pattern from the QuickBooks schema (`000-quickbooks.surql`).
- `packages/surrealdb/seed-trello.js` — seed script that creates a test user, a sample board with 3 lists ("To Do", "In Progress", "Done") and sample cards.
- Verify `apply-schema.js` applies all `.surql` files in the schema directory (update if needed).

**Delivers PRD goals:** G1 (auth backend), G6 (persistence/ownership).

**Verification:**
- `node packages/surrealdb/apply-schema.js` runs without error.
- `node packages/surrealdb/seed-trello.js` creates seed data.

---

### Milestone 2 — Next.js Trello Killer App

**Agent:** nextjs-saas-builder

**What gets built:**
- `apps/trello-killer/` — Next.js 14 App Router, Tailwind CSS, port 3200.
- Auth pages: `/signin`, `/signup` with SurrealDB authentication, JWT cookies, middleware protection.
- `/boards` — list boards, create new board.
- `/boards/[id]` — board detail with lists as columns, cards in each list, add list, add card.
- Card detail modal — click card to view/edit title, description, move between lists.
- Sidebar navigation with boards list.
- API routes: `/api/auth/signup`, `/api/auth/signin`, `/api/auth/signout`, `/api/boards`, `/api/boards/[id]`, `/api/lists`, `/api/cards`, `/api/cards/[id]/move`.
- Playwright tests for: auth flow, board CRUD, list management, card lifecycle, card move, full end-to-end flow.

**Delivers PRD goals:** G1 (auth UI), G2 (boards), G3 (lists), G4 (cards), G5 (card detail), G6 (persistence verified via tests).

**Verification:**
- `npm run build` from monorepo root succeeds.
- `npm run dev` serves the app on port 3200.
- Playwright tests pass.

## Goal Coverage

| PRD Goal | Milestone |
|----------|-----------|
| G1 Auth | M1 (backend) + M2 (UI) |
| G2 Boards | M2 |
| G3 Lists | M2 |
| G4 Cards | M2 |
| G5 Card Detail | M2 |
| G6 Persistence | M1 (schema) + M2 (tests) |

## Risks

1. **SurrealDB access method syntax** — SurrealDB versions vary in DEFINE ACCESS syntax. Mitigation: follow the exact pattern from the QuickBooks schema.
2. **Card ordering complexity** — Integer position reindexing could be slow with many cards. Mitigation: acceptable for v1; use simple position integers.
3. **Drag-and-drop complexity** — Full DnD is a stretch goal. Mitigation: implement move-via-dropdown first, DnD as enhancement if time allows.

## Verification (final)

```bash
cd /Users/golfergeek/ai-dev-curriculum
npm run build
npm run test        # if configured
npx playwright test # from apps/trello-killer/
```

## Next step

Pass this file to `/run-plan` to execute the build.
