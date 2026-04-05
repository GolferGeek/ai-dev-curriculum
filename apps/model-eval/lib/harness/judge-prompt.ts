/* ── Judge prompt templates for Round 1 and Round 2 ── */

/**
 * Build the Round 1 judge prompt: per-response scoring on 4 criteria.
 */
export function buildRound1JudgePrompt(
  promptText: string,
  expectedFormat: string,
  response: string
): string {
  return `You are an expert evaluator assessing an AI model's response to an analyst prompt.

PROMPT THAT WAS GIVEN TO THE MODEL:
${promptText}

EXPECTED OUTPUT FORMAT:
${expectedFormat}

MODEL'S RESPONSE:
${response}

Score this response on four criteria (1-10 each):

1. ACCURACY: Are the conclusions correct and supported by the provided data? Does it hallucinate facts not in the input?
2. REASONING: Does it show multi-step logic? Does it consider alternatives and counterarguments? Is the reasoning chain traceable?
3. STRUCTURE: Does it follow the required output format? Is the JSON valid and complete? Are all required fields present?
4. INSIGHT: Does it surface non-obvious findings? Does it go beyond restating the input to identify patterns, risks, or connections?

You MUST respond with valid JSON only, no other text:
{
  "accuracy": <1-10>,
  "reasoning": <1-10>,
  "structure": <1-10>,
  "insight": <1-10>,
  "commentary": "<2-3 sentences explaining your scores>"
}`;
}

/**
 * Build the Round 2 judge prompt: comparative ranking of top N responses.
 */
export function buildRound2JudgePrompt(
  promptText: string,
  responses: { letter: string; response: string }[]
): string {
  const responseBlocks = responses
    .map((r) => `RESPONSE ${r.letter}:\n${r.response}`)
    .join("\n\n");

  const rankingEntries = responses
    .map(
      (_, i) =>
        `    { "rank": ${i + 1}, "model": "<model letter ${responses.map((r) => r.letter).join("-")}>", "reasoning": "<why ${ordinal(i + 1)}>" }`
    )
    .join(",\n");

  return `You are an expert evaluator comparing ${responses.length} AI model responses to the same analyst prompt.

PROMPT:
${promptText}

${responseBlocks}

Rank these responses from best (1st) to worst (${ordinal(responses.length)}). Consider accuracy, reasoning depth, output format compliance, and insight quality.

You MUST respond with valid JSON only, no other text:
{
  "ranking": [
${rankingEntries}
  ],
  "commentary": "<overall comparison notes>"
}`;
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
