# Plan — Model Evaluation Lab

> **Source PRD:** [prd-model-eval.md](./prd-model-eval.md)
> **Source intention:** [intention-model-eval.md](./intention-model-eval.md)
> **Skills:** [model-eval-design](../../.claude/skills/model-eval-design/SKILL.md), [ollama-integration](../../.claude/skills/ollama-integration/SKILL.md)
> **App location:** `apps/model-eval/`

---

## Architecture Decision: Single Next.js App with Embedded Harness

The evaluation harness runs inside the Next.js app as API routes, not as a separate process. This means:
- One app to start (`npm run dev` or `npm run build && npm start`)
- The harness writes to `data/` on the server side via API routes
- The dashboard reads from `data/` via API routes that poll the filesystem
- No separate CLI runner, no IPC — the API route IS the runner
- Results persist as JSON files in `apps/model-eval/data/` (gitignored)

---

## Milestone 1: App Scaffolding + Data Model

**Goal:** A working Next.js app shell with dark theme, shared types, data directory, and built-in prompt definitions loaded from the 4 tier skills.

### Files to create

| File | Purpose |
|------|---------|
| `apps/model-eval/package.json` | Dependencies: next, react, tailwindcss, @anthropic-ai/sdk, recharts, react-markdown |
| `apps/model-eval/tsconfig.json` | TypeScript config (strict, App Router paths) |
| `apps/model-eval/tailwind.config.ts` | Tailwind config with dark theme as default |
| `apps/model-eval/postcss.config.js` | PostCSS config for Tailwind |
| `apps/model-eval/next.config.js` | Next.js config (output: standalone if needed) |
| `apps/model-eval/.gitignore` | Ignore `data/` directory |
| `apps/model-eval/src/app/layout.tsx` | Root layout — dark bg, Inter font, nav tabs (Models, Prompts, Config, Results) |
| `apps/model-eval/src/app/page.tsx` | Landing page — redirects to or renders the Results tab |
| `apps/model-eval/src/lib/types.ts` | All shared types: `EvalRun`, `RunConfig`, `ModelConfig`, `PromptConfig`, `EvalResult`, `RunResult`, `JudgeScore`, `Round2Result`, `GenerationResult` |
| `apps/model-eval/src/lib/prompts/tier1.ts` | 5 Quick Task prompt definitions (entity extraction, sentiment, summary, NL-to-JSON, code bug fix) |
| `apps/model-eval/src/lib/prompts/tier2.ts` | 3 Tool Calling prompt definitions (single tool, multi-tool, tool selection) with tool schemas |
| `apps/model-eval/src/lib/prompts/tier3.ts` | 3 Multimodal prompt definitions (bar chart, code screenshot, UI critique) with image references |
| `apps/model-eval/src/lib/prompts/tier4.ts` | 10 Analyst prompt definitions (Blue Team through Task Decomposition) with full prompt text and sample data |
| `apps/model-eval/src/lib/prompts/index.ts` | Re-exports all tiers as a single `BUILT_IN_PROMPTS` array |
| `apps/model-eval/src/lib/prompts/custom.ts` | Load/save custom prompts from `data/custom-prompts.json` |
| `apps/model-eval/data/.gitkeep` | Placeholder so git tracks the directory structure |
| `apps/model-eval/test-images/chart.png` | Placeholder bar chart image for Tier 3 prompt 1 |
| `apps/model-eval/test-images/code-screenshot.png` | Placeholder code screenshot for Tier 3 prompt 2 |
| `apps/model-eval/test-images/ui-issues.png` | Placeholder UI screenshot for Tier 3 prompt 3 |

### Steps

1. Scaffold the Next.js app with `create-next-app` or manually create the files above.
2. Define all types in `src/lib/types.ts` matching the PRD Section 5 data model. Include the `GenerationResult` interface from the unified caller spec.
3. Implement the 4 tier prompt files. Each prompt must include: `id`, `name`, `tier`, `prompt` (full text with sample data baked in), `expectedFormat`, `evaluationCriteria`, `isCustom: false`. Tier 2 prompts include `tools` arrays. Tier 3 prompts include `image` paths.
4. Implement `prompts/custom.ts` with `loadCustomPrompts()` and `saveCustomPrompts()` that read/write `data/custom-prompts.json`.
5. Build the layout with a dark theme shell (slate-900 bg, slate-100 text) and a tab bar across the top.
6. Create placeholder test images (can be simple generated PNGs — a bar chart, a code block, a UI with obvious issues).
7. Register the app in the root `turbo.json` and `package.json` workspaces.

