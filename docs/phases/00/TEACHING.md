# Phase 00 — Instructor Teaching Guide

*This is the **instructor-facing** companion to Phase 00. It is not a checklist of what to type — that's [RUN-ORDER.md](./RUN-ORDER.md). It's not the learner cheat sheet either — that's [TALKING-POINTS.md](./TALKING-POINTS.md). **Share at open:** [OVERVIEW.md](./OVERVIEW.md) — one-page learner anchor (today · learn · leave with). This document is **what you teach, in what order, and where you stop the build to explain it.** It assumes you know the material and need a script for delivering it live.*

---

## The core reality of this course

**For a well-scoped slice like this, the agent often finishes in under an hour — sometimes around twenty minutes. That is not every project; it is what careful scoping makes possible. The build is not the lesson.** If you spend the session watching progress scroll by, you have wasted the room.

> **The one idea this whole course exists to deliver:** **bracket the work.** For any particular effort — a scoped slice, one feature, one iteration — **define** and **prove** bracket the agent's build work: `( intention ) · build · ( build · lint · test · verify · browser )`. For **small, well-scoped efforts**, the agent middle has collapsed to often under an hour — not because all software is fast, but because **scoping** is part of the skill. The **closing bracket** is not one step: compile, lint, run the test suite you asked for, then **verify** the result against the intention, then **browser** (open it, `/test-browser`, or computer use). The brackets didn't get lighter; the gap between them did. Every lab is engineered to make people *feel* that shift: time on the opening bracket, a blink of agent building, most of the clock on the closing bracket.
>
> **Say it out loud:** One effort, one pair of brackets. A **full application** is many iterations — bracket, build, prove; bracket again. You don't bracket the whole ERP in one sitting; you bracket the **next slice** that's appropriate to finish and verify before you move on. Skipping either bracket on *that* effort is how you ship confident, broken software.
>
> **But the build time is just the enabler — the real headline is that the whole iteration loop collapses for scoped work.** A month of software work was never a month of typing; it was *latency*: requirements meetings → prototype → review meeting → change requests → wait for the next sprint → repeat, with days or weeks of coordination baked into every turn. Collapse the build on a **well-scoped slice** and you can collapse the loop. Put the stakeholder, a couple of developers, and a tester in **one room**: define it, build it, the stakeholder steps out and comes back when the slice is ready — often within the hour — "no, not that, more like this" — and you iterate again before lunch. **A month of meetings and hand-offs becomes a morning** — for work you scoped small enough to finish and verify in one sitting, not for every system you'll ever build. When a client internalizes that, they stop treating software as a scarce, months-long asset and start treating "define it well and verify it hard, together, fast" as the real skill. That is what they are paying for.

The value is in what wraps around the build:

1. **Teach** the concepts for the phase, at altitude — enough to steer, never enough to implement by hand.
2. **Review the intention together.** It's already written, so the exercise is *critique*, not authoring: "Does this say what we actually want? What's missing? What would you add?"
3. **Predict.** Before anyone hits build, have the room say out loud what the agent will produce — screens, data, where it will cut corners.
4. **Build** (for a scoped slice: often ~20 min, sometimes up to an hour — larger work takes longer). Nobody watches the bar. This window *is* your concept talk (the "State of the AI Union," below). You teach while it runs — and because every one of these tools supports **more than one session at a time**, a build can be generating in one terminal while the class keeps moving in another.
5. **Reflect** — the bulk of the clock. Prediction vs. reality. The challenge pass. Run the **closing bracket in order**: `npm run build` → lint → `npm run test` → verify against the intention → open in the browser. "Where did it drift? How do we *know* it's good? What would we change?"

The predict-then-compare move is the engine of this course. It manufactures the discussion instead of hoping it shows up.

### Rough timing (Phase 00 shares Day 1 with Phase 01)

| Block | ~Time | What's happening |
|---|---|---|
| **Setup + State of the AI Union** | 90 min | Install the agent, sign in, clone, poke around — while you deliver the opener talk. Downloads run in the background. |
| **Part A — the monorepo** | 45 min | Pipeline concepts + one build. Short, because the *pipeline* is the lesson, not the monorepo. |
| **Part B — first app** | 90 min | Review intention → predict → scoped build (often under an hour for this slice) → reflect + verify. This is the heart of Phase 00. |
| **Debrief → hand to Phase 01** | 15 min | "What surprised you?" and set up the afternoon. |

