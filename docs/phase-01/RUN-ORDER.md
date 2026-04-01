# Run order — Phase 01

## Before you start

- [ ] Phase 00 complete (monorepo + one app track working)
- [ ] SurrealDB installed (`surreal version` prints 2.x+)
- [ ] (iOS tracks) Xcode 15+ installed (`xcodebuild -version`)
- [ ] (Optional) Chrome + Claude-in-Chrome extension for `/test-browser`

## Steps

| Step | What to type | What happens |
|------|-------------|-------------|
| 1 | Pick your SaaS killer from the [README](./README.md#pick-your-saas-killer). | Choose Web A, Web B, iOS A, or iOS B. |
| 2 | `/intention docs/phase-01/intention-<track>.md` | Reviews the intention with you. Outputs `docs/artifacts/intention.md`. |
| 3 | `/prd docs/artifacts/intention.md` | Builds PRD from intention. Outputs `docs/artifacts/prd.md`. |
| 4 | Review PRD — does it cover all Demo-grade minimums? Are non-goals explicit? | Challenge pass. Fix before proceeding. |
| 5 | `/plan docs/artifacts/prd.md` | Builds plan from PRD. Outputs `docs/artifacts/plan.md`. |
| 6 | Review plan — does it deliver every PRD goal? Are agents assigned to milestones? | Challenge pass. Fix before proceeding. |
| 7 | `/run-plan docs/artifacts/plan.md` | Invokes agents in order (SurrealDB → app builder). Builds the code. |
| 8 | `npm run build` (web) or `xcodebuild build` (iOS) | Does it compile? |
| 9 | `npm run test` (web) or `xcodebuild test` (iOS) | Do tests pass? |
| 10 | `/test-browser` (web) or test in Simulator (iOS) | Visual QA — does it look and work right? |
| 11 | Fix what's broken, re-run tests, iterate until demo-grade bar is met. | Done when it's credible. |

Replace `<track>` with: `quickbooks-killer`, `trello-killer`, `twitter-killer`, or `facebook-killer`.

## The full command chain at a glance

```
/intention docs/phase-01/intention-quickbooks-killer.md   → docs/artifacts/intention.md
/prd docs/artifacts/intention.md                          → docs/artifacts/prd.md
/plan docs/artifacts/prd.md                               → docs/artifacts/plan.md
/run-plan docs/artifacts/plan.md                          → code in apps/ and packages/
```

## If something fails

1. Capture the error (build, test, or visual QA).
2. Fix forward **or** reset uncommitted app work and re-run `/run-plan docs/artifacts/plan.md`.
3. If the plan was wrong, go back to `/plan docs/artifacts/prd.md` and regenerate.
4. If the PRD was wrong, go back to `/prd docs/artifacts/intention.md` and regenerate.