### Verification

- `cd apps/model-eval && npm run dev` starts on localhost without errors.
- The dark-themed shell renders with navigation tabs.
- Importing `BUILT_IN_PROMPTS` returns 21 prompt objects with all required fields.
- `npm run build` from the monorepo root succeeds.

---

## Milestone 2: Model Discovery + Configuration UI

**Goal:** Auto-discover Ollama models, configure API keys for Anthropic and OpenRouter, assign model roles.

### Files to create

| File | Purpose |
|------|---------|
| `apps/model-eval/src/app/api/models/ollama/route.ts` | GET: calls `http://localhost:11434/api/tags`, returns available models with metadata |
| `apps/model-eval/src/app/api/models/test/route.ts` | POST: sends a trivial prompt to a model, returns success/failure + latency |
| `apps/model-eval/src/app/api/config/route.ts` | GET: read `data/config.json`. POST: write `data/config.json` |
| `apps/model-eval/src/app/models/page.tsx` | Models page — auto-discovered Ollama models + API model sections |
| `apps/model-eval/src/app/config/page.tsx` | Config page — API keys, run params, scoring weights, Round 2 settings |
| `apps/model-eval/src/components/model-card.tsx` | Card for a single model: name, provider badge, params, role toggle (contestant/judge/both), checkbox |
| `apps/model-eval/src/components/api-key-input.tsx` | Secure input field for API keys with test/validate button |
| `apps/model-eval/src/lib/config.ts` | Load/save config from `data/config.json` — API keys, weights, runs-per-prompt, timeout, Round 2 settings |
| `apps/model-eval/src/lib/models/ollama-discovery.ts` | Fetch Ollama `/api/tags`, parse into `ModelConfig[]`, detect tool/multimodal support via `/api/show` |
| `apps/model-eval/src/lib/models/anthropic-models.ts` | Curated list of Anthropic models (Haiku 4.5, Sonnet 4.6, Opus 4.6) with capabilities |
| `apps/model-eval/src/lib/models/openrouter-models.ts` | Curated list of OpenRouter models (GPT-4o, Gemini Pro, Mistral Large, Command R+, etc.) with capabilities |

### Steps

1. Implement `ollama-discovery.ts`: call `GET /api/tags`, map each model to a `ModelConfig`. For each model, call `GET /api/show` to check for projector architecture (multimodal support) and tool calling capability.
2. Implement the curated model lists for Anthropic and OpenRouter. Each entry has hardcoded `supportsTools` and `supportsImages` flags.
3. Implement `config.ts` with `loadConfig()` and `saveConfig()`. Defaults: `runsPerPrompt: 3`, `timeoutSeconds: 300`, all weights `0.25`, `round2Points: [100, 70, 40, 20, 10]`, `topNForRound2: 5`.
4. Build the Models page: three sections (Ollama, Anthropic, OpenRouter). Ollama section auto-populates on load. Anthropic/OpenRouter sections appear when their API key is configured. Each model card shows a role toggle and select checkbox.
5. Build the Config page: API key inputs at the top (with test buttons), then run configuration (runs per prompt slider, timeout slider), then scoring weights (4 sliders that auto-normalize to 1.0), then Round 2 settings.
6. Build the API routes: `/api/models/ollama` wraps the discovery function; `/api/models/test` sends "Say hello" to a model and reports success/latency; `/api/config` reads/writes `data/config.json`.

### Verification

- With Ollama running, the Models page lists locally pulled models.
- With Ollama stopped, the Models page shows "Ollama not detected" and cloud sections still work.
- Entering a valid Anthropic API key and clicking Test shows success.
- Config changes persist across page refreshes (saved to `data/config.json`).
- Role toggles work: clicking Contestant/Judge/Both updates the model config.

---

## Milestone 3: Prompt Management UI

**Goal:** Browse, select, and manage prompts from the UI.

### Files to create

