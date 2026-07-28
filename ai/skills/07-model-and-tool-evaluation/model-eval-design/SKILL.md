---
user-invocable: false
name: model-eval-design
description: Scoring rubric, judge prompt design, two-round tournament system, and dashboard layout for the model evaluation lab.
category: model-eval
used-by-agents: eval-harness-builder, eval-dashboard-builder
---

# Model Evaluation Design

Scoring rubric, judge system, tournament structure, and dashboard layout for comparing 13 models across 21 prompts in 4 tiers, with 3 runs per prompt for consistency tracking.

---

## Models being tested (13)

### Ollama (local)

| Model | Tag | Approx Params |
|-------|-----|---------------|
| Gemma 4 Nano | `gemma4:e2b` | ~2B |
| Gemma 4 Small | `gemma4:e4b` | ~4B |
| Gemma 4 Medium | `gemma4:26b` | ~26B |
| Gemma 4 Large | `gemma4:31b` | ~31B |
| Qwen 3.5 Latest | `qwen3.5:latest` | varies |
| Qwen 3.5 9B | `qwen3.5:9b` | ~9B |
| Qwen 3 8B | `qwen3:8b` | ~8B |
| QwQ | `qwq:latest` | varies |
| DeepSeek R1 | `deepseek-r1:latest` | varies |
| GPT-OSS 20B | `gpt-oss:20b` | ~20B |
| Llama 3.2 3B | `llama3.2:3b` | ~3B |

### Anthropic API (cloud)

| Model | ID | Notes |
|-------|-----|-------|
| Claude Haiku 4.5 | `claude-haiku-4-5` | Fast, affordable |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` | High quality |

---

## Judges (4)

| Judge | Provider | Tag/ID |
|-------|----------|--------|
| DeepSeek R1 | Ollama | `deepseek-r1:latest` |
| GPT-OSS 20B | Ollama | `gpt-oss:20b` |
| QwQ | Ollama | `qwq:latest` |
| Claude Sonnet 4.6 | Anthropic | `claude-sonnet-4-6` |

**Rule: judges skip scoring their own responses.** If `deepseek-r1:latest` is both a test model and a judge, it does not judge its own output. This means responses from judge models receive scores from only 3 judges instead of 4. Normalize accordingly.

---

## Test Tiers (21 prompts total)

| Tier | Name | Prompts | Tests | Expected response |
|------|------|---------|-------|-------------------|
| 1 | Quick Tasks | 5 | Speed + basic competence | ~20-50 tokens |
| 2 | Tool Calling | 3 | Structured function calls | Valid tool call JSON |
| 3 | Multimodal | 3 | Image + text comprehension | ~50-100 tokens |
| 4 | Analyst | 10 | Deep reasoning, evidence weighing | ~200-500 tokens |

- **Tier 1** prompts from `quick-tasks` skill — every model should handle these
- **Tier 2** prompts from `tool-calling-tests` skill — models that can't do tool calls score 0 on structure
- **Tier 3** prompts from `multimodal-tests` skill — non-multimodal models skip these entirely
- **Tier 4** prompts from `analyst-prompts` skill — the real test of analytical reasoning

## Multiple Runs (3 per prompt per model)

Each model runs each prompt **3 times**. This captures:

- **Best of 3** — the model's ceiling (can it do this at all?)
- **Average of 3** — typical quality (what should I expect?)
- **Consistency (std dev)** — reliability indicator
  - Low variance (σ < 0.5) = reliable, highlight green
  - Medium variance (0.5 ≤ σ < 1.5) = acceptable, highlight yellow
  - High variance (σ ≥ 1.5) = unreliable, highlight red

A model scoring 7, 7, 7 is more useful than one scoring 9, 3, 8 — even with similar averages.

**Total generations:** 13 models × 21 prompts × 3 runs = **819 generations** (minus multimodal skips for non-multimodal models)

## Round 1 — Screening (scores 1-10)

Each judge evaluates each model's response to each prompt on 4 criteria:

### Scoring criteria

| Criterion | What it measures | 1 (worst) | 10 (best) |
|-----------|-----------------|-----------|-----------|
| **Accuracy** | Correct conclusions from the data | Wrong conclusions, hallucinated data | All conclusions supported by provided data |
| **Reasoning** | Multi-step logic, considers alternatives | No reasoning chain, single-step | Clear multi-step logic, addresses counterarguments |
| **Structure** | Follows required output format, valid JSON | Wrong format, invalid JSON | Perfect format compliance, all fields populated |
| **Insight** | Surfaces non-obvious findings | Only restates the input | Identifies patterns, risks, or connections not explicit in the data |

### Scoring process

1. For each `(model, prompt)` pair, collect the model's response
2. Send the response + prompt + expected format to each judge (except itself)
3. Each judge returns 4 scores (1-10) and commentary
4. Per-judge average = `(accuracy + reasoning + structure + insight) / 4`
5. Final Round 1 score for `(model, prompt)` = average across all judges' averages

### Judge prompt template (Round 1)

```
You are an expert evaluator assessing an AI model's response to an analyst prompt.

