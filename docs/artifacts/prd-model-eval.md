# PRD — Model Evaluation Lab

> **Source intention:** [intention-model-eval.md](./intention-model-eval.md)
> **App location:** `apps/model-eval/`

---

## 1. Goals

Traced from intention success criteria:

| # | Goal | Intention trace |
|---|------|-----------------|
| G1 | A user can configure and launch an evaluation from the dashboard in under 2 minutes | Success criterion 1 |
| G2 | Results fill in live as the harness runs — no waiting for everything to finish | Success criterion 2 |
| G3 | Looking at the dashboard, a user can immediately answer "Which model should I use for this task?" | Success criterion 3 |
| G4 | A shareable markdown report can be exported for the team | Success criterion 4 |
| G5 | Adding a new model (pull from Ollama, check the box) takes seconds | Success criterion 5 |

## 2. Non-goals

Traced from intention "Out of scope":

- **No real-time token streaming** — we capture full responses, not partial token display.
- **No cost tracking** per API call — interesting but not MVP.
- **No automated model downloading** — users pre-download via `ollama pull`.
- **No statistical significance testing** — visual comparison is sufficient.
- **No multi-GPU optimization** — standard Ollama execution.
- **No scheduled/recurring evaluations** — manual runs only.

## 3. User stories

### US-1: Discover available models
> As a technical decision-maker, I want to see all available models auto-discovered from my local Ollama installation plus any cloud providers I've configured, so I can decide which to test.

**Acceptance:** The Models tab queries `GET http://localhost:11434/api/tags` on load and renders every locally available model with a checkbox and a role toggle (Contestant / Judge / Both). If Ollama is not running, the tab shows a clear message: "Ollama not detected. Start Ollama to test local models." Cloud models appear in their own sections after the user enters an API key in the Config tab.

### US-2: Configure model sources
> As a user, I want to connect Anthropic and OpenRouter API keys so I can include cloud models alongside local ones.

**Acceptance:** The Config tab has input fields for Anthropic API key and OpenRouter API key. Keys are saved to a local config file (`apps/model-eval/data/config.json`) and never committed to git (path is in `.gitignore`). When a valid Anthropic key is entered, Claude Haiku 4.5, Claude Sonnet 4.6, and Claude Opus 4.6 appear in the Models tab. When a valid OpenRouter key is entered, a curated list of popular models (GPT-4o, Gemini Pro, Mistral Large, Command R+, etc.) appears, each selectable as Contestant and/or Judge.

### US-3: Select prompts for a run
> As a user, I want to pick which prompts to include in my evaluation run, grouped by tier, so I can focus on what matters.

**Acceptance:** The Prompts tab shows all 21 built-in prompts grouped under four collapsible tier headers (Quick Tasks, Tool Calling, Multimodal, Analyst). Each prompt has a checkbox, a name, and a one-line description. A "Select All" / "Deselect All" toggle exists per tier and globally. The current count of selected prompts is shown ("12 of 21 selected").

### US-4: Add custom prompts
> As a user, I want to add my own prompts so I can test models against tasks specific to my business.

**Acceptance:** The Prompts tab has an "Add Custom Prompt" button that opens a form with fields: name, prompt text (textarea), expected output format (textarea), evaluation criteria (textarea), and tier assignment (dropdown: Quick Task, Tool Calling, Multimodal, Analyst). Custom prompts are saved to `apps/model-eval/data/custom-prompts.json` and appear in the Prompts tab alongside built-in prompts, visually distinguished with a "Custom" badge. Custom prompts can be edited or deleted.

### US-5: Configure run parameters
> As a user, I want to adjust runs per prompt, timeout, scoring weights, and Round 2 settings so I can tune the evaluation to my needs.

**Acceptance:** The Config tab exposes:

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| Runs per prompt | 3 | 1-10 | How many times each model runs each prompt |
| Timeout per generation | 300s | 10-600s | Max seconds before a generation is marked as timed out |
| Accuracy weight | 0.25 | 0.0-1.0 | Weight for accuracy criterion in Round 1 scoring |
| Reasoning weight | 0.25 | 0.0-1.0 | Weight for reasoning criterion |
| Structure weight | 0.25 | 0.0-1.0 | Weight for structure criterion |
| Insight weight | 0.25 | 0.0-1.0 | Weight for insight criterion |
| Round 2 points | 100/70/40/20/10 | Editable per rank | Points assigned per rank position |
| Top N for Round 2 | 5 | 3-10 | How many models advance to Round 2 |

