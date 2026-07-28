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

Use when several facets interact:

```text
Should this capability be a skill, specialized agent, MCP integration, or A2A
service? Compare the current skills, agent-systems, security, and coding-
governance policies. Cite each relevant decision.
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

## Useful questions by facet

| Facet | Questions |
|---|---|
| Harnesses/models | Which interfaces and providers are approved? How is work routed? What is the fallback? |
| Coding governance | What may an agent edit? What requires human approval? Which checks block merge? |
| Skills/agents | Do we already have this function? Where is canonical source? Who owns the revision? |
| Agent systems | Is this a tool call or independent counterparty? How are identity, authority, and audit handled? |
| Security/data | What data, secrets, commands, network, and environments are allowed? |
| Delivery/quality | Which artifacts and evidence are required before build, merge, deploy, and operate? |
| Adoption/measurement | Who owns the practice? Are outcomes improving? What is stale or unused? |

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

## Next action
...
```

If documents disagree, do not average them. Report the conflict, use the
precedence rules, and route the question to the named owner.

## Privacy

Do not paste secrets, customer data, or private incident material into a query
unless the selected harness and model are approved for that data. Link to
controlled evidence where possible.
