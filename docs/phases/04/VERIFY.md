# Verify — Phase 04

## Structure

Expected core files: `README`, `OVERVIEW`, `AGENT-TO-AGENT-FUTURE`, `PREREQUISITES`, `COMMANDS`, `STARTER-KIT`, `RUN-ORDER`, `TALKING-POINTS`, `TEACHING`, `PRESENTER-GUIDE`, `DEMO-GRADE-BAR`, and `VERIFY`.

```bash
find docs/phases/04 -maxdepth 1 -type f -print | sort
```

## Runtime

- [ ] Dashboard responds on port 3000
- [ ] Orchestrator responds on port 4000
- [ ] Restaurant Agent Card responds on port 4001
- [ ] Booking Agent Card responds on port 4002
- [ ] Premium service responds on port 4003

## Protocol evidence

- [ ] Agent Cards contain truthful identity, endpoint, capability, and skill data
- [ ] Orchestrator delegates to two independent agents
- [ ] Request, task state, and result are inspectable
- [ ] Premium request produces a real HTTP 402 before retry
- [ ] Mandate purpose, amount, expiry, and spending state are visible
- [ ] Demo clearly labels mock proof or mock signatures
- [ ] AG-UI-style events stream in real time
- [ ] One service can be stopped and failure is visible

## Understanding

- [ ] Learner can explain MCP versus A2A without saying either is inherently “simple”
- [ ] Learner can separate authorization from settlement
- [ ] Learner can explain why A2A is a rail rather than a complete business relationship
- [ ] Learner can name identity, authority, reputation, rate limiting, audit, and human intervention as production concerns
- [ ] Learner can propose one agent-facing company capability
- [ ] Learner can explain how to discourage scattershot agent behavior

## Repository check

```bash
bash scripts/verify-curriculum-structure.sh
```
