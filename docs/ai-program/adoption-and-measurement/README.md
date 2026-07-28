# Adoption and measurement

status: draft
owner: UNASSIGNED
last-reviewed: 2026-07-28
next-review: 2026-08-28
applies-to: organization

This facet governs people, roles, learning, support, outcomes, and the
continuous improvement of the AI development program.

## Roles

| Role | Accountability |
|---|---|
| Executive sponsor | Outcomes, resources, risk posture |
| AI program owner | Program coherence, owners, cadence, escalation |
| Developer practice lead | Coding workflow, training, quality evidence |
| Security/data owner | Data, provider, authority, and incident decisions |
| Capability steward | Canonical skills/agents, publication, lifecycle |
| Model/tool evaluator | Workload tests, routing recommendations, watchlist |
| Coaches/champions | Local help, feedback, examples |
| Developers | Responsible use, verification, escalation, improvement proposals |

One person may hold several roles in a small company, but the accountabilities
must remain explicit.

## Adoption ladder

```text
aware → set up → guided use → independently effective
→ contributes improvements → coaches others
```

Do not measure adoption only by seats, prompts, or generated lines.

## Outcome measures

Balance:

- cycle time and time to first verified slice;
- review time, rework, escaped defects, incidents, and rollback;
- developer comprehension and ability to explain changes;
- test and evidence quality;
- model/tool cost and latency;
- policy exceptions and security findings;
- capability trigger precision, use, and retirement;
- developer confidence, frustration, and support demand; and
- business/customer outcomes appropriate to the product.

## Operating rituals

- Monthly program health and terrain review.
- Monthly model/tool and capability portfolio checks.
- Quarterly policy and owner recertification.
- After-action review for incidents and meaningful failed experiments.
- Bounded pilots with explicit pass, fail, migration, and rollback.
- Regular office hours and examples drawn from real work.

## Ask this facet

- Who owns this decision and who can approve an exception?
- Which teams need training or support?
- Are faster builds producing trusted outcomes?
- Which capabilities are useful, unused, conflicting, or ownerless?
- What should we pilot, integrate, defer, or retire?
- Which program document is stale?

## Review triggers

Re-review on ownership changes, adoption stalls, cost anomalies, quality
regression, major incidents, repeated exceptions, or evidence that the program
optimizes activity rather than outcomes.
