---
user-invocable: false
name: a2a-protocol
description: Google A2A protocol spec — Agent Cards, JSON-RPC 2.0 transport, task lifecycle, skill negotiation. Required knowledge for building A2A-compliant agents.
category: protocols
used-by-agents: protocol-architect, agent-service-builder
---

# A2A Protocol (Agent-to-Agent)

Google's open protocol for agent interoperability. Agents discover each other via Agent Cards and communicate via JSON-RPC 2.0 over HTTPS.

## Agent Card

Every A2A-compliant agent serves an **Agent Card** at `/.well-known/agent-card.json`. This is the machine-readable "business card" that tells other agents what this agent can do and how to talk to it.

```json
{
  "name": "invoice-agent",
  "description": "Creates, sends, and manages invoices",
  "url": "http://localhost:3301",
  "version": "1.0.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": false,
    "stateTransitionHistory": true
  },
  "skills": [
    {
      "id": "create-invoice",
      "name": "Create Invoice",
      "description": "Generate a new invoice from line items",
      "inputModes": ["text/plain", "application/json"],
      "outputModes": ["application/json"]
    },
    {
      "id": "send-invoice",
      "name": "Send Invoice",
      "description": "Email an invoice to the recipient",
      "inputModes": ["application/json"],
      "outputModes": ["text/plain"]
    }
  ],
  "authentication": {
    "schemes": ["bearer"]
  },
  "defaultInputModes": ["text/plain", "application/json"],
  "defaultOutputModes": ["text/plain", "application/json"]
}
```

**Required fields:** `name`, `description`, `url`, `version`, `skills`.  
**Optional but recommended:** `capabilities`, `authentication`, `defaultInputModes`, `defaultOutputModes`.

## JSON-RPC 2.0 Transport

All A2A communication uses **JSON-RPC 2.0** over HTTPS. The endpoint is the agent's `url` from the Agent Card.

- Every request has `jsonrpc: "2.0"`, `method`, `params`, and `id`.
- Every response has `jsonrpc: "2.0"`, `result` (or `error`), and `id`.
- No custom HTTP headers required beyond standard auth.

## Task Lifecycle

A **task** is the unit of work in A2A. Every task has a unique `id` and moves through these states:

```
submitted -> working -> completed
                    -> failed
                    -> canceled
         -> input-required -> working (after client provides input)
```

**Six states:**
| State | Meaning |
|-------|---------|
| `submitted` | Task received, not yet started |
| `working` | Agent is actively processing |
| `input-required` | Agent needs more info from the caller |
| `completed` | Task finished successfully |
| `failed` | Task failed (error in result) |
| `canceled` | Task was canceled by the caller |

## Key Methods

### `tasks/send`

Create a new task or continue an existing one. This is the primary method.

**Request:**
```json
{
  "jsonrpc": "2.0",
  "id": "req-001",
  "method": "tasks/send",
  "params": {
    "id": "task-abc-123",
    "message": {
      "role": "user",
      "parts": [
        { "type": "text", "text": "Create an invoice for Acme Corp, 10 widgets at $25 each" }
      ]
    }
  }
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": "req-001",
  "result": {
    "id": "task-abc-123",
    "status": {
      "state": "completed",
      "message": {
        "role": "agent",
        "parts": [
          { "type": "text", "text": "Invoice INV-2024-001 created for Acme Corp." },
          {
            "type": "data",
            "mimeType": "application/json",
            "data": {
              "invoiceId": "INV-2024-001",
              "total": 250.00,
              "currency": "USD"
            }
          }
        ]
      }
    }
  }
}
```

### `tasks/get`

Retrieve the current state of a task.

```json
{
  "jsonrpc": "2.0",
  "id": "req-002",
  "method": "tasks/get",
  "params": { "id": "task-abc-123" }
}
```

### `tasks/cancel`

Cancel a running task.

```json
{
  "jsonrpc": "2.0",
  "id": "req-003",
  "method": "tasks/cancel",
  "params": { "id": "task-abc-123" }
}
```

## Message Format

Messages contain an array of **parts**. Each part has a `type`:

| Part type | Purpose | Key fields |
|-----------|---------|------------|
| `text` | Plain text or markdown | `text` |
| `data` | Structured data | `mimeType`, `data` (object) |
| `file` | Binary or base64 content | `mimeType`, `name`, `bytes` or `uri` |

Messages also carry a `role`: either `"user"` (the caller) or `"agent"` (the service).

## Multi-turn Conversations

When a task enters `input-required`, the caller sends another `tasks/send` with the **same task ID** and additional information. The agent resumes from where it left off.

```
Client: tasks/send { id: "task-1", message: "Create invoice for Acme" }
Agent:  status: input-required, message: "What are the line items?"
Client: tasks/send { id: "task-1", message: "10 widgets at $25 each" }
Agent:  status: completed, message: "Invoice created"
```

## Streaming via SSE

For long-running tasks, use `tasks/sendSubscribe` instead of `tasks/send`. The response is a **Server-Sent Events** stream with incremental updates:

- `TaskStatusUpdateEvent` — state changes (submitted -> working -> completed)
- `TaskArtifactUpdateEvent` — partial results as they become available

The SSE stream stays open until the task reaches a terminal state (completed, failed, canceled).

## Hard Rules for Implementation

1. Every agent **must** serve `/.well-known/agent-card.json` — this is non-negotiable.
2. All inter-agent communication uses **JSON-RPC 2.0** — no REST, no GraphQL, no custom protocols.
3. Task IDs are **caller-generated UUIDs** — the caller controls the ID.
4. Agents must handle **unknown methods** gracefully with JSON-RPC error code `-32601`.
5. Agents must validate **JSON-RPC structure** and return `-32600` for invalid requests.
