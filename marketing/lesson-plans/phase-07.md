# Phase 07 — AI Program capstone lesson plan

*Room mechanics are in the [Phase 07 teaching guide](../../docs/phases/07/TEACHING.md). Learner steps are in the [run order](../../docs/phases/07/RUN-ORDER.md). The longer client-repository clinic and optional agent-network exercise remain in [week-close.md](week-close.md).*

## Session promise

By the end of Day 5, the room will have more than code and more than a policy
template. It will have a started company-owned AI Program, a working interface
over that program, a traceable governance method, and evidence that one real
change followed it.

Phase 07 is the eighth primary phase, completing the `00`–`07` sequence. Phase
05 Part B is an extension inside Phase 05, so it does not create a ninth primary
phase.

## State of the AI union — governance must become operable

### Policy pages are not enough

Many teams begin AI governance with a policy PDF, a tool list, or an approval
form. Each can be useful, but none by itself answers the developer standing in
a repository:

- May this data go to this model under this account?
- May the agent write, execute, publish, deploy, message, or purchase?
- Which test and reviewer does this risk tier require?
- Which control implements the requirement, and what proves it ran?
- Who owns the exception and when does it expire?
- Did the decision change after an incident, contract, provider, or model
  update?

The practical problem is retrieval plus authority. People need a current answer
and a visible reason to trust—or not trust—it.

### GRC is a trace, not a separate pile

Governance establishes purpose, scope, decision rights, accountability, and
policy. Risk management connects uncertainty and consequences to treatment and
acceptance. Compliance connects authoritative obligations and approved
interpretations to requirements and assurance. Controls and evidence make the
result inspectable.

For this course, the durable operational trace is:

```text
authoritative requirement → applicable scope → risk tier and rationale
→ control → enforcement surface → evidence → owner and approver
→ exception or residual-risk decision → freshness and review triggers
```

This is GRC. It is also how technical AI decisions become governable. A model,
skill, tool, MCP server, agent, routing rule, or architecture choice belongs in
technology governance. When that choice affects data, authority, reliability,
cost, contracts, security, or delivery, it connects into the risk/control
trace.

### One hierarchy, many views

The program uses eight categories:

1. Direction and governance.
2. Technology governance.
3. Risk management.
4. Compliance and obligations.
5. Controls and assurance.
6. Delivery and operations.
7. Program evolution.
8. Program intelligence.

The hierarchy is a stable information model, not a claim that every company
uses the same org chart. Ownership may cross departments. The point is that a
decision has one durable home and predictable links to its consequences.

The hierarchy is also a canonical superset, not a demand that every small team
confront every node on day one. Open `PROGRAM-PROFILES.md` and compare Full,
Essential, and Light. Each profile is a machine-readable view and readiness
definition. It can reduce cognitive load, but it cannot hide an applicable
requirement, risk, active decision, or stricter overlay. Teach profile selection
as a scoped governance decision with expansion triggers—not as a checkbox for
escaping governance.

Each folder contains a README. That choice sounds modest and is powerful:

- the folder remains legible in Git and an IDE;
- documentation sites can render it;
- agents can retrieve it;
- the application can derive navigation from it; and
- moving away from this reference UI does not destroy the program.

### The application is a projection

Draw this distinction before opening the product:

| Durable source | Rebuildable projection |
|---|---|
| Markdown stances and accepted decisions | Navigation and rendered pages |
| Approved system/evidence links | Search index and health counts |
| Canonical skills and specialized agents | Harness-specific generated files |
| Review and supersession history | Dashboard summaries and model synthesis |

This boundary prevents a familiar failure: a beautiful UI whose database state
quietly disagrees with the policy reviewed in Git.

### The honest red dashboard

The course baseline opens with blockers. Owners and approvers are unassigned;
most stances are draft; many evidence pointers are empty. This is intentional.
The product should not reward teams for inventing names or approving the
instructor's defaults.

Ask the room: “Would you rather inherit a red dashboard that tells the truth or
a green dashboard whose assumptions no one can explain?”

Readiness counts describe whether the record has the fields and relationships
needed to operate. They do not certify compliance, interpret law, or prove that
a control works.

## Intention walk-through

Open the [product intention](../../docs/artifacts/intention-ai-governance-grc-app.md).
Focus on five design choices:

1. The AI Program is the take-home product; the app is its interface.
2. The repository remains authoritative; protected evidence can stay in
   approved systems.
3. Answers must cite scope, owner, freshness, uncertainty, and next action.
4. Missing or conflicting information remains visible and restrictive.
5. Agents may prepare proposals but may not silently activate policy.

Challenge the intention with the room:

- What would make this accidentally become legal advice?
- Which data should never be copied into the repository?
- Where could an index become an unauthorized second source?
- Which action must remain human-only in this organization?
- How will a project add context without weakening a company prohibition?

Then open the [PRD](../../docs/artifacts/prd-ai-governance-grc-app.md) and
[implementation plan](../../docs/artifacts/plan-ai-governance-grc-app.md).
Connect each demo surface to its acceptance criteria before showing the app.

## Reference-product walkthrough

### 1. Overview

Open `http://localhost:3300`.

Point out the “draft course baseline” label, all eight categories, program
counts, category readiness, exact blocker/warning counts, and the statement
that missing decisions are findings rather than permission. Ask what the score
does *not* mean. Require the words “not a compliance rating.”

### 2. Folder-derived navigation

Open Controls and Assurance, then Control Catalog and Ownership. Compare the
rendered page with:

