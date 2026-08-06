import type { Finding } from "./types";

export interface ProposalInput {
  title: string;
  finding?: Finding;
  resolution: string;
  scope: string;
  owner: string;
  approver: string;
  reviewDate: string;
}

export function generateProposal(input: ProposalInput): string {
  const source = input.finding?.sourcePath ?? "To be identified during review";
  const finding = input.finding
    ? `${input.finding.title} — ${input.finding.detail}`
    : "No analyzer finding selected; reviewer must establish the governing gap.";

  return `---
status: proposed
owner: ${input.owner || "UNASSIGNED"}
approved-by: ${input.approver || "UNASSIGNED"}
applies-to: ${input.scope || "UNCONFIRMED"}
next-review: ${input.reviewDate || "UNSCHEDULED"}
supersedes: none
---

# Proposal — ${input.title || "AI Program change"}

> This document is a reviewable proposal. It does not change policy, approve an
> exception, accept risk, or prove that a control operates.

## Trigger and governing source

- Finding: ${finding}
- Source: \`${source}\`

## Proposed resolution

${input.resolution || "Describe the exact proposed decision and why it is needed."}

## Scope and authority

- Applies to: ${input.scope || "UNCONFIRMED"}
- Accountable owner: ${input.owner || "UNASSIGNED"}
- Required approver: ${input.approver || "UNASSIGNED"}

## Implementation and migration

- Documents and canonical capabilities affected: identify during review.
- Migration sequence: identify before approval.
- Communication and training: identify before approval.

## Validation and evidence

- Acceptance evidence: define a durable location and reviewer.
- Independent review: required for consequential changes.
- Query and control tests: update before activation.

## Rollback and stop conditions

- Rollback: restore the last accepted decision and regenerate projections.
- Stop when: authority, applicability, evidence, or safe recovery is unresolved.

## Review

- Proposed review date: ${input.reviewDate || "UNSCHEDULED"}
- Approval record: pending
- Supersession links: pending
`;
}
