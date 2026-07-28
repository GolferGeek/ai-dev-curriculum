# The agent-to-agent future

## This is the most important transition in the course

AI development is moving beyond a person chatting with one assistant. People and organizations will be represented by persistent agents that discover one another, exchange goals and evidence, negotiate within policy, transact, and return to an ongoing relationship.

Every company will need an answer to a new question:

> What happens when the visitor, candidate, customer, supplier, or partner at our front door is an agent?

This is not a prediction that humans disappear. It is a prediction that routine discovery, qualification, coordination, purchasing, support, and follow-up increasingly happen between authorized software actors, with humans setting intent and taking the consequential decisions.

## The first rung: make the web agent-readable

The easiest improvement is content negotiation for agents:

- Return clean Markdown or structured content when requested.
- Preserve canonical URLs, provenance, timestamps, and contact paths.
- Separate facts from marketing presentation.
- Publish machine-readable capabilities and policies.
- Make permission, price, rate limits, and escalation paths explicit.

That removes the visual “fluff” an agent otherwise has to scrape from a human interface. It is useful, but it is only the first rung. A document endpoint cannot negotiate delivery, ask a qualifying question, maintain a task, or represent a company’s authority.

## The larger shift: companies become participants

Imagine a vendor and customer whose agents maintain the relationship:

1. “Your invoice is ready.”
2. “Does it match purchase order 4817?”
3. “Yes; here are the line-item reconciliation and delivery evidence.”
4. “It is within policy. Submit it for payment.”
5. “Payment received.”
6. “We need ten replacement widgets by Friday.”
7. “Here are two compliant options.”
8. “Order the approved option.”
9. “The widgets are on the way.”

This exchange contains more than API calls. It contains identity, delegated authority, context, negotiation, commitments, payment, fulfillment, exceptions, and an audit trail. Agent-to-agent protocols are rails for the conversation; the business still owns the policies and consequences.

## MCP and A2A: tools versus delegated actors

“MCP is one-way and A2A is two-way” is a useful instinct but not technically precise. MCP supports notifications, streaming, elicitation, sampling, and other bidirectional behavior.

The durable distinction is the relationship:

| MCP | A2A |
|---|---|
| Connects an AI application to tools, data, prompts, and resources | Connects independent agentic applications |
| The controlling agent selects and invokes a capability | One agent delegates a goal to another actor |
| Usually bounded by a structured operation | May involve planning, state, clarification, streaming, and a long-running task |
| Best mental model: **equip the agent** | Best mental model: **engage a counterparty** |

Use MCP to let an agent query a database, read email, search a repository, or create a calendar event. Use A2A when a candidate agent engages a company agent, a buyer agent asks a supplier agent to quote an order, or an orchestrator hires a specialist agent without needing its internal tools or reasoning.

> MCP gives an agent tools. A2A gives it colleagues, vendors, customers, and counterparties.

The protocols complement one another. An A2A agent will often use MCP internally.

## The protocol map

| Layer | Question | Protocol in this phase |
|---|---|---|
| Discovery and collaboration | Who can do this, and how do our agents work together? | **A2A** |
| Tool and data access | What capabilities can this agent invoke? | **MCP** |
| Human authorization | Who permitted this transaction, for what purpose, and within what limits? | **AP2** |
| HTTP-native settlement | How does a paid resource request and receive payment? | **x402** |
| Human visibility | How does the user observe progress, state, and intervention points? | **AG-UI** |

These are not a complete economy. Production systems also require identity, authentication, legal agreements, privacy, contracts, tax, refunds, disputes, delivery proof, records retention, and conventional payment rails.

## Agent-native employment: the Patron AI example

Today’s largest employment platforms generally restrict unauthorized scraping, bots, and automated messaging. Some restrictions protect privacy and reduce abuse; they also mean an independent personal agent cannot freely search, qualify, and communicate on its human’s behalf.

Patron AI starts from a different premise: agents are first-class citizens on both sides.

### A candidate’s agent

