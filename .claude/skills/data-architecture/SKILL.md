---
user-invocable: false
name: data-architecture
description: Architectural rules for the SurrealDB data layer — mandatory for DB builders, scanners, monitors, and PR evaluators.
category: architecture
used-by-agents: surrealdb-builder, error-scanner, error-fixer, arch-monitor, arch-hardener, commit-agent, pr-evaluator
---

# Data Architecture Rules (SurrealDB)

These rules are **mandatory** — violations are errors, not suggestions.

## Schema management

- **All schemas live in version-controlled `.surql` files** under `packages/surrealdb/schema/`. No ad-hoc CLI commands or inline SQL strings that define tables.
- **Schemas must be idempotent.** Use `DEFINE ... IF NOT EXISTS` or tolerate "already exists" errors in the apply script.
- **Schema apply scripts must create namespace and database first** before applying table definitions. SurrealDB 3.x doesn't auto-create them.
- **Violation:** Schema defined only in application code. Non-idempotent schema files. Apply script that fails on second run.

## Authentication

- **Use SurrealDB's built-in record access** (`DEFINE ACCESS ... ON DATABASE TYPE RECORD`). Do not bolt on a separate auth service.
- **SurrealDB 3.x syntax only.** `DEFINE ACCESS`, not the old `DEFINE SCOPE`.
- **Row-level permissions** using `$auth.id` in table PERMISSIONS clauses. Each user sees only their own data.
- **Violation:** External auth provider (NextAuth, Clerk) when SurrealDB auth is available. Old SCOPE syntax. Missing row-level permissions.

## Shared package

- **All database interaction goes through `packages/surrealdb/`**. This is the single source of truth for connection, auth, and query helpers.
- **Connection config uses environment variables** with sensible defaults (`ws://localhost:8000`).
- **Query helpers are typed** and handle the SurrealDB response format (unwrapping `results[0]` etc.).
- **Violation:** Direct SurrealDB imports in app code. Hardcoded connection strings. Untyped query results.

## Seed data

- **Every app has a seed script** that creates meaningful demo data. Not just one record — enough to demonstrate the app's features.
- **Seed scripts are idempotent.** Running them twice doesn't create duplicates (clean + recreate, or upsert).
- **Seed scripts create a demo user** with documented credentials (e.g. `demo@example.com` / `password123`).

## Multi-app considerations

- **Separate namespaces per app domain** when schemas differ significantly (e.g. `quickbooks` namespace, `trello` namespace).
- **Shared user table and auth access** across apps in the same namespace.
- **App-specific query helpers** are clearly named (e.g. `trello-queries.ts` vs `queries.ts`).
