/* ── POST /api/eval/pause — pause the runner ── */

import { NextResponse } from "next/server";
import { pauseRunner, isRunning } from "@/lib/harness/runner";

export async function POST() {
  try {
    if (!isRunning()) {
      return NextResponse.json(
        { error: "No evaluation is currently running" },
        { status: 400 }
      );
    }

    pauseRunner();
    return NextResponse.json({ status: "paused" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
