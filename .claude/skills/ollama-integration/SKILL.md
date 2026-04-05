---
user-invocable: false
name: ollama-integration
description: How to call Ollama's REST API — model management, chat completions, response parsing, token speed measurement. Required for the eval harness.
category: model-eval
used-by-agents: eval-harness-builder
---

# Ollama Integration

How to call local models via Ollama and cloud models via the Anthropic SDK, with timing and token metrics for both.

## Ollama REST API

Base URL: `http://localhost:11434`

### List available models

```
GET /api/tags
```

Response:

```json
{
  "models": [
    {
      "name": "gemma4:e2b",
      "size": 1500000000,
      "digest": "abc123...",
      "modified_at": "2024-03-15T10:00:00Z"
    }
  ]
}
```

Use this before a run to check which models are available. Skip any model not found rather than failing the whole run.

### Pull a model

```
POST /api/pull
Content-Type: application/json

{ "name": "gemma4:e2b" }
```

This streams progress. For non-interactive use, set `"stream": false` to block until complete. Large models (26b+) can take 10+ minutes.

### Chat completion (non-streaming)

```
POST /api/chat
Content-Type: application/json

{
  "model": "gemma4:e2b",
  "messages": [
    { "role": "system", "content": "You are an analyst." },
    { "role": "user", "content": "Analyze this risk..." }
  ],
  "stream": false
}
```

**Always set `stream: false`** for the eval harness. Streaming complicates timing and token counting.

Response:

```json
{
  "model": "gemma4:e2b",
  "created_at": "2024-03-15T12:00:00Z",
  "message": {
    "role": "assistant",
    "content": "{ \"risk_score\": 72, ... }"
  },
  "done": true,
  "total_duration": 5000000000,
  "load_duration": 1200000000,
  "prompt_eval_count": 156,
  "prompt_eval_duration": 800000000,
  "eval_count": 342,
  "eval_duration": 3000000000
}
```

### Token speed calculation (Ollama)

```typescript
const tokensPerSecond = response.eval_count / (response.eval_duration / 1e9);
// eval_count = number of tokens generated
// eval_duration = generation time in nanoseconds
// Example: 342 / (3000000000 / 1e9) = 342 / 3.0 = 114 tokens/sec
```

Key fields:
- `eval_count` — tokens generated (output only, does not include prompt)
- `eval_duration` — time spent generating in **nanoseconds**
- `prompt_eval_count` — tokens in the prompt (for reference)
- `total_duration` — wall clock including model load (don't use for speed comparison)

### Options for controlling generation

```json
{
  "model": "gemma4:e2b",
  "messages": [...],
  "stream": false,
  "options": {
    "temperature": 0.7,
    "num_predict": 4096
  }
}
```

Set `num_predict` to prevent runaway generation on slow models. For eval prompts, 4096 tokens is generous.

---

## Anthropic API (Claude models)

For `claude-haiku-4-5` and `claude-sonnet-4-6`, use the Anthropic SDK. These are cloud models — no Ollama involved.

### Setup

```typescript
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

Requires `ANTHROPIC_API_KEY` in the environment. The harness should fail clearly if this is missing and Anthropic models are in the test list.

### Chat completion with timing

```typescript
const startTime = Date.now();

const response = await anthropic.messages.create({
  model: "claude-haiku-4-5",
  max_tokens: 4096,
  messages: [
    { role: "user", content: "Analyze this risk..." }
  ],
});

const elapsedMs = Date.now() - startTime;
const elapsedSec = elapsedMs / 1000;
const outputTokens = response.usage.output_tokens;
const tokensPerSecond = outputTokens / elapsedSec;
```

### Token speed calculation (Anthropic)

```typescript
const tokensPerSecond = response.usage.output_tokens / (elapsedMs / 1000);
// output_tokens from response.usage
// elapsed time from Date.now() before/after
// Note: this includes network latency, so it's not pure generation speed
//       but it's the user-experienced speed, which is what matters for comparison
```

Key fields from `response.usage`:
- `input_tokens` — prompt tokens
- `output_tokens` — generated tokens

The response text is in `response.content[0].text`.

---

## Unified caller — TypeScript example

```typescript
interface ModelConfig {
  name: string;
  provider: "ollama" | "anthropic";
  model: string; // Ollama model tag or Anthropic model ID
}

interface GenerationResult {
  model: string;
  response: string;
  tokensPerSecond: number;
  totalTokens: number;
  latencyMs: number;
}

async function callModel(
  config: ModelConfig,
  messages: { role: string; content: string }[]
): Promise<GenerationResult> {
  if (config.provider === "ollama") {
    return callOllama(config, messages);
  } else {
    return callAnthropic(config, messages);
  }
}

async function callOllama(
  config: ModelConfig,
  messages: { role: string; content: string }[]
): Promise<GenerationResult> {
  const startTime = Date.now();

  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: config.model,
      messages,
      stream: false,
      options: { num_predict: 4096 },
    }),
  });

  if (!res.ok) {
    throw new Error(`Ollama error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const latencyMs = Date.now() - startTime;
  const tokensPerSecond = data.eval_count / (data.eval_duration / 1e9);

  return {
    model: config.name,
    response: data.message.content,
    tokensPerSecond,
    totalTokens: data.eval_count,
    latencyMs,
  };
}

async function callAnthropic(
  config: ModelConfig,
  messages: { role: string; content: string }[]
): Promise<GenerationResult> {
  const anthropic = new Anthropic();
  const startTime = Date.now();

  const response = await anthropic.messages.create({
    model: config.model,
    max_tokens: 4096,
    messages: messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  });

  const latencyMs = Date.now() - startTime;
  const outputTokens = response.usage.output_tokens;
  const tokensPerSecond = outputTokens / (latencyMs / 1000);

  return {
    model: config.name,
    response: response.content[0].type === "text" ? response.content[0].text : "",
    tokensPerSecond,
    totalTokens: outputTokens,
    latencyMs,
  };
}
```

---

## Error handling

### Model not found (Ollama)

Ollama returns `404` if the model isn't pulled. Check with `GET /api/tags` first, or catch 404 and skip:

```typescript
if (res.status === 404) {
  console.warn(`Model ${config.model} not available, skipping`);
  return null;
}
```

### Ollama not running

`fetch` will throw `ECONNREFUSED` if Ollama isn't running. Catch this at startup:

```typescript
async function checkOllamaRunning(): Promise<boolean> {
  try {
    const res = await fetch("http://localhost:11434/api/tags");
    return res.ok;
  } catch {
    return false;
  }
}
```

### Timeout for slow models

Large models (26b+) can take minutes per response. Use `AbortController`:

```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000); // 5 min

try {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: config.model, messages, stream: false }),
    signal: controller.signal,
  });
  // ... process response
} catch (err) {
  if (err.name === "AbortError") {
    console.warn(`Model ${config.model} timed out after 5 minutes, skipping`);
    return null;
  }
  throw err;
} finally {
  clearTimeout(timeout);
}
```

### Anthropic API key missing

```typescript
if (config.provider === "anthropic" && !process.env.ANTHROPIC_API_KEY) {
  console.warn("ANTHROPIC_API_KEY not set, skipping Anthropic models");
  return null;
}
```

### Rate limiting (Anthropic)

Anthropic returns `429` on rate limit. Implement exponential backoff:

```typescript
async function callWithRetry(fn: () => Promise<GenerationResult>, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err?.status === 429 && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        console.warn(`Rate limited, retrying in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw err;
    }
  }
}
```
