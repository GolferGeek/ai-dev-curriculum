# Five-day instructor delivery guide

This is the instructor's week-level control document. Per-phase `TEACHING.md`
files control individual modules; lesson plans supply the expanded narrative
and citations; `RUN-ORDER.md` files control learner execution.

## Delivery assumptions

- Audience is developers and hands-on technical leads.
- Five days provide about six contact hours each, excluding lunch.
- Cursor is the recommended common IDE; Claude Code and Codex are supported.
- Learners use one continuing branch created from `starter-kit-v1`.
- Learners build in `apps/`; the instructor controls when
  `completed/apps/` is opened.
- The instructor never promises that every build will finish on identical
  hardware or networks. Recovery paths and reference implementations keep the
  learning objective moving.

## Daily rhythm

```text
open and retrieve yesterday → teach durable model → show artifact contract
→ predict/challenge → build with teaching checkpoints
→ close the verification bracket → learner explains and records
→ instructor captures gaps for next morning
```

Use build time for discussion and review. Do not let the room watch a progress
indicator in silence.

## Day 0 — instructor and client preflight

Complete at least three business days before delivery:

- Complete the [cohort discovery guide](COHORT-DISCOVERY.md) with the sponsor
  and a technical representative.
- Confirm developer audience, cohort size, remote/in-person format, and
  accessibility needs.
- Confirm approved harnesses, providers, accounts, data terms, source access,
  and network restrictions.
- Run the clean-clone verification procedure.
- Render and inspect all decks.
- Refresh every time-sensitive citation, model, protocol, and ecosystem claim.
- Test SurrealDB, Playwright/browser access, GitHub flow, and optional Ollama.
- Prepare dated offline source snapshots and reference-app recovery.
- Identify client-specific code/data that may or may not be used.
- Name client decision owners for each AI-program facet.

Send learners the setup checklist and require confirmation before Day 1.

## Day 1 — pipeline and trustworthy application boundaries

### Morning: Phase 00

Use the
[Great Convergence introduction map](../mind-maps/00-introduction-the-great-convergence.opml)
for the first 15–20 minutes of the opening block. It introduces Matt, traces
completion → generation → agent harnesses, defines cadence, and frames the
company's opportunity to reclaim software that should fit its work. This time
is included in the 45-minute opening block below. Use the map's room-discovery
branch to hear the developers directly; detailed intake belongs in the
[cohort discovery guide](COHORT-DISCOVERY.md), not in class.

| Block | Minutes | Purpose |
|---|---:|---|
| Great Convergence, opening deck, and mental model | 45 | why now; model, harness, context, tools, skills, agents |
| Repository and starter architecture | 25 | one branch, active/reference apps, canonical capability library |
| Intention/PRD/plan challenge | 40 | define the product and acceptance criteria |
| Build with teaching windows | 75 | first demo-grade product slice |
| Closing bracket and explanation | 45 | build, tests, browser, challenge pass |

### Afternoon: Phase 01

| Block | Minutes | Purpose |
|---|---:|---|
| SaaS and trust-boundary lecture | 35 | auth, per-user isolation, secrets |
| Track selection and artifact challenge | 35 | choose a feasible product slice |
| Data/auth foundation | 55 | schema, migration, authentication |
| Product build | 65 | useful workflow on real persisted data |
| Two-user and browser verification | 50 | prove isolation and failure states |

After class, capture setup blockers, build completion, tests, and learners who
need recovery. Do not advance an unverified auth/data claim.

## Day 2 — quality and brownfield understanding

### Morning: Phase 02

Teach scanner versus evidence, fixer boundaries, monitor/hardener separation,
commit gates, and independent PR evaluation. Run the complete quality loop on
the Day 1 application. Require one rejected finding and one promoted durable
standard.

### Afternoon: Phase 03

Teach research before change. Learners ingest, map, trace history, inspect
security and operations, and write a research packet on unfamiliar code. A
small improvement is allowed only after the research packet identifies a safe
entry point and verification plan.

Day close: each learner explains one fact, one hypothesis, one risk, and one
decision that should become project or organizational memory.

## Day 3 — agent counterparties and organizational capabilities

### Morning: Phase 04

Use the protocol deck and presenter guide. Separate MCP capability access from
A2A delegation to an independent actor. Build or inspect the observable
protocol flow. Require identity, authority, task state, event, and failure
explanations; do not teach a protocol as a complete business relationship.

### Afternoon: Phases 05 and 05.5

Use one combined product arc:

1. Scout skills and agents from exact source revisions.
2. Inspect and evaluate three candidates; reject or restrict one.
3. Preserve the working locator while adding persistent registry state.
4. Publish one approved exact revision into canonical `ai/` through review.
5. Generate Claude Code, Cursor, and Codex projections.
6. Detect upstream drift and trigger re-review.

If time is tight, provide the registry migration foundation and keep
evaluation, canonical publication, generation, and drift as the required
hands-on outcomes. CRUD polish is secondary.

## Day 4 — model evaluation and program decisions

### Morning: Phase 06

Learners define workload prompts, rubrics, contestants, judges, repetitions,
and human spot checks before starting the run. The instructor distinguishes
benchmark reputation from local evidence and makes uncertainty visible.

### Afternoon: synthesis

While evaluations run:

- interpret quality, speed, consistency, and cost;
- design routing and fallback;
- discuss hosted/local data boundaries;
- inspect tool/provider politics as dated terrain;
- query all facets of `docs/ai-program/`;
- assign owners and identify client decisions still missing; and
- plan the Day 5 low-risk real change.

Do not crown a universal model. Produce a route table for defined work.

## Day 5 — build the client's operating system

### Morning

- Choose current repo, shared monorepo, or standalone AI-program repo.
- Baseline without changing production.
- Adapt `AGENTS.md`, `docs/ai-program/`, function groups, canonical
  capabilities, and harness projections.
- Record approved harness/model/data/authority/quality decisions.
- Select one low-risk change with intention, evidence, and rollback.

### Afternoon

- Execute and verify the change.
- Run the AI-program advisor in ask and audit modes.
- Run canonical/projection and program checks.
- Present the product result and the operating model.
- Record 30/60/90-day owners, reviews, pilots, and training.

The final presentation must show what the agent changed, how it was verified,
which decisions govern it, what remains uncertain, and who owns the next
review.

## Recovery ladder

When a lab stalls:

1. Preserve the failure and teach diagnosis.
2. Narrow to the learning-critical slice.
3. Use a dated cache or supplied fixture.
4. Compare with the relevant reference implementation.
5. Restore a clean checkpoint and continue.
6. Convert unfinished polish into an after-class exercise.

Never skip the learning objective or claim success without evidence merely to
finish the schedule.

## End-of-day instructor record

Record:

- attendance and setup state;
- achieved outcomes and incomplete work;
- common misconceptions;
- technical/network/tool failures;
- time-sensitive claims that need correction;
- artifacts produced and verification evidence;
- recovery actions for tomorrow; and
- client decisions or escalations.