- Holds the person’s goals, constraints, evidence, preferences, and communication mandate.
- Discovers company or recruiter agents.
- Tests the fit before requesting attention.
- Asks questions the listing does not answer.
- Presents verifiable evidence rather than generic generated prose.
- Escalates meaningful choices to the human.
- Tracks a relationship over time.

### A company’s agent

- Publishes opportunities, capabilities, policies, and qualifying criteria.
- Answers permitted questions consistently.
- Requests missing evidence.
- Protects sensitive or premature information.
- Routes strong matches to a human.
- Declines irrelevant outreach clearly.
- Maintains an auditable record of what it represented.

The product is not a better scraper. It is an employment market designed for authorized human and organizational agents.

## Cheap communication creates an attention crisis

When an agent can send 480 applications, the cost of submission approaches zero while the filtering cost moves to employers. A healthy agent-native market must reward relevance and make abuse expensive.

Do not rank people only by volume. Measure whether an agent creates useful matches or externalizes its filtering work onto everyone else.

Possible signals include:

- Outreach volume over rolling periods
- Percentage of targets satisfying declared constraints
- Evidence of role- and company-specific inspection
- Duplicate or near-duplicate outreach
- Response and positive-response rates, interpreted by market conditions
- Recipient reports of irrelevance or misrepresentation
- Whether required questions receive specific answers
- Whether the agent honors declines, cooldowns, and contact boundaries
- Whether the represented preferences were actually authorized
- Whether claims are supported by credentials or evidence

Separate the reputations of the human, the represented company, the agent instance, and the agent provider. A bad configuration should be correctable without permanently branding a person; a provider that enables systematic abuse should not escape by rotating identities.

Useful defenses include quotas, recipient-controlled filters, proof-of-fit requirements, staged introductions, deposits or refundable attention bonds, rate limits, reputation-weighted access, and explicit communication mandates. Every defense needs an appeals and correction path.

## Authority is broader than payment

AP2 provides a payment-specific example of a general rule: authorize before acting.

An agent mandate can describe:

- The principal it represents
- Permitted purposes
- Allowed counterparties
- Spending or quantity limits
- Data the agent may disclose
- Communication channels and frequency
- Actions requiring human confirmation
- Expiration, revocation, and audit requirements

The same model applies to sending applications, issuing refunds, negotiating discounts, ordering inventory, contacting customers, deploying software, or signing agreements. Payments make the boundary obvious, but authority is the larger subject.

## What every company must design

1. **Agent surface:** What can an outside agent discover or request?
2. **Identity:** How do we know who the agent represents?
3. **Authority:** What is the agent allowed to promise, disclose, spend, or change?
4. **Policy:** Which requests are automatically acceptable?
5. **State:** How are long-running tasks, changes, and cancellations represented?
6. **Evidence:** What supports a claim, quote, decision, or completion?
7. **Attention:** How do we prevent fan-out and low-quality traffic?
8. **Observability:** Can a human reconstruct what happened?
9. **Intervention:** Where can a human pause, approve, correct, revoke, or appeal?
10. **Accountability:** Who owns mistakes, disputes, refunds, and harmful behavior?

## The practical first move

Choose one narrow, reversible, observable relationship:

- Invoice status and reconciliation
- Product availability and quote requests
- Candidate or vendor qualification
- Support case intake
- Appointment discovery and scheduling
- Order status and exception handling

Publish a minimal capability description. Require authenticated identity where appropriate. Define an explicit mandate. Limit fan-out. Log the exchange. Give both parties a human escalation path. Then test it with an outside agent you do not control.

## Sources to refresh

- A2A Protocol, “How A2A Works with MCP” and protocol specification — https://a2a-protocol.org/latest/
- Model Context Protocol, architecture — https://modelcontextprotocol.io/docs/learn/architecture
- Google, Agent Payments Protocol (AP2) — https://github.com/google-agentic-commerce/AP2
- Coinbase, x402 documentation — https://docs.cdp.coinbase.com/x402/welcome
- LinkedIn, prohibited software and automation policy — https://www.linkedin.com/help/linkedin/answer/a1341387
- Indeed, developer agreement — https://docs.indeed.com/legal-terms/developer-agreement

Protocol versions and platform policies change. Verify the primary sources before teaching.

