"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import type { EvalRun } from "@/lib/types";

interface SpeedChartProps {
  evalRun: EvalRun;
}

const PROVIDER_COLORS: Record<string, string> = {
  ollama: "#3B82F6",     // blue
  anthropic: "#8B5CF6",  // purple
  openrouter: "#10B981", // green
};

const MODEL_FAMILY_COLORS: Record<string, string> = {
  gemma: "#60A5FA",
  qwen: "#34D399",
  deepseek: "#F472B6",
  llama: "#FB923C",
  gpt: "#A78BFA",
  claude: "#8B5CF6",
  qwq: "#FBBF24",
};

function getModelColor(modelName: string, provider: string): string {
  const lower = modelName.toLowerCase();
  for (const [family, color] of Object.entries(MODEL_FAMILY_COLORS)) {
    if (lower.includes(family)) return color;
  }
  return PROVIDER_COLORS[provider] ?? "#6B7280";
}

export default function SpeedChart({ evalRun }: SpeedChartProps) {
  const data = useMemo(() => {
    const modelSpeeds: { name: string; tokensPerSec: number; color: string }[] = [];
    for (const model of evalRun.models) {
      const results = evalRun.results.filter((r) => r.modelId === model.id && r.avgTokensPerSecond > 0);
      if (results.length === 0) continue;
      const avgSpeed = results.reduce((s, r) => s + r.avgTokensPerSecond, 0) / results.length;
      modelSpeeds.push({
        name: model.name,
        tokensPerSec: Math.round(avgSpeed * 10) / 10,
        color: getModelColor(model.name, model.provider),
      });
    }
    return modelSpeeds.sort((a, b) => b.tokensPerSec - a.tokensPerSec);
  }, [evalRun]);

  if (data.length === 0) {
    return (
      <div className="card flex items-center justify-center py-12 text-gray-500">
        No speed data available yet
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-gray-200 mb-4">Speed (tokens/sec)</h3>
      <ResponsiveContainer width="100%" height={Math.max(300, data.length * 40)}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 60, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
          <XAxis type="number" stroke="#6B7280" tick={{ fill: "#9CA3AF", fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#6B7280"
            tick={{ fill: "#D1D5DB", fontSize: 11 }}
            width={140}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }}
            labelStyle={{ color: "#D1D5DB" }}
            itemStyle={{ color: "#9CA3AF" }}
          />
          <Bar dataKey="tokensPerSec" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} fillOpacity={0.8} />
            ))}
            <LabelList
              dataKey="tokensPerSec"
              position="right"
              fill="#9CA3AF"
              fontSize={11}
              formatter={(value: number) => `${value} t/s`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
