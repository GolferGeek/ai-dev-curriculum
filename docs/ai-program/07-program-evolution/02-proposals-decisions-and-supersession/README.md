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

# AI program decision records

Decision records preserve why the program changed. Do not rewrite an old
decision to make history look clean; create a new record and mark the old one
superseded.

## Filename

```text
YYYY-MM-DD-short-decision-name.md
```

## Required sections

```markdown
# Decision title

status: proposed | accepted | restricted | superseded | retired
owner:
approved-by:
date:
review-date:
applies-to:
supersedes:

## Context and trigger
## Current state
## Decision
## Options considered
## Evidence and uncertainty
## Security, data, cost, and operational impact
## Migration and rollback
## Affected documents, capabilities, and systems
## Validation and outcome measures
## Review triggers
```

## Agent behavior

Agents may draft records and affected diffs. Only the organization's authorized
review process may move a record from proposed to accepted. Answers should cite
accepted decisions and identify relevant proposals separately.
