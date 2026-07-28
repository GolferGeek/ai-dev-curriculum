# Phase 04 — Lesson Plan

*The **content** you deliver for Phase 04. Room mechanics are shared with [Phase 00's TEACHING.md](../../docs/phases/00/TEACHING.md); exact steps are in [docs/phases/04/README.md](../../docs/phases/04/README.md) and [RUN-ORDER.md](../../docs/phases/04/RUN-ORDER.md). Use the new [Phase 04 teaching story](../../docs/phases/04/TEACHING.md) to understand the narrative and the [presenter guide](../../docs/phases/04/PRESENTER-GUIDE.md) while presenting the deck.*

**Session arc:** A new visitor arrives → distinguish a tool from a counterparty → see agents on both sides of real markets → solve attention and trust → name the protocol layers → watch the demo → design one company interface. Phase 04 is the most future-consequential session: agents representing people and companies, discovering each other, maintaining business relationships, and transacting under policy.

Do not open with the protocol acronyms. The deck deliberately waits until learners understand the business relationship. Slides 1–7 establish the change, 8–11 distinguish MCP and A2A, 12–21 make it real through Patron AI and vendor relationships, 22–29 name the protocol layers, 30–35 prove the flow in the demo, and 36–37 transfer the model to the learner's company.

> **Instructor refresh:** anywhere this says *[refresh]*, pull the current link before the cohort. Partner counts and “v1.0” dates move; lean on the primary protocol sites and Linux Foundation / Google / Coinbase announcements for load-bearing claims. Citations are at the bottom.

---

## 1. Intro — "The State of the AI Union: Protocols"

Phases 00–03 taught you to *build*, *harden*, and *understand* software with agents. This lecture is about where the industry is going next: **software that discovers, delegates, and transacts with strangers** — which only works if everyone speaks a shared language.

Open more directly:

> What happens when your next customer, candidate, supplier, or business partner arrives at your company as an agent?

The first rung is a website that returns clean Markdown or structured content when an agent requests it. The consequential rung is a persistent company agent that can qualify a request, apply policy, negotiate within authority, maintain task state, present evidence, and escalate to a human. Every company will need to decide what that interface may discover, disclose, promise, buy, sell, and change.

### 1a. The technology we're going to be using

Name each piece, say what it is in a sentence, and say *why it's in the kit*:

- **A2A (Agent-to-Agent)** — how agents find and hire each other. Each publishes an **Agent Card** (a public résumé at `/.well-known/agent-card.json`); work moves as structured **tasks** over **JSON-RPC** (and related bindings). Why it's here: it's the horizontal layer — agent ↔ agent — and the backbone of the demo.
- **AP2 (Agent Payments Protocol)** — the *permission* layer. A human signs a **mandate** (“this agent may spend up to $X on Y”) so an agent can buy things without a blank check. Why it's here: without authorization, “agents that pay” is a liability nightmare.
- **x402 (HTTP payments)** — the *execution* layer. A server answers **402 Payment Required**; the client attaches payment proof and retries. Why it's here: HTTP 402 sat unused for decades; Coinbase and partners revived it for machine-native micropayments (stablecoins over HTTP).
- **AG-UI (Agent–User Interaction)** — how agent activity streams *to a human's screen* as live events (text chunks, tool progress, state updates). Why it's here: without it, the demo is a loading spinner; with it, you watch the negotiation.
- **MCP (Model Context Protocol)** — how an AI application plugs into tools, data, prompts, and resources. Do not call it literally one-directional: MCP supports notifications and client/server features. Teach the durable distinction—MCP equips an agent with capabilities; A2A connects independent actors that can accept goals and manage tasks.
- **The stack they build** — NestJS specialist services (orchestrator + restaurant + booking + premium data), a Next.js dashboard, three buttons: **Discover / Ask / Explore**.

### 1b. The points we're trying to make

1. **Agent reachability becomes a required business interface.** A human-readable website will not be sufficient when customers and counterparties increasingly act through agents.
2. **Protocols beat private APIs when strangers must collaborate.** An API is one service's front door; a protocol is a *shared language* any two parties can speak. Agents need protocols because they work with services they've never met.
3. **Trust splits into layers — discovery, authorization, settlement, and human visibility.** A2A finds and delegates; AP2 authorizes; x402 can settle an HTTP-native payment; AG-UI shows the human what happened.
4. **Cheap agent action creates an attention and accountability problem.** Agent-native markets need identity, mandates, reputation, rate limits, evidence, revocation, and appeals.
5. **A2A is a rail, not a complete economy.** Contracts, privacy, tax, disputes, refunds, fulfillment, and liability remain business responsibilities.

### 1c. Why those points are important

- For a **business**: the next integration problem isn't “our app talks to Stripe.” It's “our agent hires *someone else's* agent and pays under policy.” If you don't understand mandates and 402s, you can't write the policy — or audit the trail.
- For a **marketplace**: if an agent can apply to 480 jobs or contact 480 vendors, sending becomes free and recipient attention becomes the scarce resource. Product design must reward relevance rather than fan-out.
- For a **developer**: today's agents are mostly vertical (one agent + tools via MCP). The hard, scarce skill is *horizontal* — opaque agents coordinating across org boundaries. That's career-relevant for the next five years.
- For the **course**: this is the payoff slide. Everything before was craft; this is *direction*. They leave able to explain the stack in two sentences at Monday's stand-up.

### 1d. How this area is changing

- **From chatbots to multi-agent systems.** Single-agent “do my task” demos are saturating; production interest is shifting to *teams of agents* that discover capabilities and delegate. A2A's own v1.0 framing: coordination *within* one stack is solved; coordination *across* stacks and orgs is the bottleneck. *[refresh: A2A v1.0 / partner count.]*
- **Neutral governance arrived fast.** Dec 2025: Linux Foundation **Agentic AI Foundation (AAIF)** — Anthropic donated MCP, Block donated goose, OpenAI donated AGENTS.md; platinum members include AWS, Google, Microsoft, Cloudflare, Bloomberg. Open rails beat proprietary lock-in when the category is this young. *[refresh membership.]*
- **Payments woke up HTTP 402.** Coinbase's x402 (May 2025) + Google's AP2 (Sep 2025) + the A2A×x402 extension: authorization (mandates) and settlement (402 + stablecoins) are being designed as *complements*, not competitors. *[refresh.]*
- **The UI layer is standardizing too.** AG-UI (CopilotKit-led, open) treats agent↔frontend as a first-class protocol — events, not ad-hoc WebSockets — so dashboards become interchangeable. *[refresh.]*

### 1e. What interesting people and institutions are saying

Use one or two live; paraphrase and cite on screen.

- **Linux Foundation / Jim Zemlin (AAIF launch, Dec 2025).** The framing: conversational systems are shifting to autonomous agents that *work together*, and those rails need transparency and neutral stewardship — the same logic that made Linux and Kubernetes durable. Land: *open governance is the product strategy.*
- **A2A Technical Steering Committee (AWS, Cisco, Google, IBM Research, Microsoft, Salesforce, SAP, ServiceNow).** Their v1.0 message: signed Agent Cards, multi-tenancy, multi-protocol bindings — enterprise trust requirements, not hobby RPC. Land: *production agents need identity before conversation.*
- **Google on AP2 (Parikh / Surapaneni, Sep 2025).** Agents break the assumption that a human clicked “Buy.” The three questions AP2 answers: **authorization** (did the user allow this?), **authenticity** (does the request match intent?), **accountability** (who is on the hook if it's wrong?). Land: *mandates are the audit trail.*
- **Coinbase on x402 (Reppel et al., May 2025).** “Just like HTTPS secured the web, x402 could define the next era… value moves as freely as information.” Fun fact for the room: **402 Payment Required** sat in the HTTP spec for ~30 years waiting for this. Land: *settlement can be three HTTP exchanges, not a checkout redesign.*
- **The skeptic / caution.** Autonomous spend without hard limits is how you get a five-figure cloud bill before lunch. Pair the wow with: *no mandate, no spending* — and humans still own the Explore view.

**Land the lecture:** the future isn't one mega-agent. It's many specialized agents that **discover, hire, and pay** each other on open protocols — while a human watches the wire. That's what we're about to build and inspect.

---

## 2. The strategic discussion — "From websites to represented businesses"

Use [AGENT-TO-AGENT-FUTURE.md](../../docs/phases/04/AGENT-TO-AGENT-FUTURE.md) as the reading.

### 2a. MCP versus A2A

Use this sentence:

> MCP gives an agent tools. A2A gives it colleagues, vendors, customers, and counterparties.

MCP can be bidirectional. The distinction is not message direction or raw complexity. It is whether the remote system exposes a bounded capability to a controlling host or acts as an independent agent that accepts a goal, manages task state, asks questions, and returns artifacts without revealing its internal tools or reasoning.

### 2b. Patron AI: agents on both sides

Draw Candidate Agent ↔ Company Agent. The candidate agent holds goals, evidence, constraints, and a communication mandate. The company agent publishes opportunities and policies, requests evidence, protects sensitive information, and escalates good matches.

The current job-platform restrictions are a useful tension: LinkedIn prohibits unauthorized bots, scraping, and automated messaging; Indeed restricts algorithmic API calls replacing human input and unauthorized scraping. These controls have privacy and anti-spam justifications, but they also illustrate why an agent-native market must be designed deliberately rather than reached through prohibited automation.

Ask: **What makes a candidate agent a good market citizen?** Do not settle for application count. Discuss fit rate, evidence, specificity, recipient feedback, duplicate behavior, honoring declines, and whether the agent was authorized to represent the stated preferences.

Separate reputation for:

- the human or company,
- the agent instance,
- the agent provider,
- the credentials and claims presented.

### 2c. Vendor and customer agents

Narrate an invoice-to-reorder relationship: invoice ready → reconcile against purchase order → authorize payment → settle → request ten widgets → quote options → approve → fulfillment update.

Ask learners to label which steps are:

- information retrieval,
- delegated agent work,
- authorization,
- payment,
- evidence,
- human intervention.

### 2d. Every company’s design problem

Each learner chooses one narrow relationship and defines: discoverable capability, identity, authority, policy, task state, evidence, fan-out control, logs, intervention, and accountability.

---

## 3. The intention walk-through

Open the provided intention: [intention-agent-to-agent.md](../../docs/artifacts/intention-agent-to-agent.md).

### What this app is
Say plainly: a **protocol demo dashboard** plus four NestJS services. Demo story: *“Plan me a team dinner for 6 under $200.”* Three wow moments — Discover (topology of Agent Cards), Ask (A2A collaboration + x402 paywall under an AP2 mandate), Explore (raw JSON-RPC / 402 / mandate / AG-UI events).

### How the intention sets the agents up to succeed
- It names **which protocols** and **which ports** — so `/plan` can split work across `protocol-architect` → `agent-service-builder` → `dashboard-builder`.
- It defines **Demo-grade minimums** as *visible protocol behavior*, not a pretty empty UI — Agent Cards fetchable, a payment gate that actually 402s, a stream the dashboard can subscribe to.
- It scopes the **mandate flow end-to-end** in one sentence they should be able to repeat: user signs spending mandate → orchestrator hires specialists via A2A → hits 402 → pays under mandate via x402 → every step streams via AG-UI.

The lesson out loud: **the intention is a protocol contract.** Ambiguous intentions produce “agents that kinda chat”; precise ones produce inspectable wire traffic.

### Why we don't rewrite the intentions
Same as earlier phases: tuned and working — **read and critique**, don't modify. Predict before build: “Which service will hit the paywall? What will Explore show first?”

---

## 4. The build (it runs — keep teaching)

`/run-plan` orchestrates architect → service builders → dashboard. Budget longer than Phase 00 — multiple services. **Nobody watches the bar.** Use the window for the AAIF / AP2 / x402 material in 1e, Phase 04 talks in [discussion-topics.md](discussion-topics.md) (authorize-before-act, multi-agent coordination, wire observability), and for drawing the layer cake on a whiteboard:

```
Human UI (AG-UI)
    ↑
Orchestrator ↔ Specialists (A2A / JSON-RPC)
    ↑
Tools & data (MCP)
    ↑
Paywall (x402) under Mandate (AP2)
```

Steps: [RUN-ORDER.md](../../docs/phases/04/RUN-ORDER.md). After build: start all ports, open the dashboard.

---

## 5. Closing discussion — "Can you read the wire?"

Don't admire the topology — **prove the protocols fired.**

- **Discover.** Do Agent Cards appear one by one? Can someone explain what a Card *is* without opening the docs?
- **Ask.** Run the dinner request. Narrate: which agent was hired, where the 402 appeared, whether the mandate covered it.
- **Explore.** Click a raw exchange. Make them point at JSON-RPC method vs. params vs. result; at 402 headers; at an AG-UI event type. *This is the verification muscle for agent systems.*
- **Protocol vs. API check.** “If Restaurant Agent were replaced by a competitor tomorrow, what would still work?” (Answer: anything speaking A2A + the same Card/task contract.)
- **Business connection.** “Where would *your* company publish an Agent Card — and what would you refuse to put on a mandate?”

### What they must leave Phase 04 believing
1. Protocols are the shared language that lets stranger-agents collaborate; private APIs don't scale to that world.
2. Trust is layered: discover (A2A) → authorize (AP2) → settle (x402) → watch (AG-UI) — with MCP vertical to tools.
3. Reading the wire beats trusting the chat transcript — Explore is the **closing bracket** for agent systems.
4. This stack is shipping in the open under real governance; the scarce skill is fluency, not waiting for a single vendor's product.
5. Every company needs a deliberate answer for outside agents—what they may discover, request, promise, and transact.
6. Cheap fan-out makes recipient attention, relevance, and reputation first-class system concerns.

---

## Citations (verify/refresh before teaching)

- Linux Foundation, “Formation of the Agentic AI Foundation (AAIF),” 9 Dec 2025 — https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation
- A2A Protocol, “Announcing Version 1.0,” official docs — https://a2a-protocol.org/latest/announcing-1.0/
- A2A Protocol home (TSC membership, scope) — https://a2a-protocol.org/latest/
- Google Cloud, “Announcing Agent Payments Protocol (AP2),” 16–17 Sep 2025 — https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol
- TechCrunch, “Google launches new protocol for agent-driven purchases,” 16 Sep 2025 — https://techcrunch.com/2025/09/16/google-launches-new-protocol-for-agent-driven-purchases/
- Coinbase, “Introducing x402,” 6 May 2025 — https://www.coinbase.com/developer-platform/discover/launches/x402
- x402 whitepaper / docs — https://www.x402.org/ *(and GitHub coinbase/x402)*
- AG-UI Protocol (CopilotKit / ag-ui-protocol) — https://www.copilotkit.ai/ag-ui and https://github.com/ag-ui-protocol/ag-ui
- Model Context Protocol (context for vertical vs horizontal) — https://modelcontextprotocol.io *[refresh]*
- LinkedIn, “Prohibited software and extensions” — https://www.linkedin.com/help/linkedin/answer/a1341387
- Indeed, Developer Agreement — https://docs.indeed.com/legal-terms/developer-agreement

*Label partner-count headlines (“50+,” “60+,” “150+”) as time-stamped and *[refresh]* them from primary pages. Do not treat secondary roundups as primary sources for governance claims — prefer LF, a2a-protocol.org, Google Cloud, and Coinbase.*
