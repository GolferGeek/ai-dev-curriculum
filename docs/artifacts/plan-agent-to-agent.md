# Implementation Plan — Agent-to-Agent Protocol Demo

**Source PRD:** `docs/artifacts/prd-agent-to-agent.md`
**Source intention:** `docs/artifacts/intention-agent-to-agent.md`
**App path:** `apps/agent-to-agent/`
**Date:** 2026-04-01

---

## Agents

| Agent | Responsibility |
|-------|---------------|
| **protocol-architect** | Project scaffolding, shared types/interfaces, integration wiring, end-to-end flow |
| **agent-service-builder** | NestJS services (orchestrator, restaurant-agent, booking-agent, premium-data-service) — A2A, x402, AP2 protocol logic |
| **dashboard-builder** | Next.js dashboard — topology graph, protocol timeline, wire inspector, AG-UI consumer |

---

## Milestone 1: Project Scaffolding

**What gets built:** Directory structure for all 5 services, package.json and tsconfig for each, root turbo.json integration, shared types package.

**Agent:** protocol-architect

### Files created

```
apps/agent-to-agent/
├── shared/
│   ├── package.json                  # @agent-to-agent/shared
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts                  # barrel export
│       ├── types/
│       │   ├── a2a.ts                # AgentCard, Task, TaskStatus, Message, Part, JsonRpcRequest, JsonRpcResponse
│       │   ├── ap2.ts                # IntentMandate, MandateConstraints, PaymentRecord
│       │   ├── x402.ts               # X402Response, PaymentProof, PaymentAccept
│       │   ├── ag-ui.ts              # AgUiEvent, ProtocolExchange, RunState
│       │   └── common.ts             # Shared enums (ProtocolType, TaskState, etc.)
│       └── constants.ts              # Ports (3000, 4000-4003), protocol colors, agent IDs
│
├── orchestrator/
│   ├── package.json                  # @agent-to-agent/orchestrator — NestJS deps
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── src/
│       ├── main.ts                   # Bootstrap on port 4000
│       └── app.module.ts             # Root module (empty for now)
│
├── restaurant-agent/
│   ├── package.json                  # @agent-to-agent/restaurant-agent — NestJS deps
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── src/
│       ├── main.ts                   # Bootstrap on port 4001
│       └── app.module.ts             # Root module (empty for now)
│
├── booking-agent/
│   ├── package.json                  # @agent-to-agent/booking-agent — NestJS deps
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── src/
│       ├── main.ts                   # Bootstrap on port 4002
│       └── app.module.ts             # Root module (empty for now)
│
├── premium-data-service/
│   ├── package.json                  # @agent-to-agent/premium-data-service — NestJS deps
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── src/
│       ├── main.ts                   # Bootstrap on port 4003
│       └── app.module.ts             # Root module (empty for now)
│
├── web/
│   ├── package.json                  # @agent-to-agent/web — Next.js + Tailwind deps
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── app/
│       ├── layout.tsx                # Root layout with Tailwind
│       ├── page.tsx                  # Placeholder dashboard shell
│       └── globals.css               # Tailwind directives + protocol color variables
│
└── package.json                      # Workspace root for agent-to-agent (scripts: dev, build, test)
```

### Files modified

- `turbo.json` — Add task entries for agent-to-agent services if needed (the existing `dev`, `build`, `test` tasks should already apply via workspaces)

### Verification

```bash
# From repo root
cd apps/agent-to-agent

# Install dependencies
npm install

# Start all 5 services (each in its own terminal or via turbo)
cd orchestrator && npm run start:dev    # → listening on :4000
cd restaurant-agent && npm run start:dev # → listening on :4001
cd booking-agent && npm run start:dev    # → listening on :4002
cd premium-data-service && npm run start:dev # → listening on :4003
cd web && npm run dev                    # → listening on :3000

# Verify each responds
curl http://localhost:4000              # → NestJS default or 404 (OK)
curl http://localhost:4001              # → NestJS default or 404 (OK)
curl http://localhost:4002              # → NestJS default or 404 (OK)
curl http://localhost:4003              # → NestJS default or 404 (OK)
curl http://localhost:3000              # → Next.js HTML (OK)
```

**Done when:** All 5 processes start without errors on their designated ports.

---

## Milestone 2: A2A Agent Cards + Discovery

**What gets built:** Every NestJS service serves `/.well-known/agent-card.json`. The orchestrator has a `/api/discover` endpoint that scans ports 4001-4003 for Agent Cards and returns topology data. The dashboard Discover mode renders a topology graph from that data.

**Agents:** agent-service-builder (Agent Cards + discovery endpoint), dashboard-builder (Discover UI)

### Files created/modified

**agent-service-builder:**

