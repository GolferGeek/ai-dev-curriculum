---
name: skill-publish
description: Publish an exact approved skill revision to a personal, project/team, or enterprise destination with provenance, validation, scope checks, and reviewable diffs. Use only after an authorized policy decision; require a PR for repository publication and never let a skill approve itself.
---

# Skill publish

Read `docs/ai-program/02-technology-governance/03-skills-and-specialized-agents/02-scope-and-precedence.md`, `07-provenance-and-versioning.md`, and `08-approval-and-publication.md`.

1. Resolve exact evaluated revision, approval, scope, owner, conditions, and expiration.
2. Refuse stale, ambiguous, rejected, expired, or self-approved input.
3. Determine the destination supported by the target tool; do not assume all tools share paths or precedence.
4. Preserve source, commit/hash, license, content hash, review, and local modifications.
5. Generate the complete destination diff and run skill validation and required tests.
6. For project/team publication, create a branch and PR; do not write directly to the protected branch.
7. For personal publication, request confirmation when policy permits direct copying.
8. Record installed revision, destination, publisher, commit/PR, and status.

Output: `docs/artifacts/skill-publication.md`.
