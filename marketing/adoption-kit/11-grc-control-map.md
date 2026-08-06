# 11 — Governance, Risk & Compliance Control Map

*How do we turn the organization’s applicable obligations and risk posture into
agent-readable guidance, evidence, decisions, and exception paths? Taught in
the Day 5 GRC clinic and reinforced by the
[`docs/ai-program/` GRC operating map](../../docs/ai-program/GRC-OPERATING-MAP.md),
governance, security/data, and delivery/quality facets.*

**Why this matters:** “Be secure” and “follow compliance” are not operational
instructions. Developers and agents need to know which source governs the work,
what is in scope, who owns the decision, which controls apply, what evidence is
required, and when work must stop or escalate.

> **Course boundary:** This worksheet is not legal advice, a certification, or
> proof of compliance. The instructor and coding agents do not decide which
> laws, contracts, or regulatory obligations apply. The organization supplies
> its authoritative sources, legal/compliance interpretation, risk owners, and
> approvers. Unknowns remain visible gaps; they are never filled with a course
> assumption.

## Prepare before the clinic

Bring approved, sanitized references or the internal locations and owners for:

- data-classification and acceptable-use policy;
- client, vendor, or customer contractual requirements relevant to development;
- security standards, secure-development requirements, and incident process;
- regulatory or audit control sets already identified by the organization;
- current exception, risk-acceptance, and escalation process; and
- the people authorized to interpret requirements and accept residual risk.

Do not copy confidential contract text, customer data, secrets, incident detail,
or legal advice into course materials. A source name, internal location, owner,
and sanitized requirement are enough for the exercise.

For a private cohort, arrange for at least one authorized engineering/delivery,
security/data, legal/compliance, or risk representative to join the clinic or be
available for follow-up. One person may hold several accountabilities, but the
authority must be explicit.

### Open-enrollment fallback case

If no client source can be used in class, practice with these **fictional lab
requirements** and separately record the real organization’s source as an
unresolved gap. These statements are not summaries of any law, framework, or
client policy:

1. **Fictional security policy:** customer contact records may not be sent to an
   unapproved hosted model.
2. **Fictional client requirement:** changes to customer access control require
   an independent reviewer and passing tenant-isolation evidence.
3. **Fictional audit requirement:** automated agent actions must record the
   actor, request, decision, tool use, result, denial, and human approval in the
   company’s approved evidence system.

Use the three statements to learn the mapping method. Never publish them as the
participant’s organizational policy.

## 1. Source and scope register

Record what governs the work before designing controls. Write **unknown** when
applicability or interpretation has not been confirmed.

| Source or requirement set | Applies to which repositories, systems, data, people, or clients? | Sanitized requirement summary | Authoritative owner / interpreter | Last verified | Durable internal location |
|---|---|---|---|---|---|
| Organizational security policy | | | | | |
| Data-classification policy | | | | | |
| Client or vendor contract | | | | | |
| Law or regulatory control set already identified by the organization | | | | | |
| Audit or assurance requirement | | | | | |
| Other / unknown | | | | | |

If a source conflicts with a course default, apply the organization’s confirmed
requirement. If two authoritative sources conflict, record the conflict and use
the stricter safe boundary until the authorized owner resolves it.

## 2. Risk tiers for AI-assisted development

Use these rows as a **course starting vocabulary**, not as client policy. Replace
the examples and required evidence with the organization’s approved definitions.

| Tier | Example characteristics | Minimum course baseline before work moves forward | Organization’s approved definition and owner |
|---|---|---|---|
| **Low** | Reversible, isolated change; no sensitive data; small blast radius | Focused tests, diff review, accountable human | |
| **Normal** | Ordinary product behavior, internal data, or shared component | Unit/integration evidence as relevant, quality gates, runtime/browser verification, reviewed PR, rollback path | |
| **High** | Authentication, authorization, confidential or regulated data, payments, production migration, safety or material customer impact | Threat model, independent review, realistic environment, explicit approver, rollback rehearsal, monitoring and stop conditions | |
| **Restricted / unresolved** | Prohibited data or action, missing authority, unknown obligation, or unacceptable consequence | Do not send, change, publish, or deploy; record the gap and escalate to the named owner | |

### Data and destination classification

| Data class used by your organization | Examples or authoritative source | Approved model/tool destinations | Prohibited destinations or actions | Owner / exception approver |
|---|---|---|---|---|
| Public | | | | |
| Internal | | | | |
| Confidential | | | | |
| Restricted / regulated | | | | |

### Tool and agent authority

| Action | Allowed scope and risk tier | No approval / must ask / human-only | Required evidence or log | Emergency stop / revocation path |
|---|---|---|---|---|
| Read | | | | |
| Propose | | | | |
| Write | | | | |
| Execute tools or commands | | | | |
| Publish or open a PR | | | | |
| Deploy or change production | | | | |
| Send an external message | | | | |
| Spend or purchase | | | | |