```
apps/agent-to-agent/orchestrator/src/
├── agent-card/
│   ├── agent-card.controller.ts      # GET /.well-known/agent-card.json
│   └── agent-card.module.ts
├── discovery/
│   ├── discovery.controller.ts       # POST /api/discover — scan ports, fetch cards, return topology
│   ├── discovery.service.ts          # Fetch Agent Cards from configured ports, build topology graph
│   └── discovery.module.ts
└── app.module.ts                     # Import AgentCardModule, DiscoveryModule

apps/agent-to-agent/restaurant-agent/src/
├── agent-card/
│   ├── agent-card.controller.ts      # GET /.well-known/agent-card.json (skills: search-restaurants, get-restaurant-details)
│   └── agent-card.module.ts
└── app.module.ts                     # Import AgentCardModule

apps/agent-to-agent/booking-agent/src/
├── agent-card/
│   ├── agent-card.controller.ts      # GET /.well-known/agent-card.json (skills: check-availability, make-reservation)
│   └── agent-card.module.ts
└── app.module.ts                     # Import AgentCardModule

apps/agent-to-agent/premium-data-service/src/
├── agent-card/
│   ├── agent-card.controller.ts      # GET /.well-known/agent-card.json (skills: premium-reviews, premium-ratings; paymentGate: true)
│   └── agent-card.module.ts
└── app.module.ts                     # Import AgentCardModule
```

**dashboard-builder:**

```
apps/agent-to-agent/web/app/
├── components/
│   ├── layout/
│   │   ├── LeftPanel.tsx             # Agent list, mode selector, protocol filters, mandate status
│   │   ├── CenterPanel.tsx           # Routes to Discover/Ask/Explore content
│   │   └── RightPanel.tsx            # Protocol inspector feed
│   ├── discover/
│   │   └── TopologyGraph.tsx         # Force-directed node graph using Agent Card data
│   └── shared/
│       ├── AgentNode.tsx             # Single agent node (name, skills pills, port, lock icon)
│       └── ProtocolBadge.tsx         # Colored badge for protocol type
├── hooks/
│   └── useDiscovery.ts              # Fetch POST /api/discover, return topology state
├── lib/
│   └── api.ts                        # API client (base URL for orchestrator)
└── page.tsx                          # Three-panel layout, Discover mode as default
```

### Agent Card format

Each agent's card follows the A2A spec. Example for restaurant-agent:

```json
{
  "name": "restaurant-agent",
  "description": "Searches for restaurants matching criteria — cuisine, price range, group size, location",
  "url": "http://localhost:4001",
  "version": "1.0.0",
  "capabilities": { "streaming": false, "pushNotifications": false },
  "skills": [
    {
      "id": "search-restaurants",
      "name": "Search Restaurants",
      "description": "Find restaurants matching criteria (cuisine, price range, group size, location)",
      "inputModes": ["text/plain", "application/json"],
      "outputModes": ["application/json"]
    },
    {
      "id": "get-restaurant-details",
      "name": "Get Restaurant Details",
      "description": "Get full details for a specific restaurant",
      "inputModes": ["application/json"],
      "outputModes": ["application/json"]
    }
  ],
  "defaultInputModes": ["text/plain", "application/json"],
  "defaultOutputModes": ["application/json"]
}
```

Premium-data-service card adds `"paymentGate": { "x402": true, "network": "base-sepolia" }` to indicate payment requirements.

### Verification

```bash
# Fetch each Agent Card
curl http://localhost:4000/.well-known/agent-card.json | jq .name
# → "orchestrator"

curl http://localhost:4001/.well-known/agent-card.json | jq .name
# → "restaurant-agent"

curl http://localhost:4002/.well-known/agent-card.json | jq .name
# → "booking-agent"

curl http://localhost:4003/.well-known/agent-card.json | jq .name
# → "premium-data-service"

# Trigger discovery
curl -X POST http://localhost:4000/api/discover | jq '.agents | length'
# → 4

# Open browser to http://localhost:3000
# Click "Discover" — topology graph shows 4 agent nodes with edges
# Premium-data-service node has lock icon and green border
```

**Done when:** All 4 Agent Cards return valid JSON. Discovery returns topology with 4 agents. Dashboard renders the topology graph with correct names, skills, and payment gate indicators.

---

## Milestone 3: A2A Task Delegation

**What gets built:** JSON-RPC 2.0 `tasks/send`, `tasks/get`, `tasks/cancel` handlers on restaurant-agent and booking-agent. Orchestrator task delegation logic — match skills from Agent Cards, send tasks, track lifecycle. Mock response data (hardcoded restaurants, availability).

**Agent:** agent-service-builder

### Files created/modified

