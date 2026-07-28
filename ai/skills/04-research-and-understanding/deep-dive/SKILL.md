---
description: Specialist deep-dive — focus on frontend, backend, data layer, or a specific area of the codebase.
---

# /deep-dive

**Input:** Required area argument: `frontend`, `backend`, `data`, or a specific path.
**Output:** Deep-dive report at `docs/artifacts/deep-dive-report.md`.

When the user runs this command:

1. Invoke the **repo-researcher** agent with task "deep-dive" and the specified area.

2. Based on the area, the agent applies a specialist lens on the **full repo**:
   - **frontend** — component tree, state management, routing structure, client/server split, accessibility patterns, design system usage
   - **backend** — API routes, middleware chain, auth flow, error handling strategy, server actions, background jobs
   - **data** — schema inventory, access control rules, query patterns, validation layers, migration history, data relationships
   - **[path]** — everything in that directory: structure, patterns, dependencies, entry points, test coverage, notable code

3. This is a specialist lens on the full repo, not a partial read. The agent traces how the chosen area connects to the rest of the system.

4. The agent does **not** modify anything — it only reports.

5. Write the report to `docs/artifacts/deep-dive-report.md`.

6. Tell the user:
   - Key findings for the chosen area
   - The path to the full report
   - Suggest `/author-agent` if they want to codify a pattern they observe into a reusable agent or skill

## Example usage

```
/deep-dive frontend             # frontend specialist analysis
/deep-dive backend              # backend specialist analysis
/deep-dive data                 # data layer specialist analysis
/deep-dive apps/quickbooks-killer/src/lib  # deep-dive on a specific path
```

Arguments: `$ARGUMENTS` — required area (frontend, backend, data, or path).
