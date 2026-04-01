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
| 5 | `/commit` | Runs all checks. Commits if clean. |
| 6 | `/pr-eval <branch-or-pr>` | Reviews PR. Adds new rules if gaps found. |

Replace `quickbooks` with your app name: `trello`, `twitter`, `facebook`, or omit for all apps.

## The full quality chain at a glance

```
/scan-errors [app]  →  error-report.md
/fix-errors [app]   →  fixed code + clean report
/monitor [app]      →  monitor-report.md
/harden [app]       →  fixed code + verified build
/commit             →  quality gate → clean commit
/pr-eval <PR>       →  review + new rules fed back
```

## If something fails

- **Errors won't fix after 3 rounds** → Some errors may need manual intervention. Check the remaining items in the error report.
- **Architecture violation can't be auto-fixed** → The hardener will report what it couldn't fix. Manual fix + re-run `/monitor`.
- **Commit blocked** → Read the blocking report. Run `/fix-errors` or `/harden` as suggested, then try `/commit` again.
