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
- When should we use a skill, specialized agent, MCP tool, or A2A service?
- Which protocols have we adopted, rejected, or placed on the watchlist?
- How do we publish and maintain skills and agents across tools?
- What changed recently, what is stale, and who owns the decision?

The answer should cite files in this directory, identify uncertainty or stale
evidence, and distinguish **current policy** from a **proposed change**.

## Program facets

| Facet | Decisions it owns | Start here |
|---|---|---|
| Harnesses and models | Approved interfaces, providers, routing, spend, portability | [harnesses-and-models](harnesses-and-models/README.md) |
| Coding governance | agent authority, review, Git, architecture, testing, release | [coding-governance](coding-governance/README.md) |
| Skills and agents | portfolio, functions, trust, publication, projections, lifecycle | [skills](skills/README.md) |
| Agent systems and protocols | MCP, A2A, identity, payments, observability, counterparties | [agent-systems](agent-systems/README.md) |
| Security and data | classification, secrets, tools, network, supply chain, incidents | [security-and-data](security-and-data/README.md) |
| Delivery and quality | artifact pipeline, gates, evidence, brownfield work, operations | [delivery-and-quality](delivery-and-quality/README.md) |
| Adoption and measurement | roles, training, outcomes, review cadence, exceptions | [adoption-and-measurement](adoption-and-measurement/README.md) |
| Guardrails | scheduled and automated enforcement patterns | [guardrails](guardrails/README.md) |
| Decisions | dated decision records and supersession history | [decisions](decisions/README.md) |
| Terrain watchlist | deferred candidates and dated re-evaluation | [watchlist](watchlist.md) |

Cross-cutting rules live in:

- [Program contract](PROGRAM-CONTRACT.md) — document schema, authority, and
  definition of ready.
- [Coverage matrix](COVERAGE-MATRIX.md) — the complete decision surface and
  required client artifacts.
- [How to ask the program](HOW-TO-ASK.md) — question patterns and answer
  requirements.
- [Query acceptance](QUERY-ACCEPTANCE.md) — scenarios that prove agents can
  retrieve, qualify, and safely update the program.
- [Change and freshness](CHANGE-AND-FRESHNESS.md) — assess, propose, review,
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
ask → retrieve current facet + decisions → answer with citations and freshness
    → identify gap or changed terrain → assess evidence
    → propose document and capability changes → human review
    → merge → regenerate projections → measure → scheduled review
```

Use the `ai-program-advisor` skill to query or assess the program. Use the
`ai-program-steward` agent to perform a cross-facet audit and prepare a
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

This program is ready when every facet:

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

## Relationship to canonical capabilities

Documents define what the organization believes and requires. Canonical
skills and agents in [`ai/`](../../ai/README.md) encode repeatable workflows.
Claude Code, Cursor, and Codex projections are generated from that source.
When policy changes, update the governing document first or in the same PR as
the capability; run `npm run ai:generate` and `npm run ai:check`.
