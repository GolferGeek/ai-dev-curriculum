# Functional organization

Organize the canonical portfolio by the work the organization performs, not by
vendor or current tool path.

The curriculum baseline uses:

1. Foundation and planning.
2. Application delivery.
3. Quality and release.
4. Research and understanding.
5. Protocols and agent systems.
6. Skill and agent governance.
7. Model and tool evaluation.

Clients may rename or extend groups, but each group must have a clear purpose
and owner. A capability belongs in exactly one primary group; tags may express
secondary relationships.

## Placement test

Before adding a capability, answer:

- What recurring organizational job does it perform?
- Why is a skill or agent the right mechanism?
- Which existing capability overlaps?
- Which group owns its behavior and maintenance?
- Which other capabilities does it require?
- What would happen if it disappeared?

Stable capability names are global across groups because native harnesses may
flatten the directory structure. Moving a capability between groups should not
break generated references, but it remains a reviewable ownership change.

`ai/functions.json` is the machine-readable membership manifest.
`npm run ai:check` fails on missing or duplicate membership.

## Portfolio review

Quarterly, inspect each group for gaps, duplicates, excessive context,
conflicting triggers, ownerless entries, unsupported formats, and capabilities
that should become deterministic code or ordinary documentation.
