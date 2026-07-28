import type { OpsState } from "./types";

const KEY = "curriculum-ops-pulse-v1";

export function loadOps(): OpsState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OpsState;
  } catch {
    return null;
  }
}

export function saveOps(s: OpsState): void {
  localStorage.setItem(KEY, JSON.stringify(s));
}
