# Prerequisites — Phase 05.5

## Product and data

- Phase 05 locator, static snapshots, tests, and evaluations are working.
- A backup/export of the current catalog exists and restores successfully.
- SurrealDB is available locally or through an approved team connection.
- URL, namespace, database, username, and password are provided through
  environment variables.
- No production or client credentials are required for the lab.

## Governance

- The organization has named evaluator, approver, publisher, and owner roles.
- Personal, project/team, and organizational scopes are defined.
- The learner has branch and PR authority for the training repository, but not
  permission to bypass protected branches.
- One Phase 05 candidate has evidence suitable for a publication exercise.

## Tooling

- `npm run ai:check` passes before the migration begins.
- The learner understands `ai/functions.json`, canonical skill and agent
  formats, and generated projections.
- Git identity and the selected coding harness work on the continuing learner
  branch.

## Instructor preflight

Prepare a known-good database reset, a repeated migration test, an upstream
revision change, and a publication PR rehearsal. Confirm how to recover if the
database or generator fails midway.
