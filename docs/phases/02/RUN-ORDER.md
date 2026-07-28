# Run order — Phase 02

## Before you start

- [ ] Phase 01 complete (at least one SaaS killer app built and working)
- [ ] App builds clean (`npm run build` or `xcodebuild build`)
- [ ] Instructors: [TEACHING.md](./TEACHING.md) for timing and discussion slotting during the run

---

## Part A — Interactive quality pipeline

Replace `quickbooks` with your app name: `trello`, `twitter`, `facebook`, or omit for all apps.

| Step | What to type | What happens |
|------|-------------|-------------|
| 1 | `/scan-errors quickbooks` | Scans build/lint/test. Produces `docs/artifacts/error-report.md`. **Read the report before step 2.** |
| 2 | `/fix-errors quickbooks` | Groups and fixes errors. Re-scans. Iterates to zero. |
| 3 | `/monitor quickbooks` | Scans architecture rules. Produces `docs/artifacts/monitor-report.md`. **Read the report before step 4.** |
| 4 | `/harden quickbooks` | Fixes violations. Re-scans errors to verify. |
| 5 | `/commit pr` | Runs all checks. Commits, pushes, and creates PR if clean. |
| 6 | `/pr-evals` | Lists open PRs. Pick one to evaluate. |
| 7 | `/pr-eval 42` | Reviews PR. Approves or requests changes on GitHub. Adds new rules if gaps found. |

### The full quality chain at a glance

```
/scan-errors [app]  →  error-report.md
/fix-errors [app]   →  fixed code + clean report
/monitor [app]      →  monitor-report.md
/harden [app]       →  fixed code + verified build
/commit pr          →  quality gate → commit → push → PR created
/pr-evals           →  list open PRs → pick one
/pr-eval <PR>       →  review → approve / request changes + new rules fed back
```

### Commit variants

| Command | What it does |
|---------|-------------|
| `/commit` | Quality gate → commit (local only) |
| `/commit push` | Quality gate → commit → push |
| `/commit pr` | Quality gate → commit → push → create PR |

---

## Part B — Scheduled hygiene (optional, recommended for instructors)

Interactive gates only run when invoked. **Nightly hygiene** runs the closing bracket on a cron — see [README.md](./README.md#scheduled-hygiene--the-closing-bracket-on-a-cron) and [TEACHING.md](./TEACHING.md#scheduled-hygiene--the-closing-bracket-on-a-cron-2030-min).

| Step | What to do | What happens |
|------|-----------|-------------|
| 8 | `/nightly-hygiene` (local rehearsal) | Same scan → fix → monitor → harden chain without GitHub. Confirms Tier 2 behavior before automation. |
| 9 | Enable **Tier 1** cron | [`.github/workflows/nightly-hygiene-tier1.yml`](../../../.github/workflows/nightly-hygiene-tier1.yml) — `build · lint · test` on schedule. No agent API key. |
| 10 | **Manual run** Tier 1 | GitHub → Actions → *Nightly hygiene Tier 1* → **Run workflow**. Inspect the log with the room. |
| 11 | (Later) Enable **Tier 2** | [`.github/workflows/nightly-hygiene-tier2.yml`](../../../.github/workflows/nightly-hygiene-tier2.yml) — maintenance branch + PR. **Only after** Tier 1 is green, decision boundaries filled ([G1 worksheet](../../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md)), and API budget agreed. |

**Handbook:** [docs/github/actions-and-agents.md](../../github/actions-and-agents.md) · **Checklist:** [02 — GitHub Actions and skills](../../checklists/02-github-actions-and-skills.md)

**Instructor note:** Do not enable Tier 2 in the classroom unless the cohort has signed off decision boundaries — demo Tier 1 + worksheets instead.

---

## If something fails

- **Errors won't fix after 3 rounds** → Some errors may need manual intervention. Check the remaining items in the error report.
- **Architecture violation can't be auto-fixed** → The hardener will report what it couldn't fix. Manual fix + re-run `/monitor`.
- **Commit blocked** → Read the blocking report. Run `/fix-errors` or `/harden` as suggested, then try `/commit` again.
- **PR changes requested** → `/pr-eval` will list exactly what needs fixing. Fix, then `/commit pr` again.
- **Tier 1 workflow fails on cron** → Fix locally with Part A first; cron should mirror what passes on your machine.