```
apps/agent-to-agent/shared/src/
├── utils/
│   ├── json-rpc.ts                   # JSON-RPC 2.0 request/response builders, error codes (-32600, -32601)
│   └── uuid.ts                       # UUID generator for task IDs

apps/agent-to-agent/orchestrator/src/
├── tasks/
│   ├── tasks.controller.ts           # Internal — no external endpoint needed (orchestrator is the A2A client)
│   ├── tasks.service.ts              # Send tasks to agents (HTTP POST with JSON-RPC), track task state, poll if needed
│   ├── task-store.ts                 # In-memory Map<taskId, TaskState> for tracking active tasks
│   └── tasks.module.ts
├── ask/
│   ├── ask.controller.ts             # POST /api/ask — accept user request, return { runId }
│   ├── ask.service.ts                # Orchestration logic: parse request → delegate to restaurant-agent → delegate to booking-agent → aggregate results
│   └── ask.module.ts
└── app.module.ts                     # Import TasksModule, AskModule

apps/agent-to-agent/restaurant-agent/src/
├── tasks/
│   ├── tasks.controller.ts           # POST / — JSON-RPC 2.0 handler (route by method: tasks/send, tasks/get, tasks/cancel)
│   ├── tasks.service.ts              # Handle search-restaurants and get-restaurant-details skills
│   ├── task-store.ts                 # In-memory task tracking
│   └── tasks.module.ts
├── data/
│   └── restaurants.ts                # Hardcoded mock data: 8-10 restaurants with name, cuisine, price range, capacity, address, cost per person
└── app.module.ts                     # Import TasksModule

apps/agent-to-agent/booking-agent/src/
├── tasks/
│   ├── tasks.controller.ts           # POST / — JSON-RPC 2.0 handler
│   ├── tasks.service.ts              # Handle check-availability and make-reservation skills
│   ├── task-store.ts                 # In-memory task tracking
│   └── tasks.module.ts
├── data/
│   └── availability.ts              # Hardcoded availability data for mock restaurants
└── app.module.ts                     # Import TasksModule
```

### JSON-RPC compliance

All task handlers must:
- Validate `jsonrpc: "2.0"`, `method`, `params`, `id` fields
- Return `-32600` (invalid request) for malformed requests
- Return `-32601` (method not found) for unknown methods
- Use caller-generated task IDs from `params.id`
- Transition tasks through states: submitted → working → completed/failed

### Mock data

Restaurant-agent returns 8-10 hardcoded restaurants. Example:

```json
{
  "id": "rest-001",
  "name": "Bella Notte",
  "cuisine": "Italian",
  "priceRange": "$$",
  "address": "123 Main St",
  "capacity": 80,
  "maxGroupSize": 12,
  "costPerPerson": 28,
  "description": "Family-style Italian with private dining room"
}
```

Booking-agent returns hardcoded availability. When asked to make a reservation, it generates a mock confirmation.

### Verification

```bash
# Send a task to restaurant-agent directly
curl -X POST http://localhost:4001 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": "test-001",
    "method": "tasks/send",
    "params": {
      "id": "task-001",
      "message": {
        "role": "user",
        "parts": [{"type": "text", "text": "Find restaurants for 6 people under $200"}]
      }
    }
  }' | jq .result.status.state
# → "completed"

# Send a task to booking-agent directly
curl -X POST http://localhost:4002 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": "test-002",
    "method": "tasks/send",
    "params": {
      "id": "task-002",
      "message": {
        "role": "user",
        "parts": [{"type": "data", "mimeType": "application/json", "data": {"restaurantId": "rest-001", "partySize": 6, "date": "2026-04-15"}}]
      }
    }
  }' | jq .result.status.state
# → "completed"

# Test unknown method
curl -X POST http://localhost:4001 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":"test-003","method":"unknown/method","params":{}}' | jq .error.code
# → -32601

# Test orchestrator delegation
curl -X POST http://localhost:4000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"request": "Plan me a team dinner for 6 people under $200"}' | jq .runId
# → returns a runId (string)
```

**Done when:** Restaurant-agent and booking-agent accept and complete tasks via JSON-RPC. Orchestrator delegates to both agents and gets completed responses. Error codes work correctly for invalid/unknown requests.

---

## Milestone 4: x402 Payment Gate

**What gets built:** Premium-data-service returns HTTP 402 with x402 payment instructions on `/api/reviews/:id` and `/api/ratings/:id`. Booking-agent detects 402 and signals `input-required` to orchestrator. Orchestrator generates mock payment proof and retries with `X-PAYMENT` header.

**Agent:** agent-service-builder

### Files created/modified