| File | Purpose |
|------|---------|
| `apps/model-eval/src/app/prompts/page.tsx` | Prompts page — 4 collapsible tier sections + custom prompts section |
| `apps/model-eval/src/components/prompt-tier-group.tsx` | Collapsible tier group: header with select all/none, list of prompt cards |
| `apps/model-eval/src/components/prompt-card.tsx` | Single prompt: checkbox, name, description, tier badge, custom badge if applicable |
| `apps/model-eval/src/components/custom-prompt-form.tsx` | Form: name, tier dropdown, prompt textarea, expected format textarea, evaluation criteria textarea |
| `apps/model-eval/src/app/api/prompts/route.ts` | GET: returns all prompts (built-in + custom). POST: save a custom prompt. DELETE: remove a custom prompt |
| `apps/model-eval/src/app/api/prompts/selection/route.ts` | GET/POST: load/save the current prompt selection (which prompts are checked) |

### Steps

1. Build the Prompts page layout: 4 tier sections (Quick Tasks, Tool Calling, Multimodal, Analyst) each collapsible, plus a Custom section at the bottom.
2. Each tier group has a header showing "Tier N — Name (X of Y selected)" with a Select All / Deselect All toggle.
3. Each prompt card shows: checkbox, name, one-line description (first sentence of `evaluationCriteria`), and the tier badge.
4. Global counter at the top: "12 of 21 selected".
5. "Add Custom Prompt" button opens the form. On save, writes to `data/custom-prompts.json` via the API route and the new prompt appears in the Custom section.
6. Custom prompts show an edit and delete button. Editing reopens the form pre-filled.
7. Prompt selection state (which checkboxes are checked) saves to `data/prompt-selection.json` so it persists across page loads.

### Verification

- All 21 built-in prompts render grouped under their correct tier.
- Select All / Deselect All toggles work per tier and globally.
- Adding a custom prompt persists across refresh.
- Editing and deleting custom prompts works.
- Selection state persists across page refresh.

---

## Milestone 4: Unified Model Caller

**Goal:** A single `callModel()` function that handles Ollama, Anthropic, and OpenRouter with unified output.

### Files to create

| File | Purpose |
|------|---------|
| `apps/model-eval/src/lib/harness/caller.ts` | Main `callModel()` — dispatches to provider-specific callers, returns `GenerationResult` |
| `apps/model-eval/src/lib/harness/callers/ollama.ts` | Ollama caller: POST `/api/chat`, captures `eval_count`/`eval_duration`, handles tool calls and images |
| `apps/model-eval/src/lib/harness/callers/anthropic.ts` | Anthropic caller: uses `@anthropic-ai/sdk`, captures `usage` + wall-clock timing, handles tool_use blocks and image content |
| `apps/model-eval/src/lib/harness/callers/openrouter.ts` | OpenRouter caller: OpenAI-compatible fetch, captures usage + timing, handles tool calls and images |
| `apps/model-eval/src/lib/utils/normalize.ts` | Normalize tool call formats across providers (Ollama object args, OpenAI JSON-string args, Anthropic tool_use blocks) |
| `apps/model-eval/src/lib/utils/multimodal.ts` | Detect multimodal support per model. Format image content per provider (Ollama base64 in message, Anthropic image content block, OpenRouter image_url) |
| `apps/model-eval/src/app/api/eval/call/route.ts` | POST: sends a single prompt to a single model, returns `GenerationResult`. Used for testing individual calls |

### Steps

1. Implement `callers/ollama.ts`:
   - POST to `http://localhost:11434/api/chat` with `stream: false`, `options: { num_predict: 4096 }`.
   - For tool-calling prompts, include `tools` array in the request body.
   - For multimodal prompts, include base64 image in the message content.
   - Calculate speed: `eval_count / (eval_duration / 1e9)`.
   - Handle timeout via `AbortController`.
2. Implement `callers/anthropic.ts`:
   - Use `@anthropic-ai/sdk` `messages.create()`.
   - For tool-calling prompts, include tool definitions in `tools` parameter.
   - For multimodal prompts, include image as base64 `source` in content array.
   - Calculate speed: `output_tokens / (elapsedMs / 1000)`.
   - Handle rate limiting with exponential backoff (up to 3 retries).
