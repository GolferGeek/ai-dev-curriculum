/* ── POST /api/eval/resume — resume a paused run ── */

import { NextResponse } from "next/server";
import { resumeRunner, getRunnerStatus } from "@/lib/harness/runner";

export async function POST() {
  try {
    const status = getRunnerStatus();
    if (status.status !== "paused") {
      return NextResponse.json(
        { error: "No paused evaluation to resume" },
        { status: 400 }
      );
    }

    resumeRunner();
    return NextResponse.json({ status: "running" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