If the room is fast, they build a *second* Part B track and you compare the two. Slack lives here.

---

## Soledevelopreneur & AI scout (60–90 seconds, during setup)

Set expectations before the room thinks they're buying a frozen corporate playbook. This is **framing**, not a build step — say it once while installs run, then move on.

**The pitch (adapt in your voice):**

> I'm not a scaled training company with a quarterly release train. I'm a **soledevelopreneur** too — one builder, full responsibility, no platform team behind me — and an **AI scout**. I go into the weeds, try things, break them, and come back and tell you what's actually working *now* and where it's heading. The AI terrain changes too fast for a locked-in curriculum at enterprise scale to be the product. **Nimble beats frozen.** What you get here is **field notes from the trail** — intention, PRD, plan, build, verify — not doctrine that expires when the next model drops. Your job is still to **steer and verify**; mine is to stay ahead enough that you're not learning last year's traps.

**Land two terms, then define each once:**

- **Soledevelopreneur** — *who most of you are (or are becoming)*: building product, code, and judgment on your own with agents — not waiting on internal enablement or a vendor's LMS.
- **AI scout** — *what I am to you*: in the weeds ahead, professional but nimble, reporting back so you can adapt faster than a mid-size company's training cycle.

**Do not** make this anti-company. Learners at mid-size shops still need a scout — someone who's been in the weeds recently, not a vendor locked to last quarter's stack.

**Connect to the course:** the repo (`docs/`, `.claude/`, phases) is the **last scout run's trail markers**, not a monument. When the ground shifts, the markers get updated.

### Tempering the scout (another 60 seconds — don't skip this)

Scout energy cuts both ways. The room will get excited; **your job is to channel that excitement through adoption cost**, not kill it.

**The learner-side problem:** Someone comes back from a conference or a Twitter thread going *"Woo, this thing is really cool!"* From ten steps back, that's the **fourth cool thing this week** — and the last two times the team tried to change, they pivoted to something else before the first change stuck. New tools have a **cost**: retraining, broken workflows, half-migrated repos, morale. The scout's report is input, not an automatic mandate.

**Land this line:** *Figure out how to take what the scout found — and what you're excited about — and temper it with what you already have and how much effort change actually takes.*

**The instructor-side discipline (model it):** You are a scout too. You **see** everything new. Part of the job — and part of what you've been learning for **two years** — is **tempering yourself**: how do I fold this into *my* process without spending all my time on **process change** instead of **product development**? The pipeline in this course (intention → PRD → plan → build → verify) is what survived that filter — not because it's frozen forever, but because it's **stable enough to ship with** while the terrain moves underneath.

**What this course is:** the distillation of that two-year loop — find → try → **decide what to keep** → **teach what actually held up**. You're not learning every shiny thing; you're learning judgment about **when** to adopt.

**Discussion hook (keep in your back pocket):** "What would it cost *your* team to switch harnesses next Tuesday — and what would you have to finish first?"

### Monorepo operating system (60 seconds — land before Part A)

The scout story is one use of a **bigger pattern** you're handing them:

> The monorepo isn't only for **apps**. It's your **operating system**: **documents** for memory and decisions (corporate, group, project) and **skills** for workflows. **Organizational AI engagement** — how leadership sets guardrails and the dev group maintains source of truth for planning and building — lives in kit **10** and `docs/ai-program/`. **Agent engagement** on a single task is the pipeline + kit 05. See [MONOREPO-OPERATING-MODEL.md](../../MONOREPO-OPERATING-MODEL.md).

---

## The opener: "State of the AI Union" (deliver during setup)

Goal: give people a correct mental model of the machine they're about to drive, so nothing later feels like magic. Keep it to a whiteboard, not slides. The whole taxonomy in one breath, then unpack:

> You type into a **harness**. The harness assembles **context** and hands it to an **LLM**, which replies with either words or a request to use a **tool**. The harness runs the tool, feeds the result back, and loops until the job's done.