Weights are normalized to sum to 1.0. All settings persist in `data/config.json`.

### US-6: Run an evaluation
> As a user, I want to hit "Start Evaluation" and watch results fill in live on the dashboard.

**Acceptance:** Clicking "Start Evaluation" begins the harness in the background. The dashboard switches to the Results view. A progress bar shows "X of N generations complete" and updates after every generation. The heatmap fills in cell by cell: gray (pending) to blue pulsing (running) to green/yellow/red (scored). The harness writes to `data/results.json` after every single generation. The dashboard polls every 2-3 seconds and re-renders with new data.

### US-7: Pause and resume
> As a user, I want to pause a running evaluation and resume it later, picking up where I left off.

**Acceptance:** A "Pause" button appears during a run. Clicking it stops the harness after the current generation completes (does not abort mid-generation). State is saved to `data/run-state.json` including which (model, prompt, run) triples are complete. A "Resume" button appears on the dashboard when incomplete run state is detected. Resuming skips completed generations and continues from where it stopped.

### US-8: Run subsets
> As a user, I want to re-run just one tier, one model, or just the failures, without re-running everything.

**Acceptance:** The "Start Evaluation" button has a dropdown with options: "Run All," "Run Tier [1-4]," "Run Selected Models Only," "Re-run Failures." When running a subset, existing results for other cells are preserved. The progress bar reflects only the subset being run.

### US-9: View live results
> As a user, I want to see heatmap, speed chart, quality/speed scatter, consistency view, and Round 2 podium — all updating live.

**Acceptance:** The Results view contains five visualization sections:

1. **Heatmap** — Rows: models. Columns: prompts grouped by tier. Cells: average score (1-10) colored green (8-10), yellow (5-7), red (1-4). Toggle between Best/Average/Worst of N runs. Sortable by row average, any column, or model size. Cells with high variance (sigma >= 1.5) show a warning icon.
2. **Speed chart** — Bar chart, one bar per model, y-axis tokens/sec average, sorted descending, exact value annotated on each bar.
3. **Quality/Speed scatter** — X-axis: tokens/sec (log scale). Y-axis: average Round 1 score. Bubble size: approximate model parameters. Labels on each bubble.
4. **Consistency view** — Per-model reliability indicator after 3+ runs. Low variance (sigma < 0.5) green, medium (0.5-1.5) yellow, high (>= 1.5) red.
5. **Round 2 podium** — Appears after Round 1 completes. Top N models with weighted scores. 1st/2nd/3rd with podium visual. Per-judge scores and judge agreement percentage.

All five update live as results arrive.

### US-10: Drill down into a result
> As a user, I want to click any cell in the heatmap and see the full prompt, model response, judge scores, and commentary.

**Acceptance:** Clicking a heatmap cell opens a drilldown view showing: the full prompt text, the model's complete response (for each of the N runs), each judge's individual scores (accuracy, reasoning, structure, insight) with commentary, and speed metrics (tokens/sec, latency, total tokens) for each run.

### US-11: Export markdown report
> As a user, I want to export a markdown report summarizing the evaluation so I can share it with my team.

**Acceptance:** An "Export Report" button generates `docs/artifacts/model-eval-report.md` containing:
- Winner with one-line summary
- Leaderboard (all models ranked by average score)
- Best model per tier
- Speed tiers (>50 t/s, 20-50 t/s, <20 t/s)
- Judge agreement analysis
- Surprises (over/underperformers relative to parameter count)
- Recommendation ("Use X for quick tasks, Y for analyst work, Z for multimodal")

The report updates live alongside the dashboard during a run.

### US-12: Persist results across restarts
> As a user, I want my evaluation results saved so I don't lose them if I close the browser or restart the app.

**Acceptance:** All results are saved to `data/results.json` after every generation. On app load, if `results.json` exists, the dashboard renders the last run's data immediately. Intermediate per-model results are also saved to `data/intermediate/<model-tag>.json` so a crash mid-run doesn't lose completed work. Round 2 results are stored in `data/round2.json`.

