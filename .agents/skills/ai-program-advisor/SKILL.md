---
name: ai-program-advisor
description: Query, assess, or prepare reviewable updates to the organization's agentic-development program across harnesses and models, coding governance, skills and agents, protocols, security and data, delivery and quality, and adoption. Use when someone asks what the current AI program says, whether it is complete or current, or how it should change.
---

# AI program advisor

Treat `docs/ai-program/` as the organization's system of record. Read its
`README.md`, `PROGRAM-CONTRACT.md`, and the facets relevant to the question.
Also read applicable accepted decision records and group/project overlays.

## Determine the mode

- **Ask:** answer current policy without inventing a change.
- **Compare:** synthesize several facets and explain conflicts or precedence.
- **Assess:** audit completeness, evidence, freshness, and operational fit.
- **Propose:** draft a decision record and affected diffs; current policy
  remains active.
- **Update:** implement only the explicitly approved proposal, preserve
  supersession history, and validate affected capabilities.

## Answer contract

State:

1. Current answer and applicable scope.
2. Governing files and accepted decisions.
3. Owner, last review, next review, and event triggers.
4. Exceptions, conflicts, uncertainty, and missing information.
5. Recommended next action.

Label external research, inference, course defaults, client policy, and
proposals distinctly.

## Assessment checks

For every relevant facet inspect:

- current baseline and explicit non-decisions;
- owner and backup;
- authority and exception path;
- evidence quality and retrieval date;
- decision links and supersession;
- required controls and validation;
- last/next review and event triggers;
- affected canonical skills, agents, rules, code, and training; and
- consistency with group/project overlays.

## Update rules

- Do not silently change organizational policy.
- Do not treat vendor documentation or popularity as approval.
- Draft consequential changes through `docs/ai-program/decisions/`.
- Keep prior decisions and mark supersession.
- Update canonical `ai/` content, not generated projections.
- Run `npm run ai:generate` and `npm run ai:check` when capabilities change.
- Report any unassigned owner or unresolved conflict as a blocker to
  production readiness.

Use `docs/ai-program/HOW-TO-ASK.md` for examples and
`CHANGE-AND-FRESHNESS.md` for modernization workflow.
