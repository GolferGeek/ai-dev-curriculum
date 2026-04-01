# Phase 00 — Your first AI-powered build

Welcome! In this session you're going to build real, working software using **AI agents** — not by writing every line yourself, but by learning to **direct** the AI with the right instructions. By the end, you'll have a monorepo with a working app that you built by having a conversation.

Before we start building, let's understand the three tools in your toolkit.

---

## The toolkit: commands, skills, and agents

Open the `.claude/` folder in this repo. Everything the AI needs to help you is in there, organized into three categories. Here's what each one is and why it matters.

### Commands — what you type

Commands are **slash commands** you run in Claude Code. They're your steering wheel. Each one kicks off a specific step in the process.

| Command | What it does | When you use it |
|---------|-------------|-----------------|
| **`/intention`** | Captures *why* you're building something, *who* it's for, and what *good* looks like. | First — before anything else. Every project starts with an intention. |
| **`/prd`** | Turns your intention into a **Product Requirements Doc** — specific goals, non-goals, and success criteria. | After your intention is solid. |
| **`/plan`** | Creates a step-by-step **implementation plan** from your PRD — what gets built, in what order, and how we'll know it worked. | After your PRD is reviewed. |
| **`/run-plan`** | Hands the plan to a specialized **agent** that actually builds the code. | When your plan is ready and reviewed. |

Think of it as a pipeline: **intention** (why) → **PRD** (what) → **plan** (how) → **run-plan** (build it).

> You'll use this same pipeline in every phase of this curriculum. Master it once, use it forever.

### Skills — what the AI knows

Skills are **background knowledge** the AI applies automatically — you don't invoke them directly. They're like having an experienced colleague looking over your shoulder.

| Skill | What it does |
|-------|-------------|
| **monorepo-turbo** | Keeps the project structure clean — makes sure apps go in `apps/`, shared code goes in `packages/`, and Turborepo conventions are followed. |
| **prd-alignment** | Checks that your PRD actually matches your intention, and that your plan actually matches your PRD. Catches drift before you build the wrong thing. |

You won't type these names anywhere. The AI reads them and applies them when relevant — like guardrails on a highway.

### Agents — who does the work

Agents are **specialized builders**. When you run `/run-plan`, the system picks the right agent for the job. Each agent knows how to build one specific thing really well.

| Agent | What it builds |
|-------|---------------|
| **monorepo-builder** | The project structure (Turborepo, `apps/`, `packages/`, config files). Think of it as the contractor who builds the house before furniture goes in. |
| **app-builder-http-workspace** | Track A — a mini Postman (API collections, send requests, environments, history). |
| **app-builder-team-wiki** | Track B — a team wiki (pages, markdown editor, search, persistence). |
| **app-builder-pipeline-crm** | Track C — a pipeline CRM (kanban board, deal records, notes, filters). |
| **app-builder-ops-pulse** | Track D — an ops dashboard (health checks, refresh, incident log). |

You don't call agents directly — `/run-plan` does it for you based on what you're building.

---

## What we're building

This phase has two parts, and you'll use the same command pipeline for both.

### Part A — The monorepo (the house)

Before you can build an app, you need a place for it to live. We're going to set up a **Turborepo monorepo** — a project structure where multiple apps and shared code live together in one repo.

You don't need to know the details of Turborepo. The **monorepo-builder** agent handles that. Your job is to understand the *intention* (why we want a monorepo) and guide the AI through the pipeline.

**What you'll do:**

1. **Read the intention** — Open [intention-monorepo.md](./intention-monorepo.md). This explains *why* we're setting up the monorepo and what "done" looks like. It's already written for you — your first intention is a freebie.

2. **Review the intention** — Run the command below. This reads the provided intention and walks you through it. You'll refine it in your own words. The output goes to `docs/artifacts/intention.md`.

   ```
   /intention docs/phase-00/intention-monorepo.md
   ```

3. **Build the PRD** — Give the refined intention to `/prd`. It produces a PRD with goals, non-goals, and success criteria. Read it. Does every requirement trace back to the intention? If something looks off, say so.

   ```
   /prd docs/artifacts/intention.md
   ```

   Output: `docs/artifacts/prd.md`

4. **Build the plan** — Give the PRD to `/plan`. It creates the build plan with milestones and agent assignments. Check it: does it cover everything in the PRD?

   ```
   /plan docs/artifacts/prd.md
   ```

   Output: `docs/artifacts/plan.md`

5. **Challenge pass** — Before building, ask yourself: "Does the PRD match the intention? Does the plan match the PRD?" This is the habit that separates good AI-assisted development from chaotic prompting. Have Claude check too — it will flag mismatches.

