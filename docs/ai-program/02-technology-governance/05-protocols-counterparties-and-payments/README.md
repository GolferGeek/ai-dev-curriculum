---
status: draft
owner: UNASSIGNED
backup-owner: UNASSIGNED
approved-by: UNASSIGNED
last-reviewed: 2026-07-28
next-review: 2026-10-28
applies-to: organization
evidence: []
supersedes: none
---

# Agent systems and protocols

This node governs agents that use tools, delegate to other agents, represent
people or organizations, exchange value, and expose agent-facing interfaces.

## Durable distinctions

| Need | Mechanism |
|---|---|
| Give an agent access to a tool, resource, or prompt | MCP or a native tool/API |
| Delegate a goal to an independently operated actor | A2A-style protocol |
| Stream agent state and events to a user interface | AG-UI-style event contract |
| Express bounded purchasing authority | Mandate/policy layer such as AP2 |
| Settle a machine-readable payment request | Payment rail such as x402 |

MCP can be bidirectional; “one-way versus two-way” is not the governing
distinction. The useful boundary is **capability versus counterparty**.

## Decisions the client must make

- Which agent-facing protocols and versions are approved.
- Whether an agent represents a person, team, company, or service.
- Identity, authentication, authorization, delegation, and revocation.
- Agent discovery and trust of external cards or capability claims.
- Task contracts, timeouts, cancellation, retries, idempotency, and disputes.
- Data minimization, tenant isolation, records, and retention.
- Spending mandates, limits, confirmation, refunds, and reconciliation.
- Human intervention points and emergency stop.
- Event, trace, artifact, and audit requirements.
- Counterparty onboarding, reputation, contracts, and liability.

## Required rule

A protocol is a rail, not a complete business relationship. Technical
interoperability does not establish identity, legal authority, trust,
reputation, privacy, payment recourse, or accountability.

## Ask this node

- Is this a tool integration or an independent delegated actor?
- May our agent discover and engage this counterparty?
- Who is represented and what authority can be delegated?
- What evidence, trace, and human intervention are required?
- How are payment and non-payment disputes handled?
- What happens when an agent times out, lies, changes capability, or is revoked?

## Review triggers and evidence

Pin specifications and SDKs to dated versions. Maintain conformance,
interoperability, threat-model, and failure-injection evidence. Re-review on a
specification or identity model change, new external counterparty, payment
enablement, security incident, or material expansion of delegated authority.
