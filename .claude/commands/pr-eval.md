---
description: Evaluate a PR against architecture rules and PR requirements. Adds new rules when it finds gaps.
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

3. **If the agent finds a violation pattern not covered by existing rules**, it adds it to the "Reviewer-added rules" section of `.claude/skills/pr-requirements.md`. This closes the feedback loop — `/commit` will catch it next time.

4. Tell the user:
   - The verdict (approve / request changes / needs discussion)
   - Issues found and which rules they violate
   - Any new rules that were added to pr-requirements

## Example usage

```
/pr-eval 42                     # evaluate PR #42
/pr-eval feature/quickbooks     # evaluate the branch
```

Arguments: `$ARGUMENTS` — PR number or branch name.
