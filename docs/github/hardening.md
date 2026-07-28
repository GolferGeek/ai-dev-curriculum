# GitHub repo hardening

*Protect `main`, secrets, and workflow files before you let agents push branches or open PRs.*

Pair with adoption kit [05 — Decision boundaries](../../marketing/adoption-kit/05-decision-boundaries.md) and [G1 — Nightly hygiene](../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md).

---

## Why harden first

Scheduled agents and `@claude` in Actions need **write** access to contents and pull requests. Without hardening, a mistaken auto-merge or direct push to `main` bypasses the closing bracket (`build · lint · test · verify · human review`).

**Order:** harden → enable Pages → enable Tier 1 cron → add API secret → enable Tier 2 agent PRs.

---

## Use rulesets (recommended over legacy branch rules)

GitHub **repository rulesets** centralize branch policy and support **Evaluate** mode (log what *would* block, without blocking yet).

Docs: [About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)

### Default-branch ruleset (start in Evaluate)

**Settings → Rules → Rulesets → New branch ruleset**

| Setting | Recommended |
|---------|-------------|
| **Name** | `Default branch protection` |
| **Enforcement** | **Evaluate** for 2 weeks, then **Active** |
| **Target** | Default branch (`main`) |
| **Require pull request** | On — minimum **1** approval |
| **Dismiss stale reviews** | On |
| **Require status checks** | On — add checks from [`ci.yml`](../../.github/workflows/ci.yml) after first green run |
| **Require branches up to date** | On (once CI is stable) |
| **Block force pushes** | On |
| **Restrict deletions** | On |
| **Bypass actors** | Named bots only — not “all admins” |

### Maintenance branches (`maintenance/*`)

Allow GitHub Actions to push hygiene branches **without** allowing push to `main`:

| Setting | Value |
|---------|-------|
| Target branches | `maintenance/**` |
| Allow push | GitHub Actions app / your bot app only |
| Require PR to merge into `main` | Yes (via default-branch ruleset) |

---

## Secrets and scanning

| Control | Where | Your choice |
|---------|-------|-------------|
| **Secret scanning** | Settings → Security → Secret scanning | ☐ On |
| **Push protection** | Same | ☐ Block commits with secrets |
| **`ANTHROPIC_API_KEY`** | Settings → Secrets → Actions | Repository secret only |
| **OAuth alternative** | `CLAUDE_CODE_OAUTH_TOKEN` | Pro/Max — see [setup guide](https://github.com/anthropics/claude-code-action/blob/main/docs/setup.md) |
| **No static keys (enterprise)** | Workload Identity Federation | [Anthropic WIF docs](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation) |

Rotate API keys quarterly. Set Anthropic billing alerts before Tier 2 cron.

---

## Protect workflow files

This repo includes [`.github/CODEOWNERS`](../../.github/CODEOWNERS) — require review when `.github/workflows/` changes.

| Path pattern | Why |
|--------------|-----|
| `.github/workflows/**` | Agent permissions and cron schedules |
| `.github/CODEOWNERS` | Who can approve workflow edits |
| `docs/github/**` | Client-visible guardrails handbook |

Add your team handle in CODEOWNERS and enable **Require review from Code Owners** on the default-branch ruleset.

---

## Actions permissions (repository)

**Settings → Actions → General**

| Setting | Recommended |
|---------|-------------|
| **Actions permissions** | Allow actions; restrict to verified creators if org policy requires |
| **Workflow permissions** | Read and write (Tier 2 needs contents + PRs) |
| **Fork PR workflows** | Require approval for first-time contributors |

Use **least privilege** on read-only jobs — see [`ci.yml`](../../.github/workflows/ci.yml) (`contents: read` only).

---

## Dependabot (supply chain)

Example: [`.github/dependabot.yml`](../../.github/dependabot.yml) in this repo bumps GitHub Actions weekly. Extend for `npm` when your monorepo is live.

---

## Hardening checklist (fill before Tier 2)

- [ ] Default-branch ruleset created (**Evaluate** → **Active**)
- [ ] Required status check: `verify` (or your CI job name) passing
- [ ] No auto-merge to `main` unless kit 05 documents an exception
- [ ] `ANTHROPIC_API_KEY` in Secrets — not in repo
- [ ] Claude GitHub App installed ([`github.com/apps/claude`](https://github.com/apps/claude)) or custom app with minimal permissions
- [ ] CODEOWNERS on `.github/workflows/`
- [ ] Secret scanning + push protection enabled
- [ ] Named owner for hygiene PR review

| Your org-specific rule | |
|------------------------|---|
