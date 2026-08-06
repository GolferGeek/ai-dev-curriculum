# Demo-grade bar — Phase 05 Part B

## Pass

- Schema, constraints, indexes, and migrations are version-controlled.
- Schema apply and catalog migration are idempotent.
- A reconciliation report proves static catalog and file-hash parity.
- Backup and restore are demonstrated.
- The registry preserves stable identity and immutable revisions.
- Evaluations, policy decisions, scopes, restrictions, owners, expiration,
  use, and outcomes persist with history.
- Upstream, reviewed, approved, canonical, generated, and used revisions are
  visible separately.
- One exact revision is approved for a defined scope.
- Publication writes canonical `ai/` content through a branch and PR.
- Generated Claude Code, Cursor, and Codex outputs match canonical source.
- RBAC prevents self-approval and protected-branch bypass.
- A changed upstream revision triggers re-review without changing the approved
  revision.
- One supersession, restriction, revocation, or retirement is demonstrated.

## Fail

- Re-running migration duplicates or mutates history.
- UI similarity substitutes for parity evidence.
- Credentials are embedded in source or fixtures.
- A database flag silently changes runtime instructions.
- Approval follows `latest` or a capability name.
- Generated projections are edited as independent source.
- An evaluator can approve and publish without policy or audit.
- Upstream change silently replaces approved content.
- Retirement deletes records before use and impact are understood.

## Stretch

After passing, add signed publication packages, policy-as-code checks,
projection conformance fixtures, usage telemetry with privacy controls, or an
emergency revocation drill.
