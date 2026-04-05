import type { EvalRun, EvalResult, Round2Result } from "@/lib/types";

function getModelName(evalRun: EvalRun, modelId: string): string {
  const model = evalRun.models.find((m) => m.id === modelId);
  return model?.name ?? modelId;
}

function getModelSpeed(evalRun: EvalRun, modelId: string): number {
  const results = evalRun.results.filter(
    (r) => r.modelId === modelId && r.avgTokensPerSecond > 0
  );
  if (results.length === 0) return 0;
  return results.reduce((s, r) => s + r.avgTokensPerSecond, 0) / results.length;
}

function getModelAvgScore(evalRun: EvalRun, modelId: string): number {
  const results = evalRun.results.filter(
    (r) => r.modelId === modelId && r.avgScore > 0
  );
  if (results.length === 0) return 0;
  return results.reduce((s, r) => s + r.avgScore, 0) / results.length;
}

function getModelConsistency(evalRun: EvalRun, modelId: string): number {
  const results = evalRun.results.filter(
    (r) => r.modelId === modelId && r.runs.length >= 2
  );
  if (results.length === 0) return 0;
  return results.reduce((s, r) => s + r.consistency, 0) / results.length;
}

interface ModelLeaderboardEntry {
  modelId: string;
  name: string;
  avgScore: number;
  avgSpeed: number;
  consistency: number;
}

function buildLeaderboard(evalRun: EvalRun): ModelLeaderboardEntry[] {
  return evalRun.models
    .map((m) => ({
      modelId: m.id,
      name: m.name,
      avgScore: getModelAvgScore(evalRun, m.id),
      avgSpeed: getModelSpeed(evalRun, m.id),
      consistency: getModelConsistency(evalRun, m.id),
    }))
    .filter((e) => e.avgScore > 0)
    .sort((a, b) => b.avgScore - a.avgScore);
}

function getBestPerTier(evalRun: EvalRun): Record<number, { name: string; score: number }> {
  const tiers: Record<number, { name: string; score: number }> = {};
  const tierPrompts: Record<number, string[]> = {};

  for (const p of evalRun.prompts) {
    if (!tierPrompts[p.tier]) tierPrompts[p.tier] = [];
    tierPrompts[p.tier].push(p.id);
  }

  for (const [tier, promptIds] of Object.entries(tierPrompts)) {
    let bestModel = "";
    let bestScore = 0;
    for (const model of evalRun.models) {
      const results = evalRun.results.filter(
        (r) => r.modelId === model.id && promptIds.includes(r.promptId) && r.avgScore > 0
      );
      if (results.length === 0) continue;
      const avg = results.reduce((s, r) => s + r.avgScore, 0) / results.length;
      if (avg > bestScore) {
        bestScore = avg;
        bestModel = model.name;
      }
    }
    if (bestModel) {
      tiers[Number(tier)] = { name: bestModel, score: Math.round(bestScore * 10) / 10 };
    }
  }
  return tiers;
}

const TIER_LABELS: Record<number, string> = {
  1: "Quick Tasks",
  2: "Tool Calling",
  3: "Multimodal",
  4: "Analyst",
};

