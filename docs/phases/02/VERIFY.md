# Verify — Phase 02

## Findings and fixes

- [ ] Baseline commit and reproduction steps are recorded.
- [ ] Findings contain location, evidence, impact, confidence, and disposition.
- [ ] At least one finding was challenged or rejected.
- [ ] Every accepted defect has a focused regression test or documented reason
      another proof is stronger.
- [ ] Fixes are limited to approved scope.

## Closing bracket

- [ ] Build passes.
- [ ] Lint and type checks pass where configured.
- [ ] Unit and integration tests pass.
- [ ] Browser/runtime verification covers the affected user flow.
- [ ] Architecture/security checks pass where relevant.
- [ ] Git diff contains no secrets, generated junk, or unrelated work.
- [ ] Independent PR evaluation reports residual risk.

## Learning

- [ ] Learner can explain scanner versus evidence.
- [ ] Learner can explain monitor versus hardener.
- [ ] Learner can identify where human judgment entered the flow.
- [ ] One recurring lesson was promoted into durable memory or an automated
      check.

Run:

```bash
npm run build
npm test
npm run ai:check
bash scripts/verify-curriculum-structure.sh
```
