# PRD — Agent-to-Agent Protocol Demo

**Source intention:** `docs/artifacts/intention-agent-to-agent.md`
**App path:** `apps/agent-to-agent/`
**Date:** 2026-04-01

---

## 1. Goals

| # | Goal | Traces to intention |
|---|------|---------------------|
| G1 | A non-technical viewer watches the demo and understands agents discovering, collaborating, and paying for services | Success criterion 1 |
| G2 | A technical viewer clicks any exchange and verifies protocol compliance by inspecting raw JSON-RPC, x402 headers, AP2 mandates, and AG-UI events | Success criterion 2 |
| G3 | The "plan me a team dinner" story completes end-to-end in under 30 seconds | Success criterion 3 |
| G4 | Killing one agent port visibly breaks the topology and the task fails gracefully with a clear error | Success criterion 4 |

## 2. Non-goals

- **Real payment processing.** All x402 payments are mocked. The protocol exchange is what matters, not real money.
- **Production security.** JWT auth is acceptable. No DID/VC, no OAuth flows.
- **AGNTCY ACP, ANP, or other early-stage protocols.** Only A2A, AP2, x402, AG-UI, and MCP.
- **Mobile or native clients.** Dashboard is web-only.
- **Persistent storage.** All state is in-memory. No database required.
- **Commerce ACP implementation.** Referenced in docs for completeness but not built.

## 3. User stories

### US-1: Discover — "Show me what's out there"

**As a** developer evaluating agent protocols,
**I want to** click "Discover" and see all available agents appear on a topology map with their capabilities and payment gates,
**so that** I understand the agent landscape before sending any requests.

**Acceptance criteria:**
- Orchestrator scans ports 4001-4003 for `/.well-known/agent-card.json`
- Each agent that responds appears as a node on the topology graph within 2 seconds
- Each node displays: agent name, description, skills (as pill badges), port number
- Payment-gated agents show a lock icon and green border
- Orchestrator node is larger and centered
- Offline agents (unreachable ports) appear grayed out with a dashed border
- Edges between nodes show communication paths

### US-2: Ask — "Plan me a team dinner"

**As a** developer evaluating agent protocols,
**I want to** type "Plan me a team dinner for 6 people under $200" and watch the protocol exchanges stream in real time, color-coded by protocol type,
**so that** I can see how A2A, x402, AP2, and AG-UI work together to fulfill a real request.

**Acceptance criteria:**
- User types request in center input, clicks "Ask"
- AP2 Intent Mandate is created (gold card in timeline)
- Orchestrator delegates to restaurant-agent via A2A `tasks/send` (blue card)
- Orchestrator delegates to booking-agent via A2A `tasks/send` (blue card)
- Booking-agent requests premium reviews from premium-data-service
- Premium-data-service returns HTTP 402 with x402 payment instructions (green card)
- Orchestrator checks AP2 mandate, pays via x402 mock payment (green + gold cards)
- Premium data flows back; results aggregate at orchestrator
- AG-UI streams all events to dashboard in real time
- Conversational response appears in the top of center panel
- Protocol timeline appears below with all exchanges chronologically ordered
- Each exchange card shows: timestamp, source -> target, protocol badge, summary
- Total flow completes in under 30 seconds

### US-3: Explore — "Show me the raw wire format"

**As a** developer evaluating agent protocols,
**I want to** click any protocol exchange card or agent node and see the full raw request/response JSON, headers, and timing,
**so that** I can verify protocol compliance and understand the exact wire format.

**Acceptance criteria:**
- Clicking a protocol exchange card shows: raw HTTP request (method, headers, body), raw HTTP response (status, headers, body), timing breakdown, protocol validation status
- Clicking an agent node shows: full Agent Card JSON (syntax-highlighted), skills with input/output modes, recent task history, payment gate configuration
- Protocol filter toggles (checkboxes) show/hide exchanges by type: A2A, x402, AP2, MCP, HTTP
- AP2 mandate status is expandable in the left panel showing full mandate JSON and spending history

## 4. Technical requirements

### 4.1 Web Dashboard (`apps/agent-to-agent/web/`)

| Attribute | Value |
|-----------|-------|
| **Stack** | Next.js (App Router), Tailwind CSS |
| **Port** | 3000 |
| **Protocols** | AG-UI (consumer) |

