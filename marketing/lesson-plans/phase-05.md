# Phase 05 — Lesson Plan

*The **content** you deliver for Phase 05. Room mechanics are shared with [Phase 00's TEACHING.md](../../docs/phase-00/TEACHING.md); exact steps are in [docs/phase-05/README.md](../../docs/phase-05/README.md) and [RUN-ORDER.md](../../docs/phase-05/RUN-ORDER.md). This is what you **talk about**.*

**Session arc:** Intro lecture → Intention walk-through → Build (it runs) → Closing discussion. Phase 05 connects the room to the **ecosystem**: the same `SKILL.md` format they've been using all week is now an open standard across competing tools — and they're going to build the “npm search” for it.

> **Instructor refresh:** skill counts, star counts, and “N tools adopt Skills” headlines go stale monthly. Prefer [agentskills.io](https://agentskills.io) and Anthropic's engineering post for load-bearing claims; re-count catalog sources before class. Citations at the bottom.

---

## 1. Intro — "The State of the AI Union: Skills"

They've been *consuming* skills all week (architecture rules, protocol specs, quality gates). This lecture reframes skills as **the portable unit of expertise** — and explains why an open format matters more than any single clever prompt.

### 1a. The technology we're going to be using

- **Agent Skills (open standard)** — a folder with a `SKILL.md` (YAML frontmatter + Markdown instructions), optionally `scripts/`, `references/`, `assets/`. Portable across tools that implement the spec.
- **Progressive disclosure** — agents load only `name` + `description` at startup; full body when triggered; linked files only when needed. That's how you keep a large library without blowing the context window.
- **Capability vs. preference** — *capability* skills add an ability (process PDFs, talk to a spreadsheet); *preference* skills encode *your* standards (commit style, architecture rules). Preferences compound; capabilities may get eaten by the model.
- **Maturity levels (1–5)** — Apprentice → Builder → Arsenal → Strategist → Architect (from the Skills Master Class framing used in the curriculum). Judging maturity *is* the review skill applied to other people's prompts.
- **Sources** — VoltAgent/awesome-agent-skills, anthropics/skills, awesome-claude-code, community marketplaces, and this curriculum's own `.claude/skills/`. Counts move; the build re-fetches.
- **What they build** — `apps/skills-browser/`: fetch → parse → JSON catalog → Next.js browse/filter/search/preview/copy. Mental model: **npm search, but for AI skills.**

### 1b. The points we're trying to make

1. **Skills are how expertise travels.** A good skill is an onboarding guide for an agent — procedural knowledge version-controlled next to the code, not trapped in one person's chat history.
2. **Open format > proprietary prompt packs.** When Microsoft, OpenAI, Cursor, Copilot, Gemini CLI, and peers read the *same* `SKILL.md`, a skill you write once travels. That's the strategic bet — and it landed unusually fast.
3. **Discovery and judgment are the missing products.** Thousands of skills exist; most teams can't search, preview, classify, or safely install them. The browser teaches the ecosystem *and* the review habit (don't install untrusted skills blindly).

### 1c. Why those points are important

- For a **business**: preference skills are institutional knowledge that doesn't walk out the door — architecture standards, review checklists, domain workflows — committed to the repo.
- For a **developer**: authoring skills is the promotion from “user of the toolkit” to “author of the toolkit” (Phase 03's `/author-agent` made concrete at ecosystem scale).
- For the **course**: this phase answers “are we locked into one vendor?” with evidence: no — the format is the lock-in you *want* (portable), not the vendor.

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

Open [intention-skills-browser.md](../../docs/artifacts/intention-skills-browser.md).

### What this app is
A Next.js **Skills Browser**: multi-source fetch, normalized catalog (level, category, source, capability vs preference, coolness), card grid with filters/search, markdown preview of full `SKILL.md`, copy-to-clipboard for install into `.claude/skills/` (or the equivalent path for their tool).

### How the intention sets the agents up to succeed
- It demands a **catalog pipeline**, not a hard-coded list — so the app stays honest when counts change.
- It requires **classification metadata** (level, capability vs preference) — which forces the teaching content into the data model.
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

Steps: [RUN-ORDER.md](../../docs/phase-05/RUN-ORDER.md).

---

## 4. Closing discussion — "Would you install this?"

- **Browse like a skeptic.** Find the weirdest skill, the most useful, one capability and one preference. Can the room classify them correctly?
- **Preview before copy.** Open full markdown. Any scripts? Any “call this URL”? Apply the Anthropic audit advice live.
- **Maturity judgment.** Pick three skills and place them on the 1–5 ladder — disagreement is the lesson (judgment is the skill).
- **Portability check.** “If your team switched from Claude Code to Cursor tomorrow, which of these still work?” (Answer: anything conforming to the open format.)
- **Business connection.** “What preference skill would capture *your* team's standards by Friday?”

### What they must leave Phase 05 believing
1. Skills package procedural expertise so agents (and teams) can reuse it — onboarding guides for machines.
2. An open `SKILL.md` standard means write-once, run-across-tools — vendor lock-in is optional.
3. Discovery without judgment is how you import someone else's vulnerabilities; preview and audit before install.
4. Preference skills are how institutional knowledge compounds inside the repo.

---

## Citations (verify/refresh before teaching)

- Anthropic Engineering, “Equipping agents for the real world with Agent Skills,” 16 Oct 2025 (open-standard update 18 Dec 2025) — https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- Agent Skills overview / spec — https://agentskills.io/home and https://agentskills.io/specification
- agentskills/agentskills (spec repo) — https://github.com/agentskills/agentskills
- Client / adopter list (re-count before class) — https://agentskills.io/clients
- anthropics/skills (official examples) — https://github.com/anthropics/skills
- Curriculum skill anatomy / sources skills — `.claude/skills/skill-anatomy/`, `.claude/skills/skill-sources/`, `.claude/skills/skill-catalog-design/`

*Do not hard-code “44 tools” or “1,000+ skills” as eternal facts — stamp the date and re-fetch. Treat marketplace blog posts as directional; prefer agentskills.io and Anthropic for normative claims. Reuse Phase 01's security primary sources if you illustrate malicious-install risk.*