```
apps/agent-to-agent/premium-data-service/src/
├── payment/
│   ├── x402.guard.ts                 # NestJS guard — checks for X-PAYMENT header, returns 402 if missing/invalid
│   ├── x402.service.ts               # Verify payment proof structure (decode base64, check fields)
│   └── payment.module.ts
├── reviews/
│   ├── reviews.controller.ts         # GET /api/reviews/:restaurantId — guarded by x402
│   ├── reviews.service.ts            # Return mock review data
│   └── reviews.module.ts
├── ratings/
│   ├── ratings.controller.ts         # GET /api/ratings/:restaurantId — guarded by x402
│   ├── ratings.service.ts            # Return mock ratings data
│   └── ratings.module.ts
├── data/
│   └── reviews.ts                    # Hardcoded mock reviews and ratings for each restaurant ID
└── app.module.ts                     # Import PaymentModule, ReviewsModule, RatingsModule

apps/agent-to-agent/orchestrator/src/
├── payment/
│   ├── x402-client.service.ts        # Detect 402 responses, generate mock payment proof, retry with X-PAYMENT header
│   ├── payment-log.ts                # In-memory log of all payment transactions
│   └── payment.module.ts
└── app.module.ts                     # Import PaymentModule

apps/agent-to-agent/booking-agent/src/
├── premium/
│   ├── premium-client.service.ts     # HTTP client for premium-data-service; when 402 received, set task status to input-required with payment details
│   └── premium.module.ts
└── tasks/
    └── tasks.service.ts              # (modified) make-reservation skill now calls premium-client for reviews before booking
```

### x402 flow detail

1. Booking-agent calls `GET http://localhost:4003/api/reviews/rest-001`
2. Premium-data-service x402 guard sees no `X-PAYMENT` header, returns:
   ```
   HTTP 402
   { "x402Version": 1, "accepts": [{ "scheme": "exact", "network": "base-sepolia", "maxAmountRequired": "100", "resource": "...", "payTo": "0xPremiumDataServiceWallet" }] }
   ```
3. Booking-agent receives 402, updates its task status to `input-required` with payment details in the message
4. Orchestrator receives `input-required`, reads payment instructions from the task message
5. Orchestrator generates mock payment proof:
   ```json
   { "amount": "100", "payer": "orchestrator-001", "payee": "0xPremiumDataServiceWallet", "timestamp": "...", "nonce": "...", "mandateRef": "mandate-xxx", "signature": "mock-base64-sig" }
   ```
6. Orchestrator base64-encodes the proof, retries `GET /api/reviews/rest-001` with `X-PAYMENT: <base64>`
7. Premium-data-service verifies proof structure, returns 200 with review data
8. Orchestrator forwards review data back to booking-agent via `tasks/send` (same task ID, continuing the conversation)

### Verification

```bash
# Hit premium-data-service without payment
curl -i http://localhost:4003/api/reviews/rest-001
# → HTTP 402, body contains x402Version and accepts array

# Hit with mock payment header
PROOF=$(echo '{"amount":"100","payer":"test","payee":"0xPremiumDataServiceWallet","timestamp":"2026-04-01T00:00:00Z","nonce":"abc","signature":"mock"}' | base64)
curl -i http://localhost:4003/api/reviews/rest-001 -H "X-PAYMENT: $PROOF"
# → HTTP 200, body contains reviews array

# End-to-end via orchestrator: send a booking task that triggers premium data
# The orchestrator should handle the 402 → pay → retry cycle automatically
curl -X POST http://localhost:4000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"request": "Book a dinner reservation for 6"}' | jq .runId
# → Returns runId; the flow should complete without errors
```

**Done when:** Premium-data-service returns 402 without payment and 200 with valid payment proof. The orchestrator automatically handles the 402 → pay → retry cycle when booking-agent signals `input-required`.

---

## Milestone 5: AP2 Mandates

**What gets built:** Mandate creation (when user clicks Ask, a mandate is created with spending limits). Mandate passing from orchestrator to payment flow. Mandate verification before any x402 payment. Dashboard shows mandate status.

**Agents:** agent-service-builder (mandate logic), dashboard-builder (mandate UI)

### Files created/modified

**agent-service-builder:**

```
apps/agent-to-agent/orchestrator/src/
├── mandate/
│   ├── mandate.service.ts            # Create Intent Mandate, track spending, verify constraints
│   ├── mandate.store.ts              # In-memory mandate storage (active mandate + spending history)
│   └── mandate.module.ts
├── payment/
│   └── x402-client.service.ts        # (modified) Check mandate before generating payment proof — verify allowedServices, remaining budget, expiry
└── ask/
    └── ask.service.ts                # (modified) Create mandate at start of Ask flow, pass mandateId through task delegation
```

**dashboard-builder:**

```
apps/agent-to-agent/web/app/
├── components/
│   └── shared/
│       └── MandateStatus.tsx         # Left panel widget — shows mandate constraints, remaining budget, spending history
└── hooks/
    └── useMandate.ts                 # Track mandate state from AG-UI events
```

### Mandate creation flow

When the user submits a request via Ask:
1. Orchestrator creates an Intent Mandate:
   ```json
   {
     "type": "intent",
     "mandateId": "mandate-uuid",
     "issuer": "user:demo-user",
     "agent": "agent:orchestrator-001",
     "constraints": {
       "maxAmount": { "value": 20000, "currency": "USD" },
       "maxPerTransaction": { "value": 500, "currency": "USD" },
       "allowedServices": ["premium-data-service"],
       "validFrom": "2026-04-01T00:00:00Z",
       "validUntil": "2026-04-01T23:59:59Z"
     },
     "signature": "mock-base64-signature"
   }
   ```
