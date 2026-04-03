---
user-invocable: false
name: protocol-dashboard
description: Design spec for the protocol demo dashboard — topology view, live protocol exchange visualization, wire inspector. The "wow" factor.
category: protocols
used-by-agents: dashboard-builder
---

# Protocol Demo Dashboard

The dashboard is the centerpiece of the Phase 04 demo. It makes agent protocols **visible and tangible** — learners watch colored messages fly between agents in real time, then drill into the raw wire formats to see exactly what happened.

## Three Modes

### 1. Discover Mode (Topology Map)

**Purpose:** Show what agents exist and how they relate to each other.

**How it works:**
1. Dashboard hits each known agent port and fetches `/.well-known/agent-card.json`.
2. Agents that respond get added to a **node graph**.
3. Each node shows: agent name, description, skills list, and a lock icon if the agent has x402 payment gates.
4. Edges between nodes represent known communication paths (derived from previous interactions or configuration).

**Layout:**
- Center panel: Interactive node graph (force-directed or hierarchical). Agents are nodes, protocol channels are edges.
- Clicking a node opens its Agent Card in the right panel (Explore mode).
- Nodes pulse or glow when they are active (receiving/sending tasks).

**Visual details:**
- Orchestrator node is larger, centered.
- Payment-gated agents have a small lock icon and green border.
- Offline agents are grayed out with a dashed border.
- Skill badges appear as small pills beneath each node.

### 2. Ask Mode (Live Protocol Flow)

**Purpose:** User types a request, watches it propagate through the agent system with every protocol exchange visible.

**How it works:**
1. User types a natural language request in the center input (e.g., "Create an invoice for Acme Corp and process payment").
2. The orchestrator receives the request and begins coordinating agents.
3. AG-UI events stream into the dashboard showing each protocol exchange.
4. Messages appear as **colored cards** flowing through a timeline.

**Each protocol exchange card shows:**
- Timestamp (relative, e.g., "+0.2s")
- Source arrow Target (e.g., "orchestrator -> invoice-agent")
- Protocol badge (colored: Blue=A2A, Green=x402, Gold=AP2, Purple=MCP)
- One-line summary (e.g., "Create invoice for Acme Corp")
- Expandable section with raw JSON request/response

**Timeline behavior:**
- New cards animate in from the top.
- Cards stack chronologically.
- Active exchanges pulse until resolved.
- Failed exchanges have a red border and error summary.

**Conversation area:**
- Above the timeline, the agent's conversational response streams in (TEXT events).
- Below the conversation, the protocol timeline shows the "how" behind the response.

### 3. Explore Mode (Wire Inspector)

**Purpose:** Deep inspection of any agent or exchange.

**Activated by:** Clicking an agent node (Discover) or a protocol exchange card (Ask).

**For agents:**
- Full Agent Card JSON, syntax-highlighted.
- List of skills with input/output modes.
- Recent task history.
- Payment gate configuration (if applicable).

**For exchanges:**
- Raw HTTP request (method, headers, body).
- Raw HTTP response (status, headers, body).
- Timing breakdown (DNS, connect, TLS, first byte, total).
- Protocol validation status (did it follow the spec?).

**Protocol toggle filters:**
- Checkboxes to show/hide: A2A, x402, AP2, MCP, HTTP.
- When a protocol is toggled off, its exchanges are hidden from the timeline.

## Layout

```
+------------------+----------------------------+--------------------+
|                  |                            |                    |
|   Left Panel     |      Center Panel          |   Right Panel      |
|                  |                            |                    |
|  - Agent list    |  Discover: topology graph  |  Protocol Inspector|
|  - Mode selector |  Ask: conversation +       |                    |
|  - Protocol      |       protocol timeline    |  - Live feed of    |
|    filter toggles|  Explore: detailed view    |    all exchanges   |
|                  |                            |  - Filterable by   |
|  - Mandate status|                            |    protocol type   |
|    (AP2 summary) |                            |  - Click to expand |
|                  |                            |    raw JSON        |
|                  |                            |                    |
+------------------+----------------------------+--------------------+
```

### Left Panel
- **Agent list:** All discovered agents with status indicators (green dot = online, gray = offline).
- **Mode selector:** Discover / Ask / Explore tabs or buttons.
- **Protocol filters:** Checkboxes with colored dots for each protocol type.
- **Mandate status:** Shows the active AP2 mandate — remaining budget, allowed services, expiry.

### Center Panel
- Changes based on active mode.
- In **Discover**: interactive topology graph.
- In **Ask**: split view — top half is the conversation (streaming text), bottom half is the protocol timeline.
- In **Explore**: full detail view of the selected agent or exchange.

### Right Panel
- **Protocol Inspector:** A live-updating feed of every protocol exchange, regardless of mode.
- Each entry is compact: `[timestamp] [protocol-badge] source -> target: summary`
- Clicking an entry expands it to show raw request/response JSON.
- Filter buttons at the top to show/hide protocol types.
- The feed scrolls automatically but pauses when the user scrolls up.

## Color Coding

Consistent across all modes and panels:

| Protocol | Color | Hex | Usage |
|----------|-------|-----|-------|
| A2A | Blue | `#3B82F6` | Agent-to-agent JSON-RPC calls |
| x402 | Green | `#10B981` | Payment exchanges (402 -> pay -> retry) |
| AP2 | Gold | `#F59E0B` | Mandate creation, verification, budget updates |
| MCP | Purple | `#8B5CF6` | Tool calls via Model Context Protocol |
| HTTP/REST | Gray | `#6B7280` | Plain HTTP calls (health checks, etc.) |

## Key Interactions

1. **Hover on a topology edge:** Highlights all exchanges between those two agents in the inspector.
2. **Click an agent node:** Opens Explore mode for that agent.
3. **Click a protocol card:** Opens Explore mode for that exchange.
4. **Type in Ask mode:** Sends request to orchestrator, streams results.
5. **Toggle protocol filter:** Instantly hides/shows matching exchanges.
6. **Click mandate status:** Expands to show full AP2 mandate JSON and spending history.

## Responsive Behavior

- On narrow screens, the three-panel layout collapses: left panel becomes a drawer, right panel becomes a bottom sheet.
- The center panel always takes priority.
- Protocol badges remain visible even at small sizes (icon-only mode).

## Hard Rules for Implementation

1. **Color coding is non-negotiable.** Every protocol exchange must be visually distinguishable by color. No monochrome protocol feeds.
2. **Raw JSON must be available.** The dashboard is a teaching tool — learners need to see the actual wire format, not just summaries.
3. **Real-time streaming is required.** No polling. AG-UI SSE events drive the display. Exchanges appear within 100ms of occurring.
4. **The topology must auto-discover.** The dashboard fetches Agent Cards — it does not hardcode agent positions. Add a new agent on a new port and it appears.
5. **Explore mode must show both sides.** Request AND response. Headers AND body. Not just the payload.
