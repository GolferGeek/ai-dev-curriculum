# Phase 05.5 — Talking points

## Product evolution

- Adding persistence is not a rewrite license. Preserve working behavior,
  migrate evidence, and prove parity before adding governance.
- Idempotent schema and migration commands make recovery and deployment
  repeatable.
- A database can centralize state; it cannot replace reviewable executable
  instructions in Git.

## Control plane and execution contract

- The registry is the **control plane**: sources, revisions, evaluations,
  policy, ownership, use, and outcomes.
- Canonical `ai/` is the **execution contract**: reviewed instructions the
  organization is prepared to run.
- Generated harness files are deployment artifacts for Claude Code, Cursor,
  and Codex.
- Publication is a proposal through Git review, not a database flag that
  silently changes agent behavior.

## Revision and authority

- Discovered, reviewed, approved, canonical, generated, installed, and locally
  modified revisions may all differ.
- Approval binds exact content to a scope, restrictions, reviewer, and date.
- Evaluation, approval, publication, installation, and revocation are separate
  actions and may require different people.
- RBAC must prevent self-approval and protected-branch bypass.

## Functional organization

- Function groups describe why a capability exists and who is likely to own
  it.
- Stable names protect references across generated projections.
- Moving a capability between functions is an organizational change worth
  reviewing, even if its instructions do not change.
- New capabilities should fill a demonstrated portfolio gap rather than
  duplicate an existing item.

## Lifecycle

- Maintenance watches upstream drift, tool-format drift, security findings,
  outcome degradation, owner changes, and unused capabilities.
- Re-review is an expected state, not a failure.
- Retirement requires deprecation notice, replacement or removal plan,
  installation/use inventory, and auditable completion.

## The sentence to remember

> The registry tells us what we trust; Git shows exactly what we run; the
> generator makes it usable across tools.
