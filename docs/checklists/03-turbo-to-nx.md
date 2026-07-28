# Checklist 03 — Turbo → Nx (optional migration)

*Example path when your team outgrows **Turborepo** but wants the **same monorepo outcomes**: `apps/`, `packages/`, portfolio in `docs/projects/`, skills in `.claude/skills/`, same quality gates.*

**Not required for the course.** Phase 00 intentionally uses Turbo — simple task runner + cache on npm workspaces. Use this checklist **after** you’ve run the pipeline on real apps and decided Nx is worth the extra surface area.

**Official migration guide:** [Migrating from Turborepo to Nx](https://nx.dev/docs/guides/adopting-nx/from-turborepo) · [Nx vs Turborepo](https://nx.dev/docs/guides/adopting-nx/nx-vs-turborepo)

*[refresh]* Nx version floors and plugin names change — verify against [nx.dev](https://nx.dev) before migrating.

---

## When to consider Nx (and when to stay on Turbo)

| Stay on Turbo longer | Consider Nx |
|----------------------|-------------|
| Few apps, one JS/TS stack | Many apps, multiple frameworks (Next, Vite, Nest, .NET mix) |
| Team knows `package.json` scripts | Want **generators**, **project graph UI**, **module boundaries** |
| Root `npm run build` + local cache is enough | Need **affected** runs, richer CI distribution, org-scale remote cache |
| You’re still in Phase 00–01 | You’ve shipped portfolio apps and hit Turbo’s ceiling |

Run this decision through kit [08 — Terrain review](../../marketing/adoption-kit/08-terrain-review.md) or `/terrain-review` — not a hallway upgrade because Nx feels “more enterprise.”

---

## Nx in one paragraph (including the Angular story)

**Nx started in 2017** as an extension of the **Angular CLI** (Nrwl) — deep generators, libraries, and monorepo patterns for Angular teams. That’s why it feels familiar if you came from Angular + Nrwl.

**Today Nx is framework-agnostic:** first-class plugins for React, Next.js, Vite, Node, Playwright, .NET, Gradle, and more. Angular remains a **strong** path (`@nx/angular`), but this curriculum’s Turbo shell (Vite + Next + mixed apps) maps to **`@nx/vite`**, **`@nx/next`**, **`@nx/js`** — not “Nx = Angular only.”

**Migration claim (from Nx docs):** Nx is largely a **superset** of Turborepo for JS workspaces — `npx nx init` can add Nx **without rewriting** existing `package.json` scripts on day one.

---

## What does *not* change in migration

These are **operating-model** choices — independent of Turbo vs Nx:

| Keep as-is | Path |
|------------|------|
| Portfolio layout | `apps/<name>/`, `packages/*/` |
| Portfolio context | `docs/projects/<name>/` |
| Corporate memory | `docs/ai-program/` |
| Skills & agents | `.claude/skills/`, `.claude/agents/` |
| Harness passport | `AGENTS.md`, `.cursor/rules/` |
| Quality gates | Same commands — update **orchestrator** only |
| GitHub Actions | Replace `turbo run …` with `nx run-many` / `nx affected` when ready |

**You are swapping the task runner layer**, not the curriculum’s document + skill model.

---

## Levels of Nx understanding (learn in order)

Use this as a **skills ladder** for the team — not everyone needs Level 4 on day one.

### Level 1 — Drop-in runner (same place as Turbo)

**You can:** run existing scripts through Nx; use local cache; compare cache hits.

| Concept | Turbo | Nx |
|---------|-------|-----|
| Run all builds | `turbo run build` | `nx run-many -t build` or keep `npm run build` wired to Nx |
| Run one app | `turbo run build --filter=app` | `nx build <project-name>` |
| Cache off | `turbo run build --force` | `nx run-many -t build --skip-nx-cache` |
| See workspace | read `turbo.json` | `nx show projects`, `nx graph` |

**Checklist**

- [ ] Read [Nx vs Turborepo — adoption section](https://nx.dev/docs/guides/adopting-nx/nx-vs-turborepo)
- [ ] Team lead runs `npx nx@latest init` on a **branch** (see Phase A below)
- [ ] `nx run-many -t build` and `nx run-many -t test` green
- [ ] `./scripts/verify-curriculum-structure.sh` still passes

### Level 2 — Workspace mechanics

**You can:** read `nx.json`, `project.json` (if present), understand **targets**, **dependsOn**, **inputs/outputs** for cache.

| Concept | Learn |
|---------|--------|
| **Project graph** | Apps and packages as nodes; edges = dependencies |
| **Targets** | Named tasks (`build`, `test`, `lint`) per project |
| **targetDefaults** | Replaces Turbo `pipeline` / global task config in `turbo.json` |
| **Affected** | `nx affected -t test` — what changed since `main` |
| **Inference (Project Crystal)** | Plugins infer targets from `vite.config`, `next.config`, etc. |

**Checklist**

- [ ] Open `nx graph` — team walkthrough (15 min)
- [ ] Map this repo’s `turbo.json` tasks to Nx equivalents (table in Phase B)
- [ ] CI job runs `nx affected -t build,test` on PRs (optional before removing Turbo)
- [ ] Document Nx commands in kit [04 — Quality gates](../../marketing/adoption-kit/04-quality-gates.md)

### Level 3 — Platform features (why teams pick Nx)

**You can:** use generators, enforce boundaries, adopt plugins intentionally.

| Feature | Why teams use it |
|---------|------------------|
| **`nx generate`** | Scaffold libs/apps consistently — replaces ad-hoc folders |
| **Module boundaries** | `@nx/enforce-module-boundaries` — stop illegal imports |
| **Plugins** | `@nx/next`, `@nx/vite`, `@nx/js`, `@nx/playwright` — inferred tasks |
| **Nx Cloud / self-hosted cache** | Shared remote cache (evaluate security + kit 06 spend) |

**Checklist**

- [ ] Add plugins only for stacks you actually run (don’t install `@nx/angular` for a Next-only shop)
- [ ] One generator workflow documented (e.g. new package in `packages/`)
- [ ] Boundary rules agreed with arch lead — start permissive, tighten later
- [ ] Remote cache decision recorded in `docs/ai-program/decisions/`

### Level 4 — Program ownership (Angular-heavy or polyglot shops)

**You can:** own `nx migrate`, custom executors, multi-stack CI, synthetic/polyglot graphs.

| Topic | Typical owner |
|-------|----------------|
| **`nx migrate latest`** quarterly | Platform / dev lead |
| **@nx/angular** library patterns | Teams still on Angular |
| **@nx/dotnet** / Gradle | Mixed JS + backend repos |
| **Custom generators** for company conventions | Platform team |

**Checklist**

- [ ] `nx migrate` runbook in `docs/ai-program/`
- [ ] Coach assigned for Nx questions (often ex-Angular/Nrwl person — that’s fine)

---

## Migration phases (get back to “same place”)

### Phase A — Init on a branch (parallel run)

```bash
git checkout -b chore/nx-init

# From repo root — reads turbo.json, adds nx.json
npx nx@latest init
```

Expect:

- `nx` devDependency added
- `nx.json` created (mapped from `turbo.json`)
- `.gitignore` updated for `.nx/cache`

**Do not delete Turbo yet.**

- [ ] Init on branch; PR for review
- [ ] Both work: `turbo run build` **and** `nx run-many -t build`
- [ ] Compare cache behavior on second run

### Phase B — Map configuration

Curriculum `turbo.json` today:

| Turbo task | Turbo config | Nx equivalent (concept) |
|------------|--------------|-------------------------|
| `build` | `dependsOn: ["^build"]`, outputs `dist/**`, `.next/**` | `targetDefaults.build.dependsOn: ["^build"]`, `outputs` |
| `test` | `dependsOn: ["build"]` | Same dependency chain on `test` target |
| `dev` | `cache: false`, `persistent: true` | `continuous: true`, cache disabled |

Use Nx’s [Turbo → Nx property mapping table](https://nx.dev/docs/guides/adopting-nx/from-turborepo) for edge cases.

- [ ] `nx.json` reviewed against old `turbo.json`
- [ ] Root `package.json` scripts updated **when team agrees** — e.g. `"build": "nx run-many -t build --all"`

### Phase C — CI and hooks

Update [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) (or your copy):

| Before | After (example) |
|--------|-----------------|
| `npm run build` → turbo | `npx nx run-many -t build --all` |
| Full test on every PR | `npx nx affected -t build,test --base=origin/main` |

- [ ] CI green on branch
- [ ] Required status check names updated in GitHub ruleset if job names change
- [ ] Nightly Tier 1 hygiene uses Nx commands

### Phase D — Remove Turbo (only when confident)

```bash
npm uninstall turbo
rm turbo.json
# Update any docs that say "turbo run"
```

- [ ] No references to `turbo` in root scripts or CI
- [ ] Team trained on Level 1 commands
- [ ] Record decision in `docs/ai-program/decisions/` (ADR: “Adopt Nx orchestration”)

---

## Same-place verification (curriculum bar)

You’re “back to the same place” when:

- [ ] `apps/*` and `packages/*` unchanged in **purpose** (paths may gain `project.json`)
- [ ] `./scripts/verify-curriculum-structure.sh` OK
- [ ] Build + test green locally and in CI
- [ ] `/scan-errors`, `/commit pr` still make sense (update `quality-gates` skill if commands changed)
- [ ] Portfolio + skills untouched in meaning — `docs/projects/`, `.claude/skills/`
- [ ] Pages + guardrail workflows still deploy

**Deploy after Nx:** update Docker/CI per [Checklist 04 — Part 2b](04-deploy-apps-docker-cloud.md#part-2b-nx-differences-after-checklist-03) (`nx prune`, `nx affected`, not `turbo prune`).

---

## Angular teams (Nx’s original home)

If your company is **Angular-heavy**, Nx will feel like coming home:

- **Library boundaries** (`buildable` libs, `publishable` libs) map to how Nrwl taught enterprise Angular for years
- **`@nx/angular`** — generators, executors, migration from Angular CLI
- **Module federation** paths have changed over time — use current Nx + [Angular architects guidance](https://nx.dev/docs/technologies/angular/guides/nx-and-angular) *[refresh]*

If your portfolio is **mostly Next/Vite** (this curriculum’s default), prioritize **`@nx/next`** / **`@nx/vite`** — don’t let Angular nostalgia drive plugin sprawl.

---

## Learning resources

| Resource | Use for |
|----------|---------|
| [Migrating from Turborepo to Nx](https://nx.dev/docs/guides/adopting-nx/from-turborepo) | Command + config mapping |
| [Nx vs Turborepo](https://nx.dev/docs/guides/adopting-nx/nx-vs-turborepo) | Honest comparison |
| [Nx and Angular](https://nx.dev/docs/technologies/angular/guides/nx-and-angular) | Angular history + modern setup |
| [Adding Nx to an existing project](https://nx.dev/docs/guides/adopting-nx/adding-to-existing-project) | Incremental adoption |
| [intention-monorepo.md](../phases/00/intention-monorepo.md) | Why this course starts on Turbo |

---

## Sign-off

| Field | Value |
|-------|-------|
| Decision date (ADAPT / terrain review) | |
| Target Nx level for whole team (1–4) | |
| Migration owner | |
| Turbo removed date (if applicable) | |
| CI command canonical form | |

**Back to map →** [00 — High-level roadmap](00-high-level.md)
