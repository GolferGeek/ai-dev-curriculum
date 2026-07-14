# Phase 03 — Lesson Plan

*The **content** you deliver for Phase 03. Room mechanics are shared with [Phase 00's TEACHING.md](../../docs/phase-00/TEACHING.md); exact steps are in [docs/phase-03/README.md](../../docs/phase-03/README.md) and [RUN-ORDER.md](../../docs/phase-03/RUN-ORDER.md). This is what you **talk about**.*

**Session arc:** Intro lecture → Choose the codebase & the questions → Run the research tools (they run) → Closing discussion. Phase 03 is the pivot from *greenfield* (building new) to *brownfield* (understanding what already exists) — and it's the bridge to Day 5, where the codebase is *theirs*.

> **Instructor refresh:** *[refresh]* markers flag time-sensitive claims. Citations are at the bottom; vendor/consultancy claims (Sourcegraph, IBM, McKinsey) are labeled — lean on the practitioner anchors (Willison, Orosz, Böckeler/Thoughtworks, Cognition/Devin data).

---

## 1. Intro — "The State of the AI Union: Brownfield"

Every demo you've seen builds something *new*. The real job in a business isn't new — it's changing a system someone else wrote, years ago, that you don't understand yet. This lecture is about the hardest and most valuable use of these tools: comprehension before change.

### 1a. The technology we're going to be using

The research toolkit — read-first skills that build understanding without touching code:

- **`/ingest`** — whole-repo orientation: what is this, what does it do, how is it organized.
- **`/map`** — entry/exit points, data flow, API surfaces, **auth boundaries**.
- **`/security-scan`** — vulnerabilities, auth gaps, exposed secrets, injection risk.
- **`/git-story`** — history as evidence: hotspots, churn, coupling, who knows what.
- **`/improve`** — dead code, missing tests, tech debt, performance.
- **`/deep-dive [area]`** — specialist focus on frontend/backend/data or a path.
- **`/author-agent`** — the Day-2 bridge: capture what you just learned into a reusable custom agent/skill.

### 1b. The points we're trying to make

1. **Brownfield is the real job, and it's a different skill.** Generating new code is easy; safely changing an existing system means *understanding it first* — and that's what these tools accelerate.
2. **AI is senior at understanding, junior at execution.** Point the tools at comprehension (map it, explain it, find the risk) before you let them change anything.
3. **Understand → then decide what *not* to touch.** The output of research isn't a change; it's judgment about where change is safe. This is the discipline that protects production code.

### 1c. Why those points are important

- Most software work is **evolving existing systems**, where the understandability of the code is what caps everything you can safely do.
- The biggest real-world win from AI on legacy systems isn't generation — it's **migrations and comprehension**, where it genuinely saves time.
- This is the phase that de-risks Day 5. Applying these tools to *their* repo, with your 25 years of "understand the system before you change it" instinct, is the highest-value thing the course does for a paying company.

### 1d. How this area is changing

- **Codebase awareness became the differentiator** among AI tools, splitting into three retrieval strategies: vector indexes (Cursor/Windsurf), agentic grep + file reads on demand (Claude Code's index-free approach), and code-search/graph engines (Sourcegraph). The live debate is which wins on big enterprise repos. *[refresh.]*
- **The effective ceiling is real.** Cognition's data on Devin shows "effective reasoning context" is much smaller than advertised context windows — so on million-line repos, *retrieval quality*, not window size, governs success. *[refresh.]*
- **Enterprise legacy modernization went all-in** — IBM (mainframe/COBOL), McKinsey ("LegacyX"), AWS — but the credible *method* (Thoughtworks) is "reverse-engineer to a description of behavior first, then forward-engineer," treating messy source as a gray box. *[refresh; label IBM/McKinsey as vendor claims.]*

### 1e. What interesting people are saying about the direction

- **Simon Willison — the thesis.** "Most of the work we do as software engineers involves evolving existing systems, where the quality and understandability of the underlying code is crucial." His *vibe engineering* framing applies double in brownfield: you stay accountable for code you didn't write and barely understand yet.
- **Gergely Orosz — the proven use case.** Talking to professional devs, the single best use case for AI on existing systems is **migrations** — "very useful there, saves a bunch of time." (He also notes monolithic legacy codebases are a top enterprise adoption *blocker*.)
- **Birgitta Böckeler / Thoughtworks — "context engineering."** "Context engineering is curating what the model sees so that you get a better result." Key brownfield warning: messy, heavily-modified legacy code can actively *confuse* the model, so sometimes you reconstruct behavior from other signals (UI exploration, DB schemas, network capture) rather than trusting the source.
- **Cognition / Devin — the evidence of the gap.** In practice these agents are "senior-level at codebase understanding but junior at execution." That asymmetry is the whole lesson: use them to *understand*, keep humans on the risky *changes*.

**Land the lecture:** the demo that builds a to-do app in a blink is a party trick. Pointing these tools at a system you didn't write, understanding it faster than you ever could alone, and *then* deciding what's safe to change — that's the job, and it's what tomorrow's Day-5 setup is really about.

---

## 2. Choose the codebase & the questions (the walk-through)

There's no app-intention here. The analog is **the codebase and the questions you bring to it.** Use the curriculum repo itself, or a sanitized real one.

- **Frame the research question first** — "Where does user data enter and leave? Where's the auth boundary? What's the riskiest file?" A vague question gets a vague map; a sharp question gets a useful one. (Same "a good intention is the leverage" lesson, applied to research.)
- **Sequence the tools** the way you'd onboard: `/ingest` for the shape, `/map` for the flows and auth edges, `/security-scan` for the risks, `/git-story` for where the bodies are buried, `/improve` for the debt. Each answers a different onboarding question.
- **Predict before you run:** "Which file will `/git-story` flag as the churn hotspot? Where will `/map` say the auth boundary is?" Write the guesses down.

> **Day-2 safety note:** this is where [day2-prep](../../docs/phase-03/README.md) matters — on a *real* repo, these are read-first tools; you understand and propose before you touch. Say that out loud.

---

## 3. Run the research tools (they run — keep teaching)

Run the skills against the target repo. They produce reports, not changes. **Nobody watches the scroll** — use the window for the brownfield material in 1e, the "senior at understanding, junior at execution" point, and Phase 03 talks in [discussion-topics.md](discussion-topics.md) (durable understanding, promote findings → rules, Day-2 safety). Steps: [RUN-ORDER.md](../../docs/phase-03/RUN-ORDER.md).

---

## 4. Closing discussion — "Do we actually understand this system now?"

- **Prediction vs. reality.** Did the churn hotspot, the auth boundary, the riskiest file land where the room guessed? What surprised you?
- **Read the map like a new hire.** Could someone who'd never seen this repo now explain how data flows through it? That's the deliverable — understanding, not a change.
- **What would you *not* touch?** Push them to name the parts where change is risky. Judgment about safe entry points *is* the skill.
- **Capture it (`/author-agent`).** Turn what you just learned about this codebase into a reusable custom agent/skill — Anthropic's own guidance is to have the agent capture its successful approaches and common mistakes into a skill. This is the literal Day-2 bridge: your team's knowledge, encoded and committed with the repo.
- **Business connection.** "Imagine this is your production system Monday morning." That's tomorrow.

### What they must leave Phase 03 believing
1. Brownfield — understanding a system you didn't write — is the real, valuable job, and a distinct skill from building new.
2. AI is strong at *comprehension*, weaker at *execution*; aim it accordingly and keep humans on risky changes.
3. The output of research is *judgment about where change is safe*, not a change.
4. Captured knowledge (a committed skill/agent) is how a team's understanding compounds instead of walking out the door.

---

## Citations (verify/refresh before teaching)

- Simon Willison, "Not all AI-assisted programming is vibe coding," 1 May 2025 — https://simonwillison.net/2025/May/1/not-vibe-coding/
- Simon Willison, "Vibe engineering," Oct 2025 — https://simonwillison.net/2025/Oct/7/vibe-engineering/
- Gergely Orosz, on migrations as the top brownfield use case, Sep 2025 — https://x.com/GergelyOrosz/status/1966055498362323320
- Birgitta Böckeler & Neal Ford (Thoughtworks), "Context engineering: Tackling legacy systems with generative AI," 21 Aug 2025 — https://www.thoughtworks.com/insights/podcasts/technology-podcasts/context-engineering-tackling-legacy-systems-generative-ai
- Birgitta Böckeler, "Learnings from two years of using AI tools," 24 Jun 2025 — https://newsletter.pragmaticengineer.com/p/two-years-of-using-ai
- Cognition, "Devin's 2025 Performance Review," 14 Nov 2025 (senior-understanding/junior-execution; effective reasoning context) — https://cognition.com/blog/devin-annual-performance-review-2025
- Anthropic, "Equipping agents for the real world with Agent Skills," 16 Oct 2025 (capture patterns into skills) — https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills

*Label Sourcegraph, IBM ("Project Bob"), and McKinsey ("LegacyX") claims as vendor/consultancy marketing. Verify the Sourcegraph Cody Free/Pro discontinuation date and the IBM Bob GA date on their own sites before citing. The "8-year-old Django monolith rollback" story is an unattributed anecdote — use only as illustration.*
