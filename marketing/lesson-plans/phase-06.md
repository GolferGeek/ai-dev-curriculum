# Phase 06 — Lesson Plan

*The **content** you deliver for Phase 06. Room mechanics are shared with [Phase 00's TEACHING.md](../../docs/phase-00/TEACHING.md); exact steps are in [docs/phase-06/README.md](../../docs/phase-06/README.md) and [RUN-ORDER.md](../../docs/phase-06/RUN-ORDER.md). This is what you **talk about**.*

**Session arc:** Intro lecture → Intention walk-through → Build the harness + dashboard → Run the eval (it takes a while) → Closing discussion. Phase 06 answers the question every buyer asks: **which model should we actually use?** — not from a leaderboard, from *their* prompts, scored under *their* rubric.

> **Instructor refresh:** model tags rot monthly (`ollama pull` names, Claude version strings). Verify the contestant roster before the cohort; swap equivalents rather than teaching a dead tag. Citations at the bottom; label arXiv preprints vs. practitioner guides honestly.

---

## 1. Intro — "The State of the AI Union: Evaluation"

Marketing says every model is amazing. Public arenas rank someone else's chat prompts. This lecture is the turn to empiricism: **evaluation is how you buy and operate AI**, and LLM-as-judge is powerful *and* easy to fool yourself with.

### 1a. The technology we're going to be using

- **Ollama** — local model runtime: pull a model, call it over HTTP on your machine. Private, free per call, bounded by hardware.
- **Hosted APIs (Anthropic in this lab)** — higher ceiling, pay-per-token, data leaves the building. The tradeoff in one breath.
- **Eval harness** — send every prompt to every contestant, capture answers + **tokens/sec**, persist results.
- **LLM-as-judge** — other models score answers against a **rubric** defined *before* judging (here: accuracy, reasoning, structure, insight). Multiple judges; skip self-scoring.
- **Two-round tournament** — Round 1 screens everyone (1–10 averages); Round 2 ranks the top 5 side-by-side with weighted points. Same pattern humans use for hiring.
- **Eval dashboard** — heatmap, speed charts, quality-vs-speed scatter, podium. The deliverable is a *decision*, not a vibes ranking.
- **The workload** — 10 real analyst prompts from Orchestrator AI's prediction/risk system (blue team / red team / arbiter / exec summary / legal classifier / etc.) — not toy trivia.

### 1b. The points we're trying to make

1. **“Which model is best?” is an empirical question about your workload.** Chatbot Arena and marketing benches measure other people's prompts. The ranking that matters is on *your* tasks, *your* data, *your* criteria.
2. **Judges need independence and a rubric — agreement alone is not truth.** Correlated judges can agree and all be wrong; global correlation can look fine while within-prompt ranking fails. Multiple diverse judges + defined criteria beat one frontier model giving itself a thumbs-up.
3. **Quality without speed (and cost/privacy) is incomplete.** The dashboard's scatter plot is the point: pick the model for the *job* — batch analysis vs. interactive UX vs. air-gapped data.

### 1c. Why those points are important

- For a **business**: model choice is a recurring procurement and architecture decision (local vs API, size vs latency, quality vs $). Without evals, you buy brand. With evals, you buy evidence.
- For a **developer**: Hamel Husain's line (via Willison): robust evals are what separates engineered AI systems from YOLO. Expect most of the real work to be *looking at outputs*, not building dashboards — the harness exists to make that looking systematic.
- For the **course**: this is the last technical phase — it closes the barbell. Define the work (prompts + rubric) → generate (many models) → verify hard (judges + humans reading the podium).

### 1d. How this area is changing

- **LLM-as-judge became the default industrial pattern** — and the research community spent 2025–2026 documenting how it fails: position bias, style/verbosity bias, schema incoherence, rankings that shift across benchmarks, “reliability without validity.” Teach the tool *and* the failure modes. *[refresh with one current paper.]*
- **Practitioner method beat leaderboard cosplay.** Error analysis first (read 20–100 traces), domain expert as benevolent dictator, binary pass/fail + critique, *then* automate a judge aligned to that expert — Husain / Shankar / Yan. The lab's tournament is a teaching accelerator; production teams still need human-looking-at-data. *[refresh.]*
- **Local models got good enough to be on the shortlist.** Ollama + mid-size open models make “run it on our hardware” a real option for sensitive data — which makes quality-vs-speed-vs-privacy a three-axis decision, not a two-axis one. *[refresh roster.]*
- **Model names rot.** Tags and versions change monthly; a harness that hard-codes last quarter's winners is already wrong. Build to swap contestants. (Say this before anyone `ollama pull`s.)

### 1e. What interesting people are saying about the direction

Use one or two live; paraphrase and cite on screen.

- **Hamel Husain — evals as the main work.** Start with error analysis, not infrastructure; 60–80% of effort on understanding failures; if you pass 100% of evals you're not stressing the system (a ~70% pass rate can be more meaningful). Land: *looking at data is the skill; the judge is a hack to force looking.*
- **Simon Willison** — “a robust approach to evals is the single most important distinguishing factor between well-engineered, reliable AI systems and YOLO.” Amplifies Husain/Shankar for a developer audience. Land: *evals aren't optional polish.*
- **Eugene Yan — survey of LLM-evaluators.** Direct scoring vs pairwise, correlation vs classification, API judges vs finetuned judges, and a sober critiques section. Use when someone asks “is LLM-as-judge legit?” — answer: *sometimes, if aligned and validated.* Land: *choose the judging protocol on purpose.*
- **The research caution (pick one preprint to flash).** e.g. judges with decent *global* correlation still failing *within-prompt* selection; or “reliability without validity” — high test–retest with lingering bias. Land: *multi-judge + human spot-checks; never one number.*
- **Local vs hosted practitioners.** Privacy/cost/latency tradeoffs — no single winner; the scatter plot decides. *[refresh with a current local-model result if useful.]*

**Land the lecture:** stop asking vendors who's best. Put *your* prompts on the track, define the finish line before the race, use several judges, read the scatter plot, and keep a human in the loop for the decision that ships.

---

## 2. The intention walk-through

Open [intention-model-eval.md](../../docs/artifacts/intention-model-eval.md).

### What this app is
An **eval harness** + **results dashboard**: 13 contestants (Ollama families + Anthropic), 4 judges, 10 analyst prompts, Round 1 screening + Round 2 weighted ranking, tokens/sec everywhere, visual podium and scatter.

### How the intention sets the agents up to succeed
- It freezes the **rubric and tournament rules** up front — so agents build a lab, not a vibes chart.
- It separates **harness** (`eval-harness-builder`) from **dashboard** (`eval-dashboard-builder`) — generate data, then visualize; don't conflate.
- It uses **real analyst prompts** (Orchestrator AI) — so the lesson “your workload” is visceral, not abstract.

Lesson out loud: **the intention is the eval design.** Bad criteria produce confident, meaningless scores — same as a bad Phase 00 intention produces a pretty wrong app.

### Why we don't rewrite the intentions
Read and critique. Predict before the run: “Who wins quality? Who wins speed? Will judges disagree on the legal classifier?” Write guesses on the board.

**Prereq reminder:** Ollama running, models pulled, Anthropic key present — [RUN-ORDER.md](../../docs/phase-06/RUN-ORDER.md).

---

## 3. The build & the run (it runs — keep teaching)

`/run-plan` builds harness + dashboard first — relatively quick. **The evaluation itself is the long pole** (models × prompts × judges). Coffee is authorized.

**Nobody watches every token.** Use the window for Phase 06 talks in [discussion-topics.md](discussion-topics.md) (model routing deep-dive, eval-driven procurement, local vs hosted, cost visibility), plus:

- Rubric walkthrough (what does “insight” mean on a risk memo?)
- Correlated-judges whiteboard: three judges from one family vs. diverse lineages
- Local vs API privacy discussion for *their* data
- Spot-check: pick one prompt, read two raw answers as humans before trusting the podium

Steps: [RUN-ORDER.md](../../docs/phase-06/RUN-ORDER.md).

---

## 4. Closing discussion — "What does the scatter plot say we should buy?"

- **Prediction vs. reality.** Who actually won Round 2? Who won tokens/sec? Where did judges disagree — and is disagreement a bug or a signal?
- **Read one disagreement.** Open a prompt where judges split. Human: which answer would *you* ship? That's calibration.
- **Correlated judges check.** Did the open judges cluster? Did Claude-as-judge favor Claude-as-contestant? Name the bias risk out loud.
- **Decision language.** Force a sentence: “For *this* analyst workload, model X wins quality, model Y wins per second/dollar/privacy — here's the chart.”
- **Business connection.** “What prompts would *your* team put on this track Monday?” That's the adoption plan.

### What they must leave Phase 06 believing
1. Model choice is empirical and workload-specific — leaderboards are someone else's eval.
2. Rubrics and diverse judges beat vibes; agreement ≠ validity without human calibration.
3. Speed, cost, and privacy sit on the same decision surface as quality — use the scatter.
4. The harness is reusable infrastructure; the scarce skill is designing prompts/criteria and reading failures.

---

## Citations (verify/refresh before teaching)

**Practitioner (prefer these for the lecture spine):**

- Hamel Husain, “LLM Evals: Everything You Need to Know” (FAQ) — https://hamel.dev/blog/posts/evals-faq/
- Hamel Husain, “Using LLM-as-a-Judge For Evaluation: A Complete Guide” — https://hamel.dev/blog/posts/llm-judge/
- Simon Willison, “Frequently Asked Questions (And Answers) About AI Evals,” 3 Jul 2025 — https://simonwillison.net/2025/Jul/3/faqs-about-ai-evals/
- Simon Willison on Husain's LLM-as-judge method, 30 Oct 2024 — https://simonwillison.net/2024/Oct/30/llm-as-a-judge/
- Eugene Yan, “Evaluating the Effectiveness of LLM-Evaluators (aka LLM-as-Judge)” — https://eugeneyan.com/writing/llm-evaluators/

**Research caution (flash one; label as preprint / evolving):**

- “Reliability without Validity…” (LLM-as-Judge large-scale study), arXiv 2606.19544 — https://arxiv.org/abs/2606.19544
- “When LLM Judge Scores Look Good but Best-of-N Decisions Fail,” arXiv 2603.12520 — https://arxiv.org/pdf/2603.12520
- “When Judgment Becomes Noise…” (Arena-Hard Auto design failures), arXiv 2509.20293 — https://arxiv.org/pdf/2509.20293

**Lab mechanics:**

- Ollama — https://ollama.com
- Curriculum skills — `.claude/skills/analyst-prompts/`, `ollama-integration/`, `model-eval-design/`

*Verify every `ollama pull` tag and Anthropic model id the week of teaching. Do not treat Chatbot Arena rank as the answer to “what should we deploy?” — use it only as contrast. Prefer Husain/Yan/Willison for method; use arXiv pieces as cautionary color, not as settled gospel.*
