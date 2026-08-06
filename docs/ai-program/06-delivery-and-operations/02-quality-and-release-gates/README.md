---
status: draft
owner: UNASSIGNED
backup-owner: UNASSIGNED
approved-by: UNASSIGNED
last-reviewed: 2026-07-28
next-review: 2026-09-28
applies-to: organization
evidence: []
supersedes: none
---

# Delivery and quality

This node defines the evidence required to trust AI-assisted software changes.

## Work brackets

```text
opening bracket                         closing bracket
intention → requirements → plan → build → lint → test → verify → runtime
```

The middle may become faster; the brackets remain. Large products consist of
many appropriately sized, independently verified slices.

## Required evidence by risk

Every client should define tiers. The curriculum baseline is:

- **Low risk:** build/static checks, focused tests, diff review.
- **Normal product change:** unit/integration coverage, quality gates, browser
  or runtime verification, reviewed PR.
- **High risk:** threat model, independent review, realistic environment,
  rollback rehearsal, observability, explicit human approval.
- **Production incident or migration:** written runbook, backup/recovery,
  phased rollout, monitoring, and stop conditions.

## Brownfield rule

Research before change. Map entry points, data flow, history, owners, tests,
operations, and known hazards. Record verified findings in durable project
memory; keep hypotheses labeled.

## Operational quality

Define:

- required CI checks and ownership;
- flaky-test policy;
- release, migration, rollback, and feature-flag practice;
- health, logs, metrics, traces, alerts, and on-call handoff;
- accessibility, performance, resilience, and security thresholds;
- defect, rework, review-time, and escaped-issue measures; and
- when an autonomous monitor may repair versus only report.

## Ask this node

- What must be true before this change can merge or deploy?
- Which evidence is missing?
- Is this slice too large for reliable verification?
- What brownfield research is required first?
- How will we detect failure and roll back?
- Did the AI workflow reduce time without increasing rework or defects?

## Review triggers

Re-review on repeated gate failures, incidents, rising rework, flakiness,
architecture migration, new deployment autonomy, or evidence that existing
checks do not predict trusted outcomes.