3. Implement `callers/openrouter.ts`:
   - Fetch to `https://openrouter.ai/api/v1/chat/completions` with OpenAI-compatible format.
   - Include `HTTP-Referer` and `X-Title` headers per OpenRouter requirements.
   - For tool-calling, use OpenAI-format tool definitions.
   - For multimodal, use `image_url` content type.
   - Calculate speed: `output_tokens / (elapsedMs / 1000)`.
   - Handle rate limiting with exponential backoff.
4. Implement `normalize.ts`: convert all tool call responses to a common `{ name, arguments: object }` format.
5. Implement `multimodal.ts`: `supportsImages(model)` check + `formatImageForProvider(provider, imagePath)` that returns the correct content block shape.
6. Implement `caller.ts`: dispatches based on `model.provider`, wraps with timeout from config, catches errors and returns error results rather than throwing.
7. Build the `/api/eval/call` route for single-call testing.

### Verification

- With Ollama running, calling an Ollama model returns a valid `GenerationResult` with `tokensPerSecond > 0`.
- With an Anthropic key, calling Claude returns a valid `GenerationResult`.
- Tool-calling prompts return normalized tool call objects regardless of provider.
- Timeout triggers after configured seconds and returns an error result.
- Rate-limited requests retry and eventually succeed (or fail gracefully after 3 attempts).

---

## Milestone 5: Evaluation Runner + Live Results

**Goal:** The core evaluation loop that runs models against prompts, writes results after every generation, and supports pause/resume.

### Files to create

| File | Purpose |
|------|---------|
| `apps/model-eval/src/lib/harness/runner.ts` | Main evaluation loop: iterates models x prompts x runs, writes results after each generation |
| `apps/model-eval/src/lib/harness/state.ts` | Pause/resume state management: tracks completed triples `(model, prompt, runIndex)`, saves to `data/run-state.json` |
| `apps/model-eval/src/lib/harness/results-writer.ts` | Reads/writes `data/results.json` and `data/intermediate/<model-tag>.json` atomically |
| `apps/model-eval/src/app/api/eval/start/route.ts` | POST: starts an evaluation run. Body includes selected models, prompts, config overrides |
| `apps/model-eval/src/app/api/eval/results/route.ts` | GET: returns current `data/results.json` contents |
| `apps/model-eval/src/app/api/eval/status/route.ts` | GET: returns current run status (running/paused/complete, progress counts) |
| `apps/model-eval/src/app/api/eval/pause/route.ts` | POST: sets pause flag — runner finishes current generation then stops |
| `apps/model-eval/src/app/api/eval/resume/route.ts` | POST: resumes a paused run from where it left off |

### Steps

1. Implement `state.ts`:
   - `RunState` tracks: `status` (running/paused/complete), `completedTriples` (set of `model:prompt:runIndex` strings), `currentModel`, `currentPrompt`, `currentRun`, `startedAt`, `pausedAt`.
   - `saveState()` writes to `data/run-state.json`.
   - `loadState()` reads and returns null if no state file.
   - `isComplete(model, prompt, runIndex)` checks the completed set.
   - `markComplete(model, prompt, runIndex)` adds to the set.
2. Implement `results-writer.ts`:
   - `readResults()`: load `data/results.json`, return empty `EvalRun` if not found.
   - `writeResults(evalRun)`: write `data/results.json` atomically (write to `.tmp`, rename).
   - `writeIntermediate(modelTag, results)`: write `data/intermediate/<model-tag>.json`.
   - `recoverFromIntermediate()`: rebuild `results.json` from intermediate files if main file is corrupt.
3. Implement `runner.ts`:
   - `startEvaluation(models, prompts, config)`: the main loop.
   - Loop order: for each model -> for each prompt -> for each run (1 to N).
   - Before each generation: check pause flag. If paused, save state and return.
   - Before each generation: check `isComplete()` — skip if already done (for resume).
   - Skip logic: if model lacks tool support, skip Tier 2 prompts with `skipReason: "no tool support"`. If model lacks multimodal, skip Tier 3 with `skipReason: "no multimodal"`.
   - After each generation: call the unified caller, update the `EvalResult` for this `(model, prompt)` pair, write `results.json`, write intermediate file, mark complete in state.
   - Update progress counters after each generation.
   - Store the runner instance in a module-level variable so the API routes can control it.
