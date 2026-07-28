# Phase 00 — Lesson Plan

*This is the **content** you deliver — the framing lecture, the industry context, the intention walk-through, and the closing synthesis. It pairs with: [OVERVIEW.md](../../docs/phases/00/OVERVIEW.md) (one-page learner anchor — share at open), [TEACHING.md](../../docs/phases/00/TEACHING.md) (room mechanics), and [README.md](../../docs/phases/00/README.md)/[RUN-ORDER.md](../../docs/phases/00/RUN-ORDER.md) (exact steps to type). This document is what you **talk about**.*

**Session arc:** Intro lecture → Intention walk-through → Build (it runs) → Closing discussion. The build is short and mostly unattended; the intro and the closing discussion are where the hours go.

> **Instructor refresh:** anywhere this plan says *[refresh]*, pull a current article, post, or release note before the cohort. The AI-development space changes weekly; the *themes* below are stable, the *examples* should be current.

---

## 1. Intro — "The State of the AI Union" (the framing lecture)

This is the biggest talking block of the phase. Goal: give the room a correct, durable mental model before they touch anything, and make them care about the two or three ideas the whole course rests on.

### 1a. The technology we're going to be using

Name each piece, say what it is in a sentence, and say *why it's in the kit*:

- **The AI coding agent + its harness** — the model predicts text; the *harness* (Cursor, Claude Code, Codex, Claude Desktop) runs the loop, feeds it context, and executes tools. The harness is the product you actually drive. *(This is where you teach the LLM / prompt / context / tools / harness / skill / agent taxonomy — full script in TEACHING.md.)*
- **The pipeline: intention → PRD → plan → build** — the disciplined path from "what I want" to "working software," with a human challenge pass at each seam.
- **The monorepo + Turborepo** — one repo holding many apps and shared packages, built and cached together. Why it's here: every app the cohort builds lands in a known place with shared tooling, so nobody fights structure later.
- **React + Vite** — Phase 00's app stack: components that re-render on data change, wrapped in a fast dev server.
- **Playwright** — a robot browser that clicks through the app like a user and fails loudly when a flow breaks. Why it's here on Day 1: it plants the flag that *the transcript is not the software.*

> **Scope note — this is Phase 00's slice, not the whole course.** We keep Day 1 deliberately small (React + Vite, verified with Playwright) so the only genuinely new idea is the *pipeline*. Across the full course the toolkit is much broader: the **stack** grows into Next.js, SurrealDB, agent protocols, skills, and model tooling in later phases, and **verification uses three complementary approaches — in-app browsers, Playwright, and computer use** — not Playwright alone. Say this out loud so nobody leaves thinking the course is "just React and Playwright."

### 1b. The points we're trying to make

Three, in priority order:

1. **Bracket the work.** For **small, well-scoped efforts**, the build middle collapsed from months to often under an hour — not every project, only work scoped small enough to finish and verify in one sitting. **Define** and **prove** bracket the build: `( intention ) · build · ( verify )`. A full application is many iterations of that pattern. The brackets didn't get lighter; the gap between them did.
2. **The whole iteration loop collapses, not just the build — for scoped work.** A month of software was latency — meetings, prototypes, review cycles, hand-offs. Collapse the build on a **well-scoped slice** and a stakeholder + two devs + a tester can define, build, react, and iterate *in one room, in a morning* — not for every system they'll ever ship.
3. **The model is fast, confident, and often wrong.** Your job for five days is to steer and verify, never to trust. Context is the game; bad output is almost always bad context, not a bad model.

### 1c. Why those points are important

- For a **business**: it rewrites the economics of the backlog. Work that was "we'll never get to that" becomes a morning's effort — which means the constraint is no longer capacity, it's *knowing what to ask for and how to prove it's right.*
- For a **developer**: the job shifts from producing code to specifying and judging it. That's a promotion, not a threat — but only for people who build the verification muscle. The ones who just trust the output will ship confident, broken software.
- For the **course**: it explains why we spend Day 1 on a pipeline instead of "just building." The pipeline is the thing that makes speed *safe*.

### 1d. How this area is changing

Trace the arc so they see where they're standing:

- **Autocomplete → chat → agentic → intention/spec-driven.** We moved from "finish my line" to "hold a conversation" to "an agent that plans and executes multi-step work" to "describe the outcome and let the agent drive." Each step moved the human up the ladder of abstraction.
- **Harnesses are proliferating and converging.** Cursor, Claude Code, Codex, Claude Desktop — different dashboards over similar engines, which is exactly why this course is tool-agnostic. *[refresh: whichever harness shipped something notable this month.]*
- **Parallelism is arriving.** Every tool now runs more than one session at once — you can have several builds generating while you think. Work is starting to look like *managing a team of agents*, not typing at one. *[refresh]*
- **Verification is the new frontier.** As generation gets trivial, the industry's attention is shifting to evals, tests, and review — proving the output is right. That's the whole back half of this course. *[refresh]*

### 1e. What interesting people are saying about the direction

Use one or two of these live; don't lecture the whole list. **Pull a current quote or post for whichever you use** — paraphrase only, and cite it on screen:

