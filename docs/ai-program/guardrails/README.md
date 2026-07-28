# Guardrails — ai-program home

Copy sheets from [`marketing/adoption-kit/guardrails/`](../../../marketing/adoption-kit/guardrails/README.md) into this folder. Pair each sheet with its canonical capability under `ai/`; generated projections support each approved harness.

| Sheet | File (after copy) | Skill |
|-------|-------------------|-------|
| **01 — Nightly hygiene** | `01-nightly-hygiene-github-actions.md` | `/nightly-hygiene` |

**Full GitHub implementation:** [docs/github/README.md](../../github/README.md)
**Harness map (Claude · Cursor · Codex):** [docs/guardrails/02-harness-instruction-layers.md](../../guardrails/02-harness-instruction-layers.md)

**Start with:** harden repo → enable Pages → Tier 1 cron → `/nightly-hygiene` locally → Tier 2 with `anthropics/claude-code-action@v1`.

Related kit templates: [04 — Quality gates](../../../marketing/adoption-kit/04-quality-gates.md), [05 — Decision boundaries](../../../marketing/adoption-kit/05-decision-boundaries.md).

## Ask this facet

- Which guardrails are policy, automated controls, or personal preferences?
- Which committed instructions and generated capabilities does each harness load?
- May an automated agent write, create a branch, open a PR, approve, or merge?
- Which identity, token scope, protected branch, and human review are required?
- How do we prove a scheduled guardrail ran and handled failure safely?

Answers must also consult coding governance, security/data, and active decision
records. A copied worksheet is not active policy until it has an owner,
approval, scope, and review date under the program contract.
