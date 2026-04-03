---
user-invocable: false
name: ag-ui-protocol
description: AG-UI protocol for agent-to-frontend streaming — event-based real-time updates, state sync, tool progress. Required for the demo dashboard.
category: protocols
used-by-agents: protocol-architect, dashboard-builder
---

# AG-UI Protocol (Agent-to-Frontend)

Created by CopilotKit. An event-based protocol for streaming agent activity to a frontend in real time. The dashboard uses AG-UI to show what agents are doing as it happens.

## Core Concept

AG-UI defines a **standardized event stream** from backend agents to frontend UIs. Instead of polling or custom WebSocket messages, agents emit typed events over SSE. The frontend subscribes and renders accordingly.

This is **not** the same as A2A. A2A is agent-to-agent (backend). AG-UI is agent-to-frontend (backend-to-UI).

## Event Types

### Text Events
| Event | Purpose |
|-------|---------|
| `TEXT_MESSAGE_START` | Begin a new text message |
| `TEXT_MESSAGE_CONTENT` | Incremental text chunk (for streaming) |
| `TEXT_MESSAGE_END` | Text message complete |

### Tool Events
| Event | Purpose |
|-------|---------|
| `TOOL_CALL_START` | Agent is invoking a tool (name, args) |
| `TOOL_CALL_ARGS` | Streaming tool arguments |
| `TOOL_CALL_END` | Tool invocation complete |

### State Events
| Event | Purpose |
|-------|---------|
| `STATE_SNAPSHOT` | Full state replacement |
| `STATE_DELTA` | Incremental state update (JSON patch) |

### Lifecycle Events
| Event | Purpose |
|-------|---------|
| `RUN_STARTED` | Agent run begins |
| `RUN_FINISHED` | Agent run completes |
| `RUN_ERROR` | Agent run failed |
| `STEP_STARTED` | Sub-step begins |
| `STEP_FINISHED` | Sub-step completes |

### Custom Events
| Event | Purpose |
|-------|---------|
| `CUSTOM` | Application-defined event with arbitrary payload |

## SSE Transport

AG-UI events are delivered via **Server-Sent Events** (SSE). The frontend opens a persistent HTTP connection and receives events as they occur.

```
GET /ag-ui/stream?runId=run-001
Accept: text/event-stream

data: {"type":"RUN_STARTED","runId":"run-001","timestamp":"2025-01-01T00:00:01Z"}

data: {"type":"TEXT_MESSAGE_START","messageId":"msg-001"}

data: {"type":"TEXT_MESSAGE_CONTENT","messageId":"msg-001","delta":"Processing your request..."}

data: {"type":"TOOL_CALL_START","toolCallId":"tc-001","name":"a2a-call","args":{"target":"invoice-agent","method":"tasks/send"}}

data: {"type":"TOOL_CALL_END","toolCallId":"tc-001","result":{"status":"completed"}}

data: {"type":"TEXT_MESSAGE_END","messageId":"msg-001"}

data: {"type":"RUN_FINISHED","runId":"run-001"}
```

## Bi-directional State Sync

The frontend can also send state updates **to** the agent via POST:

```http
POST /ag-ui/state
Content-Type: application/json

{
  "runId": "run-001",
  "type": "STATE_DELTA",
  "delta": [
    { "op": "replace", "path": "/filters/protocol", "value": "a2a" }
  ]
}
```

This lets the dashboard filter or configure the agent's behavior mid-run (e.g., "only show me A2A events" or "pause after each payment").

## Demo Dashboard Integration

In the protocol demo, AG-UI serves a specific purpose: **making the invisible visible**. Agent-to-agent calls happen on the backend. The user cannot see them without AG-UI.

### What the Dashboard Receives via AG-UI

Every protocol exchange in the system generates AG-UI events that the dashboard renders:

**A2A calls** (Blue):
```json
{
  "type": "CUSTOM",
  "event": "protocol-exchange",
  "data": {
    "protocol": "a2a",
    "source": "orchestrator",
    "target": "invoice-agent",
    "method": "tasks/send",
    "summary": "Create invoice for Acme Corp",
    "requestBody": { "...raw JSON-RPC..." },
    "responseBody": { "...raw JSON-RPC..." },
    "duration": 234,
    "timestamp": "2025-01-01T00:00:01Z"
  }
}
```

**x402 payments** (Green):
```json
{
  "type": "CUSTOM",
  "event": "protocol-exchange",
  "data": {
    "protocol": "x402",
    "source": "orchestrator",
    "target": "invoice-agent",
    "summary": "Payment: $0.25 for invoice creation",
    "amount": { "value": 25, "currency": "USD" },
    "mandateRef": "mandate-001",
    "timestamp": "2025-01-01T00:00:02Z"
  }
}
```

**AP2 mandates** (Gold):
```json
{
  "type": "CUSTOM",
  "event": "protocol-exchange",
  "data": {
    "protocol": "ap2",
    "source": "user",
    "target": "orchestrator",
    "summary": "Intent Mandate: up to $50 for invoice + payment agents",
    "mandate": { "...mandate JSON..." },
    "timestamp": "2025-01-01T00:00:00Z"
  }
}
```

**MCP tool calls** (Purple):
```json
{
  "type": "TOOL_CALL_START",
  "toolCallId": "tc-002",
  "name": "mcp:database-query",
  "args": { "query": "SELECT * FROM invoices WHERE status = 'pending'" }
}
```

### Color Coding

| Protocol | Color | CSS class |
|----------|-------|-----------|
| A2A | Blue | `protocol-a2a` / `#3B82F6` |
| x402 | Green | `protocol-x402` / `#10B981` |
| AP2 | Gold | `protocol-ap2` / `#F59E0B` |
| MCP | Purple | `protocol-mcp` / `#8B5CF6` |
| HTTP/REST | Gray | `protocol-http` / `#6B7280` |

## Hard Rules for Implementation

1. **All agent activity must emit AG-UI events.** If it happens on the backend, the dashboard must know about it.
2. **Use CUSTOM events for protocol exchanges.** The standard TEXT/TOOL events handle the conversational layer; CUSTOM events handle the protocol visualization layer.
3. **Every event must include a timestamp.** The dashboard uses timestamps to order the protocol timeline.
4. **SSE connection must be resilient.** Auto-reconnect on disconnect. Include `Last-Event-ID` support.
5. **State snapshots on connect.** When a client connects (or reconnects), send a `STATE_SNAPSHOT` with the current agent topology and any in-progress tasks.
