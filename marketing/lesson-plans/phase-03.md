# Phase 03 — Lesson Plan

*The **content** you deliver for Phase 03. Room mechanics are shared with [Phase 00's TEACHING.md](../../docs/phases/00/TEACHING.md); exact steps are in [docs/phases/03/README.md](../../docs/phases/03/README.md) and [RUN-ORDER.md](../../docs/phases/03/RUN-ORDER.md). This is what you **talk about**.*

**Session arc:** Intro lecture → Connect investigation to Phase 02 guardrails → Choose the codebase and questions → Open investigation lab → Build project memory → Promote one finding → Return session. Phase 03 is the pivot from *greenfield* to *brownfield* and from one-time understanding to a self-improving development system.

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
4. **Understanding must become durable memory.** A report that disappears into chat helps once. A reviewed map, decision, skill, or risk note helps every future developer and agent.
5. **Phase 02 and Phase 03 form a loop.** Guardrails encode known expectations. Investigation finds missing knowledge, verifies it, and promotes mature findings into better guardrails.

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

## 2. The reciprocal loop — guardrails need memory

Phase 02 made proposed changes prove themselves. But a quality system can enforce only what the organization already knows how to express. Phase 03 discovers what the quality system does not yet know.

Teach the cycle:

1. Ask questions about the system.
2. Select verified answers worth remembering.
3. Update memory when new questions, changes, incidents, and decisions occur.
4. Use Git history to confirm, qualify, or repair the memory.
5. Promote mature findings into documentation, agent guidance, tests, CI, or merge policy.
6. Let those improved guardrails evaluate future changes.
7. Learn from the next surprise and begin again.

**Land:** *The codebase should understand itself better after every investigation.*

### Memory has maturity levels

| Level | Meaning | Home |
|---|---|---|
| Observation | Evidence from this investigation | Research report |
| Explanation | Durable account of how the system works | Architecture/onboarding/project memory |
| Expectation | Practice the team wants future work to follow | Quality contract or PR requirements |
| Enforcement | Mature rule that can safely block work | Test, CI, architecture rule, merge policy |

Do not jump from one agent observation to a hard organizational gate. Promotion requires evidence, known scope, ownership, and an understanding of false-positive risk.

---

## 3. Choose the codebase and questions

There's no app-intention here. The analog is **the codebase and the questions you bring to it.** Use the curriculum repo itself, or a sanitized real one.

- **Frame the research question first** — "Where does user data enter and leave? Where's the auth boundary? What's the riskiest file?" A vague question gets a vague map; a sharp question gets a useful one. (Same "a good intention is the leverage" lesson, applied to research.)
- **Sequence the tools** the way you'd onboard: `/ingest` for the shape, `/map` for the flows and auth edges, `/security-scan` for the risks, `/git-story` for where the bodies are buried, `/improve` for the debt. Each answers a different onboarding question.
- **Predict before you run:** "Which file will `/git-story` flag as the churn hotspot? Where will `/map` say the auth boundary is?" Write the guesses down.

Give learners question families, then require at least one repository-specific question:

- **Architecture:** Where does execution begin? Where do business rules live? Which dependencies violate intended boundaries?
- **Data and trust:** Where does customer data enter, persist, and leave? Where are user, role, and tenant checks enforced?
- **Testing:** Which critical paths have meaningful behavioral proof? Is API/web/worker coverage consistent and complete?
- **Git and process:** What process does history show? Which files churn or change together? Do documented standards match actual practice?
- **Operations:** What fails silently? What is reversible? Which areas lack observability or ownership?
- **Change safety:** What would you refuse to touch? What is the safest useful first assignment for a new contractor or agent?

> **Day-2 safety note:** this is where [day2-prep](../../docs/phases/03/README.md) matters — on a *real* repo, these are read-first tools; you understand and propose before you touch. Say that out loud.

---

## 4. Open Codebase Investigation Lab

Learners choose either mode.

### Team mode

Groups select one repository, agree on the questions, then divide architecture, data/security, testing, Git/process, and operations lenses. They work in parallel and rejoin to reconcile contradictions into one system story.

### Individual mode

Learners select an authorized internal, sanitized, public GitHub, or course-provided repository and own the investigation end-to-end.

Both modes:

1. Record five to ten questions and three predictions.
2. Run the standard tools for orientation.
3. Pursue one unique question.
4. Challenge one confident AI conclusion manually.
5. Select and classify findings worth remembering.
6. Use `/author-agent` to create one investigation or memory skill.
7. Update one durable memory artifact.
8. Propose one finding for promotion into a Phase 02 guardrail.

The custom skill should state its question, evidence, prohibited assumptions, uncertainty format, output, and verification method. Good candidates include Git-process audit, API consistency, coverage completeness, authorization mapping, migration risk, ownership, observability, business-rule location, documentation drift, project-memory refresh, or finding promotion.

### Safety line

Authorized repositories and approved services only. No secrets, customer data, or prohibited code in prompts. Research branch. Read-first. When policy is uncertain, use a public repository.

---

## 5. Run the research tools (they run — keep teaching)

Run the skills against the target repo. They produce reports, not changes. **Nobody watches the scroll** — use the window for the brownfield material in 1e, the "senior at understanding, junior at execution" point, and Phase 03 talks in [discussion-topics.md](discussion-topics.md) (durable understanding, promote findings → rules, Day-2 safety). Steps: [RUN-ORDER.md](../../docs/phases/03/RUN-ORDER.md).

---

## 6. Build memory and promote carefully

Ask each learner or group:

- What changed in our understanding?
- What evidence supports it?
- What prior statement did it confirm, qualify, or replace?
- What remains uncertain?
- What future change should trigger revalidation?
- Who can confirm or own it?

Then choose one finding and decide whether it should remain an observation, become an explanation, become an expectation, or mature into enforcement.

**Example:** repeated authorization regressions → documented inconsistency → expectation that every tenant-data route proves ownership → authorization contract tests in the high-risk PR profile.

---

## 7. Return session — "Did the repository learn?"

- **Prediction vs. reality.** Did the churn hotspot, the auth boundary, the riskiest file land where the room guessed? What surprised you?
- **Read the map like a new hire.** Could someone who'd never seen this repo now explain how data flows through it? That's the deliverable — understanding, not a change.
- **What would you *not* touch?** Push them to name the parts where change is risky. Judgment about safe entry points *is* the skill.
- **Capture it (`/author-agent`).** Turn what you just learned about this codebase into a reusable custom agent/skill — Anthropic's own guidance is to have the agent capture its successful approaches and common mistakes into a skill. This is the literal Day-2 bridge: your team's knowledge, encoded and committed with the repo.
- **Repair the memory.** What did Git history, a contradiction, or a manually checked claim force you to update?
- **Improve the guardrails.** Which verified finding should feed Phase 02, and why is it mature enough—or not mature enough—to enforce?
- **Name the next question.** Better memory should create better questions, not the illusion that investigation is finished.
- **Business connection.** "Imagine this is your production system Monday morning." That's tomorrow.

### What they must leave Phase 03 believing
1. Brownfield — understanding a system you didn't write — is the real, valuable job, and a distinct skill from building new.
2. AI is strong at *comprehension*, weaker at *execution*; aim it accordingly and keep humans on risky changes.
3. The output of research is *judgment about where change is safe*, not a change.
4. Captured knowledge (a committed skill/agent) is how a team's understanding compounds instead of walking out the door.
5. Project memory is maintained, not completed; code, Git history, incidents, and new questions continuously correct it.
6. Investigation and quality engineering form a cycle: Phase 03 discovers and explains; Phase 02 enforces what has earned enforcement.

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
