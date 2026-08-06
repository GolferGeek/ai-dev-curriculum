# Verify — Phase 05 Part B

## Migration and recovery

- [ ] Schema and migrations are version-controlled.
- [ ] Schema apply succeeds twice.
- [ ] Static import succeeds twice without duplicates.
- [ ] Reconciliation covers counts, stable IDs, revisions, files, and hashes.
- [ ] Conflicts and failures are visible.
- [ ] Backup and restore are proven.

## Governance

- [ ] Evaluations and decisions are separate records.
- [ ] Decisions bind exact revision, scope, restrictions, reviewer, and date.
- [ ] Owners, expiration, review events, use, and outcomes persist.
- [ ] Roles prevent unauthorized self-approval and publication.
- [ ] Decision history remains auditable.

## Publication and projections

- [ ] Publication targets canonical `ai/`.
- [ ] Functional group and stable name are explicit.
- [ ] Canonical and generated changes appear in one reviewable PR.
- [ ] Claude Code, Cursor, and Codex projections are generated.
- [ ] `npm run ai:check` passes with no hand-edited projections.

## Lifecycle

- [ ] A refresh detects a changed upstream revision.
- [ ] Existing approval remains pinned.
- [ ] The new revision enters re-review.
- [ ] Maintenance reports stale, changed, ownerless, expired, and unused items.
- [ ] Supersession, restriction, revocation, or retirement is demonstrated.

## Engineering checks

```bash
npm run ai:check
npm run build
npm test
bash scripts/verify-curriculum-structure.sh
```

- [ ] Browser verification covers migration status, revision ladder, policy
      history, publication preview, and re-review.
- [ ] Credentials and private registry data are absent from the commit.
- [ ] Recovery steps are documented and tested.
