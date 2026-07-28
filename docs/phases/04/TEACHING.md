# Phase 04 — Instructor teaching guide

This guide answers one question: **How do I teach Phase 04 so a development team can follow the story?**

Use these materials together:

- [PowerPoint](../../../marketing/decks/phase-04-agent-to-agent-future.pptx) — the learner-facing story
- [PRESENTER-GUIDE.md](./PRESENTER-GUIDE.md) — what to say and ask on every slide
- [AGENT-TO-AGENT-FUTURE.md](./AGENT-TO-AGENT-FUTURE.md) — background reading
- [RUN-ORDER.md](./RUN-ORDER.md) — exact lab steps
- [VERIFY.md](./VERIFY.md) — proof that the lesson and demo worked

## The one outcome

By the end, learners should be able to say:

> A company will increasingly receive requests from agents representing customers, candidates, vendors, and partners. MCP gives an agent tools; A2A lets independent agents work together. The company still must define identity, authority, attention limits, evidence, human intervention, and accountability.

If learners can explain that and narrate one demo exchange, the phase worked. They do not need to memorize protocol payloads.

## The teaching story

Teach the phase in eight questions. Do not begin with a list of acronyms.

### 1. What changes when an agent visits a company?

Today a person reads a website and translates it into a decision. Soon a personal or company agent will make many of those visits.

Ask:

- What would an agent want from your company?
- What information on your website is fact, and what is presentation?
- What could an outside agent safely do without a human employee?

Land:

> A company needs an agent-facing front door, not merely a human-facing website.

### 2. What is the smallest useful improvement?

Return clean Markdown or structured content when an agent requests it. Include provenance, timestamps, prices, policies, and escalation paths.

Be explicit: this is useful but incomplete. It lets an agent **read** the company. It does not let the company maintain a task, negotiate, make a commitment, or apply delegated authority.

### 3. Is the remote system a tool or another actor?

Use two concrete examples:

- “Read my unread email” — the agent invokes a capability through MCP.
- “Find a qualified candidate and return with evidence” — the agent delegates a goal to an independent agent through A2A.

Say:

> MCP equips an agent. A2A connects it to a counterparty.

Do not say MCP is technically one-directional. The useful distinction is **capability invocation versus delegated agency**.

### 4. What does this become in the real world?

Use both examples:

1. **Patron AI:** candidate agent talks to company agent.
2. **Vendor relationship:** buyer agent talks to supplier agent about invoices, quotes, orders, and delivery.

These examples establish that the topic is not “agents chatting.” It is software representing parties in continuing relationships.

### 5. What breaks when communication becomes almost free?

Use the 480-application example. Sending becomes cheap; recipient attention remains expensive.

Ask:

- What should happen to an agent that contacts 480 poor matches?
- What distinguishes high effort from high volume?
- Whose reputation should be affected: the person, agent, or provider?

Land:

> An agent-native market must reward relevance and protect recipient attention.

### 6. Which protocol solves which piece?

Only now introduce the protocol map:

- **A2A:** discovery, messages, delegated tasks, task state, artifacts
- **MCP:** tools, data, prompts, and resources used by an agent
- **AP2:** evidence that a human authorized a transaction under limits
- **x402:** an HTTP-native way to demand and execute payment
- **AG-UI:** events that let a human observe progress and intervene

Emphasize that identity, contracts, privacy, disputes, refunds, reputation, and liability remain business responsibilities.

### 7. What does our demo prove?

The restaurant scenario is a visible model:

1. Discover specialist agents.
2. Delegate a dinner-planning goal.
3. Encounter a paid resource.
4. Check the user’s spending mandate.
5. Retry with mock payment proof.
6. Stream every event to the dashboard.
7. Inspect the raw exchange.

Say clearly: the demo uses mock payments and simplified authorization. It teaches the **shape and observability** of the interaction, not production payment security.

### 8. What should our company build first?

Every learner chooses one narrow relationship and answers:

- What can the outside agent discover?
- Who does it represent?
- What may it request or promise?
- Which actions are automatic?
- What evidence is required?
- What limits fan-out?
- Where can a human intervene?
- Who owns a mistake?

Prefer a reversible and observable first capability: invoice status, quote request, candidate qualification, support intake, scheduling, or order status.

## Recommended room flow

| Block | What happens | Instructor job |
|---|---|---|
| Opening story | Slides 1–6 | Make agent reachability concrete |
| Tool or actor | Slides 7–10 | Establish MCP versus A2A |
| Two markets | Slides 11–16 | Use Patron AI and vendor/customer examples |
| Trust problem | Slides 17–20 | Discuss attention, reputation, and authority |
| Protocol map | Slides 21–27 | Give each acronym one job |
| Demo | Slides 28–34 | Predict, run, and inspect |
| Transfer | Slides 35–37 | Design one real company capability |

The presentation can be delivered in about 45–60 minutes before or around the build. Shorten by skipping detailed protocol slides, not by removing the concrete examples.

## What to write on the board

```text
PERSON / COMPANY
       │ sets intent and limits
       ▼
    THEIR AGENT  <──── A2A ────>  OUR COMPANY AGENT
       │                               │
      MCP                             MCP
       │                               │
 personal tools                  company tools/data

AP2 = who authorized a purchase?
x402 = how can an HTTP resource get paid?
AG-UI = what can the human see and control?
```

## What not to do

- Do not open by defining five protocols.
- Do not call A2A “two-way MCP.”
- Do not imply an API cannot be interactive or an MCP tool cannot be complex.
- Do not imply A2A solves identity, contracts, reputation, or disputes.
- Do not present the mock payment as production settlement.
- Do not spend the entire session reading JSON.
- Do not end on the restaurant example; transfer the idea back to the learner’s company.

## Close

Ask every learner to complete this sentence:

> Our first agent-facing capability should be ___, because it removes ___, and it will require human approval when ___.

