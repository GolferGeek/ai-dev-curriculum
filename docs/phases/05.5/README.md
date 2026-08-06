# Phase 05 Part B — Organizational capability registry

Phase 05 Part B evolves the working locator into a persistent control plane for
skills and specialized agents. Developers preserve Phase 05 behavior, migrate
catalog history into SurrealDB, model revision-bound policy, publish an
approved capability into canonical `ai/`, generate all three native harness
interpretations, and demonstrate re-review and retirement.

This is an extension of the Phase 05 product, not a second greenfield app.

## Learning outcomes

Developers learn to:

- change a working system through an idempotent data migration;
- distinguish registry state from Git-controlled executable instructions;
- model upstream, reviewed, approved, canonical, generated, installed, and
  locally modified revisions;
- separate evaluation, approval, publication, and installation authority;
- publish canonical skills and agents through review;
- generate Claude Code, Cursor, and Codex projections;
- maintain function groups and stable capability names; and
- detect upstream change, trigger re-review, supersede, revoke, and retire.

## Architecture

```text
external/internal sources
        ↓ scout
SurrealDB registry ── evaluations, policy, owners, use, outcomes
        ↓ approved publication request
Git PR to canonical ai/
        ↓ reviewed merge
generator → Claude Code | Cursor | Codex projections
        ↓
usage and upstream monitors → re-review / restrict / retire
```

SurrealDB records what the organization knows and believes. Git remains the
reviewable execution contract for project and organizational capabilities.
Neither replaces the other.

## Required demonstration

Show one capability moving through:

```text
discovered → evaluated → approved for project scope → canonical PR
→ generated projections → upstream changed → re-review required
→ superseded or retired
```

Keep the hashes visible. The demonstration must show that registry approval
did not bypass Git review and that a name alone does not inherit approval.

## Outputs

- Version-controlled idempotent schema and migration.
- Verified parity with the Phase 05 static snapshots.
- Registry UI for revisions, evaluations, policy, ownership, usage, and
  lifecycle.
- One canonical skill or agent publication PR.
- Three generated harness interpretations.
- Maintenance report with a stale, changed, or retirement case.
- Operating notes for ownership, cadence, exceptions, and recovery.

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
