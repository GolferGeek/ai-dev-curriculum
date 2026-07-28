"use client";

import { useEffect, useState, useCallback } from "react";
import { ModelConfig, ModelRole } from "@/lib/types";
import { ANTHROPIC_MODELS } from "@/lib/models/anthropic-models";
import { OPENROUTER_MODELS } from "@/lib/models/openrouter-models";

const MODELS_KEY = "model-eval-models";
const KEYS_KEY = "model-eval-api-keys";

interface ApiKeys {
  anthropic: string;
  openrouter: string;
}

interface TestResult {
  modelId: string;
  success: boolean;
  tokensPerSec?: number;
  error?: string;
  loading: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1e9) return `${(bytes / 1e6).toFixed(0)} MB`;
  return `${(bytes / 1e9).toFixed(1)} GB`;
}

function RoleBadge({
  role,
  onToggle,
}: {
  role: ModelRole;
  onToggle: (role: ModelRole) => void;
}) {
  return (
    <div className="flex gap-1">
      {(["contestant", "judge", "both"] as ModelRole[]).map((r) => (
        <button
          key={r}
          onClick={() => onToggle(r)}
          className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
            role === r
              ? r === "contestant"
                ? "bg-blue-600 text-white"
                : r === "judge"
                  ? "bg-amber-600 text-white"
                  : "bg-green-600 text-white"
              : "bg-gray-800 text-gray-500 hover:text-gray-300"
          }`}
        >
          {r.charAt(0).toUpperCase() + r.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default function ModelsPage() {
  const [ollamaModels, setOllamaModels] = useState<ModelConfig[]>([]);
  const [ollamaError, setOllamaError] = useState<string | null>(null);
  const [ollamaLoading, setOllamaLoading] = useState(true);
  const [apiModels, setApiModels] = useState<ModelConfig[]>([
    ...ANTHROPIC_MODELS,
    ...OPENROUTER_MODELS,
  ]);
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    anthropic: "",
    openrouter: "",
  });
  const [testResults, setTestResults] = useState<Record<string, TestResult>>(
    {}
  );

  // Load saved state
  useEffect(() => {
    try {
      const savedModels = localStorage.getItem(MODELS_KEY);
      if (savedModels) {
        const parsed: ModelConfig[] = JSON.parse(savedModels);
        // Merge saved state into defaults
        const ollamaSaved = parsed.filter((m) => m.provider === "ollama");
        const apiSaved = parsed.filter((m) => m.provider !== "ollama");
        if (ollamaSaved.length) setOllamaModels(ollamaSaved);
        if (apiSaved.length) {
          setApiModels((prev) =>
            prev.map((m) => {
              const saved = apiSaved.find((s) => s.id === m.id);
              return saved ? { ...m, ...saved } : m;
            })
          );
        }
      }
      const savedKeys = localStorage.getItem(KEYS_KEY);
      if (savedKeys) setApiKeys(JSON.parse(savedKeys));
    } catch {
      // ignore
    }
  }, []);

  // Save state
  const saveState = useCallback(
    (ollama: ModelConfig[], api: ModelConfig[]) => {
      localStorage.setItem(MODELS_KEY, JSON.stringify([...ollama, ...api]));
    },
    []
  );

  const saveKeys = useCallback((keys: ApiKeys) => {
    localStorage.setItem(KEYS_KEY, JSON.stringify(keys));
  }, []);

  // Fetch Ollama models
  useEffect(() => {
    async function fetchOllama() {
      setOllamaLoading(true);
      try {
        const res = await fetch("/api/models/ollama");
        const data = await res.json();
        if (data.models && data.models.length > 0) {
          // Merge with saved state
          const savedModels = localStorage.getItem(MODELS_KEY);
          const saved: ModelConfig[] = savedModels
            ? JSON.parse(savedModels).filter(
                (m: ModelConfig) => m.provider === "ollama"
              )
            : [];
          const merged = data.models.map((m: ModelConfig) => {
            const existing = saved.find((s: ModelConfig) => s.id === m.id);
            return existing
              ? { ...m, role: existing.role, selected: existing.selected }
              : m;
          });
          setOllamaModels(merged);
          setOllamaError(null);
        } else {
          setOllamaError(
            data.error || "No models found. Pull some models with ollama pull."
          );
        }
      } catch {
        setOllamaError("Failed to connect to Ollama.");
      }
      setOllamaLoading(false);
    }
    fetchOllama();
  }, []);

  function updateOllamaModel(id: string, updates: Partial<ModelConfig>) {
    setOllamaModels((prev) => {
      const next = prev.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      );
      saveState(next, apiModels);
      return next;
    });
  }

  function updateApiModel(id: string, updates: Partial<ModelConfig>) {
    setApiModels((prev) => {
      const next = prev.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      );
      saveState(ollamaModels, next);
      return next;
    });
  }

  function handleKeyChange(provider: "anthropic" | "openrouter", key: string) {
    const next = { ...apiKeys, [provider]: key };
    setApiKeys(next);
    saveKeys(next);
  }

  async function testModel(model: ModelConfig) {
    setTestResults((prev) => ({
      ...prev,
      [model.id]: { modelId: model.id, success: false, loading: true },
    }));

    try {
      const res = await fetch("/api/models/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: model.model,
          provider: model.provider,
          apiKey:
            model.provider === "anthropic"
              ? apiKeys.anthropic
              : model.provider === "openrouter"
                ? apiKeys.openrouter
                : undefined,
        }),
      });
      const data = await res.json();
      setTestResults((prev) => ({
        ...prev,
        [model.id]: { ...data, modelId: model.id, loading: false },
      }));
    } catch (err) {
      setTestResults((prev) => ({
        ...prev,
        [model.id]: {
          modelId: model.id,
          success: false,
          error: String(err),
          loading: false,
        },
      }));
    }
  }

  function ModelCard({
    model,
    onUpdate,
  }: {
    model: ModelConfig;
    onUpdate: (id: string, updates: Partial<ModelConfig>) => void;
  }) {
    const test = testResults[model.id];
    return (
      <div className="card flex items-center gap-4">
        <input
          type="checkbox"
          checked={model.selected}
          onChange={(e) => onUpdate(model.id, { selected: e.target.checked })}
          className="w-4 h-4 rounded bg-gray-800 border-gray-600 text-blue-600 focus:ring-blue-500"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-white truncate">
              {model.name}
            </span>
            {model.approxParams && (
              <span className="text-xs text-gray-500">
                {model.approxParams}
              </span>
            )}
            {model.size && (
              <span className="text-xs text-gray-500">
                {formatBytes(model.size)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`badge ${
                model.provider === "ollama"
                  ? "bg-cyan-900 text-cyan-300"
                  : model.provider === "anthropic"
                    ? "bg-violet-900 text-violet-300"
                    : "bg-emerald-900 text-emerald-300"
              }`}
            >
              {model.provider}
            </span>
            {model.supportsTools && (
              <span className="badge bg-gray-800 text-gray-400">Tools</span>
            )}
            {model.supportsImages && (
              <span className="badge bg-gray-800 text-gray-400">Vision</span>
            )}
          </div>
        </div>
        <RoleBadge
          role={model.role}
          onToggle={(role) => onUpdate(model.id, { role })}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => testModel(model)}
            disabled={test?.loading}
            className="btn-secondary text-xs py-1 px-3"
          >
            {test?.loading ? "Testing..." : "Test"}
          </button>
          {test && !test.loading && (
            <span
              className={`text-xs ${test.success ? "text-green-400" : "text-red-400"}`}
            >
              {test.success
                ? test.tokensPerSec
                  ? `${test.tokensPerSec.toFixed(1)} t/s`
                  : "OK"
                : test.error || "Failed"}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Models</h1>
        <p className="text-gray-400 mt-1">
          Configure which models to evaluate and their roles.
        </p>
      </div>

      {/* Ollama Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Local Models (Ollama)
          </h2>
          {ollamaModels.length > 0 && (
            <span className="text-sm text-gray-500">
              {ollamaModels.filter((m) => m.selected).length} of{" "}
              {ollamaModels.length} selected
            </span>
          )}
        </div>
        {ollamaLoading ? (
          <div className="card text-gray-500">Discovering Ollama models...</div>
        ) : ollamaError ? (
          <div className="card border-amber-800 bg-amber-950/30">
            <p className="text-amber-400 text-sm">{ollamaError}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {ollamaModels.map((m) => (
              <ModelCard key={m.id} model={m} onUpdate={updateOllamaModel} />
            ))}
          </div>
        )}
      </section>

      {/* Anthropic Section */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">API Models</h2>

        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Anthropic API Key
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKeys.anthropic}
                onChange={(e) =>
                  handleKeyChange("anthropic", e.target.value)
                }
                placeholder="sk-ant-..."
                className="input-field flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            {apiModels
              .filter((m) => m.provider === "anthropic")
              .map((m) => (
                <ModelCard key={m.id} model={m} onUpdate={updateApiModel} />
              ))}
          </div>
        </div>

        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              OpenRouter API Key
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKeys.openrouter}
                onChange={(e) =>
                  handleKeyChange("openrouter", e.target.value)
                }
                placeholder="sk-or-..."
                className="input-field flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            {apiModels
              .filter((m) => m.provider === "openrouter")
              .map((m) => (
                <ModelCard key={m.id} model={m} onUpdate={updateApiModel} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
