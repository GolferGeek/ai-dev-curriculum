---
status: draft
owner: UNASSIGNED
backup-owner: UNASSIGNED
approved-by: UNASSIGNED
last-reviewed: 2026-08-06
next-review: 2026-09-06
applies-to: organization
evidence: []
supersedes: none
---

# Change and freshness

Agentic development terrain changes quickly; organizational policy should not
change at the same speed without evidence.

## Cadence

| Review | Default cadence | Event triggers |
|---|---|---|
| Direction and governance | Quarterly | strategy, scope, authority, owner, policy, or oversight change |
| Technology governance | Monthly terrain scan; quarterly recertification | provider terms, model retirement, capability or permission change, protocol release, architecture change |
| Risk management | Quarterly and after incidents | new data class, authority change, threat, counterparty change, control failure |
| Compliance and obligations | Quarterly or source-defined | law, contract, client obligation, regulatory interpretation, or audit-criteria change |
| Controls and assurance | Monthly evidence review; quarterly control review | failed test, missing evidence, audit finding, repeated exception, remediation |
| Delivery and operations | Monthly metrics; quarterly policy review | gate trend, deployment incident, workflow change, recovery failure |
| Program evolution | Monthly | terrain change, ownership lapse, stale decision, capability drift, outcome anomaly |
| Program intelligence | Monthly acceptance run | retrieval failure, misleading answer, citation defect, conflict, stale finding logic |

Clients may choose stricter cadences. Every category and normative node records its actual dates.

## Modernization workflow

```text
detect → date and source the change → assess relevance
→ compare options and migration cost → pilot in a bounded scope
→ propose decision and diffs → human review → merge
→ regenerate/test → measure → keep, revise, or roll back
```

Use `terrain-review` for external toolchain change and `ai-program-advisor` for
cross-program review.

## What agents may do

Without additional authority, an agent may:

- read the program and linked evidence;
- identify missing, conflicting, or stale statements;
- compare current official sources and internal results;
- draft a decision record and document diff;
- identify affected skills, agents, rules, code, and training; and
- propose validation, migration, and rollback.

An agent must not:

- declare a proposal active;
- change model/provider approval, data policy, publication authority, or
  production boundaries silently;
- rewrite history instead of superseding a decision;
- install tools or capabilities merely because research favors them; or
- cite an undated ecosystem count as durable policy.

## Staleness states

- **Current:** reviewed on schedule and no trigger detected.
- **Review due:** date reached; current policy remains active unless unsafe.
- **Event-triggered review:** external or internal change affects assumptions.
- **Restricted pending review:** risk requires narrower use.
- **Superseded:** a newer active decision replaces it.
- **Retired:** no longer applicable; history remains.

## Pull-request checklist

- [ ] Trigger and affected scope are clear.
- [ ] Current and proposed states are separated.
- [ ] Evidence is dated and reproducible where possible.
- [ ] Security, data, cost, migration, compatibility, and rollback are covered.
- [ ] Owners and approvers are named.
- [ ] Conflicting and superseded records are linked.
- [ ] Canonical capabilities change with policy when required.
- [ ] All projections and tests pass.
- [ ] A review date and outcome measure are set.