## 4. Technical requirements

### 4A. Model sources

Three model providers, unified behind a single caller interface:

| Source | Discovery | Authentication | Models |
|--------|-----------|----------------|--------|
| **Ollama** (local) | Auto-discovered via `GET http://localhost:11434/api/tags` | None | Whatever the user has pulled locally |
| **Anthropic API** | Curated list shown when key is valid | `ANTHROPIC_API_KEY` in config or env | claude-haiku-4-5, claude-sonnet-4-6, claude-opus-4-6 |
| **OpenRouter** | Curated list shown when key is valid | `OPENROUTER_API_KEY` in config | GPT-4o, Gemini Pro, Mistral Large, Command R+, and others |

**Unified caller interface:**

```typescript
interface ModelConfig {
  name: string;           // Display name: "Gemma 4 Nano"
  provider: "ollama" | "anthropic" | "openrouter";
  model: string;          // "gemma4:e2b", "claude-haiku-4-5", "openai/gpt-4o"
  approxParams?: string;  // "2B", "26B", etc.
  role: "contestant" | "judge" | "both";
  supportsTools?: boolean;
  supportsImages?: boolean;
}

interface GenerationResult {
  model: string;
  response: string;
  tokensPerSecond: number;
  totalTokens: number;
  latencyMs: number;
  promptTokens?: number;
}
```

**Ollama speed:** `eval_count / (eval_duration / 1e9)` — pure generation speed from Ollama response metadata.

**Anthropic speed:** `output_tokens / (elapsedMs / 1000)` — wall-clock including network latency.

**OpenRouter speed:** `output_tokens / (elapsedMs / 1000)` — same wall-clock approach as Anthropic.

**Judge self-exclusion:** If a model is both contestant and judge, it does not judge its own responses. Scores from judge-models that are also contestants receive scores from N-1 judges; normalize accordingly.

### 4B. Prompt battery (21 built-in + custom)

#### Tier 1 — Quick Tasks (5 prompts, ~20-50 token responses)

Every model should handle these. Tests speed and basic competence. Timeout: 10 seconds.

| # | Prompt | Tests | Source |
|---|--------|-------|--------|
| 1 | Entity extraction from a paragraph | NER accuracy, JSON compliance | `quick-tasks` skill |
| 2 | Sentiment classification with confidence | Classification, calibration | `quick-tasks` skill |
| 3 | One-sentence summary (max 30 words) | Compression, key point retention | `quick-tasks` skill |
| 4 | Natural language to JSON | Structure compliance, correct types | `quick-tasks` skill |
| 5 | Code bug fix (off-by-one) | Code comprehension, explanation | `quick-tasks` skill |

#### Tier 2 — Tool Calling (3 prompts)

Tests structured function call generation. Models that cannot produce tool calls score 0 on structure. Timeout: 15 seconds.

| # | Prompt | Tests | Source |
|---|--------|-------|--------|
| 6 | Single tool call (get_weather) | Correct function name + params | `tool-calling-tests` skill |
| 7 | Multi-tool chain (flights + hotel) | Two calls, correct params, logical dates | `tool-calling-tests` skill |
| 8 | Tool selection (1 of 5 relevant) | Picks right tool, ignores distractors | `tool-calling-tests` skill |

Before running Tier 2, detect whether each model supports tool calling. If not, skip with a note rather than scoring 0 across the board. The harness must normalize tool call formats: Ollama returns `arguments` as an object; Anthropic returns `tool_use` content blocks; OpenRouter follows OpenAI format with JSON-string arguments.

#### Tier 3 — Multimodal (3 prompts)

Image + text tasks. Non-multimodal models skip these entirely. Timeout: 30 seconds.

| # | Prompt | Tests | Source |
|---|--------|-------|--------|
| 9 | Read a bar chart, identify top 3 | Visual comprehension, numeric accuracy | `multimodal-tests` skill |
| 10 | OCR a code screenshot | Text extraction, language identification | `multimodal-tests` skill |
| 11 | Critique a UI screenshot | Visual reasoning, issue identification | `multimodal-tests` skill |

