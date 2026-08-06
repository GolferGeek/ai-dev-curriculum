# Checklist 04 — Deploy apps from the monorepo (Docker + cloud)

*One git repo in **GitHub** or **Azure DevOps** — **many deployables**. Each app in `apps/<name>/` gets its own Dockerfile, container registry image, cloud service, and CI workflow. Branches map to environments.*

**Orchestrator:** This checklist defaults to **Turborepo** (curriculum starter). If you migrated with [Checklist 03 — Turbo → Nx](03-turbo-to-nx.md), read **Part 2b** for Nx-specific build, prune, and CI differences — cloud deploy steps (Parts 3–8) stay the same.

**Examples to copy:** [docs/deploy/](../deploy/README.md) (Dockerfiles + GitHub Actions + Azure Pipelines)

**Prerequisite:** [01 — Your monorepo on GitHub](01-your-monorepo-on-github.md) (or equivalent in Azure DevOps). Kit [05 — Decision boundaries](../../marketing/adoption-kit/05-decision-boundaries.md) — deploy stays **human-gated** until your org says otherwise.

*[refresh]* Cloud UI names, action versions, and auth patterns change — verify against vendor docs before teaching.

---

## Mental model (teach this first)

```text
┌─────────────────────────────────────────────────────────────┐
│  One Turbo monorepo (GitHub or Azure DevOps)                │
│  apps/quickbooks-killer   apps/trello-killer   apps/…       │
│  packages/*  (shared — may trigger multiple deploys)        │
└───────────────┬─────────────────┬───────────────────────────┘
                │                 │
        workflow A          workflow B
        path filter         path filter
                │                 │
                ▼                 ▼
         Docker image A     Docker image B
                │                 │
                ▼                 ▼
    Azure App Service      AWS / Fly / GCP …
    (or Container Apps)    (same pattern)
```

**One repo ≠ one deployment.** Version control is shared; **runtime is per app**. Each portfolio entry in [docs/projects/](../projects/README.md) can list its deploy target URL.

---

## When to use this checklist

| Ready | Not yet |
|-------|---------|
| App meets demo-grade / production bar for *one* slice | Still in Phase 00 shell only |
| Dockerfile builds locally from repo root | No owner for secrets and cloud spend |
| CI owner named | Deploy auto-merge without review (kit 05) |

---

## Part 1 — Inventory (fill in per app)

| App | Package name (`package.json`) | Dockerfile path | Cloud service | Registry | Prod branch |
|-----|------------------------------|-----------------|---------------|----------|-------------|
| e.g. quickbooks-killer | `@curriculum/quickbooks-killer` | `apps/quickbooks-killer/Dockerfile` | Azure App Service (Linux container) | ACR / GHCR | `main` |
| e.g. ops-pulse | `@curriculum/ops-pulse` | `apps/ops-pulse/Dockerfile` | App Service or Static Web Apps | | `main` |
| | | | | | |

| Environment | Git branch | App Service / slot name | Auto-deploy? |
|-------------|------------|-------------------------|--------------|
| Production | `main` | | ☐ manual approval |
| Staging | `develop` or `release/*` | | |
| Preview | PR / `feature/*` | optional | |

**Owner:** ___________________ · **Cloud subscription(s):** ___________________

---

## Part 2 — Docker per app (Turbo monorepo)

### Why `turbo prune`

