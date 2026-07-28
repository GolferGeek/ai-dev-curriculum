import type { CrmState } from "./types";

const KEY = "curriculum-pipeline-crm-v1";

export function loadCrm(): CrmState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CrmState;
  } catch {
    return null;
  }
}

export function saveCrm(s: CrmState): void {
  localStorage.setItem(KEY, JSON.stringify(s));
}
