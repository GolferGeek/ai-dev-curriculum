/* ── OpenRouter caller — OpenAI-compatible API ── */

import {
  GenerationResult,
  ModelConfig,
  PromptConfig,
  NormalizedToolCall,
} from "@/lib/types";
import { normalizeOpenAIToolCalls } from "@/lib/utils/normalize";
import { formatImageForOpenRouter } from "@/lib/utils/multimodal";

const OPENROUTER_BASE = "https://openrouter.ai/api/v1/chat/completions";
const MAX_RETRIES = 3;

export async function callOpenRouter(
  model: ModelConfig,
  prompt: PromptConfig,
  timeoutMs: number,
  apiKey?: string
): Promise<GenerationResult> {
  const key = apiKey || process.env.OPENROUTER_API_KEY;
  if (!key) {
    return makeErrorResult(model, prompt, 0, "OPENROUTER_API_KEY not configured");
  }

  const startTime = Date.now();

  // Build message content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contentParts: any[] = [];

  // Add image if multimodal prompt
  if (prompt.image && model.supportsImages) {
    try {
      contentParts.push(formatImageForOpenRouter(prompt.image));
    } catch {
      // Skip image if it can't be read
    }
  }

  contentParts.push({ type: "text", text: prompt.prompt });

  // Build request body
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: Record<string, any> = {
    model: model.model,
    messages: [{ role: "user", content: contentParts }],
    max_tokens: 4096,
  };

  // Add tools for tool-calling prompts
  if (prompt.tools && prompt.tools.length > 0 && model.supportsTools) {
    body.tools = prompt.tools;
  }

  // Retry with exponential backoff
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(OPENROUTER_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
          "HTTP-Referer": "https://github.com/golfergeek/ai-dev-curriculum",
          "X-Title": "Model Evaluation Lab",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (res.status === 429 && attempt < MAX_RETRIES) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      if (!res.ok) {
        const text = await res.text();
        return makeErrorResult(model, prompt, Date.now() - startTime, `OpenRouter error ${res.status}: ${text}`);
      }

      const data = await res.json();
      const latencyMs = Date.now() - startTime;

      const choice = data.choices?.[0];
      const responseText = choice?.message?.content || "";
      const outputTokens = data.usage?.completion_tokens || 0;
      const tokensPerSecond = outputTokens / (latencyMs / 1000);

      // Extract tool calls
      let toolCalls: NormalizedToolCall[] | undefined;
      if (choice?.message?.tool_calls && choice.message.tool_calls.length > 0) {
        toolCalls = normalizeOpenAIToolCalls(choice.message.tool_calls);
      }

      return {
        model: model.model,
        provider: "openrouter",
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
      clearTimeout(timeout);
      const message = err instanceof Error ? err.message : String(err);

      if (message.includes("abort") || message.includes("AbortError")) {
        return makeErrorResult(model, prompt, Date.now() - startTime, `Timeout after ${timeoutMs}ms`);
      }

      if (attempt < MAX_RETRIES) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      return makeErrorResult(model, prompt, Date.now() - startTime, message);
    }
  }

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
    provider: "openrouter",
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
