# 6 — Routing & Spend

*Which model for which job, what does it cost, and who watches the bill? Taught in Phase 06 (talks D06-1 through D06-4); seeded in Phase 00.*

**Why this matters:** leaving every task on a frontier model is convenient and expensive. Routing routine work to cheaper models often saves most of the token bill — but only with a written policy and a way to measure escalations. Model names and prices rotate; the *policy* is what compounds.

## Route table (fill in current model names before publishing)

| Tier | Model (today) | Use for | Escalate when |
|------|---------------|---------|---------------|
| Cheap / fast | | file navigation, lint fixes, summaries, boilerplate | output fails schema, lint, or tests |
| Mid | | routine implementation, test writing, refactors | verification fails twice, or task touches auth/data |
| Frontier | | architecture, security-sensitive code, hard debugging | — |

## Golden prompts

Five to ten prompts from **your** real work, used to re-test models whenever a vendor ships a new "best" one. Leaderboards measure someone else's workload; the golden set measures yours.

1. …
2. …
3. …

## Spend

| Question | Your answer |
|----------|-------------|
| Who sees the AI bill, and how often? | |
| Weekly cap or alert threshold per developer / project | |
| Are parallel sessions and subagents budgeted? (They multiply burn.) | |
| Workloads that must stay local / on contracted ZDR (privacy tier) | |

## Owner

| Role | Name |
|------|------|
| Owns the route table and re-runs golden prompts on new models | |
| Owns spend visibility and caps | |
