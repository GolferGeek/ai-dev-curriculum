# Phase 03 — Research: understanding any codebase

**Prereqs:** Phase 02 complete (at least one app scanned and hardened with clean gates).

You've built apps. You've learned to keep them healthy — scanning for errors, fixing architecture violations, shipping through quality gates. But here's the thing: most of the code you'll work with in your career wasn't written by you. A new job. A legacy project. An open-source repo you want to contribute to. A teammate's code you're reviewing.

Phase 03 teaches you to **read and understand any codebase using AI agents**. The same agents that built and maintained your training repo can now help you make sense of code you've never seen before.

And here's the fun part: at the end of this phase, you'll learn to **create your own agents and commands**. The tools you've been using? They're just markdown files. You can make new ones.

---

## The toolkit: commands, skills, and agents

Open `.claude/skills/` — you'll see some new additions alongside the familiar ones from phases 01 and 02.

### Commands — what you type

Phase 03 gives you **seven new commands**, organized in three groups.

**Orient — understand what you're looking at**

| Command | What it does | What it produces |
|---------|-------------|------------------|
| **`/ingest`** | Gets the big picture — what is this codebase, what does it do, how is it organized. | `docs/artifacts/ingest-report.md` |
| **`/map`** | Traces how data flows through the system — where it enters, where it's stored, where it goes out. | `docs/artifacts/map-report.md` |

**Analyze — find what matters**

| Command | What it does | What it produces |
|---------|-------------|------------------|
| **`/security-scan`** | Looks for vulnerabilities — auth gaps, exposed secrets, injection risks, permission problems. | `docs/artifacts/security-report.md` |
| **`/git-story`** | Reads the history — who changed what, which files change most, where the risk lives. | `docs/artifacts/git-story-report.md` |
| **`/improve`** | Finds opportunities — dead code, missing tests, performance issues, tech debt. | `docs/artifacts/improve-report.md` |
| **`/deep-dive [area]`** | Goes deep on one area — frontend, backend, data layer, or a specific directory. | `docs/artifacts/deep-dive-report.md` |

**Create — build your own tools**

| Command | What it does | What it produces |
|---------|-------------|------------------|
| **`/author-agent`** | Helps you create your own custom commands and skills from patterns you've observed. | New files in `.claude/skills/` |

Think of it as a progression: **orient** (what is this?) → **analyze** (what matters?) → **create** (what tools do I need?).

> Each command produces a report in `docs/artifacts/`. You can read the reports, share them with your team, or use them as input to the next command.

### Skills — what the AI knows

Two new background skills power the research commands:

| Skill | What it does |
|-------|-------------|
| **research-patterns** | Teaches the AI how to approach codebase analysis — read before grep, follow the data, triangulate findings, cite evidence. Every research agent loads this. |
| **day2-prep** | Safety and access guidelines for when you're ready to point these tools at production code. Covers what you need, what to be careful about, and how to stay safe. |

These work like the architecture skills from Phase 02 — you don't type their names, the agents load them automatically.

### Agents — who does the work

| Agent | What it does | Which commands use it |
|-------|-------------|----------------------|
| **repo-researcher** | The generalist — orients in any codebase, maps structure, finds patterns and improvements. | `/ingest`, `/map`, `/improve`, `/deep-dive` |
| **security-researcher** | The security specialist — finds vulnerabilities, auth gaps, and data exposure risks. | `/security-scan` |
| **git-historian** | The historian — reads git log, blame, and diff to reveal the codebase's story over time. | `/git-story` |
| **agent-author** | The toolmaker — helps you create your own agents, skills, and commands. | `/author-agent` |

---

## Let's do it — step by step

Here's where it gets interesting. You're going to run these commands on **your training repo** — the one you built in phases 00-02. You already know this codebase. That's the point. By researching code you already understand, you can verify the agents' findings and build confidence before pointing them at unfamiliar code.

### Step 1: Get oriented

```
/ingest
```

This is always the first thing you do with any codebase. The agent reads the directory tree, READMEs, config files, and entry points, then writes a one-page orientation: what is this project, what's the tech stack, how is it organized, what are the apps and packages.

Open `docs/artifacts/ingest-report.md` and read it. Since you built this repo, you can verify: did the agent get it right? Did it miss anything? This is how you calibrate trust.

### Step 2: Map the data flow

```
/map
```

Now we go deeper. The agent traces every path data takes through your system — HTTP routes, form handlers, database writes, API responses. It maps where authentication is enforced and where it's missing.

