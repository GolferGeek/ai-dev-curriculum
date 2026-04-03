---
user-invocable: false
name: a2p-protocol
description: Agent payment protocols — AP2 mandates (authorization), x402 (HTTP micropayments), Commerce ACP (checkout). Required for payment-gated services.
category: protocols
used-by-agents: protocol-architect, agent-service-builder
---

# Agent Payment Protocols (AP2, x402, Commerce ACP)

Three complementary protocols handle the "how agents pay for things" problem. In the demo, AP2 handles authorization and x402 handles execution.

## AP2 Mandates (Authorization Layer)

Created by Google. AP2 defines how a **user authorizes an agent to spend** on their behalf, with cryptographically signed limits.

### Two Mandate Types

**Intent Mandate** — Delegated spending with rules. "My agent can spend up to $50/day on invoice services."

```json
{
  "type": "intent",
  "mandateId": "mandate-001",
  "issuer": "user:alice@example.com",
  "agent": "agent:orchestrator-001",
  "constraints": {
    "maxAmount": { "value": 5000, "currency": "USD" },
    "maxPerTransaction": { "value": 1000, "currency": "USD" },
    "allowedServices": ["invoice-agent", "payment-agent"],
    "validFrom": "2025-01-01T00:00:00Z",
    "validUntil": "2025-12-31T23:59:59Z"
  },
  "signature": "base64-encoded-signature"
}
```

**Cart Mandate** — Explicit checkout authorization. The user reviews a specific list of charges and approves. "Yes, pay $25 for this invoice processing."

```json
{
  "type": "cart",
  "mandateId": "mandate-002",
  "issuer": "user:alice@example.com",
  "agent": "agent:orchestrator-001",
  "items": [
    {
      "service": "invoice-agent",
      "skill": "create-invoice",
      "amount": { "value": 25, "currency": "USD" },
      "description": "Generate invoice INV-2024-001"
    }
  ],
  "totalAmount": { "value": 25, "currency": "USD" },
  "signature": "base64-encoded-signature"
}
```

**Key properties:**
- Mandates are **cryptographically signed** by the user (or their wallet).
- Agents present mandates to payment-gated services as proof of authorization.
- Services verify the signature, check constraints, and either accept or reject.
- Mandates are **revocable** — the user can cancel at any time.

### Demo Usage

The user sets up an Intent Mandate at the start: "Allow my orchestrator to spend up to $X across these agents." The dashboard shows this as a gold AP2 event. Each subsequent payment references the mandate.

## x402 (Payment Execution Layer)

Created by Coinbase. HTTP 402 Payment Required, finally given a real protocol. The server says "pay me," the client pays, and retries with proof. Sub-second settlement.

### The x402 Flow (3 HTTP Exchanges)

**Step 1 — Client requests a paid resource:**
```http
POST /tasks/send HTTP/1.1
Host: invoice-agent:3301
Content-Type: application/json

{ "jsonrpc": "2.0", "method": "tasks/send", ... }
```

**Step 2 — Server responds with 402 and payment instructions:**
```http
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "x402Version": 1,
  "accepts": [
    {
      "scheme": "exact",
      "network": "base-sepolia",
      "maxAmountRequired": "25000000",
      "resource": "http://invoice-agent:3301/tasks/send",
      "description": "Invoice creation fee",
      "mimeType": "application/json",
      "payTo": "0xServiceWallet..."
    }
  ]
}
```

**Step 3 — Client pays and retries with proof:**
```http
POST /tasks/send HTTP/1.1
Host: invoice-agent:3301
Content-Type: application/json
X-PAYMENT: base64-encoded-payment-proof

{ "jsonrpc": "2.0", "method": "tasks/send", ... }
```

Server verifies the payment proof, processes the request, returns the result with `200 OK`.

### Demo Usage

For the demo, x402 payments are **mocked** — no real blockchain required. The payment gate returns 402, the client "pays" (generates a mock proof token), and retries. The dashboard shows this as a green x402 event with the amount, payer, and payee.

**Mock implementation:** The payment proof is a signed JSON blob with `{ amount, payer, payee, timestamp, nonce }`. The server checks the signature but does not verify on-chain.

## Commerce ACP (Structured Checkout)

Created by OpenAI and Stripe. A structured protocol for product discovery, cart building, negotiation, and purchase completion. More complex than x402, designed for e-commerce flows.

**Four phases:**
1. **Discover** — Agent queries a catalog, gets product listings.
2. **Cart** — Agent builds a cart with selected items.
3. **Negotiate** — Optional price negotiation or coupon application.
4. **Complete** — Agent submits the cart for purchase, gets confirmation.

### Demo Usage

Commerce ACP is **referenced but not implemented** in the basic demo. It exists to show learners the full landscape. If time allows, a product catalog agent could expose ACP endpoints.

## Protocol Interaction in the Demo

```
User sets AP2 Intent Mandate (gold)
  └─> Orchestrator calls Invoice Agent via A2A (blue)
        └─> Invoice Agent returns 402 (green)
        └─> Orchestrator pays via x402 with mandate reference (green + gold)
        └─> Invoice Agent processes and returns result (blue)
```

The AP2 mandate is the **authorization** ("you may spend"). The x402 exchange is the **execution** ("here is the payment"). They work together: x402 without AP2 means the agent has no user authorization. AP2 without x402 means authorization exists but no payment mechanism.

## Hard Rules for Implementation

1. **x402 gates go on the agent service**, not the orchestrator. The service decides what costs money.
2. **AP2 mandates are checked by the orchestrator** before attempting payment. If the mandate does not cover the cost, the orchestrator asks the user (via AG-UI) before proceeding.
3. **Mock payments are fine** for the demo — the protocol exchange matters, not real money.
4. **Every payment event must be logged** with: amount, payer agent, payee agent, mandate reference, timestamp. The dashboard reads these logs.
5. **x402 responses must include** `x402Version`, `accepts` array, and `payTo` address — even in mock mode.
