# Phase 05.5 — Instructor teaching guide

This module closes the capability-governance story. It should feel like a
brownfield product evolution and an operating-model rehearsal, not another
greenfield coding sprint.

## Outcomes and timing

Suggested block: 2.5–3 hours.

| Segment | Time | Outcome |
|---|---:|---|
| Existing-system map | 20 min | Learners find static boundaries and recovery points |
| Registry and revision model | 25 min | Learners separate identity, revisions, policy, and use |
| Migration | 40 min | Schema is idempotent and parity is proven |
| Governance surfaces | 35 min | Scope, ownership, authority, and lifecycle are visible |
| Publication and generation | 35 min | One canonical PR produces three native projections |
| Drift and retirement | 20 min | An upstream change triggers re-review |
| Debrief | 10 min | Learners can explain control plane versus execution contract |

## Before class

- Verify the Phase 05 app and static snapshots.
- Prepare database start, reset, backup, and restore commands.
- Rehearse the migration twice and save expected parity results.
- Prepare one approved candidate and a later upstream revision.
- Ensure the publication exercise targets a training branch and cannot write
  directly to a protected branch.
- Open `ai/functions.json` and the generator implementation.

## Opening

Say: “Today we are not building a database-shaped replacement. We are changing
a working product while preserving its evidence.”

Ask learners to draw the current system before opening the plan. Require them
to identify the static catalog, evaluations, test fixtures, configuration,
canonical Git source, and generated projections.

## Teach the revision ladder

Write:

```text
upstream ≠ reviewed ≠ approved ≠ canonical ≠ generated ≠ used ≠ modified
```

Walk one candidate through the ladder. Ask which transitions are facts, which
are decisions, and which require authority. Keep the exact hashes visible.

## Migration checkpoint

Before new UI work:

1. Apply the schema twice.
2. Import the same snapshot twice.
3. Compare counts, stable IDs, revision IDs, files, and hashes.
4. Show any conflicts and parse failures.
5. Restore the backup.

Do not accept “the page looks the same” as migration proof.

## Governance checkpoint

Demonstrate:

- evaluation without approval;
- approval for one scope but not another;
- expiration and event-triggered re-review;
- publisher authority separated from approver authority;
- owner and use inventory; and
- a decision history that cannot be rewritten invisibly.

Ask: “Could the person who discovered this publish it to everyone?” The safe
default is no.

## Publication walkthrough

1. Select one evaluated exact revision.
2. Create a publication package with evidence and function group.
3. Generate canonical skill or agent files.
4. Run all three projections.
5. Inspect the canonical and generated diffs.
6. Open the PR and review it as code plus organizational behavior.

Make the class say which files are canonical and which are generated. If any
learner proposes editing a generated output, return to the source-of-truth
model.

## Drift demonstration

Refresh the source after changing the upstream content. The approved revision
must remain pinned. The new revision should be visible but unapproved and
marked for re-review.

Run maintenance and ask learners to choose:

- accept after re-evaluation;
- restrict scope;
- supersede with a local variant;
- revoke immediately; or
- retire with a transition plan.

Require an evidence-based decision.

## Common failure modes

- **Migration creates duplicates.** Fix stable keys and idempotent upserts.
- **The database becomes the execution source.** Restore Git publication.
- **Approval floats to latest.** Bind it to the reviewed hash.
- **Generator hides semantic changes.** Include output diffs in the PR.
- **One person can do everything.** Separate roles or require explicit
  exception evidence.
- **Retirement means deletion.** First inventory use, communicate, replace,
  revoke, then remove.

## Close

Have learners explain:

1. What the registry knows that Git does not.
2. What Git proves that the registry does not.
3. Why three projections must come from one canonical source.
4. What triggers re-review.
5. How an organizational capability is safely retired.
