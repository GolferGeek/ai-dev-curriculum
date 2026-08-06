# AI program contract

This contract makes program documents predictable for humans and agents.

## Required header

Every normative category, node, or decision should identify:

```yaml
status: draft | active | restricted | superseded | retired
owner: accountable role or person
backup-owner: role or person
approved-by: role or decision record
last-reviewed: YYYY-MM-DD
next-review: YYYY-MM-DD
applies-to: organization | group | project list
evidence: links
supersedes: links or none
```

Markdown frontmatter is recommended but a clearly labeled table is acceptable.
Do not invent values. Missing information must be reported as a gap.

## Normative words

- **Must / must not:** required policy.
- **Should / should not:** default; deviations need a reason.
- **May:** allowed option.
- **Example:** illustration, not policy.
- **Proposal:** not active until reviewed and merged.

Agents must not turn descriptive language, a slide, or vendor guidance into an
organizational requirement.

## Evidence hierarchy

Prefer:

1. Law, contract, client, security, and compliance requirements.
2. Approved internal decisions and measured internal results.
3. Official specifications and vendor documentation.
4. Reproducible evaluations on the organization's workload.
5. Well-attributed external analysis.
6. Anecdotes and popularity signals.

Time-sensitive claims require a retrieval date. If current evidence conflicts
with policy, report the conflict and propose review; do not silently override.

## Answer contract

An agent answering from this program must:

1. State the applicable scope and current answer.
2. Cite the governing category or node and active decision record.
3. Include owner and freshness.
4. Identify known exceptions or conflicts.
5. Label inference and uncertainty.
6. Offer a next action when the program is incomplete or stale.

For a GRC question, the answer must also follow the
[GRC operating map](GRC-OPERATING-MAP.md): connect the authoritative approved
requirement to scope, risk tier, control/enforcement, evidence, owner/approver,
exception or residual-risk decision, and freshness. A missing link must be
reported as a gap and affected restriction, not smoothed over as compliance.

## Change contract

Policy changes require:

- a stated trigger and problem;
- affected scopes and consumers;
- options and tradeoffs;
- evidence and uncertainty;
- security, cost, migration, and rollback impact;
- proposed document and capability diffs;
- owner, approver, review date, and outcome measure; and
- a PR or equivalent review record.

Editorial clarification may be small, but it still must not change meaning
without review.

## Definition of ready

A category or node is ready only when a new developer and an agent reach the same answer
without relying on private chat history. A policy with no owner, source,
effective scope, or review trigger is unfinished. A GRC assertion is unfinished
when the program cannot trace the governing requirement to implemented control,
durable evidence, approval or exception authority, and freshness.

## Folder contract

The AI Program hierarchy is folder-backed. Every category and subcategory
folder must contain a `README.md` that serves as the folder-level page for
repository browsing, documentation sites, agents, and the AI Governance & GRC
application. Additional records may live beside that README or in deeper
folders.

Folder pages follow the same answer and authority rules as other program
documents. A readable explanation of a category is not a substitute for an
approved company stance, owner, evidence, or decision.
