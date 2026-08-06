# 4 — Quality Gates

*What must pass before AI-assisted work ships — and how standards grow when reviews find gaps? Taught in Phase 02.*

**Why this matters:** generation got cheap; understanding didn't. Gates catch what the agent got wrong; **living standards** make sure the same mistake can't pass twice.

Before selecting gates, assign the change a risk tier using
[11 — GRC Control Map](11-grc-control-map.md). The table below is the common
baseline; higher-risk work adds independent review, realistic-environment
evidence, rollback rehearsal, monitoring, stop conditions, and explicit human
approval.

## The gate (edit commands to match your stack)

| Gate | Command | Must pass before… |
|------|---------|-------------------|
| Build | `npm run build` | lint or tests |
| Lint | `npm run lint` | tests (when configured) |
| Tests | `npm run test` | verify or browser — on **first effort**, suite should include **unit**, **API/HTTP** (where the slice has routes), and **end-to-end** (e.g. Playwright), not a single smoke test |
| Verify | Challenge pass vs intention / demo-grade bar | browser or merge |
| Browser | Open the app, `/test-browser`, or computer use | any user-facing merge |
| Human review of the diff | — | any merge |

## Living standards

When a review finds a gap the gates missed, the finding gets **promoted into a written rule** (the passport, a PR checklist, or a lint rule) the same day. That's the whole mechanism — standards that compound.

| Question | Your answer |
|----------|-------------|
| Where do promoted rules live? (passport / PR template / lint config) | |
| Who approves a new org-wide rule? | |
| What would you refuse to merge even if CI is green? (write 2–3 lines) | |

## Policy lines

- The transcript is not the software: a green chat message proves nothing. Gates and a human review do.
- No one merges code they can't explain. If you can't explain it in 60 seconds, read it or rewrite it.
- **Scheduled runs:** same gates on cron — see [guardrails sheet G1 — Nightly hygiene](guardrails/01-nightly-hygiene-github-actions.md) (Tier 1 = build · lint · test; Tier 2 = agent PR, human merge).

## Owner

| Role | Name |
|------|------|
| Owns the gate commands and CI config | |
| Owns rule promotion after reviews | |
