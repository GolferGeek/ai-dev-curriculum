# Project portfolio — context for each app

*The monorepo is not only an operating system for **how you work**. It is the **portfolio** for **what you build** — every SaaS killer, internal tool, and experiment gets a home.*

When teams start with one repo and one pipeline, something predictable happens: the first app proves the model works, then people say *"we could also build…"* The monorepo makes **starting the second app cheap** — shared `packages/`, same skills, same gates — so ambition compounds instead of stalling in separate repos and forgotten folders.

---

## Two folders per product

| Layer | Path | What it holds |
|-------|------|----------------|
| **Code** | `apps/<name>/` | The runnable product — UI, API, tests |
| **Portfolio context** | `docs/projects/<name>/` | *What this app is*, who it's for, status, links to intention/PRD, agent loading notes |

**Portfolio context** is project-level **memory + context** for agents and humans: the story of *this* product inside your portfolio. Load it with `@docs/projects/<name>/` when starting a session on that app.

Corporate policy stays in `docs/ai-program/`. Group/client overlays stay in `docs/groups/`. **Each app in the portfolio gets its own project folder** — your team's growing catalog of things they've always wanted to build.

---

## Layout

```text
apps/
  quickbooks-killer/          # deployable app
  trello-killer/
  my-internal-dashboard/      # their own idea after Phase 01

docs/projects/
  README.md                   # portfolio index (this file)
  _template/                  # copy when starting a new app
  quickbooks-killer/          # portfolio context for that app
    README.md
  my-internal-dashboard/
    README.md
```

During an **active build**, intention → PRD → plan often live in `docs/artifacts/` first. When the slice ships or the name stabilizes, **promote** durable files into `docs/projects/<name>/` so the portfolio stays the long-term home.

---

## Portfolio index (fill in as you build)

| Project | One line | App | Status |
|---------|----------|-----|--------|
| *(Phase 01 track)* QuickBooks killer | Invoicing + expenses for freelancers | `apps/quickbooks-killer/` | ☐ |
| *(Phase 01 track)* Trello killer | Kanban boards | `apps/trello-killer/` | ☐ |
| *(your idea)* | | `apps/` | ☐ |

Add a row for every app you start — including ideas that are only intention so far.

---

## Starting a new portfolio entry

1. Copy [`_template/`](_template/README.md) → `docs/projects/<your-app-name>/`
2. Fill in README — pitch, audience, stack, how to run
3. Scaffold code under `apps/<your-app-name>/` (Phase 00 shell or Phase 01 `/research` → `/intention`)
4. Optional: `apps/<your-app-name>/AGENTS.md` or nested rules in `.cursor/rules/` scoped to that path — see [G2 harness map](../guardrails/02-harness-instruction-layers.md)
5. Add a row to the table above
6. When deployed, record **Production URL** — see [Checklist 04 — Deploy](../checklists/04-deploy-apps-docker-cloud.md)

---

## Why this matters for agents

| Without portfolio context | With `docs/projects/<name>/` |
|---------------------------|------------------------------|
| Agent only sees code files | Agent knows *purpose*, audience, and "done" |
| Every new app feels like day zero | Same passport + skills; new project folder is the delta |
| Portfolio lives in someone's head | Portfolio is **in git** — onboard a hire with `@docs/projects/` |

Session start pattern:

```text
@docs/projects/my-app/README.md @docs/artifacts/plan-my-app.md
Work on apps/my-app/ — stay inside kit 05 boundaries.
```

---

## Related

- [Monorepo operating model](../MONOREPO-OPERATING-MODEL.md) — corporate · group · **project** scopes
- [Phase 01 — SaaS killers](../phases/01/README.md) — first portfolio builds
- [Artifact pipeline](../../marketing/adoption-kit/03-artifact-pipeline.md) — intention → PRD → plan
- [Checklist 01 — Your monorepo on GitHub](../checklists/01-your-monorepo-on-github.md)
