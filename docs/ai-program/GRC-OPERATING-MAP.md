---
status: draft
owner: UNASSIGNED
backup-owner: UNASSIGNED
approved-by: UNASSIGNED
last-reviewed: 2026-08-06
next-review: 2026-09-06
applies-to: organization
evidence:
  - PROGRAM-CONTRACT.md
  - COVERAGE-MATRIX.md
  - 08-program-intelligence/QUERY-ACCEPTANCE.md
supersedes: none
---

# GRC operating map

This map makes governance, risk, and compliance questions traceable across the
AI program. It is a routing and answer contract, not a separate policy silo.
The governing requirement, decision, control, or evidence remains in the
applicable category or node, accepted decision record, group/project overlay, or approved
evidence system.

The curriculum version is a **draft course baseline**. It is not client policy,
legal advice, a risk acceptance, or proof of compliance. `UNASSIGNED` owners
and approvers are production-readiness blockers.

## The GRC trace

For every consequential GRC answer, an agent should be able to trace:

```text
authoritative requirement
  → applicable scope
  → risk tier and rationale
  → control or guardrail
  → required evidence and location
  → control owner and approver
  → exception or residual-risk decision
  → last review, next review, and event triggers
```

If any link is missing, the agent reports the exact gap and affected action. It
must not substitute a course example, external framework, vendor claim, or
model inference for an approved organizational decision.

A smaller program profile never removes a trace link that is applicable to the
work. When obligation, risk, data, authority, workforce impact, incident, or a
stricter overlay triggers a hidden node, the trace must include it and the
selected profile must be reassessed.

## Cross-category routing

| GRC concern | Governing program source | Required organizational artifacts |
|---|---|---|
| Applicability, precedence, and normative meaning | [Program contract](PROGRAM-CONTRACT.md), [direction and governance](01-direction-and-governance/README.md), accepted [decisions](07-program-evolution/02-proposals-decisions-and-supersession/README.md), group/project overlays | authoritative source, interpreted requirement, applicable scope, approver |
| Data classification, privacy, secrets, providers, tools, and incidents | [Risk management](03-risk-management/README.md), harness/model decisions | data classes, approved destinations, provider assessment, retention/logging rules, incident path |
| Agent read/write/execute/publish/deploy/message/purchase authority | [Agent authority and human oversight](03-risk-management/03-agent-authority-and-human-oversight/README.md) | authority matrix, human-only actions, technical enforcement, emergency stop |
| Software-change risk and evidence before merge, deploy, or operation | [Delivery and operations](06-delivery-and-operations/README.md), [controls and assurance](05-controls-and-assurance/README.md) | risk tiers, gates, independent review, rollback/recovery, monitoring, stop conditions |
| Tool, skill, agent, MCP, A2A, and payment trust | [Technology governance](02-technology-governance/README.md), [third-party risk](03-risk-management/04-third-party-and-supply-chain-risk/README.md) | exact revision, provenance, permission/data-flow review, identity, mandates, audit/revocation |
| Ownership, exceptions, recertification, and outcomes | [Direction and governance](01-direction-and-governance/README.md), [program evolution](07-program-evolution/README.md), accepted decisions | role map, exception process, review calendar, outcome and incident evidence |
| AI culture, workforce impact, learning, psychological safety, and sentiment | [AI culture, adoption, sentiment, and outcomes](07-program-evolution/06-adoption-outcomes-and-improvement/README.md), [risk management](03-risk-management/README.md), approved obligations | cultural principles, workforce-impact assessment, competency evidence, escalation channels, privacy-governed listening, follow-through |
| Program scale profile | [AI Program profiles](PROGRAM-PROFILES.md), applicable categories, accepted decisions, overlays | selected profile, rationale, excluded concerns, expansion triggers, owner, approver, next review |
| Changed terrain or stale controls | [Program evolution](07-program-evolution/README.md), [program intelligence](08-program-intelligence/README.md) | dated evidence, proposal, migration/rollback, review outcome |