Open `docs/artifacts/map-report.md`. You'll see a map of entry points, exit points, and auth boundaries. If you built the QuickBooks killer, you'll see the flow: signup form → server action → SurrealDB → dashboard page. The map makes implicit knowledge explicit.

### Step 3: Check security

```
/security-scan
```

The security researcher looks at your code through a paranoid lens: are there exposed secrets? Routes without auth? Unsanitized user input going into queries? Permission gaps?

Don't be surprised if it finds things even in well-built code. The training repo was built with architecture skills that enforce good patterns, but no codebase is perfect. If the scan comes back clean — that's a success! It means Phase 02's quality tools are working.

> **Tip:** Try deliberately introducing a vulnerability (like removing an auth check from a route) and run `/security-scan` again to see it caught.

### Step 4: Read the history

```
/git-story
```

Every codebase tells a story through its git history. The git historian analyzes: when was this built? Who contributed? Which files change the most (those are your hotspots — high change = high risk)? Are there files that always change together (hidden coupling)?

This command is especially powerful on repos with long histories. Your training repo might have a short history, but it still reveals patterns — the commit message style, the branch naming, the phases of work.

### Step 5: Find improvements

```
/improve
```

Now the agent looks for opportunities: dead code nobody uses, files with business logic but no tests, TODO comments that never got done, duplicated patterns that could be shared, performance issues like N+1 queries.

This is where research meets action. The improvement report tells you what's worth fixing and roughly how impactful each fix would be.

### Step 6: Go deep

```
/deep-dive frontend
```

Pick an area and go deep. The agent acts as a specialist — looking at everything through the lens of that area while still understanding the full codebase.

Try different focuses:

```
/deep-dive frontend             # React/SwiftUI components, routing, state
/deep-dive backend              # API routes, middleware, auth flow
/deep-dive data                 # Schema, queries, access control
/deep-dive apps/quickbooks-killer  # Everything about one specific app
```

This is the command you'll use most on unfamiliar codebases. "I need to understand the auth system" → `/deep-dive backend`. "I need to review the data model" → `/deep-dive data`.

### Step 7: Build your own tools

```
/author-agent
```

This is the capstone. Everything you've been using — `/ingest`, `/scan-errors`, `/commit` — they're all just markdown files in `.claude/skills/`. Now you get to make your own.

The agent author walks you through it:
- "What pattern did you notice that you want to automate?"
- "Should this be a command you type, or background knowledge?"
- "What should the output look like?"

It generates a new SKILL.md file following the exact patterns in this repo. You test it. You refine it. You own it.

> **This is the most important step.** Creating your own tools is what separates someone who uses AI from someone who builds with AI.

---

## Day 2 — your codebase, your tools

Everything you just used on the training repo works on **any** repo. The commands are generic. The agents read whatever code they find. Day 2 is when you point them at the code that matters to your job.

Here's the short version:
1. Clone your production repo
2. Create a research branch (`git checkout -b research/analysis`)
3. Copy `.claude/` from the training repo to your repo
4. Run `/ingest` → `/map` → `/security-scan` → and so on
5. Use `/author-agent` to create custom tools specific to your codebase

The `day2-prep` skill has the full access checklist, safety guidelines, and scope rules. Your instructor will walk through this live.

If you can't use your own production code (security policy, NDA, etc.), that's fine — you can use the Orchestrator AI repo as a practice target. It's a well-organized, enterprise-shaped codebase that works great for learning.

---

## Quick reference

- **Step-by-step checklist:** [RUN-ORDER.md](./RUN-ORDER.md)
- **Research skills:** `.claude/skills/research-patterns/`, `.claude/skills/day2-prep/`
- **Research agents:** `.claude/agents/repo-researcher.md`, `security-researcher.md`, `git-historian.md`, `agent-author.md`
- **Reports produced:** `docs/artifacts/ingest-report.md`, `map-report.md`, `security-report.md`, `git-story-report.md`, `improve-report.md`, `deep-dive-report.md`

---

## Why this matters

- **Phase 00** taught you the pipeline: intention → PRD → plan → build
- **Phase 01** taught you to build real apps with auth and databases
- **Phase 02** taught you to keep them healthy — scanning, fixing, hardening, shipping
- **Phase 03** teaches you to **understand code you didn't write** — and to create your own tools for code you'll maintain

These are the skills that make you effective on Day 1 of a new job, Day 1 of a new project, or Day 1 of any codebase you've never seen before. The agents do the heavy lifting. The skills carry the knowledge. The commands give you control. And now you can build new ones yourself.
