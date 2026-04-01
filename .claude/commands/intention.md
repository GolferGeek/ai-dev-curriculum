---
description: Capture or refine an intention artifact (why, who, good/out of scope) as markdown aligned with phase intentions.
---

# /intention

When the user runs this command:

1. Determine the **phase**:
   - **Phase 00** — monorepo shell or product track A–D (see [docs/phase-00/README.md](../../docs/phase-00/README.md)).
   - **Phase 01** — SaaS killer app. Ask which target: **QuickBooks killer** (web), **Trello killer** (web), **Twitter killer** (iOS), **Facebook killer** (iOS), or **custom** (see [docs/phase-01/README.md](../../docs/phase-01/README.md)).
2. If a **provided** intention file exists for that choice (under `docs/phase-00/` or `docs/phase-01/`), read it and help them **restate, tighten, or extend**—not replace from scratch unless they ask.
3. For **custom SaaS killers** (phase 01), invoke the **saas-researcher** agent to help scope and draft the intention.
4. Output or update a markdown file under `docs/` (path they choose, e.g. `docs/artifacts/intention.md`) with clear sections: Why, Who, Demo-grade minimums, Out of scope, Success.

Use skill **prd-alignment** thinking: intention is the anchor for PRD and plan later.

Arguments: `$ARGUMENTS` — optional path, track letter (A–D), or SaaS killer name.
