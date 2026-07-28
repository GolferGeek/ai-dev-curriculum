"use client";

import { useEffect, useState } from "react";
import { RunConfig } from "@/lib/types";
import { DEFAULT_CONFIG, loadConfig, saveConfig } from "@/lib/config";

export default function ConfigPage() {
  const [config, setConfig] = useState<RunConfig>(DEFAULT_CONFIG);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  function handleChange(updates: Partial<RunConfig>) {
    const next = { ...config, ...updates };
    setConfig(next);
    saveConfig(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleWeightChange(key: keyof RunConfig["weights"], value: number) {
    const weights = { ...config.weights, [key]: value };
    // Normalize so all weights sum to 1.0
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    if (total > 0) {
      const normalized = Object.fromEntries(
        Object.entries(weights).map(([k, v]) => [k, v / total])
      ) as RunConfig["weights"];
      handleChange({ weights: normalized });
    }
  }

  function handlePointsChange(index: number, value: number) {
    const points = [...config.round2Points];
    points[index] = value;
    handleChange({ round2Points: points });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Configuration</h1>
          <p className="text-gray-400 mt-1">
            Evaluation run parameters and scoring weights.
          </p>
        </div>
        {saved && (
          <span className="text-sm text-green-400">Saved to localStorage</span>
        )}
      </div>

      {/* Run Parameters */}
      <section className="card space-y-6">
        <h2 className="text-lg font-semibold text-white">Run Parameters</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Runs per prompt
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={config.runsPerPrompt}
              onChange={(e) =>
                handleChange({ runsPerPrompt: parseInt(e.target.value) || 1 })
              }
              className="input-field w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Number of times each prompt is sent to each model
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Timeout per generation (seconds)
            </label>
            <input
              type="number"
              min={10}
              max={600}
              value={config.timeoutSeconds}
              onChange={(e) =>
                handleChange({
                  timeoutSeconds: parseInt(e.target.value) || 300,
                })
              }
              className="input-field w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Max wait time for a single model call
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Round 2 top N
            </label>
            <input
              type="number"
              min={2}
              max={10}
              value={config.round2TopN}
              onChange={(e) =>
                handleChange({
                  round2TopN: parseInt(e.target.value) || 5,
                })
              }
              className="input-field w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Number of top models for Round 2 comparative ranking
            </p>
          </div>
        </div>
      </section>

      {/* Scoring Weights */}
      <section className="card space-y-6">
        <h2 className="text-lg font-semibold text-white">
          Scoring Weights (auto-normalize to 1.0)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(
            Object.entries(config.weights) as [
              keyof RunConfig["weights"],
              number,
            ][]
          ).map(([key, value]) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300 capitalize">
                  {key}
                </label>
                <span className="text-sm text-gray-400">
                  {(value * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={value * 100}
                onChange={(e) =>
                  handleWeightChange(key, parseInt(e.target.value))
                }
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Round 2 Points */}
      <section className="card space-y-6">
        <h2 className="text-lg font-semibold text-white">
          Round 2 Point Values
        </h2>
        <p className="text-sm text-gray-400">
          Points awarded per rank position in Round 2 comparative ranking.
        </p>

        <div className="flex gap-4">
          {config.round2Points.map((points, i) => (
            <div key={i} className="text-center">
              <label className="block text-xs text-gray-500 mb-1">
                #{i + 1}
              </label>
              <input
                type="number"
                min={0}
                max={200}
                value={points}
                onChange={(e) =>
                  handlePointsChange(i, parseInt(e.target.value) || 0)
                }
                className="input-field w-20 text-center"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Reset */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setConfig(DEFAULT_CONFIG);
            saveConfig(DEFAULT_CONFIG);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="btn-secondary"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
