import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, provider, apiKey } = body;

    if (!model || !provider) {
      return NextResponse.json(
        { error: "model and provider are required" },
        { status: 400 }
      );
    }

    const start = Date.now();

    if (provider === "ollama") {
      const res = await fetch("http://localhost:11434/api/chat", {
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
        return NextResponse.json(
          { success: false, error: `Ollama returned ${res.status}` },
          { status: 200 }
        );
      }

      const data = await res.json();
      const elapsed = Date.now() - start;
      const tokensPerSec =
        data.eval_count && data.eval_duration
          ? data.eval_count / (data.eval_duration / 1e9)
          : undefined;

      return NextResponse.json({
        success: true,
        response: data.message?.content,
        tokensPerSec,
        latencyMs: elapsed,
      });
    }

    if (provider === "anthropic") {
      if (!apiKey) {
        return NextResponse.json(
          { success: false, error: "Anthropic API key required" },
          { status: 200 }
        );
      }

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: 50,
          messages: [{ role: "user", content: "Say hello in one word." }],
        }),
        signal: AbortSignal.timeout(30000),
      });

      const elapsed = Date.now() - start;
      const data = await res.json();

      if (!res.ok) {
        return NextResponse.json(
          {
            success: false,
            error: data.error?.message || `Anthropic returned ${res.status}`,
          },
          { status: 200 }
        );
      }

      const outputTokens = data.usage?.output_tokens || 0;
      const tokensPerSec =
        outputTokens > 0 ? outputTokens / (elapsed / 1000) : undefined;

      return NextResponse.json({
        success: true,
        response:
          data.content?.[0]?.type === "text" ? data.content[0].text : "",
        tokensPerSec,
        latencyMs: elapsed,
      });
    }

    if (provider === "openrouter") {
      if (!apiKey) {
        return NextResponse.json(
          { success: false, error: "OpenRouter API key required" },
          { status: 200 }
        );
      }

      const res = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "http://localhost:3200",
            "X-Title": "Model Eval Lab",
          },
          body: JSON.stringify({
            model,
            max_tokens: 50,
            messages: [{ role: "user", content: "Say hello in one word." }],
          }),
          signal: AbortSignal.timeout(30000),
        }
      );

      const elapsed = Date.now() - start;
      const data = await res.json();

      if (!res.ok) {
        return NextResponse.json(
          {
            success: false,
            error:
              data.error?.message || `OpenRouter returned ${res.status}`,
          },
          { status: 200 }
        );
      }

      const outputTokens = data.usage?.completion_tokens || 0;
      const tokensPerSec =
        outputTokens > 0 ? outputTokens / (elapsed / 1000) : undefined;

      return NextResponse.json({
        success: true,
        response: data.choices?.[0]?.message?.content || "",
        tokensPerSec,
        latencyMs: elapsed,
      });
    }

    return NextResponse.json(
      { error: `Unknown provider: ${provider}` },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 200 }
    );
  }
}
