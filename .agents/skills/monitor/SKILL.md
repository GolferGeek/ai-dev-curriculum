---
description: Scan one app or all apps for architectural violations and PR requirement gaps. Produces a findings report.
---

# /monitor

**Input:** Optional app name. No argument = scan all apps.
**Output:** Monitor report at `docs/artifacts/monitor-report.md`.

When the user runs this command:

1. Invoke the **arch-monitor** agent.
   - With app name → monitor loads that app's architecture skills (web-architecture, ios-architecture, or data-architecture) and scans only that app.
   - Without app name → monitor discovers all apps and scans each with the appropriate skills.

2. The monitor checks every file against the architecture rules and PR requirements. It does **not** fix anything — it only reports.

3. The report is written to `docs/artifacts/monitor-report.md` with findings grouped by app, classified by severity (high/medium/low), and each finding cites the specific rule being violated.

4. Tell the user:
   - How many findings at each severity
   - The path to the report
   - Suggest `/harden` to fix them

## Example usage

```
/monitor                        # monitor all apps
/monitor quickbooks             # monitor only the QuickBooks killer
/monitor twitter                # monitor only the Twitter killer
```

Arguments: `$ARGUMENTS` — optional app name.
