---
user-invocable: false
name: model-eval-design
description: Scoring rubric, judge prompt design, two-round tournament system, speed metrics, and dashboard layout for the model evaluation lab.
category: model-eval
used-by-agents: eval-harness-builder, eval-dashboard-builder
---

# Model Evaluation Design

## Models Being Tested (13)

**Ollama (local):**
- gemma4:e2b, gemma4:e4b, gemma4:26b, gemma4:31b
- qwen3.5:latest, qwen3.5:9b, qwen3:8b, qwq:latest
- deepseek-r1:latest, gpt-oss:20b, llama3.2:3b

**Anthropic API:**
- claude-haiku-4-5, claude-sonnet-4-6

## Judges (4)

- deepseek-r1:latest (Ollama) — chain-of-thought reasoning
- gpt-oss:20b (Ollama) — different training lineage
- qwq:latest (Ollama) — reasoning specialist
- claude-sonnet-4-6 (Anthropic API) — quality ceiling

**Rule:** judges skip scoring their own responses.

## Round 1 — Screening (1-10)

Each judge scores each response on 4 criteria:

1. **Accuracy** (1-10) — correct conclusions from the data
2. **Reasoning** (1-10) — multi-step logic, considered alternatives
3. **Structure** (1-10) — followed required format, valid JSON if required
4. **Insight** (1-10) — surfaced something non-obvious

Score = average of 4 criteria. Final Round 1 score = average across all judges.

## Round 2 — Weighted Ranking (top 5)

Each judge sees all top 5 responses side-by-side and ranks them:

| Rank | Points |
|------|--------|
| 1st  | 100    |
| 2nd  | 70     |
| 3rd  | 40     |
| 4th  | 20     |
| 5th  | 10     |

Final score = sum across judges. Max = 400 (all 4 judges rank you 1st).

## Speed Metrics

Capture tokens/second for every generation:
- **Ollama:** `eval_count / (eval_duration / 1e9)` — both fields in the API response
- **Anthropic:** `response.usage.output_tokens / (elapsed_ms / 1000)`

## Judge Prompt Template

```
You are an expert evaluator assessing an AI model's response to an analyst prompt.

ORIGINAL PROMPT:
{prompt}

EXPECTED OUTPUT FORMAT:
{format}

MODEL'S RESPONSE:
{response}

Score this response on four criteria (1-10 each):

1. ACCURACY: Are the conclusions correct given the data? Are facts stated accurately?
2. REASONING: Does it show multi-step logic? Consider alternatives? Explain the "why"?
3. STRUCTURE: Does it follow the required output format? Is JSON valid? Are all required fields present?
4. INSIGHT: Does it surface something non-obvious? Go beyond restating the inputs?

Respond with JSON only:
{
  "accuracy": <1-10>,
  "reasoning": <1-10>,
  "structure": <1-10>,
  "insight": <1-10>,
  "commentary": "<2-3 sentences explaining your scores>"
}
```

## Round 2 Judge Prompt

```
You are ranking 5 AI model responses to the same analyst prompt.

ORIGINAL PROMPT:
{prompt}

RESPONSE A ({model_a}):
{response_a}

RESPONSE B ({model_b}):
{response_b}

... (C, D, E)

Rank these 5 responses from best (1st) to worst (5th).

Respond with JSON only:
{
  "rankings": [
    { "rank": 1, "model": "<model_id>", "reason": "<why 1st>" },
    { "rank": 2, "model": "<model_id>", "reason": "<why 2nd>" },
    { "rank": 3, "model": "<model_id>", "reason": "<why 3rd>" },
    { "rank": 4, "model": "<model_id>", "reason": "<why 4th>" },
    { "rank": 5, "model": "<model_id>", "reason": "<why 5th>" }
  ]
}
```

## Data Model

```typescript
interface EvalRun {
  id: string;
  timestamp: string;
  models: ModelConfig[];
  judges: ModelConfig[];
  prompts: PromptConfig[];
  results: EvalResult[];
  round2Results?: Round2Result[];
}

interface ModelConfig {
  id: string;
  name: string;
  source: 'ollama' | 'anthropic';
  sizeGB?: number;
  params?: string;
}

interface EvalResult {
  model: string;
  prompt: string;
  response: string;
  tokensPerSecond: number;
  totalTokens: number;
  latencyMs: number;
  scores: JudgeScore[];
  avgScore: number;
}

interface JudgeScore {
  judge: string;
  accuracy: number;
  reasoning: number;
  structure: number;
  insight: number;
  commentary: string;
  average: number;
}

interface Round2Result {
  model: string;
  prompt: string;
  rankings: { judge: string; rank: number; reason: string }[];
  totalPoints: number;
}
```

## Dashboard Layout

**Header:** eval run info (date, model count, prompt count, total evaluations)

**Tab 1 — Round 1 Heatmap:**
- Rows = models (sorted by avg score)
- Columns = prompts
- Cells = avg score (1-10), color green (high) to red (low)
- Row headers include tokens/sec

**Tab 2 — Speed:**
- Bar chart: tokens/sec per model
- Table: model, avg tokens/sec, avg latency, total tokens generated

**Tab 3 — Quality vs Speed:**
- Scatter plot: X = tokens/sec, Y = avg score
- Bubble size = model size (GB)
- Hover shows model name and exact values
- Quadrants labeled: "Fast & Good" (top-right), "Slow & Good" (top-left), "Fast & Weak" (bottom-right), "Slow & Weak" (bottom-left)

**Tab 4 — Round 2 Podium:**
- Top 5 models with weighted scores
- Per-judge rankings visible
- Agreement indicator (all judges agree vs split)

**Tab 5 — Drilldown:**
- Select model + prompt → see full response text
- See all judge scores + commentary for that response
- Compare side-by-side with another model's response