2. Before any x402 payment, orchestrator checks:
   - `allowedServices` includes the target service
   - `maxAmount - totalSpent >= paymentAmount`
   - Current time is between `validFrom` and `validUntil`
3. If mandate check fails, orchestrator emits error — does not pay
4. After successful payment, orchestrator decrements remaining budget

### Verification

```bash
# Submit a request — mandate should be created
curl -X POST http://localhost:4000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"request": "Plan me a team dinner for 6 people under $200"}'
# → { "runId": "..." }

# The mandate is internal state — verify by checking the AG-UI event stream (Milestone 6)
# For now, verify via the orchestrator's mandate store:
# Add a debug endpoint (temporary) or check logs for:
# - "Mandate created: mandate-xxx"
# - "Mandate check passed for premium-data-service: $100 of $20000 remaining"
# - "Mandate spending updated: $100 spent, $19900 remaining"

# Open browser — MandateStatus component in left panel shows:
# - Budget: $200.00 remaining of $200.00
# - After x402 payment: Budget: $199.00 remaining of $200.00
```

**Done when:** Mandate is created at the start of every Ask flow. x402 payments are blocked if mandate constraints are violated. Dashboard left panel shows mandate status with live budget updates.

---

## Milestone 6: AG-UI Streaming + Protocol Feed

**What gets built:** SSE endpoint on orchestrator for AG-UI events. Every protocol exchange (A2A discovery, task delegation, x402 payment, AP2 mandate) emits a corresponding AG-UI event. Dashboard Ask mode streams color-coded protocol cards in real time.

**Agents:** agent-service-builder (SSE endpoint + event emission), dashboard-builder (streaming UI)

### Files created/modified

**agent-service-builder:**

```
apps/agent-to-agent/orchestrator/src/
├── ag-ui/
│   ├── ag-ui.controller.ts           # GET /ag-ui/stream?runId={id} — SSE endpoint; POST /ag-ui/state — accept state deltas
│   ├── ag-ui.service.ts              # Event bus — emit events, manage SSE connections, support Last-Event-ID reconnection
│   ├── ag-ui.gateway.ts              # (optional) Manages per-runId event streams, replays missed events
│   └── ag-ui.module.ts
├── exchange-log/
│   ├── exchange-log.service.ts       # Store every protocol exchange in memory for later inspection (Milestone 7)
│   └── exchange-log.module.ts
├── tasks/
│   └── tasks.service.ts              # (modified) Emit AG-UI CUSTOM event for every tasks/send and tasks/get call
├── payment/
│   └── x402-client.service.ts        # (modified) Emit AG-UI CUSTOM event for every 402 response and payment retry
├── mandate/
│   └── mandate.service.ts            # (modified) Emit AG-UI CUSTOM event when mandate is created
├── discovery/
│   └── discovery.service.ts          # (modified) Emit AG-UI CUSTOM events as each agent is discovered
└── ask/
    └── ask.service.ts                # (modified) Emit RUN_STARTED at begin, TEXT_MESSAGE_* for final response, RUN_FINISHED/RUN_ERROR at end
```

**dashboard-builder:**

```
apps/agent-to-agent/web/app/
├── components/
│   ├── ask/
│   │   ├── AskInput.tsx              # Text input with Ask button
│   │   ├── ConversationArea.tsx      # Streams TEXT_MESSAGE_CONTENT chunks
│   │   └── ProtocolTimeline.tsx      # Chronological feed of protocol exchange cards
│   ├── shared/
│   │   ├── ExchangeCard.tsx          # Single exchange card: timestamp, source→target, protocol badge, summary; pulses while active; red border on failure
│   │   └── ProtocolFilters.tsx       # Checkboxes with colored dots per protocol type
│   └── layout/
│       └── RightPanel.tsx            # (modified) Live protocol inspector feed
├── hooks/
│   ├── useAgUiStream.ts             # SSE client — connect to /ag-ui/stream, parse events, update state
│   └── useProtocolExchanges.ts      # Derived state — filter exchanges by protocol type
└── page.tsx                          # (modified) Wire Ask mode into center panel
```

### AG-UI event format

Every protocol exchange emits a `CUSTOM` event:

```json
{
  "type": "CUSTOM",
  "event": "protocol-exchange",
  "runId": "run-001",
  "timestamp": "2026-04-01T12:00:01.234Z",
  "data": {
    "exchangeId": "exch-001",
    "protocol": "a2a",
    "source": "orchestrator",
    "target": "restaurant-agent",
    "method": "tasks/send",
    "summary": "Search restaurants for 6 people, under $200",
    "requestBody": { "...full JSON-RPC request..." },
    "responseBody": { "...full JSON-RPC response..." },
    "duration": 156,
    "status": "completed"
  }
}
```

