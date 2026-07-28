# Guardrails 01 — Nightly hygiene (GitHub Actions + agents)

*Scheduled repo health: scan, monitor, optional fix/harden, PR for human review. Taught in **Phase 02**.*

**Full implementation (workflows + research):** [docs/github/actions-and-agents.md](../../docs/github/actions-and-agents.md)  
**Policy worksheet (this file)** · **Skill:** `/nightly-hygiene`

---

## What you are building

| Piece | In this repo |
|-------|----------------|
| **Tier 1 workflow** | [`.github/workflows/nightly-hygiene-tier1.yml`](../../.github/workflows/nightly-hygiene-tier1.yml) |
| **Tier 2 workflow** | [`.github/workflows/nightly-hygiene-tier2.yml`](../../.github/workflows/nightly-hygiene-tier2.yml) — `anthropics/claude-code-action@v1` + `prompt: "/nightly-hygiene"` |
| **Repo hardening** | [docs/github/hardening.md](../../docs/github/hardening.md) |
| **Docs site (Pages)** | [docs/github/pages.md](../../docs/github/pages.md) + [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml) |

The **SaaS app** (Phase 01) is the product. **These workflows** maintain the repo that contains it.

---

## Decision boundaries (fill in before Tier 2)

| Scheduled job may (no approval) | Must stop and open PR only (human merges) | Human only |
|--------------------------------|-------------------------------------------|------------|
| Read repo; run build/lint/test | Apply fixes on **`maintenance/*`** branch | Merge to `main` |
| Write reports to `docs/artifacts/` | Open PR tagged `hygiene/nightly` | Deploy; DB migrations |
| Fix medium/low per your rules | | Delete files; add dependencies |

**Owner:** ___________________  
**Cadence:** ☐ nightly ☐ weekly (______ )  
**Apps in scope:** ☐ all `apps/` ☐ list: ___________________

See kit [05 — Decision boundaries](../05-decision-boundaries.md).

---

## Setup order

1. [Harden the repo](../../docs/github/hardening.md) — rulesets in **Evaluate**, then **Active**
2. Green [Tier 1](../../.github/workflows/nightly-hygiene-tier1.yml) for two weeks
3. Local `/nightly-hygiene` rehearsal → report in `docs/artifacts/nightly-hygiene-report.md`
4. Install [Claude GitHub App](https://github.com/apps/claude); add `ANTHROPIC_API_KEY` secret ([setup guide](https://github.com/anthropics/claude-code-action/blob/main/docs/setup.md))
5. Enable [Tier 2](../../.github/workflows/nightly-hygiene-tier2.yml) — start with **Run workflow**, then uncomment `schedule`

**Official action:** [`anthropics/claude-code-action@v1`](https://github.com/anthropics/claude-code-action) — skills in `.claude/skills/` are invoked with `prompt: "/skill-name"` after checkout ([docs](https://code.claude.com/docs/en/github-actions#using-skills)).

---

## Verification checklist

- [ ] Default-branch ruleset active; no auto-merge to `main`
- [ ] Tier 1 green (cron or manual)
- [ ] `/nightly-hygiene` succeeded locally
- [ ] Decision boundaries table filled
- [ ] PR template: [`.github/pull_request_template/hygiene.md`](../../.github/pull_request_template/hygiene.md)
- [ ] Named hygiene PR reviewer

---

## Owner

| Role | Name |
|------|------|
| Workflows + API spend | |
| Hygiene PR merge policy | |
| Secrets rotation | |
