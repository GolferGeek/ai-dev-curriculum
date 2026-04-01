---
description: List open PRs and pick one to evaluate with /pr-eval.
---

# /pr-evals

**Input:** None.
**Output:** Interactive list of open PRs — user picks one to evaluate.

When the user runs this command:

1. List all open PRs for this repo using `gh pr list --state open --json number,title,author,headRefName,createdAt`.

2. Present them as a numbered list using AskUserQuestion:
   - Show PR number, title, author, branch, and age
   - Let the user pick one (or "Other" to type a PR number manually)

3. Once the user picks a PR, run `/pr-eval <number>` on it — follow the full pr-eval flow (review, approve/request changes, add rules).

## Example output

```
Open PRs:

1. #42 — fix: migrate to shared surrealdb layer (GolferGeek, feature/quickbooks-scan-fix, 2h ago)
2. #38 — feat: add twitter-killer iOS app (GolferGeek, feature/twitter-ios, 1d ago)
3. #35 — docs: phase-02 scaffolding (GolferGeek, docs/phase-02, 3d ago)

Pick a PR to evaluate:
```

Arguments: `$ARGUMENTS` — none expected.
