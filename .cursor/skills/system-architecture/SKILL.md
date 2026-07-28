---
user-invocable: false
name: system-architecture
description: Cross-app architectural rules — how apps communicate, shared data contracts, payload formats, and system-wide conventions. Mandatory for all builders, monitors, and PR evaluators.
category: architecture
used-by-agents: app-builder-quickbooks-killer, app-builder-trello-killer, app-builder-twitter-killer, app-builder-facebook-killer, surrealdb-builder, error-scanner, error-fixer, arch-monitor, arch-hardener, commit-agent, pr-evaluator
---

# System Architecture

These rules govern how the **system as a whole** works — how apps relate to each other, how data moves between layers, and what contracts must be respected everywhere. Individual app architecture skills (`web-architecture`, `ios-architecture`) handle app-internal rules; this skill handles **cross-cutting** concerns.

## Shared packages are the contract layer

- **`packages/surrealdb/`** is the only way apps talk to the database. It defines the connection, auth, and query interfaces. Apps import from `@curriculum/surrealdb` — never from `surrealdb` directly.
- **If a new shared package is created** (e.g. `packages/ui/`, `packages/types/`), it follows the same rule: apps import the package, never the underlying library directly.
- **Why:** Shared packages are abstraction boundaries. If we swap SurrealDB for Postgres, only `packages/surrealdb/` changes — not every app.

## Payload and data contracts

- **Schema files (`.surql`) are the source of truth** for data shape. If an app expects a field, it must exist in the schema.
- **TypeScript types in shared packages must match the schema.** If the schema says `invoice.total` is a `number`, the TypeScript type must agree. No `any` to paper over mismatches.
- **When apps share data** (e.g. a web app and an iOS app using the same SurrealDB instance), the schema is the contract. Both apps must agree on table names, field types, and auth scopes.
- **API payloads** (between frontend and backend in the same app) should mirror the schema types. Don't transform field names or nest differently without a documented reason.

## Authentication flow

- **SurrealDB is the auth provider** for all apps that use it. The auth flow is:
  1. Client sends credentials to the app's auth endpoint (or directly to SurrealDB).
  2. SurrealDB validates via `DEFINE ACCESS` rules and returns a JWT.
  3. Web apps: JWT stored in HTTP-only cookie, validated by middleware on every request.
  4. iOS apps: JWT stored in Keychain (production) or `@AppStorage` (dev), sent in request headers.
- **The JWT payload includes `$auth.id`** which SurrealDB uses for row-level permissions. Apps never need to filter by user ID manually — the DB enforces it.
- **Violation:** Custom auth that bypasses SurrealDB scopes. Manual user-ID filtering in queries when permissions should handle it.

## Cross-app conventions

- **Port assignments** are stable and documented:
  | App | Dev port | Preview port |
  |-----|----------|-------------|
  | QuickBooks killer | 3100 | 4100 |
  | Trello killer | 3200 | 4200 |
  | SurrealDB | 8000 | — |
  | Phase-00 apps | 5170–5173 | 4170–4173 |

- **Environment variables** follow the pattern `SURREALDB_URL`, `SURREALDB_NS`, `SURREALDB_DB`. Never invent per-app env var names for the same thing.
- **Namespace isolation:** Each app domain gets its own SurrealDB namespace (e.g. `quickbooks`, `trello`) but shares the same SurrealDB instance. This means apps can run simultaneously without data collisions.

## Monorepo boundaries

- **Apps depend on packages. Apps never import from sibling apps.** If two apps need the same code, it goes in a package.
- **Packages are independent.** A package never imports from an app or from a sibling package (unless explicitly documented as a dependency in its `package.json`).
- **Turbo pipelines** define the build order. `build` depends on `^build` (packages build before apps). `test` depends on `build`.

## Adding new apps or packages

When adding a new app to the system:
1. Create under `apps/<name>/` following the conventions of its type (Next.js or SwiftUI).
2. Assign a dev port that doesn't conflict (check the table above).
3. If it uses SurrealDB, add schema files to `packages/surrealdb/schema/` and assign a namespace.
4. Create a dedicated app builder agent with the appropriate mandatory skills.
5. Update the system architecture port table (this file).

## Evolution

This document evolves as the system grows. When `/monitor` or `/pr-eval` finds a cross-app issue that isn't covered here, add the rule. Date and context help future readers understand why.

<!-- Reviewer-added rules go here -->
