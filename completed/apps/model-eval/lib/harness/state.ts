/* ── Run state management — tracks progress, pause/resume ── */

import { RunStatus } from "@/lib/types";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const STATE_PATH = resolve(process.cwd(), "data/run-state.json");

export interface RunState {
  status: RunStatus;
  completedTriples: string[]; // "modelId:promptId:runIndex"
  currentModel: string;
  currentPrompt: string;
  currentRun: number;
  startedAt: string;
  pausedAt?: string;
  totalGenerations: number;
  completedGenerations: number;
}

/** Save state to disk */
export function saveState(state: RunState): void {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

/** Load state from disk, or null if no state file */
export function loadState(): RunState | null {
  if (!existsSync(STATE_PATH)) return null;
  try {
    return JSON.parse(readFileSync(STATE_PATH, "utf-8"));
  } catch {
    return null;
  }
}

/** Check if a (model, prompt, runIndex) triple is already complete */
export function isComplete(state: RunState, modelId: string, promptId: string, runIndex: number): boolean {
  return state.completedTriples.includes(`${modelId}:${promptId}:${runIndex}`);
}

/** Mark a triple as complete */
export function markComplete(state: RunState, modelId: string, promptId: string, runIndex: number): void {
  const key = `${modelId}:${promptId}:${runIndex}`;
  if (!state.completedTriples.includes(key)) {
    state.completedTriples.push(key);
    state.completedGenerations = state.completedTriples.length;
  }
}

/* ── In-process pause flag (module-level singleton) ── */

let pauseFlag = false;

export function setPauseFlag(paused: boolean): void {
  pauseFlag = paused;
}

export function isPaused(): boolean {
  return pauseFlag;
}
