---
description: Git history analysis — who changed what, hotspots, churn patterns, recent velocity.
---

# /git-story

**Input:** None. Optional filters like `--since=YYYY-MM-DD` or `--author=name`.
**Output:** History report at `docs/artifacts/git-story-report.md`.

When the user runs this command:

1. Invoke the **git-historian** agent.
   - With filters → narrow the analysis to the specified time range, author, or path.
   - Without argument → analyze the full git history.

2. The agent analyzes:
   - **Timeline** — first commit, last commit, active periods, quiet periods
   - **Contributors** — who committed, how much, in what areas
   - **Hotspots** — most-changed files ranked by edit frequency
   - **Velocity** — commits per week/month, trend direction
   - **Coupling** — files that consistently change together (hidden dependencies)
   - **Large commits** — commits with unusually many changes (risk indicators)
   - **Commit message patterns** — conventions used, consistency, quality

3. The agent does **not** modify anything — it only reports.

4. Write the report to `docs/artifacts/git-story-report.md`.

5. Tell the user:
   - Key highlights: top hotspots, active contributors, velocity trend
   - The path to the full report
   - Suggest `/improve` next to find actionable improvement opportunities

## Example usage

```
/git-story                              # full history analysis
/git-story --since=2026-01-01           # history since January 2026
/git-story --author=golfergeek          # only GolferGeek's commits
/git-story --since=2026-03-01 --author=golfergeek
```

Arguments: `$ARGUMENTS` — optional filters (--since, --author, path).
