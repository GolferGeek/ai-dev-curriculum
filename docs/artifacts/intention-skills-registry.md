# Intention — Skills Registry

## Why

The Phase 05 locator discovers skills but cannot persist shared evaluation, policy, installation, or lifecycle state. Improve it into a local/team registry backed by SurrealDB.

## Preserve

- Existing browsing, search, filters, full-file preview, caching, and catalog diff
- Offline-readable last successful catalog
- Provenance from the static catalog

## Add

- Version-controlled idempotent SurrealDB schema and migration
- Immutable skill revisions and content hashes
- Scouting runs and upstream diffs
- Evaluations, discussion, owners, review dates, and expiration
- Personal/project/team/enterprise policy decisions
- Dependencies, conflicts, supersession, permissions, and supported tools
- Installations with exact revision and local modifications
- Local and team configuration
- Project publication through generated files, complete diff, validation, branch, and PR
- Maintenance view for updates, stale approvals, missing owners, failed tests, and retirement

## Boundaries

- Registry is control plane; Git is project execution contract
- Discovery never implies approval
- Approval applies only to exact reviewed revision
- No skill approves or publishes itself
- No silent overwrite or destructive migration
- Secrets remain in approved environment configuration

## Demo minimum

Import Phase 05 catalog, evaluate three skills, approve one for a project, reject one, publish one via PR, simulate an upstream change, and show re-review required.
