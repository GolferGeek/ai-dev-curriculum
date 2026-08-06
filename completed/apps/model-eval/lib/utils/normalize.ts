/* ── Normalize tool call formats across providers ── */

import { NormalizedToolCall } from "@/lib/types";

interface AnthropicToolUseBlock {
  type: "tool_use";
  name: string;
  input: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

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
  contentBlocks: AnthropicToolUseBlock[]
): NormalizedToolCall[] {
  return contentBlocks.map((block) => ({
    name: block.name,
    arguments: isRecord(block.input) ? block.input : {},
  }));
}
