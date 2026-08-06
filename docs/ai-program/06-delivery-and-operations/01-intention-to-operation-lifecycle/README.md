---
status: draft
owner: UNASSIGNED
backup-owner: UNASSIGNED
approved-by: UNASSIGNED
last-reviewed: 2026-07-28
next-review: 2026-10-28
applies-to: organization
evidence: []
supersedes: none
---

# Coding governance

This node defines how agents participate in software change from intention
through operation.

## Curriculum baseline

```text
intention → PRD → plan → implementation
→ build → lint → test → verify → browser/runtime evidence
→ reviewed commit/PR → deploy/operate
```

- Scope and acceptance criteria exist before significant generation.
- Agents investigate unfamiliar code before changing it.
- The developer remains accountable for correctness and consequences.
- Generated code follows the same architecture, security, review, and release
  requirements as human-written code.
- Consequential changes use Git review; chat output is not a release artifact.
- One agent should not author, approve, and deploy a high-risk change without
  independent evidence and the organization's required human authority.

## Decision boundaries

Define:

- paths agents may read and write;
- commands and tools they may run;
- when they must ask;
- human-only actions;
- production, data, credential, billing, and external-message authority;
- review requirements by risk tier;
- permitted autonomous loops and their stop conditions; and
- rollback and incident escalation.

## Required engineering policy

Link or state:

- supported languages, frameworks, versions, and architecture boundaries;
- dependency and license policy;
- secret handling and environment separation;
- test layers and coverage expectations;
- static analysis, security scanning, and accessibility;
- commit, branch, PR, reviewer, and protected-branch rules;
- CI/CD gates, deployment, rollback, and observability; and
- generated-code attribution or disclosure requirements.

## Ask this node

- May the agent make this change without another approval?
- Which artifacts must exist before implementation?
- Which commands and paths are allowed?
- What evidence blocks or permits merge?
- Can an agent repair a failing test, change architecture, or deploy?
- What is the safe brownfield workflow?

## Review triggers

Re-review after incidents, recurring escaped defects, architecture changes,
new autonomous capabilities, quality-gate bypass, audit findings, or material
changes to repository tooling.
