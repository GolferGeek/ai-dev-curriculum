---
description: Day 2 bridge — help learners create custom agents, skills, and commands from patterns they observe.
---

# /author-agent

**Input:** Optional description of what the new agent or skill should do. If omitted, starts an interactive guided flow.
**Output:** New skill files in `.claude/skills/` ready to use.

When the user runs this command:

1. Invoke the **agent-author** agent.

2. If no argument is provided, guide the learner through these questions:
   - What pattern or workflow do you want to automate?
   - Should this be a user-invocable command (SKILL.md) or a background agent?
   - What tools does it need (file search, code analysis, git, browser, etc.)?
   - What should the output look like (report, code changes, both)?

3. If an argument is provided, use it as the starting description and skip to generation.

4. Generate the skill files following the exact patterns in this repo:
   - Create a directory under `.claude/skills/`
   - Write a `SKILL.md` with frontmatter, input/output, numbered steps, example usage, and arguments
   - Follow naming conventions from existing skills (kebab-case directory, SKILL.md filename)

5. Before generating anything intended for **production codebases** (not this curriculum repo), read the `day2-prep` skill and walk the learner through the access/scope/safety checklist:
   - What repos will this agent access?
   - What can it read vs. write?
   - What guardrails prevent unintended changes?
   - Does it need secrets or API access?

6. Tell the user:
   - What was created and where
   - How to invoke their new command
   - Suggest testing it immediately with a dry run

## Example usage

```
/author-agent                                   # interactive guided flow
/author-agent scan for TODO comments and rank by staleness
/author-agent create a skill that checks API response times
```

Arguments: `$ARGUMENTS` — optional description of the desired agent or skill.
