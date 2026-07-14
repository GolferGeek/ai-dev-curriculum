# 5 — Human Decision Boundaries

*What may agents do alone, with approval, or never? Taught in Phase 01 (talk D01-2) and reinforced by Phase 04's authorize-before-act pattern.*

**Why this matters:** autonomy is a ladder, not a switch. Every action an agent can take belongs in one of three columns — and an accountable human is named for the boundary, because "the agent was mostly right" is not a defense.

## The one-pager (sort your own actions into the columns)

| Agent may (no approval) | Agent must ask first | Human only |
|------------------------|----------------------|------------|
| Read code, search, explain | Edit code beyond the task's scope | Deploy to production |
| Draft code, tests, docs | Add or upgrade dependencies | Spend money / place orders |
| Run build, lint, tests | Run DB migrations on shared envs | Email or message customers |
| Propose plans and diffs | Delete files or branches | Sign off on the final merge |
| | | Handle secrets and credentials |

Blank rows to fill in from *your* business (refunds? discounts? vendor orders? customer data exports?):

| Agent may | Agent must ask | Human only |
|-----------|----------------|------------|
| | | |
| | | |

## Policy lines

- Approvals are explicit and logged — a shrug in chat is not an authorization.
- The accountable human for an agent's change is the person who merged it.
- Revisit the columns quarterly: actions migrate left as trust and verification mature — deliberately, not by drift.

## Owner

| Role | Name |
|------|------|
| Owns this one-pager and arbitrates edge cases | |
