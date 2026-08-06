# SMB AI Development Adoption Kit

These eleven worksheets are the guided intake and working-session tools for the
company's [AI Program take-home product](../ai-program-take-home-product.md).
They help a team adapt the standard `docs/ai-program/` hierarchy with real
company decisions, owners, sources, controls, evidence locations, and gaps.
They are not a second governance system or the complete take-home product.

The AI Program itself combines the folder-backed organizational record,
canonical `ai/` capabilities and generated harness projections, and the AI
Governance & GRC application used to browse and ask questions of the program.

You sketch the kit on Day 1 (talk D00-6 in [discussion-topics.md](../lesson-plans/discussion-topics.md)) and fill it in for real during the week close (D-CLOSE-1).

Leave the course with every template started — even a rough draft beats a blank page on Monday.

## The eleven pieces

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
| 11 | [GRC control map](11-grc-control-map.md) | How do applicable obligations and risk tiers become controls, evidence, exceptions, and reviewable decisions? | Day 5 GRC clinic; reinforced across Phases 01–03, 05–06 |

## Guardrails sheets (companion)

Separate from the eleven templates — **one sheet per guardrail pattern** (policy + GitHub wiring). Copy into `docs/ai-program/05-controls-and-assurance/02-enforcement-surfaces-and-guardrails/`.

| # | Sheet | Skill | Taught in |
|---|-------|-------|-----------|
| G1 | [Nightly hygiene — GitHub Actions + agents](guardrails/01-nightly-hygiene-github-actions.md) | `/nightly-hygiene` | Phase 02 |
| G2 | [Harness instruction layers](guardrails/02-harness-instruction-layers.md) | — | Phase 00 |

**Implementation handbook** (working workflows + Pages): [docs/github/README.md](../../docs/github/README.md)
**Harness map (Claude · Cursor · Codex):** [docs/guardrails/02-harness-instruction-layers.md](../../docs/guardrails/02-harness-instruction-layers.md)

Index: [guardrails/README.md](guardrails/README.md)

## How to use the kit

1. **During the course:** each template names the phase and discussion talk that teaches it. Fill in what you can while the material is fresh — the secondary-window activities in the discussion track map directly onto these files.
2. **Week close (Day 5):** work through D-CLOSE-1 and the GRC clinic, then fill in all **eleven** templates with *your* names, tools, paths, owners, sources, risk tiers, and follow-up dates.
3. **Back at work:** distribute the reviewed worksheet results into the canonical `docs/ai-program/` nodes ([program map](../../docs/ai-program/PROGRAM-MAP.md)) in a repository the team can see. Review changes like code—pull requests, not silent edits. Add canonical skills and specialized agents under `ai/`, then run `npm run ai:generate` to publish supported harness projections.
4. **On the recorded cadence and event triggers:** revisit pieces 1, 6, 8, and 11. Plans, models, laws, contracts, data classes, risks, and the watchlist can change; the other pieces still need an owner and review date.

## Ground rules baked into every template

- **Team truth lives in git**, not in one person's chat memory.
- **Every piece has one named owner.** Unowned policy is decoration.
- **Course defaults are not client policy.** Applicability, risk acceptance, and exceptions require the organization’s authorized owners.
- **Start small.** A ten-line filled-in template beats a ten-page aspirational one.
