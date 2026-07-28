/* ── POST /api/eval/start — start an evaluation run ── */

import { NextResponse } from "next/server";
import { startEvaluation, isRunning } from "@/lib/harness/runner";
import { ModelConfig, PromptConfig, RunConfig } from "@/lib/types";
import { DEFAULT_CONFIG } from "@/lib/config";

export async function POST(request: Request) {
  try {
    if (isRunning()) {
      return NextResponse.json(
        { error: "An evaluation is already running. Pause it first." },
        { status: 409 }
      );
    }

    const body = await request.json();
    const models = body.models as ModelConfig[];
    const prompts = body.prompts as PromptConfig[];
    const config = { ...DEFAULT_CONFIG, ...(body.config || {}) } as RunConfig;

    if (!models || models.length === 0) {
      return NextResponse.json(
        { error: "No models provided" },
        { status: 400 }
      );
    }

    if (!prompts || prompts.length === 0) {
      return NextResponse.json(
        { error: "No prompts provided" },
        { status: 400 }
      );
    }

    const evalRun = startEvaluation(models, prompts, config);

    return NextResponse.json({
      id: evalRun.id,
      status: evalRun.status,
      totalGenerations: evalRun.totalGenerations,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
