"use client";

import { useState, useCallback } from "react";
import { useEvalResults } from "@/hooks/useEvalResults";
import { useEvalStatus } from "@/hooks/useEvalStatus";
import type { ModelConfig, PromptConfig } from "@/lib/types";
import ProgressBar from "@/components/results/ProgressBar";
import Heatmap from "@/components/results/Heatmap";
import SpeedChart from "@/components/results/SpeedChart";
import QualitySpeedScatter from "@/components/results/QualitySpeedScatter";
import ConsistencyView from "@/components/results/ConsistencyView";
import Podium from "@/components/results/Podium";
import Drilldown from "@/components/results/Drilldown";

type Tab = "heatmap" | "speed" | "scatter" | "consistency" | "round2";

const TABS: { id: Tab; label: string }[] = [
  { id: "heatmap", label: "Heatmap" },
  { id: "speed", label: "Speed" },
  { id: "scatter", label: "Quality vs Speed" },
  { id: "consistency", label: "Consistency" },
  { id: "round2", label: "Round 2" },
];

export default function ResultsPage() {
  const { results, isLoading } = useEvalResults(3000);
  const { status } = useEvalStatus(2000);
  const [activeTab, setActiveTab] = useState<Tab>("heatmap");
  const [drilldown, setDrilldown] = useState<{ modelId: string; promptId: string } | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const handleStartEval = useCallback(async () => {
    setIsStarting(true);
    try {
      // Load selected models from localStorage
      const savedModels = localStorage.getItem("model-eval-models");
      const allModels: ModelConfig[] = savedModels ? JSON.parse(savedModels) : [];
      const selectedModels = allModels.filter((m: ModelConfig) => m.selected);

      // Load selected prompts from localStorage
      // Load selected prompt IDs from localStorage
      const { BUILT_IN_PROMPTS } = await import("@/lib/prompts");
      const savedSelection = localStorage.getItem("model-eval-prompt-selection");
      let selectedPrompts: PromptConfig[];
      if (savedSelection) {
        const selectedIds: string[] = JSON.parse(savedSelection);
        selectedPrompts = BUILT_IN_PROMPTS.filter((p: PromptConfig) => selectedIds.includes(p.id));
      } else {
        // No saved selection — use all built-in prompts
        selectedPrompts = BUILT_IN_PROMPTS;
      }

      // Add custom prompts if any
      const savedCustom = localStorage.getItem("model-eval-custom-prompts");
      if (savedCustom) {
        const customPrompts: PromptConfig[] = JSON.parse(savedCustom);
        const selectedCustom = savedSelection
          ? customPrompts.filter((p: PromptConfig) => JSON.parse(savedSelection).includes(p.id))
          : customPrompts;
        selectedPrompts = [...selectedPrompts, ...selectedCustom];
      }

      // Load config from localStorage
      const savedConfig = localStorage.getItem("model-eval-config");
      const config = savedConfig ? JSON.parse(savedConfig) : {};

      if (selectedModels.length === 0) {
        alert("No models selected. Go to the Models tab and select at least one model.");
        return;
      }

      const res = await fetch("/api/eval/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ models: selectedModels, prompts: selectedPrompts, config }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Failed to start: ${err.error}`);
      }
    } catch (err) {
      console.error("Failed to start eval:", err);
    } finally {
      setIsStarting(false);
    }
  }, []);

  const handlePause = useCallback(async () => {
    await fetch("/api/eval/pause", { method: "POST" });
  }, []);

  const handleResume = useCallback(async () => {
    await fetch("/api/eval/resume", { method: "POST" });
  }, []);

  const handleExportReport = useCallback(async () => {
    setExportStatus("Generating...");
    try {
      const res = await fetch("/api/eval/report");
      if (!res.ok) throw new Error("Failed to generate report");
      const markdown = await res.text();
      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "model-eval-report.md";
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus("Exported!");
      setTimeout(() => setExportStatus(null), 3000);
    } catch {
      setExportStatus("Export failed");
      setTimeout(() => setExportStatus(null), 3000);
    }
  }, []);

  const handleCellClick = useCallback((modelId: string, promptId: string) => {
    setDrilldown({ modelId, promptId });
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Results</h1>
          <p className="text-gray-400 mt-1">Loading evaluation data...</p>
        </div>
        <div className="card flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // No results — show start button
  if (!results || !results.results || results.results.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Results</h1>
          <p className="text-gray-400 mt-1">
            Evaluation results will appear here after running an evaluation.
          </p>
        </div>

        {/* Progress bar if running */}
        {(status.status === "running" || status.status === "paused") && (
          <ProgressBar status={status} onPause={handlePause} onResume={handleResume} />
        )}

        <div className="card flex flex-col items-center justify-center py-16 text-center">
          <svg
            className="w-16 h-16 text-gray-700 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-400 mb-2">No results yet</h3>
          <p className="text-sm text-gray-500 max-w-md mb-6">
            Configure your models and prompts, then run an evaluation to see
            results here. The heatmap, charts, and detailed scores will populate
            as the evaluation progresses.
          </p>
          {status.status === "idle" && (
            <button
              onClick={handleStartEval}
              disabled={isStarting}
              className="btn-primary flex items-center gap-2"
            >
              {isStarting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              Run Evaluation
            </button>
          )}
        </div>
      </div>
    );
  }

  // Has results — show dashboard
  const isRunning = status.status === "running";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Results</h1>
          <p className="text-sm text-gray-400 mt-1">
            {results.models.length} models &middot; {results.prompts.length} prompts &middot;{" "}
            {results.completedGenerations} / {results.totalGenerations} generations
          </p>
        </div>
        <div className="flex items-center gap-3">
          {status.status === "idle" && (
            <button
              onClick={handleStartEval}
              disabled={isStarting}
              className="btn-primary text-sm flex items-center gap-2"
            >
              {isStarting ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              )}
              Run
            </button>
          )}
          <button
            onClick={handleExportReport}
            className="btn-secondary text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {exportStatus ?? "Export Report"}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {(status.status === "running" || status.status === "paused") && (
        <ProgressBar status={status} onPause={handlePause} onResume={handleResume} />
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-800 pb-px">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? "bg-gray-900 text-blue-400 border-b-2 border-blue-500"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "heatmap" && (
          <Heatmap
            evalRun={results}
            onCellClick={handleCellClick}
            currentModel={status.currentModel}
            currentPrompt={status.currentPrompt}
            isRunning={isRunning}
          />
        )}

        {activeTab === "speed" && <SpeedChart evalRun={results} />}

        {activeTab === "scatter" && <QualitySpeedScatter evalRun={results} />}

        {activeTab === "consistency" && <ConsistencyView evalRun={results} />}

        {activeTab === "round2" && <Podium evalRun={results} />}
      </div>

      {/* Drilldown panel */}
      {drilldown && (
        <Drilldown
          evalRun={results}
          modelId={drilldown.modelId}
          promptId={drilldown.promptId}
          onClose={() => setDrilldown(null)}
        />
      )}
    </div>
  );
}