- **Andrej Karpathy** — the "Software 2.0 / 3.0" framing (code written by models, steered in natural language) and his coining of "vibe coding" for building by conversation. Great for the "moving up the abstraction ladder" point — but pair it with the counter-caution below so nobody thinks vibe-coding-to-production is the lesson. *[refresh with the current post/talk.]*
- **Simon Willison** — a working practitioner who writes clearly about what agents and tools can and can't do, and is consistently loud that you must *verify* what they produce. Ideal for the "steer and verify, never trust" point. *[refresh.]*
- **Anthropic's own engineering writing** — on agents, skills, and "context engineering" (that results are governed by what's in the context window). Anchors the "context is the game" point and connects directly to the skills they're about to use. *[refresh.]*
- **The spec-driven / intention-driven development movement** — the growing view that the durable artifact is the *specification*, not the code, because the code is now cheap to regenerate. This *is* the pipeline they're about to run. *[refresh with a current example.]*
- **The skeptics** — pull one credible voice on the risks (security, over-trust, maintainability of AI-generated code). You want the room to trust you *because* you named the downside. *[refresh.]*

**Land the lecture on the course's thesis:** the tools will keep changing; the discipline — define well, build in a blink, verify hard, keep humans in charge — is what lasts. That's what they're actually here to learn.

---

## 2. The intention walk-through

Now make it concrete. Open the phase's provided intention ([intention-monorepo.md](../../docs/phases/00/intention-monorepo.md) for Part A, then the chosen track's `intention-*.md` for Part B).

### What this app is
Say plainly what they're going to have at the end: a working monorepo, plus one real tool (mini-Postman, team wiki, pipeline CRM, or ops dashboard) — a credible product slice, not a hello-world.

### How the intention sets the agents up to succeed
This is the teaching payload of the section. Walk the intention and point at *why it's written the way it is*:

- It states **why** the thing exists and **who** it's for — so the agent optimizes for the right outcome, not a generic one.
- It defines **Demo-grade minimums** — an explicit contract for "done," which is what stops the agent from stopping at a single starter screen.
- It scopes **data shapes, screens, and states** (including empty and error states) — so the agent doesn't guess and doesn't skip the unglamorous parts.

The lesson to say out loud: **a good intention is the leverage.** The reason these builds come out well isn't a magic model — it's that someone did the upstream thinking. This is the **opening bracket**, made visible.

### Why we don't rewrite the intentions
Be explicit with the room: **these intentions are already tuned, and they work — so we read and critique them, we don't modify them.** In Phase 00 the intention is a "freebie" so they can focus on learning the pipeline and the judgment; they'll author their own starting in Phase 01. The exercise here is *reading an intention well enough to predict what it will produce* — which sets up the build.

*(Hand off to the predict-then-compare mechanic in [TEACHING.md](../../docs/phases/00/TEACHING.md): before the build, have the room predict the screens, the data, and where it'll cut corners.)*

---

## 3. The build (it runs — keep teaching)

Kick off `/run-plan`. For a **well-scoped slice** like this, it often finishes in under an hour (~20 minutes is common). **Nobody watches the bar.** Because every tool in the kit runs more than one session at once, you can leave the build generating and keep teaching — or start a second track in parallel to contrast later. Use the window for leftover questions from the intro, and for Phase 00 talks in [discussion-topics.md](discussion-topics.md) (harness engineering, memory passport, shadow AI, seed model routing, SMB operating-model sketch). Steps to type: [RUN-ORDER.md](../../docs/phases/00/RUN-ORDER.md).

---

## 4. Closing discussion — "What did we learn this session?"

The synthesis block. Every phase ends here, and it's where the learning consolidates. Work these in order:

- **Prediction vs. reality.** Return to what the room predicted. What did the agent do that you called? Where did it cut exactly the corner you expected? What surprised you?
- **The challenge pass, on real output.** Open the app. Does it meet each Demo-grade minimum? Make them point at the screen, not vibe it.
- **Prove it runs** — closing bracket in order: **`npm run build`** → lint → **`npm run test`** (unit + API/HTTP where applicable + Playwright e2e on first effort) → verify against demo-grade minimums → open in browser / `/test-browser`. A green chat message is still not a passing test.
- **"Where was the leverage?"** Guide them to the answer: it was in the intention, not the prompt at build time. The fix for a weak build is upstream.
- **"What does this change about how your team would work?"** Connect back to the month→morning thesis — now that they've felt it once, ask them to name a real backlog item this would unstick.

### What they must leave Phase 00 believing
1. The pipeline — intention → PRD → plan → build — is the repeatable spine.
2. Context is the game; the model is a fast, confident, unreliable engine.
3. Verify the running software, never the transcript — **build → lint → test → verify → browser**.
4. The leverage is upstream, in defining the work well — that's the **opening bracket**.

---

*Template for Phases 01–06: keep these four sections (Intro lecture → Intention walk-through → Build → Closing discussion). Only Section 1 changes substantially per phase — swap in that phase's technology (1a), its specific points (1b), why they matter (1c), how that area is moving (1d), and who's worth quoting on it (1e). Sections 2–4 keep the same shape; the intention and the "what we learned" prompts change to fit the phase.*
