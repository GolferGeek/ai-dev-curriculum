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

# Conflicts and control failures

This node detects contradictory scoped rules, decisions that disagree with
capabilities or enforcement, controls that failed or did not run, broken GRC
traces, and evidence that does not support the stated conclusion.

Each finding should identify both sides of the conflict or the expected and
observed control behavior, applicable precedence, scope, evidence, owner,
affected restriction, and resolution path.

The program agent does not average conflicting policy. It applies approved
precedence, uses the stricter safe boundary when required, and routes resolution
to authorized owners.
