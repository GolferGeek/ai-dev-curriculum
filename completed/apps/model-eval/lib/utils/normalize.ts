/* ── Normalize tool call formats across providers ── */

import { NormalizedToolCall } from "@/lib/types";

/**
 * Normalize Ollama tool calls.
 * Ollama returns: { function: { name, arguments: object } }
 */
export function normalizeOllamaToolCalls(
  toolCalls: Array<{ function: { name: string; arguments: Record<string, unknown> } }>
): NormalizedToolCall[] {
  if (!toolCalls || !Array.isArray(toolCalls)) return [];
  return toolCalls.map((tc) => ({
    name: tc.function.name,
    arguments: tc.function.arguments ?? {},
  }));
}

/**
 * Normalize OpenAI/OpenRouter tool calls.
 * OpenAI returns: { function: { name, arguments: string (JSON) } }
 */
export function normalizeOpenAIToolCalls(
  toolCalls: Array<{ function: { name: string; arguments: string } }>
): NormalizedToolCall[] {
  if (!toolCalls || !Array.isArray(toolCalls)) return [];
  return toolCalls.map((tc) => {
    let args: Record<string, unknown> = {};
    try {
      args = JSON.parse(tc.function.arguments);
    } catch {
      args = { _raw: tc.function.arguments };
    }
    return { name: tc.function.name, arguments: args };
  });
}

/**
 * Normalize Anthropic tool_use content blocks.
 * Anthropic returns content blocks: { type: "tool_use", name, input: object }
 */
export function normalizeAnthropicToolCalls(
  contentBlocks: Array<{ type: string; name?: string; input?: Record<string, unknown> }>
): NormalizedToolCall[] {
  if (!contentBlocks || !Array.isArray(contentBlocks)) return [];
  return contentBlocks
    .filter((b) => b.type === "tool_use")
    .map((b) => ({
      name: b.name ?? "unknown",
      arguments: b.input ?? {},
    }));
}
