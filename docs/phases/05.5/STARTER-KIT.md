# Starter kit — Phase 05 Part B

## Core records

- `capability`
- `capability_revision`
- `source`
- `source_snapshot`
- `capability_file`
- `projection`
- `evaluation`
- `policy_decision`
- `publication_request`
- `installation_or_use`
- `outcome_review`
- `organization`, `team`, `project`, and `user`
- `functional_group`, `tag`, `permission`, and `dependency`

The schema may use different names, but it must preserve these concepts.

## Revision model

Keep these values independently visible:

```text
upstream revision
reviewed revision
approved revision and scope
canonical Git revision
generated projection revision
installed/used revision
local modification revision
```

Never infer that equality of names means equality of content or trust.

## Migration contract

The migration must:

1. Read the Phase 05 static snapshots without mutating them.
2. Upsert stable identities and immutable revisions.
3. Preserve source, time, file hashes, parse failures, and evaluations.
4. Produce a reconciliation report.
5. Return the same result when run twice.
6. fail visibly on conflicting data rather than silently choosing a winner.

## Publication package

A publication request contains:

- exact evaluated revision;
- capability kind and stable name;
- functional group;
- canonical content and resources;
- policy decision, scope, and restrictions;
- owner and review triggers;
- projection impact preview; and
- test evidence.

The publisher writes canonical `ai/` content and function membership, runs the
generator, runs `ai:check`, and opens a PR. Reviewers see both canonical and
generated changes.

## Roles

- Registry builder owns schema, migration, and persistence.
- Governance builder owns policy and lifecycle surfaces.
- Capability publisher proposes canonical Git changes.
- Projection generator performs deterministic translation.
- Maintainer detects drift, stale evidence, and retirement candidates.
- Human approver owns consequential scope decisions.
