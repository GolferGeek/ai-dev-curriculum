# Phase 05 — Skills Browser: discover and explore the skill ecosystem

**Prereqs:** Phase 04 complete (comfortable with the full pipeline and protocol demo).

You've built apps, hardened them, researched codebases, built a multi-agent protocol demo — and along the way, you've been using **skills** without thinking too much about them. Those markdown files in `.claude/skills/` that taught the agents how to build correctly? There are thousands more out there. And they work across 44+ AI tools, not just Claude Code.

Phase 05 is a fun one. You're going to build a **Skills Browser** — an app that pulls in skills from across the ecosystem, categorizes them, and lets anyone browse, search, and copy them into their own projects.

---

## What you need to know first

### The 5 levels of skills

Not all skills are created equal. The AI Daily Brief Skills Master Class defines five levels of skill maturity:

| Level | Name | What it means | Example |
|-------|------|--------------|---------|
| 1 | **Apprentice** | Simple, single-purpose, one SKILL.md | A linting rule or naming convention |
| 2 | **Builder** | Well-structured with gotchas, output templates | Our `web-architecture` skill |
| 3 | **Arsenal** | Ready-to-use starter kit, customizable | research-with-confidence, devil's-advocate |
| 4 | **Strategist** | Chains, dispatches, loops — skills that orchestrate other skills | Our `/commit` (chains scan→monitor→PR check) |
| 5 | **Architect** | Organizational libraries, version-controlled, team-wide | Our entire `.claude/skills/` directory |

Your browser will classify every skill by its level so users can find what matches their experience.

### Capability vs Preference

There are two kinds of skills:
- **Capability** — adds a new function Claude doesn't have (like generating PDFs or working with spreadsheets). These may become obsolete as models improve.
- **Preference** — encodes YOUR workflow, YOUR standards, YOUR way of doing things. These get more valuable over time. Our architecture skills are preferences.

Your browser will tag each skill so users know what they're getting.

### Where skills live (the sources)

| Source | Scale | Quality | What's in it |
|--------|-------|---------|-------------|
| **VoltAgent/awesome-agent-skills** | 1,060+ | High — from real vendor teams | Official skills from Anthropic, Google, Vercel, Stripe, Cloudflare, Supabase, and 20+ more |
| **anthropics/skills** | 17 | Official | Skill-creator, document skills (PDF, DOCX, PPTX, XLSX), design, MCP builder |
| **awesome-claude-code** | Curated | High — 36k+ stars | Community ecosystem catalog with CSV export |
| **skills.pawgrammer.com** | 280+ | Community | Browseable by category with verification badges |
| **This curriculum** | 38 | Battle-tested | Everything you've been using in phases 00-04 |

All of these are free and open source.

---

## What you're building

A **Skills Browser** app (`apps/skills-browser/`) — a Next.js app that:

- **Fetches** skills from multiple GitHub repos and community sources
- **Catalogs** them with metadata: level (1-5), category, source, capability vs preference, coolness rating
- **Displays** them in a browseable card grid with filters and search
- **Previews** the full SKILL.md content rendered as markdown, plus any supporting files
- **Copies** skills to your clipboard so you can paste them into your own `.claude/skills/`

Think of it as **npm search, but for AI skills**.

---

## The toolkit

### Skills — what the AI knows

| Skill | What it teaches |
|-------|----------------|
| **skill-anatomy** | The 5 levels, SKILL.md structure, all frontmatter fields, progressive disclosure, capability vs preference, the 5 skill killers |
| **skill-sources** | Where to find skills — GitHub repos, marketplaces, the open standard. How to fetch and parse them. |
| **skill-catalog-design** | Data model, categorization rules, UI patterns for browsing and filtering |

### Agents — who does the work

| Agent | What it does |
|-------|-------------|
| **skill-catalog-builder** | Fetches skills from sources, parses SKILL.md, builds the JSON catalog |
| **skill-browser-builder** | Builds the Next.js browse/filter/search UI |

### Commands — what you type

Same pipeline as always:

```
/intention → /prd → /plan → /run-plan
```

---

## Let's do it

### Step 1: Review the intention

```
/intention docs/artifacts/intention-skills-browser.md
```

### Step 2: Generate the PRD

```
/prd docs/artifacts/intention-skills-browser.md
```

### Step 3: Create the plan

```
/plan docs/artifacts/prd-skills-browser.md
```

### Step 4: Build it

```
/run-plan docs/artifacts/plan-skills-browser.md
```

### Step 5: Browse your creation

Open the app and explore. How many skills did it find? Can you find the weirdest one? The most useful? Can you copy one and install it in your own project?

### Step 6: Quality check and ship

```
/scan-errors skills-browser
/commit pr
```

---

## The open standard

One more thing worth knowing: skills aren't locked to Claude Code. Anthropic published the **Agent Skills** format as an open standard at [agentskills.io](https://agentskills.io). It's been adopted by Microsoft (Copilot), OpenAI (Codex), Atlassian, Figma, Cursor, GitHub, and more. A skill you write today works across 44+ tools.

Your browser shows skills from all of them.

---

## Quick reference

- **Intention file:** `docs/artifacts/intention-skills-browser.md`
- **Skills:** `.claude/skills/skill-anatomy/`, `skill-sources/`, `skill-catalog-design/`
- **Agents:** `.claude/agents/skill-catalog-builder.md`, `skill-browser-builder.md`
- **Run order:** [RUN-ORDER.md](./RUN-ORDER.md)

---

## Why this matters

- **Phase 00** taught you the pipeline
- **Phase 01** taught you to build real apps
- **Phase 02** taught you to keep them healthy
- **Phase 03** taught you to understand any codebase
- **Phase 04** showed you where software is going with agent protocols
- **Phase 05** connects you to the **ecosystem** — thousands of skills created by teams at Google, Stripe, Anthropic, Cloudflare, and hundreds of individual developers. You're not building alone anymore.