A naive `docker build` from the whole repo rebuilds on **any** file change. [`turbo prune`](https://turbo.build/repo/docs/guides/tools/docker) copies only the workspace + dependencies needed for **one** app — smaller context, faster CI.

```bash
# From repo root — dry run locally first
npx turbo prune @curriculum/quickbooks-killer --docker
ls out/json out/full
```

### Checklist per app

- [ ] Copy Dockerfile from [examples](../deploy/examples/Dockerfile.nextjs-turbo-prune.example) or [Vite + nginx](../deploy/examples/Dockerfile.vite-nginx.example)
- [ ] Set `APP_PACKAGE` to the **`name`** field in that app’s `package.json`
- [ ] **Next.js:** add `output: 'standalone'` in `next.config` *(your app change)*
- [ ] Build from **repo root:** `docker build -f apps/<name>/Dockerfile .`
- [ ] Container runs locally; smoke-test the URL/port
- [ ] Document env vars (DB URL, secrets) — **never** in image; App Service **Configuration** / Key Vault

### Shared `packages/` changes

Path filters should include `packages/**` (and root `package-lock.json`) so a shared library change **redeploys affected apps**.

**Turbo (advanced):** `turbo run build --filter=@curriculum/<app>...[origin/main] --dry=json` to skip unchanged apps.

**Nx (recommended after Checklist 03):** `nx affected` — see **Part 2b**; path filters alone are not enough for library dependency chains.

---

## Part 2b — Nx differences (after Checklist 03)

If you ran [03 — Turbo → Nx](03-turbo-to-nx.md), **Parts 3–8 unchanged** (ACR, App Service, secrets, branch → env). What changes is **how you build inside Docker/CI** and **how you decide what to deploy**.

### Turbo vs Nx — deploy-relevant comparison

| Topic | Turborepo (Part 2) | Nx |
|-------|-------------------|-----|
| **Shrink repo for one app** | `turbo prune <package> --docker` → `out/json`, `out/full` | `nx run <project>:prune` → pruned lockfile + `workspace_modules/` in project **`dist/`** |
| **Build in Docker** | Often multi-stage Dockerfile runs `turbo prune` + `turbo run build` inside image | Recommended: **build + prune in CI**, Dockerfile copies **`apps/<name>/dist/`** ([Nx deploy guide](https://nx.dev/docs/technologies/node/guides/deploying-node-projects)) |
| **Project identifier** | npm `package.json` **`name`** (e.g. `@curriculum/quickbooks-killer`) | Nx **project name** — run `nx show projects` (may differ from package name) |
| **“What should deploy?”** | Path filters + optional `turbo run build --filter=...[origin/main] --dry=json` | **`nx affected`** — uses Git diff + **project graph** (includes dependents of changed libs) |
| **Docker targets** | You wire `docker build` yourself | Optional **`@nx/docker`** plugin infers `docker:build`, `docker:run`, release publish from each `Dockerfile` ([Nx Docker](https://nx.dev/docs/technologies/build-tools/docker/introduction)) |
| **Config file in path filters** | `turbo.json` | **`nx.json`** (+ `project.json` if present) |
| **Remote cache in CI** | Turbo Remote Cache env vars in Docker build args | **Nx Cloud** or self-hosted — pair with `nx affected` ([reduce CI waste](https://nx.dev/docs/concepts/ci-concepts/reduce-waste)) |

### Nx prune setup (per app)

Nx does **not** use `turbo prune`. It uses a target chain ([deploying Node projects](https://nx.dev/docs/technologies/node/guides/deploying-node-projects)):

1. **`build`** — compile the app  
2. **`prune-lockfile`** — minimal production `package.json` + lockfile  
3. **`copy-workspace-modules`** — local `packages/*` deps as `file:` paths  
4. **`prune`** — depends on both; one command before Docker  

New `@nx/node` apps can include these by default; generate with `--docker` for a starter Dockerfile:

```bash
# After nx init / plugins added
nx show project quickbooks-killer --json   # confirm project name + targets
nx run quickbooks-killer:build
nx run quickbooks-killer:prune
ls apps/quickbooks-killer/dist/
```

- [ ] Each deployable app has **`prune`** (and dependency) targets configured  
- [ ] Dockerfile copies from **`apps/<name>/dist/`** — see [Dockerfile.nx-prune.example](../deploy/examples/Dockerfile.nx-prune.example)  
- [ ] **Next.js on Nx:** use `@nx/next` build output paths; may still need `output: 'standalone'` — align COPY/CMD with `@nx/next` docs *[refresh]*  
- [ ] **Angular on Nx:** build output under `dist/` per `@nx/angular` — different from Next; use Nx-generated Docker patterns if you came from Nrwl/Angular  

### Nx CI — deploy only affected apps

Path filters alone miss **graph dependents** (change `packages/surrealdb` → should redeploy apps that import it). Nx **`affected`** handles that:

```bash
# Which projects changed since last green main?
nx show projects --affected --base=origin/main~1 --head=HEAD

# Build/deploy pipeline (example)
nx affected -t build,prune --base=origin/main~1 --head=HEAD
```

**GitHub Actions pattern:** gate deploy job with `nx show projects --affected` (see [github-actions-azure-app-nx-affected.yml.example](../deploy/examples/github-actions-azure-app-nx-affected.yml.example)) or a matrix from affected project list.

**Azure DevOps:** script step running `nx affected` before `Docker@2` — same logic as GitHub.

| Checklist | Done |
|-----------|------|
| `fetch-depth: 0` on checkout (full Git history for affected) | ☐ |
| Deploy workflow uses **affected** gate or `nx affected -t docker:build` | ☐ |
| `nx.json` in workflow `paths:` (global graph/config changes) | ☐ |
| Documented mapping: Nx project name ↔ App Service ↔ ACR image name | ☐ |

### `@nx/docker` plugin (optional)

If you add **`@nx/docker`**, Nx infers **`docker:build`** / **`docker:run`** per `Dockerfile`:

```bash
nx run quickbooks-killer:docker:build
nx run quickbooks-killer:docker:run -p 3100:3100
```

CI can call **`nx affected -t docker:build`** instead of raw `docker build`. **Nx Release** can version and publish images to a registry in one flow — evaluate against kit **06** spend/ownership *[refresh]*.

- [ ] Team chose **raw Docker in CI** vs **`@nx/docker`** targets — recorded in `docs/ai-program/07-program-evolution/02-proposals-decisions-and-supersession/`

### What stays identical (Turbo or Nx)

- One repo, many App Services / container hosts  
- One workflow (or pipeline) per app × environment  
- Branch → staging/prod mapping  
- Kit **05** — human approval for production  
- Portfolio URLs in `docs/projects/<name>/`  

---

## Part 3 — Azure App Service (Linux + Docker)

Typical mid-size **.NET / Node shop on Azure** path:

| Step | Done |
|------|------|
| Create **Azure Container Registry** (ACR) | ☐ |
| Create **App Service plan** (Linux) | ☐ |
| Create **Web App for Containers** — one per deployable app | ☐ |
| Configure app **Settings → Configuration** — env vars, `WEBSITES_PORT` if not 80/8080 | ☐ |
| Enable **managed identity** or service principal for CI push to ACR | ☐ |
| Custom domain + TLS (optional) | ☐ |

Alternatives same checklist shape: **Azure Container Apps**, **AWS App Runner / ECS**, **Google Cloud Run**, **Fly.io** — build/push image pattern is identical; only deploy task differs.

---

## Part 4 — GitHub Actions (one workflow per app × env)

Microsoft and GitHub document this pattern: [Docker → Azure App Service](https://docs.github.com/en/actions/how-tos/deploy/deploy-to-third-party-platforms/docker-to-azure-app-service).

### Pattern

1. **Separate workflow file** per app (and per environment if needed) under `.github/workflows/`
2. **`on.push.paths`** — app folder + shared packages + workflow file
3. **Build** image from repo root with `-f apps/<name>/Dockerfile`
4. **Push** to ACR or `ghcr.io`
5. **Deploy** with [`azure/webapps-deploy`](https://github.com/Azure/webapps-deploy) or cloud equivalent

Example: [github-actions-azure-app-quickbooks.yml.example](../deploy/examples/github-actions-azure-app-quickbooks.yml.example)

### Secrets (repository or environment)

| Secret | Purpose |
|--------|---------|
| `AZURE_CLIENT_ID` / `AZURE_TENANT_ID` / `AZURE_SUBSCRIPTION_ID` | OIDC login (`azure/login`) |
| Or `AZURE_CREDENTIALS` | Service principal JSON (legacy) |
| Or `AZURE_WEBAPP_PUBLISH_PROFILE` | Publish profile deploy |
| ACR credentials | If not using OIDC + `az acr login` |

### Checklist

- [ ] Workflow copied and renamed for first app
- [ ] `environment: production` with required reviewers (kit 05)
- [ ] Path filters tested — push to `apps/other-app/` does **not** deploy this app
- [ ] Push to `packages/<shared>` **does** deploy when intended
- [ ] Failed deploy notifies owner (not silent)

### Branch → environment examples

| Pattern | Use when |
|---------|----------|
| `main` → prod workflow only | Simple team |
| `develop` → staging workflow, `main` → prod | Two-tier |
| `workflow_dispatch` + branch input | Manual promote |
| PR → preview slot (Azure deployment slots) | Optional |

---

## Part 5 — Azure DevOps (same repo, same idea)

Repo can live in **Azure Repos** or **GitHub connected to Azure Pipelines** — the monorepo layout is unchanged.

| Step | Done |
|------|------|
| Service connection to Azure subscription | ☐ |
| Service connection to ACR (Docker registry) | ☐ |
| Pipeline YAML with **`trigger.paths`** (mirror GitHub path filters) | ☐ |
| `Docker@2` buildAndPush + `AzureWebAppContainer@1` deploy | ☐ |

Example: [azure-pipelines-app.yml.example](../deploy/examples/azure-pipelines-app.yml.example)

**Multi-app:** one pipeline file per app, or one pipeline with staged jobs — same as multiple GitHub workflow files.

---

## Part 6 — Other clouds (same checklist, swap deploy step)

| Platform | Build | Deploy |
|----------|-------|--------|
| **Azure App Service** | Docker → ACR | `azure/webapps-deploy` or `AzureWebAppContainer@1` |
| **AWS App Runner / ECS** | Docker → ECR | AWS action / CLI |
| **Google Cloud Run** | Docker → Artifact Registry | `google-github-actions/deploy-cloudrun` |
| **Fly.io** | `fly deploy` with Dockerfile | Per-app `fly.toml` |
| **Vercel** (Next.js) | Often **no Docker** — project root `apps/<name>`, monorepo setting in Vercel UI | Platform-native |

Turbo monorepo on Vercel: set **Root Directory** to `apps/<name>` per project — still one git repo, multiple Vercel projects.

---

## Part 7 — Policy and guardrails

- [ ] Kit **05** — agent may **not** deploy to production without human approval (unless explicit exception)
- [ ] Production deploy requires PR merge + green CI (link kit **04**)
- [ ] Secrets in cloud config / GitHub Environments — not in `docs/projects/` or Docker layers
- [ ] Record deploy URLs in [docs/projects/<name>/](../projects/README.md) portfolio README

---

## Part 8 — Verification

| Check | Done |
|-------|------|
| Local `docker build` from repo root | ☐ |
| CI workflow green on test branch | ☐ |
| App reachable at cloud URL | ☐ |
| Changing unrelated app path does not trigger this deploy | ☐ |
| Changing shared package triggers redeploy when expected | ☐ |
| Rollback path documented (previous image tag / slot swap) | ☐ |

---

## Learning resources

| Topic | Link |
|-------|------|
| Turbo + Docker | [turbo.build — Docker guide](https://turbo.build/repo/docs/guides/tools/docker) |
| **Nx + Docker / prune** | [Deploying Node projects](https://nx.dev/docs/technologies/node/guides/deploying-node-projects) · [@nx/docker](https://nx.dev/docs/technologies/build-tools/docker/introduction) |
| **Nx affected in CI** | [Run only affected tasks](https://nx.dev/docs/features/ci-features/affected) |
| Turbo → Nx migration | [Checklist 03](03-turbo-to-nx.md) |
| GitHub → Azure App Service | [GitHub Docs — Docker to Azure](https://docs.github.com/en/actions/how-tos/deploy/deploy-to-third-party-platforms/docker-to-azure-app-service) |
| Azure deploy action | [Azure/webapps-deploy](https://github.com/Azure/webapps-deploy) |
| Monorepo path filters | [Azure Static Web Apps monorepo pattern](https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration#monorepo-support) (same `paths:` idea) |
| One repo ≠ one deploy | [Phase 00 TEACHING](../phases/00/TEACHING.md) |

---

## Sign-off

| Field | Value |
|-------|------|
| First app deployed | |
| CI platform (GitHub / Azure DevOps) | |
| Cloud (Azure / AWS / other) | |
| Production URL | |
| Deploy approver | |

**Back to map →** [00 — High-level roadmap](00-high-level.md)
