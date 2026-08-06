# Phase 05 — Capability scouting and governance

*Last verified: July 2026*

Phase 05 turns public and internal AI helpers into inspectable organizational
dependencies. Developers extend the Skills Browser into a capability locator
that discovers both **skills** and **specialized agents**, preserves exact
source revisions, compares recurring scouting runs, and records evidence-based
recommendations without silently installing anything.

The product is a locator, not an installer. Discovery may be broad; trust must
be earned.

## Learning outcomes

By the end of the module, a developer can:

- distinguish a skill, agent, rule, tool/MCP integration, memory document, and
  ordinary code;
- explain why canonical capabilities are grouped by function while harness
  projections may be flat;
- inspect provenance, revision, bundled files, scripts, permissions,
  dependencies, trigger behavior, context cost, and maintenance signals;
- run trigger, collision, safety, and outcome tests in a sandbox;
- recommend personal, project/team, or organizational scope;
- reject a popular candidate when its evidence does not justify adoption; and
- define the owner and event that will cause re-review.

## Product build

Build `apps/skills-browser/` as a refreshable capability locator:

```text
configured sources → immutable snapshot → parser/normalizer → catalog diff
                   → search/matrix/detail → evaluation record
```

The catalog must support complete skill folders and agent definitions. It may
read native Claude Code, Cursor, and Codex layouts, but it normalizes them into
one product model without pretending their formats are identical.

Required product surfaces:

- a source and scouting-run dashboard;
- a searchable capability catalog;
- a matrix for function, kind, maturity, risk, scope, harness, and trust;
- a full-file preview that exposes scripts and supporting resources;
- revision comparison;
- an evaluation worksheet and decision history; and
- clear labels for discovered, evaluated, rejected, restricted, and candidate
  states.

Phase 05 Part A does not publish to the canonical `ai/` library. Part B adds the
persistent registry, controlled publication, projections, and lifecycle work.

## Lab outputs

Each learner or pair leaves with:

1. A repeatable refresh from at least three configured sources.
2. A diff showing added, changed, removed, or parse-failed capabilities.
3. Three completed evaluations:
   - one skill;
   - one specialized agent;
   - one deliberately rejected or restricted candidate.
4. One sandboxed candidate with trigger and collision evidence.
5. A recommended function group and adoption scope.
6. An owner, review date, and event-driven re-review trigger.
7. A short explanation of what remains tool-neutral and what requires a
   harness-specific projection.

## Instructor sequence

Before the lab, teach the vocabulary and threat model. During the build, stop
at the source, normalization, and evaluation boundaries. After the build,
conduct a review board where learners defend one adoption and one rejection.
Use [TEACHING.md](TEACHING.md) for the facilitation script and
[RUN-ORDER.md](RUN-ORDER.md) for the learner sequence.

## Canonical program foundation

Read [the capability program](../../ai-program/02-technology-governance/03-skills-and-specialized-agents/README.md) and inspect
[`ai/`](../../../ai/README.md). The canonical library is organized into seven
functional groups. Generation creates compatible Claude Code, Cursor, and
Codex projections; the catalog treats those outputs as derivatives, not
independent sources of truth.

## Completion standard

The module passes only when learners can explain **why** a candidate was
trusted, restricted, or rejected at an exact revision. A visually impressive
catalog with no provenance, no full-file inspection, or no reasoned rejection
does not pass.

## Documents

- [Overview](OVERVIEW.md)
- [Prerequisites](PREREQUISITES.md)
- [Commands](COMMANDS.md)
- [Starter kit](STARTER-KIT.md)
- [Run order](RUN-ORDER.md)
- [Talking points](TALKING-POINTS.md)
- [Instructor teaching guide](TEACHING.md)
- [Demo-grade bar](DEMO-GRADE-BAR.md)
- [Verification](VERIFY.md)
