# 8 — Terrain Review & ADAPT

*How does the team handle new AI tools and patterns without chasing every launch or freezing in place? Taught in Phase 00 (scout + tempering). One **decision workflow** in the [monorepo operating model](../../docs/MONOREPO-OPERATING-MODEL.md); details in [AI-CHANGE-PROCESS.md](../../docs/AI-CHANGE-PROCESS.md) + `/terrain-review`.*

**Why this matters:** the harness, models, and agent patterns rotate fast. A **named process** beats heroics — and beats pivoting every time someone says "woo, cool thing."

## ADAPT (copy to `docs/ai-program/decisions/` when you decide)

| Step | Your notes |
|------|------------|
| **Assess** — What is it? What problem for *us*? | |
| **Price** — Migration cost, abandoned work, team attention? Fourth cool thing this week? | |
| **Pilot** — Time-box, branch/sandbox, success criteria | |
| **Integrate** — What files change? (passport, harness policy, skills, eval roster) | |
| **Track** — If deferring: review date + owner | |

**Verdict:** integrate · track · reject  
**Decision owner:**  
**Decision date:**

## Ritual

| Question | Your answer |
|----------|-------------|
| Terrain review cadence (monthly / quarterly) | |
| Who owns `/terrain-review`? | |
| Where does the watchlist live? (default: `docs/ai-program/watchlist.md`) | |
| Where do decisions live? (default: `docs/ai-program/decisions/`) | |
| What triggers an out-of-cycle ADAPT? (e.g. harness change, new data policy) | |

## Watchlist (starter — edit `docs/ai-program/watchlist.md`)

| Candidate | Spotted | Review on | Owner | One-line why |
|-----------|---------|-----------|-------|--------------|
| | | | | |
| | | | | |

## Policy lines (edit, then publish)

- Scout signals go through **ADAPT**; no team-wide harness switch without a merged decision file.
- **Integrate** changes happen via PR to `docs/ai-program/` and `.claude/` — not silent installs.
- **Track** items get a review date; expired dates get ADAPT or delete.
- Terrain review re-checks adoption kit pieces **1** (harness/plan) and **6** (routing/spend) every run.

## Owner

| Role | Name |
|------|------|
| Owns terrain review cadence and watchlist hygiene | |
| Approves Integrate verdicts ( harness / spend ) | |
