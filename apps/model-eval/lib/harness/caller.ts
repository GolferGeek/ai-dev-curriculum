/* ── Unified model caller — dispatches to provider-specific callers ── */

import { GenerationResult, ModelConfig, PromptConfig, RunConfig } from "@/lib/types";
import { callOllama } from "./callers/ollama";
import { callAnthropic } from "./callers/anthropic";
import { callOpenRouter } from "./callers/openrouter";
import { parseThinkingResponse, splitTokenMetrics } from "@/lib/utils/thinking-parser";

/**
 * Call a model with a prompt, routing to the correct provider.
 * Automatically detects and parses thinking model responses (Gemma 4, DeepSeek R1, QwQ).
 * Returns a GenerationResult — never throws; errors are captured in the result.
 */
export async function callModel(
  model: ModelConfig,
  prompt: PromptConfig,
  config: RunConfig
): Promise<GenerationResult> {
  const timeoutMs = (config.timeoutSeconds || 300) * 1000;

  const emptyResult = (error: string): GenerationResult => ({
    model: model.model,
    provider: model.provider,
    prompt: prompt.id,
    response: "",
    answerContent: "",
    isThinkingModel: false,
    tokensPerSecond: 0,
    totalTokens: 0,
    latencyMs: 0,
    error,
    timestamp: new Date().toISOString(),
  });

  try {
    let raw: GenerationResult;

    switch (model.provider) {
      case "ollama":
        raw = await callOllama(model, prompt, timeoutMs);
        break;
      case "anthropic":
        raw = await callAnthropic(model, prompt, timeoutMs, config.anthropicApiKey);
        break;
      case "openrouter":
        raw = await callOpenRouter(model, prompt, timeoutMs, config.openrouterApiKey);
        break;
      default:
        return emptyResult(`Unknown provider: ${model.provider}`);
    }

    // Parse thinking model response
    const parsed = parseThinkingResponse(raw.response);
    const tokenSplit = splitTokenMetrics(raw.totalTokens, raw.latencyMs, parsed);

    return {
      ...raw,
      answerContent: parsed.answerContent,
      thinkingContent: parsed.thinkingContent || undefined,
      isThinkingModel: parsed.isThinkingModel,
      thinkingTokens: tokenSplit.thinkingTokens || undefined,
      thinkingTokensPerSecond: tokenSplit.thinkingTokensPerSecond || undefined,
      thinkingDurationMs: tokenSplit.thinkingDurationMs || undefined,
      answerTokens: tokenSplit.answerTokens || undefined,
      answerTokensPerSecond: tokenSplit.answerTokensPerSecond || undefined,
      answerDurationMs: tokenSplit.answerDurationMs || undefined,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return emptyResult(message);
  }
}
