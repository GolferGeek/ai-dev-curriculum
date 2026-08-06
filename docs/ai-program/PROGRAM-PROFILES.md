---
status: draft
owner: UNASSIGNED
backup-owner: UNASSIGNED
approved-by: UNASSIGNED
last-reviewed: 2026-08-06
next-review: 2026-09-06
applies-to: organization
evidence:
  - PROFILE-FULL.json
  - PROFILE-ESSENTIAL.json
  - PROFILE-LIGHT.json
supersedes: none
---

# AI Program profiles

The AI Program has one canonical hierarchy and three presentation/readiness
profiles. A profile filters navigation, findings, and advisor retrieval so an
organization can begin at an appropriate operating scale without maintaining
separate policy copies.

| Profile | Intended starting point | What it does |
|---|---|---|
| Full (`PROFILE-FULL.json`) | Mid-size, large, regulated, multi-client, or higher-authority programs | Shows every category, node, supporting record, and finding |
| Essential (`PROFILE-ESSENTIAL.json`) | Smaller organization or bounded AI program with named operational roles | Shows the cross-functional decisions needed to operate and grow safely |
| Light (`PROFILE-LIGHT.json`) | Small team, pilot, or low-risk internal effort | Shows the minimum coherent ownership, data, authority, quality, evidence, change, and culture record |

## Contract

- The Full hierarchy remains the canonical superset. Profiles do not create
  separate versions of a policy.
- A profile is a starting view and readiness definition, not an exemption from
  law, contract, client obligation, risk treatment, or a higher-scope rule.
- If system, data, authority, geography, counterparty, incident, or regulatory
  applicability triggers a hidden node, that node becomes required regardless
  of the selected profile.
- Accepted decisions and stricter group/project overlays remain applicable even
  when a profile does not display every background node.
- Moving to a smaller profile must not conceal active blockers. The decision
  records why excluded nodes are not currently applicable and names the event
  triggers that expand scope.
- Moving to a larger profile adds required records; it does not silently change
  existing decisions.

## Definition-file contract

Each `PROFILE-*.json` file supplies:

- stable `id`, user-facing `label`, and `description`;
- intended `audience` and explicit `limitations`;
- `includedFolders`, expressed as exact folder slugs or `*`;
- root `includedDocuments` required in every filtered view; and
- `expansionTriggers` that require reassessment or a larger profile.

The application includes a folder when it is named in the profile or is an
ancestor of a named folder. Markdown records beside an included folder's
`README.md` remain visible. Root support documents are included only when named
or when the profile uses `*`.

## Selection and review

Record the selected profile as an approved decision with scope, rationale,
owner, approver, excluded concerns, evidence, next review, and expansion
triggers. Review it after workforce growth, new data or authority, external
users, new clients or geographies, a regulated use, agent autonomy, material
incident, audit finding, or repeated exception.

The curriculum defaults to **Full** so no concern is hidden during discovery.
Client selection is `UNASSIGNED` until authorized review.
