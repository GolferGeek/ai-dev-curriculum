# Phase 05.5 — Lesson plan

*Use this immediately after Phase 05 or as the opening extension on Day 4.
Learners improve the existing capability locator; they do not begin a second
greenfield app.*

**Arc:** Existing app → revision model → schema and migration → registry policy
→ canonical publication → three native projections → upstream drift →
re-review and retirement.

## 1. The organizational leap

Phase 05 proved that developers can discover and evaluate capabilities. That
does not tell a team what it trusts, which exact revision it trusts, where the
capability is used, who owns it, or whether the evidence is still current.

The registry adds the control plane:

```text
source and revision
  + evaluation evidence
  + policy decision and scope
  + owner, use, and outcome
  + publication and projection history
  + re-review and retirement
```

Land the central distinction:

> SurrealDB records what the organization knows and believes. Git proves the
> exact instructions the organization is prepared to run.

A database approval flag must not silently change agent behavior in every
repository.

## 2. Existing system before migration

Have learners draw the Phase 05 product:

- configured sources and dated snapshots;
- stable capability identities and immutable revisions;
- complete files and hashes;
- parsing failures;
- evaluation records;
- UI and tests; and
- canonical `ai/` plus generated harness files.

Ask what would be lost by a naïve “load the current JSON into a table”
migration. Expected answers: history, failed parses, duplicate-source
relationships, revision distinctions, full files, and evaluation evidence.

## 3. The revision ladder

Write this on screen:

```text
upstream ≠ reviewed ≠ approved ≠ canonical ≠ generated ≠ used ≠ modified
```

Use one candidate to show:

- upstream publishes revision B;
- the team reviewed A;
- A remains approved for one project;
- canonical A may include a documented local modification;
- projections express that canonical version in three formats;
- one project may still use an older generated revision.

Approval never “floats” to B because the name stayed the same.

## 4. Migration is a product feature

The migration contract is:

1. Preserve the static source as a recovery point.
2. Apply version-controlled schema and indexes.
3. Import with stable keys and immutable revision records.
4. Re-run without duplication.
5. Reconcile counts, keys, files, and hashes.
6. Restore once before continuing.

Teach that idempotence is not database trivia. It is how a team makes setup,
deployment, disaster recovery, and new-developer onboarding reliable.

## 5. Authority is not a status dropdown

Separate:

| Action | Meaning |
|---|---|
| Discover | A source contains a candidate |
| Evaluate | Evidence and recommendation exist |
| Approve | A designated role binds revision to scope |
| Publish | Canonical Git change is proposed |
| Generate | Native projections are rebuilt |
| Install/use | A project or user activates the capability |
| Revoke/retire | Authority or availability ends with an audit trail |

One person may hold several roles in a small company, but the system should
still show which authority they exercised. For high-risk scope, prevent
self-approval.

## 6. Canonical publication

The publication exercise is the proof of portability:

1. Choose the correct functional group.
2. Create canonical skill or agent content under `ai/`.
3. Add stable membership to `ai/functions.json`.
4. Generate Claude Code, Cursor, and Codex interpretations.
5. Inspect semantic and authority differences.
6. Open a PR with evidence, owner, review trigger, and all generated diffs.

Emphasize that native files can be flat even when the organization browses a
nested function hierarchy. Humans and runtimes optimize for different things.

## 7. Modernization without churn

Refresh the candidate source so a new revision appears. The current approval
must remain pinned while the new version moves to re-review.

Ask the class to choose and defend:

- accept the new revision after testing;
- keep the old revision;
- restrict scope;
- maintain a local fork;
- supersede with an internal capability;
- revoke immediately; or
- retire with a migration plan.

Connect this to the broader AI program. The same assess → propose → review →
merge loop governs model providers, harness policy, protocols, coding
governance, and security—not only skills.

## 8. Closing board

Each group demonstrates:

1. repeatable migration and parity evidence;
2. one revision-bound approval;
3. one canonical publication PR;
4. all three generated projections;
5. one changed upstream revision that does not inherit approval; and
6. one maintenance decision.

Ask:

- What belongs in the registry?
- What belongs in Git?
- Which step requires human authority?
- What will make this program stale?
- Who is accountable for noticing?

The successful outcome is not “we built CRUD.” It is “our organization can
explain what AI behavior it trusts, run the exact reviewed form across tools,
and change that trust without losing history.”
