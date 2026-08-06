# Prerequisites — Phase 04

## Required

- Phase 03 complete
- Node.js 20.9+ and npm
- Familiarity with `/intention → /prd → /plan → /run-plan`
- Five available local ports: 3000 and 4000–4003
- Permission to run local HTTP services

## Conceptual preparation

Read:

1. [OVERVIEW.md](./OVERVIEW.md)
2. [AGENT-TO-AGENT-FUTURE.md](./AGENT-TO-AGENT-FUTURE.md)
3. [TALKING-POINTS.md](./TALKING-POINTS.md)

Bring one relationship your organization has with a customer, candidate, supplier, or partner. Be ready to identify what could be delegated and what must remain human-controlled.

## Safety preparation

- The lab uses mock payments; do not add a funded production wallet.
- Do not expose real customer, candidate, employee, or payment data.
- Do not automate a platform that prohibits bots or scraping.
- Keep outside agent access local unless authentication and authorization are deliberately configured.
- Treat agent cards as public claims: publish no secret endpoints, credentials, or internal-only capabilities.

## Port check

```bash
lsof -i :3000
lsof -i :4000
lsof -i :4001
lsof -i :4002
lsof -i :4003
```
