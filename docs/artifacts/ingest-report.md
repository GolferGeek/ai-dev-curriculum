# Whole-offering ingest report

Assessment date: 2026-08-06

Scope: current working tree of the entire repository

Purpose: final product-readiness orientation, not a substitute for the live
validation commands or a cohort-specific rehearsal

## Executive assessment

This repository is a coherent five-day, developer-only AI-assisted software
delivery course and a take-home operating model. It has eight primary modules
(`00`–`07`), with Phase 05 Part B retained at the link-stable `05.5/` path;
complete learner and instructor phase packages; nine PowerPoint decks; a
substantial marketing and adoption package; canonical skills and specialized
agents projected into Claude Code, Cursor, and Codex; reference applications;
and a folder-backed AI Program with a governance/GRC application.

The offering is credible for a carefully prepared pilot or founding-client
cohort. All twelve indexed reference experiences are implemented, including
the Phase 05 Skills Browser and the Phase 07 AI Program application. The
release gates cover JavaScript builds, Next.js lint, deterministic unit suites,
browser smoke tests, and both native iOS simulator suites. Service-backed
SurrealDB paths, live model-provider behavior, client AI Program ownership, and
timed instructor rehearsal remain deliberate cohort-preparation work rather
than product-code gaps.

## Readiness snapshot

| Area | What clearly exists | Readiness judgment |
|---|---|---|
| Program architecture | Five-day schedule, eight primary phases, Phase 05 Parts A/B, one continuing learner workspace | Strong and coherent |
| Phase teaching packages | Ten required documents for each primary phase and Phase 05 Part B (90 standard documents total) | Structurally complete and generally substantive |
| Before/during/after teaching | Prerequisites, starter kits, run orders, commands, teaching scripts, talking points, grade bars, and verification artifacts | Complete teaching arc exists for every module |
| Expanded instruction | Nine phase/block lesson plans, week close, cross-cutting discussion scripts, delivery guide, discovery guide | Strong instructor support |
| Presentations | Nine `.pptx` files; QA record reports 166 slides rendered, visually inspected, and overflow-free on 2026-08-06 | Complete by recorded QA; re-render after edits |
| Reference applications | Twelve implemented experiences spanning Vite, Next.js, NestJS, SurrealDB, SwiftUI/SwiftData, and repository-backed Markdown | Ready for training; service/provider paths still require cohort rehearsal |
| AI Program | Eight categories, 64 folder nodes, 88 Markdown records, a README in every program directory, Full/Essential/Light profiles | Strong take-home structure; still a draft client baseline by design |
| AI Program application | Navigation, health findings, bounded advisor, GRC trace, proposal flow, culture/sentiment handling, profile filtering | Strongest-tested reference application |
| Canonical AI capabilities | 54 skills and 32 specialized agents in seven functional groups, with equal generated projection counts | Mature and portable |
| Marketing and sales material | Proposal, reusable copy, print-ready flyer, Hennepin Tech outreach packet, syllabus, deliverables, take-home-product brief, adoption kit | Complete reusable collateral; client name, dates, pricing, and approvals remain campaign-specific |
| Build and delivery system | npm workspaces, Turborepo, MkDocs, GitHub Actions, deterministic AI/program/mind-map/link checks, JavaScript reference checker, and macOS iOS checker | Strong automation with explicit live-service boundaries |
| Release state | Intended migration and hardening changes are reviewable on the release-hardening branch | Ready for final validation and release review |

## Identity and product promise

The root `README.md` defines the product as a five-day program for professional
software developers learning to build, verify, govern, and maintain real
software with coding agents. The repository deliberately serves two purposes:

1. a teachable sequence of hands-on labs and supporting instructor material;
2. a company-owned operating system learners can continue using after class.

The durable take-home product is `docs/ai-program/`, supported by the canonical
capabilities in `ai/` and demonstrated by `completed/apps/ai-program/`. The
client receives a standard structure and course baseline, not a claim that its
own governance or compliance obligations have already been decided.

## Offering structure

