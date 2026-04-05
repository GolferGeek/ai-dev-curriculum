"use client";

import { useMemo, useState } from "react";
import type { EvalRun, EvalResult, PromptTier } from "@/lib/types";
import { TIER_NAMES } from "@/lib/prompts";

type ScoreMode = "best" | "average" | "worst";

interface HeatmapProps {
  evalRun: EvalRun;
  onCellClick: (modelId: string, promptId: string) => void;
  currentModel?: string | null;
  currentPrompt?: string | null;
  isRunning: boolean;
}

function getCellColor(score: number | null, isActive: boolean, isPending: boolean): string {
  if (isActive) return "bg-blue-900/60 animate-pulse";
  if (isPending || score === null) return "bg-gray-800";
  if (score >= 8) return "bg-green-900/70";
  if (score >= 5) return "bg-yellow-900/60";
  return "bg-red-900/60";
}

function getCellTextColor(score: number | null): string {
  if (score === null) return "text-gray-600";
  if (score >= 8) return "text-green-300";
  if (score >= 5) return "text-yellow-300";
  return "text-red-300";
}

function getScore(result: EvalResult | undefined, mode: ScoreMode): number | null {
  if (!result || result.runs.length === 0) return null;
  const hasScores = result.runs.some((r) => r.averageScore > 0);
  if (!hasScores) return null;
  switch (mode) {
    case "best":
      return result.bestScore;
    case "average":
      return result.avgScore;
    case "worst":
      return result.worstScore;
  }
}

