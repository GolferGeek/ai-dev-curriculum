# Checklist 02 — GitHub Actions and skills

*Wire CI, optional Pages, and guardrail workflows so **committed skills** run on GitHub — not only in someone's terminal.*

**Prerequisite:** [01 — Your monorepo on GitHub](01-your-monorepo-on-github.md)

**Deep reference:** [GitHub guardrails handbook](../github/README.md)

---

## What “done” looks like

- GitHub Actions enabled; **CI green** on `main`
- `.claude/skills/` and `CLAUDE.md` committed — same rules local and in Actions
- Team can find docs (repo `docs/` or published Pages URL)
- Tier 1 nightly hygiene runs (or manual `workflow_dispatch` documented)
- Tier 2 / `@claude` **deferred** until `ANTHROPIC_API_KEY` + kit 05 boundaries (checkboxes below)

---

## Part A — Skills in the repo (local harness)

Skills are already in this curriculum at `.claude/skills/`. Confirm they work **before** automating.

| Step | Done |
|------|------|
| Open repo in **Claude Code**, **Cursor**, or approved harness | ☐ |
| Read [STARTER-KIT](../phases/00/STARTER-KIT.md) — Cursor mirrors files; Claude Code runs `/name` natively | ☐ |
| Run `/intention` on a sample or skip if Phase 00 complete | ☐ |
| Phase 02 path: `/scan-errors` then `/monitor` on one app | ☐ |
| Rehearse `/nightly-hygiene tier1` locally | ☐ |

**Rule:** If it is not in git under `.claude/skills/`, Actions cannot invoke it.

---

## Part B — Enable GitHub Actions

Repo **Settings → Actions → General**

| Setting | Recommended |
|---------|-------------|
| Actions allowed | Enabled |
| Workflow permissions | Read and write (Tier 2 later needs this) |

Workflows ship in `.github/workflows/`:

| File | Purpose |
|------|---------|
| [`ci.yml`](../../.github/workflows/ci.yml) | PR + push: verify, build, test |
| [`pages.yml`](../../.github/workflows/pages.yml) | MkDocs → GitHub Pages |
| [`nightly-hygiene-tier1.yml`](../../.github/workflows/nightly-hygiene-tier1.yml) | Scheduled mechanical hygiene |
| [`nightly-hygiene-tier2.yml`](../../.github/workflows/nightly-hygiene-tier2.yml) | Agent `/nightly-hygiene` (needs API key) |
| [`claude-assistant.yml`](../../.github/workflows/claude-assistant.yml) | `@claude` on PRs/issues (needs API key) |

- [ ] Push workflows to `main` (already present if you copied curriculum)
- [ ] **Actions** tab shows runs

---

## Part C — First green CI

1. Push a trivial commit or re-run workflow on `main`
2. Open **Actions** → **CI** → confirm jobs **`verify`** and **`build-test`** pass

- [ ] CI green on `main`
- [ ] Add **`verify`** (and optionally **`build-test`**) as **required status checks** on default branch — see [hardening](../github/hardening.md)

---

## Part D — GitHub Pages (recommended)

1. **Settings → Pages → Build and deployment → Source:** **GitHub Actions**
2. Merge/trigger [`pages.yml`](../../.github/workflows/pages.yml)
3. Note published URL (update `site_url` in `mkdocs.yml` if needed)

- [ ] Pages deploy succeeded
- [ ] Team handbook URL recorded in kit [02 — Instruction passport](../../marketing/adoption-kit/02-instruction-passport.md)

Details: [pages.md](../github/pages.md)

---

## Part E — Repo hardening (before agent write access)

Complete [hardening checklist](../github/hardening.md) — minimum before Tier 2:

- [ ] Default-branch **ruleset** (start in **Evaluate**, then **Active**)
- [ ] Require PR + 1 approval to merge to `main`
- [ ] No auto-merge to `main` unless kit 05 documents an exception
- [ ] Secret scanning + push protection on
- [ ] `.github/CODEOWNERS` updated with your team

---

## Part F — Tier 1 nightly hygiene (no API key)

1. **Actions** → **Nightly hygiene (Tier 1)** → **Run workflow** (dry run)
2. Confirm green; optionally wait for weekday cron

- [ ] Tier 1 `workflow_dispatch` green
- [ ] Owner named for failed-run notifications

---

## Part G — Tier 2 and `@claude` (when approved)

**Do not skip Part E.** Agent workflows need write permissions.

| Step | Done |
|------|------|
| Fill [G1 decision boundaries](../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md) | ☐ |
| Install [Claude GitHub App](https://github.com/apps/claude) or run `/install-github-app` in Claude Code | ☐ |
| Add repository secret **`ANTHROPIC_API_KEY`** ([setup guide](https://github.com/anthropics/claude-code-action/blob/main/docs/setup.md)) | ☐ |
| Local **`/nightly-hygiene`** full run → PR rehearsal | ☐ |
| **Actions** → Tier 2 → **Run workflow** manually | ☐ |
| Uncomment `schedule` in `nightly-hygiene-tier2.yml` after two weeks green Tier 1 | ☐ |

**How skills run in Actions:** checkout repo, then `anthropics/claude-code-action@v1` with `prompt: "/nightly-hygiene"`. Details: [actions-and-agents.md](../github/actions-and-agents.md)

---

## Part H — Adoption kit hooks

| Kit | Link to this checklist |
|-----|------------------------|
| [04 — Quality gates](../../marketing/adoption-kit/04-quality-gates.md) | CI commands match your stack |
| [05 — Decision boundaries](../../marketing/adoption-kit/05-decision-boundaries.md) | Bot may / must ask / human only |
| [G1 — Nightly hygiene](../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md) | Tier 1 / Tier 2 owners |

- [ ] Kit rows filled or scheduled for week close

---

## Verification summary

| Gate | Status |
|------|--------|
| CI on PRs | ☐ |
| Skills committed + tested locally | ☐ |
| Pages URL (optional) | ☐ |
| Hardening ruleset active | ☐ |
| Tier 1 hygiene | ☐ |
| Tier 2 + API key (optional) | ☐ |

---

## Sign-off

| Field | Value |
|-------|-------|
| CI required checks on `main` | |
| Pages URL | |
| Hygiene owner | |
| API spend owner | |
| Date completed | |

**Back to map →** [00 — High-level roadmap](00-high-level.md) · **Continue course →** [Phase 00](../phases/00/README.md)