Test images stored at `apps/model-eval/test-images/`. Created programmatically (chart.png from HTML canvas, code-screenshot.png from editor capture, ui-issues.png from mock HTML). The harness detects multimodal support: Ollama via `GET /api/show` (look for projector architecture); Anthropic Claude models support images via content blocks; Gemma 4 variants are multimodal; most Qwen/Llama/DeepSeek are text-only.

#### Tier 4 — Analyst (10 prompts)

Real prompts from Orchestrator AI. Deep reasoning, multi-step, structured JSON output. Timeout: 300 seconds.

| # | Prompt | Tests | Source |
|---|--------|-------|--------|
| 12 | Blue Team Risk Defender | Evidence marshaling, structured argument | `analyst-prompts` skill |
| 13 | Red Team Risk Challenger | Blind spot identification, critical thinking | `analyst-prompts` skill |
| 14 | Arbiter Risk Synthesizer | Balanced reasoning, conflict resolution | `analyst-prompts` skill |
| 15 | Dimension Risk Analyzer | Multi-source evidence synthesis | `analyst-prompts` skill |
| 16 | Executive Summary Generator | Portfolio reasoning, concise communication | `analyst-prompts` skill |
| 17 | Learning Generator | Meta-analysis, causal reasoning | `analyst-prompts` skill |
| 18 | Missed Opportunity Analyst | Counterfactual reasoning, signal identification | `analyst-prompts` skill |
| 19 | Prediction Synthesizer | Probabilistic reasoning, opinion aggregation | `analyst-prompts` skill |
| 20 | Legal Document Classifier | Multi-label classification, domain knowledge | `analyst-prompts` skill |
| 21 | Task Decomposition | Structured planning, dependency identification | `analyst-prompts` skill |

Each prompt includes full prompt text with sample data baked in, the expected JSON output format, and detailed evaluation criteria. See the `analyst-prompts` skill for complete prompt texts.

#### Custom prompts

Users add custom prompts via the UI (US-4). Custom prompts are saved to `data/custom-prompts.json` and treated identically to built-in prompts during evaluation runs.

### 4C. Scoring system

#### Multiple runs for consistency

Each model runs each prompt N times (configurable, default 3). This produces:

| Metric | What it tells you |
|--------|-------------------|
| Best of N | The model's ceiling — can it do this at all? |
| Average of N | Typical expected quality — what should I expect? |
| Worst of N | The model's floor — how bad can it get? |
| Consistency (std dev) | Reliability — low sigma (< 0.5) is green, medium (0.5-1.5) yellow, high (>= 1.5) red |

A model scoring 7, 7, 7 is more useful than one scoring 9, 3, 8.

#### Round 1 — Screening (scores 1-10)

Each judge evaluates each model's response on 4 weighted criteria:

| Criterion | What it measures | Default weight |
|-----------|-----------------|----------------|
| Accuracy | Correct conclusions from the data | 0.25 |
| Reasoning | Multi-step logic, considers alternatives | 0.25 |
| Structure | Follows required output format, valid JSON | 0.25 |
| Insight | Surfaces non-obvious findings | 0.25 |

Weights are configurable in the Config tab (US-5). The judge prompt template sends the original prompt, expected format, and model response to each judge and requires a JSON response with four 1-10 scores plus commentary.

**Scoring flow:**
1. For each (model, prompt) pair, collect the model's response.
2. Send response + prompt + expected format to each judge (excluding itself).
3. Each judge returns 4 scores (1-10) and commentary.
4. Per-judge score = weighted sum of the 4 criteria.
5. Final Round 1 score for (model, prompt) = average across all judges.

#### Round 2 — Weighted ranking (top N)

After Round 1 completes, the top N models (configurable, default 5) advance.

1. For each prompt, present all N responses side-by-side to each judge (identities anonymized as A-E to prevent name bias).
2. Each judge ranks them 1st through Nth.
3. Points per rank (configurable, default): 1st = 100, 2nd = 70, 3rd = 40, 4th = 20, 5th = 10.
4. Final Round 2 score = sum of points across all judges and all prompts.
5. The harness maps anonymous letters back to models after scoring.

### 4D. Live updating architecture

The harness and dashboard communicate through the filesystem:

