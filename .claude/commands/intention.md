---
description: Capture or refine an intention artifact (why, who, good/out of scope) as markdown aligned with docs/phase-00 intentions.
---

# /intention

When the user runs this command:

1. Ask which artifact they’re driving: **monorepo shell** ([intention-monorepo.md](../../docs/phase-00/intention-monorepo.md)) or a **product track** (A–D in [docs/phase-00/README.md](../../docs/phase-00/README.md)).
2. If they’re starting from a **provided** intention file, read it and help them **restate, tighten, or extend**—not replace from scratch unless they ask.
3. Output or update a markdown file under `docs/` (path they choose, e.g. `docs/artifacts/intention.md`) with clear sections: Why, Who, Good, Out of scope, Success.

Use skill **prd-alignment** thinking: intention is the anchor for PRD and plan later.

Arguments: `$ARGUMENTS` — optional path or track letter (A–D).
