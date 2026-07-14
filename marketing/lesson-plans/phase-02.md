# Phase 02 — Lesson Plan

*The **content** you deliver for Phase 02. Room mechanics are shared with [Phase 00's TEACHING.md](../../docs/phase-00/TEACHING.md); exact steps are in [docs/phase-02/README.md](../../docs/phase-02/README.md) and [RUN-ORDER.md](../../docs/phase-02/RUN-ORDER.md). This is what you **talk about**.*

**Session arc:** Intro lecture → Walk-through of what we're checking → Run the quality pipeline (it runs) → Closing discussion. Phase 02 is the back end of the barbell made real: generation is cheap, so the whole phase is about *verifying and maintaining* what the agent produced.

> **Instructor refresh:** anywhere this says *[refresh]*, pull the current link before the cohort. Citations are at the bottom, and several key figures come from *vendors* (GitClear, CodeRabbit, Greptile) — I've flagged those; lean on the neutral anchors (DORA, Thoughtworks/Böckeler, Fowler) for the load-bearing claims.

---

## 1. Intro — "The State of the AI Union: Quality"

Phase 00 built. Phase 01 built something real. This lecture is the turn: the industry's own data says AI writes code fast **and** leaves a mess, and the scarce skill is now review, not typing.

### 1a. The technology we're going to be using

Six slash skills in three scanner→fixer pairs, plus the ship gate:

- **`/scan-errors` → `/fix-errors`** — build/lint/test errors. The scanner writes a classified report and fixes nothing; the fixer batches and repairs, then re-scans until zero.
- **`/monitor` → `/harden`** — architecture violations (something talking straight to the DB instead of the shared package, inconsistent auth). Monitor reports; harden fixes in batches and re-runs the error scan so a fix can't quietly break the build.
- **`/commit` (gate) and `/pr-eval`** — the pre-ship quality gate and PR review, backed by a **living `pr-requirements` doc** that grows every time a review finds a new gap.
- **Quality gates** — build, lint, test — run consistently per app type; the "zero-tolerance" idea (the gate fails on any critical finding, not "mostly passing").

### 1b. The points we're trying to make

1. **Generation got cheap, so the bottleneck moved to review.** The expensive, scarce work is now *verifying and understanding* the code — the barbell's back end.
2. **AI code carries a measurable quality tax.** Independent and vendor data both point the same way: more duplication, less refactoring, more churn, lower delivery stability. You have to *actively* counter it — which is what scanners and monitors are for.
3. **The discipline is automated gates + human judgment.** Scanners find, fixers fix, the gate blocks — but a human still owns "is this actually right and maintainable?" A green pipeline is necessary, not sufficient.

### 1c. Why those points are important

- **"Comprehension debt" is the real cost.** When an agent writes four times as much code, a human still has to understand all of it — and nobody did. That gap is where outages and unmaintainable systems come from.
- **Speed without gates degrades stability.** Google's DORA research (the neutral anchor here) frames AI as an *amplifier*: throughput can rise while delivery stability falls, unless the surrounding discipline is strong. The gates are that discipline.
- **For a business:** this is the phase that turns "impressive demo" into "software we can own for three years." It's what you're actually selling past the wow factor.

### 1d. How this area is changing

- **AI code-review tooling exploded.** CodeRabbit, Greptile, Graphite's Diamond (Graphite was acquired by Cursor, Dec 2025), GitHub Copilot code review — a whole category betting that *review* is the new bottleneck. *[refresh — consolidating fast.]*
- **"Maintainability sensors" are emerging** — layered checks (in-session lint/types → CI → slow-cadence drift/security scans), with the insight that cross-module architectural judgment needs an LLM to *interpret* the code, not just compute over it. This is exactly the monitor/harden idea. *[refresh.]*
- **Evals-as-gates** — the same "run the suite, decide if quality moved, block the release" pattern is spreading from app code to AI systems themselves (relevant foreshadowing for Phase 06). *[refresh.]*

### 1e. What interesting people are saying about the direction

Use one or two live; paraphrase and cite on screen.

- **Addy Osmani — the review-bottleneck anchor.** His reading of the data: daily AI users produce roughly **4× the raw output but only ~12% more delivered value** — "a human still has to review all four times of it." He calls a trusted reviewer's confidence "the most leveraged place in software to be good," and named the failure mode **"comprehension debt."**
- **Simon Willison — the accountability line.** Shipping unreviewed AI PRs is "a dereliction of duty as a software developer"; "your job is to deliver code you have proven to work." His *vibe coding vs. vibe engineering* split is the clean framing: if an LLM wrote every line but you reviewed, tested, and understood it, that's engineering, not vibes.
- **The data (label the sources honestly):**
  - **DORA (Google, ~5,000 respondents — the neutral anchor):** AI is an amplifier; the throughput-up / stability-down paradox persisted into 2025, and ~30% of developers report low trust in AI-generated code.
  - **GitClear (vendor, longitudinal):** rising copy/paste and collapsing refactoring in large repos — directionally strong, but it's a code-analytics vendor's own report, so present it as such.
  - **CodeRabbit (vendor):** found AI-coauthored PRs carried notably more issues than human ones — again, a review-tool vendor using its own taxonomy; cite as directional.
- **Böckeler (Thoughtworks) and Fowler** for the maintainability frame: the real question isn't how fast you produce code, it's whether the system stays maintainable, reliable, and useful — and gains only accrue to loosely-coupled architectures with fast feedback.

**Land the lecture:** the machine that writes code in a blink also duplicates, drifts, and leaves you holding code no human understands. This phase is the antidote — and the skill (review + gates) is the one the whole industry just discovered it's short on.

---

## 2. What we're checking (the walk-through)

There's no new app to define here — **the subject is the app you built in Phase 01.** The analog of the intention is the **quality contract**: the demo-grade bar plus the living `pr-requirements` doc.

- Open the app and ask the three uncomfortable questions from the README out loud: *Any lint/type errors? Is anything bypassing the shared data layer or handling auth inconsistently? Would a reviewer actually approve this?*
- Point at the **pair structure**: every problem type has a scanner that only *finds* and a fixer that only *fixes*. Separating them is the lesson — you read and judge the report before anything changes.
- Note the **living doc**: `pr-requirements` grows when `/pr-eval` finds a new gap, so the same mistake can't slip through twice. That's how a team's standards compound.

Have the room **predict** before running: "What will `/scan-errors` find in an app we were proud of yesterday?" Write the guesses down.

---

## 3. Run the quality pipeline (it runs — keep teaching)

Run `/scan-errors`, read the report, run `/fix-errors`; then `/monitor` → `/harden`; then the `/commit` gate. It's fast. **Nobody watches the scroll** — use the window for the 1e data, the "who reviews the AI's code" discussion, and Phase 02 talks in [discussion-topics.md](discussion-topics.md) (comprehension debt, living standards, observability). You can run a scan in one session while discussing in another. Steps: [RUN-ORDER.md](../../docs/phase-02/RUN-ORDER.md).

---

## 4. Closing discussion — "Would a reviewer approve this — and did you understand it?"

- **Prediction vs. reality.** What did the scanner find in yesterday's "finished" app? How much would you have shipped?
- **Did fixing break anything?** This is why `/harden` re-runs the error scan. Show that a fix can introduce a regression — and that the gate is what catches it.
- **Comprehension check.** Pick one AI-written function nobody has read. Can someone explain it? If not, name it: that's comprehension debt, and it's the real risk, not the lint error.
- **The gate decision.** `/commit` blocks on failure. Ask: "What's the *one* thing you'd refuse to let through?" Tie to the living `pr-requirements` doc — standards that grow.
- **Business connection.** At Phase 01 speed you *could* ship today; this phase is why you don't ship blind. This is the difference between a prototype and a product you can own.

### What they must leave Phase 02 believing
1. Generation is cheap; **review and comprehension are the scarce, leveraged skills now.**
2. AI code has a measurable quality tax — you counter it deliberately with scanners, monitors, and gates.
3. Automated gates are necessary but **not sufficient** — a human owns "is this right and maintainable?"
4. Standards should compound: every review that finds a gap should make the next one impossible.

---

## Citations (verify/refresh before teaching)

- Google Cloud / DORA, "Announcing the 2025 DORA Report," 23 Sep 2025 — https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report *(neutral anchor)*
- DORA 2024 preview (AI stability/throughput) — https://dora.dev/research/2024/ai-preview/
- Addy Osmani, "Comprehension Debt: The Hidden Cost of AI-Generated Code" — https://www.oreilly.com/radar/comprehension-debt-the-hidden-cost-of-ai-generated-code/
- Addy Osmani, "Agentic Code Review," 15 Jun 2026 — https://addyosmani.com/blog/agentic-code-review/
- Simon Willison, "Your job is to deliver code you have proven to work," 18 Dec 2025 — https://simonwillison.net/2025/Dec/18/code-proven-to-work/
- Simon Willison, "Vibe engineering," 7 Oct 2025 — https://simonwillison.net/2025/Oct/7/vibe-engineering/
- Birgitta Böckeler (Thoughtworks), "Maintainability sensors for coding agents," 27 May 2026 — https://martinfowler.com/articles/sensors-for-coding-agents.html
- GitClear, "AI Copilot Code Quality" research, Jan 2026 — https://www.gitclear.com/ai_assistant_code_quality_2025_research *(vendor — directional)*
- CodeRabbit, "State of AI vs Human Code Generation," 17 Dec 2025 — https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report *(vendor — directional)*

*Label GitClear / CodeRabbit / Greptile as interested vendors, not neutral research. Do **not** cite the "+3.4% DORA code-quality" figure (unverified); the verified DORA figures are the stability/throughput tradeoff. Locate Fowler's primary essay before quoting him directly.*
