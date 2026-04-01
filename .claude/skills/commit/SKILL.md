---
description: Pre-commit quality gate — scans errors, checks architecture, verifies PR requirements, then commits if all pass.
---

# /commit

**Input:** Optional flags: `push` (push after commit), `pr` (push + create PR).
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
   - Commits
   - If `push` → pushes to remote
   - If `pr` → pushes to remote + creates a PR via `gh pr create` with a summary of what changed and checks passed

4. **If any check fails:**
   - Reports exactly what failed
   - Suggests `/fix-errors` for build issues, `/harden` for architecture issues

## PR creation (when using `pr` flag)

When creating a PR:
- Title: use the commit message first line
- Body: include a summary section (bullet points of what changed), a checks-passed section, and the standard footer
- Use `gh pr create --title "..." --body "..."`
- Tell the user the PR URL when done

## Example usage

```
/commit                         # check everything, then commit
/commit push                    # check everything, commit, and push
/commit pr                      # check everything, commit, push, and create PR
```

Arguments: `$ARGUMENTS` — optional `push` or `pr`.
