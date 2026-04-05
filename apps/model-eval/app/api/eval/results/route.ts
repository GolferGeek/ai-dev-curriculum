/* ── GET /api/eval/results — read current results ── */

import { NextResponse } from "next/server";
import { readResults, recoverFromIntermediate } from "@/lib/harness/results-writer";

export async function GET() {
  try {
    let results = readResults();

    // If main results file is missing/corrupt, try recovering from intermediates
    if (!results) {
      results = recoverFromIntermediate();
    }

    if (!results) {
      return NextResponse.json({ results: null, message: "No results yet" });
    }

    return NextResponse.json(results);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
