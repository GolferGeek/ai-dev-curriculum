# 4 — Quality Gates

*What must pass before AI-assisted work ships — and how standards grow when reviews find gaps? Taught in Phase 02.*

**Why this matters:** generation got cheap; understanding didn't. Gates catch what the agent got wrong; **living standards** make sure the same mistake can't pass twice.

## The gate (edit commands to match your stack)

| Gate | Command | Must pass before… |
|------|---------|-------------------|
| Build | `npm run build` | any commit |
| Lint | `npm run lint` | any commit |
| Tests | `npm run test` | any commit |
| Human review of the diff | — | any merge |
| Browser / flow verification | manual or Playwright | any user-facing change |

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

## Owner

| Role | Name |
|------|------|
| Owns the gate commands and CI config | |
| Owns rule promotion after reviews | |
