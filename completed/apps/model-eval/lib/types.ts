/* ── Model Evaluation Lab — shared types ── */

export type ModelProvider = "ollama" | "anthropic" | "openrouter";
export type ModelRole = "contestant" | "judge" | "both";
export type RunStatus = "idle" | "running" | "paused" | "complete";
export type PromptTier = 1 | 2 | 3 | 4;

/* ── Model configuration ── */

export interface ModelConfig {
  id: string;
  name: string;
  provider: ModelProvider;
  model: string; // actual model identifier sent to the API
  role: ModelRole;
  selected: boolean;
  supportsTools: boolean;
  supportsImages: boolean;
  approxParams?: string; // e.g. "7B", "70B"
  size?: number; // bytes
  modifiedAt?: string;
}

/* ── Prompt configuration ── */

export interface PromptConfig {
  id: string;
  name: string;
  tier: PromptTier;
  prompt: string;
  expectedFormat: string;
  evaluationCriteria: string;
  isCustom: boolean;
  tools?: ToolDefinition[];
  image?: string; // path to test image for Tier 3
}

export interface ToolDefinition {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

/* ── Run configuration ── */

export interface RunConfig {
  runsPerPrompt: number;
  timeoutSeconds: number;
  weights: {
    accuracy: number;
    reasoning: number;
    structure: number;
    insight: number;
  };
  round2TopN: number;
  round2Points: number[];
  anthropicApiKey?: string;
  openrouterApiKey?: string;
}

/* ── Generation result (single call) ── */

export interface GenerationResult {
  model: string;
  provider: ModelProvider;
  prompt: string;
  response: string; // full response including thinking
  answerContent: string; // just the answer (post-thinking)
  thinkingContent?: string; // the thinking/reasoning block (if present)
  isThinkingModel: boolean; // did this response contain thinking markers?

  // Total metrics (thinking + answer combined)
  tokensPerSecond: number;
  totalTokens: number;
  latencyMs: number;

  // Thinking metrics (reasoning phase only)
  thinkingTokens?: number;
  thinkingTokensPerSecond?: number;
  thinkingDurationMs?: number;

  // Answer metrics (useful output only)
  answerTokens?: number;
  answerTokensPerSecond?: number;
  answerDurationMs?: number;

  error?: string;
  toolCalls?: NormalizedToolCall[];
  timestamp: string;
}

export interface NormalizedToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

/* ── Judge scores ── */

export interface JudgeScore {
  judgeModel: string;
  accuracy: number; // 1-10
  reasoning: number; // 1-10
  structure: number; // 1-10
  insight: number; // 1-10
  weightedAverage: number;
  commentary: string;
}

/* ── Per-run result (one model + one prompt + one run index) ── */

export interface RunResult {
  runIndex: number;
  generation: GenerationResult;
  scores: JudgeScore[];
  averageScore: number;
  skipped: boolean;
  skipReason?: string;
}

/* ── Aggregate result (one model + one prompt, across all runs) ── */

export interface EvalResult {
  modelId: string;
  promptId: string;
  runs: RunResult[];
  bestScore: number;
  avgScore: number;
  worstScore: number;
  consistency: number; // standard deviation
  avgTokensPerSecond: number;
}

/* ── Round 2 comparative ranking ── */

export interface Round2Result {
  modelId: string;
  totalPoints: number;
  rankings: {
    promptId: string;
    rank: number;
    points: number;
    judgeScores: { judgeModel: string; rank: number }[];
  }[];
}

/* ── Top-level eval run ── */

export interface EvalRun {
  id: string;
  startedAt: string;
  completedAt?: string;
  status: RunStatus;
  config: RunConfig;
  models: ModelConfig[];
  prompts: PromptConfig[];
  results: EvalResult[];
  round2Results?: Round2Result[];
  totalGenerations: number;
  completedGenerations: number;
}