**Endpoints it must expose:**
- `GET /` — Dashboard SPA (three-mode layout)
- No API endpoints — the dashboard is a pure consumer of AG-UI events and agent cards

**Endpoints it must consume:**
- `GET http://localhost:4000/ag-ui/stream?runId={id}` — SSE stream from orchestrator (AG-UI)
- `POST http://localhost:4000/ag-ui/state` — Send state deltas to orchestrator (AG-UI)
- `POST http://localhost:4000/api/discover` — Trigger agent discovery
- `POST http://localhost:4000/api/ask` — Submit user request
- `GET http://localhost:{port}/.well-known/agent-card.json` — Fetch agent cards directly for Discover mode

**Data it renders:**
- Topology graph (nodes = agents from Agent Cards, edges = communication paths)
- Protocol exchange timeline (from AG-UI CUSTOM `protocol-exchange` events)
- Conversational responses (from AG-UI TEXT events)
- Raw JSON inspector (from stored exchange data)
- Mandate status (from AG-UI CUSTOM `protocol-exchange` events with `protocol: "ap2"`)

**Key UI components:**
- `TopologyGraph` — Force-directed node graph, renders Agent Card data
- `ProtocolTimeline` — Chronological card feed, color-coded by protocol
- `WireInspector` — Syntax-highlighted JSON viewer for raw request/response
- `MandateStatus` — AP2 mandate summary with budget remaining
- `ProtocolFilters` — Checkbox toggles per protocol type
- `AskInput` — Natural language input with submit button

### 4.2 Orchestrator (`apps/agent-to-agent/orchestrator/`)

| Attribute | Value |
|-----------|-------|
| **Stack** | NestJS |
| **Port** | 4000 |
| **Protocols** | A2A (client), AP2 (mandate verifier), x402 (payer), AG-UI (producer) |

**Endpoints it must expose:**
- `GET /.well-known/agent-card.json` — Orchestrator's own Agent Card
- `POST /api/discover` — Scan configured agent ports, fetch Agent Cards, return topology
- `POST /api/ask` — Accept user request, begin orchestration flow
- `GET /ag-ui/stream?runId={id}` — SSE endpoint, emits AG-UI events for all protocol activity
- `POST /ag-ui/state` — Accept state deltas from dashboard (e.g., protocol filters)

**Data it returns:**
- `POST /api/discover` returns: `{ agents: AgentCard[], topology: { nodes: [], edges: [] } }`
- `POST /api/ask` returns: `{ runId: string }` (results stream via AG-UI)
- AG-UI stream emits: `RUN_STARTED`, `TEXT_MESSAGE_*`, `TOOL_CALL_*`, `CUSTOM` (protocol-exchange), `STATE_SNAPSHOT`, `RUN_FINISHED`/`RUN_ERROR`

**How it connects to other services:**
- Sends `tasks/send` (A2A JSON-RPC) to restaurant-agent (4001) and booking-agent (4002)
- Sends `tasks/get` (A2A JSON-RPC) to poll task status if needed
- Handles x402 payment flow when any downstream agent returns 402
- Verifies AP2 mandate constraints before authorizing any x402 payment
- Emits every protocol exchange as an AG-UI CUSTOM event to the dashboard

**Internal state (in-memory):**
- Active AP2 mandate (set at start of Ask flow)
- Map of discovered agents (port -> AgentCard)
- Map of active tasks (taskId -> task state)
- Protocol exchange log (array of all exchanges for Explore mode)

### 4.3 Restaurant Agent (`apps/agent-to-agent/restaurant-agent/`)

| Attribute | Value |
|-----------|-------|
| **Stack** | NestJS |
| **Port** | 4001 |
| **Protocols** | A2A (server) |

**Endpoints it must expose:**
- `GET /.well-known/agent-card.json` — Agent Card with skills: `search-restaurants`, `get-restaurant-details`
- `POST /` — A2A JSON-RPC 2.0 handler (accepts `tasks/send`, `tasks/get`, `tasks/cancel`)

**Agent Card skills:**
```json
[
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
]
```

**Data it returns:**
- Task results containing: restaurant name, cuisine type, price range, address, capacity, group-size suitability, estimated cost per person
- Uses hardcoded mock data (5-10 restaurants) — no external API calls

