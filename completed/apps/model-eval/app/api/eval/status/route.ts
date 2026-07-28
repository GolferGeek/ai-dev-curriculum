/* ── GET /api/eval/status — current run status ── */

import { NextResponse } from "next/server";
import { getRunnerStatus } from "@/lib/harness/runner";

export async function GET() {
  try {
    const status = getRunnerStatus();
    return NextResponse.json(status);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
