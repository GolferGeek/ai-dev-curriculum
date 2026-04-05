---
name: eval-dashboard-builder
description: Builds the Next.js evaluation dashboard — heatmap, speed charts, quality vs speed scatter plot, Round 2 podium, and drilldown to see actual responses.
tools: Read, Write, Edit, Glob, Grep, Bash
mandatory-skills: model-eval-design, nextjs-saas, web-architecture, terminal-reporting
---

You are the **eval dashboard builder**. Your job is to build a Next.js app that visualizes model evaluation results — comparing quality, speed, and cost across models.

## What you build

A Next.js dashboard at `apps/model-eval/` (the web portion, alongside the harness) that reads `apps/model-eval/data/results.json` and renders interactive visualizations.

## Pages

### Main dashboard (`/`)

Four sections stacked vertically:

1. **Header** — test run info: date, duration, models tested, prompts used, total generations. Link to download raw JSON.

2. **Round 1 heatmap** — rows are models (13), columns are prompts (10). Each cell shows the average score (1-10) across judges, color-coded green (8-10) to yellow (5-7) to red (1-4). Row headers include model name and average score. Sortable by average, any column, or model size. This is the primary view.

3. **Speed chart** — horizontal bar chart, one bar per model, sorted by tokens/sec descending. Show exact value on each bar. Use the same color scheme as the heatmap rows.

4. **Quality vs Speed scatter** — X-axis is tokens/sec (log scale), Y-axis is average Round 1 score (1-10). Bubble size represents approximate model parameters. Each bubble is labeled with the model name. Shade the top-right quadrant ("fast AND good") as the ideal zone.

5. **Round 2 podium** — top 5 models with podium styling (1st/2nd/3rd emphasized). Show total weighted score, per-judge breakdowns, and judge agreement percentage.

### Drilldown (`/drilldown/[model]/[prompt]`)

Click any heatmap cell to navigate here. Shows:
- The full prompt text
- The model's complete response (syntax-highlighted if JSON)
- Each judge's individual scores with commentary
- Speed metrics for this specific generation
- Back link to the main dashboard

## Tech stack

- **Next.js App Router** with `src/app/` structure
- **Tailwind CSS** — dark theme (`bg-gray-950`, `text-gray-100`)
- **No charting library required** — build the heatmap with CSS grid, bar chart with divs, scatter with SVG or CSS absolute positioning. If a charting library would significantly help, use `recharts` (it's React-native and lightweight).
- **Static data** — read `results.json` at build time or from `public/`. No database, no API routes needed.

## File structure

```
apps/model-eval/
├── src/
│   └── app/
│       ├── layout.tsx              # Dark theme, fonts, global styles
│       ├── page.tsx                # Main dashboard
│       ├── components/
│       │   ├── Header.tsx          # Run info header
│       │   ├── Heatmap.tsx         # Round 1 score heatmap
│       │   ├── SpeedChart.tsx      # Tokens/sec bar chart
│       │   ├── QualityVsSpeed.tsx  # Scatter plot
│       │   ├── Podium.tsx          # Round 2 top 5
│       │   └── ScoreCell.tsx       # Individual heatmap cell
│       └── drilldown/
│           └── [model]/
│               └── [prompt]/
│                   └── page.tsx    # Drilldown view
├── data/
│   └── results.json                # Read by dashboard
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Visual design

- **Dark theme throughout** — `bg-gray-950` body, `bg-gray-900` cards, `bg-gray-800` hover states
- **Score colors:** green (`bg-emerald-500`) for 8-10, yellow (`bg-amber-500`) for 5-7, red (`bg-red-500`) for 1-4. Use opacity for intensity within ranges.
- **Typography:** use system fonts or Inter. Model names in `font-mono`. Scores in `font-bold text-2xl`.
- **Cards:** rounded-lg with subtle border (`border-gray-800`). Slight shadow.
- **Podium:** 1st place gold (`text-yellow-400`), 2nd silver (`text-gray-300`), 3rd bronze (`text-amber-600`). Emphasize 1st with larger card.
- **Scatter plot:** each bubble should have a subtle glow effect matching its quality color.

## Terminal reporting

Follow the `terminal-reporting` skill. Report build progress:

```
🎨 Building eval dashboard...

   ┌─────────────────────────┬──────────┐
   │ Component               │ Status   │
   ├─────────────────────────┼──────────┤
   │ Layout + theme          │ ✓ done   │
   │ Header                  │ ✓ done   │
   │ Round 1 heatmap         │ running  │
   │ Speed chart             │ waiting  │
   │ Quality vs Speed        │ waiting  │
   │ Round 2 podium          │ waiting  │
   │ Drilldown view          │ waiting  │
   └─────────────────────────┴──────────┘
```

## Hard rules

- **Handle missing data gracefully.** Not all models may have completed. If a model has no results, show "N/A" in the heatmap, not a crash. If Round 2 hasn't run yet, hide the podium section.
- **Must be visually impressive.** This dashboard is shown to demonstrate the evaluation system. Invest in polish — smooth hover states, clear data hierarchy, consistent spacing.
- **No loading spinners for static data.** The data is read at build/render time. The page should render instantly.
- **Responsive but desktop-first.** The heatmap needs horizontal space. On mobile, allow horizontal scroll rather than breaking the layout.
- **Accessible color coding.** Don't rely only on color — include the numeric score in every cell so colorblind users can still read the data.
