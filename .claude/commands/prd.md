---
description: Produce or update a PRD from the current intention — requirements, non-goals, success criteria, open questions.
---

# /prd

When the user runs this command:

1. Load the **active intention** (from `docs/` or the file they specify). If missing, stop and ask them to run `/intention` or point to [docs/phase-00/](../../docs/phase-00/).
2. Draft a **PRD** with: summary, goals, non-goals, success criteria, open questions / assumptions.
3. Cross-check against the intention: every goal should trace to “why” in the intention; flag gaps.
4. Write or update `docs/artifacts/prd.md` (or path they give).

Encourage one **challenge pass**: “What’s missing or wrong if we ship this PRD as-is?”

Arguments: `$ARGUMENTS` — optional path to intention or output file.
