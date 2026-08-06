# Guardrails sheets

Companion to the [eleven adoption-kit templates](../README.md) and canonical `ai/`
library. Each sheet is one guardrail pattern your team copies into
`docs/ai-program/05-controls-and-assurance/02-enforcement-surfaces-and-guardrails/` and wires into its approved harness projections.

**Document half** — fill-in policy + copy-paste examples (this folder).  
**Capability half** — canonical skill or agent under `ai/` that implements the
same pattern locally before you automate it.

| # | Sheet | Skill | Taught in |
|---|-------|-------|-----------|
| 1 | [01 — Nightly hygiene (GitHub Actions + agents)](01-nightly-hygiene-github-actions.md) | `/nightly-hygiene` | Phase 02 |
| 2 | [02 — Harness instruction layers](02-harness-instruction-layers.md) | — (passport + D00-2) | Phase 00 |
| — | **[GitHub handbook](../../../docs/github/README.md)** (Pages, hardening, Actions) | — | Phase 02 |
| — | **[Harness map (full)](../../../docs/guardrails/02-harness-instruction-layers.md)** | — | Phase 00 |

Index: [guardrails/README.md](README.md) · Implementation: [`docs/github/`](../../../docs/github/)

**Ground rules**

- Scheduled jobs **open PRs**; humans **merge**. No auto-merge to `main` without an explicit org decision (kit [05](../05-decision-boundaries.md)).
- Tier 1 (build · lint · test only) ships before Tier 2 (agent fix · harden · PR).
- Every workflow file gets a named owner in [04 — Quality gates](../04-quality-gates.md).