6. **Build it** — Give the plan to `/run-plan`. The **monorepo-builder** agent takes over and creates the project structure. When it's done, you'll have `apps/`, `packages/`, `turbo.json`, and working root scripts.

   ```
   /run-plan docs/artifacts/plan.md
   ```

7. **Verify** — Run `./scripts/verify-curriculum-structure.sh` from the repo root. Green means you're good.

---

### Part B — Your first app (pick one)

Now the house is built. Time to move in some furniture. Pick **one** of these four app tracks — each one is a real, working tool, not a toy.

| Track | Intention file | What you're building |
|-------|---------------|---------------------|
| **A** | [intention-http-workspace.md](./intention-http-workspace.md) | A mini Postman — collections of API requests, environments, send + response, history |
| **B** | [intention-team-wiki.md](./intention-team-wiki.md) | A team wiki — pages with markdown editing, search, and persistence |
| **C** | [intention-pipeline-crm.md](./intention-pipeline-crm.md) | A pipeline CRM — kanban board with deals, details, notes, and filters |
| **D** | [intention-ops-pulse.md](./intention-ops-pulse.md) | An ops dashboard — health checks, auto-refresh, incident log, failure alerts |

**Pick the one that sounds most interesting to you.** They're all about the same difficulty, and they all follow the same pipeline. The only difference is which agent does the building.

**What you'll do** (example below uses Track A — substitute your track's intention file):

1. **Read the intention** — Open the `intention-*.md` for your track. Pay special attention to the **Demo-grade minimums** section — that's the contract for what "done" means. These apps need to feel like real tools, not homework assignments (see [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) for details).

2. **Review the intention** — Pass your track's intention file to `/intention`:

   ```
   /intention docs/phase-00/intention-http-workspace.md
   ```

   Output: `docs/artifacts/intention.md` (refined version ready for PRD)

3. **Build the PRD** — Pass the refined intention to `/prd`. Each Demo-grade minimum should become a specific, testable requirement.

   ```
   /prd docs/artifacts/intention.md
   ```

   Output: `docs/artifacts/prd.md`

4. **Build the plan** — Pass the PRD to `/plan`. It should name specific screens, data shapes, and test strategies.

   ```
   /plan docs/artifacts/prd.md
   ```

   Output: `docs/artifacts/plan.md`

5. **Challenge pass** — Does the PRD cover every intention item? Does the plan deliver every PRD goal? Fix gaps before building.

6. **Build it** — Pass the plan to `/run-plan`. The track-specific agent builds your app inside `apps/`. This is where the magic happens — watch an agent turn a plan into a working application.

   ```
   /run-plan docs/artifacts/plan.md
   ```

7. **Test it** — Run `npm run build` and `npm run test` from the repo root (Turborepo runs them for all apps). Your app should build clean and pass its Playwright tests.

> **Note:** You're not writing the intention from scratch in Part B — it's provided. Your job is to understand it, turn it into a solid PRD and plan, and then let the agent build. In later phases, *you'll* write the intentions.

---

## Quick reference

- **Prerequisites:** [PREREQUISITES.md](./PREREQUISITES.md) — what you need installed before starting
- **Step-by-step checklist:** [RUN-ORDER.md](./RUN-ORDER.md) — if you prefer a linear checklist over this narrative
- **Command details:** [COMMANDS.md](./COMMANDS.md) — deeper look at the command pipeline
- **Quality bar:** [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) — what "done" looks like
- **Full toolkit map:** [STARTER-KIT.md](./STARTER-KIT.md) — everything in `.claude/` explained
- **Verification:** [VERIFY.md](./VERIFY.md) — how to check your work

---

## Why this order

You might wonder: why not just start building the app?

- **Structure first:** One monorepo, one set of conventions. Every app you build from now on lands in a known place with shared tooling. No "where does this go?" confusion later.
- **Pipeline practice:** You used the same four commands (`/intention` → `/prd` → `/plan` → `/run-plan`) for both the monorepo *and* the app. That repetition is the point — you're building a muscle you'll use in every phase.
- **Intentions are given:** In this phase, the intentions are provided so you can focus on **learning the pipeline**, not brainstorming from a blank page. Starting in phase 01, you'll define your own.

---

## What's next

In **[Phase 01](../phase-01/README.md)**, you'll pick a SaaS product to build a "killer" for — something like QuickBooks, Trello, Twitter, or Facebook. You'll use new agents with deeper expertise (databases, authentication, mobile development) and the same pipeline you just learned. The training wheels come off: you'll write your own intentions and make real product decisions.

But first — finish this phase. Build the monorepo. Build your app. See it work. That's the foundation everything else builds on.
