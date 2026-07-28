---
description: Day 2 bridge — help learners create custom agents, skills, and commands from patterns they observe.
---

# /author-agent

**Input:** Optional description of what the new agent or skill should do. If omitted, starts an interactive guided flow.
**Output:** A canonical skill under `ai/skills/<function>/` or specialized agent
under `ai/agents/<function>/`, plus regenerated harness projections.

When the user runs this command:

1. Invoke the **agent-author** agent.

2. If no argument is provided, guide the learner through these questions:
   - What pattern or workflow do you want to automate?
   - Should this be a user-invocable command (SKILL.md) or a background agent?
   - What tools does it need (file search, code analysis, git, browser, etc.)?
   - What should the output look like (report, code changes, both)?

3. If an argument is provided, use it as the starting description and skip to generation.

4. Generate the canonical capability following this repo's patterns:
   - Choose the function from `ai/functions.json`; do not create a flat catch-all.
   - For a skill, create `ai/skills/<function>/<name>/SKILL.md`.
   - For an agent, create `ai/agents/<function>/<name>/AGENT.md`.
   - Preserve common instructions in the canonical file and use the generator
     for harness-specific formats.
   - Follow existing naming, metadata, input/output, safety, and validation
     conventions.

5. Before generating anything intended for **production codebases** (not this curriculum repo), read the `day2-prep` skill and walk the learner through the access/scope/safety checklist:
   - What repos will this agent access?
   - What can it read vs. write?
   - What guardrails prevent unintended changes?
   - Does it need secrets or API access?

6. Tell the user:
   - What was created and where
   - Which function owns it and why
   - How to invoke or select it in each supported harness
   - That `npm run ai:generate` and `npm run ai:check` passed
   - Suggest testing it immediately with a dry run

## Example usage

```
/author-agent                                   # interactive guided flow
/author-agent scan for TODO comments and rank by staleness
/author-agent create a skill that checks API response times
```

Arguments: `$ARGUMENTS` — optional description of the desired agent or skill.