```
apps/model-eval/data/
  config.json              # User settings (API keys, weights, runs-per-prompt)
  custom-prompts.json      # User-defined prompts
  results.json             # Complete results — written after EVERY generation
  run-state.json           # Pause/resume state — which triples are complete
  intermediate/
    <model-tag>.json       # Per-model intermediate results (crash recovery)
  round2.json              # Round 2 results (written after Round 2 completes)
```

**Write frequency:** The harness writes `results.json` after every single generation, not in batches. This enables live dashboard updating.

**Poll frequency:** The dashboard polls `results.json` every 2-3 seconds via a Next.js API route (or `fs.watch` in development) and re-renders affected components.

**Cell states in the heatmap:**
- Gray — pending (not yet run)
- Blue pulsing — currently running (harness has started this generation)
- Green (score 8-10) / Yellow (5-7) / Red (1-4) — scored

### 4E. App structure

```
apps/model-eval/
  src/
    app/
      page.tsx                  # Dashboard — tabs for Models, Prompts, Config, Results
      layout.tsx                # Dark theme shell
      api/
        models/route.ts         # GET: list Ollama + configured cloud models
        run/route.ts            # POST: start evaluation; GET: poll status
        results/route.ts        # GET: current results.json
        export/route.ts         # POST: generate markdown report
    components/
      models-tab.tsx            # Model discovery, role toggles, checkboxes
      prompts-tab.tsx           # Prompt list, tier grouping, custom prompt form
      config-tab.tsx            # Settings: runs, timeout, weights, API keys, Round 2
      results/
        heatmap.tsx             # Score heatmap with tier grouping
        speed-chart.tsx         # Bar chart — tokens/sec per model
        scatter.tsx             # Quality vs speed scatter plot
        consistency.tsx         # Variance indicators
        podium.tsx              # Round 2 top-N podium
        drilldown.tsx           # Full detail for one (model, prompt) cell
        progress-bar.tsx        # X of N generations complete
    lib/
      harness/
        runner.ts               # Main evaluation loop — iterates models x prompts x runs
        caller.ts               # Unified model caller (Ollama, Anthropic, OpenRouter)
        judge.ts                # Judge evaluation logic — Round 1 scoring
        round2.ts               # Round 2 ranking logic
        state.ts                # Pause/resume state management
      prompts/
        tier1.ts                # Quick Tasks prompt definitions
        tier2.ts                # Tool Calling prompt definitions
        tier3.ts                # Multimodal prompt definitions
        tier4.ts                # Analyst prompt definitions
        custom.ts               # Custom prompt loader
      utils/
        speed.ts                # Token speed calculation helpers
        normalize.ts            # Tool call format normalization
        multimodal.ts           # Multimodal capability detection
        report.ts               # Markdown report generator
  test-images/
    chart.png                   # Bar chart for Tier 3 prompt 1
    code-screenshot.png         # Code screenshot for Tier 3 prompt 2
    ui-issues.png               # UI critique target for Tier 3 prompt 3
  data/                         # .gitignored — runtime data
    config.json
    custom-prompts.json
    results.json
    run-state.json
    intermediate/
    round2.json
  package.json
  tailwind.config.ts
  tsconfig.json
```

### 4F. Error handling

| Scenario | Behavior |
|----------|----------|
| Ollama not running | Show "Ollama not detected" in Models tab. Cloud models still work. |
| Model not found in Ollama | Skip it, log a warning, continue with remaining models. |
| API key missing/invalid | Show inline error in Config tab. Disable that provider's models. |
| Generation timeout | Record as timed out (score 0), log latency, move to next. |
| Model doesn't support tools | Skip Tier 2 for that model with a "no tool support" note. |
| Model doesn't support images | Skip Tier 3 for that model with a "no multimodal" note. |
| Rate limiting (Anthropic/OpenRouter) | Exponential backoff with up to 3 retries. |
| Crash mid-run | Per-model intermediate files preserved. Resume picks up from last checkpoint. |
| Invalid JSON from judge | Retry once. If still invalid, log raw response, skip that judge score, note in results. |

