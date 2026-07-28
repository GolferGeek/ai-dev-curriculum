# Demo-grade bar — Phase 01 (SaaS killers)

Same spirit as [Phase 00](../00/DEMO-GRADE-BAR.md), **raised for auth, database, and trust boundaries**. Phase 01 apps are **ownable SaaS slices** — not hosted previews, not homework one-pagers.

Track-specific minimums live in each **`intention-*-killer.md`**. This bar applies to **all** tracks. When in doubt: **intention → this bar → [VERIFY.md](./VERIFY.md) breach test**.

---

## Not enough (reject and iterate)

- Single static landing or hero — no multi-area tool UI.
- **Fake auth** — login button that sets localStorage or bypasses server; "demo user" with no real signup.
- **No database** — still localStorage, hardcoded arrays, or in-memory-only data that dies on refresh.
- **Shared data** — all users see the same records; no per-user isolation in the DB layer.
- Tests that only assert **page title**, "Welcome", or visible marketing copy.
- **Secrets in the client** — API keys, DB URLs, or admin tokens in browser bundles.
- **UI-only protection** — hidden links but API returns other users' rows.

---

## Required (ship the phase)

### Auth chain (non-negotiable)

- **Sign up** — new identity created through the real auth path (SurrealDB scopes / equivalent).
- **Sign in / sign out** — session established and cleared correctly.
- **Protected routes** — unauthenticated users **cannot** access app content (server or middleware enforcement — not client-only).
- **Per-user data isolation** — user B **cannot** read user A's records — verified by [VERIFY.md](./VERIFY.md) second-user test.

### Product surface

- **Multi-area UI** — nav/sidebar + at least **two feature views** (list + detail, board + card, feed + profile, etc.).
- **Core loop** — complete one domain workflow from your intention (create invoice → see on dashboard; add card → move column; post → see in feed; etc.).
- **Persistence** — data survives refresh and server restart; stored in **SurrealDB** (web) or **SwiftData** (iOS opt-in).
- **Empty and error states** — new user isn't broken; bad input shows feedback.

### Tests and proof

- **Playwright** (web) or **XCTest** (iOS) exercises at least the **auth entry + one core mutation** — not "page loads."
- **Manual breach test** documented — second user, isolation attempt.
- **Build green** — `npm run build` / `xcodebuild build` from repo conventions.

---

## Great (stretch)

- Responsive layout; polished dashboard visual (chart, status colors).
- SurrealDB `LIVE SELECT` or real-time updates.
- PDF/print view (QuickBooks), drag-and-drop polish (Trello).
- `/test-browser` GIF or screenshot in portfolio notes.
- `docs/projects/<name>/` portfolio blurb started.

---

## Vibe coding vs demo-grade

| Vibe-coded "done" | Demo-grade done |
|---|---|
| Preview looks logged in | Server validates session on every protected action |
| Data in component state | Data in DB with **owner scope** |
| "Trust the platform" | **You** ran second-user test |
| Ship when chat says OK | Ship when [VERIFY.md](./VERIFY.md) checklist is green |

Lovable/Replit may hit demo-grade **on their platform** with their guardrails. This bar applies to **your monorepo build** — inspectable, ownable, provable.

---

## Chain: intention → PRD → plan → build

Each killer **intention** lists numbered **Demo-grade minimums**. **`/prd`** must convert each to acceptance criteria (especially auth). **`/plan`** must schedule **surrealdb-builder** before UI and name **isolation verification**. If PRD or plan shrinks the product to a starter page or fake login, **reset** against the intention and this bar.

---

## Track intentions

- [intention-quickbooks-killer.md](./intention-quickbooks-killer.md)
- [intention-trello-killer.md](./intention-trello-killer.md)
- [intention-twitter-killer.md](./intention-twitter-killer.md)
- [intention-facebook-killer.md](./intention-facebook-killer.md)
