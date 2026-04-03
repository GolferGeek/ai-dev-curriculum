# Map Report -- 2026-04-01

## Summary

The codebase is a Turborepo monorepo with 8 apps and 1 shared data package. Two Next.js apps (quickbooks-killer, trello-killer) use server actions + SurrealDB via `@curriculum/surrealdb` for authenticated CRUD. Four Vite apps (http-workspace, team-wiki, pipeline-crm, ops-pulse) are local-first with localStorage persistence and no auth. Two iOS apps (twitter-killer, facebook-killer) use SwiftData for on-device persistence with no networking. All remote data flows converge on a single SurrealDB instance at `http://127.0.0.1:8000`. Auth is JWT-based with cookies for the web apps, `@AppStorage`/`UserDefaults` for iOS, and absent entirely for the Vite apps.

---

## Entry Points

### quickbooks-killer (Next.js)

| Type | Path | File:Line | Auth Required |
|------|------|-----------|---------------|
| Page (redirect) | `/` | `app/page.tsx:1-5` | Yes (middleware) |
| Page (public) | `/signup` | `app/signup/page.tsx:4` | No |
| Page (public) | `/signin` | `app/signin/page.tsx:4` | No |
| Page | `/dashboard` | `app/dashboard/page.tsx:12` | Yes (middleware + token check :13-14) |
| Page | `/invoices` | `app/invoices/page.tsx:8` | Yes (middleware + token check :9-10) |
| Page | `/invoices/new` | `app/invoices/new/page.tsx:4` | Yes (middleware) |
| Page | `/invoices/[id]` | `app/invoices/[id]/page.tsx:9` | Yes (middleware + token check :16-17) |
| Page | `/expenses` | `app/expenses/page.tsx:8` | Yes (middleware + token check :9-10) |
| Page | `/expenses/new` | `app/expenses/new/page.tsx:4` | Yes (middleware) |
| Server Action | `signupAction` | `lib/actions.ts:18` | No (creates auth) |
| Server Action | `signinAction` | `lib/actions.ts:40` | No (creates auth) |
| Server Action | `signoutAction` | `lib/actions.ts:60` | No (clears auth) |
| Server Action | `createInvoiceAction` | `lib/actions.ts:67` | Yes (token check :68-69) |
| Server Action | `markInvoicePaidAction` | `lib/actions.ts:96` | Yes (token check :97-98) |
| Server Action | `createExpenseAction` | `lib/actions.ts:114` | Yes (token check :115-116) |
| Form handler | Invoice form | `components/InvoiceForm.tsx:37` | Delegates to `createInvoiceAction` |
| Form handler | Expense form | `components/ExpenseForm.tsx:9` | Delegates to `createExpenseAction` |
| Form handler | Sign out | `components/Sidebar.tsx:44` | Delegates to `signoutAction` |
| Middleware | All non-static paths | `middleware.ts:5` | Checks `qb_token` cookie |

### trello-killer (Next.js)

| Type | Path | File:Line | Auth Required |
|------|------|-----------|---------------|
| Page (redirect) | `/` | `app/page.tsx:1-5` | Yes (middleware) |
| Page (public) | `/signup` | `app/signup/page.tsx:4` | No |
| Page (public) | `/signin` | `app/signin/page.tsx:4` | No |
| Page | `/boards` | `app/boards/page.tsx:9` | Yes (middleware + token check :10-11) |
| Page | `/boards/[id]` | `app/boards/[id]/page.tsx:26` | Yes (middleware + token check :29-30) |
| Server Action | `signupAction` | `lib/actions.ts:21` | No (creates auth) |
| Server Action | `signinAction` | `lib/actions.ts:43` | No (creates auth) |
| Server Action | `signoutAction` | `lib/actions.ts:63` | No (clears auth) |
| Server Action | `createBoardAction` | `lib/actions.ts:70` | Yes (token check :71-72) |
| Server Action | `createListAction` | `lib/actions.ts:86` | Yes (token check :87-88) |
| Server Action | `createCardAction` | `lib/actions.ts:105` | Yes (token check :106-107) |
| Server Action | `updateCardAction` | `lib/actions.ts:125` | Yes (token check :126-127) |
| Server Action | `moveCardAction` | `lib/actions.ts:161` | Yes (token check :162-163) |
| Server Action | `deleteCardAction` | `lib/actions.ts:182` | Yes (token check :183-184) |
| Middleware | All non-static, non-api paths | `middleware.ts:5` | Checks `trello_token` cookie |

