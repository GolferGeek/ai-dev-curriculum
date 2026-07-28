# Guardrails — ai-program home

Copy sheets from [`marketing/adoption-kit/guardrails/`](../../marketing/adoption-kit/guardrails/README.md) into this folder. Pair each sheet with a skill under `.claude/skills/`.

| Sheet | File (after copy) | Skill |
|-------|-------------------|-------|
| **01 — Nightly hygiene** | `01-nightly-hygiene-github-actions.md` | `/nightly-hygiene` |

**Full GitHub implementation:** [docs/github/README.md](../github/README.md)  
**Harness map (Claude · Cursor · Codex):** [docs/guardrails/02-harness-instruction-layers.md](../guardrails/02-harness-instruction-layers.md)

**Start with:** harden repo → enable Pages → Tier 1 cron → `/nightly-hygiene` locally → Tier 2 with `anthropics/claude-code-action@v1`.

Related kit templates: [04 — Quality gates](../../marketing/adoption-kit/04-quality-gates.md), [05 — Decision boundaries](../../marketing/adoption-kit/05-decision-boundaries.md).
