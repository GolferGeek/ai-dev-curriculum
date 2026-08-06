---
status: draft
owner: UNASSIGNED
backup-owner: UNASSIGNED
approved-by: UNASSIGNED
last-reviewed: 2026-08-06
next-review: 2026-09-06
applies-to: organization
evidence:
  - README.md
  - PROGRAM-CONTRACT.md
  - COVERAGE-MATRIX.md
  - GRC-OPERATING-MAP.md
supersedes: none
---

# AI Program map

The **AI Program** is the take-home product: one company-owned system for AI
direction, governance, technical decisions, risk, compliance, controls,
delivery practices, organizational learning, and maintained capabilities. The
AI Governance & GRC application is a view and operating interface over this
program. It is not a separate policy or data source.

This map defines the standard hierarchy presented in repository navigation and
the application. It is a draft curriculum structure until an organization
assigns owners, adapts the content, and approves its own program.

## Standard hierarchy

```text
AI Program
├── 1. Direction and governance
│   ├── Purpose, principles, and outcomes
│   ├── Scope, layers, and precedence
│   ├── Roles, ownership, and decision rights
│   ├── Policy, decisions, and exceptions
│   └── Oversight and accountability
├── 2. Technology governance
│   ├── Harnesses and interfaces
│   ├── Models, providers, routing, and spend
│   ├── Skills and specialized agents
│   ├── Tools, plugins, APIs, and MCP
│   ├── Protocols, counterparties, and payments
│   └── Architecture, dependencies, and portability
├── 3. Risk management
│   ├── Risk taxonomy, tiers, and appetite
│   ├── Data, privacy, security, and confidentiality
│   ├── Agent authority and human oversight
│   ├── Third-party and supply-chain risk
│   ├── Operational resilience and failure
│   └── Exceptions, residual risk, and acceptance
├── 4. Compliance and obligations
│   ├── Authoritative source register
│   ├── Applicability, interpretation, and scope
│   ├── Requirements and obligation catalog
│   ├── Client, contractual, and regulatory coverage
│   └── Compliance status and limitations
├── 5. Controls and assurance
│   ├── Control catalog and ownership
│   ├── Enforcement surfaces and guardrails
│   ├── Evidence and retention
│   ├── Control testing and continuous assurance
│   ├── Assessments and audits
│   └── Deficiencies, remediation, and verification
├── 6. Delivery and operations
│   ├── Intention-to-operation lifecycle
│   ├── Quality and release gates
│   ├── Brownfield research and change planning
│   ├── Deployment, migration, rollback, and recovery
│   ├── Observability, incidents, and learning
│   └── Automation and autonomous operations
├── 7. Program evolution
│   ├── Terrain and watchlist
│   ├── Proposals, decisions, and supersession
│   ├── Freshness and scheduled review
│   ├── Ownership and recertification
│   ├── Capability lifecycle
│   └── AI culture, adoption, sentiment, and outcomes
│       ├── Cultural principles and desired behaviors
│       ├── Workforce experience and role impacts
│       ├── AI literacy, training, and coaching
│       ├── Psychological safety and escalation
│       ├── Communication and change management
│       ├── Sentiment, listening, and privacy
│       └── Adoption, outcomes, and improvement
└── 8. Program intelligence
    ├── Health and readiness
    ├── Gaps and missing information
    ├── Change monitoring
    ├── Staleness and expiration
    ├── Conflicts and control failures
    ├── Recommendations and decision support
    └── Citations, provenance, and uncertainty
```

## Category responsibilities

### 1. Direction and governance

Explains why the program exists, where it applies, who has authority, how
policy and exceptions work, and how accountable oversight occurs. This
category supplies the scope and authority needed to interpret every other
category.

### 2. Technology governance

Owns standing and consequential technical choices about AI interfaces, models,
skills, agents, integrations, protocols, architecture, and portability. A
technical choice enters GRC traceability when it affects data, authority,
security, obligations, controls, evidence, cost, or material outcomes.

### 3. Risk management

Defines the organization's AI risk language, appetite, tiers, treatment,
monitoring, human-oversight boundaries, resilience expectations, and authorized
residual-risk or exception decisions.

### 4. Compliance and obligations

