---
description: Fix architectural violations — reads the monitor report, fixes in batches, runs error-scanner after to ensure nothing broke.
---

# /harden

**Input:** Optional app name. If no monitor report exists, runs `/monitor` first.
**Output:** Fixed code + updated monitor report + error scan to verify nothing broke.

When the user runs this command:

1. Check if `docs/artifacts/monitor-report.md` exists. If not, invoke **arch-monitor** first.

2. Invoke the **arch-hardener** agent.
   - With app name → hardener loads that app's architecture skills and fixes only that app's violations.
   - Without app name → hardener spawns sub-agents per app (iOS apps sequentially).

3. The hardener fixes violations in priority order (high → medium → low), then runs **error-scanner** to verify the fixes didn't break the build or tests.

4. Tell the user:
   - What was fixed
   - What remains (if anything)
   - Error scan results after fixes
   - Suggest `/commit` when everything is clean

## Example usage

```
/harden                         # harden all apps
/harden quickbooks              # harden only the QuickBooks killer
/harden trello                  # harden only the Trello killer
```

Arguments: `$ARGUMENTS` — optional app name.
