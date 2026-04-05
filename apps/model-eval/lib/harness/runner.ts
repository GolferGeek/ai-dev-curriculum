/* ── Main evaluation runner — iterates models x prompts x runs ── */

import {
  ModelConfig,
  PromptConfig,
  RunConfig,
  EvalRun,
  EvalResult,
  RunResult,
  RunStatus,
} from "@/lib/types";
import { callModel } from "./caller";
import {
  RunState,
  saveState,
  loadState,
  isComplete,
  markComplete,
  isPaused,
  setPauseFlag,
} from "./state";
import { writeResults, writeIntermediate, readResults } from "./results-writer";
import { judgeAllResponses } from "./judge";
import { runRound2 } from "./round2";

/* ── Module-level singleton state ── */

let currentState: RunState | null = null;
let currentEvalRun: EvalRun | null = null;
let runPromise: Promise<void> | null = null;

/** Get current runner status for the status API route */
export function getRunnerStatus(): {
  status: RunStatus;
  completedGenerations: number;
  totalGenerations: number;
  currentModel: string;
  currentPrompt: string;
  currentRun: number;
} {
  if (!currentState) {
    // Check if there's a completed result on disk
    const existing = readResults();
    if (existing && existing.status === "complete") {
      return {
        status: "complete",
        completedGenerations: existing.completedGenerations,
        totalGenerations: existing.totalGenerations,
        currentModel: "",
        currentPrompt: "",
        currentRun: 0,
      };
    }

    return {
      status: "idle",
      completedGenerations: 0,
      totalGenerations: 0,
      currentModel: "",
      currentPrompt: "",
      currentRun: 0,
    };
  }

  return {
    status: currentState.status,
    completedGenerations: currentState.completedGenerations,
    totalGenerations: currentState.totalGenerations,
    currentModel: currentState.currentModel,
    currentPrompt: currentState.currentPrompt,
    currentRun: currentState.currentRun,
  };
}

/** Check if a run is active */
export function isRunning(): boolean {
  return currentState?.status === "running";
}

/** Pause the current run */
export function pauseRunner(): void {
  setPauseFlag(true);
  if (currentState) {
    currentState.status = "paused";
    currentState.pausedAt = new Date().toISOString();
    saveState(currentState);
  }
}

/** Resume a paused run */
export function resumeRunner(): void {
  if (!currentState || currentState.status !== "paused") return;
  if (!currentEvalRun) return;

  setPauseFlag(false);
  currentState.status = "running";
  currentState.pausedAt = undefined;
  saveState(currentState);

  // Re-enter the run loop
  runPromise = executeRunLoop(currentEvalRun, currentState);
}

/**
 * Start a new evaluation run.
 * Non-blocking: starts the runner as a promise, returns immediately.
 */
export function startEvaluation(
  models: ModelConfig[],
  prompts: PromptConfig[],
  config: RunConfig
): EvalRun {
  // Reject if already running
  if (currentState?.status === "running") {
    throw new Error("An evaluation is already running");
  }

  // Calculate total generations
  const contestants = models.filter(
    (m) => m.role === "contestant" || m.role === "both"
  );
  let totalGenerations = 0;
  for (const model of contestants) {
    for (const prompt of prompts) {
      if (prompt.tier === 3 && !model.supportsImages) continue;
      if (prompt.tier === 2 && !model.supportsTools) continue;
      totalGenerations += config.runsPerPrompt;
    }
  }

  // Create the EvalRun shell
  const evalRun: EvalRun = {
    id: `eval-${Date.now()}`,
    startedAt: new Date().toISOString(),
    status: "running",
    config,
    models,
    prompts,
    results: [],
    totalGenerations,
    completedGenerations: 0,
  };

  // Initialize state
  const existingState = loadState();
  currentState = existingState && existingState.status === "paused"
    ? existingState
    : {
        status: "running" as RunStatus,
        completedTriples: [],
        currentModel: "",
        currentPrompt: "",
        currentRun: 0,
        startedAt: new Date().toISOString(),
        totalGenerations,
        completedGenerations: 0,
      };

  currentState.status = "running";
  currentEvalRun = evalRun;
  setPauseFlag(false);

  // Write initial results
  writeResults(evalRun);
  saveState(currentState);

  // Start the run loop (non-blocking)
  runPromise = executeRunLoop(evalRun, currentState);

  return evalRun;
}

/**
 * The main evaluation loop.
 * Iterates: for each contestant model -> for each prompt -> for each run.
 */
