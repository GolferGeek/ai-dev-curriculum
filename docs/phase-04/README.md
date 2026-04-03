# Phase 04 — Protocols: agents talking to agents (and paying for things)

**Prereqs:** Phase 03 complete (comfortable with research commands and the agent pipeline).

This is the capstone. Everything you've learned — building apps, maintaining quality, researching codebases, creating your own tools — comes together in one demo that shows the **future of how software works**: autonomous agents discovering each other, delegating tasks, streaming results to a dashboard, and paying for premium services. All using real, open protocols.

And you get to watch it all happen in real time.

---

## What you're building

A **protocol demo dashboard** with multiple agent services running on separate ports. When you click a button, you'll watch agents find each other, talk to each other, and pay each other — with every protocol exchange visible on screen.

**Three buttons. Three wow moments.**

| Button | What happens | What you see |
|--------|-------------|-------------|
| **Discover** | The orchestrator scans for agents across all ports | Agent Cards pop up one by one, building a live topology map |
| **Ask** | You type a request and agents collaborate to fulfill it | Color-coded protocol messages stream across the dashboard |
| **Explore** | Click any exchange to inspect the raw wire format | JSON-RPC requests, x402 payment flows, AP2 mandates — the actual bytes |

---

## The protocols

There are a lot of agent protocols emerging right now. This demo focuses on the ones that matter most — the ones backed by the biggest players and governed by the Linux Foundation's Agentic AI Foundation (AAIF).

### A2A — Agent-to-Agent (Google / AAIF)

How agents find and talk to each other. Each agent publishes an **Agent Card** at `/.well-known/agent-card.json` — think of it as a business card that says "here's what I can do." Other agents read the card, match capabilities, and send tasks via **JSON-RPC 2.0**.

This is the backbone. Every agent-to-agent interaction in the demo uses A2A.

### AP2 — Agent Payments Authorization (Google)

How a user says "yes, my agent can spend money." The user signs a **Mandate** — a cryptographic contract that says "this agent may spend up to $X on Y." The agent presents the mandate when it needs to pay. No mandate, no spending.

This is the trust layer. It answers: "who authorized this payment?"

### x402 — HTTP Payments (Coinbase / Linux Foundation)

How an agent actually pays. A server responds with `402 Payment Required` and payment instructions. The agent pays (real or mock), sends proof in the headers, and gets access. Three HTTP exchanges, sub-second.

This is the execution layer. It answers: "how does the money move?"

### AG-UI — Agent-to-Frontend (CopilotKit)

How agents stream results to your dashboard in real time. Event-based protocol — text chunks, tool progress, state updates — all flowing to the UI as they happen.

This is what makes the demo visual. Without AG-UI, you'd just see a loading spinner.

### MCP — Model Context Protocol (Anthropic / AAIF)

You already know this one — it's how Claude Code talks to tools. In the demo, agents use MCP to access databases and external services. It's the vertical layer (agent → tool) while A2A is the horizontal layer (agent → agent).

### What's NOT in the demo (but you should know about)

| Protocol | What it does | Why it's not in the demo |
|----------|-------------|-------------------------|
| **AGNTCY ACP** | Federated agent discovery + encrypted messaging | Enterprise infrastructure — overkill for a local demo |
| **ANP** | Internet-scale agent networking with DID identity | Still early stage |
| **W3C DID** | Self-sovereign agent identity | The demo uses simpler JWT/OAuth identity |
| **Commerce ACP** | Structured shopping checkout (OpenAI/Stripe) | The demo shows payment gates, not shopping carts |

These are real and important. The `a2p-protocol` skill has details if you want to dig deeper.

---

## The architecture

```
apps/agent-to-agent/
├── web/                      # Next.js dashboard (port 3000)
│                              AG-UI streaming, topology view, wire inspector
├── orchestrator/             # NestJS API (port 4000)
│                              Receives requests, discovers agents, delegates via A2A
├── restaurant-agent/         # NestJS API (port 4001)
│                              A2A Agent Card + task handler — finds restaurants
├── booking-agent/            # NestJS API (port 4002)
│                              A2A Agent Card + task handler — checks availability
└── premium-data-service/     # NestJS API (port 4003)
                               x402 payment gate — premium restaurant reviews
```

**The demo story:** "Plan me a team dinner for 6 people under $200."

1. **Discover** — Orchestrator fetches Agent Cards from all ports. Dashboard shows the topology.
2. **Ask** — User types the request. Orchestrator delegates to Restaurant Agent (A2A) and Booking Agent (A2A). Booking Agent needs premium reviews → hits the payment gate (x402) → user's AP2 mandate authorizes it → data flows back.
3. **Explore** — Every protocol exchange is clickable. See the raw JSON-RPC, the 402 response, the mandate signature, the AG-UI events.

---

## The toolkit

### Skills — what the AI knows

| Skill | What it teaches the agents |
|-------|---------------------------|
| **a2a-protocol** | A2A spec: Agent Cards, JSON-RPC, task lifecycle, skill negotiation |
| **a2p-protocol** | AP2 mandates, x402 payment flow, Commerce ACP overview |
| **ag-ui-protocol** | AG-UI event streaming for real-time frontend updates |
| **protocol-dashboard** | Design spec for the three-mode dashboard (Discover/Ask/Explore) |

### Agents — who does the work

| Agent | What it does |
|-------|-------------|
| **protocol-architect** | Designs the multi-agent system — which agents, which protocols, which ports |
| **agent-service-builder** | Builds individual NestJS API services with Agent Cards and protocol handlers |
| **dashboard-builder** | Builds the Next.js dashboard with AG-UI streaming and protocol visualization |

### Commands — what you type

No new commands! You use the pipeline you already know:

```
/intention → /prd → /plan → /run-plan
```

The skills and agents are what make Phase 04 different. The agents read the protocol skills and build compliant services. You direct the process.

---

## Let's do it

### Step 1: Review the intention

Read the intention file — it describes the demo, the protocols, and what "done" looks like.

```
/intention docs/artifacts/intention-agent-to-agent.md
```

### Step 2: Generate the PRD

```
/prd docs/artifacts/intention-agent-to-agent.md
```

### Step 3: Create the plan

```
/plan docs/artifacts/prd-agent-to-agent.md
```

### Step 4: Build it

```
/run-plan docs/artifacts/plan-agent-to-agent.md
```

### Step 5: Test it

Start all services and open the dashboard. Click Discover. Click Ask. Click Explore. Watch the protocols fire.

### Step 6: Quality check

```
/scan-errors agent-to-agent
/monitor agent-to-agent
```

### Step 7: Ship it

```
/commit pr
```

---

## Quick reference

- **Intention file:** `docs/artifacts/intention-agent-to-agent.md`
- **Protocol skills:** `.claude/skills/a2a-protocol/`, `a2p-protocol/`, `ag-ui-protocol/`, `protocol-dashboard/`
- **Agents:** `.claude/agents/protocol-architect.md`, `agent-service-builder.md`, `dashboard-builder.md`
- **Run order:** [RUN-ORDER.md](./RUN-ORDER.md)

---

## Why this matters

- **Phase 00** taught you the pipeline
- **Phase 01** taught you to build real apps
- **Phase 02** taught you to keep them healthy
- **Phase 03** taught you to understand any codebase
- **Phase 04** shows you **where software is going** — autonomous agents that discover, collaborate, and transact using open protocols

This isn't theoretical. A2A has 50+ enterprise partners. x402 is backed by AWS, Stripe, Cloudflare, Visa, and Mastercard. AP2 has 60+ launch partners. These protocols are shipping in production right now.

You just built a working demo of all of them. That's a conversation starter at any company.
