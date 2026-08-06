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

# Skills and specialized agents program

Corporate memory and policy for reusable skills and specialized agents. Both
are behavioral dependencies: discover broadly, evaluate exact revisions,
publish deliberately, measure outcomes, and retire what no longer earns trust.

A skill packages a repeatable procedure and its supporting resources. A
specialized agent packages a delegated role, operating instructions, tools,
and authority boundaries. They share governance but are not interchangeable.

## Program flow

```text
Scout → triage → inspect → sandbox → approve/modify/reject
      → publish at a scope → monitor → refresh/re-review/retire
```

## Handbook

1. [Portfolio and taxonomy](01-portfolio-and-taxonomy.md)
2. [Scope and precedence](02-scope-and-precedence.md)
3. [Scouting and discovery](03-scouting-and-discovery.md)
4. [Evaluation and trust](04-evaluation-and-trust.md)
5. [Security and permissions](05-security-and-permissions.md)
6. [Triggers, tests, and context](06-triggers-tests-and-context.md)
7. [Provenance and versioning](07-provenance-and-versioning.md)
8. [Approval and publication](08-approval-and-publication.md)
9. [Ownership and lifecycle](09-ownership-and-lifecycle.md)
10. [Outcomes and review](10-outcomes-and-review.md)
11. [Functional organization](11-functional-organization.md)
12. [Agent portability](12-agent-portability.md)

Operational capabilities: `skill-scout`, `skill-evaluate`, `skill-publish`,
`skill-maintain`, and `ai-program-advisor`.

## Roles

| Role | Accountability |
|---|---|
| Scout | Finds skill and agent candidates; cannot approve or install |
| Evaluator | Produces evidence and recommendation |
| Policy owner | Approves scope and exceptions |
| Publisher | Publishes exact approved revision |
| Maintainer | Owns updates, outcomes, and retirement |

Discovery may be automatic. Approval and publication follow policy.

Canonical source lives in [`ai/`](../../../../ai/README.md), organized by
function. Claude Code, Cursor, and Codex files are generated projections.