### Protocol colors in UI

| Protocol | Badge color | Hex |
|----------|------------|-----|
| A2A | Blue | `#3B82F6` |
| x402 | Green | `#10B981` |
| AP2 | Gold | `#F59E0B` |
| MCP | Purple | `#8B5CF6` |
| HTTP | Gray | `#6B7280` |

### SSE requirements

- `Content-Type: text/event-stream`
- Each event includes `id` field for `Last-Event-ID` reconnection support
- On client connect, send `STATE_SNAPSHOT` with current topology and any in-progress tasks
- Events arrive within 100ms of backend activity

### Verification

```bash
# Open SSE stream in one terminal
curl -N http://localhost:4000/ag-ui/stream?runId=test-run

# In another terminal, trigger the Ask flow
curl -X POST http://localhost:4000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"request": "Plan me a team dinner for 6 people under $200"}'

# The SSE terminal should show events streaming:
# data: {"type":"RUN_STARTED","runId":"..."}
# data: {"type":"CUSTOM","event":"protocol-exchange","data":{"protocol":"ap2",...}}
# data: {"type":"CUSTOM","event":"protocol-exchange","data":{"protocol":"a2a",...}}
# ... more exchanges ...
# data: {"type":"TEXT_MESSAGE_START",...}
# data: {"type":"TEXT_MESSAGE_CONTENT",...}
# data: {"type":"TEXT_MESSAGE_END",...}
# data: {"type":"RUN_FINISHED",...}

# Open browser to http://localhost:3000
# Switch to Ask mode
# Type "Plan me a team dinner for 6 people under $200" and click Ask
# Protocol timeline fills with color-coded exchange cards:
#   Gold (AP2) mandate creation
#   Blue (A2A) orchestrator → restaurant-agent
#   Blue (A2A) restaurant-agent response
#   Blue (A2A) orchestrator → booking-agent
#   Gray (HTTP) booking-agent → premium-data-service
#   Green (x402) 402 payment required
#   Green (x402) payment proof + retry
#   Blue (A2A) booking-agent response
# Conversation area shows the final response text
```

**Done when:** SSE stream emits all AG-UI event types during the full Ask flow. Dashboard Ask mode shows streaming conversation and color-coded protocol timeline. Cards appear in real time as exchanges happen. Protocol filters show/hide exchanges by type.

---

## Milestone 7: Wire Inspector (Explore Mode)

**What gets built:** Explore mode on the dashboard — click any exchange card to see full raw request/response JSON. Click any agent node to see the full Agent Card. Protocol exchange log stored in orchestrator memory for inspection.

**Agent:** dashboard-builder

### Files created/modified

```
apps/agent-to-agent/web/app/
├── components/
│   ├── explore/
│   │   ├── ExchangeDetail.tsx        # Full raw request/response viewer: HTTP method, headers, body (syntax-highlighted JSON), timing breakdown, protocol validation status
│   │   ├── AgentDetail.tsx           # Full Agent Card JSON viewer, skill list with I/O modes, task history, payment gate config
│   │   ├── WireInspector.tsx         # Container — renders ExchangeDetail or AgentDetail based on selection
│   │   └── JsonViewer.tsx            # Reusable syntax-highlighted JSON component (collapsible nodes)
│   ├── shared/
│   │   ├── ExchangeCard.tsx          # (modified) onClick navigates to Explore mode with exchange selected
│   │   └── MandateStatus.tsx         # (modified) onClick expands to show full mandate JSON and spending history
│   └── discover/
│       └── TopologyGraph.tsx         # (modified) onClick on agent node navigates to Explore mode with agent selected
├── hooks/
│   └── useExplore.ts                # State management for Explore mode — selected exchange or agent, raw data
└── page.tsx                          # (modified) Wire Explore mode into center panel
```

### Explore mode — exchange detail view

When the user clicks an exchange card, the center panel shows:

```
┌─────────────────────────────────────────────────────────┐
│  A2A  orchestrator → restaurant-agent    +0.2s  156ms   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  REQUEST                                                │
│  POST http://localhost:4001                              │
│  Content-Type: application/json                          │
│                                                         │
│  {                                                      │
│    "jsonrpc": "2.0",                                    │
│    "id": "req-001",                                     │
│    "method": "tasks/send",                              │
│    "params": { ... }                                    │
│  }                                                      │
│                                                         │
│  RESPONSE                                               │
│  200 OK                                                 │
│                                                         │
│  {                                                      │
│    "jsonrpc": "2.0",                                    │
│    "id": "req-001",                                     │
│    "result": { ... }                                    │
│  }                                                      │
│                                                         │
│  TIMING                                                 │
│  Total: 156ms                                           │
│                                                         │
│  PROTOCOL VALIDATION: ✓ Valid JSON-RPC 2.0              │
└─────────────────────────────────────────────────────────┘
```

