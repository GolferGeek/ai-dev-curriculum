---
description: Evaluate a PR against architecture rules and PR requirements. Asks user before approving/merging. Adds new rules when it finds gaps.
---

# /pr-eval

**Input:** PR number or branch name.
**Output:** A structured PR review + any new rules added to `pr-requirements` skill.

When the user runs this command:

1. Invoke the **pr-evaluator** agent with the PR number or branch.

2. The agent:
   - Reads the full diff
   - Checks every changed file against the appropriate architecture skill
   - Walks every PR requirement
   - Produces a structured review (verdict, issues, suggestions)

3. **If the agent finds a violation pattern not covered by existing rules**, it
   proposes an update to the canonical `pr-requirements` skill under `ai/`. A
   human reviews the new organizational rule; after approval, regenerate all
   harness projections. This closes the feedback loop without silently changing
   policy during a PR review.

4. **Present the verdict to the user and ask what to do:**

   - **APPROVE (no must-fix issues):** Show the review summary, then ask the user:
     - "Approve" → `gh pr review <number> --approve --body "..."`
     - "Approve & Merge" → approve, then `gh pr merge <number> --squash`
     - "Skip" → don't take any GitHub action, just show the review

   - **REQUEST CHANGES (must-fix issues exist):** Show the must-fix list, then ask the user:
     - "Request changes on GitHub" → `gh pr review <number> --request-changes --body "..."`
     - "Skip" → don't take any GitHub action, just show the review
     - Suggest `/fix-errors` or `/harden` as appropriate.

   - **NEEDS DISCUSSION:** Report findings and ask the user how to proceed. Don't take any GitHub action.

5. Tell the user:
   - The verdict
   - Issues found and which rules they violate
   - What action was taken on GitHub (if any)
   - Any new rules that were added to pr-requirements

## Example usage

```
/pr-eval 42                     # evaluate PR #42
/pr-eval feature/quickbooks     # evaluate the branch
```

Arguments: `$ARGUMENTS` — PR number or branch name.
