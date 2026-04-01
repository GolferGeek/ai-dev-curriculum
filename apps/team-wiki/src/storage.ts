import type { WikiState } from "./types";

const KEY = "curriculum-team-wiki-v1";

export function loadWiki(): WikiState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as WikiState;
  } catch {
    return null;
  }
}

export function saveWiki(s: WikiState): void {
  localStorage.setItem(KEY, JSON.stringify(s));
}
