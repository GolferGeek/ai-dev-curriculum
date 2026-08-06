# PRD — AI Program Governance & GRC application
## Source intention

This PRD implements the approved
[AI Governance & GRC application intention](intention-ai-governance-grc-app.md).
The application is the interface over `docs/ai-program/`; it is not a second
policy store.

## Summary

Build a company-wide, repository-backed application that turns the AI Program
folder hierarchy into an understandable operating interface. Users can browse
the company stance at every category and folder node, see deterministic health
findings, inspect a requirement-to-control trace, ask the program's most
important governance questions, and prepare a reviewable proposal. Every
answer must remain scoped, cited, freshness-aware, and honest about draft or
missing organizational decisions.

## Goals

1. **Render the canonical hierarchy.**
   - Navigation is derived from folders under `docs/ai-program/` rather than a
     separately maintained menu.
   - Every folder node is selectable and renders that folder's `README.md`.
   - The current node includes breadcrumbs, status, owner, approver, scope,
     last-review, and next-review information when present.

2. **Show program health and readiness.**
   - The overview reports all eight durable categories.
   - Each category reports a deterministic readiness state and the exact
     findings contributing to that state.
   - Findings cover missing metadata, unassigned ownership or approval, draft
     status, overdue review, missing evidence, and broken relative references.
   - A user can move from a summary count to the affected source document.

3. **Provide evidence-grounded program answers.**
   - A user can ask how governance is doing, what is lacking or missing, what
     is changing, what is old, and what appears wrong.
   - Responses include current answer, applicable scope, source citations,
     ownership, freshness, uncertainty, and next action.
   - Answers distinguish course baselines and drafts from approved client
     policy and never claim compliance.
   - The default reference works without external credentials or network
     access; a future model adapter may augment, but may not replace, source
     retrieval and answer qualification.

4. **Expose requirement-to-control traceability.**
   - The app presents at least one complete demonstration trace with
     requirement, scope, risk, control, enforcement, evidence, owner/approver,
     exception, and freshness fields.
   - The trace clearly labels draft, example, missing, or unapproved links and
     does not imply client approval.
   - Every populated link cites its governing repository source.

5. **Prepare changes without silently changing policy.**
   - A user can select a finding, describe a proposed resolution, and generate
     a reviewable Markdown proposal.
   - The proposal names affected scope, rationale, validation, rollback,
     approver, and review date.
   - Generating a proposal does not edit `docs/ai-program/`, accept risk, or
     activate policy.

6. **Remain a portable take-home reference.**
   - The completed implementation lives under `completed/apps/ai-program/`.
   - It runs with documented local commands and no required database or API
     key.
   - Production build, lint, unit checks, and Playwright core-flow tests pass.
   - The app explains how a client can relocate `docs/ai-program/` and point
     the reader at it later without changing the information model.

## Non-goals

- Legal advice, regulatory interpretation, compliance certification, or risk
  acceptance.
- Replacing IAM, CI, runtime enforcement, ticketing, evidence retention,
  document management, or an enterprise GRC platform.
- Automatically editing or approving organizational policy.
- Copying confidential evidence into Git.
- Authentication, multi-tenancy, workflow integrations, or enterprise
  deployment in the Day 5 reference.
- A general-purpose chatbot or open-ended retrieval system.
- A database that becomes an alternate source of policy truth.

## Success criteria

- A new developer can navigate from the eight-category overview to any folder
  README and understand its current stance and authority metadata.
- A program owner can identify every blocker caused by the curriculum's draft,
  unassigned baseline and open the affected source.
- The five canonical health questions return qualified, cited answers from the
  same repository state.
- The trace view exposes both known links and unresolved approval/evidence
  gaps.
- A proposal can be prepared and copied without changing active documents.
- `npm run build`, `npm run lint`, `npm run test:unit`, and `npm test` pass in
  the completed app.
- Repository curriculum, AI Program, documentation-link, and MkDocs checks pass.

## Test expectations

Playwright covers these real user flows:

1. Open the program overview and see all eight categories and current blockers.
2. Select a category and a nested node; verify the folder README, breadcrumbs,
   and metadata render.
3. Ask “What are we lacking?”; verify the response includes scope,
   uncertainty, next action, and clickable citations.
4. Open the trace; verify every required trace stage and the draft/unapproved
   limitation are visible.
5. Prepare a proposal from a finding; verify a Markdown artifact is generated
   and active-policy warning remains visible.

Unit checks cover frontmatter parsing, hierarchy derivation, deterministic
finding rules, answer classification, citation selection, and proposal output.

## Alignment check

| Intention minimum | PRD goal |
|---|---|
| Folder-derived navigation and category pages | 1 |
| Load the canonical program and approved pointers | 1, 2, 6 |
| Overview and exact findings | 2 |
| Ask the program health questions | 3 |
| Qualified, cited answers | 3 |
| Distinguish authority states | 1, 3, 4 |
| Requirement-to-control trace | 4 |
| Detect metadata, freshness, trace, conflict, and reference gaps | 2, 4 |
| Prepare reviewable proposals | 5 |
| Keep protected evidence in approved systems | 6 |

No goal introduces a policy authority or enterprise workflow excluded by the
intention. The credential-free advisor is an implementation choice that makes
the agreed Day 5 slice reproducible while preserving a future model boundary.

## Resolved questions

- The reference is a Next.js application at `completed/apps/ai-program/`.
- `docs/ai-program/` remains authoritative; all indexes and findings are
  derived on read.
- The curriculum baseline is expected to look incomplete until a client
  assigns owners, approves stances, and links evidence. Reporting those gaps is
  passing behavior.
- Phase 07 is the AI Program capstone. Phase 05.5 remains on disk for stable
  links but is presented as Phase 05 Part B, yielding eight primary phases
  numbered 00 through 07.
