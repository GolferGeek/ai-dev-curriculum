/* ── Ollama caller — POST http://localhost:11434/api/chat ── */

import {
  GenerationResult,
  ModelConfig,
  PromptConfig,
  NormalizedToolCall,
} from "@/lib/types";
import { normalizeOllamaToolCalls } from "@/lib/utils/normalize";
import { formatImageForOllama } from "@/lib/utils/multimodal";

interface OllamaMessage {
  role: "user";
  content: string;
  images?: string[];
}

interface OllamaRequestBody {
  model: string;
  messages: OllamaMessage[];
  stream: false;
  options: { num_predict: number };
  tools?: PromptConfig["tools"];
}

interface OllamaToolCall {
  function: { name: string; arguments: Record<string, unknown> };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseOllamaToolCall(value: unknown): OllamaToolCall | null {
  if (!isRecord(value) || !isRecord(value.function)) return null;
  if (typeof value.function.name !== "string") return null;

  return {
    function: {
      name: value.function.name,
      arguments: isRecord(value.function.arguments)
        ? value.function.arguments
        : {},
    },
  };
}

export async function callOllama(
  model: ModelConfig,
  prompt: PromptConfig,
  timeoutMs: number
): Promise<GenerationResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const startTime = Date.now();

  try {
    // Build the user message
    const userMessage: OllamaMessage = {
      role: "user",
      content: prompt.prompt,
    };

    // Add images for multimodal prompts
    if (prompt.image && model.supportsImages) {
      try {
        userMessage.images = formatImageForOllama(prompt.image);
      } catch {
        // If image can't be read, proceed without it
      }
    }

    // Build request body
    const body: OllamaRequestBody = {
      model: model.model,
      messages: [userMessage],
      stream: false,
      options: { num_predict: 4096 },
    };

    // Add tools for tool-calling prompts
    if (prompt.tools && prompt.tools.length > 0 && model.supportsTools) {
      body.tools = prompt.tools;
    }

    const res = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      return makeErrorResult(model, prompt, Date.now() - startTime, `Ollama error ${res.status}: ${text}`);
    }

    const data: unknown = await res.json();
    const latencyMs = Date.now() - startTime;
    const dataRecord = isRecord(data) ? data : undefined;

    // Calculate tokens/sec from Ollama's native metrics
    const evalCount =
      typeof dataRecord?.eval_count === "number" ? dataRecord.eval_count || 0 : 0;
    const evalDuration =
      typeof dataRecord?.eval_duration === "number"
        ? dataRecord.eval_duration || 1
        : 1; // nanoseconds, avoid div by zero
    const tokensPerSecond = evalCount / (evalDuration / 1e9);

    // Extract response text
    const message = isRecord(dataRecord?.message) ? dataRecord.message : undefined;
    const response = typeof message?.content === "string" ? message.content : "";

    // Extract tool calls if present
    let toolCalls: NormalizedToolCall[] | undefined;
    const providerToolCalls = Array.isArray(message?.tool_calls)
      ? message.tool_calls
          .map(parseOllamaToolCall)
          .filter((toolCall): toolCall is OllamaToolCall => toolCall !== null)
      : [];
    if (providerToolCalls.length > 0) {
      toolCalls = normalizeOllamaToolCalls(providerToolCalls);
    }

    return {
      model: model.model,
      provider: "ollama",
      prompt: prompt.id,
      response,
      answerContent: response, // caller.ts will re-parse with thinking detection
      isThinkingModel: false, // caller.ts will override
      tokensPerSecond: isFinite(tokensPerSecond) ? tokensPerSecond : 0,
      totalTokens: evalCount,
      latencyMs,
      toolCalls,
      timestamp: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const latencyMs = Date.now() - startTime;
    const message = err instanceof Error ? err.message : String(err);

    if (message.includes("abort") || message.includes("AbortError")) {
      return makeErrorResult(model, prompt, latencyMs, `Timeout after ${timeoutMs}ms`);
    }

    return makeErrorResult(model, prompt, latencyMs, message);
  } finally {
    clearTimeout(timeout);
  }
}

function makeErrorResult(
  model: ModelConfig,
  prompt: PromptConfig,
  latencyMs: number,
  error: string
): GenerationResult {
  return {
    model: model.model,
    provider: "ollama",
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
