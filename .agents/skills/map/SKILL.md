---
description: Map entry and exit points — where data comes in, where it goes out, API surfaces, auth boundaries.
---

# /map

**Input:** None. Optional app name to focus on a single app.
**Output:** Data flow map at `docs/artifacts/map-report.md`.

When the user runs this command:

1. Invoke the **repo-researcher** agent with task "map".
   - With app name → map only that app's entry/exit points and boundaries.
   - Without argument → map all apps and cross-app boundaries.

2. The agent traces:
   - **Entry points** — HTTP routes, form handlers, CLI entry, cron jobs, event listeners
   - **Exit points** — DB writes, external API calls, file writes, message queue publishes
   - **Auth boundaries** — where authentication is checked, where it is missing, middleware chains
   - **Data transformations** — where data changes shape between entry and exit
   - **Cross-app boundaries** — how apps communicate, shared data contracts, payload formats

3. The agent does **not** modify anything — it only reports.

4. Write the report to `docs/artifacts/map-report.md`.

5. Tell the user:
   - How many entry points, exit points, and auth boundaries were found
   - The path to the full report
   - Suggest `/security-scan` next to check for vulnerabilities at those boundaries

## Example usage

```
/map                            # map all apps
/map quickbooks                 # map only the QuickBooks killer
/map trello                     # map only the Trello killer
```

Arguments: `$ARGUMENTS` — optional app name.
