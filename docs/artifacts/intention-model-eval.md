# Intention — Model Evaluation Lab

## Why

Every month there are new models. Marketing says they're all amazing. Benchmarks test toy problems. But when you give a model a real analyst prompt — the kind your business actually runs — how does it perform? How fast is it? And compared to what?

We need a tool that answers this with real data: take our actual analyst prompts, run them against every model we have access to (local Ollama + cloud API), have multiple AI judges score the outputs, and show the results on a dashboard. This is how you make model selection decisions — not from blog posts, from your own evaluation.

## Who

- **Primary:** Technical decision-makers choosing which models to deploy
- **Secondary:** Learners understanding model capabilities and trade-offs
- **Tertiary:** The Orchestrator AI team evaluating models for risk analysis

## What we're building

A **Model Evaluation Lab** (`apps/model-eval/`) with three components:

### 1. The prompts (10 analyst-grade)

Real prompts from the Orchestrator AI prediction and risk analysis system, each with sample data baked in so they run standalone:

| # | Prompt | Analysis Type | Tests |
|---|--------|--------------|-------|
| 1 | Blue Team Risk Defender | Adversarial defense | Evidence marshaling, structured argument |
| 2 | Red Team Risk Challenger | Adversarial attack | Finding blind spots, alternative scenarios |
| 3 | Arbiter Risk Synthesizer | Multi-perspective synthesis | Weighing arguments, score adjustment |
| 4 | Dimension Risk Analyzer | Multi-source evidence weighing | Integrating news + predictions into scored assessment |
| 5 | Executive Summary Generator | Portfolio synthesis | Concise writing, actionable recommendations |
| 6 | Learning Generator | Meta-analysis | Pattern recognition from prediction failures |
| 7 | Missed Opportunity Analyst | Post-mortem | Root cause analysis, signal gap identification |
| 8 | Prediction Synthesizer | Competing opinion arbitration | Weighing confidence levels, making a call |
| 9 | Legal Document Classifier | Expert classification | Structured taxonomy, confidence scoring |
| 10 | Task Decomposition | Requirement analysis | Breaking freeform text into structured plans |

### 2. The models

**Being tested (13):**

| Model | Size | Source | Family |
|-------|------|--------|--------|
| gemma4:e2b | ~7 GB | Ollama | Google Gemma 4 |
| gemma4:e4b | ~10 GB | Ollama | Google Gemma 4 |
| gemma4:26b | ~18 GB | Ollama | Google Gemma 4 (MoE) |
| gemma4:31b | 19 GB | Ollama | Google Gemma 4 |
| qwen3.5:latest | 6.6 GB | Ollama | Alibaba Qwen 3.5 |
| qwen3.5:9b | 6.6 GB | Ollama | Alibaba Qwen 3.5 |
| qwen3:8b | 5.2 GB | Ollama | Alibaba Qwen 3 |
| qwq:latest | 19 GB | Ollama | Alibaba QwQ reasoning |
| deepseek-r1:latest | 5.2 GB | Ollama | DeepSeek reasoning |
| gpt-oss:20b | 13 GB | Ollama | GPT open source |
| llama3.2:3b | 2.0 GB | Ollama | Meta Llama |
| claude-haiku-4-5 | — | Anthropic API | Anthropic |
| claude-sonnet-4-6 | — | Anthropic API | Anthropic |

**Judges (4):**

| Judge | Source | Why |
|-------|--------|-----|
| deepseek-r1:latest | Ollama | Chain-of-thought evaluator |
| gpt-oss:20b | Ollama | Different training lineage |
| qwq:latest | Ollama | Reasoning specialist |
| claude-sonnet-4-6 | Anthropic API | Quality ceiling |

Judges skip scoring their own responses.

### 3. The tournament

**Round 1 — Screening (1-10):**

Each judge scores each response on 4 criteria:
- **Accuracy** — correct conclusions from the data
- **Reasoning** — multi-step logic, considered alternatives
- **Structure** — followed required format, valid JSON
- **Insight** — surfaced something non-obvious

Score = average of 4 criteria. Final Round 1 score = average across judges.

**Round 2 — Weighted ranking (top 5):**

Each judge sees all 5 responses side-by-side and ranks them:
- 1st = 100 points
- 2nd = 70 points
- 3rd = 40 points
- 4th = 20 points
- 5th = 10 points

Final score = sum across judges. Max = 400.

**Speed metrics:**
- Every generation captures **tokens/second**
- Ollama: `eval_count / (eval_duration / 1e9)` from response
- Anthropic: `output_tokens / elapsed_seconds`

### 4. The dashboard

- **Round 1 heatmap:** rows=models, cols=prompts, cells=avg score, color-coded
- **Speed chart:** bar chart of tokens/sec per model
- **Quality vs Speed scatter:** X=tokens/sec, Y=avg score, bubble size=model params
- **Round 2 podium:** top 5 with weighted scores and judge agreement/disagreement
- **Drilldown:** click any cell to see the actual response + judge commentary

## Demo-grade minimums

- [ ] Harness sends prompts to at least 5 models and gets responses
- [ ] Token speed is captured for every generation
- [ ] At least 2 judges score the responses
- [ ] Round 1 heatmap shows scores across models × prompts
- [ ] Speed chart shows tokens/sec comparison
- [ ] Quality vs Speed scatter plot works
- [ ] Round 2 ranking produces a clear winner
- [ ] Drilldown shows actual model responses with judge commentary
- [ ] Results are saved to JSON (survives restart)

## Out of scope

- Real-time streaming of model responses (batch is fine)
- Cost tracking for API models (interesting but not MVP)
- Automated model downloading (user pre-downloads via `ollama pull`)
- Statistical significance testing (visual comparison is sufficient)
- Multi-GPU optimization

## Success criteria

1. Looking at the dashboard, you can immediately answer: "Which model gives the best analyst-quality responses?"
2. You can see the speed trade-off: "This model is 80% as good but 3x faster"
3. You can drill into any result and read exactly what the model said and what the judges thought
4. Running a new evaluation (adding a model or prompt) takes minutes, not hours of setup
