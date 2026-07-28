# Intention — Turbo monorepo (workspace shell)

## Why this exists

We need a **single repository** that can hold **multiple apps and shared packages** as the curriculum (and real teams) grow—without copy-pasting config and scripts.

**More than one folder for many apps.** A monorepo is not just a convenient place to park several products. It is a modern default for teams building **multiple applications** that should share work: **component libraries**, **UI kits**, **types**, **API clients**, **auth helpers**, **config**, and other **service libraries** live in `packages/*`; every app in `apps/*` imports them from one versioned source of truth. Change a button once, every app picks it up. Fix a bug in a shared client once, every consumer benefits.

**Industry precedent — at scale.** Google stores the vast majority of its software in a **single monolithic repository** (internally called **Piper**). As of their widely cited 2016 analysis, roughly **95% of Google developers** worked from that one repo—on the order of **billions of lines of code** and **tens of thousands of engineers**—because **extensive code sharing**, **simplified dependency management**, and **atomic cross-project changes** outweighed the tooling cost. Chrome, Search, Gmail, and internal services all live in the same tree; **each product still builds and deploys on its own schedule** to its own targets (web services, containers, release branches). **One repo does not mean one deployment.**

**What this course hands you.** Learners do not leave Phase 00 with checklists alone—they leave with a **working Turbo monorepo shell**: `apps/`, `packages/`, `turbo.json`, root scripts, and the same pipeline the curriculum uses. They also get the seed of a **[monorepo operating model](../../MONOREPO-OPERATING-MODEL.md)**: **`docs/ai-program/`** for policy and decisions, **`.claude/skills/`** for repeatable agent workflows, and **`docs/projects/`** for **portfolio context** — one folder per app they build (SaaS killers and their own ideas). Scouting is one skill (`/terrain-review`), not the whole idea. Treat it as a **starter asset**: run the course here, then **copy the layout, conventions, and skills** into your own monorepo if that model fits your team.

**The portfolio effect.** Once the first app works, teams often realize they can build **the next thing they've always wanted** in the same repo — shared packages, same gates, same skills. The monorepo is where that ambition lives: **`apps/<name>`** for code, **`docs/projects/<name>/`** for each product's portfolio context files.

A **Turbo monorepo** gives us **task orchestration**, **caching**, and a **clear contract** for where apps live (`apps/*`), where shared code lives (`packages/*`), and how we run **build / test / lint** from the root.

## Why Turborepo (and not Nx or Bazel)

Several tools orchestrate monorepos. We use **Turborepo** here because it is **simple to learn yet very capable**—a good default for JS/TS teams starting out, not the biggest hammer in the shed.

**What Turbo is:** a **task runner and cache layer** on top of normal npm workspaces. It runs the `package.json` scripts you already define, wired together by a single **`turbo.json`**.

**What Turbo is really good at:**

- **Task orchestration** — runs `build`, `test`, and `lint` in **dependency order** (shared packages before apps that import them) and **in parallel** across CPU cores.
- **Local caching** — hashes each task's inputs; if nothing changed, it **restores outputs from cache** instead of re-running. The second root `npm run build` is the demo: unchanged packages skip work—often near-instant.
- **Remote caching** (optional) — CI and teammates can share cache hits so the same work is not repeated on every machine.
- **Incremental adoption** — works with **npm**, pnpm, or yarn workspaces; no stack rewrite.

**What else is out there (briefly):**

- **Nx** — a broader **monorepo platform**: plugins, code generators, richer CI distribution (Nx Cloud). More power and more configuration. Strong choice when you need a full platform; heavier than this course needs on day one.
- **Bazel / Buck** — **large-scale build systems** (Google/Meta territory) for polyglot, hermetic builds across enormous codebases. Very powerful, steep learning curve—not the right teaching vehicle for a JS/TS curriculum.
- **Lerna / Rush** — strong on **package publishing and enterprise policy**; less centered on Turbo's fast task-cache loop.
- **Workspaces alone** (npm/pnpm/yarn) — link packages together but do not **orchestrate or cache** tasks across the whole graph.

**Why it fits Phase 00:** We are teaching **intention → build → verify**, not monorepo archaeology. Turbo scaffolds a credible modern shell quickly, makes caching tangible, and stays out of the way when agents add apps in later phases.

## Who it’s for

Developers using this course and **Claude Code** (or similar) with a **specialized monorepo agent** and **skills** so scaffolding stays **repeatable**—not a one-off folder structure.

## What “good” looks like

- **Turborepo** at the root with a sensible `turbo.json` pipeline (build, test, lint as appropriate).
- **`apps/`** for deployable surfaces (e.g. web, API) and **`packages/`** for shared libraries, types, UI kit, config—**names and layout** match what the monorepo agent documents.
- **One command from root** can build (or check) the whole graph; local dev story is documented (package manager, Node version if relevant).
- **Room to grow**: Phase 01 adds a second app without restructuring everything.
- **Every app in `apps/`** that follows a curriculum track must meet that track’s **demo-grade minimums** in its `intention-*.md`. Cross-cutting bar: **[DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md)** (product-shaped tools, not single starter screens).

## Out of scope for the first cut

- Production CI/CD wiring can be **stubbed or documented**; not required to “finish” the shell in the first session.
- Auth vendors, cloud secrets, and payment rails—**not** part of the monorepo intention itself.

## Success

Someone cloning the repo can run the **documented** root scripts, see **Turbo** coordinate tasks, and place **new work** in the right **app or package** without debating folder religion.

## Relationship to the first product

This intention defines **the house**. The **first app** (HTTP workspace, wiki, CRM, or ops pulse) gets its **own** intention file **after** the shell exists—see [README](./README.md).

## How this feeds PRD → plan → app

This file is the **shell intention** before **`/prd`** for Part A. The PRD should require **Turbo**, **`apps/` + `packages/`**, root `package.json` workspaces, and `turbo.json` tasks (`build`, `test`, `dev` as needed). The plan should list **exact paths** to create (`apps/<name>`, `packages/*/package.json`), **package manager**, and **root scripts** so `turbo run build` (or documented equivalent) is real. **Do not** treat an empty `apps/` folder as “done”—the shell is the repeatable layout; **track apps** still follow their **intention-*.md** and [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) when built.
