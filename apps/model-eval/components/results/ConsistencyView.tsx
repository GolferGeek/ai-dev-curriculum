"use client";

import { useMemo } from "react";
import type { EvalRun } from "@/lib/types";

interface ConsistencyViewProps {
  evalRun: EvalRun;
}

interface ModelConsistency {
  name: string;
  avgScore: number;
  avgStdDev: number;
  rating: number; // 1-5 stars
  color: string;
}

function getRating(stdDev: number): number {
  if (stdDev < 0.3) return 5;
  if (stdDev < 0.5) return 4;
  if (stdDev < 1.0) return 3;
  if (stdDev < 1.5) return 2;
  return 1;
}

function getColor(stdDev: number): string {
  if (stdDev < 0.5) return "text-green-400";
  if (stdDev < 1.5) return "text-yellow-400";
  return "text-red-400";
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-400 text-xs tracking-widest">
      {Array.from({ length: 5 }, (_, i) => (i < rating ? "\u2605" : "\u2606")).join("")}
    </span>
  );
}

export default function ConsistencyView({ evalRun }: ConsistencyViewProps) {
  const data = useMemo(() => {
    const models: ModelConsistency[] = [];
    for (const model of evalRun.models) {
      const results = evalRun.results.filter(
        (r) => r.modelId === model.id && r.runs.length >= 2 && r.avgScore > 0
      );
      if (results.length === 0) continue;
      const avgScore = results.reduce((s, r) => s + r.avgScore, 0) / results.length;
      const avgStdDev = results.reduce((s, r) => s + r.consistency, 0) / results.length;
      models.push({
        name: model.name,
        avgScore: Math.round(avgScore * 10) / 10,
        avgStdDev: Math.round(avgStdDev * 100) / 100,
        rating: getRating(avgStdDev),
        color: getColor(avgStdDev),
      });
    }
    return models.sort((a, b) => a.avgStdDev - b.avgStdDev);
  }, [evalRun]);

  if (data.length === 0) {
    return (
      <div className="card flex items-center justify-center py-12 text-gray-500">
        Consistency data requires at least 2 runs per prompt
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-gray-200 mb-4">Consistency</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-2 px-3 text-gray-400 font-medium">Model</th>
              <th className="text-center py-2 px-3 text-gray-400 font-medium">Avg Score</th>
              <th className="text-center py-2 px-3 text-gray-400 font-medium">Std Dev</th>
              <th className="text-center py-2 px-3 text-gray-400 font-medium">Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.map((m) => (
              <tr key={m.name} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="py-2 px-3 text-gray-200">{m.name}</td>
                <td className="py-2 px-3 text-center text-gray-300">{m.avgScore.toFixed(1)}</td>
                <td className={`py-2 px-3 text-center font-mono ${m.color}`}>{m.avgStdDev.toFixed(2)}</td>
                <td className="py-2 px-3 text-center">
                  <StarRating rating={m.rating} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
