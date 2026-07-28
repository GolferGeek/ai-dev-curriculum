# Deploy examples — Turbo monorepo

Copy-paste starters for [Checklist 04 — Deploy apps (Docker + cloud)](../checklists/04-deploy-apps-docker-cloud.md).

| File | Use for |
|------|---------|
| [Dockerfile.nextjs-turbo-prune](Dockerfile.nextjs-turbo-prune.example) | Next.js app in `apps/` — **Turborepo** `turbo prune --docker` |
| [Dockerfile.nx-prune](Dockerfile.nx-prune.example) | Same app after **Nx** migration — copies `apps/<name>/dist/` after `nx prune` |
| [Dockerfile.vite-nginx](Dockerfile.vite-nginx.example) | Vite static app (e.g. `ops-pulse`) — Turbo prune pattern |
| [github-actions-azure-app-quickbooks.yml](github-actions-azure-app-quickbooks.yml.example) | GitHub Actions → ACR → App Service (Turbo / path filters) |
| [github-actions-azure-app-nx-affected.yml](github-actions-azure-app-nx-affected.yml.example) | GitHub Actions — **Nx affected** gate + prune before Docker |
| [azure-pipelines-app.yml](azure-pipelines-app.yml.example) | Azure DevOps → ACR → App Service (one app) |

**Not committed to live `.github/workflows/`** — your team copies and renames per app and environment.

Official references: [Turborepo — Docker](https://turbo.build/repo/docs/guides/tools/docker) · [Deploy Docker to Azure App Service (GitHub)](https://docs.github.com/en/actions/how-tos/deploy/deploy-to-third-party-platforms/docker-to-azure-app-service) · [Azure/webapps-deploy](https://github.com/Azure/webapps-deploy)