4. Build the API routes:
   - `POST /api/eval/start`: validates inputs, creates the `EvalRun` shell, starts the runner (non-blocking — the runner runs as a promise, not awaited by the route).
   - `GET /api/eval/results`: reads and returns `data/results.json`.
   - `GET /api/eval/status`: returns the runner's current status, progress, and current model/prompt.
   - `POST /api/eval/pause`: sets the runner's pause flag.
   - `POST /api/eval/resume`: clears the pause flag and resumes the loop.
5. Implement subset runs: the start route accepts an optional `subset` parameter: `"all"`, `"tier:1"`, `"tier:2"`, `"tier:3"`, `"tier:4"`, `"models:model1,model2"`, `"failures"`. The runner filters its iteration accordingly. Existing results for other cells are preserved.

### Verification

- Starting an evaluation with 1 model, 1 prompt, 1 run produces a valid `data/results.json`.
- `GET /api/eval/results` returns the results file contents.
- Progress updates: `completedGenerations` increments after each generation.
- Pausing stops the runner after the current generation completes. Resuming continues from where it stopped.
- A non-multimodal model skips Tier 3 prompts with `skipped: true` and `skipReason` set.
- Intermediate files are written per model. Crash recovery rebuilds results from intermediates.

---

## Milestone 6: Judge Evaluation

**Goal:** After contestant generations, judges score each response on 4 criteria. Handle self-skip and invalid JSON.

### Files to create

| File | Purpose |
|------|---------|
| `apps/model-eval/src/lib/harness/judge.ts` | Round 1 judge logic: send judge prompt, parse scores, handle self-skip |
| `apps/model-eval/src/lib/harness/round2.ts` | Round 2 ranking logic: anonymize, rank, assign points, de-anonymize |
| `apps/model-eval/src/lib/harness/judge-prompt.ts` | Judge prompt templates for Round 1 (per-response scoring) and Round 2 (comparative ranking) |

### Steps

1. Implement `judge-prompt.ts`:
   - `buildRound1JudgePrompt(prompt, expectedFormat, response)`: returns the Round 1 template from the model-eval-design skill with placeholders filled.
   - `buildRound2JudgePrompt(prompt, responses: { letter: string, response: string }[])`: returns the Round 2 template with anonymized responses.
2. Implement `judge.ts`:
   - `judgeResponse(judgeModel, contestantModel, prompt, response, config)`:
     - If `judgeModel.model === contestantModel.model`, skip (self-exclusion). Return null.
     - Build the Round 1 judge prompt.
     - Call the judge model using the unified caller.
     - Parse the JSON response. Extract `accuracy`, `reasoning`, `structure`, `insight`, `commentary`.
     - If JSON parse fails, retry once. If still invalid, log the raw response and return null.
     - Calculate `weightedAverage` using config weights.
     - Return a `JudgeScore`.
   - `judgeAllResponses(evalRun)`:
     - For each `EvalResult` in the run, for each `RunResult`, collect scores from all judges.
     - Update `RunResult.scores` and `RunResult.averageScore`.
     - Update `EvalResult.bestScore`, `avgScore`, `worstScore`, `consistency` (std dev).
     - Write results after each judge evaluation completes.
3. Implement `round2.ts`:
   - `runRound2(evalRun, config)`:
     - Select top N models by average Round 1 score.
     - For each prompt: anonymize the top N responses as A through E (shuffled to prevent position bias).
     - Send to each judge with the Round 2 prompt template.
     - Parse rankings. If invalid JSON, retry once.
     - Map anonymous letters back to models.
     - Assign points per rank position.
     - Aggregate into `Round2Result[]`.
     - Write to `data/round2.json`.
4. Integrate judging into the runner:
   - After all contestant generations complete for a prompt across all runs, trigger judge evaluation for that prompt.
   - Alternatively, batch judge evaluation: after ALL contestant generations are done, run all judges. (Simpler, and the dashboard shows "Judging..." phase.)
   - Write results after each judge evaluation.

### Verification

