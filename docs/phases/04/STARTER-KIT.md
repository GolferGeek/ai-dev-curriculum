# Phase 04 starter kit

## Services

| Service | Port | Responsibility |
|---|---:|---|
| Dashboard | 3000 | Human control, topology, event feed, wire inspector |
| Orchestrator | 4000 | Discovery, delegation, aggregation, event streaming |
| Restaurant agent | 4001 | Specialist A2A task handling |
| Booking agent | 4002 | Specialist A2A task handling and paid-data request |
| Premium data service | 4003 | Mock x402 payment gate |

## Protocol skills

- `a2a-protocol`
- `a2p-protocol`
- `ag-ui-protocol`
- `protocol-dashboard`

## Builder agents

- `protocol-architect`
- `agent-service-builder`
- `dashboard-builder`

## Design worksheet

For one real company relationship, record:

- Principal represented
- Counterparty
- Capability being published
- Discovery method
- Identity and authentication
- Permitted actions
- Required evidence
- Human approval points
- Rate and fan-out limits
- Revocation and expiration
- Audit events
- Failure and dispute path

## Production questions the demo intentionally leaves open

- How are Agent Cards authenticated and updated?
- How is authority delegated and revoked?
- How are credentials isolated?
- How are duplicate messages and payments made idempotent?
- What prevents spam or capability scraping?
- How are disputes, refunds, cancellation, and partial completion handled?
- Which records must be retained?
- What contractual or regulatory duties apply?

