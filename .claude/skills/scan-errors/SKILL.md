---
description: Scan one app or all apps for build, lint, and test errors. Produces an error report.
---

# /scan-errors

**Input:** Optional app name (e.g. `quickbooks`, `trello`, `twitter`, `facebook`). No argument = scan all apps.
**Output:** Error report at `docs/artifacts/error-report.md`.

When the user runs this command:

1. Invoke the **error-scanner** agent.
   - With app name → scanner loads that app's architecture skills and scans only that app.
   - Without app name → scanner discovers all apps in `apps/` and scans each one.

2. The scanner runs build, lint, and test commands per the `quality-gates` skill. It does **not** fix anything — it only reports.

3. The report is written to `docs/artifacts/error-report.md` with errors grouped by app, classified by severity (critical/high/medium/low).

4. Tell the user:
   - How many errors were found at each severity level
   - The path to the report
   - Suggest `/fix-errors` to fix them

## Example usage

```
/scan-errors                    # scan all apps
/scan-errors quickbooks         # scan only the QuickBooks killer
/scan-errors twitter            # scan only the Twitter killer
```

Arguments: `$ARGUMENTS` — optional app name.
