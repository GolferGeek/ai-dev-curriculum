# Prerequisites — Phase 02

## Learner

- Phase 01 application is committed and can run locally.
- Build and test commands are known.
- At least one real user flow can be exercised in a browser.
- The learner can inspect Git diffs and understands that scanner findings are
  hypotheses until verified.

## Repository

- Dependencies are installed.
- Working tree is clean or intentionally checkpointed.
- Test credentials are non-production and safe for the lab.
- CI and protected-branch rules are visible, even if the training branch does
  not enforce production policy.

## Instructor preflight

1. Prepare a known app with several real but bounded findings.
2. Verify scanner, fixer, monitor, hardener, commit, and PR-evaluation
   capabilities are present in all supported harnesses.
3. Choose at least one false positive or ambiguous finding for discussion.
4. Confirm the quality gate cannot be passed by hiding or deleting tests.
5. Rehearse a browser verification and a failed check.

Do not use a production repository, production credentials, or an
unsanitized incident for the first quality lab.
