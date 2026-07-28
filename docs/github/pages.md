# GitHub Pages — publish team documentation

*Turn the `docs/` folder into a URL your whole team can bookmark.*

---

## What this repo publishes

| Content | Path |
|---------|------|
| Phase guides | `docs/phases/` |
| Operating model | `docs/MONOREPO-OPERATING-MODEL.md` |
| AI program templates | `docs/ai-program/` |
| **GitHub guardrails handbook** | `docs/github/` (this section) |

Site generator: **MkDocs Material**, built by [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml).  
Config: [`mkdocs.yml`](../../mkdocs.yml) at repo root.

---

## One-time enable (repository admin)

1. **Settings → Pages**
2. **Build and deployment → Source:** **GitHub Actions** (not “Deploy from branch”)
3. Merge or push [`pages.yml`](../../.github/workflows/pages.yml) to `main`
4. **Actions** tab → watch **Deploy documentation site** → note the URL

**URL pattern:** `https://<org-or-user>.github.io/<repo>/`

For this curriculum: `https://golfergeek.github.io/ai-dev-curriculum/` *(after Pages is enabled on the upstream repo)*

---

## How the workflow works

```yaml
# Simplified — see .github/workflows/pages.yml for full file
on:
  push:
    branches: [main]
    paths: ['docs/**', 'mkdocs.yml', '.github/workflows/pages.yml']
jobs:
  build:
    - pip install mkdocs-material
    - mkdocs build          # output → site/
    - upload-pages-artifact
  deploy:
    - deploy-pages          # publishes to GitHub Pages
```

**Local preview** (optional):

```bash
pip install mkdocs-material
mkdocs serve
# open http://127.0.0.1:8000
```

Edit navigation in [`mkdocs.yml`](../../mkdocs.yml) — add new handbook pages under `nav:`.

---

## Custom domain (optional)

1. Settings → Pages → Custom domain → enter hostname
2. DNS: CNAME to `<user>.github.io` or A records per [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
3. Add `CNAME` file via Pages UI or commit to `docs/CNAME` if using MkDocs `extra` config

---

## Client copy checklist

When you fork this curriculum into your company repo:

- [ ] Update `site_name` and `site_url` in `mkdocs.yml`
- [ ] Replace placeholder owners in `docs/github/README.md`
- [ ] Add your adoption-kit copies under `docs/ai-program/`
- [ ] Enable Pages (Actions source)
- [ ] Link the URL in kit [02 — Instruction passport](../../marketing/adoption-kit/02-instruction-passport.md) (`AGENTS.md` + docs URL)

| Your published docs URL | |
|-------------------------|---|
| Owner who updates nav when phases change | |