Teach these seven terms in this order. Each gets a sentence and one analogy — resist going deeper:

- **LLM** — the model. It predicts the next chunk of text. It has no memory and takes no actions on its own; it's a very well-read intern who can only talk. *(Analogy: a brilliant advisor locked in a room with no phone.)*
- **Prompt** — what you say right now. One turn of the conversation.
- **Context** — everything the model can currently *see*: your prompt **plus** the files, the conversation so far, and any skills that got loaded. This is the whole game. Bad output is usually bad context, not a bad model. *(Analogy: the advisor's desk — they can only reason about what's on it.)*
- **Tools** — the actions the model is allowed to take: read a file, run a command, edit code. Words become work here. *(Analogy: you finally slide a phone and a keyboard under the door.)*
- **Harness** — the program running the loop: it fills the context, executes the tools, shows you the output. **Cursor, Claude Code, and Codex are harnesses.** The model is the engine; the harness is the car. This is why the course is tool-agnostic — same engine, different dashboards.
- **Skill** — a packaged set of instructions the harness loads *on demand* when it's relevant, so the model behaves like it read the manual. You'll type `/intention` in a minute — that's a skill.
- **Agent** — a scoped worker you hand a job to, with its own instructions and tools. `/run-plan` dispatches one. *(Analogy: a subcontractor you brief and turn loose on one room.)*

**Close the opener with the one thing they must leave believing:** the model is fast and confident and often wrong, so *your* job for five days is to steer and verify, never to trust. That sentence is the spine of the whole week.

---

## Part A — the monorepo (teach the pipeline, not Turborepo)

Part A is short on purpose. Nobody is here to learn Turborepo; they're here to learn the **pipeline** they'll run in every phase for the rest of their careers. Still, spend **two minutes** on *why* the house exists — otherwise the monorepo feels like ceremony.

### Why a monorepo (the 90-second version)

Stop the room before `/intention` and land these points:

1. **Not just "many apps in one repo."** The real win is **shared libraries**: UI components, types, API clients, auth helpers, config — all in `packages/*`, consumed by every app in `apps/*`. One fix propagates everywhere; no copy-paste drift between repos.
2. **This is a modern default for multi-product teams.** When someone graduates from one app to several, a monorepo is an attractive, mainstream shape. Google is the famous extreme: the vast majority of Google engineering works from **one enormous repository** (Piper) — billions of lines, tens of thousands of developers — because **code sharing and unified dependency management** at that scale are worth the tooling investment. ([Google's CACM article](https://cacm.acm.org/research/why-google-stores-billions-of-lines-of-code-in-a-single-repository/) is optional reading; you don't need to cite the numbers live.)
3. **One repo ≠ one deployment.** Chrome and Gmail share source; they do **not** ship as a single binary. Each app still gets its own build target, Dockerfile, or web service. The monorepo is **version control and shared code**, not a deployment bundle.
4. **They are getting an asset, not a worksheet.** Phase 00 hands them a **working Turbo shell** — not just docs. They can run the course here and, if the model fits, **fork the layout and conventions** into their own monorepo when they start building for real.
5. **Portfolio, not one-off homework.** Put **everything here** — each app they build (Phase 01 SaaS killers, then their own ideas) gets **`apps/<name>`** plus **`docs/projects/<name>/`** portfolio context in git. That's how teams discover they can keep building: same repo, same skills, new folder per product. See [projects/README.md](../../projects/README.md).

Then pivot: "Today the *pipeline* is the lesson; Turborepo is just the task runner that makes the shell pleasant."

### Why Turborepo (30 seconds)

If someone asks "why Turbo and not Nx?":

- **Turbo is a focused task runner + cache**, not a full monorepo platform. One `turbo.json`, your existing `package.json` scripts, npm workspaces — done.
- **What it's great at:** dependency-aware task order, **parallel** builds/tests, **local caching** (watch the second `npm run build` — unchanged packages skip work), optional **remote cache** for CI.
- **Bigger tools exist for bigger problems:** **Nx** adds plugins, generators, distributed CI—more platform, more surface. **Bazel** is for Google-scale polyglot builds. **Lerna/Rush** lean toward publishing policy. We picked Turbo because this course is **JS/TS**, learners need a **credible shell fast**, and the caching win is easy to *feel* in the room.

**Pause-and-teach anchors** (stop the room at each `/command` the first time it appears):

- **At `/intention`** — "Why does anything good start here? Because the quality of this conversation caps the quality of everything built after it. The agent can't want the right thing for you." Have them open [intention-monorepo.md](./intention-monorepo.md) and read it critically, not passively.
- **At `/prd`** — teach *traceability*: every requirement should trace back to a line in the intention. Ask: "Point to the intention sentence this goal came from." If they can't, that's drift — and drift is the enemy.
- **At `/plan`** — the PRD (the *what*) becomes ordered steps with named owners (the *how*). "Nothing gets built that isn't in the plan."
- **At the challenge pass (steps 4 & 6 in RUN-ORDER)** — this is the single most important habit in the course. Model it out loud: read what the agent produced and ask "does this actually match what I meant?" *before* moving on. Then show them the agent can check its own alignment too — but *they* own the judgment.
- **At `/run-plan`** — name it: "This dispatches an **agent** — `monorepo-builder`. Watch it turn a plan into a project." Then let the build run while you take questions from the opener.

Keep Part A tight. The moment `verify-curriculum-structure.sh` is green, move on. Don't linger.

---

## Part B — the first app (the heart of Phase 00)

This is where the teach → predict → build → reflect loop gets its full airing. The intention is provided (Part B is a "freebie" intention — they author their own starting in Phase 01), so class time goes to *reading it well* and *judging the result*.

### 1. Review the intention (critique, don't author)
Have them open their track's `intention-*.md` and go straight to **Demo-grade minimums** — that section is the contract for "done." Ask the room: "What does this intention leave unsaid? If you were the agent, what would you have to guess?" You're teaching them that ambiguity in equals slop out.

### 2. Predict (do not skip this)
Before `/run-plan`, go around the room:
- What screens will exist?
- What will the data look like?
- **Where will it cut corners?** (Empty states? Error handling? Fake-looking seed data?)

Write the predictions on the board. You will compare against them in fifteen minutes. This is what turns a passive build into an active one.

### 3. Build (scoped slice — often under an hour; teach while it runs)
Kick off `/run-plan`. Now use the window: run the **cadence conversation** below, revisit anything from the opener that didn't land, or take the "why this order" questions. **Do not narrate the scroll.** Every tool in the kit supports more than one session at once, so you can leave the build running in one terminal and keep teaching — or even kick off a second track in parallel and compare them later.

#### Cadence conversation (~12–18 min total — teach while the build runs)

Two beats in order. Neither is a build step; both set honest expectations for the week.

**Beat A — Backlog, SaaS, and what reopened (~5–7 min)**

Brief history, just enough to land why **bracket the work** matters for SMBs:

1. **Before SaaS:** custom software was slow and expensive. Small teams couldn't hire a bench. Everything became a **backlog** — and choosing what *not* to build was tedious, political, often depressing.
2. **The SaaS bargain:** subscribe instead of build. For many SMBs, **real development shrank to ERP/CRM and integrations**. The backlog didn't vanish — it went underground (spreadsheets, workarounds, "that's not in the product").
3. **What reopened:** for **well-scoped slices**, build cost collapsed again. The old question was *"can we afford to put this on the backlog?"* The new question is *"can we define and prove this slice before lunch?"* Same anxiety — different bottleneck. **Bracket the work**; repeat for a full application.

**Beat B — The new trade-off: nothing comes free (~7–10 min)**

**Scope:** Name the trade-off honestly and list the three guardrails in one sentence each. **Do not** teach guardrails in depth here — that is the next major thread (standards in the repo, quality gates, decision boundaries, `/monitor` → `/harden`, kit 04–05). This beat is the **plant**; skeptical rooms need to hear you will not pretend build speed is free.

Land this explicitly — skeptical rooms will trust you for naming the cost:

> **Nothing comes without a trade-off.** We traded months of build latency for something else. Be clear about what.

**What got cheaper (the opening bracket · build · closing bracket — on a scoped slice):** harnesses and models move fast. What they can do from **intention through testing** keeps improving. That acceleration is real.

**What got harder (say *exhausting*, not just tiring):** **staying on top of the build side.** The terrain shifts weekly — new harness features, model behavior, tool patterns. That is the **scout's job** and, increasingly, **every builder's job**. Process change vs. product development is a fight you will feel.

**The guardrails — your closing bracket, and they do not shrink:**

1. **Standards** — code that follows your **tech stack**, **coding standards**, **company standards**, and **this project's** standards (not generic "best practices" the model remembered from training).
2. **Correctness** — it actually **does what it's supposed to do**, including edge cases and failure modes you cared enough to specify.
3. **Proof** — **build, lint, and a real test suite** — then verify and browser. On the **first effort** for a slice, that means the agent **creates** enough tests, not just runs a green placeholder:
   - **Unit tests** — logic and components in isolation
   - **API / HTTP tests** — routes and integrations (curl-style checks, supertest, or fetch against your API)
   - **End-to-end tests** — full user flows through the stack (Playwright in this course)
   - **Browser verification** — open the running app; `/test-browser` or in-app browser when you need eyes on layout and behavior

   The transcript is not the software. A green chat message is not a passing test.

That guardrail work is not a one-time setup. It is **constant pruning** — skills, rules, gates, passport lines, challenge passes — plus **periodic upheaval** when the harness or model generation jumps enough that last quarter's rails no longer fit (`/terrain-review`, watchlist, kit 08). Prune weekly; upheave when the terrain demands it.

**One line to leave on the board:**

> *Build got fast. Staying current is exhausting. Standards, correctness, and proof are the guardrails — prune constantly, upheave when you must.*

**Discussion hook:** "Which guardrail does your shop already have in writing — and which three are still only in someone's head?"

**Hand off:** "We bracket the work this afternoon. Next we go deep on **guardrails** — how standards, gates, and skills live in the repo so pruning and upheaval are manageable, not heroic."

See also [D00-7 — The new trade-off (plant only)](../../marketing/lesson-plans/discussion-topics.md#d00-7--the-new-trade-off-plant-only-710-min) in the discussion track.

### 4. Reflect (the bulk of the time)
This is the actual lesson. Work through, in order:

- **Prediction vs. reality.** Walk the board. What did the agent do that you predicted? What surprised you? Where did it cut exactly the corner you called?
- **The challenge pass, on real output.** Open the app the agent built. Does it meet each Demo-grade minimum? Be specific — make them point at the screen.
- **Verify it runs — closing bracket in order.** From repo root: **`npm run build`** → **lint** (if configured) → **`npm run test`** (all suites green). On the **first effort**, steer the agent until the slice has **unit**, **API/HTTP**, and **end-to-end** coverage — not a single "page loads" test. Then **verify** against the intention (challenge pass on demo-grade minimums). Then **browser**: open the app, or `/test-browser` when you want agent-driven visual QA. Teach the non-negotiable: *the transcript is not the software.* This plants the verification habit that runs through Days 1–2 and sets up Phase 02 guardrails.
- **"How do we know it's good?"** Push past "it looks fine." Good = build + lint + tests green, meets the contract, handles empty and error cases, and a test actually exercises the core loop — then you looked at it in the browser.
- **"What would we change in the intention?"** Bring it full circle. The fix for a disappointing build is almost always upstream — a sharper intention or PRD, not a better prompt at build time.

If time allows, build a second track and contrast: same pipeline, different agent, different result. That contrast teaches that the *pipeline* is the constant.

---

## Discussion prompts (keep these in your back pocket)

- "The model sounded completely certain. Was it right? What does that tell you about trusting confident output?"
- "If two of you ran the same intention, would you get the same app? Why not — and is that a bug or a feature?"
- "Where in this pipeline is the *human* the bottleneck — and is that a bad thing?"
- "What could go wrong if you shipped this straight to a customer this afternoon?" (Seeds Day 2: security, quality gates, review discipline.)
- "What's the **fourth cool thing** you've heard about AI tools this month — and what would it *cost* your team to switch before the last change stuck?"

## Likely questions (and the honest answer)

- **"Why Turbo and not Nx or Bazel?"** — Turbo is a **focused task runner with caching** on npm workspaces—simple to scaffold, easy to feel the speed win. Nx is a broader platform (plugins, distributed CI); Bazel is for enormous polyglot repos. For this JS/TS curriculum, Turbo is the sweet spot: capable without becoming the lesson.
- **"Won't a monorepo force us to deploy everything together?"** — No. One repository is **source control and shared libraries**. Each app in `apps/` still has its own build, Dockerfile, or web service. Google runs Search, Gmail, and Chrome from one repo and ships them independently.
- **"Can't I just skip the intention/PRD and tell it to build the app?"** — You can, and for a toy it's fine. The pipeline exists because it makes the result *reviewable and repeatable* — you can point at where a wrong result came from. Prompting-from-the-hip can't.
- **"Which tool is best — Cursor, Claude Code, Codex?"** — For this workflow, it barely matters; they're harnesses over similar engines. Use what you have a subscription for. We'll compare workflows on Day 5.
- **"It got this slice right in under an hour — why do I need five days?"** — Because getting a *well-scoped demo* right in under an hour is easy, and getting something *trustworthy, verified, and safe on your real codebase* is the actual job. Bigger scope takes longer; the pipeline and verification discipline scale with it. That gap is the course.
- **"Won't this be outdated in three months?"** — Parts will. That's why you're learning from a **scout**, not a scaled curriculum vendor. The **pipeline** (intention → verify) outlasts any single tool; the repo is updated when the terrain moves.
- **"So everything is under an hour now?"** — No. **Well-scoped slices** often are — that's what this course deliberately sizes for. A real ERP migration, a regulated system, or a product with years of legacy still takes as long as it takes. The acceleration is real; **scoping** is part of the skill. Phase 01's SaaS build is ~two hours, not twenty minutes, for a reason.
- **"Should we switch to whatever just launched?"** — Maybe — after you price the change. A scout reports; **you** decide against what you already run and what it costs to migrate. The fourth cool thing this week is not a strategy.

## Failure modes to welcome as teaching moments

Don't hide these — engineer the session so they surface, then teach from them:

- The agent produces **fake-looking seed data** or a **missing empty state** → that's your Demo-grade-bar lesson, live.
- A **test passes but the feature is broken** (or vice versa) → the transcript-isn't-software lesson.
- The **plan drifted from the intention** → the challenge-pass lesson, with a real example instead of a hypothetical.

---

## What they must leave Phase 00 believing

1. The pipeline — **intention → PRD → plan → build** — is the repeatable spine, not bureaucracy.
2. **Context is the game**; the model is a fast, confident, unreliable engine.
3. **Verify the running software, never the transcript** — closing bracket: **build → lint → test → verify → browser**.
4. Their job all week is to **steer and judge**, and the leverage is upstream — in the intention — not in clever prompting at build time.
5. A **monorepo is a starter asset** for accelerated multi-app development: shared `packages/`, separate deployable `apps/`, one repo — not a checklist exercise.
6. They're learning from an **AI scout** (field notes, nimble) — not a frozen enterprise playbook — and they're becoming **soledevelopreneurs**: steer and verify on their own, with agents.
7. **Scout excitement needs tempering** — new tools are cheap to *discover* and expensive to *adopt*; the win is knowing what to keep, not chasing every cool thing this week.
8. The monorepo is an **operating system** — documents + skills at corporate, group, and project scope; **organizational engagement** (leadership + dev-group source of truth) is separate from **agent boundaries** on a single task.
9. **The new trade-off** — build acceleration is real on scoped slices, but **staying current on harnesses and models is exhausting**, not merely tiring. The guardrails are standards (stack, company, project), correctness, and proof through testing — **constant pruning** plus **periodic upheaval** when the terrain shifts.

*Replicate this structure for Phases 01–06: core reality + timing → opener/new concepts → pause-and-teach anchors on the real build steps → predict/reflect → discussion, questions, failure modes → what they must leave believing.*
