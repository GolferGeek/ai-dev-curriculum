import { NextResponse } from "next/server";
import { answerQuestion } from "@/src/lib/advisor";
import { loadActiveProgramSnapshot } from "@/src/lib/active-program";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON request body." }, { status: 400 });
  }
  const question = typeof payload === "object" && payload !== null && "question" in payload
    ? (payload as { question?: unknown }).question
    : undefined;
  if (typeof question !== "string" || question.trim().length < 3 || question.length > 500) {
    return NextResponse.json({ error: "Question must contain 3–500 characters." }, { status: 400 });
  }
  return NextResponse.json(answerQuestion(question.trim(), await loadActiveProgramSnapshot()));
}
