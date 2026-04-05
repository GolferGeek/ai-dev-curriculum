# Intention — Model Evaluation Lab

## Why

Every month there are new models. Marketing says they're all amazing. Benchmarks test toy problems. But when you give a model a real analyst prompt — the kind your business actually runs — how does it perform? How fast is it? And compared to what?

We need a tool that answers this with real data: configure your own test battery, pick your models, pick your judges, run the evaluation, and watch the results fill in live on a dashboard. This is how you make model selection decisions — not from blog posts, from your own evaluation.

## Who

- **Primary:** Technical decision-makers choosing which models to deploy
- **Secondary:** Learners understanding model capabilities and trade-offs
- **Tertiary:** The Orchestrator AI team evaluating models for risk analysis

## What we're building

A **configurable Model Evaluation Lab** (`apps/model-eval/`) — a Next.js app where you configure everything from the UI, hit Run, and watch results fill in live.

### The app is the control panel

**Everything is configurable from the dashboard — no hardcoded models, prompts, or settings.**

#### Models tab
- **Auto-discovers local models** from Ollama (`ollama ls` / `GET /api/tags`)
- Each model has a checkbox and a role toggle: **Contestant** (being tested), **Judge** (evaluates others), or **Both**
- **Frontier models via OpenRouter:** enter OpenRouter API key in settings → unlocks Claude, GPT-4o, Gemini Pro, etc. as contestants and/or judges
- **Anthropic models:** enter Anthropic API key → Claude Haiku, Sonnet as contestants/judges
- Models that are judges skip scoring their own responses

#### Prompts tab
- Shows all available prompts grouped by tier (Quick Tasks, Tool Calling, Multimodal, Analyst)
- Checkboxes to select which prompts to include in the run
- **Add custom prompts** right in the UI: name, prompt text, expected format, tier
- Custom prompts are saved to a local config file

#### Config tab
- **Runs per prompt** — how many times each model runs each prompt (default 3, configurable 1-10)
- **Timeout per generation** — max seconds to wait (default 300)
- **Judge scoring criteria weights** — adjust importance of accuracy/reasoning/structure/insight
- **Round 2 point values** — configurable (default 100/70/40/20/10)
- **Top N for Round 2** — how many advance (default 5)

#### Run
- Hit **Start Evaluation** — harness runs in the background
- Watch the heatmap fill in cell by cell (gray → blue pulsing → green/yellow/red)
- **Progress bar** showing X of N generations complete
- Can **pause/resume** — saves state, picks up where it left off
- Can run a **subset** — just one tier, just one model, just re-run failures

#### Results
- Heatmap, speed chart, quality/speed scatter, consistency view, Round 2 podium, drilldown
- All update live as results arrive
- **Export markdown report** to `docs/artifacts/model-eval-report.md`

### Model sources

| Source | How it works | Models available |
|--------|-------------|-----------------|
| **Ollama** (local) | Auto-discovered via `GET http://localhost:11434/api/tags` | Whatever you've pulled — Gemma 4, Qwen, DeepSeek, Llama, etc. |
| **Anthropic API** | Enter API key in settings | claude-haiku-4-5, claude-sonnet-4-6, claude-opus-4-6 |
| **OpenRouter** | Enter API key in settings | 200+ models — GPT-4o, Gemini Pro, Mistral Large, Command R+, etc. |

### The prompts (21 built-in across 4 tiers)

**Tier 1 — Quick Tasks (5 prompts, ~20-50 token responses):**
Every model should handle these. Tests speed + basic competence.

| # | Task | Tests |
|---|------|-------|
| 1 | Entity extraction from a paragraph | NER accuracy, speed |
| 2 | Sentiment classification with confidence | Classification accuracy |
| 3 | One-sentence summary | Compression, key point retention |
| 4 | Natural language to JSON | Structure compliance |
| 5 | Code bug fix (off-by-one) | Code comprehension |

**Tier 2 — Tool Calling (3 prompts):**
Tests structured function call generation. Models that can't do this score 0 on structure.

