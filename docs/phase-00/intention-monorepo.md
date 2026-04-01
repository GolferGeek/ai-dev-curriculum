# Intention — Turbo monorepo (workspace shell)

## Why this exists

We need a **single repository** that can hold **multiple apps and shared packages** as the curriculum (and real teams) grow—without copy-pasting config and scripts. A **Turbo monorepo** gives us **task orchestration**, **caching**, and a **clear contract** for where apps live (`apps/*`), where shared code lives (`packages/*`), and how we run **build / test / lint** from the root.

## Who it’s for

Developers using this course and **Claude Code** (or similar) with a **specialized monorepo agent**, **skills**, and **commands** so scaffolding stays **repeatable**—not a one-off folder structure.

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