### Verification

```bash
# Run the full Ask flow first (to generate exchanges)
# Open browser to http://localhost:3000
# Complete an Ask flow

# Click any blue (A2A) exchange card
# → Center panel shows raw JSON-RPC request and response, syntax-highlighted
# → Headers visible (Content-Type, etc.)
# → Timing shows duration

# Click the green (x402) exchange card
# → Shows 402 response with x402Version and accepts array
# → Shows retry request with X-PAYMENT header
# → Shows 200 response with review data

# Click the gold (AP2) card
# → Shows full mandate JSON with constraints and signature

# Click an agent node in the topology graph
# → Shows full Agent Card JSON
# → Lists skills with input/output modes
# → Shows recent task history

# Click mandate status in left panel
# → Expands to show full mandate JSON and spending history list

# Toggle protocol filters
# → Unchecking A2A hides all blue cards from timeline
# → Re-checking restores them
```

**Done when:** Every exchange card and agent node is clickable. Raw JSON is syntax-highlighted and shows both request and response. Protocol filters work. Mandate inspector shows full JSON and spending history.

---

## Milestone 8: End-to-End Flow + Polish

**What gets built:** Wire the complete "team dinner" story end-to-end. Error handling for agent failures. Visual polish on the dashboard. Resilience testing.

**Agents:** protocol-architect (integration testing, error handling), dashboard-builder (visual polish)

### Files created/modified

**protocol-architect:**

```
apps/agent-to-agent/orchestrator/src/
├── ask/
│   └── ask.service.ts                # (modified) Full "team dinner" orchestration flow:
│                                     #   1. Create AP2 mandate
│                                     #   2. Delegate to restaurant-agent (find restaurants for 6 under $200)
│                                     #   3. Delegate to booking-agent (check availability for top pick)
│                                     #   4. Handle 402 → pay → retry for premium reviews
│                                     #   5. Booking-agent completes reservation
│                                     #   6. Aggregate results into conversational response
│                                     #   7. Emit TEXT_MESSAGE with final recommendation
│                                     #   8. Emit RUN_FINISHED
├── discovery/
│   └── discovery.service.ts          # (modified) Graceful handling of unreachable agents — return them as offline nodes
└── tasks/
    └── tasks.service.ts              # (modified) Connection error handling — catch ECONNREFUSED, emit RUN_ERROR or partial result
```

**dashboard-builder:**

```
apps/agent-to-agent/web/app/
├── components/
│   ├── discover/
│   │   └── TopologyGraph.tsx         # (modified) Offline agents show grayed-out with dashed border
│   ├── ask/
│   │   ├── ConversationArea.tsx      # (modified) Error state rendering — show RUN_ERROR message
│   │   └── ProtocolTimeline.tsx      # (modified) Failed exchange cards have red border
│   ├── shared/
│   │   └── ExchangeCard.tsx          # (modified) Red border + error summary for failed exchanges
│   └── layout/
│       ├── LeftPanel.tsx             # (modified) Agent status dots (green=online, gray=offline)
│       └── CenterPanel.tsx           # (modified) Smooth transitions between modes
├── globals.css                       # (modified) Polish — animations for card entry, pulse for active exchanges, responsive breakpoints
└── page.tsx                          # (modified) Final integration — all modes working, responsive layout
```

### Full "team dinner" flow (steps 1-15 from PRD architecture diagram)

1. **[AP2/Gold]** User submits "Plan me a team dinner for 6 people under $200" → Orchestrator creates Intent Mandate ($200 limit)
2. **[A2A/Blue]** Orchestrator → Restaurant Agent: `tasks/send` "find restaurants for 6, under $200"
3. **[A2A/Blue]** Restaurant Agent → Orchestrator: task completed (3 restaurant options)
4. **[A2A/Blue]** Orchestrator → Booking Agent: `tasks/send` "check availability & book best option"
5. **[HTTP/Gray]** Booking Agent → Premium Data: `GET /api/reviews/rest-001`
6. **[x402/Green]** Premium Data → Booking Agent: 402 Payment Required
7. **[A2A/Blue]** Booking Agent → Orchestrator: task `input-required` (payment needed)
8. **[AP2/Gold]** Orchestrator: verify mandate covers $1.00 for premium-data-service
9. **[x402/Green]** Orchestrator → Premium Data: `GET /api/reviews/rest-001` + `X-PAYMENT` header
10. **[x402/Green]** Premium Data → Orchestrator: 200 OK + review data
11. **[A2A/Blue]** Orchestrator → Booking Agent: `tasks/send` (continue with review data)
12. **[A2A/Blue]** Booking Agent → Orchestrator: task completed (reservation confirmed)
13. **[AG-UI]** Orchestrator → Dashboard: All above as CUSTOM protocol-exchange events
14. **[AG-UI]** Orchestrator → Dashboard: TEXT_MESSAGE with final conversational response
15. **[AG-UI]** Orchestrator → Dashboard: RUN_FINISHED

