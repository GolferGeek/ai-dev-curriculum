# Run order — Phase 04

## Before you start

- [ ] Phase 03 complete (comfortable with research skills and the pipeline)
- [ ] Node.js 20.9+ installed
- [ ] Familiar with the `/intention → /prd → /plan → /run-plan` pipeline
- [ ] Read [OVERVIEW.md](./OVERVIEW.md) and [AGENT-TO-AGENT-FUTURE.md](./AGENT-TO-AGENT-FUTURE.md)
- [ ] Bring one company relationship to redesign for authorized agents

## Steps

| Step | What to type | What happens |
|------|-------------|-------------|
| 1 | Discuss the agent-to-agent future | Separate agent-readable content, tool use, and persistent counterparties |
| 2 | `/intention docs/artifacts/intention-agent-to-agent.md` | Review the intention — what you're building and why |
| 3 | `/prd docs/artifacts/intention-agent-to-agent.md` | Generate a PRD from the intention |
| 4 | `/plan docs/artifacts/prd-agent-to-agent.md` | Create an implementation plan |
| 5 | `/run-plan docs/artifacts/plan-agent-to-agent.md` | Build it — agents create the services and dashboard |
| 6 | Start all services and test | See below |
| 7 | Discover / Ask / Explore | Narrate one complete exchange and one failure |
| 8 | Design your company interface | Complete the worksheet in `STARTER-KIT.md` |
| 9 | `/scan-errors agent-to-agent` | Check for build/test errors |
| 10 | `/commit pr` | Ship it |

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

## Required discussion before close

- What is the difference between invoking a tool and delegating to an independent agent?
- What could an outside agent discover from your company?
- What authority would your company agent have?
- How would you prevent 480 low-fit requests from consuming everyone’s attention?
- Which actions require a human?
- What evidence would settle a dispute?

## If something fails

- **Agent Card not found** → Check that each NestJS service has a `/.well-known/agent-card.json` endpoint
- **A2A task fails** → Check the JSON-RPC handler is accepting `tasks/send` method
- **x402 payment fails** → Check the payment gate is returning proper 402 headers
- **Dashboard not streaming** → Check AG-UI SSE connection between web and orchestrator
- **Build errors** → Run `/fix-errors agent-to-agent`
