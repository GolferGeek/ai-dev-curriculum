"use client";

import { useEffect, useState, useCallback } from "react";
import { PromptConfig, PromptTier } from "@/lib/types";
import {
  BUILT_IN_PROMPTS,
  TIER_NAMES,
  TIER_DESCRIPTIONS,
} from "@/lib/prompts";

const SELECTION_KEY = "model-eval-prompt-selection";
const CUSTOM_KEY = "model-eval-custom-prompts";

interface CustomPromptFormData {
  name: string;
  tier: PromptTier;
  prompt: string;
  expectedFormat: string;
  evaluationCriteria: string;
}

const emptyForm: CustomPromptFormData = {
  name: "",
  tier: 1,
  prompt: "",
  expectedFormat: "",
  evaluationCriteria: "",
};

function TierBadge({ tier }: { tier: PromptTier }) {
  const cls =
    tier === 1
      ? "badge-tier-1"
      : tier === 2
        ? "badge-tier-2"
        : tier === 3
          ? "badge-tier-3"
          : "badge-tier-4";
  return <span className={cls}>Tier {tier}</span>;
}

export default function PromptsPage() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [customPrompts, setCustomPrompts] = useState<PromptConfig[]>([]);
  const [collapsedTiers, setCollapsedTiers] = useState<Set<number>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CustomPromptFormData>(emptyForm);

  // Load saved state
  useEffect(() => {
    try {
      const savedSelection = localStorage.getItem(SELECTION_KEY);
      if (savedSelection) {
        setSelectedIds(new Set(JSON.parse(savedSelection)));
      } else {
        // Select all by default
        setSelectedIds(new Set(BUILT_IN_PROMPTS.map((p) => p.id)));
      }
      const savedCustom = localStorage.getItem(CUSTOM_KEY);
      if (savedCustom) setCustomPrompts(JSON.parse(savedCustom));
    } catch {
      // ignore
    }
  }, []);

  const saveSelection = useCallback((ids: Set<string>) => {
    localStorage.setItem(SELECTION_KEY, JSON.stringify([...ids]));
  }, []);

  const saveCustom = useCallback((prompts: PromptConfig[]) => {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(prompts));
  }, []);

  const allPrompts = [...BUILT_IN_PROMPTS, ...customPrompts];
  const promptsByTier = new Map<number, PromptConfig[]>();
  for (const p of allPrompts) {
    const list = promptsByTier.get(p.tier) || [];
    list.push(p);
    promptsByTier.set(p.tier, list);
  }

  // Custom prompts section
  const customPromptsInTiers = customPrompts.length > 0;

  function togglePrompt(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveSelection(next);
      return next;
    });
  }

  function selectAllTier(tier: number) {
    const tierPrompts = promptsByTier.get(tier) || [];
    setSelectedIds((prev) => {
      const next = new Set(prev);
      tierPrompts.forEach((p) => next.add(p.id));
      saveSelection(next);
      return next;
    });
  }

  function deselectAllTier(tier: number) {
    const tierPrompts = promptsByTier.get(tier) || [];
    setSelectedIds((prev) => {
      const next = new Set(prev);
      tierPrompts.forEach((p) => next.delete(p.id));
      saveSelection(next);
      return next;
    });
  }

  function toggleCollapse(tier: number) {
    setCollapsedTiers((prev) => {
      const next = new Set(prev);
      if (next.has(tier)) next.delete(tier);
      else next.add(tier);
      return next;
    });
  }

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(prompt: PromptConfig) {
    setForm({
      name: prompt.name,
      tier: prompt.tier,
      prompt: prompt.prompt,
      expectedFormat: prompt.expectedFormat,
      evaluationCriteria: prompt.evaluationCriteria,
    });
    setEditingId(prompt.id);
    setShowForm(true);
  }

  function savePromptForm() {
    if (!form.name || !form.prompt) return;

    if (editingId) {
      const updated = customPrompts.map((p) =>
        p.id === editingId
          ? { ...p, name: form.name, tier: form.tier, prompt: form.prompt, expectedFormat: form.expectedFormat, evaluationCriteria: form.evaluationCriteria }
          : p
      );
      setCustomPrompts(updated);
      saveCustom(updated);
    } else {
      const newPrompt: PromptConfig = {
        id: `custom-${Date.now()}`,
        name: form.name,
        tier: form.tier,
        prompt: form.prompt,
        expectedFormat: form.expectedFormat,
        evaluationCriteria: form.evaluationCriteria,
        isCustom: true,
      };
      const updated = [...customPrompts, newPrompt];
      setCustomPrompts(updated);
      saveCustom(updated);
      // Auto-select new prompt
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.add(newPrompt.id);
        saveSelection(next);
        return next;
      });
    }
    setShowForm(false);
    setEditingId(null);
  }

  function deleteCustomPrompt(id: string) {
    const updated = customPrompts.filter((p) => p.id !== id);
    setCustomPrompts(updated);
    saveCustom(updated);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      saveSelection(next);
      return next;
    });
  }

  const totalPrompts = allPrompts.length;
  const selectedCount = [...selectedIds].filter((id) =>
    allPrompts.some((p) => p.id === id)
  ).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Prompts</h1>
          <p className="text-gray-400 mt-1">
            Select which prompts to include in evaluation runs.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {selectedCount} of {totalPrompts} selected
          </span>
          <button onClick={openAddForm} className="btn-primary text-sm">
            + Add Custom Prompt
          </button>
        </div>
      </div>

      {/* Tier sections */}
      {[1, 2, 3, 4].map((tier) => {
        const tierPrompts = promptsByTier.get(tier) || [];
        const builtIn = tierPrompts.filter((p) => !p.isCustom);
        const custom = tierPrompts.filter((p) => p.isCustom);
        const tierSelected = tierPrompts.filter((p) =>
          selectedIds.has(p.id)
        ).length;
        const isCollapsed = collapsedTiers.has(tier);

        return (
          <section key={tier} className="card">
            <button
              onClick={() => toggleCollapse(tier)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${isCollapsed ? "" : "rotate-90"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <h2 className="text-lg font-semibold text-white">
                  Tier {tier} &mdash; {TIER_NAMES[tier]}
                </h2>
                <span className="text-sm text-gray-500">
                  ({tierSelected} of {tierPrompts.length} selected)
                </span>
              </div>
            </button>

            {!isCollapsed && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-500">
                  {TIER_DESCRIPTIONS[tier]}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => selectAllTier(tier)}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Select All Tier
                  </button>
                  <span className="text-gray-700">|</span>
                  <button
                    onClick={() => deselectAllTier(tier)}
                    className="text-xs text-gray-500 hover:text-gray-300"
                  >
                    Deselect All Tier
                  </button>
                </div>

                <div className="space-y-2">
                  {builtIn.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.has(p.id)}
                        onChange={() => togglePrompt(p.id)}
                        className="mt-0.5 w-4 h-4 rounded bg-gray-800 border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white text-sm">
                            {p.name}
                          </span>
                          <TierBadge tier={p.tier} />
                        </div>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                          {p.evaluationCriteria.split(".")[0]}.
                        </p>
                      </div>
                    </div>
                  ))}

                  {custom.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-pink-900/30"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.has(p.id)}
                        onChange={() => togglePrompt(p.id)}
                        className="mt-0.5 w-4 h-4 rounded bg-gray-800 border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white text-sm">
                            {p.name}
                          </span>
                          <TierBadge tier={p.tier} />
                          <span className="badge-custom">Custom</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                          {p.evaluationCriteria.split(".")[0] || p.prompt.slice(0, 80)}.
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEditForm(p)}
                          className="text-xs text-gray-500 hover:text-blue-400 px-2 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCustomPrompt(p.id)}
                          className="text-xs text-gray-500 hover:text-red-400 px-2 py-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })}

      {/* Custom prompts not assigned to a tier (shouldn't happen but just in case) */}
      {customPromptsInTiers && null}

      {/* Add/Edit Custom Prompt Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">
              {editingId ? "Edit Custom Prompt" : "Add Custom Prompt"}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="My custom prompt"
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tier
              </label>
              <select
                value={form.tier}
                onChange={(e) =>
                  setForm({
                    ...form,
                    tier: parseInt(e.target.value) as PromptTier,
                  })
                }
                className="input-field w-full"
              >
                <option value={1}>Tier 1 - Quick Tasks</option>
                <option value={2}>Tier 2 - Tool Calling</option>
                <option value={3}>Tier 3 - Multimodal</option>
                <option value={4}>Tier 4 - Analyst</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Prompt Text
              </label>
              <textarea
                value={form.prompt}
                onChange={(e) => setForm({ ...form, prompt: e.target.value })}
                rows={6}
                placeholder="Enter the prompt text..."
                className="input-field w-full font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Expected Output Format
              </label>
              <textarea
                value={form.expectedFormat}
                onChange={(e) =>
                  setForm({ ...form, expectedFormat: e.target.value })
                }
                rows={4}
                placeholder="Describe or show the expected output..."
                className="input-field w-full font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Evaluation Criteria
              </label>
              <textarea
                value={form.evaluationCriteria}
                onChange={(e) =>
                  setForm({ ...form, evaluationCriteria: e.target.value })
                }
                rows={3}
                placeholder="How should responses be scored..."
                className="input-field w-full text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={savePromptForm}
                disabled={!form.name || !form.prompt}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingId ? "Save Changes" : "Add Prompt"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