### http-workspace (Vite)

| Type | Path | File:Line | Auth Required |
|------|------|-----------|---------------|
| UI entry | App component | `src/App.tsx:12` | No auth |
| HTTP sender | `send()` callback | `src/App.tsx:56-108` | No auth (sends arbitrary HTTP to user-specified URL) |
| State load | localStorage | `src/storage.ts:6` | No auth |

### team-wiki (Vite)

| Type | Path | File:Line | Auth Required |
|------|------|-----------|---------------|
| UI entry | App component | `src/App.tsx:16` | No auth |
| Page CRUD | `addPage`, `updatePage`, `deletePage` | `src/App.tsx:45-73` | No auth |
| State load | localStorage | `src/storage.ts:6` | No auth |

### pipeline-crm (Vite)

| Type | Path | File:Line | Auth Required |
|------|------|-----------|---------------|
| UI entry | App component | `src/App.tsx:6` | No auth |
| Deal stage move | `move()` | `src/App.tsx:23-28` | No auth |
| Activity note | `addNote()` | `src/App.tsx:30-37` | No auth |
| State load | localStorage | `src/storage.ts:6` | No auth |

### ops-pulse (Vite)

| Type | Path | File:Line | Auth Required |
|------|------|-----------|---------------|
| UI entry | App component | `src/App.tsx:29` | No auth |
| Health check runner | `runAll()` / `runCheck()` | `src/App.tsx:6-27`, `38-53` | No auth (sends GET to check URLs) |
| Manual log entry | `addLog()` | `src/App.tsx:55-68` | No auth |
| State load | localStorage | `src/storage.ts:6` | No auth |

### twitter-killer (iOS / SwiftData)

| Type | Path | File:Line | Auth Required |
|------|------|-----------|---------------|
| App entry | `TwitterKillerApp` | `TwitterKillerApp.swift:5` | `@AppStorage("currentUserHandle")` check |
| Onboarding form | `createUser()` | `Views/OnboardingView.swift:68-75` | No (creates identity) |
| Compose post | `publishPost()` | `Views/ComposeView.swift:44-60` | Requires current user handle |

### facebook-killer (iOS / SwiftData)

| Type | Path | File:Line | Auth Required |
|------|------|-----------|---------------|
| App entry | `FacebookKillerApp` | `App/FacebookKillerApp.swift:5` | `isCurrentUser` query check |
| Onboarding form | `createProfile()` | `Views/OnboardingView.swift:67-80` | No (creates identity) |
| Compose post | `createPost()` | `Views/ComposeView.swift:67-80` | Requires current user |
| Friend request | `sendRequest()` | `Views/FriendsView.swift:111-116` | Requires current user |
| Accept/decline friend | Inline buttons | `Views/FriendsView.swift:44-55` | Requires current user |

---

## Exit Points

### quickbooks-killer

| Type | Destination | File:Line |
|------|-------------|-----------|
| DB write | SurrealDB `user` (signup) | `packages/surrealdb/src/auth.ts:21-30` |
| DB write | SurrealDB `invoice` + `line_item` (create) | `packages/surrealdb/src/queries.ts:18-32` |
| DB write | SurrealDB `invoice` (mark paid) | `packages/surrealdb/src/queries.ts:62-65` |
| DB write | SurrealDB `expense` (create) | `packages/surrealdb/src/queries.ts:80-90` |
| DB read | SurrealDB `invoice`, `expense` (list/get/dashboard) | `packages/surrealdb/src/queries.ts:35-140` |
| Cookie write | `qb_token` cookie | `apps/quickbooks-killer/lib/auth.ts:11-18` |
| Cookie delete | `qb_token` cookie | `apps/quickbooks-killer/lib/auth.ts:21-23` |

