# Commands — Phase 04

## Build chain

```text
/intention docs/artifacts/intention-agent-to-agent.md
/prd docs/artifacts/intention-agent-to-agent.md
/plan docs/artifacts/prd-agent-to-agent.md
/run-plan docs/artifacts/plan-agent-to-agent.md
```

## Quality chain

```text
/scan-errors agent-to-agent
/monitor agent-to-agent
/fix-errors agent-to-agent
/commit pr
```

## Start the services

From `apps/agent-to-agent/`, run each service in its own terminal:

```bash
cd orchestrator && npm run start:dev
cd restaurant-agent && npm run start:dev
cd booking-agent && npm run start:dev
cd premium-data-service && npm run start:dev
cd web && npm run dev
```

## Inspect the protocol surfaces

```bash
curl http://localhost:4001/.well-known/agent-card.json
curl http://localhost:4002/.well-known/agent-card.json
curl -i http://localhost:4003/reviews
curl -N http://localhost:4000/events
```

Use the dashboard for the full narrative: **Discover → Ask → Explore**.