- A judge model produces valid `JudgeScore` objects with scores between 1-10 and non-empty commentary.
- Self-exclusion works: a model that is both contestant and judge does not judge its own response.
- Invalid JSON from a judge triggers one retry. If still invalid, that judge score is null and noted in results.
- Round 2 anonymization works: judge prompts use letters A-E, results are correctly de-anonymized.
- Round 2 point assignment matches configured point values.
- `data/round2.json` is written with correct `Round2Result` structure.

---

## Milestone 7: Dashboard — Heatmap + Live Updates

**Goal:** The main results view with a live-updating heatmap that shows evaluation progress.

### Files to create

| File | Purpose |
|------|---------|
| `apps/model-eval/src/app/results/page.tsx` | Results page — orchestrates all visualization components, polls for updates |
| `apps/model-eval/src/components/results/heatmap.tsx` | Heatmap grid: rows=models, cols=prompts grouped by tier, cells colored by score |
| `apps/model-eval/src/components/results/heatmap-cell.tsx` | Single heatmap cell: gray/blue-pulsing/green/yellow/red states, score text, variance warning |
| `apps/model-eval/src/components/results/progress-bar.tsx` | Progress bar: "X of N generations complete" with percentage |
| `apps/model-eval/src/components/results/tier-header.tsx` | Column group header for each tier in the heatmap |
| `apps/model-eval/src/components/results/run-toggle.tsx` | Toggle: Best / Average / Worst of N runs |
| `apps/model-eval/src/hooks/use-eval-results.ts` | Custom hook: polls `GET /api/eval/results` every 2-3 seconds, returns current `EvalRun` |
| `apps/model-eval/src/hooks/use-eval-status.ts` | Custom hook: polls `GET /api/eval/status` every 2 seconds, returns run status + progress |

### Steps

1. Implement `use-eval-results.ts`: polls every 2.5 seconds using `setInterval` + `fetch`. Returns `{ data: EvalRun | null, isLoading, error }`. Stops polling when status is "complete".
2. Implement `use-eval-status.ts`: polls every 2 seconds. Returns `{ status, completedGenerations, totalGenerations, currentModel, currentPrompt }`.
3. Build `progress-bar.tsx`: shows a progress bar with percentage, "X of N generations", and current model/prompt being evaluated.
4. Build `heatmap.tsx`:
   - Rows: one per model, sorted by average score (default) or sortable by any column, model size, or name.
   - Columns: prompts grouped by tier with tier headers spanning the columns.
   - Row header: model name, provider badge, average score, consistency indicator dot (green/yellow/red).
   - Each cell renders `heatmap-cell.tsx`.
5. Build `heatmap-cell.tsx`:
   - States: gray background (pending), blue with pulse animation (running), green/yellow/red (scored).
   - Score text centered in cell (shows avg score to 1 decimal).
   - High variance warning icon (sigma >= 1.5) in the corner.
   - Hover tooltip: "Best: X, Avg: Y, Worst: Z, sigma: W".
6. Build `run-toggle.tsx`: three buttons — Best / Average / Worst. Changes which score the heatmap cells display.
7. Build `results/page.tsx`: combines progress bar, run controls (Pause/Resume), run toggle, and heatmap. Renders the Start Evaluation button with subset dropdown when no run is active.

### Verification

- With a sample `results.json`, the heatmap renders all cells with correct colors.
- Gray cells appear for pending generations, scored cells show green/yellow/red.
- Toggling Best/Average/Worst changes displayed scores.
- Progress bar updates as new results arrive.
- High-variance cells show warning icons.
- Sorting by column/row average/model size works.

---

## Milestone 8: Dashboard — Speed + Scatter + Podium

**Goal:** Speed bar chart, quality vs speed scatter plot, and Round 2 podium visualization.

### Files to create

| File | Purpose |
|------|---------|
| `apps/model-eval/src/components/results/speed-chart.tsx` | Bar chart: one bar per model, y-axis = tokens/sec, sorted descending, value labels |
| `apps/model-eval/src/components/results/scatter.tsx` | Scatter plot: x=tokens/sec (log), y=avg score, bubble size=params, labels on each |
| `apps/model-eval/src/components/results/consistency.tsx` | Consistency view: per-model reliability indicators (green/yellow/red dots with sigma values) |
| `apps/model-eval/src/components/results/podium.tsx` | Round 2 podium: 1st/2nd/3rd visual + table for all top-N with per-judge scores |
| `apps/model-eval/src/components/results/tier-selector.tsx` | Dropdown to filter scatter plot by tier |