### trello-killer

| Type | Destination | File:Line |
|------|-------------|-----------|
| DB write | SurrealDB `user` (signup) | `packages/surrealdb/src/trello-auth.ts:27-37` |
| DB write | SurrealDB `board` (create) | `packages/surrealdb/src/trello-queries.ts:17-21` |
| DB write | SurrealDB `board`, `list`, `card` (delete cascade) | `packages/surrealdb/src/trello-queries.ts:32-48` |
| DB write | SurrealDB `list` (create/update/delete) | `packages/surrealdb/src/trello-queries.ts:63-98` |
| DB write | SurrealDB `card` (create/update/delete/move) | `packages/surrealdb/src/trello-queries.ts:113-187` |
| Cookie write | `trello_token` cookie | `apps/trello-killer/lib/auth.ts:11-18` |
| Cookie delete | `trello_token` cookie | `apps/trello-killer/lib/auth.ts:21-23` |

### Vite Apps (all four)

| Type | Destination | File:Line |
|------|-------------|-----------|
| localStorage write | `curriculum-http-workspace-v1` | `apps/http-workspace/src/storage.ts:16` |
| localStorage write | `curriculum-team-wiki-v1` | `apps/team-wiki/src/storage.ts:16` |
| localStorage write | `curriculum-pipeline-crm-v1` | `apps/pipeline-crm/src/storage.ts:16` |
| localStorage write | `curriculum-ops-pulse-v1` | `apps/ops-pulse/src/storage.ts:16` |
| External HTTP | Arbitrary URL via `fetch()` | `apps/http-workspace/src/App.tsx:69` |
| External HTTP | Health check URLs via `fetch()` | `apps/ops-pulse/src/App.tsx:13` |

### iOS Apps

| Type | Destination | File:Line |
|------|-------------|-----------|
| SwiftData write | `User`, `Post`, `Follow` models | `twitter-killer/Views/OnboardingView.swift:72`, `ComposeView.swift:52` |
| UserDefaults write | `currentUserHandle` | `twitter-killer/Views/OnboardingView.swift:74` |
| SwiftData write | `User`, `Post`, `Friendship`, `Like` models | `facebook-killer/Views/OnboardingView.swift:74`, `ComposeView.swift:73`, `FriendsView.swift:114` |

### CLI Scripts (packages/surrealdb)

| Type | Destination | File:Line |
|------|-------------|-----------|
| Schema apply | SurrealDB (reads .surql file, writes schema) | `scripts/apply-schema.ts:51`, `scripts/apply-trello-schema.ts:51` |
| File read | `schema/000-quickbooks.surql` | `scripts/apply-schema.ts:33` |
| File read | `schema/001-trello.surql` | `scripts/apply-trello-schema.ts:33` |
| Seed data | SurrealDB `user`, `invoice`, `line_item`, `expense` | `scripts/seed.ts:27-111` |
| Seed data | SurrealDB `user`, `board`, `list`, `card` | `scripts/seed-trello.ts:26-143` |

---

## Auth Boundaries

### QuickBooks Killer

- **Token creation**: `lib/actions.ts:28-33` (signup), `lib/actions.ts:49-53` (signin) -- calls `packages/surrealdb/src/auth.ts` which gets JWT from SurrealDB
- **Token storage**: `lib/auth.ts:11-18` -- httpOnly cookie `qb_token`, 7-day TTL, secure in prod, sameSite=lax
- **Token check (middleware)**: `middleware.ts:14` -- checks cookie exists, redirects to `/signin` if missing
- **Token check (server actions)**: Each action calls `getToken()` and redirects if null (e.g., `lib/actions.ts:68-69`)
- **Token check (pages)**: Server components call `getToken()` and redirect (e.g., `app/dashboard/page.tsx:13-14`)
- **Token use**: Passed to `authenticateWithToken(db, token)` to authenticate SurrealDB connection
- **Token clear**: `lib/auth.ts:21-23` via `signoutAction`
- **DB-level permissions**: Schema enforces `WHERE owner = $auth` on invoice, expense, line_item tables (`schema/000-quickbooks.surql:37-38,50-51,60-61`)
- **Public paths**: `/signin`, `/signup` (`middleware.ts:3`)

