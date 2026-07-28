# AI program coverage matrix

This matrix defines the decision surface the organizational AI program must
cover. It is both a client discovery checklist and an acceptance test for
agent answers.

The curriculum supplies a reasoned baseline and the structure for each row.
Client-specific facts remain intentionally unassigned until discovery and
approval. An unassigned owner or unresolved decision must be reported as a gap,
not filled with a course assumption.

| Decision domain | The program must answer | Governing facet | Required client artifacts |
|---|---|---|---|
| Purpose and scope | Why the program exists; who and which repositories it covers | [Adoption and measurement](adoption-and-measurement/README.md) | active scope, sponsor, outcome measures |
| Harnesses and interfaces | Which IDE, CLI, app, plugin, and execution modes are approved | [Harnesses and models](harnesses-and-models/README.md) | approved-harness decision, account/setup guide |
| Models and routing | Which providers/models may serve each workload and data class | [Harnesses and models](harnesses-and-models/README.md) | routing decision, evaluation, fallback, spend controls |
| Data and privacy | What may be sent where; retention, training use, residency, and redaction | [Security and data](security-and-data/README.md) | data classification, provider review, exception path |
| Agent authority | What agents may read, write, execute, publish, deploy, message, or purchase | [Coding governance](coding-governance/README.md) and [Security and data](security-and-data/README.md) | authority matrix, human-only actions, emergency stop |
| Coding workflow | Which artifacts and reviews precede implementation | [Coding governance](coding-governance/README.md) | development policy, branch/PR rules |
| Architecture and dependencies | Supported stacks, boundaries, versions, licenses, and exceptions | [Coding governance](coding-governance/README.md) | architecture standards, dependency policy |
| Quality and release | Evidence that blocks or permits merge, deploy, and operation | [Delivery and quality](delivery-and-quality/README.md) | risk tiers, CI gates, release and rollback policy |
| Brownfield work | How agents investigate existing systems before changing them | [Delivery and quality](delivery-and-quality/README.md) | research checklist, evidence locations |
| Skills and agents | What reusable capabilities exist; how they are organized and invoked | [Skills and agents](skills/README.md) | inventory, taxonomy, trigger tests |
| Capability trust | How external skills/agents are evaluated, approved, published, and retired | [Skills and agents](skills/README.md) and [Security and data](security-and-data/README.md) | provenance, review evidence, owner, lifecycle state |
| Harness portability | How canonical skills/agents become each tool's supported format | [Functional organization](skills/11-functional-organization.md) and [Agent portability](skills/12-agent-portability.md) | canonical `ai/`, generator, passing projection checks |
| Tools and MCP | Which tool/resource integrations are allowed and with what permissions | [Agent systems](agent-systems/README.md) and [Security and data](security-and-data/README.md) | server inventory, permission and data-flow review |
| A2A and counterparties | When independent delegation is allowed; identity, trust, tasks, disputes | [Agent systems](agent-systems/README.md) | protocol/version decision, counterparty policy, conformance evidence |
| Agent payments | Who is represented; mandates, limits, confirmation, settlement, recourse | [Agent systems](agent-systems/README.md) | authority and payment policy, audit and reconciliation |
| Observability and incidents | What is logged; how failures are detected, stopped, investigated, and recovered | [Delivery and quality](delivery-and-quality/README.md) and [Security and data](security-and-data/README.md) | telemetry/retention policy, incident and rollback runbooks |
| GitHub and automation | Which scheduled or event-driven agents may run and what they may change | [Guardrails](guardrails/README.md) and [Coding governance](coding-governance/README.md) | automation identity, permissions, approval and branch rules |
| Roles and exceptions | Who owns, approves, supports, and recertifies each decision | [Adoption and measurement](adoption-and-measurement/README.md) | named role map, exception process, review calendar |
| Outcomes and cost | Whether the program improves trusted delivery rather than activity | [Adoption and measurement](adoption-and-measurement/README.md) | baseline, scorecard, cost and quality trends |
| Change and modernization | How terrain is detected, assessed, piloted, adopted, rejected, and rolled back | [Change and freshness](CHANGE-AND-FRESHNESS.md) | watchlist, dated evidence, decision records |

## Coverage rule

Each row is complete only when an agent can cite an active client decision,
scope, owner, evidence, last review, next review, exceptions, and validation.
The course baseline is not a substitute for those client facts.

Use [query acceptance scenarios](QUERY-ACCEPTANCE.md) to test retrieval and
answer behavior after client customization.