async function executeRunLoop(evalRun: EvalRun, state: RunState): Promise<void> {
  const contestants = evalRun.models.filter(
    (m) => m.role === "contestant" || m.role === "both"
  );
  const judges = evalRun.models.filter(
    (m) => m.role === "judge" || m.role === "both"
  );
  const config = evalRun.config;

  try {
    for (const model of contestants) {
      if (isPaused()) break;

      const modelResults: EvalResult[] = [];

      for (const prompt of evalRun.prompts) {
        if (isPaused()) break;

        // Skip logic: missing capabilities
        const shouldSkip = shouldSkipPrompt(model, prompt);

        // Find or create the EvalResult for this (model, prompt) pair
        let evalResult = evalRun.results.find(
          (r) => r.modelId === model.id && r.promptId === prompt.id
        );
        if (!evalResult) {
          evalResult = {
            modelId: model.id,
            promptId: prompt.id,
            runs: [],
            bestScore: 0,
            avgScore: 0,
            worstScore: 0,
            consistency: 0,
            avgTokensPerSecond: 0,
          };
          evalRun.results.push(evalResult);
        }

        for (let runIndex = 0; runIndex < config.runsPerPrompt; runIndex++) {
          if (isPaused()) break;

          // Skip if already completed (resume support)
          if (isComplete(state, model.id, prompt.id, runIndex)) continue;

          // Update current progress in state
          state.currentModel = model.name;
          state.currentPrompt = prompt.name;
          state.currentRun = runIndex;

          if (shouldSkip) {
            // Record skipped run
            const skippedRun: RunResult = {
              runIndex,
              generation: {
                model: model.model,
                provider: model.provider,
                prompt: prompt.id,
                response: "",
                answerContent: "",
                isThinkingModel: false,
                tokensPerSecond: 0,
                totalTokens: 0,
                latencyMs: 0,
                timestamp: new Date().toISOString(),
              },
              scores: [],
              averageScore: 0,
              skipped: true,
              skipReason: skipReason(model, prompt),
            };
            evalResult.runs.push(skippedRun);
          } else {
            // Call the model
            const generation = await callModel(model, prompt, config);

            const runResult: RunResult = {
              runIndex,
              generation,
              scores: [],
              averageScore: 0,
              skipped: false,
            };
            evalResult.runs.push(runResult);

            // Update speed aggregates
            const validRuns = evalResult.runs.filter(
              (r) => !r.skipped && r.generation.tokensPerSecond > 0
            );
            evalResult.avgTokensPerSecond =
              validRuns.length > 0
                ? validRuns.reduce((sum, r) => sum + r.generation.tokensPerSecond, 0) /
                  validRuns.length
                : 0;
          }

          // Mark complete and write results
          markComplete(state, model.id, prompt.id, runIndex);
          evalRun.completedGenerations = state.completedGenerations;
          writeResults(evalRun);
          saveState(state);

          // Yield to event loop between generations
          await new Promise((r) => setTimeout(r, 0));
        }

        modelResults.push(evalResult);
      }

      // Write intermediate per-model results
      if (modelResults.length > 0) {
        writeIntermediate(model.model, modelResults);
      }
    }

    // After all contestant generations, run judging if judges are configured
    if (!isPaused() && judges.length > 0) {
      state.currentModel = "Judging...";
      state.currentPrompt = "";
      saveState(state);

      await judgeAllResponses(evalRun, judges, evalRun.prompts);
    }

    // After judging, run Round 2 if enough data
    if (!isPaused() && judges.length > 0) {
      state.currentModel = "Round 2...";
      state.currentPrompt = "";
      saveState(state);

      const round2Results = await runRound2(evalRun, judges, evalRun.prompts, config);
      if (round2Results.length > 0) {
        evalRun.round2Results = round2Results;
      }
    }

    // Mark complete
    if (!isPaused()) {
      evalRun.status = "complete";
      evalRun.completedAt = new Date().toISOString();
      state.status = "complete";
      writeResults(evalRun);
      saveState(state);
    }
  } catch (err) {
    console.error("Runner error:", err);
    evalRun.status = "paused";
    state.status = "paused";
    writeResults(evalRun);
    saveState(state);
  }
}

function shouldSkipPrompt(model: ModelConfig, prompt: PromptConfig): boolean {
  if (prompt.tier === 3 && !model.supportsImages) return true;
  if (prompt.tier === 2 && !model.supportsTools) return true;
  return false;
}

function skipReason(model: ModelConfig, prompt: PromptConfig): string {
  if (prompt.tier === 3 && !model.supportsImages) return "no multimodal support";
  if (prompt.tier === 2 && !model.supportsTools) return "no tool support";
  return "skipped";
}
