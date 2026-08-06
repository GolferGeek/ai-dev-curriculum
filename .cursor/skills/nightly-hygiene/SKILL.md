---
description: Set up or run nightly repo hygiene — scan, fix, monitor, harden, PR — locally before GitHub Actions cron. Guardrails sheet 01.
---

# /nightly-hygiene

**Input:** Optional flags: `dry-run` (scan + monitor only, no fixes), `app <name>` (single app), `tier1` (build/lint/test only).
**Output:** `docs/artifacts/nightly-hygiene-report.md` with pass/fail, next steps, and GitHub Actions checklist.

**Policy home:** [marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md](../../../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md) — copy into `docs/ai-program/05-controls-and-assurance/02-enforcement-surfaces-and-guardrails/` for your team.

When the user runs this command:

## 1. Confirm prerequisites

- Phase 02 skills exist: `scan-errors`, `fix-errors`, `monitor`, `harden`, `commit`, `quality-gates`, `pr-requirements`
- Kit [05 — Decision boundaries](../../../../marketing/adoption-kit/05-decision-boundaries.md) filled for scheduled bot fixes (or warn)
- User understands: **PRs, not direct merge to `main`**

## 2. Run the hygiene chain (unless `tier1` or `dry-run`)

| Step | Command | Skip when |
|------|---------|-----------|
| Scan | `/scan-errors [app]` | `tier1` |
| Fix | `/fix-errors [app]` | `dry-run` or zero critical/high |
| Monitor | `/monitor [app]` | `tier1` |
| Harden | `/harden [app]` | `dry-run` or zero high monitor findings |
| Mechanical proof | `npm run build`, `npm run lint`, `npm run test` | never |

For `tier1`, run only the npm commands and record results.

## 3. Branch + PR (unless `dry-run`)

If fixes were applied and gates pass:

1. Create branch `maintenance/YYYY-MM-DD-nightly`
2. Run `/commit pr` **or** guide user through equivalent (quality gate must pass)
3. Record PR URL in the report

If blocked, record blocking items and suggest `/fix-errors` or `/harden` — **do not** bypass the gate for cron convenience.

## 4. Write report

Append to `docs/artifacts/nightly-hygiene-report.md`:

- Date, app scope, tier (`1` / `2` / dry-run)
- Scan/monitor summary counts
- Whether PR was created (URL) or why not
- **GitHub Actions checklist** from [docs/github/actions-and-agents.md](../../../../docs/github/actions-and-agents.md) — what is still missing for automation

## 5. Tell the user

- Local hygiene is the rehearsal; cron is Tier 1 then Tier 2 via [`anthropics/claude-code-action@v1`](https://github.com/anthropics/claude-code-action)
- Point to working workflows in `.github/workflows/nightly-hygiene-tier1.yml` and `nightly-hygiene-tier2.yml`
- Full handbook: [docs/github/README.md](../../../../docs/github/README.md)
- Remind: SaaS product code ≠ hygiene workflow — different owners OK

## Example usage

```
/nightly-hygiene                    # full Tier 2 rehearsal
/nightly-hygiene dry-run            # scan + monitor only
/nightly-hygiene tier1              # build · lint · test only
/nightly-hygiene app quickbooks     # scope to one app
```

Arguments: `$ARGUMENTS`
