---
name: surrealdb
description: Apply when setting up or querying SurrealDB — schema design, auth scopes, SurrealQL patterns, local dev setup.
---

# SurrealDB

When this skill applies:

- **Local setup**: Use `surreal start --user root --pass root memory` for quick dev; `surreal start file:data/` for persistence. Docker alternative: `docker run --rm -p 8000:8000 surrealdb/surrealdb:latest start`.
- **Schema files**: Store as `.surql` in a versioned directory (e.g. `packages/surrealdb/schema/`). Apply with `surreal import --conn http://localhost:8000 --user root --pass root --ns app --db app schema.surql`.
- **Auth scopes**: Define `SCOPE` on the database with `SIGNUP` and `SIGNIN` queries. Clients authenticate via `POST /signin` and receive a JWT. Use scopes for row-level access (`WHERE user = $auth.id`).
- **Data modeling**: SurrealDB supports relations natively (`RELATE user:1->follows->user:2`). Prefer `RELATE` for graph-like data (follows, friendships, memberships) over join tables.
- **Queries**: Use SurrealQL — SQL-like but with `RELATE`, `FETCH` for eager loading, `LIVE SELECT` for real-time. Prefer parameterized queries (`$param`) over string interpolation.
- **Client SDK**: Use the official `surrealdb.js` package for Node/browser or `surrealdb.swift` for iOS. Connect with `new Surreal()` → `.connect()` → `.signin()` → `.use({ ns, db })`.
- **Testing**: Spin up a fresh in-memory instance per test suite (`surreal start memory`). Wipe with `REMOVE DATABASE` between runs.
