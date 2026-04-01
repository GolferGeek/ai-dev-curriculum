# Ingest Report — 2026-04-01

## Summary

This is the **GolferGeek AI Development Curriculum**, an open-source curriculum and starter codebase for AI-assisted development using Claude Code agents, skills, and commands. It is structured as a Turborepo monorepo containing phased learning tracks (Phase 00 through Phase 03). Phase 00 teaches monorepo setup and builds four demo-grade Vite+React apps. Phase 01 introduces "SaaS killer" apps (QuickBooks, Trello, Facebook, Twitter replacements) using Next.js and SurrealDB (web) or SwiftUI (iOS). Phase 02 adds quality engineering (error scanning, architecture monitoring, PR evaluation). The repo serves both as a teaching tool for learners and a reference implementation maintained by the instructor.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo | Turborepo v2.4, npm workspaces |
| Phase 00 apps | Vite 5, React 18, TypeScript 5.6 |
| Phase 01 web apps | Next.js 14 (App Router), React 18, TypeScript 5.3, Tailwind CSS 3.4, PostCSS, Autoprefixer |
| Phase 01 iOS apps | SwiftUI, XcodeGen (project.yml) |
| Database | SurrealDB v2 (via `surrealdb` npm SDK v2.0.3) |
| Testing | Playwright (Chromium), @playwright/test v1.49 |
| Linting | ESLint 8 + eslint-config-next (Next.js apps only) |
| AI tooling | Claude Code with custom agents (23), skills (34), and commands |
| Runtime | Node.js (npm 10.9), macOS/Darwin |

## Directory Structure

```
ai-dev-curriculum/
├── .claude/                  # Claude Code configuration
│   ├── agents/               # 23 agent definitions (builders, scanners, fixers, evaluators)
│   ├── skills/               # 34 skill files (architecture rules, quality gates, workflows)
│   ├── settings.json         # Permission allowlist for Claude tool calls
│   └── settings.local.json   # Local overrides
├── .cursor/                  # Cursor IDE config
├── .docs/                    # Internal planning & build specs (gitignored, not published)
├── apps/                     # Application workspaces
│   ├── http-workspace/       # Phase 00: HTTP request builder (Vite+React)
│   ├── team-wiki/            # Phase 00: Team wiki (Vite+React)
│   ├── pipeline-crm/        # Phase 00: Pipeline CRM (Vite+React)
│   ├── ops-pulse/            # Phase 00: Operations dashboard (Vite+React)
│   ├── quickbooks-killer/    # Phase 01: Accounting SaaS (Next.js+SurrealDB)
│   ├── trello-killer/        # Phase 01: Project management SaaS (Next.js+SurrealDB)
│   ├── facebook-killer/      # Phase 01: Social network (SwiftUI iOS, scaffold only)
│   └── twitter-killer/       # Phase 01: Microblog (SwiftUI iOS, scaffold only)
├── packages/                 # Shared packages
│   ├── config/               # Shared config (placeholder, no build)
│   └── surrealdb/            # SurrealDB client library (shared by Next.js apps)
├── docs/                     # Curriculum documentation
│   ├── phase-00/             # Monorepo + Vite app guides, intentions, demo bar
│   ├── phase-01/             # SaaS killer guides, intentions, demo bar
│   ├── phase-02/             # Quality engineering guides
│   ├── phase-03/             # (future phase, has README + RUN-ORDER only)
│   └── artifacts/            # Generated artifacts: PRDs, plans, error/monitor reports
├── scripts/                  # Verification scripts
│   └── verify-curriculum-structure.sh
├── tests/                    # Root-level test directory (contains "curriculum" subdir)
├── CLAUDE.md                 # Project instructions for Claude Code
├── README.md                 # Main project README with maintainer loop
├── package.json              # Root workspace config
└── turbo.json                # Turborepo task definitions
```

## Apps

### Phase 00 — Vite + React (demo-grade product slices)

| App | Package name | Dev port | Preview port | Status |
|-----|-------------|----------|-------------|--------|
| http-workspace | @curriculum/http-workspace | 5173 | 4173 | Built (Vite+React, localStorage persistence) |
| team-wiki | @curriculum/team-wiki | 5174 | 4174 | Built (Vite+React, localStorage persistence) |
| pipeline-crm | @curriculum/pipeline-crm | 5175 | 4175 | Built (Vite+React, localStorage persistence) |
| ops-pulse | @curriculum/ops-pulse | 5176 | 4176 | Built (Vite+React, localStorage persistence) |

All four share the same structure: `src/App.tsx`, `src/storage.ts`, `src/types.ts`, `src/main.tsx`. Build: `tsc -b && vite build`. Test: Playwright.

### Phase 01 — Next.js + SurrealDB (SaaS killers, web)

| App | Package name | Dev port | Status |
|-----|-------------|----------|--------|
| quickbooks-killer | @curriculum/quickbooks-killer | 3100 | Active development (dashboard, invoices, expenses, auth pages, Sidebar, forms) |
| trello-killer | @curriculum/trello-killer | 3200 | Active development (boards, cards, lists, drag-select, auth pages, Sidebar) |

