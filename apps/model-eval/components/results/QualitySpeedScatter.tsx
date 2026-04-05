"use client";

import { useMemo, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Label,
  ReferenceLine,
} from "recharts";
import type { EvalRun, PromptTier } from "@/lib/types";
import { TIER_NAMES } from "@/lib/prompts";

interface QualitySpeedScatterProps {
  evalRun: EvalRun;
}

function parseParams(approxParams?: string): number {
  if (!approxParams) return 50;
  const num = parseFloat(approxParams);
  if (isNaN(num)) return 50;
  return Math.max(20, Math.min(200, num * 8));
}

interface DataPoint {
  name: string;
  speed: number;
  score: number;
  size: number;
  provider: string;
}

export default function QualitySpeedScatter({ evalRun }: QualitySpeedScatterProps) {
  const [selectedTier, setSelectedTier] = useState<PromptTier | "all">("all");

  const data = useMemo(() => {
    const points: DataPoint[] = [];
    for (const model of evalRun.models) {
      let results = evalRun.results.filter((r) => r.modelId === model.id);
      if (selectedTier !== "all") {
        const tierPromptIds = new Set(
          evalRun.prompts.filter((p) => p.tier === selectedTier).map((p) => p.id)
        );
        results = results.filter((r) => tierPromptIds.has(r.promptId));
      }
      const scored = results.filter((r) => r.avgScore > 0);
      const withSpeed = results.filter((r) => r.avgTokensPerSecond > 0);
      if (scored.length === 0 || withSpeed.length === 0) continue;
      const avgScore = scored.reduce((s, r) => s + r.avgScore, 0) / scored.length;
      const avgSpeed = withSpeed.reduce((s, r) => s + r.avgTokensPerSecond, 0) / withSpeed.length;
      points.push({
        name: model.name,
        speed: Math.round(avgSpeed * 10) / 10,
        score: Math.round(avgScore * 10) / 10,
        size: parseParams(model.approxParams),
        provider: model.provider,
      });
    }
    return points;
  }, [evalRun, selectedTier]);

  if (data.length === 0) {
    return (
      <div className="card flex items-center justify-center py-12 text-gray-500">
        No data for scatter plot yet
      </div>
    );
  }

  const maxSpeed = Math.max(...data.map((d) => d.speed));
  const midSpeed = maxSpeed / 2;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-200">Quality vs Speed</h3>
        <select
          className="input-field text-xs py-1"
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value === "all" ? "all" : (Number(e.target.value) as PromptTier))}
        >
          <option value="all">All Tiers</option>
          {([1, 2, 3, 4] as PromptTier[]).map((t) => (
            <option key={t} value={t}>
              Tier {t}: {TIER_NAMES[t]}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            type="number"
            dataKey="speed"
            stroke="#6B7280"
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            scale="log"
            domain={["auto", "auto"]}
          >
            <Label value="Tokens/sec" offset={-15} position="insideBottom" fill="#6B7280" fontSize={11} />
          </XAxis>
          <YAxis
            type="number"
            dataKey="score"
            stroke="#6B7280"
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            domain={[0, 10]}
          >
            <Label value="Avg Score" angle={-90} position="insideLeft" fill="#6B7280" fontSize={11} />
          </YAxis>
          <ZAxis type="number" dataKey="size" range={[40, 400]} />
          {/* Quadrant reference lines */}
          <ReferenceLine y={5} stroke="#4B5563" strokeDasharray="5 5" />
          <ReferenceLine x={midSpeed} stroke="#4B5563" strokeDasharray="5 5" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }}
            formatter={(value: number, name: string) => {
              if (name === "score") return [`${value}`, "Score"];
              if (name === "speed") return [`${value} t/s`, "Speed"];
              return [value, name];
            }}
            labelFormatter={(_, payload) => {
              if (payload && payload.length > 0) {
                const p = payload[0].payload as DataPoint;
                return p.name;
              }
              return "";
            }}
          />
          <Scatter
            data={data}
            fill="#3B82F6"
            fillOpacity={0.7}
            stroke="#60A5FA"
            strokeWidth={1}
            isAnimationActive={false}
            shape={(props: { cx: number; cy: number; payload: DataPoint; r: number }) => {
              const { cx, cy, payload, r } = props;
              // Check if any other point is close above this one
              const hasNeighborAbove = data.some(
                (other) =>
                  other.name !== payload.name &&
                  Math.abs(other.speed - payload.speed) < maxSpeed * 0.15 &&
                  other.score > payload.score &&
                  Math.abs(other.score - payload.score) < 1.5
              );
              const labelY = hasNeighborAbove ? cy + 20 : cy - 14;
              return (
                <g>
                  <circle cx={cx} cy={cy} r={r || 8} fill="#3B82F6" fillOpacity={0.7} stroke="#60A5FA" strokeWidth={1} />
                  <text x={cx} y={labelY} textAnchor="middle" fill="#D1D5DB" fontSize={10} fontWeight={500}>
                    {payload.name}
                  </text>
                </g>
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
      {/* Quadrant labels */}
      <div className="grid grid-cols-2 gap-2 mt-2 text-[10px] text-gray-500">
        <div className="text-left">Slow &amp; Poor</div>
        <div className="text-right">Slow &amp; Good</div>
        <div className="text-left">Fast &amp; Poor</div>
        <div className="text-right font-semibold text-green-500">Fast &amp; Good</div>
      </div>
    </div>
  );
}