### 4G. Technology stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS, dark theme |
| Charts | Recharts or Chart.js (bar chart, scatter plot) |
| Heatmap | Custom component with Tailwind grid + dynamic color classes |
| Markdown rendering | react-markdown with rehype plugins |
| Ollama communication | Direct fetch to localhost:11434 REST API |
| Anthropic communication | @anthropic-ai/sdk |
| OpenRouter communication | OpenAI-compatible SDK or direct fetch |
| Data persistence | JSON files in `data/` directory |
| Monorepo | Turborepo — `apps/model-eval/` |

## 5. Data model

```typescript
interface EvalRun {
  id: string;
  timestamp: string;
  durationMs: number;
  config: RunConfig;
  models: ModelConfig[];
  judges: ModelConfig[];
  prompts: PromptConfig[];
  results: EvalResult[];
  round2Results?: Round2Result[];
  status: "running" | "paused" | "complete";
  completedGenerations: number;
  totalGenerations: number;
}

interface RunConfig {
  runsPerPrompt: number;          // 1-10, default 3
  timeoutSeconds: number;         // 10-600, default 300
  weights: {
    accuracy: number;             // 0-1, default 0.25
    reasoning: number;
    structure: number;
    insight: number;
  };
  round2Points: number[];         // default [100, 70, 40, 20, 10]
  topNForRound2: number;          // default 5
}

interface ModelConfig {
  name: string;
  provider: "ollama" | "anthropic" | "openrouter";
  model: string;
  approxParams?: string;
  role: "contestant" | "judge" | "both";
  supportsTools?: boolean;
  supportsImages?: boolean;
}

interface PromptConfig {
  id: string;
  name: string;
  tier: 1 | 2 | 3 | 4;
  prompt: string;
  expectedFormat: string;
  evaluationCriteria: string;
  isCustom: boolean;
  tools?: object[];              // For Tier 2 tool-calling prompts
  image?: string;                // Base64 or path for Tier 3 multimodal prompts
}

interface EvalResult {
  model: string;
  prompt: string;
  tier: 1 | 2 | 3 | 4;
  runs: RunResult[];
  bestScore: number;
  avgScore: number;
  worstScore: number;
  consistency: number;           // Standard deviation across runs
  avgTokensPerSecond: number;
  skipped?: boolean;
  skipReason?: string;           // "no tool support", "no multimodal", "timed out"
}

interface RunResult {
  runIndex: number;
  response: string;
  tokensPerSecond: number;
  totalTokens: number;
  latencyMs: number;
  scores: JudgeScore[];
  averageScore: number;
}

interface JudgeScore {
  judge: string;
  accuracy: number;              // 1-10
  reasoning: number;
  structure: number;
  insight: number;
  commentary: string;
  weightedAverage: number;       // Weighted by user-configured criteria weights
}

interface Round2Result {
  model: string;
  totalPoints: number;
  perPrompt: {
    prompt: string;
    points: number;
    ranks: { judge: string; rank: number }[];
  }[];
}
```

## 6. Test expectations

### Unit tests

| Test | Validates |
|------|-----------|
| Ollama caller returns GenerationResult with speed metrics | Caller interface contract |
| Anthropic caller returns GenerationResult with speed metrics | Caller interface contract |
| OpenRouter caller returns GenerationResult with speed metrics | Caller interface contract |
| Tool call format normalization (Ollama object vs OpenAI string vs Anthropic tool_use) | Format parity |
| Judge scoring produces valid 1-10 scores per criterion | Scoring pipeline |
| Round 2 ranking produces correct point totals | Tournament logic |
| Weighted average uses configured weights | Config integration |
| Pause saves state; resume skips completed triples | State management |
| Multimodal detection correctly identifies capable models | Capability detection |
| Markdown report contains all required sections | Export completeness |

### Integration tests

| Test | Validates |
|------|-----------|
| Full run with 1 model, 1 prompt, 1 run produces valid results.json | End-to-end pipeline |
| Dashboard renders heatmap from a sample results.json | UI data binding |
| Drilldown shows correct response and judge scores for a cell | Navigation + data |
| Config changes persist and are used by the next run | Settings round-trip |
| Custom prompt appears in Prompts tab and is included in a run | Custom prompt flow |

### Demo-grade verification checklist

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
- [ ] Pause/resume works across browser close
- [ ] Anthropic models work when API key is provided
- [ ] OpenRouter models work when API key is provided
