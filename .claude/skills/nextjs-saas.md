---
name: nextjs-saas
description: Apply when building Next.js SaaS apps — App Router patterns, auth middleware, server actions, dashboard layouts, Tailwind.
---

# Next.js SaaS patterns

When this skill applies:

- **App Router**: Use `app/` directory with layouts, pages, loading/error boundaries. Default to **server components**; add `"use client"` only for interactive elements (forms, state, effects).
- **Auth flow**: Store SurrealDB JWT in an HTTP-only cookie. Use Next.js **middleware** (`middleware.ts`) to check auth on protected routes and redirect to `/login` if missing.
- **Server actions**: Prefer server actions (`"use server"`) for form submissions and mutations over dedicated API routes when the caller is a Next.js page.
- **API routes**: Use `app/api/` routes when the client needs JSON responses (e.g. for client-side fetches, mobile app backends).
- **Dashboard layout**: Use a shared `app/(dashboard)/layout.tsx` with sidebar navigation. Keep the sidebar in a client component; page content as server components.
- **Tailwind CSS**: Use Tailwind utility classes. Configure in `tailwind.config.ts` with the app's `src/` and `app/` paths in `content`.
- **Environment**: Use `.env.local` for `SURREALDB_URL`, `SURREALDB_NS`, `SURREALDB_DB`. Never commit secrets.
- **Testing**: Playwright for e2e tests. Start the dev server in `playwright.config.ts` with `webServer` config. Test real user flows, not just page renders.
- **Monorepo integration**: The app imports from `packages/surrealdb` (or `packages/db`). Use `transpilePackages` in `next.config.js` if needed for workspace packages.
