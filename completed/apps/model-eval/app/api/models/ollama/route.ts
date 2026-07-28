import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:11434/api/tags", {
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Ollama returned ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();

    const models = (data.models || []).map(
      (m: {
        name: string;
        size: number;
        modified_at: string;
        details?: { parameter_size?: string };
      }) => ({
        id: `ollama:${m.name}`,
        name: m.name,
        provider: "ollama",
        model: m.name,
        role: "contestant",
        selected: false,
        supportsTools: true,
        supportsImages: false,
        approxParams: m.details?.parameter_size,
        size: m.size,
        modifiedAt: m.modified_at,
      })
    );

    return NextResponse.json({ models });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // If Ollama is not running, return empty list with a flag
    if (
      message.includes("ECONNREFUSED") ||
      message.includes("fetch failed") ||
      message.includes("abort")
    ) {
      return NextResponse.json({
        models: [],
        ollamaAvailable: false,
        error: "Ollama not detected. Is it running on localhost:11434?",
      });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