Keep this table consistent with [05 — Human Decision Boundaries](05-decision-boundaries.md),
[07 — Day-2 Safety](07-day2-safety.md), and the organization’s identity and
access controls. A Markdown restriction is guidance, not technical enforcement.

## 3. Requirement-to-control and evidence map

Complete at least three rows during the clinic: one data/security requirement,
one software-delivery requirement, and one client, contract, audit, or regulatory
requirement supplied by the organization. If the organization has no confirmed
third example, use the explicitly fictional fallback to practice and record the
missing real source and owner as a separate gap instead of inventing client
policy.

| Requirement and source | Affected data, system, or action | Preventive, detective, or corrective control | Evidence required and durable location | Control owner | Reviewer / approver | Review cadence or event trigger |
|---|---|---|---|---|---|---|
| | | | | | | |
| | | | | | | |
| | | | | | | |

Examples of evidence include an approved decision record, pull request, test
output, review sign-off, data-flow diagram, provider assessment, audit event,
rollback rehearsal, or incident follow-up. Evidence must prove the control ran;
a chat transcript or an unchecked policy box is not enough.

## 4. Change-risk record

Use this for the Day 5 bounded change, even when the result is low risk.

| Question | Team answer |
|---|---|
| Change and affected scope | |
| Assigned risk tier and rationale | |
| Data classes, tools, and external destinations involved | |
| Required gates and independent reviewer, if any | |
| Rollback or recovery action | |
| Monitoring signal and owner | |
| Stop condition and who may stop the work | |
| Residual risk and authorized acceptor | |
| Evidence location | |

## 5. Exception and escalation record

An exception is a bounded, reviewable decision—not a quiet bypass.

| Field | Required entry |
|---|---|
| Requested exception and governing source/control | |
| Business reason and affected scope | |
| Risk created and people/data/systems affected | |
| Compensating controls and required evidence | |
| Requester, control owner, risk owner, and authorized approver | |
| Start date, expiration date, and review trigger | |
| Revocation, rollback, or containment path | |
| Final status and durable decision-record link | proposed / accepted / rejected / expired |

No owner, approval authority, scope, or expiration means the exception is not
ready. High-risk work remains blocked until the organization’s authorized
process resolves it.

## 6. Durable decision and program links

| Item | Location |
|---|---|
| Applicable [GRC operating map](../../docs/ai-program/GRC-OPERATING-MAP.md) and program facet(s) | |
| Accepted organizational decision record(s) | |
| Open proposal, conflict, or gap | |
| Agent instruction or quality gate that implements the decision | |
| Evidence repository or audit system | |

Policy belongs in the governing document or accepted decision record. Agent
instructions and automated checks implement approved policy; they do not create
new policy by themselves.

## Verification before leaving the course

- [ ] Applicable scope and authoritative sources are named; unknowns are explicit.
- [ ] Data, tool, and software-change risk tiers have owners and usable criteria.
- [ ] Read, propose, write, execute, publish, and deploy authority is classified.
- [ ] Human approvals and independent review are identified where required.
- [ ] At least three requirements are mapped to controls and durable evidence, or
      a missing client source is recorded with an owner and follow-up date.
- [ ] The Day 5 change has a tier, evidence, rollback/recovery action, monitoring
      signal, and stop condition.
- [ ] The exception path names scope, compensating controls, approver, expiration,
      and revocation.
- [ ] Current policy, proposals, course defaults, conflicts, and gaps are visibly
      distinguished.
- [ ] Owners, next review dates, and event triggers are recorded.

## Recovery when information is missing

- **Applicability is unknown:** label it unknown, keep the affected action
  restricted, assign the authoritative owner and follow-up date, and use the
  fictional fallback only to practice the method.
- **The source is confidential:** record its approved internal location, owner,
  and a sanitized requirement; do not copy protected text into the course repo.
- **The room disagrees:** record both interpretations and the conflict. The
  instructor does not adjudicate it.
- **No authorized approver exists:** treat high-risk work and exceptions as
  blocked until the client assigns one.
- **A technical control cannot be implemented during class:** document the
  manual control, evidence, owner, limitation, and replacement date.

## Follow-through

1. Commit the completed map through the organization’s review process.
2. Resolve restricted unknowns before expanding agent access or using affected
   data.
3. Review the started map with legal/compliance, security/data, engineering, and
   the AI program owner within 30 days.
4. Re-review on the organization’s chosen cadence and after a law, contract,
   provider, data-class, incident, audit, authority, or architecture change.

## Owners

| Accountability | Name |
|---|---|
| AI program owner | |
| Security/data owner | |
| Engineering/delivery control owner | |
| Legal/compliance interpreter | |
| Risk or exception approver | |
