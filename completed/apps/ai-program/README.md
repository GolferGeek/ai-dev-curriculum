# AI Program Governance & GRC reference

This is the completed Phase 07 reference application. It is a readable,
deterministic projection of the repository's canonical
[`docs/ai-program/`](../../../docs/ai-program/README.md), not another policy
database.

## What it demonstrates

- folder-derived navigation where every folder renders its `README.md`;
- an eight-category program dashboard;
- deterministic ownership, approval, metadata, evidence, freshness, and link
  findings;
- a bounded advisor for the canonical governance-health questions;
- governed AI culture and privacy-bounded sentiment questions;
- Full, Essential, and Light profile definitions that filter navigation,
  findings, and advisor retrieval without duplicating policy;
- cited, scoped, freshness-aware answers with explicit uncertainty;
- a requirement-to-control demonstration trace; and
- reviewable proposal preparation that never edits or activates policy.

The curriculum content is deliberately a draft baseline with unassigned
organizational owners. The resulting blockers are correct behavior. A client
adapts and approves the record rather than hiding the gaps.

## Run locally

From this directory:

```bash
npm install
npm run dev
```

Open <http://localhost:3300>.

By default the application locates `../../../docs/ai-program`. If the program
is moved into its own repository or protected document workspace, point this
reference at an authorized local projection:

```bash
AI_PROGRAM_ROOT=/absolute/path/to/docs/ai-program npm run dev
```

The application defaults to the Full discovery profile. Use the profile
selector in the header, or set `AI_PROGRAM_PROFILE=essential` or
`AI_PROGRAM_PROFILE=light` for a deployment default. A smaller view never
overrides an applicable requirement, accepted decision, or stricter overlay.

The target must preserve the folder-node contract: every directory has a
`README.md`, authority metadata follows `PROGRAM-CONTRACT.md`, and the three
`PROFILE-*.json` definitions remain available beside `PROGRAM-PROFILES.md`.

## Verify

```bash
npm run lint
npm run test:unit
npm run build
npm test
```

The advisor requires no API key. It uses deterministic retrieval and answer
templates so learners can inspect exactly why an answer was produced. A future
hosted or local model may improve synthesis, but it must retain repository
retrieval, citations, answer qualification, and human approval boundaries.

## Safety boundary

This reference does not provide legal advice, certify compliance, accept risk,
approve exceptions, or replace technical controls and evidence systems. It
stores no confidential evidence. Links should point to approved systems with
access control and retention appropriate to the organization.