```text
ai-dev-curriculum/
├── ai/                       canonical skills, agents, and function taxonomy
├── .claude/                  generated Claude Code projections
├── .cursor/                  generated Cursor projections and project rule
├── .agents/ + .codex/        generated Codex skill and agent projections
├── apps/                     intentionally empty learner application workspace
├── completed/apps/           instructor/recovery reference implementations
├── docs/phases/              phase packages 00–07 plus Phase 05 Part B (05.5)
├── docs/ai-program/          company-owned governance/GRC information graph
├── docs/instructor/          delivery, discovery, artifact, and deck guidance
├── docs/mind-maps/           generated master and phase OPML maps
├── marketing/                proposal, flyer, syllabus, lesson plans, adoption kit
├── packages/                 shared config placeholder and SurrealDB package
├── scripts/                  generators and verification scripts
├── .github/workflows/        CI, Pages, Claude assistant, nightly hygiene
├── tests/                    curriculum placeholder/readme only
├── mkdocs.yml                documentation-site navigation and configuration
├── package.json              npm workspace and root task entry points
└── turbo.json                build/test/dev task graph
```

`.tmp/`, `outputs/`, `site/`, `.next/`, `dist/`, `node_modules/`, and test
results are generated or local evidence, not core authored product content.

## Phases and teaching tools

Every primary phase has the documented ten-file contract:

- `README.md` — purpose, outcomes, navigation, and lab shape;
- `OVERVIEW.md` — learner anchor and boundaries;
- `PREREQUISITES.md` — access, authority, repository, and instructor preflight;
- `COMMANDS.md` — exact lab invocations and output expectations;
- `STARTER-KIT.md` — supplied architecture, inputs, fixtures, and guardrails;
- `RUN-ORDER.md` — sequenced lab with stop conditions;
- `TALKING-POINTS.md` — durable concepts and debrief language;
- `TEACHING.md` — instructor timing, scripts, checkpoints, recovery, and debrief;
- `DEMO-GRADE-BAR.md` — observable acceptance standard; and
- `VERIFY.md` — evidence checklist and verification commands.

The files are not uniform stubs. Phase `README.md` documents range from roughly
367 to 2,351 words, teaching guides from roughly 520 to 4,789 words, and the
expanded lesson-plan collection contains about 24,500 words. Some command and
verification files are deliberately concise, so completeness still depends on
their linked phase context rather than word count alone.

| Module | Core learning/lab | Before the lab | During the lab | After/corroboration | Expanded teaching and deck |
|---|---|---|---|---|---|
| 00 — First AI build | Intention → PRD → plan → build → verify | prerequisites, supplied intentions, starter kit | exact pipeline, four Vite tracks, teaching script | grade bar, browser evidence, verification, talking points | `phase-00.md`; opening deck |
| 01 — Product delivery | Authenticated/persisted SaaS or opt-in iOS track | environment, SurrealDB/iOS preflight, intentions | track run order, builders, auth/data boundaries | build/test evidence and demo-grade review | `phase-01.md`; SaaS killers deck |
| 02 — Quality engineering | Scan, fix, monitor, harden, ship | baseline app and quality prerequisites | scanner/fixer and architecture loop | promoted standards, grade bar, verification | `phase-02.md`; quality deck |
| 03 — Brownfield understanding | Research unfamiliar code before change | target selection and safety scope | ingest/map/deep-dive/security/history work | durable research packet and verified findings | `phase-03.md`; project-memory deck |
| 04 — Agent systems | A2A/AP2/x402/AG-UI services and observable flow | protocol/service preflight | multi-service demo and trace | narrated protocol evidence and boundaries | `phase-04.md`, presenter guide; 37-slide deck |
| 05 Part A — Capability scouting | Discover, snapshot, inspect, and evaluate skills/agents | source/cache and authority preparation | catalog pipeline and evaluation board | accepted/rejected evaluations and verification | `phase-05.md`; scouting deck |
| 05 Part B — Registry/lifecycle | Publish, project, maintain, retire capability | locator/database/role preparation | governance, publication, generation, drift | lifecycle demonstration and verification | `phase-05.5.md`; registry deck |
| 06 — Model evaluation | Test models on client-like work and route empirically | keys/models/hardware and prompt suite | harness, rubric, judges, dashboard | route table, caveats, evaluation evidence | `phase-06.md`; model-eval deck |
| 07 — AI Program capstone | Browse, assess, query, trace, propose, and hand off the program | program record, authority metadata, app | eight-category walk, advisor, GRC trace, profiles | governed-change proof and handoff | `phase-07.md`; AI Program deck |

