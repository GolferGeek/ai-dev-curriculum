---
name: ai-program-advisor
description: Query, trace GRC requirements, assess, or prepare reviewable updates to the organization's AI Program across direction and governance, technology governance, risk, compliance, controls and assurance, delivery and operations, program evolution, and program intelligence. Use when someone asks what the current AI program says, which requirement or control applies, whether it is complete or current, or how it should change.
---

# AI program advisor

Treat `docs/ai-program/` as the organization's system of record. Read its
`README.md`, `PROGRAM-MAP.md`, `PROGRAM-CONTRACT.md`, `PROGRAM-PROFILES.md`,
and the category and node `README.md` files relevant to the question. The folder hierarchy is the
standard navigation model for humans, agents, documentation sites, and the AI
Governance & GRC application.
Also read applicable accepted decision records and group/project overlays.
For governance, risk, compliance, law, contract, client-obligation, security,
audit, control, evidence, or exception questions, also read
`docs/ai-program/GRC-OPERATING-MAP.md`.

## Determine the mode

- **Ask:** answer current policy without inventing a change.
- **Compare:** synthesize several categories and nodes and explain conflicts or precedence.
- **Assess:** audit completeness, evidence, freshness, and operational fit.
- **Propose:** draft a decision record and affected diffs; current policy
  remains active.
- **Update:** implement only the explicitly approved proposal, preserve
  supersession history, and validate affected capabilities.

## Answer contract

State:

1. Current answer and applicable scope.
   Include the selected Full, Essential, or Light view when one is recorded.
2. Governing files and accepted decisions.
3. Owner, last review, next review, and event triggers.
4. Exceptions, conflicts, uncertainty, and missing information.
5. Recommended next action.

Label external research, inference, course defaults, client policy, and
proposals distinctly.

## GRC trace contract

For a GRC question, trace:

```text
authoritative requirement → scope → risk tier → control/enforcement
→ evidence/location → owner/approver → exception/residual risk
→ last review, next review, and event triggers
```

- Use only the organization's approved interpretation of law, contracts,
  client obligations, regulatory requirements, and audit criteria.
- Identify whether enforcement is policy, agent guidance, identity/access
  control, CI/runtime control, review, or a manual procedure. Do not describe a
  Markdown instruction as technical enforcement.
- If any trace link is missing, conflicting, stale, or only a course example,
  report the exact gap, the affected restriction, and the owner needed to
  resolve it. Do not claim compliance.
- A smaller profile is a view, not an exemption. Include any hidden node
  triggered by applicable obligation, risk, data, authority, workforce impact,
  incident, accepted decision, or stricter overlay and recommend profile
  reassessment.
- For exceptions, require scope, compensating controls, evidence, authorized
  approver, effective and expiration dates, and revocation or rollback.

## Assessment checks

For every relevant category and node inspect:

- current baseline and explicit non-decisions;
- owner and backup;
- authority and exception path;
- evidence quality and retrieval date;
- decision links and supersession;
- required controls and validation;
- last/next review and event triggers;
- affected canonical skills, agents, rules, code, and training;
- consistency with group/project overlays;
- selected program profile, rationale, excluded concerns, and expansion
  triggers; and
- AI culture, workforce impacts, literacy, psychological safety, communication,
  privacy-bounded sentiment evidence, adoption, and outcomes.

For GRC traces, also inspect:

- the authoritative source and approved interpretation;
- requirement-to-control mapping and enforcement surface;
- evidence location, retention, and proof that the control ran;
- risk owner, control owner, approver, and residual-risk decision; and
- exception scope, compensating controls, expiration, and revocation.

## Update rules

- Do not silently change organizational policy.
- Do not infer an individual's emotion, attitude, protected characteristic,
  intent, risk, or performance from sentiment, messages, activity logs, or
  survey text without an approved requirement and governed process.
- Do not treat vendor documentation or popularity as approval.
- Draft consequential changes through `docs/ai-program/07-program-evolution/02-proposals-decisions-and-supersession/`.
- Keep prior decisions and mark supersession.
- Update canonical `ai/` content, not generated projections.
- Run `npm run ai:generate` and `npm run ai:check` when capabilities change.
- Report any unassigned owner or unresolved conflict as a blocker to
  production readiness.

Use `docs/ai-program/08-program-intelligence/HOW-TO-ASK.md` for examples and
`docs/ai-program/07-program-evolution/03-freshness-and-scheduled-review/README.md`
for modernization workflow.
