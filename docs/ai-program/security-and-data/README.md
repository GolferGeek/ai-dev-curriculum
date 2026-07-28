# Security and data

status: draft
owner: UNASSIGNED
last-reviewed: 2026-07-28
next-review: 2026-10-28
applies-to: organization

This facet governs what agents, harnesses, models, tools, skills, and
counterparties may access and transmit.

## Decisions the client must make

- Data classifications and examples.
- Approved providers, regions, retention, and training-use terms per class.
- Source-code, customer, personal, regulated, export-controlled, and incident
  data rules.
- Secret storage, redaction, rotation, and break-glass access.
- Tool, command, filesystem, browser, network, and external-message authority.
- Sandbox and environment isolation.
- Dependency, skill, agent, model, plugin, and MCP supply-chain review.
- Prompt-injection and untrusted-content defenses.
- Logging, trace privacy, retention, legal hold, and deletion.
- Security incident detection, containment, escalation, and notification.

## Curriculum baseline

- Grant the least data and authority needed for the task.
- Treat instructions and generated code as untrusted until reviewed.
- Never place secrets in prompts, code, screenshots, fixtures, or committed
  logs.
- Separate reading, proposing, writing, publishing, deploying, paying, and
  messaging authority.
- Review every file and script in an imported capability.
- Untrusted content must not be able to redefine higher-priority policy.
- A fallback provider or tool may not silently weaken data controls.

## Ask this facet

- May this data be sent to this model or tool?
- May an agent run this command or contact this host?
- Which credentials can it use, in which environment, and for how long?
- How do we inspect a third-party skill, agent, plugin, or MCP server?
- What must be logged and what must be redacted?
- What is the emergency stop and incident path?

## Review triggers and evidence

Link threat models, provider reviews, data-flow diagrams, pen tests, dependency
scans, incident learnings, and client/contract requirements. Security owners
must review new data classes, external counterparties, payment authority,
autonomous loops, provider changes, and imported executable capabilities.