This provides explicit material before, during, and after every lab. The
instructor also has `docs/instructor/FIVE-DAY-DELIVERY-GUIDE.md`, cohort
discovery, cross-cutting discussion topics, a week-close clinic, recovery
language, and a module-level artifact matrix.

## Presentation materials

The repository contains a deck for every primary phase plus the separate Phase
05 Part B block:

1. `phase-00-opening-ai-dev.pptx`
2. `phase-01-saas-killers.pptx`
3. `phase-02-quality-engineering.pptx`
4. `phase-03-project-memory.pptx`
5. `phase-04-agent-to-agent-future.pptx`
6. `phase-05-skill-scouting.pptx`
7. `phase-05-5-skills-registry.pptx`
8. `phase-06-model-evaluation.pptx`
9. `phase-07-ai-program-capstone.pptx`

`docs/instructor/DECK-QA.md` records 166 slides, zero overflow, visual
inspection, and content-alignment passes on 2026-08-06. The structural verifier
requires all nine files. Source-retained QA evidence is uneven: inspection
NDJSON is present for Phases 02–07 except Phase 01, and rendered slide folders
are retained for only some decks; temporary render directories exist locally.
Only Phase 02 has a committed phase-specific deck-generation script, although a
shared montage renderer is present.
The formal rule remains sound: any deck edit requires every slide to be
re-rendered and inspected at full size.

## Applications and services

`apps/` is intentionally empty except for its README. Learners build there;
completed references live outside the root npm workspace so package names do
not collide. `completed/apps/README.md` indexes twelve reference experiences.

| Reference | Stack and purpose | Evidence present | Current confidence / gap |
|---|---|---|---|
| `http-workspace` | React 18, Vite 8, TypeScript; API workspace | source, lockfile, production build, Playwright smoke | Covered by reference checker |
| `team-wiki` | React/Vite; searchable local wiki | source, build, Playwright smoke | Covered by reference checker |
| `pipeline-crm` | React/Vite; pipeline and notes | source, build, Playwright smoke | Covered by reference checker |
| `ops-pulse` | React/Vite; checks and incident log | source, build, Playwright smoke | Covered by reference checker |
| `quickbooks-killer` | Next.js 16/React 19 + shared SurrealDB; invoices/expenses/auth | source, build/lint scripts, four Playwright specifications | Build/lint are automated; its browser suite is not run by `completed:check` and needs approved SurrealDB rehearsal |
| `trello-killer` | Next.js 16/React 19 + SurrealDB; boards/lists/cards/auth | source, build/lint scripts, three Playwright specifications | Build/lint are automated; its browser suite is not run by `completed:check` and needs approved SurrealDB rehearsal |
| `twitter-killer` | SwiftUI/SwiftData personal microblog; behavior may be replatformed to web | Xcode project, source, unit/UI test targets | Covered by the optional macOS build/test checker |
| `facebook-killer` | SwiftUI/SwiftData private social circle; behavior may be replatformed to web | Xcode project, source, unit/UI test targets | Covered by the optional macOS build/test checker |
| `agent-to-agent` | Four NestJS services, shared TypeScript contracts, Next.js dashboard | six manifests/lockfiles and service/dashboard source | All packages build; no automated protocol or browser test is defined in the reference checker |
| `skills-browser` | Next.js capability catalog, search, profile filtering, provenance, evaluation, and change view | source, generated catalog, README, unit suite, browser smoke, build/lint | Fully exercised by the reference checker |
| `model-eval` | Next.js dashboard and evaluation harness for Anthropic/OpenRouter/Ollama | substantial app/harness source, build and lint | No automated unit/browser test script; live-provider behavior remains environment-dependent |
| `ai-program` | Next.js repository-backed governance/GRC application | app/source, unit suite, seven Playwright scenarios, build/lint | Fully exercised by the reference checker; strongest validation coverage |

