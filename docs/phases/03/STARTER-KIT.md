# Phase 03 starter kit

## The investigation brief

The Phase 03 equivalent of an app intention is an investigation brief:

- Repository and authorization boundary
- Business/system context
- Five to ten questions
- Three predictions
- Evidence standard
- Areas explicitly out of scope
- Deliverables

## Suggested team roles

| Role | Lens |
|---|---|
| System mapper | Architecture, entry points, data flow |
| Trust-boundary researcher | Auth, permissions, secrets, exposure |
| Quality researcher | Tests, coverage, architecture gates |
| Git historian | Churn, coupling, reversions, ownership, actual process |
| Memory editor | Reconciles findings and maintains the shared packet |

Small groups may combine roles. Everyone must understand the final synthesis.

## Artifact set

```text
docs/artifacts/phase-03/
  investigation-brief.md
  ingest-report.md
  map-report.md
  security-report.md
  git-story-report.md
  improve-report.md
  deep-dive-report.md
  memory-update.md
  promotion-candidate.md
  investigation-packet.md
```

Existing tools may use the shared `docs/artifacts/` directory. Keep filenames unambiguous if several groups share a repository.

## Memory update template

- What changed in our understanding?
- What evidence supports it?
- Is it observation, explanation, expectation, or enforcement?
- What previous statement did it confirm, qualify, or replace?
- What remains uncertain?
- What event should trigger revalidation?
- Who owns or can confirm it?

## Promotion candidate template

- Finding
- Evidence
- Scope
- Risk prevented
- False-positive or rigidity risk
- Proposed home: docs, skill, quality contract, test, CI, or merge rule
- Required owner/approval
- Revalidation plan

## Investigation packet

The packet is the capstone artifact: questions, predictions, system story, evidence, corrected AI claims, uncertainty, memory update, custom skill, guardrail proposal, safe first change, and next questions.
