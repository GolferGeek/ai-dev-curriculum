"use client";

import { useMemo, useState } from "react";
import type { EvalRun, EvalResult, RunResult, JudgeScore } from "@/lib/types";

interface DrilldownProps {
  evalRun: EvalRun;
  modelId: string;
  promptId: string;
  onClose: () => void;
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const width = (value / 10) * 100;
  const color = value >= 8 ? "bg-green-500" : value >= 5 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-20 text-gray-400 text-right">{label}</span>
      <div className="flex-1 bg-gray-800 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${width}%` }} />
      </div>
      <span className="w-6 text-gray-300 text-right font-mono">{value.toFixed(1)}</span>
    </div>
  );
}

function JudgeScoreCard({ score }: { score: JudgeScore }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-300">{score.judgeModel}</span>
        <span className="text-xs text-blue-400 font-mono">{score.weightedAverage.toFixed(1)}</span>
      </div>
      <ScoreBar label="Accuracy" value={score.accuracy} />
      <ScoreBar label="Reasoning" value={score.reasoning} />
      <ScoreBar label="Structure" value={score.structure} />
      <ScoreBar label="Insight" value={score.insight} />
      {score.commentary && (
        <p className="text-[11px] text-gray-400 italic mt-1">{score.commentary}</p>
      )}
    </div>
  );
}

function RunTab({ run, isActive, onClick }: { run: RunResult; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium py-1.5 px-3 rounded-lg transition-colors ${
        isActive ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
      }`}
    >
      Run {run.runIndex + 1}
      {run.averageScore > 0 && (
        <span className="ml-1.5 text-[10px] opacity-70">{run.averageScore.toFixed(1)}</span>
      )}
    </button>
  );
}

export default function Drilldown({ evalRun, modelId, promptId, onClose }: DrilldownProps) {
  const [selectedRunIndex, setSelectedRunIndex] = useState(0);
  const [compareModelId, setCompareModelId] = useState<string | null>(null);

  const model = evalRun.models.find((m) => m.id === modelId);
  const prompt = evalRun.prompts.find((p) => p.id === promptId);
  const result = evalRun.results.find((r) => r.modelId === modelId && r.promptId === promptId);

  const compareResult = useMemo(() => {
    if (!compareModelId) return null;
    return evalRun.results.find((r) => r.modelId === compareModelId && r.promptId === promptId) ?? null;
  }, [evalRun.results, compareModelId, promptId]);

  if (!model || !prompt) return null;

  const currentRun = result?.runs[selectedRunIndex] ?? null;
  const compareRun = compareResult?.runs[selectedRunIndex] ?? null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="w-full max-w-2xl bg-gray-950 border-l border-gray-800 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-950 border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">{model.name}</h2>
              <p className="text-sm text-gray-400">{prompt.name}</p>
              <span className={`badge-tier-${prompt.tier} mt-1`}>Tier {prompt.tier}</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Average scores summary */}
          {result && result.avgScore > 0 && (
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
              <span>Best: <span className="text-green-400 font-mono">{result.bestScore.toFixed(1)}</span></span>
              <span>Avg: <span className="text-blue-400 font-mono">{result.avgScore.toFixed(1)}</span></span>
              <span>Worst: <span className="text-red-400 font-mono">{result.worstScore.toFixed(1)}</span></span>
              <span>StdDev: <span className="text-yellow-400 font-mono">{result.consistency.toFixed(2)}</span></span>
              <span>Speed: <span className="text-gray-300 font-mono">{result.avgTokensPerSecond.toFixed(0)} t/s</span></span>
            </div>
          )}

          {/* Run tabs */}
          {result && result.runs.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              {result.runs.map((run) => (
                <RunTab
                  key={run.runIndex}
                  run={run}
                  isActive={selectedRunIndex === run.runIndex}
                  onClick={() => setSelectedRunIndex(run.runIndex)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Prompt text */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Prompt</h3>
            <pre className="bg-gray-900 rounded-lg p-3 text-xs text-gray-300 whitespace-pre-wrap overflow-x-auto max-h-48 overflow-y-auto">
              {prompt.prompt}
            </pre>
          </div>

          {/* Compare selector */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Compare with</h3>
            <select
              className="input-field text-xs w-full"
              value={compareModelId ?? ""}
              onChange={(e) => setCompareModelId(e.target.value || null)}
            >
              <option value="">None</option>
              {evalRun.models
                .filter((m) => m.id !== modelId)
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Response(s) */}
          <div className={compareModelId ? "grid grid-cols-2 gap-4" : ""}>
            {/* Primary response */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {compareModelId ? model.name : "Response"}
              </h3>
              {currentRun ? (
                <>
                  <pre className="bg-gray-900 rounded-lg p-3 text-xs text-gray-300 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto">
                    {currentRun.generation.response || "(no response)"}
                  </pre>
                  <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-500">
                    <span>{currentRun.generation.tokensPerSecond.toFixed(1)} t/s</span>
                    <span>{currentRun.generation.latencyMs}ms</span>
                    <span>{currentRun.generation.totalTokens} tokens</span>
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-500">No response yet</p>
              )}
            </div>

            {/* Compare response */}
            {compareModelId && (
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {evalRun.models.find((m) => m.id === compareModelId)?.name ?? compareModelId}
                </h3>
                {compareRun ? (
                  <>
                    <pre className="bg-gray-900 rounded-lg p-3 text-xs text-gray-300 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto">
                      {compareRun.generation.response || "(no response)"}
                    </pre>
                    <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-500">
                      <span>{compareRun.generation.tokensPerSecond.toFixed(1)} t/s</span>
                      <span>{compareRun.generation.latencyMs}ms</span>
                      <span>{compareRun.generation.totalTokens} tokens</span>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-gray-500">No response yet</p>
                )}
              </div>
            )}
          </div>

          {/* Judge scores */}
          {currentRun && currentRun.scores.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Judge Scores (Run {selectedRunIndex + 1})
              </h3>
              <div className="space-y-3">
                {currentRun.scores.map((score, i) => (
                  <JudgeScoreCard key={i} score={score} />
                ))}
              </div>
            </div>
          )}

          {/* Compare judge scores */}
          {compareRun && compareRun.scores.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Compare: Judge Scores (Run {selectedRunIndex + 1})
              </h3>
              <div className="space-y-3">
                {compareRun.scores.map((score, i) => (
                  <JudgeScoreCard key={i} score={score} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