Records approved authoritative sources, interpretations, applicability, and
sanitized requirements. Agents route unknown applicability to authorized
interpreters and never substitute external research for company decisions.

### 5. Controls and assurance

Connects requirements and risks to owned preventive, detective, and corrective
controls, their real enforcement surfaces, durable evidence, testing,
assessment, deficiencies, and verified remediation.

### 6. Delivery and operations

Defines how AI-assisted change moves from intention through build, verification,
release, operation, observation, incident response, recovery, and organizational
learning.

### 7. Program evolution

Maintains the program over time through terrain review, preserved decisions,
freshness, ownership recertification, capability lifecycle, culture, workforce
experience, learning, sentiment, adoption, outcomes, and bounded improvement.

### 8. Program intelligence

Defines what the application and its program agent may conclude about health,
gaps, change, staleness, conflicts, failures, and recommended next actions. It
also defines citation, provenance, uncertainty, and safe-answer behavior.

## Migration record

The earlier curriculum facets were consolidated into this hierarchy on
2026-08-06. The mapping below is retained as migration history for reviewers
following renamed or moved material; the former paths are no longer
authoritative homes.

| Former source | Primary destination in this map |
|---|---|
| `adoption-and-measurement/` | Direction and governance; Program evolution |
| `harnesses-and-models/` | Technology governance |
| `skills/` | Technology governance; Program evolution |
| `agent-systems/` | Technology governance; Risk management |
| `security-and-data/` | Risk management; Controls and assurance |
| `coding-governance/` | Direction and governance; Risk management; Delivery and operations |
| `delivery-and-quality/` | Controls and assurance; Delivery and operations |
| `guardrails/` | Controls and assurance; Delivery and operations |
| `GRC-OPERATING-MAP.md` | Compliance and obligations; Controls and assurance |
| `decisions/`, `watchlist.md`, `CHANGE-AND-FRESHNESS.md` | Program evolution |
| `HOW-TO-ASK.md`, `QUERY-ACCEPTANCE.md` | Program intelligence |

Cross-category concerns use links and graph relationships; each normative rule
has one primary home. New references must use the destinations in the standard
hierarchy rather than recreating the former facets.

## Node-document contract

Every category and child node should have an explanatory page. A production
node identifies:

- its purpose and boundaries;
- the organization's current stance and explicit non-decisions;
- applicable scope and precedence;
- governing sources and accepted decisions;
- required records, controls, evidence, and external-system links;
- owner, backup, approver, last review, next review, and event triggers;
- exceptions, conflicts, uncertainty, and missing information;
- questions the program agent must answer; and
- findings that should be reported as missing, stale, conflicting,
  unsupported, restricted, or otherwise requiring attention.

Folder-level pages explain the whole category and summarize company stance.
Child pages provide the more specific records and traces. Missing content is
shown as a gap; the application must not fill it from generic guidance.

## Scale profiles

The [program profile contract](PROGRAM-PROFILES.md) defines Full, Essential,
and Light views over this hierarchy. The hierarchy remains the canonical
superset; profile definition files filter application navigation, findings,
and retrieval without copying or weakening policy. Applicability, risk, an
accepted decision, or a stricter overlay may require a node hidden by the
selected starting profile.

## Repository and application contract

The approved AI-program repository is the source of truth. The application may
build navigation, indexes, graph relationships, embeddings, and health views,
but those are rebuildable projections. An application-initiated edit produces
a proposal or pull request. It becomes current policy only after authorized
review and merge.

Protected contracts, legal advice, incident details, and audit evidence may
remain in approved systems. The program records authorized summaries,
identifiers, owners, access boundaries, and durable links rather than requiring
all sensitive material to be copied into Git.

## Maintenance order

1. Change the governing category or node through an authorized proposal.
2. Preserve superseded decisions and keep each normative statement in one
   primary home.
3. Update cross-category links, GRC traces, and application expectations.
4. Update affected canonical capabilities under `ai/` in the same change.
5. Regenerate harness projections and mind maps.
6. Run link, program, capability, curriculum, application, and documentation
   validation.

Do not create a new category merely to avoid assigning ownership within the
standard hierarchy. Propose a structural change with affected consumers,
migration, and rollback when the hierarchy itself is no longer sufficient.