## Requirement-to-control record

Every client implementation should be able to provide this record directly or
through links to its approved systems:

| Field | Required answer |
|---|---|
| Requirement and authoritative source | What exact approved source governs? |
| Applicability and scope | Which organizations, groups, projects, systems, data, people, clients, and actions are covered? |
| Interpretation authority | Who may determine applicability and meaning? |
| Risk tier and rationale | What consequence drives the tier, and who owns it? |
| Control | What preventive, detective, or corrective control implements the requirement? |
| Enforcement surface | Policy, agent instruction, identity/access control, CI gate, runtime control, review, or manual procedure? |
| Evidence and location | What proves the control ran, where is it retained, and who may inspect it? |
| Owner and approver | Who operates the control, approves the decision, and accepts residual risk? |
| Exception path | Who may grant a bounded exception, with which compensating controls, scope, expiration, and revocation? |
| Freshness | Last review, next review, event triggers, and superseding decision |

A Markdown instruction is not technical enforcement. A test result proves only
the behavior it exercised. An accepted exception does not erase the governing
requirement. Agents must describe those limitations rather than overstate
assurance.

## Agent answer procedure

1. **Identify the question and scope.** Name the requested data, action,
   system, repository, group/client, and project.
2. **Retrieve authority.** Read the program contract, this map, relevant category
   and node pages,
   accepted decisions, and stricter overlays. For law, contract, client, audit,
   or regulatory questions, use only the organization’s approved
   interpretation.
3. **Build the trace.** Connect requirement, scope, risk, control, evidence,
   owner/approver, exception, and freshness.
4. **Check implementation.** Identify which committed instruction, canonical
   capability, identity/access rule, CI/runtime control, or human procedure
   enforces the decision and whether evidence shows it ran.
5. **Qualify the answer.** Separate active client policy, course baseline,
   proposal, external information, inference, conflict, and missing data.
6. **Stop safely when incomplete.** If applicability, authority, evidence, or
   approval is missing, state what cannot proceed and route it to the named
   owner. Do not choose the most permissive interpretation.

## Exceptions and conflicts

Every exception should record:

- governing requirement and affected scope;
- business reason and risk created;
- compensating controls and required evidence;
- requester, control owner, risk owner, and authorized approver;
- effective and expiration dates plus review triggers;
- containment, revocation, or rollback; and
- accepted decision record or approved external-system reference.

When sources conflict, apply the precedence in the
[program README](README.md#scope), report the conflict, and use the stricter
safe boundary until the authorized owner resolves it. Lower scopes may add
controls but may not silently weaken a higher-scope requirement.

## Course worksheet and client adoption

The participant worksheet is
[11 — GRC Control Map](../../marketing/adoption-kit/11-grc-control-map.md). It
collects candidate sources, risk tiers, controls, evidence, exceptions, and
owners during the Day 5 clinic.

After authorized review, a client distributes the completed information to the
governing categories and nodes, accepted decision records, group/project overlays, agent
instructions, controls, and evidence systems. The worksheet itself does not
become active policy merely because it was copied into the repository. The
fictional open-enrollment fallback must never be published as client policy.

## Ask this map

- Which approved requirement governs this data, agent action, or software
  change?
- What risk tier applies, who assigned it, and what evidence is required?
- Which control implements the requirement, where is it enforced, and what
  proves it ran?
- Who owns and approves the control, residual risk, and any exception?
- Is the exception current, bounded, evidenced, and revocable?
- Which trace link is missing, conflicting, stale, or only a course default?
- What must stop or remain restricted until the gap is resolved?

## Review triggers

Re-review this map and affected traces after a law, contract, client obligation,
audit finding, data-classification change, provider or tool change, new agent
authority, incident, control failure, repeated exception, architecture change,
owner change, or evidence that a control does not reduce the intended risk.