The AI Program and Skills Browser have dedicated application runbooks. The
completed-app index routes the other references to their authoritative phase
runbooks and states which paths need approved services or macOS/Xcode.

The root `npm run build` and `npm test` do not validate the completed references
because `completed/apps/` is intentionally outside the workspace. CI invokes
`npm run completed:check` separately. Native suites are exposed as
`npm run completed:ios:check` and remain a macOS/Xcode release gate.

## AI Program and take-home governance product

The AI Program has been formalized as one canonical, folder-backed graph:

1. Direction and governance.
2. Technology governance.
3. Risk management.
4. Compliance and obligations.
5. Controls and assurance.
6. Delivery and operations.
7. Program evolution, including culture, workforce experience, psychological
   safety, privacy-bounded sentiment, adoption, and outcomes.
8. Program intelligence for health, gaps, change, staleness, conflicts,
   recommendations, provenance, and uncertainty.

The inspected tree has 64 directories under `docs/ai-program/`; every directory
has a `README.md`. It contains 88 Markdown records plus three JSON profile
definitions. `PROGRAM-CONTRACT.md` defines metadata, evidence, answer, change,
and folder contracts. `PROGRAM-MAP.md`, `COVERAGE-MATRIX.md`, and
`GRC-OPERATING-MAP.md` define the hierarchy and trace model. Full, Essential,
and Light are filters over the same canonical record, not separate policy
copies.

The application projects this repository into navigable categories, findings,
bounded question answering, a requirement-to-control trace, and non-activating
proposals. Its profile selector filters navigation, findings, and retrieval.
Culture and sentiment questions explicitly retain privacy and
non-surveillance boundaries.

The current program is appropriately honest: root status is `draft`, owner,
backup owner, and approver are `UNASSIGNED`, and the Full discovery view is the
course default. Therefore it is a well-honed take-home framework and working
application, but not a claim that an unnamed client is governed, compliant, or
ready to operate. Client discovery, authoritative sources, owners, approvals,
evidence links, and review cadence are required deployment work.

## Canonical skills and specialized agents

`ai/functions.json` defines seven functional groups. Canonical sources currently
contain 54 skills and 32 specialized agents, with 32 matching `agent.json`
metadata records. Generated projections contain the same counts for Claude
Code, Cursor, and Codex.

The lifecycle is clear:

```text
edit ai/ → npm run ai:generate → npm run ai:check → commit canonical + projections
```

This is a material strength of the offering: reusable delivery, research,
quality, protocol, governance, and evaluation workflows are maintained as
organizational capability rather than trapped in one harness. Vendor-specific
models, permissions, and tool names are overlays rather than portable policy.

## Shared packages

| Package | Purpose | Status |
|---|---|---|
| `@curriculum/config` | Reserved shared configuration package | Placeholder only; manifest has no exports or scripts |
| `@curriculum/surrealdb` | Shared SurrealDB connection, auth, queries, types, schema application, and seed scripts for QuickBooks/Trello references | Implemented; consumed as TypeScript source and tested indirectly at app level |

The SurrealDB package includes two schemas and separate setup/seed paths. Live
authenticated behavior depends on a cohort-approved database, accounts, and
data policy.

## Technical stack

| Concern | Current implementation |
|---|---|
| Monorepo | npm 10 workspaces (`apps/*`, `packages/*`) and Turborepo 2.10 |
| CI runtime | Node.js 22 on GitHub Actions |
| Web UI | React 18/Vite 8 references; React 19/Next.js 16 references |
| Services | NestJS 11 and JSON/HTTP protocol demonstrations |
| Data | localStorage, repository Markdown/JSON, SurrealDB 2 SDK, SwiftData |
| iOS | SwiftUI, SwiftData, Xcode projects generated/maintained from `project.yml` |
| Testing | Playwright 1.62, Node test runner via `tsx`, XCTest/XCUITest targets |
| Documentation | Markdown, MkDocs Material, GitHub Pages |
| Presentations | PowerPoint `.pptx`, render/inspection workflow |
| Mind maps | Generated and validated OPML intended for MindNode |

## Build, configuration, and delivery

Root commands expose separate gates for distinct product layers:

