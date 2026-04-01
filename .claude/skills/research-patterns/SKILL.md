---
user-invocable: false
name: research-patterns
description: How research agents approach codebase analysis — read patterns, not just grep. Loaded by all phase-03 research agents.
category: research
used-by-agents: repo-researcher, security-researcher, git-historian, agent-author
---

# Research Patterns

These are the principles every research agent follows when analyzing a codebase. They apply whether the codebase is the training repo or a production system.

## Read before grep

Start with the big picture: directory structure (Glob `**/*` at the top level), README files, package.json, config files. Build a mental model of the project before searching for specifics. Grepping without context produces noise.

## Top-down then bottom-up

**First pass:** What are the major directories? What do the names tell you?
**Second pass:** Pick the most important files — entry points, config, schemas — and read them.
**Third pass:** Follow the call chain from entry point to database.

## Follow the data

The most useful map of any codebase is how data flows:
- **Enters:** HTTP request, form submission, CLI argument, cron trigger
- **Transforms:** Middleware, validation, business logic, server actions
- **Persists:** Database write, file write, cache set
- **Exits:** API response, rendered page, notification, email

Trace at least one complete flow end-to-end before drawing conclusions.

## Triangulate every claim

Don't just read the code — check `git blame` to see who wrote it and when. Check if there are tests. Check if there are comments. A function last touched 2 years ago with no tests is a different risk than one touched yesterday with full coverage.

## Report with evidence

Every finding must cite a specific file and line number. No vague claims like "the auth seems weak." Instead: "`app/api/invoices/route.ts:14` — no auth check before database query."

## Non-standard spots matter most

The interesting findings are where the code **deviates from its own patterns**. If 9 out of 10 API routes check auth, the 10th is the finding. Use Grep to verify consistency across similar files.

## Artifact format

All research reports follow this structure:

```markdown
# [Report Title] — [date]

## Summary
One paragraph: what was analyzed, key takeaway.

## Findings

### [Category]
1. **[file:line]** — Description. Evidence: [what you observed].

## Statistics
| Metric | Count |
|--------|-------|
| ...    | ...   |

## Recommended next steps
- ...
```