export default function Heatmap({ evalRun, onCellClick, currentModel, currentPrompt, isRunning }: HeatmapProps) {
  const [scoreMode, setScoreMode] = useState<ScoreMode>("average");

  // Group prompts by tier
  const promptsByTier = useMemo(() => {
    const grouped: Record<number, typeof evalRun.prompts> = {};
    for (const p of evalRun.prompts) {
      if (!grouped[p.tier]) grouped[p.tier] = [];
      grouped[p.tier].push(p);
    }
    return grouped;
  }, [evalRun.prompts]);

  const tiers = useMemo(
    () => Object.keys(promptsByTier).map(Number).sort() as PromptTier[],
    [promptsByTier]
  );

  // Build result lookup
  const resultLookup = useMemo(() => {
    const map = new Map<string, EvalResult>();
    for (const r of evalRun.results) {
      map.set(`${r.modelId}:${r.promptId}`, r);
    }
    return map;
  }, [evalRun.results]);

  // Sort models by average score descending
  const sortedModels = useMemo(() => {
    return [...evalRun.models].sort((a, b) => {
      const aResults = evalRun.results.filter((r) => r.modelId === a.id);
      const bResults = evalRun.results.filter((r) => r.modelId === b.id);
      const aAvg = aResults.length > 0 ? aResults.reduce((s, r) => s + r.avgScore, 0) / aResults.length : 0;
      const bAvg = bResults.length > 0 ? bResults.reduce((s, r) => s + r.avgScore, 0) / bResults.length : 0;
      return bAvg - aAvg;
    });
  }, [evalRun.models, evalRun.results]);

  // Compute per-model stats
  const modelStats = useMemo(() => {
    const stats = new Map<string, { avgScore: number; avgSpeed: number }>();
    for (const model of evalRun.models) {
      const results = evalRun.results.filter((r) => r.modelId === model.id);
      const scored = results.filter((r) => r.avgScore > 0);
      const avgScore = scored.length > 0 ? scored.reduce((s, r) => s + r.avgScore, 0) / scored.length : 0;
      const withSpeed = results.filter((r) => r.avgTokensPerSecond > 0);
      const avgSpeed = withSpeed.length > 0 ? withSpeed.reduce((s, r) => s + r.avgTokensPerSecond, 0) / withSpeed.length : 0;
      stats.set(model.id, { avgScore, avgSpeed });
    }
    return stats;
  }, [evalRun.models, evalRun.results]);

  return (
    <div className="space-y-4">
      {/* Run toggle */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400 mr-2">Show:</span>
        {(["best", "average", "worst"] as ScoreMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setScoreMode(mode)}
            className={`text-xs font-medium py-1 px-3 rounded-lg transition-colors ${
              scoreMode === mode
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Heatmap table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            {/* Tier header row */}
            <tr>
              <th className="sticky left-0 z-10 bg-gray-950 min-w-[200px]" />
              {tiers.map((tier) => (
                <th
                  key={tier}
                  colSpan={promptsByTier[tier]?.length ?? 0}
                  className={`px-2 py-2 text-center text-xs font-semibold border-b border-gray-800 ${
                    tier === 1 ? "text-green-400" : tier === 2 ? "text-blue-400" : tier === 3 ? "text-purple-400" : "text-orange-400"
                  }`}
                >
                  {TIER_NAMES[tier] ?? `Tier ${tier}`}
                </th>
              ))}
            </tr>
            {/* Prompt name row */}
            <tr>
              <th className="sticky left-0 z-10 bg-gray-950 text-left px-3 py-2 text-gray-400 font-medium min-w-[200px]">
                Model
              </th>
              {tiers.flatMap((tier) =>
                (promptsByTier[tier] ?? []).map((prompt) => (
                  <th
                    key={prompt.id}
                    className="px-1 py-2 text-center text-[10px] text-gray-500 font-normal max-w-[60px] truncate border-b border-gray-800"
                    title={prompt.name}
                  >
                    {prompt.name.length > 10 ? prompt.name.slice(0, 10) + "..." : prompt.name}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {sortedModels.map((model) => {
              const stats = modelStats.get(model.id);
              return (
                <tr key={model.id} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                  {/* Model row header */}
                  <td className="sticky left-0 z-10 bg-gray-950 px-3 py-2 min-w-[200px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-200 font-medium text-xs">{model.name}</span>
                        <span className="text-[10px] text-gray-500 ml-1.5">{model.approxParams ?? ""}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]">
                        {stats && stats.avgScore > 0 && (
                          <span className="text-gray-400">{stats.avgScore.toFixed(1)}</span>
                        )}
                        {stats && stats.avgSpeed > 0 && (
                          <span className="text-gray-500">{stats.avgSpeed.toFixed(0)} t/s</span>
                        )}
                      </div>
                    </div>
                  </td>
                  {/* Cells */}
                  {tiers.flatMap((tier) =>
                    (promptsByTier[tier] ?? []).map((prompt) => {
                      const result = resultLookup.get(`${model.id}:${prompt.id}`);
                      const score = getScore(result, scoreMode);
                      const isActive = isRunning && currentModel === model.id && currentPrompt === prompt.id;
                      const isPending = !result || result.runs.length === 0;
                      const highVariance = result && result.consistency >= 1.5;

                      return (
                        <td
                          key={`${model.id}:${prompt.id}`}
                          onClick={() => onCellClick(model.id, prompt.id)}
                          className={`px-1 py-2 text-center cursor-pointer transition-colors hover:ring-1 hover:ring-blue-500 relative ${getCellColor(score, isActive, isPending)}`}
                          title={
                            result
                              ? `Best: ${result.bestScore.toFixed(1)}, Avg: ${result.avgScore.toFixed(1)}, Worst: ${result.worstScore.toFixed(1)}, StdDev: ${result.consistency.toFixed(2)}`
                              : "Pending"
                          }
                        >
                          <span className={`text-xs font-mono ${getCellTextColor(score)}`}>
                            {score !== null ? score.toFixed(1) : "-"}
                          </span>
                          {highVariance && (
                            <span className="absolute top-0 right-0.5 text-[8px] text-yellow-500" title={`StdDev: ${result!.consistency.toFixed(2)}`}>
                              !
                            </span>
                          )}
                        </td>
                      );
                    })
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