| # | Task | Tests |
|---|------|-------|
| 6 | Single tool call (get_weather) | Correct function + params |
| 7 | Multi-tool chain (flights + hotel) | Two calls, correct params |
| 8 | Tool selection (1 of 5 relevant) | Picks right tool, ignores others |

**Tier 3 — Multimodal (3 prompts):**
Image + text. Non-multimodal models skip these entirely.

| # | Task | Tests |
|---|------|-------|
| 9 | Read a bar chart, identify top 3 | Visual comprehension |
| 10 | OCR a code screenshot | Text extraction |
| 11 | Critique a UI screenshot | Visual reasoning |

**Tier 4 — Analyst (10 prompts):**
Real prompts from Orchestrator AI. Deep reasoning, multi-step, structured output.

| # | Prompt | Tests |
|---|--------|-------|
| 12 | Blue Team Risk Defender | Evidence marshaling, structured argument |
| 13 | Red Team Risk Challenger | Finding blind spots, alternative scenarios |
| 14 | Arbiter Risk Synthesizer | Weighing arguments, score adjustment |
| 15 | Dimension Risk Analyzer | Integrating news + predictions |
| 16 | Executive Summary Generator | Concise writing, recommendations |
| 17 | Learning Generator | Pattern recognition from failures |
| 18 | Missed Opportunity Analyst | Root cause analysis |
| 19 | Prediction Synthesizer | Weighing competing opinions |
| 20 | Legal Document Classifier | Expert classification |
| 21 | Task Decomposition | Freeform to structured |

**Plus custom prompts** added by the user in the UI.

### Multiple runs for consistency

Each model runs each prompt N times (configurable, default 3):
- **Best of N** — the model's ceiling
- **Average of N** — typical expected quality
- **Consistency (std dev)** — reliability indicator

A model scoring 7, 7, 7 is more useful than one scoring 9, 3, 8.

### The tournament

**Round 1 — Screening (1-10):**
Each judge scores each response on 4 criteria (weights configurable):
- Accuracy, Reasoning, Structure, Insight

**Round 2 — Weighted ranking (top N):**
Each judge ranks the top N head-to-head. Points configurable (default 100/70/40/20/10).

### The dashboard (live updating)

The dashboard updates in real time as the harness runs:
- **Heatmap** fills in cell by cell — gray → blue → green/yellow/red
- **Speed chart** grows as each model completes
- **Quality/Speed scatter** builds up as data arrives
- **Consistency view** shows reliability after 3+ runs per cell
- **Round 2 podium** appears after Round 1 completes
- **Progress bar** — X of N generations done

### Markdown report

The harness produces `docs/artifacts/model-eval-report.md`:
- Winner with one-line summary
- Leaderboard (all models ranked)
- Best model per tier
- Speed tiers (>50 t/s, 20-50 t/s, <20 t/s)
- Judge agreement
- Surprises (over/underperformers)
- Recommendation ("Use X for quick tasks, Y for analyst work, Z for multimodal")

Report updates live alongside the dashboard.

## Demo-grade minimums

- [ ] Dashboard auto-discovers Ollama models
- [ ] User can select contestants, judges, and prompts from the UI
- [ ] Runs per prompt is configurable
- [ ] Harness sends prompts and gets responses
- [ ] Token speed is captured for every generation
- [ ] Results update live on the dashboard as the harness runs
- [ ] Round 1 heatmap shows scores grouped by tier
- [ ] Speed chart and quality/speed scatter work
- [ ] Consistency indicators visible after multiple runs
- [ ] Drilldown shows actual responses with judge commentary
- [ ] Markdown report generated
- [ ] Results survive restart (saved to JSON)

## Out of scope

- Real-time streaming of individual model token generation
- Cost tracking per API call (interesting but not MVP)
- Automated model downloading (user pre-downloads via `ollama pull`)
- Statistical significance testing (visual comparison is sufficient)
- Multi-GPU optimization
- Scheduled/recurring evaluations

## Success criteria

1. A user can configure and launch an evaluation from the dashboard in under 2 minutes
2. They can watch results fill in live — no waiting for everything to finish
3. Looking at the dashboard, they can immediately answer: "Which model should I use for this task?"
4. They can export a shareable report for their team
5. Adding a new model (pull from Ollama, check the box) takes seconds
