---
description: Pre-commit quality gate — scans errors, checks architecture, verifies PR requirements, then commits if all pass.
---

# /commit

**Input:** Optional `push` flag to also push after committing.
**Output:** A clean commit (if all checks pass) or a blocking report (if checks fail).

When the user runs this command:

1. Invoke the **commit-agent**.

2. The agent runs three checks:
   - **Error scan** — build, lint, test. Any critical/high errors → **blocked**.
   - **Architecture monitor** — checks against architecture skills. Any high-severity violations → **blocked**.
   - **PR requirements** — walks every checkbox in `pr-requirements` skill. Any non-negotiable failures → **blocked**.

3. **If all checks pass:**
   - Stages appropriate files (never secrets, generated files, or dependencies)
   - Drafts a commit message (describes *why*, includes checks-passed summary)
   - Shows the user what will be committed and waits for approval
   - Commits (and pushes if `/commit push` was used)

4. **If any check fails:**
   - Reports exactly what failed
   - Suggests `/fix-errors` for build issues, `/harden` for architecture issues

## Example usage

```
/commit                         # check everything, then commit
/commit push                    # check everything, commit, and push
```

Arguments: `$ARGUMENTS` — optional `push` to push after committing.
