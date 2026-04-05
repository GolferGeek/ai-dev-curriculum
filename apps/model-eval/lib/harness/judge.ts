/* ── Round 1 judge logic — score individual responses ── */

import {
  ModelConfig,
  PromptConfig,
  RunConfig,
  JudgeScore,
  EvalRun,
  EvalResult,
  RunResult,
} from "@/lib/types";
import { callModel } from "./caller";
import { buildRound1JudgePrompt } from "./judge-prompt";
import { writeResults } from "./results-writer";
import { isPaused } from "./state";

/**
 * Judge a single response from a contestant model.
 * Returns null if self-judging or if JSON parsing fails after retry.
 */
export async function judgeResponse(
  judgeModel: ModelConfig,
  contestantModel: ModelConfig,
  prompt: PromptConfig,
  response: string,
  config: RunConfig
): Promise<JudgeScore | null> {
  // Self-exclusion: a model does not judge its own output
  if (judgeModel.model === contestantModel.model) {
    return null;
  }

  const judgePromptText = buildRound1JudgePrompt(
    prompt.prompt,
    prompt.expectedFormat,
    response
  );

  const judgePromptConfig: PromptConfig = {
    id: `judge-${prompt.id}`,
    name: `Judge: ${prompt.name}`,
    tier: 1,
    prompt: judgePromptText,
    expectedFormat: "JSON with accuracy, reasoning, structure, insight, commentary",
    evaluationCriteria: "Valid JSON scores",
    isCustom: false,
  };

  // Attempt up to 2 times (initial + 1 retry)
  for (let attempt = 0; attempt < 2; attempt++) {
    const result = await callModel(judgeModel, judgePromptConfig, config);

    if (result.error) {
      if (attempt === 0) continue; // retry once
      return null;
    }

    const parsed = parseJudgeResponse(result.response);
    if (parsed) {
      const weightedAverage =
        parsed.accuracy * config.weights.accuracy +
        parsed.reasoning * config.weights.reasoning +
        parsed.structure * config.weights.structure +
        parsed.insight * config.weights.insight;

      return {
        judgeModel: judgeModel.model,
        accuracy: parsed.accuracy,
        reasoning: parsed.reasoning,
        structure: parsed.structure,
        insight: parsed.insight,
        weightedAverage,
        commentary: parsed.commentary || "",
      };
    }

    // If first attempt failed to parse, retry
    if (attempt === 0) continue;
  }

  return null;
}

/**
 * Parse a judge response, stripping markdown fences if present.
 */
function parseJudgeResponse(
  raw: string
): {
  accuracy: number;
  reasoning: number;
  structure: number;
  insight: number;
  commentary: string;
} | null {
  try {
    // Strip markdown code fences
    let cleaned = raw.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    const data = JSON.parse(cleaned);

    // Validate scores are numbers in range
    const accuracy = clampScore(data.accuracy);
    const reasoning = clampScore(data.reasoning);
    const structure = clampScore(data.structure);
    const insight = clampScore(data.insight);

    if (accuracy === null || reasoning === null || structure === null || insight === null) {
      return null;
    }

    return {
      accuracy,
      reasoning,
      structure,
      insight,
      commentary: String(data.commentary || ""),
    };
  } catch {
    return null;
  }
}

function clampScore(value: unknown): number | null {
  const n = Number(value);
  if (!isFinite(n)) return null;
  return Math.max(1, Math.min(10, Math.round(n)));
}

/**
 * Judge all responses in an EvalRun after contestant generations complete.
 * Writes results incrementally after each judge evaluation.
 */
export async function judgeAllResponses(
  evalRun: EvalRun,
  judgeModels: ModelConfig[],
  prompts: PromptConfig[]
): Promise<void> {
  for (const evalResult of evalRun.results) {
    if (isPaused()) return;

    const prompt = prompts.find((p) => p.id === evalResult.promptId);
    if (!prompt) continue;

    const contestantModel = evalRun.models.find((m) => m.id === evalResult.modelId);
    if (!contestantModel) continue;

    for (const run of evalResult.runs) {
      if (isPaused()) return;
      if (run.skipped) continue;
      if (run.scores.length > 0) continue; // already judged

      const scores: JudgeScore[] = [];

      for (const judge of judgeModels) {
        if (isPaused()) return;

        const score = await judgeResponse(
          judge,
          contestantModel,
          prompt,
          run.generation.response,
          evalRun.config
        );

        if (score) {
          scores.push(score);
        }

        // Yield to event loop
        await new Promise((r) => setTimeout(r, 0));
      }

      run.scores = scores;
      run.averageScore =
        scores.length > 0
          ? scores.reduce((sum, s) => sum + s.weightedAverage, 0) / scores.length
          : 0;
    }

    // Update aggregate stats for this eval result
    updateEvalResultAggregates(evalResult);

    // Write after each (model, prompt) pair is fully judged
    writeResults(evalRun);
  }
}

/**
 * Update bestScore, avgScore, worstScore, consistency for an EvalResult
 * after its runs have been judged.
 */
export function updateEvalResultAggregates(evalResult: EvalResult): void {
  const scoredRuns = evalResult.runs.filter((r) => !r.skipped && r.scores.length > 0);
  if (scoredRuns.length === 0) return;

  const runScores = scoredRuns.map((r) => r.averageScore);
  evalResult.bestScore = Math.max(...runScores);
  evalResult.worstScore = Math.min(...runScores);
  evalResult.avgScore = runScores.reduce((a, b) => a + b, 0) / runScores.length;

  // Standard deviation
  const mean = evalResult.avgScore;
  const variance =
    runScores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / runScores.length;
  evalResult.consistency = Math.sqrt(variance);
}
