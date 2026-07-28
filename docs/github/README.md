# GitHub guardrails handbook

*Client-facing guide: harden the repo, publish documentation on **GitHub Pages**, and run **scheduled agent hygiene** through **GitHub Actions** using our skills.*

This repo ships **working examples** under [`.github/workflows/`](../../.github/workflows/). Copy the pattern into your team repo; fill policy tables in the [adoption kit](../../marketing/adoption-kit/guardrails/README.md).

| Section | What you get |
|---------|----------------|
| [Repo hardening](hardening.md) | Rulesets, branch protection, secrets, CODEOWNERS |
| [GitHub Pages](pages.md) | Publish this `docs/` tree as a team handbook |
| [Actions + agents](actions-and-agents.md) | Tier 1 cron, Tier 2 `/nightly-hygiene` via official Claude Code Action |

**Official references *(refresh before each cohort)*:**

- [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions) — setup, skills in workflows, cron automation
- [`anthropics/claude-code-action`](https://github.com/anthropics/claude-code-action) — GA action `@v1`, solutions guide, security
- [GitHub repository rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [GitHub Pages with Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

---

## Three layers (do in order)

```text
1. Hardening     → humans cannot bypass gates; bots cannot merge silently
2. Pages         → team sees policy + phases in one URL
3. Actions       → Tier 1 mechanical cron, then Tier 2 agent PRs
```

| Layer | Workflow file in this repo | Secret required? |
|-------|----------------------------|------------------|
| CI on every PR | [`ci.yml`](../../.github/workflows/ci.yml) | No |
| Docs site | [`pages.yml`](../../.github/workflows/pages.yml) | No (enable Pages in repo Settings once) |
| Tier 1 hygiene | [`nightly-hygiene-tier1.yml`](../../.github/workflows/nightly-hygiene-tier1.yml) | No |
| Tier 2 agent hygiene | [`nightly-hygiene-tier2.yml`](../../.github/workflows/nightly-hygiene-tier2.yml) | Yes — `ANTHROPIC_API_KEY` |
| Interactive `@claude` | [`claude-assistant.yml`](../../.github/workflows/claude-assistant.yml) | Yes — `ANTHROPIC_API_KEY` + [Claude GitHub App](https://github.com/apps/claude) |

---

## Quick setup (repository admin)

0. New team? [Checklists](../checklists/README.md) — **01** your repo, **02** Actions + skills
1. **Harden** — follow [hardening checklist](hardening.md); start rulesets in **Evaluate** mode
2. **Pages** — Settings → Pages → Source: **GitHub Actions**; push to `main` triggers [`pages.yml`](../../.github/workflows/pages.yml)
3. **Tier 1** — merge [`nightly-hygiene-tier1.yml`](../../.github/workflows/nightly-hygiene-tier1.yml); confirm green cron or `workflow_dispatch`
4. **Claude App + API key** — run `/install-github-app` in Claude Code *or* [manual setup](https://github.com/anthropics/claude-code-action/blob/main/docs/setup.md); add `ANTHROPIC_API_KEY` secret
5. **Tier 2** — fill [decision boundaries](../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md); rehearse `/nightly-hygiene` locally; enable [`nightly-hygiene-tier2.yml`](../../.github/workflows/nightly-hygiene-tier2.yml)

---

## Policy lines (non-negotiable defaults)

- **No silent fixes on `main`.** Bot changes arrive as PRs; humans merge.
- **Tier 1 before Tier 2.** Prove cron + commands before spending API tokens.
- **Skills live in git.** Actions checkout the repo so `.claude/skills/` load in CI — same rules as your laptop.
- **Secrets in GitHub Secrets only** — never in YAML, prompts, or chat logs.

---

## Owners (fill in)

| Role | Name |
|------|------|
| Repo hardening / rulesets | |
| Pages + docs nav | |
| Actions workflows + API spend | |
| Hygiene PR reviewer | |