### Steps

1. Build `speed-chart.tsx` using Recharts `BarChart`:
   - One bar per model, sorted by tokens/sec descending.
   - Exact value annotated on each bar.
   - Color-coded by provider (Ollama blue, Anthropic purple, OpenRouter green).
   - Updates live as results arrive.
2. Build `scatter.tsx` using Recharts `ScatterChart`:
   - X-axis: tokens/sec with log scale.
   - Y-axis: average Round 1 score (1-10).
   - Bubble size mapped from `approxParams` (2B = small, 31B+ = large).
   - Label on each bubble with model name.
   - Highlight ideal zone (top-right quadrant: fast AND good).
   - Tier selector dropdown filters to show only scores from selected tier.
3. Build `consistency.tsx`:
   - Grid of model cards, each showing: model name, average sigma across all prompts, reliability badge (green < 0.5, yellow 0.5-1.5, red >= 1.5).
   - Only meaningful after 3+ runs per prompt.
4. Build `podium.tsx`:
   - Only renders after Round 2 data exists in results.
   - Top 3 with podium-style layout (2nd | 1st | 3rd, 1st tallest).
   - Table below showing all top-N models with: total points, per-judge scores, judge agreement percentage.
   - Judge agreement = percentage of prompts where all judges agreed on the same rank.
5. Add all charts to the Results page below the heatmap. Speed and scatter side by side, consistency below, podium at the bottom.

### Verification

- Speed chart renders bars for all models with correct values.
- Scatter plot shows bubbles at correct positions with size variation.
- Tier selector on scatter plot filters the scores shown.
- Consistency view shows correct sigma values and color coding.
- Podium renders after Round 2 with correct rankings and point totals.
- All charts update live as new results arrive.

---

## Milestone 9: Drilldown + Markdown Report

**Goal:** Cell drilldown showing full responses and judge commentary, side-by-side comparison, and markdown report generation.

### Files to create

| File | Purpose |
|------|---------|
| `apps/model-eval/src/components/results/drilldown.tsx` | Slide-over panel: full prompt, all N runs with responses, judge scores per run, speed metrics |
| `apps/model-eval/src/components/results/compare.tsx` | Side-by-side comparison: pick two models, see responses + scores for all prompts |
| `apps/model-eval/src/lib/utils/report.ts` | Generate markdown report from `EvalRun` data |
| `apps/model-eval/src/app/api/eval/report/route.ts` | POST: generates markdown report, writes to `docs/artifacts/model-eval-report.md`, returns content |

### Steps

1. Build `drilldown.tsx`:
   - Triggered by clicking any heatmap cell. Opens as a slide-over from the right.
   - Header: model name + prompt name + tier badge.
   - For each of the N runs: the full response text (in a scrollable code block), speed metrics (tokens/sec, latency, total tokens), and each judge's scores (accuracy, reasoning, structure, insight) with commentary.
   - Average scores across runs at the top.
   - Close button to return to the heatmap.
2. Build `compare.tsx`:
   - Two dropdowns to select models.
   - Shows a table: one row per prompt, columns for Model A response summary, Model A score, Model B response summary, Model B score, delta.
   - Click any row to expand and see full responses.
3. Implement `report.ts` — `generateReport(evalRun: EvalRun): string`:
   - Winner with one-line summary.
   - Leaderboard table: rank, model, avg score, avg speed, consistency.
   - Best model per tier (Tier 1 through 4).
   - Speed tiers: >50 t/s, 20-50 t/s, <20 t/s — list models in each.
   - Judge agreement analysis: how often judges agreed on rankings.
   - Surprises: models that outperformed or underperformed their parameter count.
   - Recommendations: "Use X for quick tasks, Y for analyst work, Z for multimodal."
4. Build the `/api/eval/report` route: calls `generateReport()`, writes to `docs/artifacts/model-eval-report.md`, returns the markdown string.
5. Add an "Export Report" button to the Results page that calls the report route and shows a success toast.

### Verification