### Error handling

| Scenario | Orchestrator behavior | Dashboard behavior |
|----------|----------------------|-------------------|
| Agent port unreachable (ECONNREFUSED) | Emit CUSTOM event with `status: "failed"`, skip that agent, continue if possible or emit RUN_ERROR | Exchange card with red border, error summary. Topology node goes gray |
| Task times out (>10s) | Cancel task, emit CUSTOM with `status: "timeout"`, try next agent or fail | Exchange card shows timeout, pulsing stops |
| Mandate budget exceeded | Do not pay, emit CUSTOM with AP2 error, ask user via TEXT_MESSAGE | Gold card with error: "Budget exceeded" |
| Invalid payment proof | Premium-data-service returns 403, orchestrator emits x402 error | Green card with error: "Payment rejected" |

### Visual polish checklist

- [ ] Card entry animation (slide in from top, fade in)
- [ ] Active exchange pulse animation
- [ ] Smooth mode transitions (fade or slide)
- [ ] Responsive: left panel → drawer on narrow screens
- [ ] Responsive: right panel → bottom sheet on narrow screens
- [ ] Loading states for discovery and ask
- [ ] Empty states for each panel
- [ ] Proper scrolling behavior (timeline auto-scrolls, pauses when user scrolls up)

### Verification

```bash
# === Full happy path ===
# Start all 5 services
# Open http://localhost:3000

# 1. Click Discover
#    → All 4 agents appear on topology graph
#    → Premium-data-service has lock icon
#    → All nodes show green status dots

# 2. Switch to Ask mode
#    → Type "Plan me a team dinner for 6 people under $200"
#    → Click Ask
#    → Watch protocol timeline fill with color-coded cards:
#      Gold → Blue → Blue → Blue → Gray → Green → Blue → Green → Green → Blue → Blue
#    → Conversation area shows final recommendation text
#    → Mandate status shows reduced budget
#    → Total flow completes in under 30 seconds

# 3. Click any exchange card
#    → Explore mode shows raw JSON
#    → Both request and response visible

# 4. Click an agent node
#    → Full Agent Card JSON visible

# === Resilience test ===
# Kill restaurant-agent (Ctrl+C on port 4001)

# 5. Click Discover
#    → Restaurant-agent node appears grayed out with dashed border

# 6. Submit another request
#    → Orchestrator reports failure gracefully
#    → Dashboard shows error card, does not crash
#    → RUN_ERROR event received

# Restart restaurant-agent
# 7. Click Discover again
#    → Restaurant-agent node returns to normal (green, solid border)
```

**Done when:** The complete "team dinner" story runs end-to-end in under 30 seconds. All protocol exchanges are visible and color-coded. Killing an agent port shows graceful failure on the dashboard. All 4 success criteria from the intention are met.

---

## Risk Register

| Risk | Mitigation |
|------|-----------|
| NestJS SSE support is non-trivial | Use `@nestjs/event-emitter` + manual SSE controller with `@Sse()` decorator or raw `Response` streaming. Test SSE early in Milestone 6 |
| Force-directed graph layout complexity | Use a lightweight library (e.g., `d3-force` or `react-force-graph`) rather than building from scratch. 4 nodes is simple enough for basic positioning |
| JSON-RPC 2.0 compliance gaps | The shared types package (Milestone 1) defines the exact format. Validate all requests/responses against the type definitions. Test with malformed requests in Milestone 3 |
| Race conditions in multi-agent orchestration | Keep it simple — orchestrate sequentially (restaurant first, then booking). Parallel delegation is a stretch goal, not required |
| SSE reconnection edge cases | Store all events per runId in the exchange log. On reconnect with `Last-Event-ID`, replay from that point. Keep it simple with in-memory storage |
| Dashboard state management complexity | Use React context + useReducer for global state (exchanges, topology, mandate). Avoid external state management libraries |

---

## Execution Order Summary

| Milestone | Agent(s) | Depends on | Key deliverable |
|-----------|----------|------------|----------------|
| 1 | protocol-architect | — | 5 services start on their ports |
| 2 | agent-service-builder, dashboard-builder | 1 | Agent Cards + discovery + topology graph |
| 3 | agent-service-builder | 2 | JSON-RPC task delegation working |
| 4 | agent-service-builder | 3 | x402 payment gate: 402 → pay → access |
| 5 | agent-service-builder, dashboard-builder | 4 | AP2 mandates with budget tracking |
| 6 | agent-service-builder, dashboard-builder | 5 | AG-UI streaming + protocol timeline |
| 7 | dashboard-builder | 6 | Wire inspector for raw JSON |
| 8 | protocol-architect, dashboard-builder | 7 | End-to-end flow + resilience + polish |

**Total milestones:** 8
**Estimated execution:** Each milestone is one `/run-plan` invocation with the designated agent(s).
