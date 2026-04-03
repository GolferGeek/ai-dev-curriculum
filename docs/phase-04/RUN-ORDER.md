# Run order — Phase 04

## Before you start

- [ ] Phase 03 complete (comfortable with research commands and the pipeline)
- [ ] Node.js 18+ installed
- [ ] Familiar with the `/intention → /prd → /plan → /run-plan` pipeline

## Steps

| Step | What to type | What happens |
|------|-------------|-------------|
| 1 | `/intention docs/artifacts/intention-agent-to-agent.md` | Review the intention — what you're building and why |
| 2 | `/prd docs/artifacts/intention-agent-to-agent.md` | Generate a PRD from the intention |
| 3 | `/plan docs/artifacts/prd-agent-to-agent.md` | Create an implementation plan |
| 4 | `/run-plan docs/artifacts/plan-agent-to-agent.md` | Build it — agents create the services and dashboard |
| 5 | Start all services and test | See below |
| 6 | `/scan-errors agent-to-agent` | Check for build/test errors |
| 7 | `/commit pr` | Ship it |

## Starting the demo

After `/run-plan` completes, start all services:

```bash
# From apps/agent-to-agent/
cd apps/agent-to-agent

# Start each service (separate terminals or use turbo)
cd orchestrator && npm run start:dev      # port 4000
cd restaurant-agent && npm run start:dev  # port 4001
cd booking-agent && npm run start:dev     # port 4002
cd premium-data-service && npm run start:dev # port 4003
cd web && npm run dev                     # port 3000
```

Then open `http://localhost:3000` and click **Discover**.

## If something fails

- **Agent Card not found** → Check that each NestJS service has a `/.well-known/agent-card.json` endpoint
- **A2A task fails** → Check the JSON-RPC handler is accepting `tasks/send` method
- **x402 payment fails** → Check the payment gate is returning proper 402 headers
- **Dashboard not streaming** → Check AG-UI SSE connection between web and orchestrator
- **Build errors** → Run `/fix-errors agent-to-agent`
