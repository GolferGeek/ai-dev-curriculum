---
description: Review a provided intention file or create a new one — outputs a refined intention markdown ready for /prd.
---

# /intention

**Input:** A provided intention file path, or a description of what to build.
**Output:** A refined intention file at the path the user specifies.

When the user runs this command:

1. **If they provide a file path** (e.g. `/intention docs/phase-01/intention-quickbooks-killer.md`):
   - Read that file.
   - Walk through it with the user: Is the "Why" clear? Is "Who it's for" specific enough? Are the Demo-grade minimums achievable in the time budget? Are the out-of-scope items explicit enough?
   - Help them **restate, tighten, or extend** — not replace from scratch unless they ask.
   - Write the refined version to `docs/artifacts/intention.md` (or a path they specify).

2. **If they provide a description instead** (e.g. `/intention "a personal budgeting app"`):
   - For phase 01, invoke the **saas-researcher** agent to help scope and draft.
   - Produce an intention file with sections: **Why this exists**, **Who it's for**, **Demo-grade minimums**, **Out of scope**, **Success**.
   - Write to `docs/artifacts/intention.md` (or a path they specify).

3. **If they provide nothing**, ask: "Which intention file should I review?" and list the available ones for the current phase.

**The output file is what `/prd` will read next.** Tell the user the exact path so they can pass it to `/prd`.

## Phase 00 intention files

- `docs/phase-00/intention-monorepo.md` — Turbo monorepo
- `docs/phase-00/intention-http-workspace.md` — Track A
- `docs/phase-00/intention-team-wiki.md` — Track B
- `docs/phase-00/intention-pipeline-crm.md` — Track C
- `docs/phase-00/intention-ops-pulse.md` — Track D

## Phase 01 intention files

- `docs/phase-01/intention-quickbooks-killer.md` — Web A
- `docs/phase-01/intention-trello-killer.md` — Web B
- `docs/phase-01/intention-twitter-killer.md` — iOS A
- `docs/phase-01/intention-facebook-killer.md` — iOS B

## Example usage

```
/intention docs/phase-00/intention-monorepo.md
/intention docs/phase-01/intention-quickbooks-killer.md
/intention "a habit tracking app"
```

Arguments: `$ARGUMENTS` — path to an intention file, or a description of what to build.
