---
description: Fix build, lint, and test errors — reads the error report, groups and fixes in batches, iterates until clean.
---

# /fix-errors

**Input:** Optional app name. If no error report exists, runs `/scan-errors` first.
**Output:** Fixed code + updated error report showing what was fixed and what remains.

When the user runs this command:

1. Check if `docs/artifacts/error-report.md` exists. If not, invoke **error-scanner** first.

2. Invoke the **error-fixer** agent.
   - With app name → fixer loads that app's architecture skills and fixes only that app's errors.
   - Without app name → fixer spawns sub-agents per app (iOS apps run sequentially).

3. The fixer groups related errors, fixes them in priority order (critical → high → medium → low), then runs **error-scanner** again to verify.

4. Repeats up to 3 iterations until zero errors or no further progress.

5. Tell the user:
   - What was fixed
   - What remains (if anything)
   - Suggest `/monitor` if errors are clean and they want architectural checks next

## Example usage

```
/fix-errors                     # fix all apps
/fix-errors quickbooks          # fix only the QuickBooks killer
/fix-errors twitter             # fix only the Twitter killer
```

Arguments: `$ARGUMENTS` — optional app name.