### Trello Killer

- **Token creation**: `lib/actions.ts:31-35` (signup), `lib/actions.ts:52-57` (signin) -- calls `packages/surrealdb/src/trello-auth.ts`
- **Token storage**: `lib/auth.ts:11-18` -- httpOnly cookie `trello_token`, same pattern as QB
- **Token check (middleware)**: `middleware.ts:14` -- checks cookie, also excludes `/api` paths from middleware (`middleware.ts:26`)
- **Token check (server actions)**: Each action checks token (e.g., `lib/actions.ts:71-72`)
- **DB-level permissions**: Schema enforces `WHERE owner = $auth` on board, `WHERE board.owner = $auth` on list, `WHERE list.board.owner = $auth` on card (`schema/001-trello.surql:36-37,46-47,57-58`)
- **Public paths**: `/signin`, `/signup` (`middleware.ts:3`)

### Vite Apps (http-workspace, team-wiki, pipeline-crm, ops-pulse)

- **No auth whatsoever.** All data is in browser localStorage. No user identity concept.

### iOS Apps (twitter-killer, facebook-killer)

- **twitter-killer**: Uses `@AppStorage("currentUserHandle")` in `ContentView.swift:4` as a lightweight session. If empty, shows `OnboardingView`. No password, no network auth.
- **facebook-killer**: Uses `@Query` predicate `isCurrentUser == true` on the `User` model (`App/FacebookKillerApp.swift:37`). If no current user, shows `OnboardingView`. No password, no network auth.

### Security Notes

1. **JWT secrets are hardcoded** in schema files: `'quickbooks-killer-secret-key-change-in-prod'` (`schema/000-quickbooks.surql:31`) and `'trello-killer-secret-key-change-in-prod'` (`schema/001-trello.surql:31`). Both have TODO comments.
2. **Root credentials default to `root`/`root`** in `packages/surrealdb/src/connection.ts:24-25` and all CLI scripts.
3. **Trello middleware excludes `/api` routes** (`middleware.ts:26`) but no API routes currently exist -- this is a preemptive gap.
4. **`FOR create FULL`** on all SurrealDB tables means any authenticated user can create records in any table, not just their own. Ownership is enforced only on read/update/delete.
5. **No CSRF protection** beyond Next.js server actions' built-in nonce (adequate for this pattern).
6. **Cookies are not `secure` in dev** (`lib/auth.ts:13` -- conditional on `NODE_ENV`), which is correct behavior.

---

## Key Data Flows

### QuickBooks: Signup Flow
```
User --> /signup form --> signupAction (lib/actions.ts:18)
  --> signup() (packages/surrealdb/src/auth.ts:18)
    --> SurrealDB SIGNUP (creates user record with argon2 password)
    --> Returns JWT token
  --> setToken() (lib/auth.ts:10) --> sets httpOnly cookie "qb_token"
  --> redirect("/dashboard")
```

### QuickBooks: Invoice Creation Flow
```
User --> /invoices/new --> InvoiceForm (components/InvoiceForm.tsx:37)
  --> createInvoiceAction (lib/actions.ts:67)
    --> getToken() (lib/auth.ts:5) --> reads "qb_token" cookie
    --> getConnection() (packages/surrealdb/src/connection.ts:11)
    --> authenticateWithToken(db, token) (auth.ts:62)
    --> createInvoice(db, input) (queries.ts:12)
      --> CREATE invoice SET ... (SurrealDB)
      --> CREATE line_item SET ... (SurrealDB, per item)
    --> db.close()
  --> revalidatePath("/invoices")
  --> redirect("/invoices")
```

