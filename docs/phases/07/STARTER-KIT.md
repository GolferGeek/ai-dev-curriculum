# Starter kit — Phase 07

## Canonical inputs

- [`docs/ai-program/README.md`](../../ai-program/README.md) — program index and
  scope model.
- [`PROGRAM-MAP.md`](../../ai-program/PROGRAM-MAP.md) — eight-category graph
  and folder-node contract.
- [`PROGRAM-CONTRACT.md`](../../ai-program/PROGRAM-CONTRACT.md) — authority
  metadata and answer contract.
- [`PROGRAM-PROFILES.md`](../../ai-program/PROGRAM-PROFILES.md) — Full,
  Essential, and Light view/readiness definitions.
- [`GRC-OPERATING-MAP.md`](../../ai-program/GRC-OPERATING-MAP.md) —
  requirement-to-control trace.
- [`COVERAGE-MATRIX.md`](../../ai-program/COVERAGE-MATRIX.md) — client artifact
  and decision coverage.
- [`marketing/adoption-kit/`](../../../marketing/adoption-kit/README.md) —
  guided discovery worksheets, not a competing program.

## Reference product

The completed application at
[`completed/apps/ai-program/`](../../../completed/apps/ai-program/README.md)
includes:

- folder-derived navigation and Markdown rendering;
- authority and freshness metadata;
- eight-category deterministic readiness;
- persistent Full, Essential, and Light filtering across navigation, findings,
  and advisor retrieval;
- AI-culture and privacy-bounded sentiment guidance and answers;
- exact findings for missing metadata, owners, approvals, evidence, review, and
  relative references;
- a credential-free bounded advisor;
- a requirement-to-control demonstration trace; and
- non-mutating proposal preparation.

## Node contract

Every folder must contain a `README.md` with at least:

```yaml
---
status: draft
owner: UNASSIGNED
backup-owner: UNASSIGNED
approved-by: UNASSIGNED
last-reviewed: YYYY-MM-DD
next-review: YYYY-MM-DD
applies-to: organization
evidence: []
supersedes: none
---
```

The body states purpose, current stance, records/evidence, boundaries,
questions the program must answer, gaps, and review triggers. Replace
placeholders only with authorized organizational information.

## Required trace fields

```text
requirement + source → scope → risk and rationale → control
→ enforcement → evidence → owner/approver → exception → freshness
```

Each link is an addressable record or durable external-system pointer. A
Markdown rule is not technical enforcement, and a test result proves only the
behavior it exercised.

## Proposal contract

A proposal includes trigger, governing source, scope, rationale, exact change,
affected capabilities, validation, evidence, migration, rollback, stop
conditions, owner, approver, review date, and supersession. Its status remains
`proposed` until the authorized process accepts it.
