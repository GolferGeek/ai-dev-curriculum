---
user-invocable: false
name: web-architecture
description: Architectural rules for Next.js SaaS apps — mandatory for web builders, scanners, monitors, and PR evaluators.
category: architecture
used-by-agents: nextjs-saas-builder, error-scanner, error-fixer, arch-monitor, arch-hardener, commit-agent, pr-evaluator
---

# Web Architecture Rules (Next.js)

These rules are **mandatory** — violations are errors, not suggestions.

## Database access

- **All database access goes through `packages/surrealdb/`**. App code never imports `surrealdb` directly. Use the shared helpers (`connection.ts`, `auth.ts`, `queries.ts`).
- **Why:** We may swap SurrealDB for another database. The shared package is the abstraction layer.
- **Violation:** Any `import { Surreal }` or `import Surreal from 'surrealdb'` in `apps/` code.

## Authentication

- **Auth tokens are managed by middleware only** (`middleware.ts`). Components and API routes read the token from cookies — they never create, decode, or store tokens themselves.
- **JWT lives in HTTP-only cookies only.** Never in localStorage, sessionStorage, or component state.
- **All API routes must validate auth before any DB call.** Check the cookie, reject with 401 if missing.
- **Violation:** Token handling in page components. Token in localStorage. API route that queries DB without auth check.

## App Router patterns

- **Server components by default.** Only add `"use client"` when the component needs interactivity (forms, state, effects, event handlers).
- **Server actions for mutations** when the caller is a Next.js page. API routes for when you need JSON responses (e.g. client-side fetches).
- **No data fetching in client components.** Fetch in server components or server actions, pass as props.
- **Violation:** `"use client"` on a component that doesn't need it. `fetch()` inside a client component. `useEffect` for data loading that could be a server component.

## File organization

- **Pages under `app/`** with proper layouts, loading, and error boundaries.
- **Shared UI components under `src/components/`** — reusable across pages.
- **API routes under `app/api/`** — one route file per resource.
- **Types in `src/types/`** or colocated with the component that owns them.
- **No business logic in components.** Extract to utility functions, server actions, or the shared package.

## Error handling

- **Every page has an error boundary** (or uses the layout's).
- **Every list/collection has an empty state** — not a blank screen.
- **API routes return proper HTTP status codes** — 400 for bad input, 401 for unauth, 404 for not found, 500 for server errors. Never 200 with an error payload.

## Testing

- **Playwright for e2e tests.** Tests exercise real user flows, not just page renders.
- **Tests must cover the core user loop** — at minimum: sign up → create primary entity → view it → modify it.
- **No mocking the database in e2e tests.** Use a real SurrealDB instance.