### QuickBooks: Dashboard Data Fetch
```
User --> /dashboard (app/dashboard/page.tsx:12)
  --> getToken() --> reads cookie
  --> getConnection() --> SurrealDB connection
  --> authenticateWithToken(db, token)
  --> getDashboardData(db) (queries.ts:111)
    --> 4 aggregate queries (outstanding, income, expenses, recent)
  --> Renders DashboardCard components
```

### Trello: Board + Cards Flow
```
User --> /boards/[id] (app/boards/[id]/page.tsx:26)
  --> getToken() --> reads "trello_token" cookie
  --> getTrelloAuthenticatedDb(token) (trello-auth.ts:70)
  --> getBoard(db, boardId) (trello-queries.ts:24)
  --> getListsForBoard(db, boardId) (trello-queries.ts:52)
  --> getCardsForList(db, listId) (trello-queries.ts:102) -- per list
  --> Renders BoardView with all lists and cards

User --> createCardAction (lib/actions.ts:105)
  --> getToken() + getTrelloAuthenticatedDb()
  --> getCardsForList() --> calculates next position
  --> createCard(db, listId, title, null, nextPos) (trello-queries.ts:113)
  --> redirect to board page
```

### Vite App: HTTP Workspace Send
```
User --> enters URL/method/body in Request tab
  --> clicks Send (src/App.tsx:248)
  --> send() callback (src/App.tsx:56)
    --> fetch(url, { method, headers, body }) --> External HTTP request
    --> Stores response in component state
    --> Appends to history in AppState
  --> saveState(state) (storage.ts:16) --> localStorage
```

### iOS: Twitter-Killer Post Creation
```
User --> ComposeView (Views/ComposeView.swift:4)
  --> types post text
  --> taps "Post" button (:32)
  --> publishPost() (:44)
    --> fetches User from SwiftData by currentUserHandle
    --> creates Post(text:, author:) model
    --> modelContext.insert(post) + save()
    --> Data persisted to SwiftData (SQLite on device)
```

---

## Data Transformations

| Where | Transformation | File:Line |
|-------|---------------|-----------|
| QB signup | Password --> argon2 hash | `schema/000-quickbooks.surql:22` (DB-side) |
| QB signin | Email+password --> JWT token string | `packages/surrealdb/src/auth.ts:43-52` |
| QB invoice create | FormData fields --> `CreateInvoiceInput` object | `apps/quickbooks-killer/lib/actions.ts:71-79` |
| QB invoice create | Line item amounts --> `total` (sum) | `packages/surrealdb/src/queries.ts:16` |
| QB date fields | Date string --> ISO datetime with `+ "T00:00:00Z"` | `apps/quickbooks-killer/lib/actions.ts:87,131` |
| QB dashboard | 4 aggregate queries --> `DashboardData` object | `packages/surrealdb/src/queries.ts:111-140` |
| Trello signup | Password --> argon2 hash | `schema/001-trello.surql:22` (DB-side) |
| Trello card position | Existing cards count --> next position int | `apps/trello-killer/lib/actions.ts:117,149,174` |
| Trello board ID | URL param --> `decodeURIComponent()` | `apps/trello-killer/app/boards/[id]/page.tsx:28` |
| Vite apps | State object --> JSON string (localStorage) | All `storage.ts` files |
| http-workspace | URL template `{{var}}` --> resolved URL | `apps/http-workspace/src/App.tsx:6-8` |
| iOS twitter | Handle + Name strings --> `User` SwiftData model | `twitter-killer/Views/OnboardingView.swift:71` |
| iOS facebook | Photo picker --> `Data` bytes --> `avatarData` | `facebook-killer/Views/OnboardingView.swift:43-45` |

---

## Cross-App Boundaries

