# Phase 05 — Talking points

*The concepts you should be able to explain — at a high level, in a sentence or two — after this phase. Stuck on one? Ask your agent: "Explain ___ in 3–4 sentences, no jargon, with one analogy."*

## The ecosystem idea

- **Skills as an open format** — a skill is just a folder with a `SKILL.md` (instructions + metadata) — and because the format is an open standard adopted across the industry, a skill written for one tool can travel to others. You should be able to explain why an open format matters more than any single skill.
- **"npm for AI skills"** — the mental model for this phase: thousands of published skills exist; the missing piece is search, preview, and install — which is what you build.

## What's inside a skill

- **SKILL.md anatomy** — frontmatter (name, description that controls *when it triggers*) plus the body (the actual instructions the agent follows).
- **Capability vs. preference** — some skills add an ability ("process PDFs"), others impose taste ("write commit messages this way"); you should be able to classify a skill on sight.
- **Maturity levels** — a rough 1–5 scale from "someone's notes" to "production-grade with scripts and tests"; judging maturity *is* the review skill applied to other people's prompts.

## What you build

- **Catalog pipeline** — fetch skill repos from GitHub, parse each SKILL.md, normalize into one JSON catalog with metadata (source, category, maturity).
- **The browser** — a Next.js app over that catalog: search, filter, preview the full SKILL.md, copy it into your own project.
- **Counts go stale, sources move** — ecosystem numbers are a moving target; the build teaches you to re-fetch rather than trust a hard-coded count (including the ones in these docs).
