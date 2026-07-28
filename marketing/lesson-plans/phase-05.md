# Phase 05 — Lesson Plan

*The **content** you deliver for Phase 05. Room mechanics are shared with [Phase 00's TEACHING.md](../../docs/phases/00/TEACHING.md); exact steps are in [docs/phases/05/README.md](../../docs/phases/05/README.md) and [RUN-ORDER.md](../../docs/phases/05/RUN-ORDER.md). This is what you **talk about**.*

**Session arc:** Intro lecture → Corporate capability program → Intention
walk-through → Build and recurring scout → Evaluate candidates → Scope-policy
discussion → Closing. Phase 05 turns ecosystem discovery into a repeatable
scouting and governance practice for skills and specialized agents.

> **Instructor refresh:** skill counts, star counts, and “N tools adopt Skills” headlines go stale monthly. Prefer [agentskills.io](https://agentskills.io) and Anthropic's engineering post for load-bearing claims; re-count catalog sources before class. Citations at the bottom.

---

## 1. Intro — "The State of the AI Union: Skills"

They've been *consuming* skills all week (architecture rules, protocol specs, quality gates). This lecture reframes skills as **the portable unit of expertise** — and explains why an open format matters more than any single clever prompt.

### 1a. The technology we're going to be using

- **Agent Skills (open standard)** — a folder with a `SKILL.md` (YAML frontmatter + Markdown instructions), optionally `scripts/`, `references/`, `assets/`. Portable across tools that implement the spec.
- **Progressive disclosure** — agents load only `name` + `description` at startup; full body when triggered; linked files only when needed. That's how you keep a large library without blowing the context window.
- **Capability vs. preference** — *capability* skills add an ability (process PDFs, talk to a spreadsheet); *preference* skills encode *your* standards (commit style, architecture rules). Preferences compound; capabilities may get eaten by the model.
- **Maturity levels (1–5)** — Apprentice → Builder → Arsenal → Strategist → Architect (from the Skills Master Class framing used in the curriculum). Judging maturity *is* the review skill applied to other people's prompts.
- **Sources** — configured public and internal repositories, official examples,
  community catalogs, and this curriculum's canonical `ai/` library. Counts
  move; the build re-fetches exact revisions.
- **Skills and agents** — skills package reusable procedures; specialized
  agents package delegated roles, tools, and authority boundaries. They share
  governance but require different native projections.
- **What they build** — `apps/skills-browser/`: fetch → snapshot → parse and
  normalize → catalog diff → browse/filter/search/full preview/evaluate.
  Mental model: **a dependency catalog and review workbench for AI behavior.**

### 1b. The points we're trying to make

1. **Skills are how expertise travels.** A good skill is an onboarding guide for an agent — procedural knowledge version-controlled next to the code, not trapped in one person's chat history.
2. **Open format > proprietary prompt packs.** When Microsoft, OpenAI, Cursor, Copilot, Gemini CLI, and peers read the *same* `SKILL.md`, a skill you write once travels. That's the strategic bet — and it landed unusually fast.
3. **Discovery and judgment are the missing products.** Large, fast-changing
   ecosystems exist; most teams cannot search, preview, classify, or safely
   evaluate them. The browser teaches the review habit without turning
   discovery into installation.
4. **A locator is not an approval system.** Discovery may be automatic; evaluation, scope, publication, maintenance, and retirement follow corporate policy.
5. **Skills are behavioral dependencies.** Test triggers and collisions, pin reviewed revisions, preserve provenance, control authority, and measure outcomes.

### 1c. Why those points are important

- For a **business**: preference skills are institutional knowledge that doesn't walk out the door — architecture standards, review checklists, domain workflows — committed to the repo.
- For a **developer**: authoring skills is the promotion from “user of the toolkit” to “author of the toolkit” (Phase 03's `/author-agent` made concrete at ecosystem scale).
- For the **course**: this phase answers “are we locked into one vendor?” with
  a practical architecture: canonical tool-neutral intent plus generated
  native interpretations. Portability is an engineering goal, not a claim that
  every harness feature is identical.

### 1d. How this area is changing

- **From Claude-only feature to industry standard.** Anthropic shipped Skills in product (Oct 2025 engineering post), then published the **open standard** (18 Dec 2025) at agentskills.io. Within days, major competitors wired support — the rare case of cross-vendor adoption of a rival's format. *[refresh adopter list from agentskills.io/clients.]*
- **Marketplaces and catalogs exploded.** Community catalogs, vendor skills (Stripe, Vercel, Cloudflare, Atlassian, Figma…), and install CLIs appeared in months. Numbers in any slide deck are wrong by next month — which is why *their* app re-fetches. *[refresh.]*
- **Skills complement MCP, they don't replace it.** MCP connects tools; Skills teach *workflows that use tools*. Anthropic's own framing: Skills can teach complex procedures that involve external software. Keep that distinction sharp in the room.
- **Security became a first-class topic.** Skills can include scripts and network instructions. Malicious skills are a real supply-chain risk — “install only from trusted sources; audit the rest” is Anthropic's own guidance. Build that into the closing.

### 1e. What interesting people are saying about the direction

Use one or two live; paraphrase and cite on screen.

- **Anthropic Engineering — Zhang / Lazuka / Murag (16 Oct 2025; open-standard update 18 Dec 2025).** “Building a skill for an agent is like putting together an onboarding guide for a new hire.” Progressive disclosure is the design principle that makes large libraries feasible. Land: *skills are context engineering, packaged.*
- **The open-standard bet.** agentskills.io + the agentskills/agentskills repo: same folder shape, same frontmatter contract (`name`, `description` required), adopted across competing agent products. Land: *interoperability is the feature.*
- **Simon Willison** — useful for the “skills showed up in Codex / ChatGPT environments” discovery narrative and for the accountability line: a skill in your repo is something you *own*, including its failure modes. *[refresh with a current post if teaching live.]*
- **The security caution (Anthropic's own docs).** Don't install random skills; read bundled scripts; watch for exfiltration instructions. Escape.tech / vibe-coded-app findings from Phase 01 apply here too — a skill that “helps” can also ship a secret. Land: *preview before paste.*

**Land the lecture:** models get smarter; **your** workflows, standards, and domain knowledge get more valuable when encoded as portable skills. Today they build the browser that makes that ecosystem usable — and learn to judge what they install.

---

## 2. The intention walk-through

Before opening the intention, walk `docs/ai-program/`: show how a developer can
ask about harnesses/models, coding governance, skills/agents, agent protocols,
security/data, quality, and adoption. Then walk the skills-and-agents facet:
portfolio, scopes, scouting, evaluation, security, triggers/tests/context,
provenance, publication, functional organization, projections, lifecycle, and
outcomes. Show `skill-scout`, `skill-evaluate`, and `ai-program-advisor`.

Open [intention-skills-browser.md](../../docs/artifacts/intention-skills-browser.md).

### What this app is
A Next.js **capability locator**: multi-source snapshots, a normalized catalog
for skills and agents, run-to-run diff, filters/search, complete file preview,
revision comparison, and an evaluation worksheet. Export is allowed; install
and publication are not Phase 05 actions.

### How the intention sets the agents up to succeed
- It demands a **catalog pipeline**, not a hard-coded list — so the app stays honest when counts change.
- It requires **classification metadata** (function, kind, maturity, risk,
  scope, harness, and trust) — which forces the teaching content into the data
  model.
- It splits agents cleanly: `skill-catalog-builder` (fetch/parse) vs `skill-browser-builder` (UI) — same multi-agent lesson as Phase 01, applied to content.

Lesson out loud: **the intention turns “browse skills” into a product with a contract** — preview and copy are first-class, not afterthoughts.

### Why we don't rewrite the intentions
Read and critique. Predict: “How many sources will parse cleanly? Where will frontmatter be messy? Which skill will look cool but be a capability that a better model makes obsolete?”

---

## 3. The build (it runs — keep teaching)

`/run-plan` builds catalog + UI. Network/GitHub rate limits are the practical risk — note caching to static JSON. **Nobody watches the bar.** Use the window for Phase 05 talks in [discussion-topics.md](discussion-topics.md) (skills as org IP, brand as preference skill, skills vs rules vs memories), plus:

- Walking a real `SKILL.md` from this repo (frontmatter → body → linked file)
- Drawing capability vs preference on the whiteboard
- Security: “what would you check before installing a skill from a stranger?”

Steps: [RUN-ORDER.md](../../docs/phases/05/RUN-ORDER.md).

---

## 4. Closing discussion — "Would you install this?"

- **Browse like a skeptic.** Find the weirdest skill, the most useful, one capability and one preference. Can the room classify them correctly?
- **Preview every file.** Open full markdown, agent metadata, scripts, and
  references. Any commands, credentials, or network calls? Apply the audit
  advice live.
- **Maturity judgment.** Pick three skills and place them on the 1–5 ladder — disagreement is the lesson (judgment is the skill).
- **Portability check.** “If your team switched from Claude Code to Cursor tomorrow, which of these still work?” (Answer: anything conforming to the open format.)
- **Business connection.** "What preference skill would capture *your* team's standards by Friday?"
- **Scope decision.** Personal experiment, project/team dependency, enterprise policy—or reject?
- **Lifecycle.** Who owns it, what revision was reviewed, what triggers re-review, and how is it retired?
- **Phase 05.5.** The static locator becomes a SurrealDB registry for shared evaluations, policy, installations, updates, and controlled publication.

### What they must leave Phase 05 believing
1. Skills package procedural expertise so agents (and teams) can reuse it — onboarding guides for machines.
2. Portable skill conventions plus canonical agent definitions let teams
   preserve organizational intent while generating tool-native forms.
3. Discovery without judgment is how you import someone else's vulnerabilities; preview and audit before install.
4. Preference skills are how institutional knowledge compounds inside the repo.
5. A skills program scouts repeatedly, approves exact revisions, publishes at deliberate scopes, and keeps demanding evidence after adoption.

---

## Citations (verify/refresh before teaching)

- Anthropic Engineering, “Equipping agents for the real world with Agent Skills,” 16 Oct 2025 (open-standard update 18 Dec 2025) — https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- Agent Skills overview / spec — https://agentskills.io/home and https://agentskills.io/specification
- agentskills/agentskills (spec repo) — https://github.com/agentskills/agentskills
- Client / adopter list (re-count before class) — https://agentskills.io/clients
- anthropics/skills (official examples) — https://github.com/anthropics/skills
- Curriculum capability source and governance — `ai/`,
  `docs/ai-program/skills/`, and `scripts/generate-ai-tooling.mjs`

*Do not hard-code “44 tools” or “1,000+ skills” as eternal facts — stamp the date and re-fetch. Treat marketplace blog posts as directional; prefer agentskills.io and Anthropic for normative claims. Reuse Phase 01's security primary sources if you illustrate malicious-install risk.*
