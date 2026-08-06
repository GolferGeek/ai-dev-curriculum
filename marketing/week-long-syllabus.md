# AI-Accelerated Software Development

**Tagline:** Helping small teams build like big teams.

## Course Format

**Length:** ~30 contact hours — 5 sessions of about 6 instructional hours each (with breaks and lunch)  
**Audience:** Software developers and hands-on technical leads who write,
review, test, or maintain code
**Format:** Instructor-led, hands-on labs, group review, final project  
**Primary Outcome:** Participants leave with a repeatable AI-assisted software delivery workflow they can adapt inside their organization.  
**Instructor:** Matt Weber (GolferGeek) — a senior developer for a few decades,
most recently working with Angular frontends and C# backends. Matt built
open-source platform tools to exercise his own AI-development learning and is
now focused on teaching the resulting operating model.

**Rhythm:** Eight primary phases run from `00` through `07`. Days 1–3 cover two
primary phases each; Phase 05 has Part A (scouting/evaluation) and Part B
(registry/publication/lifecycle) across the Day 3 close or Day 4 opening. Day 4
deepens model choice and cost; Phase 07 makes Day 5 the client's AI Program
capstone. Well-scoped builds leave agent run time for teaching and review.

**Scheduling:** written as five consecutive days, but the eight-phase structure
maps to other calendars: one session per week for five weeks or eight primary
half-day sessions plus the Phase 05 Part B extension. See the
[course proposal](course-proposal.md) for format options.

Instructor detail: [lesson-plans/](lesson-plans/) (per-phase plans) and [lesson-plans/discussion-topics.md](lesson-plans/discussion-topics.md) (cross-cutting talks slotted by phase).

## Course Description

This course teaches participants how to use AI coding agents as practical software development partners. Students learn how to turn business intent into requirements, create implementation plans, direct AI agents, build working applications, verify real user flows, review generated code, research existing systems, and adopt an operating model their organization can keep.

This is different from a traditional "learn to code with AI" course. That path still matters for people who want to become stronger programmers. This course is aimed at smaller teams with big ideas, where the code matters but the **business capability** matters more.

The curriculum emphasizes disciplined human oversight. AI tools accelerate development; participants remain responsible for scoping work, checking assumptions, validating behavior, protecting sensitive data, and deciding what is ready to ship.

## Week at a glance

| Day | Morning | Afternoon | Theme |
|-----|---------|-----------|--------|
| **1** | [Phase 00](../docs/phases/00/README.md) — Pipeline & first build | [Phase 01](../docs/phases/01/README.md) — SaaS killer (auth + data) | Define well, build fast, verify the trust boundary |
| **2** | [Phase 02](../docs/phases/02/README.md) — Quality gates | [Phase 03](../docs/phases/03/README.md) — Brownfield research | Review & understand before you change |
| **3** | [Phase 04](../docs/phases/04/README.md) — Agent protocols | [Phase 05](../docs/phases/05/README.md) [Parts A](../docs/phases/05/README.md) [and B](../docs/phases/05.5/README.md) — capability governance | Where software is going; encode and govern org knowledge |
| **4** | [Phase 06](../docs/phases/06/README.md) — Model eval lab | Routing, cost, procurement & adoption prep | Which model for which job — with evidence |
| **5** | [Phase 07](../docs/phases/07/README.md) — AI Program capstone | Governed change, readiness review & presentations | Take the operating product home |

Verification (in-app browser, Playwright, computer use) is **woven through Days 1–2** whenever an app is running — not a standalone day. Governance, harness memory, corporate context, and model routing are taught from [discussion-topics.md](lesson-plans/discussion-topics.md) during build windows.

## Prerequisites

Required:

- Professional or substantial practical software-development experience.
- Ability to read and modify code, use Git, run terminal commands, and work in
  an IDE.
- Familiarity with tests, pull requests, dependencies, and application
  debugging.

JavaScript/TypeScript and React experience helps with the default web labs, but
experienced developers from other stacks can use the supplied intentions and
reference implementations. This five-day course is not the one- or two-day
non-developer AI orientation.

## Tools And Accounts

**Required of every participant:** access to an approved capable AI coding
agent with enough model bandwidth for the labs. Cursor is the recommended
common IDE; Claude Code and Codex are fully supported. Developers may use
Cursor's agent interface or launch Claude Code/Codex from its terminal or
supported editor integration. Exact plans, prices, providers, and approved
models are confirmed with the client before each cohort.

