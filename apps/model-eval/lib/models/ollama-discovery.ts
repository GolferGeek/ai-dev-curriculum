import { ModelConfig } from "@/lib/types";

const OLLAMA_BASE = "http://localhost:11434";

interface OllamaModel {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details?: {
    parent_model?: string;
    format?: string;
    family?: string;
    families?: string[];
    parameter_size?: string;
    quantization_level?: string;
  };
}

interface OllamaTagsResponse {
  models: OllamaModel[];
}

export async function discoverOllamaModels(): Promise<ModelConfig[]> {
  const res = await fetch(`${OLLAMA_BASE}/api/tags`, {
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) {
    throw new Error(`Ollama returned ${res.status}`);
  }

  const data: OllamaTagsResponse = await res.json();

  return data.models.map((m) => ({
    id: `ollama:${m.name}`,
    name: m.name,
    provider: "ollama" as const,
    model: m.name,
    role: "contestant" as const,
    selected: false,
    supportsTools: true, // optimistic default; can be tested
    supportsImages: false, // conservative default
    approxParams: m.details?.parameter_size,
    size: m.size,
    modifiedAt: m.modified_at,
  }));
}

export async function testOllamaModel(
  model: string
): Promise<{ success: boolean; tokensPerSec?: number; error?: string }> {
  try {
    const start = Date.now();
    const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "Say hello in one word." }],
        stream: false,
        options: { num_predict: 20 },
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
      return { success: false, error: `Ollama returned ${res.status}` };
    }

    const data = await res.json();
    const elapsed = Date.now() - start;
    const tokensPerSec =
      data.eval_count && data.eval_duration
        ? data.eval_count / (data.eval_duration / 1e9)
        : data.eval_count
          ? data.eval_count / (elapsed / 1000)
          : undefined;

    return { success: true, tokensPerSec };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
