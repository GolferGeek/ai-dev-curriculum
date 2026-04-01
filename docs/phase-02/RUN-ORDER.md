# Run order — Phase 02

## Before you start

- [ ] Phase 01 complete (at least one SaaS killer app built and working)
- [ ] App builds clean (`npm run build` or `xcodebuild build`)

## Steps

| Step | What to type | What happens |
|------|-------------|-------------|
| 1 | `/scan-errors quickbooks` | Scans build/lint/test. Produces `docs/artifacts/error-report.md`. |
| 2 | `/fix-errors quickbooks` | Groups and fixes errors. Re-scans. Iterates to zero. |
| 3 | `/monitor quickbooks` | Scans architecture rules. Produces `docs/artifacts/monitor-report.md`. |
| 4 | `/harden quickbooks` | Fixes violations. Re-scans errors to verify. |
| 5 | `/commit pr` | Runs all checks. Commits, pushes, and creates PR if clean. |
| 6 | `/pr-evals` | Lists open PRs. Pick one to evaluate. |
| 7 | `/pr-eval 42` | Reviews PR. Approves or requests changes on GitHub. Adds new rules if gaps found. |

Replace `quickbooks` with your app name: `trello`, `twitter`, `facebook`, or omit for all apps.

## The full quality chain at a glance

```
/scan-errors [app]  →  error-report.md
/fix-errors [app]   →  fixed code + clean report
/monitor [app]      →  monitor-report.md
/harden [app]       →  fixed code + verified build
/commit pr          →  quality gate → commit → push → PR created
/pr-evals           →  list open PRs → pick one
/pr-eval <PR>       →  review → approve / request changes + new rules fed back
```

## Commit variants

| Command | What it does |
|---------|-------------|
| `/commit` | Quality gate → commit (local only) |
| `/commit push` | Quality gate → commit → push |
| `/commit pr` | Quality gate → commit → push → create PR |

## If something fails

- **Errors won't fix after 3 rounds** → Some errors may need manual intervention. Check the remaining items in the error report.
- **Architecture violation can't be auto-fixed** → The hardener will report what it couldn't fix. Manual fix + re-run `/monitor`.
- **Commit blocked** → Read the blocking report. Run `/fix-errors` or `/harden` as suggested, then try `/commit` again.
- **PR changes requested** → `/pr-eval` will list exactly what needs fixing. Fix, then `/commit pr` again.
