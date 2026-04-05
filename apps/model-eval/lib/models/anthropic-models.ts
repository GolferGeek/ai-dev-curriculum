import { ModelConfig } from "@/lib/types";

export const ANTHROPIC_MODELS: ModelConfig[] = [
  {
    id: "anthropic:claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    provider: "anthropic",
    model: "claude-haiku-4-5-20250514",
    role: "contestant",
    selected: false,
    supportsTools: true,
    supportsImages: true,
    approxParams: "~20B",
  },
  {
    id: "anthropic:claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    provider: "anthropic",
    model: "claude-sonnet-4-6-20250514",
    role: "contestant",
    selected: false,
    supportsTools: true,
    supportsImages: true,
    approxParams: "~70B",
  },
];
