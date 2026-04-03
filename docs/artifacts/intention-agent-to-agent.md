# Intention — Agent-to-Agent Protocol Demo

## Why

Agent protocols are shipping in production — A2A (Google, 50+ partners), x402 (Coinbase, backed by AWS/Stripe/Cloudflare/Visa/Mastercard), AP2 (Google, 60+ partners), AG-UI (CopilotKit, adopted by Google/AWS/Microsoft). But understanding how they work together is hard from reading specs alone.

We need a **working demo** that shows real agents discovering each other, delegating tasks, paying for services, and streaming results — with every protocol exchange visible and inspectable. This is for showing clients what's possible and giving learners hands-on experience with the protocols that will define how software works in the next few years.

## Who

- **Primary:** Developers and technical decision-makers evaluating agent protocols
- **Secondary:** Learners completing the AI dev curriculum capstone

## What we're building

A **protocol demo dashboard** (`apps/agent-to-agent/`) with multiple agent services running on separate ports, communicating via real protocols.

### The services

| Service | Port | Stack | Role |
|---------|------|-------|------|
| **web** (dashboard) | 3000 | Next.js | Protocol visualization — topology view, live exchange feed, wire inspector |
| **orchestrator** | 4000 | NestJS | Receives user requests, discovers agents via A2A, delegates tasks |
| **restaurant-agent** | 4001 | NestJS | A2A-compliant agent — searches for restaurants matching criteria |
| **booking-agent** | 4002 | NestJS | A2A-compliant agent — checks availability, makes reservations |
| **premium-data-service** | 4003 | NestJS | x402 payment-gated API — premium restaurant reviews and ratings |

### The demo story

**"Plan me a team dinner for 6 people under $200"**

1. User clicks **Discover** → orchestrator fetches Agent Cards from all ports → dashboard shows topology map with agents, capabilities, and payment gates
2. User types the request and clicks **Ask** → orchestrator delegates to restaurant-agent (A2A) and booking-agent (A2A) → booking-agent needs premium reviews → hits premium-data-service → gets 402 Payment Required → user's AP2 mandate authorizes spending → x402 payment executes → premium data flows back → results aggregate at orchestrator → stream to dashboard via AG-UI
3. User clicks any exchange in the feed to **Explore** → sees raw JSON-RPC request/response, x402 headers, AP2 mandate, AG-UI events

### The protocols used

| Protocol | Where it's used | What it proves |
|----------|----------------|---------------|
| **A2A** (Agent-to-Agent) | Orchestrator ↔ Restaurant Agent, Orchestrator ↔ Booking Agent | Agent discovery via Agent Cards, task delegation via JSON-RPC, task lifecycle states |
| **AP2** (Agent Payments) | User → Orchestrator mandate | Cryptographic spending authorization with limits |
| **x402** (HTTP Payments) | Booking Agent → Premium Data Service | Payment-gated API access (402 → pay → proof → access) |
| **AG-UI** (Agent-to-UI) | Orchestrator → Dashboard | Real-time streaming of agent responses and protocol events |
| **MCP** (Model Context Protocol) | Agents → internal tools | Tool access (already known from prior phases) |

### The dashboard

Three modes, three buttons:

**Discover mode:**
- Orchestrator scans all agent ports for `/.well-known/agent-card.json`
- Agent Cards appear one by one on a topology map
- Each node shows: agent name, skills, port, and whether it has a payment gate (lock icon)
- Edges show which agents can talk to which

**Ask mode:**
- User types a natural language request
- Protocol exchanges stream in real time, color-coded:
  - Blue = A2A (agent-to-agent)
  - Green = x402 (payment execution)
  - Gold = AP2 (payment authorization/mandate)
  - Purple = MCP (tool access)
  - Gray = HTTP/REST
- Each message shows: timestamp, source → target, protocol, summary
- Results accumulate in the center panel

**Explore mode:**
- Click any exchange to see raw request/response JSON
- Click any agent node to see its full Agent Card
- Toggle protocols on/off to see what breaks
- Filter by protocol type

## Demo-grade minimums

- [ ] All 5 services start independently and run on their designated ports
- [ ] Discover mode shows all agents with accurate Agent Cards
- [ ] At least 2 A2A task delegations complete successfully (orchestrator → restaurant, orchestrator → booking)
- [ ] x402 payment gate works: 402 response → payment → proof → access
- [ ] AP2 mandate is created, signed, and verified
- [ ] AG-UI streams protocol events to the dashboard in real time
- [ ] Dashboard shows color-coded protocol exchanges
- [ ] At least one exchange is inspectable (click → see raw JSON)
- [ ] The whole flow completes end-to-end for the "team dinner" scenario

## Out of scope

- Real payment processing (use mock payments — the protocol exchange is what matters)
- Production-grade security (JWT auth is fine, no need for full DID/VC)
- AGNTCY ACP, ANP, or other early-stage protocols
- Mobile or native clients
- Persistent storage (in-memory is fine for the demo)

## Success criteria

1. A non-technical person watching the demo understands that agents are discovering each other, collaborating, and paying for services
2. A technical person can click any exchange and verify the protocol compliance
3. The "team dinner" story completes end-to-end in under 30 seconds
4. Turning off one agent (killing a port) visibly breaks the topology and the task fails gracefully
