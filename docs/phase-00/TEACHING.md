# Phase 00 — Instructor Teaching Guide

*This is the **instructor-facing** companion to Phase 00. It is not a checklist of what to type — that's [RUN-ORDER.md](./RUN-ORDER.md). It's not the learner cheat sheet either — that's [TALKING-POINTS.md](./TALKING-POINTS.md). This document is **what you teach, in what order, and where you stop the build to explain it.** It assumes you know the material and need a script for delivering it live.*

---

## The core reality of this course

**The agent builds the app in less than an hour — often around twenty minutes for a slice this size. The build is not the lesson.** If you spend the session watching progress scroll by, you have wasted the room.

> **The one idea this whole course exists to deliver:** the work now *barbells*. Building used to be the expensive middle; it has collapsed to less than an hour. So effort moves to the two ends — **getting the intention right** (front) and **validating that the result is actually correct and safe** (back). Every lab is engineered to make people *feel* that shift: a little time defining, a blink of building, and most of the clock spent judging.
>
> **But the build time is just the enabler — the real headline is that the whole iteration loop collapses.** A month of software work was never a month of typing; it was *latency*: requirements meetings → prototype → review meeting → change requests → wait for the next sprint → repeat, with days or weeks of coordination baked into every turn. Collapse the build and you can collapse the loop. Put the stakeholder, a couple of developers, and a tester in **one room**: define it, build it, the stakeholder steps out and comes back an hour later — "no, not that, more like this" — and you iterate again before lunch. **A month of meetings and hand-offs becomes a morning.** When a client internalizes that, they stop treating software as a scarce, months-long asset and start treating "define it well and verify it hard, together, fast" as the real skill. That is what they are paying for.

The value is in what wraps around the build:

1. **Teach** the concepts for the phase, at altitude — enough to steer, never enough to implement by hand.
2. **Review the intention together.** It's already written, so the exercise is *critique*, not authoring: "Does this say what we actually want? What's missing? What would you add?"
3. **Predict.** Before anyone hits build, have the room say out loud what the agent will produce — screens, data, where it will cut corners.
4. **Build** (often ~20 min, up to an hour). Nobody watches the bar. This window *is* your concept talk (the "State of the AI Union," below). You teach while it runs — and because every one of these tools supports **more than one session at a time**, a build can be generating in one terminal while the class keeps moving in another.
5. **Reflect** — the bulk of the clock. Prediction vs. reality. The challenge pass. Verify it in the browser. "Where did it drift? How do we *know* it's good? What would we change?"

The predict-then-compare move is the engine of this course. It manufactures the discussion instead of hoping it shows up.

### Rough timing (Phase 00 shares Day 1 with Phase 01)

| Block | ~Time | What's happening |
|---|---|---|
| **Setup + State of the AI Union** | 90 min | Install the agent, sign in, clone, poke around — while you deliver the opener talk. Downloads run in the background. |
| **Part A — the monorepo** | 45 min | Pipeline concepts + one build. Short, because the *pipeline* is the lesson, not the monorepo. |
| **Part B — first app** | 90 min | Review intention → predict → sub-hour build → reflect + verify. This is the heart of Phase 00. |
| **Debrief → hand to Phase 01** | 15 min | "What surprised you?" and set up the afternoon. |

If the room is fast, they build a *second* Part B track and you compare the two. Slack lives here.

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

Part A is short on purpose. Nobody is here to learn Turborepo; they're here to learn the **pipeline** they'll run in every phase for the rest of their careers.

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

### 3. Build (well under an hour — teach while it runs)
Kick off `/run-plan`. Now use the window: revisit anything from the opener that didn't land, or take the "why this order" questions. **Do not narrate the scroll.** Every tool in the kit supports more than one session at once, so you can leave the build running in one terminal and keep teaching — or even kick off a second track in parallel and compare them later.

### 4. Reflect (the bulk of the time)
This is the actual lesson. Work through, in order:

- **Prediction vs. reality.** Walk the board. What did the agent do that you predicted? What surprised you? Where did it cut exactly the corner you called?
- **The challenge pass, on real output.** Open the app the agent built. Does it meet each Demo-grade minimum? Be specific — make them point at the screen.
- **Verify it runs** (`npm run build`, `npm run test`, then open it). Teach the course's non-negotiable: *the transcript is not the software.* A green chat message is not a passing test. This plants the verification habit (in-app browser, Playwright, computer use) that runs through Days 1–2, and sets up Day 2's quality work.
- **"How do we know it's good?"** Push past "it looks fine." Good = meets the contract, handles the empty and error cases, and a test actually exercises the interaction.
- **"What would we change in the intention?"** Bring it full circle. The fix for a disappointing build is almost always upstream — a sharper intention or PRD, not a better prompt at build time.

If time allows, build a second track and contrast: same pipeline, different agent, different result. That contrast teaches that the *pipeline* is the constant.

---

## Discussion prompts (keep these in your back pocket)

- "The model sounded completely certain. Was it right? What does that tell you about trusting confident output?"
- "If two of you ran the same intention, would you get the same app? Why not — and is that a bug or a feature?"
- "Where in this pipeline is the *human* the bottleneck — and is that a bad thing?"
- "What could go wrong if you shipped this straight to a customer this afternoon?" (Seeds Day 2: security, quality gates, review discipline.)

## Likely questions (and the honest answer)

- **"Can't I just skip the intention/PRD and tell it to build the app?"** — You can, and for a toy it's fine. The pipeline exists because it makes the result *reviewable and repeatable* — you can point at where a wrong result came from. Prompting-from-the-hip can't.
- **"Which tool is best — Cursor, Claude Code, Codex?"** — For this workflow, it barely matters; they're harnesses over similar engines. Use what you have a subscription for. We'll compare workflows on Day 5.
- **"It got it right in under an hour — why do I need five days?"** — Because getting a *demo* right in under an hour is easy, and getting something *trustworthy, verified, and safe on your real codebase* is the actual job. That gap is the course.

## Failure modes to welcome as teaching moments

Don't hide these — engineer the session so they surface, then teach from them:

- The agent produces **fake-looking seed data** or a **missing empty state** → that's your Demo-grade-bar lesson, live.
- A **test passes but the feature is broken** (or vice versa) → the transcript-isn't-software lesson.
- The **plan drifted from the intention** → the challenge-pass lesson, with a real example instead of a hypothetical.

---

## What they must leave Phase 00 believing

1. The pipeline — **intention → PRD → plan → build** — is the repeatable spine, not bureaucracy.
2. **Context is the game**; the model is a fast, confident, unreliable engine.
3. **Verify the running software, never the transcript.**
4. Their job all week is to **steer and judge**, and the leverage is upstream — in the intention — not in clever prompting at build time.

*Replicate this structure for Phases 01–06: core reality + timing → opener/new concepts → pause-and-teach anchors on the real build steps → predict/reflect → discussion, questions, failure modes → what they must leave believing.*
