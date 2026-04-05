"use client";

import { useMemo } from "react";
import type { EvalRun, Round2Result } from "@/lib/types";

interface PodiumProps {
  evalRun: EvalRun;
}

const PODIUM_HEIGHTS = [120, 160, 100]; // 2nd, 1st, 3rd
const PODIUM_COLORS = ["bg-gray-400", "bg-yellow-500", "bg-amber-700"];
const PODIUM_TEXT_COLORS = ["text-gray-300", "text-yellow-300", "text-amber-400"];
const PODIUM_LABELS = ["2nd", "1st", "3rd"];

function getModelName(evalRun: EvalRun, modelId: string): string {
  const model = evalRun.models.find((m) => m.id === modelId);
  return model?.name ?? modelId;
}

function computeJudgeAgreement(result: Round2Result): number {
  if (!result.rankings || result.rankings.length === 0) return 0;
  let agreed = 0;
  let total = 0;
  for (const ranking of result.rankings) {
    if (!ranking.judgeScores || ranking.judgeScores.length < 2) continue;
    total++;
    const ranks = ranking.judgeScores.map((j) => j.rank);
    if (new Set(ranks).size === 1) agreed++;
  }
  return total > 0 ? Math.round((agreed / total) * 100) : 0;
}

export default function Podium({ evalRun }: PodiumProps) {
  const round2 = evalRun.round2Results;

  const sortedResults = useMemo(() => {
    if (!round2 || round2.length === 0) return [];
    return [...round2].sort((a, b) => b.totalPoints - a.totalPoints);
  }, [round2]);

  if (sortedResults.length === 0) {
    return (
      <div className="card flex items-center justify-center py-12 text-gray-500">
        Round 2 results will appear after Round 1 completes
      </div>
    );
  }

  // Arrange for podium display: [2nd, 1st, 3rd]
  const top3 = sortedResults.slice(0, 3);
  const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;
  const rest = sortedResults.slice(3);

  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-gray-200 mb-6">Round 2 - Final Rankings</h3>

      {/* Podium visual */}
      <div className="flex items-end justify-center gap-4 mb-8">
        {podiumOrder.map((result, i) => {
          const displayIndex = top3.length >= 3 ? i : i;
          const height = PODIUM_HEIGHTS[displayIndex] ?? 80;
          const color = PODIUM_COLORS[displayIndex] ?? "bg-gray-600";
          const textColor = PODIUM_TEXT_COLORS[displayIndex] ?? "text-gray-400";
          const label = PODIUM_LABELS[displayIndex] ?? `${displayIndex + 1}th`;

          return (
            <div key={result.modelId} className="flex flex-col items-center">
              <span className={`text-xs font-bold mb-1 ${textColor}`}>
                {getModelName(evalRun, result.modelId)}
              </span>
              <span className="text-[10px] text-gray-400 mb-2">{result.totalPoints} pts</span>
              <div
                className={`w-24 ${color} rounded-t-lg flex items-end justify-center pb-2 transition-all`}
                style={{ height }}
              >
                <span className="text-sm font-bold text-gray-900">{label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full leaderboard table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-2 px-3 text-gray-400 font-medium">Rank</th>
              <th className="text-left py-2 px-3 text-gray-400 font-medium">Model</th>
              <th className="text-center py-2 px-3 text-gray-400 font-medium">Total Points</th>
              <th className="text-center py-2 px-3 text-gray-400 font-medium">Judge Agreement</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result, idx) => (
              <tr key={result.modelId} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="py-2 px-3 text-gray-300 font-mono">{idx + 1}</td>
                <td className="py-2 px-3 text-gray-200">{getModelName(evalRun, result.modelId)}</td>
                <td className="py-2 px-3 text-center text-gray-300 font-mono">{result.totalPoints}</td>
                <td className="py-2 px-3 text-center text-gray-400">{computeJudgeAgreement(result)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4th and 5th below */}
      {rest.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="grid grid-cols-2 gap-3">
            {rest.map((result, idx) => (
              <div key={result.modelId} className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{idx + 4}th</span>
                  <span className="text-xs text-gray-300 font-mono">{result.totalPoints} pts</span>
                </div>
                <span className="text-sm text-gray-200">{getModelName(evalRun, result.modelId)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