PROMPT THAT WAS GIVEN TO THE MODEL:
{prompt}

EXPECTED OUTPUT FORMAT:
{format}

MODEL'S RESPONSE:
{response}

Score this response on four criteria (1-10 each):

1. ACCURACY: Are the conclusions correct and supported by the provided data? Does it hallucinate facts not in the input?
2. REASONING: Does it show multi-step logic? Does it consider alternatives and counterarguments? Is the reasoning chain traceable?
3. STRUCTURE: Does it follow the required output format? Is the JSON valid and complete? Are all required fields present?
4. INSIGHT: Does it surface non-obvious findings? Does it go beyond restating the input to identify patterns, risks, or connections?

You MUST respond with valid JSON only, no other text:
{
  "accuracy": <1-10>,
  "reasoning": <1-10>,
  "structure": <1-10>,
  "insight": <1-10>,
  "commentary": "<2-3 sentences explaining your scores>"
}
```

---

## Round 2 — Weighted ranking (top 5 only)

After Round 1, take the top 5 models by average Round 1 score across all prompts.

### Ranking process

1. For each prompt, present all 5 responses side-by-side to each judge
2. Each judge ranks them 1st through 5th
3. Points assigned per rank:

| Rank | Points |
|------|--------|
| 1st | 100 |
| 2nd | 70 |
| 3rd | 40 |
| 4th | 20 |
| 5th | 10 |

4. Final Round 2 score per model = sum of points across all judges and all prompts
5. Maximum possible = 400 points per prompt (all 4 judges rank you 1st) x 10 prompts = 4000 total

### Judge prompt template (Round 2)

```
You are an expert evaluator comparing 5 AI model responses to the same analyst prompt.

PROMPT:
{prompt}

RESPONSE A ({model_a}):
{response_a}

RESPONSE B ({model_b}):
{response_b}

RESPONSE C ({model_c}):
{response_c}

RESPONSE D ({model_d}):
{response_d}

RESPONSE E ({model_e}):
{response_e}

Rank these responses from best (1st) to worst (5th). Consider accuracy, reasoning depth, output format compliance, and insight quality.

You MUST respond with valid JSON only, no other text:
{
  "ranking": [
    { "rank": 1, "model": "<model letter A-E>", "reasoning": "<why 1st>" },
    { "rank": 2, "model": "<model letter A-E>", "reasoning": "<why 2nd>" },
    { "rank": 3, "model": "<model letter A-E>", "reasoning": "<why 3rd>" },
    { "rank": 4, "model": "<model letter A-E>", "reasoning": "<why 4th>" },
    { "rank": 5, "model": "<model letter A-E>", "reasoning": "<why 5th>" }
  ],
  "commentary": "<overall comparison notes>"
}
```

Note: model identities are anonymized as A-E to prevent name bias. The harness maps letters back to models after scoring.

---

## Speed metrics

Capture tokens/sec for every generation (both test responses and judge evaluations).

### Ollama speed

```typescript
const tokensPerSecond = response.eval_count / (response.eval_duration / 1e9);
```

- `eval_count`: output tokens generated
- `eval_duration`: generation time in nanoseconds
- This is pure generation speed, excludes model loading

### Anthropic speed

```typescript
const tokensPerSecond = response.usage.output_tokens / (elapsedMs / 1000);
```

- `output_tokens`: from `response.usage`
- `elapsedMs`: wall clock from `Date.now()` before/after
- Includes network latency (this is the user-experienced speed)

### Speed data captured per generation

```typescript
{
  model: string;
  tokensPerSecond: number;
  totalTokens: number;      // output tokens
  latencyMs: number;         // wall clock time
  promptTokens?: number;     // input tokens (for cost estimation)
}
```

---

## Dashboard layout

The dashboard is a Next.js app at `apps/model-eval/` with a dark theme (Tailwind).

### Header

- Test run date and duration
- Number of models tested, prompts used, judges used
- Total generations (models x prompts + judge evaluations)
- Link to download raw results JSON

### Round 1 heatmap

- **Rows:** models (13)
- **Columns:** prompts (21, grouped by tier with tier headers)
- **Cells:** average score across judges and 3 runs (1-10)
- **Color:** green (8-10) -> yellow (5-7) -> red (1-4)
- **Row header:** model name + average score + consistency indicator
- **Column header:** prompt name (abbreviated), grouped under Tier 1/2/3/4
- **Toggle:** Best / Average / Worst of 3 runs
- **Tier filter:** show all tiers or focus on one
- Sortable by row average, any column, or model size
- Cells with high variance (σ ≥ 1.5) get a warning icon

### Speed chart

- **Bar chart:** one bar per model
- **Y-axis:** tokens/sec (average across all prompts)
- **Color:** same model colors as heatmap
- **Annotation:** show exact value on each bar
- **Sort:** by speed descending

### Quality vs Speed scatter

- **X-axis:** tokens/sec (log scale recommended for range)
- **Y-axis:** average Round 1 score (1-10)
- **Bubble size:** approximate model parameters (2B = small, 31B = large)
- **Labels:** model name on each bubble
- **Ideal zone:** top-right (fast AND good) — highlight or shade this quadrant
- This is the most important chart — it shows the quality/speed tradeoff at a glance

### Round 2 podium

- Top 5 models with their weighted scores
- Show 1st/2nd/3rd with podium visual styling
- For each model: final score, per-judge scores, judge agreement percentage
- Judge agreement = percentage of prompts where all judges agreed on the same rank

### Drilldown view

Click any cell in the heatmap to see:
- The full prompt text
- The model's complete response
- Each judge's individual scores and commentary
- Speed metrics for this specific generation

---

## Data model

```typescript
interface ModelConfig {
  name: string;           // Display name: "Gemma 4 Nano"
  provider: "ollama" | "anthropic";
  model: string;          // Tag: "gemma4:e2b" or "claude-haiku-4-5"
  approxParams?: string;  // "2B", "26B", etc.
  isJudge: boolean;
}

