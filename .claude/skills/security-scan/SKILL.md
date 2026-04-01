---
description: Security lens — find vulnerabilities, auth gaps, exposed secrets, injection risks.
---

# /security-scan

**Input:** None. Optional app name to focus on a single app.
**Output:** Security report at `docs/artifacts/security-report.md`.

When the user runs this command:

1. Invoke the **security-researcher** agent.
   - With app name → scan only that app.
   - Without argument → scan all apps.

2. The agent checks for:
   - **Exposed secrets** — API keys, tokens, passwords in code or config committed to the repo
   - **Auth gaps** — routes or actions missing authentication or authorization checks
   - **Injection risks** — SQL/SurrealQL injection, XSS, command injection, path traversal
   - **Dependency risks** — known vulnerabilities in dependencies, outdated packages
   - **Permission gaps** — overly broad access, missing role checks, privilege escalation paths
   - **Data exposure** — sensitive data in logs, error messages, client bundles, or API responses

3. The agent does **not** fix anything — it only reports.

4. Classify each finding by severity: **critical / high / medium / low**.

5. Write the report to `docs/artifacts/security-report.md`.

6. Tell the user:
   - How many findings at each severity level
   - The path to the full report
   - Suggest `/git-story` next to understand change history and contributor patterns

## Example usage

```
/security-scan                  # scan all apps
/security-scan quickbooks       # scan only the QuickBooks killer
/security-scan twitter          # scan only the Twitter killer
```

Arguments: `$ARGUMENTS` — optional app name.