```text
docs/ai-program/05-controls-and-assurance/
  01-control-catalog-and-ownership/README.md
```

Show that status, owner, approver, scope, and dates come from frontmatter. Add
or remove a disposable folder in a practice branch if time permits and show
that navigation follows it.

### 3. Findings

Open Findings. Distinguish blockers (authority metadata, owner/approver, broken
reference), warnings (draft, missing evidence, overdue review), and substantive
correctness, which still requires authorized human review. The analyzer can
prove that a link does not resolve. It cannot prove a contract interpretation.

### 4. Ask the program

Ask these in order:

1. How is our governance?
2. What are we lacking?
3. What's changing?
4. What's missing?
5. What's old?
6. What's wrong?
7. How is our AI culture?
8. Which program profile is active?

For “What are we lacking?”, inspect the current answer, scope, owner,
freshness, uncertainty, next action, and all citations. Then ask a specific
client question the course record cannot answer. The correct result is a gap
and a request for scope/authority, not a confident guess.

The reference advisor is deterministic and credential-free so every learner
can inspect and test the answer contract. A model may later improve synthesis,
but it must not bypass retrieval, citations, qualification, or approval.

For the culture answer, distinguish the durable culture from sentiment as one
limited evidence source. Open Sentiment, Listening, and Privacy. Require an
approved purpose, privacy and consultation review, minimum cohort and
suppression rules, restricted access, retention and deletion, prohibited
individual uses, sampling limitations, and visible follow-through.

### 5. Scale profile

Switch Full → Essential → Light. Confirm that all eight category roots remain
visible while the nested navigation, findings, counts, and advisor scope
shrink. Then name one expansion trigger that makes a hidden node applicable.
The correct response is to include the node and reassess the profile—not to
declare the concern out of scope because the UI hid it.

### 6. Control trace

Open the nine-stage specimen. It traces the program-answer requirement through
scope, risk, control, enforcement, evidence, owner/approver, exception, and
freshness. The owner/approver link is deliberately missing. The control and
test evidence prove a course design, not client approval.

### 7. Proposal workspace

Select an unassigned-owner finding and generate a proposal. Inspect status,
governing source, scope, resolution, validation, migration, rollback, stop
conditions, owner, approver, review date, and supersession. Check Git status:
no active program file changed. Preparation and activation are intentionally
different authorities.

## The build

### Part A — baseline and scope

Teams choose the course repository, a sanitized client clone, or a standalone
AI Program repository. They record branch state, existing checks, protected
systems/actions, approved source names/locations, one low-risk change, and the
owner who can resolve each consequential unknown.

### Part B — adapt the program

Begin at category roots. Assign real owners and approval status only when the
client has authorized the answer. Replace course examples with company stances
or keep them visibly draft. Link evidence rather than copying confidential
artifacts.

Use the adoption worksheets as intake. Move accepted answers into their
governing nodes; do not maintain a permanent second set of governance answers
inside the worksheets.

Record the selected profile, rationale, excluded concerns, owner, approver,
next review, and expansion triggers. Establish an initial culture stance and
decide whether sentiment collection is authorized; “we will not collect it
yet” is a valid explicit decision.

### Part C — complete three traces

One trace addresses data/security, one software delivery, and one client,
contract, audit, or regulatory requirement. If the third source is unavailable,
use the fictional teaching record and record the missing real source/owner as
the actual result.

For each trace, challenge source authority, interpretation, scope, consequence,
control fit, enforcement, evidence limits, ownership, exception expiry, and
event-driven freshness.

### Part D — run one governed change

The team runs one bounded item through:

```text
understand → intend → plan → implement → test → inspect
→ document → review → operate/rollback
```

They classify data, tool, agent authority, and software-change risk; name the
required reviewer and evidence; and verify the result. If the change updates a
governed behavior, the governing document and canonical capability change in
the same review.

## Teaching checkpoints

### Authority

Ask each team to show one draft, one approved item, and one unknown. If
everything is approved on the first pass, investigate whether course defaults
were relabeled.

### Enforcement

Ask for one policy statement and its enforcement surface. Learners should
distinguish instructions, identity/access, CI, runtime, independent review, and
manual procedure.

### Evidence

Ask what an artifact proves, who can inspect it, and how long it remains useful.
“The test passed” is incomplete without scope, revision, environment, and
reviewer.

### Failure

Break one trace link or use a deliberately missing source. Require the system
to state which action remains restricted and who owns resolution.

### Change authority

Generate a proposal and show that the active record does not change. Then walk
through the separate authorized review/update path.

## Closing discussion

### What the organization takes home

- A standard but adaptable AI governance and GRC hierarchy.
- Its own accumulated decisions and evidence pointers.
- Canonical capabilities encoding repeatable workflows.
- A working interface and testable answer contract.
- A process for proposals, approval, supersession, and review.
- Named work for the next 30, 60, and 90 days.

The course provides a strong starting structure. The company creates the
valuable part over time: real ownership, decisions, controls, evidence,
exceptions, outcomes, and learning.

### Final presentation prompts

Each team shows:

1. The program folder and application.
2. One category stance and its authority metadata.
3. One red finding they intentionally did not hide.
4. One cited answer and one answer the program cannot yet provide.
5. One requirement-to-control trace.
6. One proposal and its human approval boundary.
7. One governed software/capability change and verification.
8. One remaining risk, one owner, and one date.

### Final message

> AI governance is not a document you finish. It is an organizational memory
> and control loop that helps people act consistently, see when the world has
> changed, and know who must decide next.
