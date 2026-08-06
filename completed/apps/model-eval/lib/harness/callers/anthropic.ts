/* ── Anthropic caller — uses @anthropic-ai/sdk ── */

import {
  GenerationResult,
  ModelConfig,
  PromptConfig,
  NormalizedToolCall,
} from "@/lib/types";
import { normalizeAnthropicToolCalls } from "@/lib/utils/normalize";
import { formatImageForAnthropic } from "@/lib/utils/multimodal";
import Anthropic from "@anthropic-ai/sdk";

const MAX_RETRIES = 3;

export async function callAnthropic(
  model: ModelConfig,
  prompt: PromptConfig,
  timeoutMs: number,
  apiKey?: string
): Promise<GenerationResult> {
  const key = apiKey || process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return makeErrorResult(model, prompt, 0, "ANTHROPIC_API_KEY not configured");
  }

  const anthropic = new Anthropic({ apiKey: key });
  const startTime = Date.now();

  // Build message content
  const contentParts: Anthropic.ContentBlockParam[] = [];

  // Add image if multimodal prompt
  if (prompt.image && model.supportsImages) {
    try {
      contentParts.push(formatImageForAnthropic(prompt.image));
    } catch {
      // Skip image if it can't be read
    }
  }

  contentParts.push({ type: "text", text: prompt.prompt });

  // Build request params
  const params: Anthropic.MessageCreateParamsNonStreaming = {
    model: model.model,
    max_tokens: 4096,
    messages: [{ role: "user" as const, content: contentParts }],
  };

  // Add tools for tool-calling prompts
  if (prompt.tools && prompt.tools.length > 0 && model.supportsTools) {
    params.tools = prompt.tools.map((t) => ({
      name: t.function.name,
      description: t.function.description,
      input_schema: t.function.parameters,
    }));
  }

  // Retry with exponential backoff for rate limiting
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await anthropic.messages.create(params);
      const latencyMs = Date.now() - startTime;
      const outputTokens = response.usage.output_tokens;
      const tokensPerSecond = outputTokens / (latencyMs / 1000);

      // Extract text response
      let responseText = "";
      const textBlocks = response.content.filter(
        (block): block is Anthropic.TextBlock => block.type === "text"
      );
      if (textBlocks.length > 0) {
        responseText = textBlocks.map((block) => block.text).join("\n");
      }

      // Extract tool calls
      let toolCalls: NormalizedToolCall[] | undefined;
      const toolBlocks = response.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
      );
      if (toolBlocks.length > 0) {
        toolCalls = normalizeAnthropicToolCalls(toolBlocks);
      }

      return {
        model: model.model,
        provider: "anthropic",
        prompt: prompt.id,
        response: responseText,
      answerContent: responseText,
      isThinkingModel: false,
        tokensPerSecond: isFinite(tokensPerSecond) ? tokensPerSecond : 0,
        totalTokens: outputTokens,
        latencyMs,
        toolCalls,
        timestamp: new Date().toISOString(),
      };
    } catch (err: unknown) {
      const status = err instanceof Anthropic.APIError ? err.status : undefined;
      if (status === 429 && attempt < MAX_RETRIES) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      const latencyMs = Date.now() - startTime;
      if (latencyMs > timeoutMs) {
        return makeErrorResult(model, prompt, latencyMs, `Timeout after ${timeoutMs}ms`);
      }

      const message = err instanceof Error ? err.message : String(err);
      return makeErrorResult(model, prompt, latencyMs, message);
    }
  }

  // Should not reach here, but safety net
  return makeErrorResult(model, prompt, Date.now() - startTime, "Max retries exceeded");
}

function makeErrorResult(
  model: ModelConfig,
  prompt: PromptConfig,
  latencyMs: number,
  error: string
): GenerationResult {
  return {
    model: model.model,
    provider: "anthropic",
    prompt: prompt.id,
    response: "",
      answerContent: "",
      isThinkingModel: false,
    tokensPerSecond: 0,
    totalTokens: 0,
    latencyMs,
    error,
    timestamp: new Date().toISOString(),
  };
}
