# SMB AI Development Adoption Kit

This is the **document half** of your [monorepo operating model](../../docs/MONOREPO-OPERATING-MODEL.md): **ten** fill-in templates — policy, memory/context map, and **leadership + organizational AI engagement** — in **git**. The **skill half** lives in `.claude/`.

You sketch the kit on Day 1 (talk D00-6 in [discussion-topics.md](../lesson-plans/discussion-topics.md)) and fill it in for real during the week close (D-CLOSE-1).

Leave the course with every template started — even a rough draft beats a blank page on Monday.

## The ten pieces

| # | Template | Question it answers | Taught in |
|---|----------|--------------------|-----------|
| 1 | [Harness & plan tier](01-harness-and-plan.md) | Which AI tool and subscription does the company approve? | Phase 00 |
| 2 | [Instruction passport](02-instruction-passport.md) | Where does shared team knowledge for agents live? | Phase 00, 05 |
| 3 | [Artifact pipeline](03-artifact-pipeline.md) | Where do intentions, PRDs, and plans go, and who reviews them? | Phase 00 |
| 4 | [Quality gates](04-quality-gates.md) | What must pass before AI-assisted work ships? | Phase 02 |
| 5 | [Decision boundaries](05-decision-boundaries.md) | What may agents do alone, with approval, or never? | Phase 01, 04 |
| 6 | [Routing & spend](06-routing-and-spend.md) | Which model for which job, and who watches the bill? | Phase 06 |
| 7 | [Day-2 safety](07-day2-safety.md) | What are the rules for agents on the real codebase? | Phase 03 |
| 8 | [Terrain review & ADAPT](08-terrain-review.md) | How do we decide what new AI tools/patterns to adopt? | Phase 00 |
| 9 | [Memory, context & scope map](09-memory-context-map.md) | Where do corporate, group, and project memory/context live? | Phase 00, week close |
| 10 | [Leadership & org engagement](10-leadership-and-org-engagement.md) | How do leadership and the dev group build personnel engagement and maintain source of truth? | Phase 00, week close |

## Guardrails sheets (companion)

Separate from the ten templates — **one sheet per guardrail pattern** (policy + GitHub wiring). Copy into `docs/ai-program/guardrails/`.

| # | Sheet | Skill | Taught in |
|---|-------|-------|-----------|
| G1 | [Nightly hygiene — GitHub Actions + agents](guardrails/01-nightly-hygiene-github-actions.md) | `/nightly-hygiene` | Phase 02 |
| G2 | [Harness instruction layers](guardrails/02-harness-instruction-layers.md) | — | Phase 00 |

**Implementation handbook** (working workflows + Pages): [docs/github/README.md](../../docs/github/README.md)
**Harness map (Claude · Cursor · Codex):** [docs/guardrails/02-harness-instruction-layers.md](../../docs/guardrails/02-harness-instruction-layers.md)

Index: [guardrails/README.md](guardrails/README.md)

## How to use the kit

1. **During the course:** each template names the phase and discussion talk that teaches it. Fill in what you can while the material is fresh — the secondary-window activities in the discussion track map directly onto these files.
2. **Week close (Day 5):** work through D-CLOSE-1 and fill in all **ten** templates with *your* names, tools, paths, and owners.
3. **Back at work:** commit the finished kit to `docs/ai-program/` ([README](../../docs/ai-program/README.md)) in a repo your team can see. Review changes like code — pull requests, not silent edits. Add `.claude/skills/` as you codify workflows with `/author-agent`.
4. **Quarterly:** revisit pieces 1, 6, and 8 — plans, models, and the watchlist rotate fast. Everything else compounds.

## Ground rules baked into every template

- **Team truth lives in git**, not in one person's chat memory.
- **Every piece has one named owner.** Unowned policy is decoration.
- **Start small.** A ten-line filled-in template beats a ten-page aspirational one.