Final tool requirements should be confirmed before each cohort. The course can be adapted based on available subscriptions and school lab constraints. Participants should complete the [pre-course setup checklist](pre-course-setup.md) before Day 1 so the first morning goes to concepts, not installs.

Supporting tools include:

- Git and GitHub (on Windows: [Git for Windows](https://git-scm.com/download/win) recommended)
- Node.js and npm
- Cursor IDE (recommended) or another client-approved development environment
- Claude Code, Cursor, or Codex as the coding harness
- Browser automation or in-app browser tools
- Playwright
- SurrealDB (Phase 01+; native install on Windows/macOS/Linux, or Docker)
- Optional: Ollama, Anthropic API access
- Optional **Mac only:** Xcode / SwiftUI — native iOS tracks are an opt-in; the class default is web apps so Windows and Linux participants follow the same path

**Platform claim:** The core curriculum (pipeline, Next.js apps, SurrealDB, quality gates, research tools, protocols, skills browser, model eval) is **OS-agnostic**. **SwiftUI / SwiftData / Xcode are macOS-only** — there is no Windows or Linux substitute; those tracks stay optional.

## Learning Outcomes

Participants will be able to:

- Explain where AI coding agents fit in a software delivery workflow (harness vs model; intention → PRD → plan → build → verify).
- Configure **shared project instructions** for their chosen harness (and explain team vs personal memory).
- Write or critique a clear intention; convert it into requirements and a plan; direct an agent through a scoped build.
- Verify running software (browser / Playwright / computer use as appropriate) — never trust the transcript alone.
- Prove an auth-and-data chain (including second-user isolation) on a real app slice.
- Run quality scanners, architecture monitors, and a pre-ship gate; grow living review standards.
- Research an unfamiliar codebase (ingest, map, security, git story) before changing it.
- Describe agent protocols at a high level (discover, authorize, settle, watch the wire).
- Treat skills and specialized agents as organizational dependencies; maintain
  a canonical function-based library and generate native harness projections.
- Query and modernize an agent-readable AI program covering technical
  governance, GRC, culture, workforce experience, sentiment boundaries,
  delivery, and adoption; select Full, Essential, or Light without duplicating
  policy.
- Choose models empirically (evals + routing policy), including local vs hosted tradeoffs.
- Start a company-owned [AI Program](ai-program-take-home-product.md) with a standard governance/GRC hierarchy, maintained capabilities, and an application interface; use the [adoption worksheets](adoption-kit/README.md) to gather company-specific inputs.

## Example Applications

Course labs can be selected from realistic business application examples, including:

- Team wiki or internal knowledge base.
- Pipeline CRM or sales tracker.
- Operations dashboard.
- API workspace.
- Invoice or expense workflow.
- Kanban-style project board.
- Customer portal or self-service workflow.
- New product prototype or revenue-stream experiment.
- Browser-tested SaaS-style web application with auth and persisted data.
- Existing-codebase improvement workflow for private company cohorts.

Advanced builds scheduled in-week (not only as Day 5 options):

- Agent-to-agent protocol dashboard (Phase 04).
- Skills library / skills browser (Phase 05).
- LLM / model comparison lab (Phase 06).

---

## Day 1: Pipeline + Real Apps

**Phases:** **00 (morning)** → **01 (afternoon)**  
**Theme:** Learn the workflow; then raise the stakes to auth and data.

### Morning — Phase 00

- What AI coding agents can and cannot do; harness vs model; chat vs agentic work.
- Bracket the work: define well, build the scoped slice fast, prove it hard — one iteration at a time.
- Pipeline: intention → PRD → plan → build → challenge pass.
- Harness memory / instruction passport (Claude / Cursor / Codex); shadow AI & plan tiers.
- Seed idea: model routing (don’t leave every call on the frontier model).
- Lab: monorepo + one track app (wiki / CRM / ops / API workspace); predict → build → verify.
- Plant verification early: closing bracket **`build → lint → test → verify → browser`**; on first effort, steer for **unit + API/HTTP + e2e** tests, not one smoke test.

**Deliverable:** Reviewed intention + PRD + plan; working Phase 00 app slice.

### Afternoon — Phase 01

- “Real” means signup → sign-in → protected routes → **per-user data**.
- Why AI-built apps fail on auth and isolation (industry cases).
- Corporate context layers (brand, GTM, domain) and human decision boundaries.
- Lab: SaaS killer (QuickBooks / Trello / Twitter / Facebook track — **web default** on Windows/macOS/Linux); SurrealDB + Next.js. Native SwiftUI/Xcode remains Mac-only opt-in.
- Verify the auth-and-data chain hard (second user; `/test-browser` where useful).

**Deliverable:** Demo-grade app with working auth-and-data chain (or a clear gap list if time cuts short).

**Discussion track:** D00-* and D01-* in [discussion-topics.md](lesson-plans/discussion-topics.md).  
**Detail:** [phase-00.md](lesson-plans/phase-00.md), [phase-01.md](lesson-plans/phase-01.md).

---

## Day 2: Quality + Brownfield

**Phases:** **02 (morning)** → **03 (afternoon)**  
**Theme:** Generation is cheap; review and understanding are the scarce skills.

### Morning — Phase 02

- Quality tax / comprehension debt; scanners → fixers → commit gate → PR eval.
- Living standards that grow when reviews find gaps.
- Observability of agent work (diffs, tests, checklists — not green chat).
- Lab: `/scan-errors` → `/fix-errors` → `/monitor` → `/harden` → `/commit` on yesterday’s app.
- Continue browser verification as part of “would a reviewer approve this?”

**Deliverable:** Cleaner app + quality checklist; at least one standard promoted into team rules/docs.

### Afternoon — Phase 03

- Brownfield is the real job: ingest, map, security-scan, git-story, improve, deep-dive, author-agent.
- AI as senior at understanding, junior at risky execution.
- Day-2 safety for production repos (read-first, no secrets in prompts, smallest blast radius).
- Lab: research tools on the curriculum repo (or a sanitized stand-in); capture findings into passport/skills.

**Deliverable:** Research packet (orientation + map + risks) and a draft custom skill/agent note.

**Discussion track:** D02-* and D03-*.  
**Detail:** [phase-02.md](lesson-plans/phase-02.md), [phase-03.md](lesson-plans/phase-03.md).

---

## Day 3: Protocols + Skills Ecosystem

**Phases:** **04 (morning)** → **05 (afternoon)**  
**Theme:** Agents that collaborate; knowledge that travels.

### Morning — Phase 04

- Protocol vs API; A2A / AP2 / x402 / AG-UI / MCP at altitude.
- Authorize-before-act (mandates as a general business pattern, not only payments).
- Lab: protocol demo dashboard — Discover / Ask / Explore; read the wire.
- Multi-agent coordination as industry direction.

**Deliverable:** Running protocol demo (or partial) with at least one inspectable exchange narrated by the room.

### Afternoon — Phase 05 Parts A and B

- Skills, specialized agents, rules, tools, memory, and code.
- Functional organization, canonical source, and three native projections.
- Lab: capability locator — snapshot, diff, catalog, full preview, and evaluate.
- Registry extension — persist revisions and policy, publish one canonical
  capability by PR, generate projections, and trigger re-review on drift.

**Deliverable:** Working capability locator/registry, three evidence-backed
evaluations including one rejection, and one reviewable canonical publication
with Claude Code, Cursor, and Codex projections.

**Discussion track:** D04-* and D05-*.  
**Detail:** [phase-04.md](lesson-plans/phase-04.md),
[phase-05.md](lesson-plans/phase-05.md), and
[phase-05.5.md](lesson-plans/phase-05.5.md).

---

## Day 4: Model Eval + Cost & Procurement

**Phases:** **06 (morning / long run)** → **routing & adoption prep (afternoon)**  
**Theme:** Which model for which job — with *your* evidence.

### Morning — Phase 06

- Benchmarks vs your workload; LLM-as-judge pitfalls; local vs hosted.
- Lab: build eval harness + dashboard; start the tournament (models × prompts × judges).
- Use the long run for rubric workshop, judge diversity, and human spot-checks.

**Deliverable:** Harness + dashboard; eval in progress or complete depending on hardware/API limits.

### Afternoon — Phase 06 synthesis

- **Model routing (deep):** cheap vs mid vs frontier; cascade vs classify; escalation metrics.
- Eval-driven procurement; cost visibility; privacy–cost–quality triangle.
- Fill gaps from earlier days (verification practice, passport polish, decision-boundary one-pager).
- Prep Day 5: choose a repository path; draft the eleven-piece AI development operating model; identify approved, sanitized GRC source names/locations and client owners.

**Deliverable:** Written route table + golden-prompt list for their org; Day 5 plan.

**Discussion track:** D06-* and start of D-CLOSE-*.  
**Detail:** [phase-06.md](lesson-plans/phase-06.md).

---

## Day 5: Build Your AI Development Operating System

**Phase:** **07 — AI Program capstone**
**Theme:** Build your AI development operating system in a repository you will keep.

### Choose one repository path

- Harden the team's current repository.
- Create or migrate a shared Nx monorepo and add one or two bounded applications.
- Create a standalone AI program repository that distributes policy and skills to product repositories.

### Hands-on work

- Baseline the repository before changing it.
- Make and document the Nx decision rather than forcing a migration.
- Adapt the folder-backed, queryable `docs/ai-program/`, root agent instructions, and a small
  set of owned canonical skills and agents.
- Define Git branches, approvals, checks, review evidence, and rollback expectations.
- Record approved LLM accounts, data boundaries, model routing, spend ownership, and human-only decisions.
- Complete a GRC control-mapping clinic: authoritative client sources, data/tool/change risk tiers, controls and durable evidence, independent review, rollback, monitoring, stop conditions, exceptions, owners, and review triggers.
- Complete one real, low-risk change through intention, implementation, verification, and review.

### Optional stretch: the room's agent network

Participants without another project—or teams that finish early—can build narrowly authorized AI assistants for themselves, their teams, or fictional companies. They publish Agent Cards, declare bounded skills, exchange A2A tasks, and connect the room into a small observable agent network.

The exercise is graded on enterprise control rather than conversational novelty: authenticated identity, least-privilege credentials, server-side authorization, disclosure boundaries, approval gates, rate and spending limits, audit events, prompt-injection handling, and tested revocation. Each assistant must demonstrate one allowed task and one task it correctly denies or escalates.

### Deliverable

Each participant or team presents:

- The business problem and capability.
- The intention and requirements.
- What the agent built or changed.
- How they verified it.
- What risks remain.
- Their repository architecture and Nx decision.
- Their adapted `docs/ai-program/`, AI Governance & GRC application, agent instructions, skills, Git process, and LLM governance.
- How their organization will use the workflow after the course (eleven-piece model started, including the GRC control map).

### Private Cohort Option

Day 5 is designed as a supervised **their-repo** day: orientation, local startup, architecture work, AI tool configuration and permission boundaries, one low-risk AI-assisted change, and a review-ready operating model. Draws on every phase, especially Phase 03 research, Phase 02 quality, Phase 05 skills governance, and Phase 06 model routing.

**Discussion track:** D-CLOSE-1 and D-CLOSE-GRC (required), D-CLOSE-2, D-CLOSE-3.
**Detail:** [phase-07.md](lesson-plans/phase-07.md) (primary lesson),
[week-close.md](lesson-plans/week-close.md) (extended client-repository clinic),
and [adoption-kit/](adoption-kit/README.md).

---

## Assessment

Participants are assessed through practical completion rather than exams:

- Clear intention and requirements.
- Scoped implementation plan.
- Working software or credible prototype across the phase sequence.
- Browser or test-based verification.
- Quality / research / protocol or skills artifact as applicable.
- Final presentation and adoption plan.

## Optional Shorter Versions

### Half-Day Executive Demonstration and Discovery

Roughly three hours that double as a working pitch meeting: the live build loop on a **well-scoped** problem from the company's own world ("a month in a morning" for that slice, watched firsthand), a walk-through of what a cohort of their developers would build across the five days, and a governance/fit discussion. Functions as discovery — it produces a tailored recommendation and is the natural on-ramp to the full course.

### One-Day Executive Workshop

Strategy, demos, governance, risk, ROI, and adoption planning. Minimal coding. Can sample Phase 00 pipeline live.

### Two-Day Practitioner Bootcamp

**Day A:** Phase 00 + 01 (pipeline + real app).  
**Day B:** Phase 02 + verification + adoption sketch (compress 03–06 to talking points).

### Custom Company Cohort

Uses a company's own tools, workflows, or sanitized business problem as the Day 5 project.

Can include one or two additional days dedicated to setting up the company's own codebase for AI-assisted development, browser verification, and backlog triage.

## Instructor Notes

- Confirm tool availability and subscriptions before class; verify Privacy Mode / training terms for business use.
- Keep the **two-phases-per-day** clock honest: morning phase closes with a short belief check before lunch; afternoon phase gets a full close.
- Nobody watches the build bar — use [discussion-topics.md](lesson-plans/discussion-topics.md) and secondary-window harness labs.
- Emphasize verification every day an app runs (in-app browser, Playwright, computer use as available).
- Avoid presenting AI-generated output as complete until it has been reviewed and tested.
- Include privacy and data-handling conversation before participants use employer code or sensitive information.
- AI development practices change quickly — mark *[refresh]* items and re-check model tags, protocol partner counts, and vendor policies before each cohort.
- Position any follow-up consulting as optional periodic support, not a long-term dependency.
