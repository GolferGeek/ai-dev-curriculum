/* ── POST /api/eval/call — single model+prompt call for testing ── */

import { NextResponse } from "next/server";
import { callModel } from "@/lib/harness/caller";
import { ModelConfig, PromptConfig, RunConfig } from "@/lib/types";
import { DEFAULT_CONFIG } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const model = body.model as ModelConfig;
    const prompt = body.prompt as PromptConfig;
    const config = { ...DEFAULT_CONFIG, ...(body.config || {}) } as RunConfig;

    if (!model || !model.provider || !model.model) {
      return NextResponse.json(
        { error: "Missing or invalid model config" },
        { status: 400 }
      );
    }

    if (!prompt || !prompt.prompt) {
      return NextResponse.json(
        { error: "Missing or invalid prompt config" },
        { status: 400 }
      );
    }

    const result = await callModel(model, prompt, config);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