interface PromptConfig {
  id: string;             // "blue-team-risk-defender"
  name: string;           // "Blue Team Risk Defender"
  prompt: string;         // Full prompt text with sample data
  expectedFormat: string; // JSON schema description
  evaluationCriteria: string; // What makes good vs bad
}

interface EvalRun {
  id: string;
  timestamp: string;
  durationMs: number;
  models: ModelConfig[];
  judges: ModelConfig[];
  prompts: PromptConfig[];
  results: EvalResult[];
  round2Results?: Round2Result[];
}

interface EvalResult {
  model: string;          // Model name
  prompt: string;         // Prompt ID
  tier: 1 | 2 | 3 | 4;   // Which tier this prompt belongs to
  runs: RunResult[];      // 3 runs
  bestScore: number;      // Best of 3 runs
  avgScore: number;       // Average of 3 runs
  worstScore: number;     // Worst of 3 runs
  consistency: number;    // Standard deviation across runs
  avgTokensPerSecond: number; // Average speed across runs
  skipped?: boolean;      // True if model doesn't support this tier (e.g., multimodal)
}

interface RunResult {
  runIndex: number;       // 0, 1, 2
  response: string;       // Full model response
  tokensPerSecond: number;
  totalTokens: number;    // Output tokens
  latencyMs: number;
  scores: JudgeScore[];
  averageScore: number;   // Average across all judges for this run
}

interface JudgeScore {
  judge: string;          // Judge model name
  accuracy: number;       // 1-10
  reasoning: number;      // 1-10
  structure: number;      // 1-10
  insight: number;        // 1-10
  commentary: string;
  average: number;        // Mean of 4 criteria
}

interface Round2Result {
  model: string;
  totalPoints: number;    // Sum across all judges and prompts
  perPrompt: {
    prompt: string;
    points: number;       // Sum across judges for this prompt
    ranks: {
      judge: string;
      rank: number;       // 1-5
    }[];
  }[];
}
```

### File structure

```
apps/model-eval/
├── harness/
│   ├── src/
│   │   ├── index.ts          # Main runner
│   │   ├── models.ts         # Model configs
│   │   ├── prompts.ts        # Prompt configs (from analyst-prompts skill)
│   │   ├── caller.ts         # Ollama + Anthropic unified caller
│   │   ├── judge.ts          # Judge evaluation logic
│   │   └── round2.ts         # Round 2 ranking logic
│   ├── package.json
│   └── tsconfig.json
├── data/
│   └── results.json          # Output from harness
├── src/
│   └── app/
│       ├── page.tsx           # Dashboard main page
│       ├── layout.tsx
│       └── drilldown/
│           └── [model]/[prompt]/page.tsx
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

### Results file path

The harness writes to `apps/model-eval/data/results.json`. The dashboard reads from the same path. The harness also saves intermediate results after each model completes, so a crash doesn't lose everything:

```
apps/model-eval/data/
├── results.json              # Final complete results
├── intermediate/
│   ├── gemma4-e2b.json       # Per-model intermediate
│   ├── gemma4-e4b.json
│   └── ...
└── round2.json               # Round 2 results (separate file)
```
