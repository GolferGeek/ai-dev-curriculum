# Change and freshness

Agentic development terrain changes quickly; organizational policy should not
change at the same speed without evidence.

## Cadence

| Review | Default cadence | Event triggers |
|---|---|---|
| Harnesses and models | Monthly | provider terms, model retirement, acquisition, security event, material capability change |
| Skills and agents | Monthly portfolio scan; quarterly recertification | upstream revision, permission change, tool-format change, poor outcome |
| Coding governance | Quarterly | incident, architecture change, quality regression, audit finding |
| Agent systems/protocols | Quarterly | specification release, identity/payment change, new counterparty |
| Security and data | Quarterly and after incidents | law/contract change, credential event, new data class |
| Delivery and quality | Monthly metrics; quarterly policy | gate failure trend, deployment incident, workflow change |
| Adoption and measurement | Monthly | role change, adoption stall, cost or productivity anomaly |

Clients may choose stricter cadences. Every facet records its actual dates.

## Modernization workflow

```text
detect → date and source the change → assess relevance
→ compare options and migration cost → pilot in a bounded scope
→ propose decision and diffs → human review → merge
→ regenerate/test → measure → keep, revise, or roll back
```

Use `terrain-review` for external toolchain change and `ai-program-advisor` for
cross-facet program review.

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
