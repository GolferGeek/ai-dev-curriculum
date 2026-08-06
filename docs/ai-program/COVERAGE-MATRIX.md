# AI program coverage matrix

This matrix defines the decision surface the organizational AI program must
cover. It is both a client discovery checklist and an acceptance test for
agent answers.

The curriculum supplies a reasoned baseline and the structure for each row.
Client-specific facts remain intentionally unassigned until discovery and
approval. An unassigned owner or unresolved decision must be reported as a gap,
not filled with a course assumption.

| Decision domain | The program must answer | Governing category or node | Required client artifacts |
|---|---|---|---|
| Purpose and scope | Why the program exists; who and which repositories it covers | [Direction and governance](01-direction-and-governance/README.md) | active scope, sponsor, outcome measures |
| Harnesses and interfaces | Which IDE, CLI, app, plugin, and execution modes are approved | [Harnesses and interfaces](02-technology-governance/01-harnesses-and-interfaces/README.md) | approved-harness decision, account/setup guide |
| Models and routing | Which providers/models may serve each workload and data class | [Models, providers, routing, and spend](02-technology-governance/02-models-providers-routing-and-spend/README.md) | routing decision, evaluation, fallback, spend controls |
| Data and privacy | What may be sent where; retention, training use, residency, and redaction | [Data, privacy, security, and confidentiality](03-risk-management/02-data-privacy-security-and-confidentiality/README.md) | data classification, provider review, exception path |
| GRC traceability | Which authoritative requirement applies; how scope, risk, control, evidence, ownership, exceptions, and freshness connect | [GRC operating map](GRC-OPERATING-MAP.md) plus the governing categories, nodes, and decisions | source register, requirement-to-control records, evidence locations, risk/exception decisions |
| Agent authority | What agents may read, write, execute, publish, deploy, message, or purchase | [Agent authority and human oversight](03-risk-management/03-agent-authority-and-human-oversight/README.md) | authority matrix, human-only actions, emergency stop |
| Coding workflow | Which artifacts and reviews precede implementation | [Intention-to-operation lifecycle](06-delivery-and-operations/01-intention-to-operation-lifecycle/README.md) | development policy, branch/PR rules |
| Architecture and dependencies | Supported stacks, boundaries, versions, licenses, and exceptions | [Architecture, dependencies, and portability](02-technology-governance/06-architecture-dependencies-and-portability/README.md) | architecture standards, dependency policy |
| Quality and release | Evidence that blocks or permits merge, deploy, and operation | [Quality and release gates](06-delivery-and-operations/02-quality-and-release-gates/README.md) | risk tiers, CI gates, release and rollback policy |
| Brownfield work | How agents investigate existing systems before changing them | [Brownfield research and change planning](06-delivery-and-operations/03-brownfield-research-and-change-planning/README.md) | research checklist, evidence locations |
| Skills and agents | What reusable capabilities exist; how they are organized and invoked | [Skills and specialized agents](02-technology-governance/03-skills-and-specialized-agents/README.md) | inventory, taxonomy, trigger tests |
| Capability trust | How external skills/agents are evaluated, approved, published, and retired | [Skills and specialized agents](02-technology-governance/03-skills-and-specialized-agents/README.md) and [third-party risk](03-risk-management/04-third-party-and-supply-chain-risk/README.md) | provenance, review evidence, owner, lifecycle state |
| Harness portability | How canonical skills/agents become each tool's supported format | [Functional organization](02-technology-governance/03-skills-and-specialized-agents/11-functional-organization.md) and [Agent portability](02-technology-governance/03-skills-and-specialized-agents/12-agent-portability.md) | canonical `ai/`, generator, passing projection checks |
| Tools and MCP | Which tool/resource integrations are allowed and with what permissions | [Tools, plugins, APIs, and MCP](02-technology-governance/04-tools-plugins-apis-and-mcp/README.md) | server inventory, permission and data-flow review |
| A2A and counterparties | When independent delegation is allowed; identity, trust, tasks, disputes | [Protocols, counterparties, and payments](02-technology-governance/05-protocols-counterparties-and-payments/README.md) | protocol/version decision, counterparty policy, conformance evidence |
| Agent payments | Who is represented; mandates, limits, confirmation, settlement, recourse | [Protocols, counterparties, and payments](02-technology-governance/05-protocols-counterparties-and-payments/README.md) | authority and payment policy, audit and reconciliation |
| Observability and incidents | What is logged; how failures are detected, stopped, investigated, and recovered | [Observability, incidents, and learning](06-delivery-and-operations/05-observability-incidents-and-learning/README.md) | telemetry/retention policy, incident and rollback runbooks |
| GitHub and automation | Which scheduled or event-driven agents may run and what they may change | [Automation and autonomous operations](06-delivery-and-operations/06-automation-and-autonomous-operations/README.md) | automation identity, permissions, approval and branch rules |
| Roles and exceptions | Who owns, approves, supports, and recertifies each decision | [Roles, ownership, and decision rights](01-direction-and-governance/03-roles-ownership-and-decision-rights/README.md) | named role map, exception process, review calendar |
| AI culture and behavior | Which human behaviors, incentives, challenge, non-use, and leadership expectations make AI use trustworthy | [Cultural principles and desired behaviors](07-program-evolution/06-adoption-outcomes-and-improvement/01-cultural-principles-and-desired-behaviors/README.md) | approved principles, examples, incentives, leader commitments |
| Workforce and learning | Who is affected, how roles and burden change, and which demonstrated abilities and support are required | [Workforce experience and role impacts](07-program-evolution/06-adoption-outcomes-and-improvement/02-workforce-experience-and-role-impacts/README.md) and [AI literacy, training, and coaching](07-program-evolution/06-adoption-outcomes-and-improvement/03-ai-literacy-training-and-coaching/README.md) | impact assessment, consultation, competency matrix, training and support evidence |
| Psychological safety | How people challenge, stop, decline, disclose, or escalate AI-assisted work without retaliation | [Psychological safety and escalation](07-program-evolution/06-adoption-outcomes-and-improvement/04-psychological-safety-and-escalation/README.md) | channels, response owners, service levels, anti-retaliation controls, closure evidence |
| Sentiment and listening | What experience evidence may be collected, for which purpose, with which privacy and prohibited-use boundaries | [Sentiment, listening, and privacy](07-program-evolution/06-adoption-outcomes-and-improvement/06-sentiment-listening-and-privacy/README.md) | approved method, notice, data flow, cohort rules, retention, limitations, follow-through |
| Outcomes and cost | Whether the program improves trusted delivery and human outcomes rather than activity | [Adoption, outcomes, and improvement](07-program-evolution/06-adoption-outcomes-and-improvement/07-adoption-outcomes-and-improvement/README.md) | baseline, balanced scorecard, distribution, cost, quality, workforce and customer trends |
| Program scale | Which canonical nodes are shown and required initially, why exclusions are currently appropriate, and which triggers expand scope | [AI Program profiles](PROGRAM-PROFILES.md) | approved profile decision, rationale, excluded concerns, owner, review date, expansion triggers |
| Change and modernization | How terrain is detected, assessed, piloted, adopted, rejected, and rolled back | [Program evolution](07-program-evolution/README.md) | watchlist, dated evidence, decision records |

## Coverage rule

Each row is complete only when an agent can cite an active client decision,
scope, owner, evidence, last review, next review, exceptions, and validation.
For a GRC question, the agent must also connect the authoritative requirement to
its risk tier, implemented control, evidence, approver, and any bounded
exception. The course baseline is not a substitute for those client facts.

Use [query acceptance scenarios](08-program-intelligence/QUERY-ACCEPTANCE.md) to test retrieval and
answer behavior after client customization.