export function generateReport(evalRun: EvalRun): string {
  const leaderboard = buildLeaderboard(evalRun);
  const bestPerTier = getBestPerTier(evalRun);

  if (leaderboard.length === 0) {
    return "# Model Evaluation Report\n\nNo scored results available yet.\n";
  }

  const winner = leaderboard[0];
  const lines: string[] = [];

  // Header
  lines.push("# Model Evaluation Report");
  lines.push("");
  lines.push(`**Date:** ${evalRun.startedAt}`);
  lines.push(`**Models tested:** ${evalRun.models.length}`);
  lines.push(`**Prompts used:** ${evalRun.prompts.length}`);
  lines.push(`**Generations:** ${evalRun.completedGenerations} of ${evalRun.totalGenerations}`);
  lines.push("");

  // Winner
  lines.push("## Winner");
  lines.push("");
  lines.push(
    `**${winner.name}** with an average score of **${winner.avgScore.toFixed(1)}** across all prompts at **${winner.avgSpeed.toFixed(0)} tokens/sec**.`
  );
  lines.push("");

  // Leaderboard
  lines.push("## Leaderboard");
  lines.push("");
  lines.push("| Rank | Model | Avg Score | Speed (t/s) | Consistency (StdDev) |");
  lines.push("|------|-------|-----------|-------------|---------------------|");
  leaderboard.forEach((entry, i) => {
    lines.push(
      `| ${i + 1} | ${entry.name} | ${entry.avgScore.toFixed(1)} | ${entry.avgSpeed.toFixed(0)} | ${entry.consistency.toFixed(2)} |`
    );
  });
  lines.push("");

  // Per-tier winners
  lines.push("## Best Model Per Tier");
  lines.push("");
  for (const [tier, label] of Object.entries(TIER_LABELS)) {
    const best = bestPerTier[Number(tier)];
    if (best) {
      lines.push(`- **Tier ${tier} (${label}):** ${best.name} (${best.score.toFixed(1)})`);
    }
  }
  lines.push("");

  // Speed tiers
  lines.push("## Speed Tiers");
  lines.push("");
  const fast = leaderboard.filter((e) => e.avgSpeed > 50);
  const medium = leaderboard.filter((e) => e.avgSpeed >= 20 && e.avgSpeed <= 50);
  const slow = leaderboard.filter((e) => e.avgSpeed < 20 && e.avgSpeed > 0);

  if (fast.length > 0) {
    lines.push(`**Fast (>50 t/s):** ${fast.map((e) => `${e.name} (${e.avgSpeed.toFixed(0)})`).join(", ")}`);
  }
  if (medium.length > 0) {
    lines.push(`**Medium (20-50 t/s):** ${medium.map((e) => `${e.name} (${e.avgSpeed.toFixed(0)})`).join(", ")}`);
  }
  if (slow.length > 0) {
    lines.push(`**Slow (<20 t/s):** ${slow.map((e) => `${e.name} (${e.avgSpeed.toFixed(0)})`).join(", ")}`);
  }
  lines.push("");

  // Judge agreement (Round 2)
  if (evalRun.round2Results && evalRun.round2Results.length > 0) {
    lines.push("## Round 2 Results");
    lines.push("");
    const sorted = [...evalRun.round2Results].sort((a, b) => b.totalPoints - a.totalPoints);
    lines.push("| Rank | Model | Total Points |");
    lines.push("|------|-------|-------------|");
    sorted.forEach((r, i) => {
      lines.push(`| ${i + 1} | ${getModelName(evalRun, r.modelId)} | ${r.totalPoints} |`);
    });
    lines.push("");
  }

  // Recommendations
  lines.push("## Recommendations");
  lines.push("");
  const bestQuick = bestPerTier[1];
  const bestAnalyst = bestPerTier[4];
  const bestMultimodal = bestPerTier[3];
  const fastest = leaderboard.filter((e) => e.avgSpeed > 0).sort((a, b) => b.avgSpeed - a.avgSpeed)[0];

  if (bestQuick) lines.push(`- **Quick tasks:** Use ${bestQuick.name} for fast, routine tasks`);
  if (bestAnalyst) lines.push(`- **Deep analysis:** Use ${bestAnalyst.name} for analyst-grade work`);
  if (bestMultimodal) lines.push(`- **Multimodal:** Use ${bestMultimodal.name} for image understanding`);
  if (fastest) lines.push(`- **Speed priority:** Use ${fastest.name} when throughput matters (${fastest.avgSpeed.toFixed(0)} t/s)`);

  const consistent = leaderboard.filter((e) => e.consistency < 0.5 && e.consistency > 0).sort((a, b) => a.consistency - b.consistency)[0];
  if (consistent) {
    lines.push(`- **Reliability:** ${consistent.name} is the most consistent (StdDev: ${consistent.consistency.toFixed(2)})`);
  }
  lines.push("");

  // Surprises
  lines.push("## Notable Findings");
  lines.push("");
  // Find small models that beat bigger ones
  for (const entry of leaderboard) {
    const model = evalRun.models.find((m) => m.id === entry.modelId);
    if (!model?.approxParams) continue;
    const params = parseFloat(model.approxParams);
    if (isNaN(params)) continue;
    // Small model with good score
    if (params <= 4 && entry.avgScore >= 6) {
      lines.push(`- **${entry.name} (${model.approxParams})** punches above its weight with a ${entry.avgScore.toFixed(1)} average score`);
    }
  }

  // High variance models
  const highVar = leaderboard.filter((e) => e.consistency >= 1.5);
  if (highVar.length > 0) {
    lines.push(`- **Inconsistent:** ${highVar.map((e) => e.name).join(", ")} showed high variance (StdDev >= 1.5)`);
  }

  lines.push("");
  lines.push("---");
  lines.push("*Generated by Model Eval Lab*");

  return lines.join("\n");
}
