# Phase 06 — Model Eval Lab: how good are these models, really?

**Prereqs:** Phase 05 complete. Ollama installed with models downloaded.

You've built apps, maintained quality, researched codebases, demonstrated protocols, and browsed the skill ecosystem. Now for a question that matters more every month: **which AI model should I actually use?**

Marketing says they're all amazing. Benchmarks say they're all getting better. But when you give a model a real analyst prompt — the kind your business actually runs — how does it perform? How fast is it? And compared to what?

Phase 06 gives you the answer. You're going to build a **Model Evaluation Lab** that takes 10 real analyst prompts from the Orchestrator AI prediction and risk system, runs them against 13 models (local Ollama + Anthropic API), has 4 different AI judges score the results, and shows you everything on a dashboard.

---

## What you're testing

### The models (13 contestants)

**Google Gemma 4 (local via Ollama):**
| Model | Active Params | Size |
|-------|---------------|------|
| `gemma4:e2b` | 2B | ~7 GB |
| `gemma4:e4b` | 4B | ~10 GB |
| `gemma4:26b` | 4B (MoE) | ~18 GB |
| `gemma4:31b` | 31B | ~19 GB |

**Qwen family (local via Ollama):**
| Model | Size |
|-------|------|
| `qwen3.5:latest` | 6.6 GB |
| `qwen3.5:9b` | 6.6 GB |
| `qwen3:8b` | 5.2 GB |
| `qwq:latest` | 19 GB |

**Others (local via Ollama):**
| Model | Size |
|-------|------|
| `deepseek-r1:latest` | 5.2 GB |
| `gpt-oss:20b` | 13 GB |
| `llama3.2:3b` | 2.0 GB |

**Anthropic API:**
| Model | Notes |
|-------|-------|
| `claude-haiku-4-5` | Speed benchmark |
| `claude-sonnet-4-6` | Quality ceiling |

### The judges (4)

| Judge | Source | Why |
|-------|--------|-----|
| `deepseek-r1:latest` | Ollama | Chain-of-thought reasoning |
| `gpt-oss:20b` | Ollama | Different training lineage |
| `qwq:latest` | Ollama | Reasoning specialist |
| `claude-sonnet-4-6` | Anthropic API | Quality ceiling |

Judges skip scoring their own responses. If all judges agree, high confidence. If they disagree, that's interesting data.

### The prompts (10 analyst-grade)

These aren't toy benchmarks. They're real prompts from the Orchestrator AI prediction and risk analysis system:

1. **Blue Team Risk Defender** — defend a risk score with evidence
2. **Red Team Risk Challenger** — find blind spots, propose alternative scenarios
3. **Arbiter Risk Synthesizer** — weigh competing arguments, recommend adjustment
4. **Dimension Risk Analyzer** — multi-source evidence weighing
5. **Executive Summary Generator** — portfolio synthesis, concise and actionable
6. **Learning Generator** — meta-analysis of prediction failures
7. **Missed Opportunity Analyst** — post-mortem on unpredicted market moves
8. **Prediction Synthesizer** — weigh competing analyst opinions
9. **Legal Document Classifier** — expert classification across 14 categories
10. **Task Decomposition** — break freeform requests into structured plans

---

## How judging works

### Round 1 — Screening (1-10)

Each judge scores each response on 4 criteria:

| Criteria | What it measures |
|----------|-----------------|
| **Accuracy** | Correct conclusions from the data? |
| **Reasoning** | Multi-step logic? Considered alternatives? |
| **Structure** | Followed required output format? Valid JSON? |
| **Insight** | Surfaced something non-obvious? |

Score = average of 4 criteria. Final Round 1 score = average across all judges.

### Round 2 — Weighted ranking (top 5)

Each judge sees the top 5 responses side-by-side and ranks them:

| Rank | Points |
|------|--------|
| 1st | 100 |
| 2nd | 70 |
| 3rd | 40 |
| 4th | 20 |
| 5th | 10 |

Final score = sum across judges. Max possible = 400 (all 4 judges rank you 1st).

### Speed metrics

Every generation captures **tokens per second** — because quality without speed is just a demo, and speed without quality is just noise. The dashboard shows both.

---

## The toolkit

### Skills — what the AI knows

| Skill | What it teaches |
|-------|----------------|
| **analyst-prompts** | The 10 analyst prompts with sample data and evaluation criteria |
| **ollama-integration** | Ollama REST API, token speed measurement, Anthropic SDK integration |
| **model-eval-design** | Scoring rubric, judge prompts, tournament system, dashboard layout |

### Agents — who does the work

| Agent | What it does |
|-------|-------------|
| **eval-harness-builder** | Builds the test runner — sends prompts to models, collects responses with timing, runs judge evaluations |
| **eval-dashboard-builder** | Builds the results dashboard — heatmap, speed charts, quality vs speed scatter, podium |

### Commands — what you type

Same pipeline:

```
/intention → /prd → /plan → /run-plan
```

---

## Let's do it

### Before you start

Make sure Ollama is running and your models are downloaded:

```bash
ollama list    # verify your models are available
```

### Step 1: Review the intention

```
/intention docs/artifacts/intention-model-eval.md
```

### Step 2: Generate the PRD

```
/prd docs/artifacts/intention-model-eval.md
```

### Step 3: Create the plan

```
/plan docs/artifacts/prd-model-eval.md
```

### Step 4: Build it

```
/run-plan docs/artifacts/plan-model-eval.md
```

### Step 5: Run the evaluation

This takes a while — 13 models × 10 prompts × 4 judges. Go get coffee.

### Step 6: Open the dashboard

See which models actually deliver on analyst-quality reasoning. Who wins? Does size matter? Is the MoE Gemma 4 the sweet spot?

---

## Quick reference

- **Intention file:** `docs/artifacts/intention-model-eval.md`
- **Skills:** `.claude/skills/analyst-prompts/`, `ollama-integration/`, `model-eval-design/`
- **Agents:** `.claude/agents/eval-harness-builder.md`, `eval-dashboard-builder.md`
- **Run order:** [RUN-ORDER.md](./RUN-ORDER.md)

---

## Why this matters

- **Phase 00** taught you the pipeline
- **Phase 01** taught you to build real apps
- **Phase 02** taught you to keep them healthy
- **Phase 03** taught you to understand any codebase
- **Phase 04** showed you agent protocols in action
- **Phase 05** connected you to the skill ecosystem
- **Phase 06** answers the question everyone's asking: **which model should I actually use for my work?** Not based on benchmarks — based on YOUR prompts, YOUR data, YOUR evaluation criteria. That's the kind of answer that changes decisions.