**How it connects to other services:**
- Receives tasks from orchestrator only. Does not call other agents.

### 4.4 Booking Agent (`apps/agent-to-agent/booking-agent/`)

| Attribute | Value |
|-----------|-------|
| **Stack** | NestJS |
| **Port** | 4002 |
| **Protocols** | A2A (server + client), x402 (payer — delegates to orchestrator) |

**Endpoints it must expose:**
- `GET /.well-known/agent-card.json` — Agent Card with skills: `check-availability`, `make-reservation`
- `POST /` — A2A JSON-RPC 2.0 handler

**Agent Card skills:**
```json
[
  {
    "id": "check-availability",
    "name": "Check Availability",
    "description": "Check if a restaurant has availability for a given party size and date",
    "inputModes": ["application/json"],
    "outputModes": ["application/json"]
  },
  {
    "id": "make-reservation",
    "name": "Make Reservation",
    "description": "Book a table at a restaurant (may require premium reviews for selection)",
    "inputModes": ["application/json"],
    "outputModes": ["application/json"]
  }
]
```

**Data it returns:**
- Availability: `{ available: boolean, nextAvailable: string, partySize: number }`
- Reservation: `{ confirmationId: string, restaurant: string, date: string, partySize: number, estimatedTotal: number }`

**How it connects to other services:**
- Receives tasks from orchestrator
- Calls premium-data-service (4003) via HTTP to get premium reviews when making reservation decisions
- When premium-data-service returns 402, booking-agent notifies orchestrator (via task status `input-required`) that payment is needed
- Orchestrator handles the x402 payment and retries on behalf of booking-agent

### 4.5 Premium Data Service (`apps/agent-to-agent/premium-data-service/`)

| Attribute | Value |
|-----------|-------|
| **Stack** | NestJS |
| **Port** | 4003 |
| **Protocols** | x402 (server — payment gate) |

**Endpoints it must expose:**
- `GET /.well-known/agent-card.json` — Agent Card with skills: `premium-reviews`, `premium-ratings`; payment gate indicated
- `GET /api/reviews/:restaurantId` — Payment-gated: returns 402 without valid `X-PAYMENT` header; returns premium review data with valid payment proof
- `GET /api/ratings/:restaurantId` — Payment-gated: same pattern

**x402 response format (when no payment provided):**
```json
HTTP/1.1 402 Payment Required

{
  "x402Version": 1,
  "accepts": [
    {
      "scheme": "exact",
      "network": "base-sepolia",
      "maxAmountRequired": "100",
      "resource": "http://localhost:4003/api/reviews/{restaurantId}",
      "description": "Premium restaurant review access",
      "mimeType": "application/json",
      "payTo": "0xPremiumDataServiceWallet"
    }
  ]
}
```

**Data it returns (after payment):**
- Reviews: `{ restaurantId, reviews: [{ author, rating, text, date }], averageRating, totalReviews }`
- Ratings: `{ restaurantId, overall, food, service, ambiance, value, sampleSize }`
- Uses hardcoded mock data