Both use Next.js 14 App Router with Tailwind CSS, `@curriculum/surrealdb` package, and have `lib/actions.ts` + `lib/auth.ts` for server-side logic. Both have `middleware.ts` for auth. Build: `next build`. Test: Playwright. Lint: `next lint`.

### Phase 01 — SwiftUI iOS (SaaS killers, mobile)

| App | Status |
|-----|--------|
| facebook-killer | Scaffold only — XcodeGen project.yml, App/Helpers/Models/Views dirs |
| twitter-killer | Scaffold only — XcodeGen project.yml, ContentView.swift, Models/Views dirs |

No package.json (native iOS). Managed via XcodeGen (`project.yml`).

## Shared Packages

### @curriculum/config
- **Purpose:** Placeholder for shared configuration (empty, version 0.0.0)
- **Location:** `packages/config/`

### @curriculum/surrealdb
- **Purpose:** Shared SurrealDB client library consumed by quickbooks-killer and trello-killer
- **Location:** `packages/surrealdb/`
- **Exports:** `src/index.ts` (consumed as raw TS source, no build step)
- **Modules:**
  - `connection.ts` — DB connection setup
  - `auth.ts` — QuickBooks auth helpers
  - `queries.ts` — QuickBooks data queries
  - `types.ts` — Shared TypeScript types
  - `trello-auth.ts` — Trello auth helpers
  - `trello-queries.ts` — Trello data queries
- **Scripts:** `db:setup`, `db:seed` (QuickBooks), `db:setup:trello`, `db:seed:trello` — apply schemas and seed data via ts-node
- **Dependency:** `surrealdb` v2.0.3

## Config & Build System

- **Monorepo:** npm workspaces (`apps/*`, `packages/*`) + Turborepo
- **turbo.json tasks:**
  - `build` — depends on `^build`, outputs `dist/**` and `.next/**`
  - `@curriculum/surrealdb#build` — no-op (consumed as TS source)
  - `test` — depends on `build`
  - `dev` — no cache, persistent
- **Root scripts:** `build`, `test`, `dev` (all delegated to Turbo), `postinstall` (installs Playwright Chromium)
- **Verification:** `scripts/verify-curriculum-structure.sh` checks required doc files and Claude Code kit files exist
- **Package manager:** npm 10.9
- **Next.js config:** `transpilePackages: ["@curriculum/surrealdb"]` in both Next.js apps
- **Playwright config:** per-app `playwright.config.ts` files, e2e tests in `e2e/` directories (Next.js apps) or root-level (Vite apps)

## Naming Conventions

- **App packages:** `@curriculum/<app-name>` (kebab-case)
- **App directories:** `apps/<app-name>/` (kebab-case)
- **Phase 00 Vite apps:** `src/App.tsx` (PascalCase component), `src/storage.ts`, `src/types.ts` (lowercase modules)
- **Phase 01 Next.js apps:** App Router convention — `app/` with route directories (`dashboard/`, `invoices/`, `expenses/`, `boards/`), `layout.tsx`, `page.tsx`, `error.tsx`
- **Components:** PascalCase filenames (`DashboardCard.tsx`, `BoardView.tsx`, `Sidebar.tsx`), colocated in `components/` directory
- **Server logic:** `lib/actions.ts`, `lib/auth.ts` (lowercase, descriptive)
- **Shared package:** `src/` directory, TypeScript source consumed directly (no dist)
- **Agents:** `.claude/agents/<role>.md` (kebab-case, role-based naming: `error-scanner.md`, `nextjs-saas-builder.md`)
- **Skills:** `.claude/skills/<topic>.md` (kebab-case, topic-based: `quality-gates.md`, `web-architecture.md`)
- **Docs:** `docs/phase-NN/` structure, `intention-<app>.md`, `prd-<app>.md`, `plan-<app>.md` in artifacts
- **iOS apps:** XcodeGen `project.yml`, Swift source in `<AppName>/` with `App/`, `Models/`, `Views/`, `Helpers/` subdirectories

## Statistics

| Metric | Count |
|--------|-------|
| Apps (total) | 8 |
| Apps (Phase 00, Vite+React) | 4 |
| Apps (Phase 01, Next.js) | 2 |
| Apps (Phase 01, iOS) | 2 |
| Shared packages | 2 |
| TypeScript/TSX files | 101 |
| Markdown files | 118 |
| Claude agents | 23 |
| Claude skills | 34 |
| Doc phases | 4 (00-03) |
| Artifact docs (PRDs, plans, intentions) | 14 |

## Recommended next steps

- Run `/map` to trace data flow and API surfaces
- Verify SurrealDB connection and schema status for quickbooks-killer and trello-killer
- Check build health: `npm run build` from root to identify any current errors
- Review `docs/artifacts/error-report.md` and `docs/artifacts/monitor-report.md` for known issues
