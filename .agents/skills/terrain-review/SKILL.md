---
description: Run a terrain review — ADAPT worksheet for a candidate, watchlist refresh, or drift audit. One workflow in the monorepo operating model (documents + skills).
---

# /terrain-review

**Input:** Optional mode and target:
- No args — full terrain review (default)
- `assess "<candidate>"` — ADAPT worksheet for one tool/pattern
- `watchlist` — review watchlist entries only (overdue dates, stale items)

**Output:** Report at `docs/artifacts/terrain-review-report.md` (and optional draft in `docs/ai-program/07-program-evolution/02-proposals-decisions-and-supersession/` when assessing a candidate).

When the user runs this command:

1. **Ensure `docs/ai-program/` exists.** If missing, tell the user to create it from the [adoption kit](../../../../marketing/adoption-kit/README.md) and [AI-CHANGE-PROCESS.md](../../../../docs/AI-CHANGE-PROCESS.md). Do not invent company policy — use placeholders only if they ask for a scaffold.

2. **Invoke the terrain-scout agent** with the user's mode:
   - **Full review:** read watchlist, recent decisions, harness policy (`01-harness-and-plan.md`), routing/spend (`06-routing-and-spend.md` if present), `.claude/` layout, and phase README freshness. Flag drift (stale model IDs, broken paths, expired examples).
   - **`assess "<candidate>"`:** produce a complete **ADAPT** worksheet with recommended verdict (`integrate` / `track` / `reject`) and draft decision filename `docs/ai-program/07-program-evolution/02-proposals-decisions-and-supersession/YYYY-MM-DD-<slug>.md` for human edit — **do not merge without user approval**.
   - **`watchlist`:** list overdue review dates, entries older than 90 days without ADAPT, duplicates.

3. **Apply scout tempering in the report:**
   - Call out if this is likely the "fourth cool thing" without finishing prior migrations.
   - Separate **process change** cost from **product development** opportunity.
   - Recommend **Track** when signal is real but price is high.

4. **Write** `docs/artifacts/terrain-review-report.md` with sections:
   - Summary (3 bullets)
   - Drift / staleness findings (if full review)
   - Watchlist hygiene
   - ADAPT recommendation(s)
   - Suggested next actions (human-owned)

5. Tell the user the report path and whether a draft decision file was prepared.

## Example usage

```
/terrain-review
/terrain-review watchlist
/terrain-review assess "switch primary harness to Codex"
/terrain-review assess "new MCP server for Linear"
```

Arguments: `$ARGUMENTS`

## See also

- [docs/MONOREPO-OPERATING-MODEL.md](../../../../docs/MONOREPO-OPERATING-MODEL.md)
- [docs/AI-CHANGE-PROCESS.md](../../../../docs/AI-CHANGE-PROCESS.md)
- [marketing/adoption-kit/08-terrain-review.md](../../../../marketing/adoption-kit/08-terrain-review.md)