**How it connects to other services:**
- Receives HTTP requests from booking-agent (or orchestrator on booking-agent's behalf)
- Does not call any other service
- Verifies `X-PAYMENT` header signature (mock verification — checks structure, not blockchain)

## 5. Protocol compliance — minimum required implementation

### 5.1 A2A (Agent-to-Agent)

| Requirement | Detail |
|-------------|--------|
| **Agent Card** | Every agent (orchestrator, restaurant, booking, premium-data) serves `GET /.well-known/agent-card.json` with required fields: `name`, `description`, `url`, `version`, `skills` |
| **JSON-RPC 2.0** | All inter-agent calls use JSON-RPC 2.0 with `jsonrpc`, `method`, `params`, `id` fields. Responses use `result` or `error` |
| **`tasks/send`** | Orchestrator sends tasks to restaurant-agent and booking-agent. Request includes caller-generated UUID as task ID, message with role and parts |
| **`tasks/get`** | Orchestrator can poll task status by ID |
| **`tasks/cancel`** | Agents accept cancel requests and transition task to `canceled` state |
| **Task lifecycle** | Tasks transition through: `submitted` -> `working` -> `completed`/`failed`/`canceled`. Booking-agent uses `input-required` when payment is needed |
| **Error handling** | Unknown methods return JSON-RPC error `-32601`. Invalid requests return `-32600`. Agent offline returns connection error to orchestrator |
| **Message parts** | Messages use `text` parts for natural language and `data` parts (with `mimeType: "application/json"`) for structured results |

### 5.2 AP2 (Agent Payments — Authorization)

| Requirement | Detail |
|-------------|--------|
| **Intent Mandate creation** | When the user clicks "Ask", the orchestrator creates an Intent Mandate with: `type: "intent"`, `mandateId` (UUID), `issuer` (mock user ID), `agent` (orchestrator ID), `constraints` (maxAmount, allowedServices, validFrom, validUntil), `signature` (mock base64) |
| **Mandate verification** | Before any x402 payment, orchestrator checks: (1) mandate covers the payee service, (2) remaining budget >= payment amount, (3) mandate has not expired |
| **Budget tracking** | Orchestrator tracks cumulative spending against the mandate's `maxAmount`. Dashboard shows remaining budget in real time |
| **Mandate event** | Creation emits an AG-UI CUSTOM event with `protocol: "ap2"`, full mandate JSON, displayed as gold card in timeline |

### 5.3 x402 (HTTP Payments — Execution)

| Requirement | Detail |
|-------------|--------|
| **402 response** | Premium-data-service returns `HTTP 402` with body containing `x402Version: 1`, `accepts` array with at least one entry specifying `scheme`, `network`, `maxAmountRequired`, `resource`, `description`, `payTo` |
| **Payment proof** | Orchestrator generates a mock payment proof: `{ amount, payer, payee, timestamp, nonce, mandateRef, signature }`, base64-encodes it, sends as `X-PAYMENT` header on retry |
| **Proof verification** | Premium-data-service decodes `X-PAYMENT`, verifies structure (amount >= required, payee matches, signature format valid). Mock verification only — no on-chain check |
| **Retry with proof** | After payment, orchestrator retries the exact same request with `X-PAYMENT` header. Service returns `200 OK` with the requested data |
| **Payment logging** | Every x402 exchange is logged with: amount, payer agent, payee agent, mandateRef, timestamp. Emitted as AG-UI CUSTOM event (`protocol: "x402"`) |

### 5.4 AG-UI (Agent-to-Frontend)

| Requirement | Detail |
|-------------|--------|
| **SSE endpoint** | Orchestrator exposes `GET /ag-ui/stream?runId={id}` returning `text/event-stream` |
| **Lifecycle events** | Emit `RUN_STARTED` at beginning, `RUN_FINISHED` or `RUN_ERROR` at end |
| **Text events** | Emit `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT` (streamed chunks), `TEXT_MESSAGE_END` for conversational responses |
| **Tool events** | Emit `TOOL_CALL_START`, `TOOL_CALL_END` for MCP tool invocations |
| **Custom protocol events** | Emit `CUSTOM` events with `event: "protocol-exchange"` for every A2A, x402, AP2, and MCP exchange. Payload includes: `protocol`, `source`, `target`, `method`/`summary`, `requestBody`, `responseBody`, `duration`, `timestamp` |
| **State snapshot** | On client connect, send `STATE_SNAPSHOT` with current agent topology and any in-progress tasks |
| **State delta** | Accept `POST /ag-ui/state` for filter updates from dashboard |
| **Timestamps** | Every event includes an ISO 8601 timestamp |
| **Reconnection** | Support `Last-Event-ID` header for reconnection. Replay missed events |

## 6. Dashboard requirements

### 6.1 Discover Mode

| Element | Behavior |
|---------|----------|
| Topology graph | Force-directed or hierarchical node graph in center panel. Agents are nodes, protocol channels are edges |
| Agent nodes | Show name, description excerpt, skill pills, port number. Orchestrator node is larger and centered |
| Payment gate indicator | Lock icon + green border on nodes with x402 gates (premium-data-service) |
| Offline indicator | Grayed out node with dashed border for agents that fail Agent Card fetch |
| Edge hover | Highlights all exchanges between those two agents in the right-panel inspector |
| Node click | Transitions to Explore mode for that agent |
| Auto-discovery | Dashboard does not hardcode agents. It fetches Agent Cards from configured ports. Adding a new agent on a new port should make it appear |

### 6.2 Ask Mode

| Element | Behavior |
|---------|----------|
| Input area | Natural language text input with "Ask" button at top of center panel |
| Conversation area | Top half of center panel — streams conversational response via AG-UI TEXT events |
| Protocol timeline | Bottom half of center panel — chronological feed of protocol exchange cards |
| Exchange cards | Each card: relative timestamp (`+0.2s`), source -> target, colored protocol badge, one-line summary. Cards animate in from top |
| Protocol colors | Blue = A2A (`#3B82F6`), Green = x402 (`#10B981`), Gold = AP2 (`#F59E0B`), Purple = MCP (`#8B5CF6`), Gray = HTTP (`#6B7280`) |
| Active exchange indicator | Cards pulse while exchange is in-progress |
| Failed exchange indicator | Red border and error summary on failed exchanges |
| Card click | Transitions to Explore mode for that exchange |

### 6.3 Explore Mode

| Element | Behavior |
|---------|----------|
| Agent detail view | Full Agent Card JSON (syntax-highlighted), skills with I/O modes, recent task history, payment gate config |
| Exchange detail view | Raw HTTP request (method, headers, body), raw HTTP response (status, headers, body), timing breakdown, protocol validation status |
| Protocol filters | Checkboxes in left panel with colored dots. Toggle to show/hide exchanges by protocol type |
| Mandate inspector | Click mandate status in left panel to see full AP2 mandate JSON and spending history |

### 6.4 Layout (all modes)

```
+------------------+----------------------------+--------------------+
|                  |                            |                    |
|   Left Panel     |      Center Panel          |   Right Panel      |
|                  |                            |                    |
|  - Agent list    |  Discover: topology graph  |  Protocol Inspector|
|    (with status) |  Ask: conversation +       |                    |
|  - Mode selector |       protocol timeline    |  - Live feed of    |
|    (Discover/    |  Explore: detail view      |    all exchanges   |
|     Ask/Explore) |                            |  - Filterable by   |
|  - Protocol      |                            |    protocol type   |
|    filter toggles|                            |  - Click to expand |
|  - Mandate status|                            |    raw JSON        |
|    (AP2 summary) |                            |                    |
+------------------+----------------------------+--------------------+
```

On narrow screens: left panel becomes a drawer, right panel becomes a bottom sheet. Center panel always takes priority.

## 7. Test expectations

Each demo-grade minimum maps to a verifiable test.

| Demo-grade minimum | How to verify |
|--------------------|---------------|
| All 5 services start independently on designated ports | Start each service individually. `curl http://localhost:{port}/.well-known/agent-card.json` returns valid JSON for ports 4000-4003. `curl http://localhost:3000` returns the dashboard HTML. |
| Discover mode shows all agents with accurate Agent Cards | Click "Discover". All 4 agent nodes appear on topology graph. Each node's name and skills match the agent's Agent Card JSON. Premium-data-service shows lock icon. |
| At least 2 A2A task delegations complete successfully | Submit the "team dinner" request. Verify protocol timeline shows at least 2 blue (A2A) exchange cards: orchestrator -> restaurant-agent and orchestrator -> booking-agent. Both show `status: "completed"` in raw JSON. |
| x402 payment gate works: 402 -> payment -> proof -> access | In the protocol timeline, verify a green (x402) card appears. Click it — raw response shows HTTP 402 with `x402Version: 1` and `accepts` array. Next exchange shows `X-PAYMENT` header and HTTP 200 response with review data. |
| AP2 mandate is created, signed, and verified | First card in protocol timeline is gold (AP2). Click it — shows Intent Mandate JSON with `type: "intent"`, `constraints`, `signature`. Mandate status in left panel shows remaining budget that decreases after x402 payment. |
| AG-UI streams protocol events in real time | Open browser DevTools Network tab. Verify SSE connection to `/ag-ui/stream`. Events arrive within 100ms of backend activity. Events include `RUN_STARTED`, `CUSTOM` (protocol-exchange), `TEXT_MESSAGE_*`, `RUN_FINISHED`. |
| Dashboard shows color-coded protocol exchanges | Protocol timeline contains cards in at least 3 different colors: blue (A2A), green (x402), gold (AP2). Each color matches the correct protocol type. |
| At least one exchange is inspectable | Click any exchange card. Right panel or center panel shows raw JSON request and response, syntax-highlighted, with headers visible. |
| Whole flow completes end-to-end for "team dinner" | From clicking "Ask" to seeing final response with restaurant recommendations + booking confirmation, total elapsed time < 30 seconds. All protocol exchanges are visible in timeline. |
| **Resilience (success criterion 4)** | Kill restaurant-agent (port 4001). Click "Discover" — node appears grayed out. Submit a request — orchestrator reports failure gracefully, AG-UI emits `RUN_ERROR` or partial result with explanation. Dashboard does not crash. |

## 8. Architecture diagram

```
                              +-----------+
                              |   User    |
                              | (Browser) |
                              +-----+-----+
                                    |
                          HTTP :3000 (Next.js)
                                    |
                           +--------v--------+
                           |   Dashboard     |
                           |   (web)         |
                           |   Port 3000     |
                           +--------+--------+
                                    |
                     AG-UI SSE      |     AG-UI POST
                  (stream events)   |   (state deltas)
                                    |
                           +--------v--------+
                           |  Orchestrator   |
                           |  Port 4000      |
                           |                 |
                           | - A2A client    |
                           | - AP2 verifier  |
                           | - x402 payer    |
                           | - AG-UI producer|
                           +---+----+----+---+
                               |    |    |
              A2A tasks/send   |    |    |   A2A tasks/send
            (JSON-RPC 2.0)     |    |    |   (JSON-RPC 2.0)
                               |    |    |
                  +------------+    |    +-------------+
                  |                 |                  |
         +--------v-------+ +------v---------+ +------v---------+
         | Restaurant     | | Booking        | | Premium Data   |
         | Agent          | | Agent          | | Service        |
         | Port 4001      | | Port 4002      | | Port 4003      |
         |                | |                | |                |
         | - A2A server   | | - A2A server   | | - x402 gate    |
         | - Mock data    | | - A2A client   | | - Mock data    |
         +----------------+ +-------+--------+ +-------^--------+
                                    |                   |
                                    |  HTTP GET         |
                                    |  /api/reviews/:id |
                                    +-------------------+
                                     (returns 402 ->
                                      orchestrator pays ->
                                      retry with X-PAYMENT ->
                                      200 + data)

Protocol Flow for "Team Dinner" Request:
=========================================

1. [AP2/Gold]   User -> Orchestrator:   Create Intent Mandate ($200 limit)
2. [A2A/Blue]   Orchestrator -> Restaurant Agent:  tasks/send "find restaurants for 6, under $200"
3. [A2A/Blue]   Restaurant Agent -> Orchestrator:  task completed (3 restaurant options)
4. [A2A/Blue]   Orchestrator -> Booking Agent:     tasks/send "check availability & book best option"
5. [HTTP/Gray]  Booking Agent -> Premium Data:     GET /api/reviews/rest-001
6. [x402/Green] Premium Data -> Booking Agent:     402 Payment Required
7. [A2A/Blue]   Booking Agent -> Orchestrator:     task input-required (payment needed)
8. [AP2/Gold]   Orchestrator: verify mandate covers $1.00 for premium-data-service
9. [x402/Green] Orchestrator -> Premium Data:      GET /api/reviews/rest-001 + X-PAYMENT header
10.[x402/Green] Premium Data -> Orchestrator:      200 OK + review data
11.[A2A/Blue]   Orchestrator -> Booking Agent:     tasks/send (continue with review data)
12.[A2A/Blue]   Booking Agent -> Orchestrator:     task completed (reservation confirmed)
13.[AG-UI]      Orchestrator -> Dashboard:         All above as CUSTOM protocol-exchange events
14.[AG-UI]      Orchestrator -> Dashboard:         TEXT_MESSAGE with final response
15.[AG-UI]      Orchestrator -> Dashboard:         RUN_FINISHED
```

---

**End of PRD.** This document provides sufficient detail for agent-builders to implement each service, protocol layer, and dashboard component without guessing. Each demo-grade minimum has a concrete verification method.