- Clicking a heatmap cell opens the drilldown with correct data for that (model, prompt) pair.
- All N runs are shown with their individual scores and responses.
- Compare view correctly shows two models side-by-side.
- Generated markdown report contains all required sections (winner, leaderboard, per-tier best, speed tiers, recommendations).
- Report file is written to `docs/artifacts/model-eval-report.md`.

---

## Milestone 10: Polish

**Goal:** Production-quality UI — responsive, accessible, handles all edge cases gracefully.

### Files to create/modify

| File | Purpose |
|------|---------|
| `apps/model-eval/src/components/ui/empty-state.tsx` | Reusable empty state component with icon, message, and action button |
| `apps/model-eval/src/components/ui/error-boundary.tsx` | Error boundary wrapper with retry button |
| `apps/model-eval/src/components/ui/loading-skeleton.tsx` | Skeleton loaders for heatmap, charts, and cards |
| `apps/model-eval/src/components/ui/toast.tsx` | Toast notification component for success/error messages |
| Various existing files | Add responsive breakpoints, empty states, error handling, loading states |

### Steps

1. **Mobile responsive:**
   - Heatmap: horizontal scroll on mobile with sticky model name column.
   - Charts: stack vertically on mobile, reduce to full width.
   - Tabs: collapse to a hamburger menu or horizontal scroll on small screens.
   - Drilldown: full screen on mobile instead of slide-over.
2. **Error states:**
   - Wrap each major section in an error boundary with a retry button.
   - API route failures show inline error messages with details.
   - Network errors during polling show a subtle "Connection lost, retrying..." banner.
3. **Empty states:**
   - No models configured: "Add models to get started" with link to Models tab.
   - No prompts selected: "Select prompts to evaluate" with link to Prompts tab.
   - No results yet: "Run an evaluation to see results" with Start button.
   - No Round 2 yet: "Round 2 starts after Round 1 completes."
4. **Loading animations:**
   - Skeleton loaders for the heatmap grid, chart areas, and model cards while data loads.
   - Blue pulse animation on heatmap cells during active generation.
   - Spinner on the Start/Pause/Resume buttons while the action processes.
5. **Keyboard shortcuts:**
   - `Escape` to close drilldown/compare panels.
   - `Space` to pause/resume during a run.
   - `1-4` to filter by tier.
   - `/` to focus the search/filter input.
6. **Final verification pass:** run through the full demo-grade checklist from the PRD (Section 6) and fix any gaps.

### Verification

- All items on the PRD demo-grade verification checklist pass.
- The app looks good on mobile (375px width).
- All empty states render with helpful messages and action buttons.
- Error boundaries catch component crashes and show recovery UI.
- Loading skeletons appear before data arrives.
- Keyboard shortcuts work as documented.
- `npm run build` succeeds with no warnings.

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Ollama not installed on user's machine | Cannot test local models | Clear "Ollama not detected" message, cloud models still work |
| Large model generations are very slow (5+ minutes) | UI feels stuck during long runs | Progress bar with current model/prompt, configurable timeout, pause button |
| Judge JSON parsing fails frequently | Scores are missing | Retry once, then skip that judge with a note. Normalize lenient (strip markdown fences before parse) |
| Rate limiting on Anthropic/OpenRouter | Run stalls | Exponential backoff with 3 retries, skip after max retries with error note |
| `results.json` grows very large with many models/prompts/runs | Slow polling, large payloads | Only poll changed data (ETag/Last-Modified), consider pagination for very large runs |
| Concurrent browser tabs start multiple runs | Data corruption | Lock file or status check before starting — reject if a run is already active |

---

## Agent Assignments

All milestones are built by a single agent working within the `apps/model-eval/` app:

| Milestone | Primary Work |
|-----------|-------------|
| 1 | Scaffolding, types, prompt definitions |
| 2 | Ollama discovery, config UI, API key management |
| 3 | Prompt selection UI, custom prompts |
| 4 | Unified caller (Ollama + Anthropic + OpenRouter) |
| 5 | Evaluation runner loop, live results, pause/resume |
| 6 | Judge scoring (Round 1 + Round 2) |
| 7 | Heatmap + live updating dashboard |
| 8 | Speed chart, scatter plot, podium |
| 9 | Drilldown, comparison, markdown report |
| 10 | Polish, responsive, error/empty/loading states |
