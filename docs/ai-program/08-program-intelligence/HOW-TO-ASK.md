# How to ask the AI program

Use this directory as a decision system, not merely a reading list.

## Four modes

### Ask

Use when you need the current answer:

```text
Using docs/ai-program, what models may this project use with customer data?
Give the governing files, scope, owner, last review, exceptions, and any gap.
Do not propose a new policy unless the current program cannot answer.
```

### Compare

Use when several categories interact:

```text
Should this capability be a skill, specialized agent, MCP integration, or A2A
service? Compare technology governance, risk management, controls and
assurance, and applicable decisions. Cite each relevant source.
```

### Trace a GRC requirement

Use when the answer must connect an obligation to operational proof:

```text
Using docs/ai-program and the GRC operating map, trace the approved requirement
that governs this customer-data change. Show applicable scope, risk tier,
control and enforcement surface, required evidence and location, owner and
approver, any current exception, and freshness. If any link is missing, say
what must remain restricted and who must resolve it. Do not interpret law or
contract language yourself.
```

### Assess

Use when terrain may have changed:

```text
Assess whether our approved harness and model-routing policy is stale.
Check dated evidence, internal evaluations, provider changes, migration cost,
and affected controls. Produce findings; do not edit policy.
```

### Propose or update

Use only when a reviewed change is desired:

```text
Prepare a modernization proposal for the model policy. Preserve current policy
until approval. Draft the decision record, affected document diffs, capability
changes, migration, rollback, owner, and validation plan.
```

## Useful questions by category

| Category | Questions |
|---|---|
| Direction and governance | Why does the program exist? Where does it apply? Who owns and may decide or approve? |
| Technology governance | Which interfaces, models, capabilities, integrations, and protocols are approved for this workload? |
| Risk management | Which risk tier, data boundary, authority limit, treatment, and residual-risk decision apply? |
| Compliance and obligations | Which approved source and interpretation govern this system, data, action, or client? |
| Controls and assurance | Which control implements the requirement, where is it enforced, and what proves it operated? |
| Delivery and operations | Which artifacts, gates, review, rollback, monitoring, and stop conditions are required? |
| Program evolution | What changed, what is due for review, which capability or owner needs recertification, what does approved culture and sentiment evidence show, and are outcomes improving? |
| Program intelligence | How healthy is the program? What is missing, stale, conflicting, unsupported, or restricted? |

## Expected answer shape

```markdown
## Current answer
...

## Applies to
...

## Governing sources
- file — active decision, owner, last reviewed

## Exceptions and conflicts
...

## Freshness and uncertainty
...

## Requirement-to-control trace (when applicable)
- Requirement and approved source
- Scope and risk tier
- Control and enforcement surface
- Evidence and location
- Owner, approver, and exception
- Last/next review and triggers

## Next action
...
```

If documents disagree, do not average them. Report the conflict, use the
precedence rules, and route the question to the named owner.

## Culture, sentiment, and profile questions

```text
Assess our AI culture using only approved aggregate evidence. Show cultural
principles, workforce impacts, learning, psychological safety, sentiment
limitations, outcomes, owners, freshness, and missing information. Do not
infer individual emotion, intent, or performance.
```

```text
Which AI Program profile is selected and why? Show excluded concerns and
expansion triggers. If the requested system, data, authority, obligation, or
workforce impact triggers a hidden node, include it and recommend profile
reassessment rather than treating it as out of scope.
```

## Privacy

Do not paste secrets, customer data, or private incident material into a query
unless the selected harness and model are approved for that data. Link to
controlled evidence where possible. Do not ask the program agent to infer an
individual's emotion, attitude, protected characteristic, intent, or job
performance from messages, activity logs, or survey text.
