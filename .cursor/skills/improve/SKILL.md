---
description: Find improvement opportunities — dead code, performance issues, missing tests, tech debt.
---

# /improve

**Input:** None. Optional app name to focus on a single app.
**Output:** Improvement report at `docs/artifacts/improve-report.md`.

When the user runs this command:

1. Invoke the **repo-researcher** agent with task "improve".
   - With app name → focus on that app only.
   - Without argument → scan all apps and shared packages.

2. The agent looks for:
   - **Dead code** — unused exports, unreferenced files, orphaned dependencies
   - **Missing tests** — modules with zero test coverage, critical paths without assertions
   - **Performance issues** — N+1 queries, large bundle imports, unoptimized images, missing caching
   - **Tech debt** — TODO/FIXME comments, duplicated logic, inconsistent patterns across apps
   - **Documentation gaps** — missing READMEs, undocumented APIs, stale docs
   - **Upgrade opportunities** — outdated dependencies with available major versions

3. The agent does **not** fix anything — it only reports.

4. Classify each finding by impact: **high-impact / medium-impact / low-impact**.

5. Write the report to `docs/artifacts/improve-report.md`.

6. Tell the user:
   - How many findings at each impact level
   - The top 3 highest-impact improvements
   - The path to the full report
   - Suggest `/deep-dive [area]` to go deeper on a specific area, or `/author-agent` to codify a pattern

## Example usage

```
/improve                        # scan all apps
/improve quickbooks             # scan only the QuickBooks killer
/improve twitter                # scan only the Twitter killer
```

Arguments: `$ARGUMENTS` — optional app name.