```text
./scripts/verify-curriculum-structure.sh
npm run ai:check
npm run ai:program:check
npm run docs:links
npm run mindmaps:check
npm run build
npm test
npm run completed:check
npm run completed:ios:check
python -m mkdocs build --strict
```

`.github/workflows/ci.yml` runs curriculum, AI projection, AI Program, link,
mind-map, MkDocs, root build/test, and reference-app checks. GitHub Pages
publishes the documentation site. Tier 1 nightly hygiene repeats mechanical
checks; Tier 2 remains manual dispatch until its documented prerequisites and
green-history gate are satisfied. The interactive Claude workflow is also
credential-dependent.

The release model is one continuing `main` branch and one immutable starter-kit
tag; there are no phase branches/tags. The AI Program migration, Phase 07,
Skills Browser, collateral, and hardening changes are intentionally grouped for
review on the release-hardening branch before they return to `main`.

## Marketing, sales, and adoption material

The repository has a meaningful client-facing package:

- `course-proposal.md` — audience, business case, format, positioning, and AI
  Program take-home offer;
- `marketing-copy.md` — catalog, flyer, email, outcomes, and positioning copy;
- `flyer.html` — styled, print-aware flyer with GRC and five-day summary;
- `hennepin-tech-packet.md` — attachment order, outreach email, and call agenda;
- `week-long-syllabus.md` and `pre-course-setup.md`;
- `course-deliverables.md` and `ai-program-take-home-product.md`;
- eleven guided adoption/GRC worksheets plus guardrail cards; and
- phase lesson plans, discussion topics, and week-close material.

The course proposal and deliverables describe the AI Program, scale profiles,
AI culture/sentiment boundaries, Phase 07, and the option to convert supplied
iOS product intentions to equivalent web implementations. The marketing index
lists all nine decks, the flyer positions the AI Program as the primary
take-home product, and the outreach packet uses reusable organization-neutral
language. Client name, dates, pricing/format decisions, current tool claims,
and final approval must still be refreshed for an actual campaign.

## Naming and authoring conventions

- Primary phase folders are zero-padded (`00`–`07`); `05.5` is a stable path
  presented as Phase 05 Part B, not a ninth primary phase.
- Standard phase documents use uppercase contract names; phase-specific
  intentions use `intention-<kebab-name>.md`.
- App directories and npm suffixes use kebab-case; curriculum packages use
  `@curriculum/<name>`, while the protocol demo uses `@agent-to-agent/<name>`.
- React components use PascalCase; routes, utilities, server modules, and
  feature directories use lowercase or kebab-case.
- Canonical AI function directories use `NN-kebab-case`; portable capability
  names remain stable when flattened into harness projections.
- AI Program categories and nodes use numeric prefixes plus kebab-case, with a
  `README.md` as every folder's landing page.
- Normative program documents use frontmatter for status, owner, backup,
  approver, scope, freshness, evidence, and supersession.
- Generated harness files are never edited directly; canonical `ai/` sources
  and generated projections are changed together.

## Definite gaps and unresolved validation

### Remaining delivery gates

1. Review and commit the release-hardening branch, then prove the immutable
   starter-kit candidate from a clean clone.
2. Add the QuickBooks and Trello Playwright suites to an approved service-backed
   rehearsal; exercise A2A and model-provider live paths in the approved client
   environment.
3. Complete the documented human gates: timed instructor rehearsal,
   MindNode visual calibration, client access/policy confirmation, and
   live-service/provider rehearsal.

### Intentional client-specific gaps, not curriculum defects

4. Assign AI Program owners, approvers, applicable obligations, risk appetite,
   controls, evidence systems, profile selection, and review cadence during
   client discovery.
5. Refresh dated models, tools, protocols, prices, vendor terms, and security
   advisories before every cohort.

## Bottom line

The product is real and course-ready: it has a complete teaching architecture,
deep instructor support, nine verified decks, hands-on labs, twelve implemented
reference experiences, a portable AI capability layer, serious take-home
governance/GRC content, a working capstone application, and reusable marketing
exports. Its remaining conditions are the honest ones a client engagement must
resolve: owners, policy, approved services and providers, current terrain,
timed rehearsal, and final human approval. Those are visible deployment gates,
not unfinished curriculum.
