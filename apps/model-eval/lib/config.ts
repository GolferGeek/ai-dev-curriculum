import { RunConfig } from "@/lib/types";

export const DEFAULT_CONFIG: RunConfig = {
  runsPerPrompt: 3,
  timeoutSeconds: 300,
  weights: {
    accuracy: 0.25,
    reasoning: 0.25,
    structure: 0.25,
    insight: 0.25,
  },
  round2TopN: 5,
  round2Points: [100, 70, 40, 20, 10],
};

const CONFIG_KEY = "model-eval-config";

export function loadConfig(): RunConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    if (stored) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    }
  } catch {
    // ignore parse errors
  }
  return DEFAULT_CONFIG;
}

export function saveConfig(config: RunConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}
