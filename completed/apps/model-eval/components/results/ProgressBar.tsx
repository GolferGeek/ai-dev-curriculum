"use client";

import type { EvalStatusData } from "@/hooks/useEvalStatus";

interface ProgressBarProps {
  status: EvalStatusData;
  onPause: () => void;
  onResume: () => void;
}

export default function ProgressBar({ status, onPause, onResume }: ProgressBarProps) {
  const { completedGenerations, totalGenerations, currentModel, currentPrompt, currentRun } = status;
  const percentage = totalGenerations > 0 ? Math.round((completedGenerations / totalGenerations) * 100) : 0;
  const isRunning = status.status === "running";
  const isPaused = status.status === "paused";

  if (status.status === "idle" || status.status === "complete") return null;

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isRunning ? "bg-blue-500 animate-pulse" : "bg-yellow-500"}`} />
          <span className="text-sm font-medium text-gray-200">
            {isRunning ? "Running" : "Paused"}:{" "}
            {currentModel && (
              <span className="text-blue-400">{currentModel}</span>
            )}
            {currentPrompt && (
              <>
                <span className="text-gray-500 mx-1">/</span>
                <span className="text-purple-400">{currentPrompt}</span>
              </>
            )}
            {currentRun !== null && (
              <span className="text-gray-400 ml-1">(run {currentRun})</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            {completedGenerations} of {totalGenerations} ({percentage}%)
          </span>
          {isRunning && (
            <button onClick={onPause} className="btn-secondary text-xs py-1 px-3">
              Pause
            </button>
          )}
          {isPaused && (
            <button onClick={onResume} className="btn-primary text-xs py-1 px-3">
              Resume
            </button>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
