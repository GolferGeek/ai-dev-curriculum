/* ── Results I/O — atomic writes to data/results.json and intermediates ── */

import { EvalRun } from "@/lib/types";
import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync, readdirSync } from "fs";
import { resolve, join } from "path";

const DATA_DIR = resolve(process.cwd(), "data");
const RESULTS_PATH = join(DATA_DIR, "results.json");
const INTERMEDIATE_DIR = join(DATA_DIR, "intermediate");

function ensureDirs(): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(INTERMEDIATE_DIR)) mkdirSync(INTERMEDIATE_DIR, { recursive: true });
}

/** Read the current results file, or return null if not found / corrupt */
export function readResults(): EvalRun | null {
  if (!existsSync(RESULTS_PATH)) return null;
  try {
    return JSON.parse(readFileSync(RESULTS_PATH, "utf-8"));
  } catch {
    return null;
  }
}

/** Write results atomically (write to .tmp then rename) */
export function writeResults(evalRun: EvalRun): void {
  ensureDirs();
  const tmpPath = RESULTS_PATH + ".tmp";
  writeFileSync(tmpPath, JSON.stringify(evalRun, null, 2));
  renameSync(tmpPath, RESULTS_PATH);
}

/** Write intermediate results for a single model */
export function writeIntermediate(modelTag: string, results: unknown): void {
  ensureDirs();
  const safeName = modelTag.replace(/[/:]/g, "-");
  const filePath = join(INTERMEDIATE_DIR, `${safeName}.json`);
  writeFileSync(filePath, JSON.stringify(results, null, 2));
}

/** Recover results from intermediate files if main results.json is corrupt */
export function recoverFromIntermediate(): EvalRun | null {
  ensureDirs();
  if (!existsSync(INTERMEDIATE_DIR)) return null;

  const files = readdirSync(INTERMEDIATE_DIR).filter((f) => f.endsWith(".json"));
  if (files.length === 0) return null;

  // Each intermediate file contains an array of EvalResult for one model.
  // We can rebuild a partial EvalRun from these.
  const allResults: unknown[] = [];
  for (const file of files) {
    try {
      const data = JSON.parse(readFileSync(join(INTERMEDIATE_DIR, file), "utf-8"));
      if (Array.isArray(data)) {
        allResults.push(...data);
      }
    } catch {
      // skip corrupt intermediate files
    }
  }

  if (allResults.length === 0) return null;

  // Return a shell EvalRun with recovered results
  return {
    id: "recovered",
    startedAt: new Date().toISOString(),
    status: "paused",
    config: {
      runsPerPrompt: 3,
      timeoutSeconds: 300,
      weights: { accuracy: 0.25, reasoning: 0.25, structure: 0.25, insight: 0.25 },
      round2TopN: 5,
      round2Points: [100, 70, 40, 20, 10],
    },
    models: [],
    prompts: [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: allResults as any[],
    totalGenerations: 0,
    completedGenerations: allResults.length,
  };
}