| From | To | Mechanism | Files |
|------|----|-----------|-------|
| quickbooks-killer | `@curriculum/surrealdb` | npm workspace import | `app/dashboard/page.tsx:5`, `lib/actions.ts:7-13` |
| trello-killer | `@curriculum/surrealdb` | npm workspace import | `app/boards/page.tsx:6`, `lib/actions.ts:4-16` |
| `@curriculum/surrealdb` | SurrealDB instance | TCP HTTP connection to `127.0.0.1:8000` | `src/connection.ts:13`, `src/trello-auth.ts:12` |
| http-workspace | External APIs | Arbitrary HTTP via `fetch()` | `src/App.tsx:69` |
| ops-pulse | External services | Health-check HTTP via `fetch()` | `src/App.tsx:13` |

**No Vite app talks to any other app.** No iOS app talks to any web app. The only shared dependency is `@curriculum/surrealdb`, consumed by quickbooks-killer and trello-killer. Both web apps share a single SurrealDB instance but use **separate namespaces** (`quickbooks` vs `trello`), so their data is fully isolated.

```
                        +-------------------+
                        |   SurrealDB       |
                        |  127.0.0.1:8000   |
                        |                   |
                        | NS: quickbooks    |
                        | NS: trello        |
                        +--------+----------+
                                 |
                  +--------------+--------------+
                  |                              |
        +---------+--------+          +---------+---------+
        | quickbooks-killer|          |  trello-killer    |
        | (Next.js :3000)  |          | (Next.js :3001)   |
        +------------------+          +-------------------+
                  |                              |
                  +-------- @curriculum/surrealdb --------+
                            (shared npm package)

   +----------------+  +----------+  +------------+  +----------+
   | http-workspace |  | team-wiki|  | pipeline-crm|  | ops-pulse|
   | (Vite)         |  | (Vite)   |  | (Vite)      |  | (Vite)   |
   | localStorage   |  | localStorage| localStorage|  | localStorage
   +----------------+  +----------+  +------------+  +----------+

   +----------------+  +------------------+
   | twitter-killer |  | facebook-killer  |
   | (iOS/SwiftData)|  | (iOS/SwiftData)  |
   | on-device only |  | on-device only   |
   +----------------+  +------------------+
```

---

## Statistics

| Metric | Count |
|--------|-------|
| Total apps | 8 |
| Next.js apps (server-rendered, DB-backed) | 2 |
| Vite apps (client-only, localStorage) | 4 |
| iOS apps (SwiftData, on-device) | 2 |
| Shared packages | 2 (surrealdb, config) |
| Server actions (total) | 14 (6 QB + 8 Trello) |
| API routes | 0 |
| Middleware files | 2 |
| SurrealDB namespaces | 2 (quickbooks, trello) |
| SurrealDB tables | 8 (user x2, invoice, line_item, expense, board, list, card) |
| CLI scripts (schema/seed) | 4 |
| Auth-protected entry points | 14 pages + 11 server actions |
| Public entry points (web) | 4 (signin + signup per app) |
| Unauthenticated apps | 6 (4 Vite + 2 iOS) |
| External HTTP exit points | 2 (http-workspace fetch, ops-pulse health checks) |
| Cookie-based auth tokens | 2 (qb_token, trello_token) |
| Hardcoded JWT secrets | 2 |
| Hardcoded DB credentials | 5 (connection.ts + 4 scripts) |

---

## Recommended next steps

- Run `/security-scan` to check for vulnerabilities -- especially the hardcoded JWT secrets and default root credentials
- Consider extracting the auth cookie pattern into the shared `@curriculum/surrealdb` package to reduce duplication between QB and Trello auth modules
- Add rate limiting or input validation to server actions (currently no length/format checks beyond HTML `required`)
- The `FOR create FULL` permission on all SurrealDB tables allows any authenticated user to create records -- verify this is intentional for the demo scope
- The trello-killer middleware excludes `/api` paths but no API routes exist yet -- if API routes are added, they will bypass auth unless they check tokens themselves
- The Vite and iOS apps have no auth -- acceptable for Phase 00 demos but would need attention if data moves to a shared backend
