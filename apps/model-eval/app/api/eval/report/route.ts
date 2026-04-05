/* ── GET /api/eval/report — generate markdown report ── */

import { NextResponse } from "next/server";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join } from "path";
import { readResults } from "@/lib/harness/results-writer";
import { generateReport } from "@/lib/utils/report";

const REPORT_DIR = resolve(process.cwd(), "..", "..", "docs", "artifacts");
const REPORT_PATH = join(REPORT_DIR, "model-eval-report.md");

export async function GET() {
  try {
    const evalRun = readResults();
    if (!evalRun) {
      return NextResponse.json({ error: "No results to report" }, { status: 404 });
    }

    const markdown = generateReport(evalRun);

    // Write report to docs/artifacts/
    try {
      if (!existsSync(REPORT_DIR)) mkdirSync(REPORT_DIR, { recursive: true });
      writeFileSync(REPORT_PATH, markdown);
    } catch {
      // Non-critical if we cannot write to docs
    }

    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/markdown",
        "Content-Disposition": 'attachment; filename="model-eval-report.md"',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
