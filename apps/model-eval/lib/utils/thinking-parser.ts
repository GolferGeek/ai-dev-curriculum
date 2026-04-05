/**
 * Parse thinking model responses to separate reasoning from answer.
 *
 * Supports multiple formats:
 * - Gemma 4: "Thinking...\n<reasoning>\n...done thinking.\n<answer>"
 * - DeepSeek R1: "<think>\n<reasoning>\n</think>\n<answer>"
 * - QwQ: "<think>\n<reasoning>\n</think>\n<answer>"
 * - Generic: any <thinking>...</thinking> or <think>...</think> blocks
 */

export interface ParsedResponse {
  fullResponse: string;
  thinkingContent: string;
  answerContent: string;
  isThinkingModel: boolean;
}

const THINKING_PATTERNS: { start: RegExp; end: RegExp; label: string }[] = [
  // DeepSeek R1 / QwQ style: <think>...</think>
  { start: /^<think>\s*/im, end: /<\/think>\s*/im, label: "think-tags" },
  // Generic <thinking>...</thinking>
  { start: /^<thinking>\s*/im, end: /<\/thinking>\s*/im, label: "thinking-tags" },
  // Gemma 4 style: "Thinking...\n" ... "...done thinking.\n"
  { start: /^Thinking\.\.\.\s*/im, end: /\.\.\.done thinking\.\s*/im, label: "gemma-style" },
];

export function parseThinkingResponse(response: string): ParsedResponse {
  const trimmed = response.trim();

  for (const pattern of THINKING_PATTERNS) {
    const startMatch = trimmed.match(pattern.start);
    if (!startMatch) continue;

    const afterStart = trimmed.slice(startMatch.index! + startMatch[0].length);
    const endMatch = afterStart.match(pattern.end);

    if (endMatch) {
      const thinkingContent = afterStart.slice(0, endMatch.index!).trim();
      const answerContent = afterStart.slice(endMatch.index! + endMatch[0].length).trim();

      return {
        fullResponse: trimmed,
        thinkingContent,
        answerContent: answerContent || trimmed, // fallback if answer is empty
        isThinkingModel: true,
      };
    }

    // Start marker found but no end marker — treat everything after start as thinking,
    // and there's no separate answer (model might still be in thinking mode)
    return {
      fullResponse: trimmed,
      thinkingContent: afterStart.trim(),
      answerContent: afterStart.trim(), // use full content as answer too
      isThinkingModel: true,
    };
  }

  // No thinking markers found — regular model
  return {
    fullResponse: trimmed,
    thinkingContent: "",
    answerContent: trimmed,
    isThinkingModel: false,
  };
}

/**
 * Estimate token count from text (rough: ~4 chars per token for English)
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Given total tokens, total duration, and the parsed response,
 * estimate thinking vs answer token splits and speeds.
 */
export function splitTokenMetrics(
  totalTokens: number,
  totalDurationMs: number,
  parsed: ParsedResponse
): {
  thinkingTokens: number;
  answerTokens: number;
  thinkingDurationMs: number;
  answerDurationMs: number;
  thinkingTokensPerSecond: number;
  answerTokensPerSecond: number;
} {
  if (!parsed.isThinkingModel || !parsed.thinkingContent) {
    return {
      thinkingTokens: 0,
      answerTokens: totalTokens,
      thinkingDurationMs: 0,
      answerDurationMs: totalDurationMs,
      thinkingTokensPerSecond: 0,
      answerTokensPerSecond: totalDurationMs > 0
        ? totalTokens / (totalDurationMs / 1000)
        : 0,
    };
  }

  // Estimate split based on character ratio
  const thinkingChars = parsed.thinkingContent.length;
  const answerChars = parsed.answerContent.length;
  const totalChars = thinkingChars + answerChars;

  if (totalChars === 0) {
    return {
      thinkingTokens: 0,
      answerTokens: totalTokens,
      thinkingDurationMs: 0,
      answerDurationMs: totalDurationMs,
      thinkingTokensPerSecond: 0,
      answerTokensPerSecond: 0,
    };
  }

  const thinkingRatio = thinkingChars / totalChars;
  const thinkingTokens = Math.round(totalTokens * thinkingRatio);
  const answerTokens = totalTokens - thinkingTokens;
  const thinkingDurationMs = Math.round(totalDurationMs * thinkingRatio);
  const answerDurationMs = totalDurationMs - thinkingDurationMs;

  return {
    thinkingTokens,
    answerTokens,
    thinkingDurationMs,
    answerDurationMs,
    thinkingTokensPerSecond: thinkingDurationMs > 0
      ? thinkingTokens / (thinkingDurationMs / 1000)
      : 0,
    answerTokensPerSecond: answerDurationMs > 0
      ? answerTokens / (answerDurationMs / 1000)
      : 0,
  };
}
