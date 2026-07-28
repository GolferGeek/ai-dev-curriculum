import { PromptConfig } from "@/lib/types";
import { TIER_1_PROMPTS } from "./tier1";
import { TIER_2_PROMPTS } from "./tier2";
import { TIER_3_PROMPTS } from "./tier3";
import { TIER_4_PROMPTS } from "./tier4";

export { TIER_1_PROMPTS } from "./tier1";
export { TIER_2_PROMPTS } from "./tier2";
export { TIER_3_PROMPTS } from "./tier3";
export { TIER_4_PROMPTS } from "./tier4";

export const BUILT_IN_PROMPTS: PromptConfig[] = [
  ...TIER_1_PROMPTS,
  ...TIER_2_PROMPTS,
  ...TIER_3_PROMPTS,
  ...TIER_4_PROMPTS,
];

export const TIER_NAMES: Record<number, string> = {
  1: "Quick Tasks",
  2: "Tool Calling",
  3: "Multimodal",
  4: "Analyst",
};

export const TIER_DESCRIPTIONS: Record<number, string> = {
  1: "Fast, focused tasks that test speed and basic competence",
  2: "Tool/function calling ability and structured output compliance",
  3: "Multimodal image + text comprehension tasks",
  4: "Analyst-grade reasoning, synthesis, and decomposition",
};
