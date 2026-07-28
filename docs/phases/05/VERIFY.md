# Verify — Phase 05

## Product

- [ ] Configured source refresh and dated offline fallback both work.
- [ ] Snapshot records source, exact revision, retrieval time, and hashes.
- [ ] Diff reports added, changed, removed, unchanged, and failed entries.
- [ ] Skill folders and native agent definitions parse without erasing
      unrecognized data.
- [ ] Search, filters, matrix, detail, compare, and evaluation views work.
- [ ] Every bundled file can be previewed.
- [ ] Scripts, network, credentials, tools, and write authority are visible.
- [ ] No catalog action installs or publishes.

## Evaluation

- [ ] One skill and one specialized agent were evaluated.
- [ ] A third candidate was rejected or restricted.
- [ ] Evaluations identify exact revisions and rubric versions.
- [ ] Trigger, non-trigger, collision, safety, and outcome tests were recorded.
- [ ] Scope, restrictions, owner, expiration, and re-review event are explicit.

## Engineering

```bash
npm run ai:check
npm run build
npm test
bash scripts/verify-curriculum-structure.sh
```

- [ ] Browser verification covers source errors, empty results, long content,
      compare state, and evaluation save/reload.
- [ ] No credentials or private source contents are committed.
- [ ] The work is committed on the continuing learner branch.

## Learner explanation

Without reading notes, explain:

1. Why canonical capabilities are grouped by function.
2. Why runtime projections may be flat.
3. Why approval attaches to a revision rather than a name.
4. Why a locator is not an installer or registry.
5. What evidence justified one adoption and one rejection.

Run `bash scripts/verify-curriculum-structure.sh` after the phase documents or
canonical capability library change.
