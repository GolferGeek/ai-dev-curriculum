# Intention — AI Governance & GRC application

## Why this exists

Organizations adopting AI need more than static policy documents and more than
a compliance checklist. They need one understandable place to see what the
company believes, permits, restricts, measures, and is still deciding about AI.
They also need a disciplined way to connect consequential technical decisions
to risk, controls, evidence, ownership, exceptions, and review.

The take-home product is the organization's **AI Program**: its governance,
technical direction, risk, compliance, controls, operational practices,
decisions, evidence pointers, and maintained AI capabilities. The AI Governance
& GRC application is the approachable company-wide interface over that program,
not a second content system. The repository remains the durable source of
truth; the application provides navigation, health assessment, traceability,
and an agent that answers questions with citations and clearly labeled
uncertainty.

This is not intended to replace legal interpretation, enterprise evidence
systems, or authorized risk acceptance. It makes the organization's approved
information usable and exposes the places where that information is missing,
conflicting, stale, or unsupported.

## Who it is for

- Developers deciding which AI tools, models, skills, agents, data, and actions
  are permitted for a task.
- Engineering and delivery leaders maintaining the organization's AI direction.
- Security, privacy, legal, compliance, and risk owners tracing obligations to
  controls and evidence.
- Capability stewards maintaining approved skills, agents, integrations, and
  model/tool portfolios.
- Executives and program sponsors assessing readiness, unresolved exposure,
  ownership, and outcomes.
- Auditors and reviewers who need a bounded, evidence-linked view without
  relying on private chat history.

## Product model

```text
approved organizational sources and evidence systems
                         ↓
        docs/ai-program/ + decisions + overlays
                         ↓
      validation + trace graph + searchable index
                         ↓
       navigation + dashboards + program agent
                         ↓
    findings + reviewable proposals + human approval
                         ↓
        merged policy and regenerated capabilities
```

The application treats Markdown and linked approved systems as authoritative.
Any database or search index is a rebuildable projection, not a second policy
source. Proposed changes remain proposals until the organization's authorized
review process accepts and merges them.

## Standard information hierarchy

The application uses eight durable categories:

1. **Direction and governance** — purpose, principles, scope, decision rights,
   ownership, and policy.
2. **Technology governance** — harnesses, models, skills, agents, tools,
   protocols, architecture, and portability.
3. **Risk management** — risk tiers, data/security risk, agent authority,
   third parties, resilience, and residual risk.
4. **Compliance and obligations** — authoritative sources, applicability,
   interpretations, requirements, and obligation coverage.
5. **Controls and assurance** — controls, enforcement, evidence, testing,
   assessments, and remediation.
6. **Delivery and operations** — change lifecycle, quality gates, brownfield
   work, release, rollback, observability, incidents, and automation.
7. **Program evolution** — terrain, decisions, freshness, recertification,
   capability lifecycle, adoption, and outcomes.
8. **Program intelligence** — governance health, gaps, changes, staleness,
   conflicts, recommended actions, citations, and uncertainty.

The complete canonical graph and node-document contract live in the
[`AI Program map`](../ai-program/PROGRAM-MAP.md).

## Demo-grade minimums

- Render the standard hierarchy as left navigation, including useful category
  pages when a user clicks a folder-level node.
- Load the current `docs/ai-program/`, accepted decisions, applicable overlays,
  canonical capability metadata, and approved evidence pointers.
- Show a program overview with readiness by category and the exact findings
  that contribute to each state.
- Let a user ask: how is our governance, what are we lacking, what is changing,
  what is missing, what is old, and what appears wrong?
- Answer with applicable scope, citations, owner, freshness, known exceptions,
  uncertainty, and the next action.
- Distinguish active policy, draft material, proposals, examples, external
  terrain, and missing information.
- Trace at least one approved requirement through scope, risk, control,
  enforcement, evidence, owner/approver, exception, and freshness.
- Detect missing required metadata, overdue reviews, broken references,
  incomplete traces, contradictory scoped rules, and expired exceptions.
- Allow the agent to prepare a reviewable proposal without silently changing
  policy or claiming compliance.
- Keep protected source material and evidence in approved systems; store only
  authorized summaries, metadata, and durable links in the program.

## Out of scope

- Providing legal advice or determining regulatory applicability without the
  organization's approved interpretation.
- Certifying compliance from the presence of Markdown documents.
- Replacing identity/access management, CI enforcement, runtime controls,
  ticketing, audit, GRC, document-management, or evidence-retention systems.
- Automatically accepting risk, approving exceptions, deploying changes, or
  publishing policy.
- Treating every project implementation detail as organization-level policy.
- Building a generalized enterprise GRC suite on Day 5.
- Requiring all confidential contracts, incidents, or audit artifacts to be
  copied into Git.

## Success

The application succeeds when a new developer and an authorized program owner
can reach the same qualified answer from the same organizational record. A
user can move from a high-level health finding to the governing category,
specific decision or requirement, implemented control, evidence location,
owner, exception, and review state without needing private institutional
knowledge.

The Day 5 version succeeds when it makes the organization's started AI program
visible and useful, while being honest about every gap. Longer-term success is
measured by fewer ownerless or stale decisions, faster and better-qualified
answers, stronger requirement-to-control traces, timely recertification, and
evidence that governed AI adoption improves delivery without hiding risk.

## Current status and authority

This document is a **product intention**. It does not activate company policy or
supersede the current AI program. The curriculum's present facets and GRC map
remain draft course baselines with unassigned organizational owners until a
client adapts and approves them.
