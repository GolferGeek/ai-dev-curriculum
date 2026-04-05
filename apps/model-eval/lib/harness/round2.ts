/* ── Round 2 comparative ranking — top N models head-to-head ── */

import {
  ModelConfig,
  PromptConfig,
  RunConfig,
  EvalRun,
  Round2Result,
} from "@/lib/types";
import { callModel } from "./caller";
import { buildRound2JudgePrompt } from "./judge-prompt";
import { isPaused } from "./state";

/**
 * Run Round 2: take top N models by avg Round 1 score,
 * have judges rank their responses head-to-head for each prompt.
 */
export async function runRound2(
  evalRun: EvalRun,
  judgeModels: ModelConfig[],
  prompts: PromptConfig[],
  config: RunConfig
): Promise<Round2Result[]> {
  const topN = config.round2TopN || 5;
  const pointValues = config.round2Points || [100, 70, 40, 20, 10];

  // Calculate average Round 1 scores per model
  const modelScores = new Map<string, { totalScore: number; count: number }>();
  for (const result of evalRun.results) {
    if (result.avgScore > 0) {
      const entry = modelScores.get(result.modelId) || { totalScore: 0, count: 0 };
      entry.totalScore += result.avgScore;
      entry.count++;
      modelScores.set(result.modelId, entry);
    }
  }

  // Sort by average and take top N
  const ranked = Array.from(modelScores.entries())
    .map(([modelId, { totalScore, count }]) => ({
      modelId,
      avgScore: totalScore / count,
    }))
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, topN);

  if (ranked.length < 2) {
    return []; // Need at least 2 models for comparison
  }

  // Initialize result tracking
  const round2Map = new Map<string, Round2Result>();
  for (const r of ranked) {
    round2Map.set(r.modelId, {
      modelId: r.modelId,
      totalPoints: 0,
      rankings: [],
    });
  }

  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  // For each prompt, collect best responses from top N models and have judges rank them
  for (const prompt of prompts) {
    if (isPaused()) break;

    // Collect best responses for this prompt from the top N models
    const modelResponses: { modelId: string; response: string; letter: string }[] = [];

    // Shuffle to prevent position bias
    const shuffledRanked = [...ranked].sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffledRanked.length && i < letters.length; i++) {
      const modelId = shuffledRanked[i].modelId;
      const evalResult = evalRun.results.find(
        (r) => r.modelId === modelId && r.promptId === prompt.id
      );

      if (!evalResult || evalResult.runs.length === 0) continue;

      // Use the best run's response
      const bestRun = evalResult.runs
        .filter((r) => !r.skipped)
        .sort((a, b) => b.averageScore - a.averageScore)[0];

      if (bestRun) {
        modelResponses.push({
          modelId,
          response: bestRun.generation.response,
          letter: letters[i],
        });
      }
    }

    if (modelResponses.length < 2) continue;

    // Have each judge rank the responses
    const promptRankings: Map<string, { judgeModel: string; rank: number }[]> = new Map();
    for (const mr of modelResponses) {
      promptRankings.set(mr.modelId, []);
    }

    for (const judge of judgeModels) {
      if (isPaused()) break;

      const ranking = await getRanking(
        judge,
        prompt,
        modelResponses.map((mr) => ({ letter: mr.letter, response: mr.response })),
        config
      );

      if (!ranking) continue;

      // Map letters back to models and assign points
      for (const entry of ranking) {
        const mr = modelResponses.find((m) => m.letter === entry.letter);
        if (!mr) continue;

        const judgeRankings = promptRankings.get(mr.modelId);
        if (judgeRankings) {
          judgeRankings.push({ judgeModel: judge.model, rank: entry.rank });
        }
      }

      // Yield to event loop
      await new Promise((r) => setTimeout(r, 0));
    }

    // Aggregate points for this prompt
    for (const mr of modelResponses) {
      const result = round2Map.get(mr.modelId);
      if (!result) continue;

      const judgeScores = promptRankings.get(mr.modelId) || [];
      let promptPoints = 0;

      for (const js of judgeScores) {
        const points = pointValues[js.rank - 1] || 0;
        promptPoints += points;
      }

      // Average rank across judges
      const avgRank =
        judgeScores.length > 0
          ? judgeScores.reduce((sum, js) => sum + js.rank, 0) / judgeScores.length
          : modelResponses.length;

      result.rankings.push({
        promptId: prompt.id,
        rank: Math.round(avgRank),
        points: promptPoints,
        judgeScores,
      });

      result.totalPoints += promptPoints;
    }
  }

  return Array.from(round2Map.values()).sort((a, b) => b.totalPoints - a.totalPoints);
}

/**
 * Get ranking from a single judge for a set of anonymized responses.
 * Returns null if parsing fails after retry.
 */
async function getRanking(
  judge: ModelConfig,
  prompt: PromptConfig,
  responses: { letter: string; response: string }[],
  config: RunConfig
): Promise<{ letter: string; rank: number }[] | null> {
  const judgePromptText = buildRound2JudgePrompt(prompt.prompt, responses);

  const judgePromptConfig: PromptConfig = {
    id: `round2-judge-${prompt.id}`,
    name: `Round 2 Judge: ${prompt.name}`,
    tier: 1,
    prompt: judgePromptText,
    expectedFormat: "JSON ranking",
    evaluationCriteria: "Valid JSON ranking",
    isCustom: false,
  };

  for (let attempt = 0; attempt < 2; attempt++) {
    const result = await callModel(judge, judgePromptConfig, config);
    if (result.error) {
      if (attempt === 0) continue;
      return null;
    }

    const parsed = parseRankingResponse(result.response, responses.map((r) => r.letter));
    if (parsed) return parsed;

    if (attempt === 0) continue;
  }

  return null;
}

/**
 * Parse a Round 2 ranking response, stripping markdown fences.
 */
function parseRankingResponse(
  raw: string,
  validLetters: string[]
): { letter: string; rank: number }[] | null {
  try {
    let cleaned = raw.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    const data = JSON.parse(cleaned);
    if (!data.ranking || !Array.isArray(data.ranking)) return null;

    const results: { letter: string; rank: number }[] = [];
    for (const entry of data.ranking) {
      const letter = String(entry.model).toUpperCase();
      const rank = Number(entry.rank);
      if (!validLetters.includes(letter) || !isFinite(rank) || rank < 1) continue;
      results.push({ letter, rank });
    }

    // Must have ranked all models
    if (results.length !== validLetters.length) return null;

    return results;
  } catch {
    return null;
  }
}
