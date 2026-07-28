# Teaching artifact readiness

This matrix defines what the instructor uses before, during, and after each
module. “Complete” means the artifact contains teachable content; it does not
mean client-specific owners, accounts, policies, or current external facts
have already been supplied.

## Standard ten-document phase package

| Artifact | Audience | When used | Contract |
|---|---|---|---|
| `README.md` | Both | Before/during | Complete module purpose, flow, outputs, and navigation |
| `OVERVIEW.md` | Learner | Open | One-page anchor: today, do, leave with, boundary |
| `PREREQUISITES.md` | Both | Before | Learner, repository, authority, and instructor preflight |
| `COMMANDS.md` | Learner | During | Exact invocations plus authority and output contracts |
| `STARTER-KIT.md` | Both | Before/during | Supplied architecture, roles, data, fixtures, and guardrails |
| `RUN-ORDER.md` | Learner | During | Ordered lab with stop conditions and closing bracket |
| `TALKING-POINTS.md` | Learner | During/after | Durable concepts learners must explain |
| `TEACHING.md` | Instructor | Before/during | timing, script, checkpoints, failure modes, debrief |
| `DEMO-GRADE-BAR.md` | Both | Before/after | observable pass/fail standard |
| `VERIFY.md` | Both | During/after | evidence checklist and commands |

All eight modules—00, 01, 02, 03, 04, 05, 05.5, and 06—have this package.

## Module matrix

| Module | Before | During | After | Expanded lecture | Deck |
|---|---|---|---|---|---|
| 00 | prerequisites, starter kit, intentions | overview, run order, commands, teaching | grade bar, verify, talking points | `marketing/lesson-plans/phase-00.md` | `phase-00-opening-ai-dev.pptx` |
| 01 | prerequisites, starter kit, product intentions | overview, run order, commands, teaching | grade bar, verify, talking points | `phase-01.md` | `phase-01-saas-killers.pptx` |
| 02 | prerequisites, baseline app, starter kit | overview, quality loop, teaching | grade bar, verify, promoted standard | `phase-02.md` | `phase-02-quality-engineering.pptx` |
| 03 | prerequisites, research target, starter kit | overview, run order, teaching | packet, grade bar, verify | `phase-03.md` | `phase-03-project-memory.pptx` |
| 04 | prerequisites, protocol preflight | deck/presenter guide, run order, teaching | narrated trace, grade bar, verify | `phase-04.md` | `phase-04-agent-to-agent-future.pptx` |
| 05 | source/cache preflight, capability program | scouting, full preview, evaluation board | three evaluations, rejection, verify | `phase-05.md` | `phase-05-skill-scouting.pptx` |
| 05.5 | working locator, backup, database, roles | migrate, govern, publish, generate, drift | lifecycle demonstration, verify | `phase-05.5.md` | `phase-05-5-skills-registry.pptx` |
| 06 | models/keys/hardware, prompt suite | rubric, run, dashboard, interpretation | route table, caveats, verify | `phase-06.md` | `phase-06-model-evaluation.pptx` |

## Week-level artifacts

- [Five-day delivery guide](FIVE-DAY-DELIVERY-GUIDE.md)
- [Presentation deck QA](DECK-QA.md)
- [Five-day syllabus](../../marketing/week-long-syllabus.md)
- [Discussion scripts](../../marketing/lesson-plans/discussion-topics.md)
- [Week close](../../marketing/lesson-plans/week-close.md)
- [Pre-course setup](../../marketing/pre-course-setup.md)
- [Course deliverables](../../marketing/course-deliverables.md)
- [AI program](../ai-program/README.md)
- [Monorepo operating model](../MONOREPO-OPERATING-MODEL.md)

## Cohort-specific completion gate

Before marketing a scheduled cohort as ready, the instructor and client still
must:

- name AI-program owners and approvers;
- choose approved harness/model/data policy;
- verify learner accounts, networks, and hardware;
- refresh dated tool, protocol, model, and ecosystem claims;
- run a clean-clone technical rehearsal;
- visually inspect the final decks;
- decide whether client code may be used; and
- prepare accessibility, remote-delivery, and recovery arrangements.

These are delivery inputs, not unfinished curriculum prose.

## Technical validation evidence

Validated on 2026-07-28:

- all 13 JavaScript reference packages install from committed lockfiles and
  produce successful production builds in dependency order;
- the three Next.js applications pass their ESLint configurations;
- the four Vite applications pass their Playwright browser smoke tests;
- both SwiftUI applications build for a generic iOS Simulator destination;
- the root monorepo builds and tests successfully;
- all eight decks—151 slides total—render without overflow and passed visual
  inspection;
- every phase has the standard ten-document package;
- canonical skills and agents generate identical checked-in Claude Code,
  Cursor, and Codex projections;
- the AI-program decision system passes its required-document, facet,
  decision-domain, and query-acceptance checks;
- repository Markdown links, MindNode OPML generation, XML validity, and the
  strict MkDocs build pass.

Two items intentionally remain cohort preflight work:

1. The SurrealDB-backed and provider-backed paths require the client-approved
   services, accounts, and data policy before their authenticated end-to-end
   exercises can be rehearsed.
2. The current stable Next.js release used by three training references has
   upstream audit advisories without a non-preview upgrade. The references are
   not production templates; refresh them before every cohort and follow the
   [AI terrain watchlist](../ai-program/watchlist.md).

The OPML maps are structurally valid and complete. Instructor visual
calibration in MindNode remains a deliberate human step: revise one map, export
it, and use the differences to tune the generated conventions for the rest.
