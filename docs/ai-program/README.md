---
status: draft
owner: UNASSIGNED
backup-owner: UNASSIGNED
approved-by: UNASSIGNED
last-reviewed: 2026-08-06
next-review: 2026-09-06
applies-to: organization
evidence: []
supersedes: none
---

# AI program — the organization's agentic development memory

`docs/ai-program/` is the durable, agent-readable account of how an
organization develops software with AI. It is not a pile of course templates
and it is not vendor documentation. It records the organization's current
decisions, rationale, boundaries, evidence, owners, exceptions, and review
triggers.

An authorized developer should be able to ask an agent:

- Which coding harnesses and models may I use for this repository?
- What data may leave our environment?
- What may an agent change without asking?
- Which quality gates block a merge?
- Which approved requirement does this control implement, and what evidence
  proves it ran?
- When should we use a skill, specialized agent, MCP tool, or A2A service?
- Which protocols have we adopted, rejected, or placed on the watchlist?
- How do we publish and maintain skills and agents across tools?
- What changed recently, what is stale, and who owns the decision?

The answer should cite files in this directory, identify uncertainty or stale
evidence, and distinguish **current policy** from a **proposed change**.

## Program structure

The folder structure is the standard information hierarchy for humans, agents,
documentation sites, and the AI Governance & GRC application. Every folder has
a `README.md`; selecting a folder should show its purpose, company stance,
records, ownership, freshness, questions, and findings.

| Category | What it owns | Start here |
|---|---|---|
| Direction and governance | purpose, scope, authority, policy, decisions, oversight | [direction and governance](01-direction-and-governance/README.md) |
| Technology governance | harnesses, models, skills, agents, tools, protocols, architecture | [technology governance](02-technology-governance/README.md) |
| Risk management | tiers, data/security risk, authority, third parties, resilience, acceptance | [risk management](03-risk-management/README.md) |
| Compliance and obligations | authoritative sources, interpretation, requirements, coverage | [compliance and obligations](04-compliance-and-obligations/README.md) |
| Controls and assurance | controls, enforcement, evidence, testing, audits, remediation | [controls and assurance](05-controls-and-assurance/README.md) |
| Delivery and operations | workflow, quality, brownfield change, release, incidents, automation | [delivery and operations](06-delivery-and-operations/README.md) |
| Program evolution | terrain, decisions, freshness, recertification, capability lifecycle, culture, sentiment, adoption, outcomes | [program evolution](07-program-evolution/README.md) |
| Program intelligence | health, gaps, change, staleness, conflicts, recommendations, citations | [program intelligence](08-program-intelligence/README.md) |

Cross-cutting rules live in:

- [Program map](PROGRAM-MAP.md) — standard hierarchy, node contract, and the
  relationship between the repository and application.
- [Program contract](PROGRAM-CONTRACT.md) — document schema, authority, and
  definition of ready.
- [Program profiles](PROGRAM-PROFILES.md) — Full, Essential, and Light views
  over the same canonical record.
- [Coverage matrix](COVERAGE-MATRIX.md) — the complete decision surface and
  required client artifacts.
- [GRC operating map](GRC-OPERATING-MAP.md) — cross-category trace from an
  authoritative requirement through risk, control, evidence, ownership,
  exceptions, and freshness.
- [How to ask the program](08-program-intelligence/HOW-TO-ASK.md) — question patterns and answer
  requirements.
- [Query acceptance](08-program-intelligence/QUERY-ACCEPTANCE.md) — scenarios that prove agents can
  retrieve, qualify, and safely update the program.
- [Change and freshness](07-program-evolution/03-freshness-and-scheduled-review/README.md) — assess, propose, review,
  publish, and modernize.

## Memory and context

| | Memory | Context |
|---|---|---|
| Meaning | Durable record of what was decided and learned | What a harness loads for this task |
| Home | Git documents, decisions, evidence, canonical capabilities | `AGENTS.md`, relevant program files, code, active artifacts |
| Ownership | Organization | Current session |

Team truth is memory written and reviewed on purpose. Tool auto-memory may help
an individual, but it is never the organizational system of record.

Root `AGENTS.md` is the short passport that tells every agent to consult this
program. It should link here rather than copy policies that could drift.

## Operating loop

```text
ask → retrieve current nodes + decisions → answer with citations and freshness
    → identify gap or changed terrain → assess evidence
    → propose document and capability changes → human review
    → merge → regenerate projections → measure → scheduled review
```

Use the `ai-program-advisor` skill to query or assess the program. Use the
`ai-program-steward` agent to perform a cross-program audit and prepare a
reviewable modernization proposal. Neither may silently change policy.

## Scope

The same pattern works at three layers:

- **Organization:** this directory and root `AGENTS.md`.
- **Group/client:** `docs/groups/<name>/`, which may add stricter or
  domain-specific requirements.
- **Project:** `docs/projects/<name>/`, active artifacts, and app-level context.

Default precedence:

```text
law and contractual limits
  > organizational prohibitions
  > project requirements
  > group and personal preferences
```

Lower scopes may specialize policy but cannot silently weaken a higher-scope
boundary. Record approved exceptions with owner and expiration.

## Ready-to-operate standard

This program is ready when every category and required node:

- states the current baseline and explicit non-decisions;
- links its active decisions and evidence;
- names an accountable owner and backup;
- lists required controls and exception paths;
- includes questions an agent must answer;
- has a last-reviewed date, next review, and event triggers;
- separates normative policy from examples and time-sensitive terrain; and
- can be changed through a reviewable proposal with supersession history.

Blank owner fields are a deployment blocker, not harmless placeholders. During
the course, learners replace training defaults with the client's actual names,
systems, commands, and constraints.

Organizations may begin with a [Full, Essential, or Light
profile](PROGRAM-PROFILES.md). Profiles reduce presentation and initial
readiness scope; they do not weaken an applicable requirement, risk treatment,
accepted decision, or stricter overlay.

## Relationship to canonical capabilities

Documents define what the organization believes and requires. Canonical
skills and agents in [`ai/`](../../ai/README.md) encode repeatable workflows.
Claude Code, Cursor, and Codex projections are generated from that source.
When policy changes, update the governing document first or in the same PR as
the capability; run `npm run ai:generate` and `npm run ai:check`.
