# Phase 01 starter kit — agents, skills, and the SaaS killer build

This document is the **map** for what Phase 01 adds on top of Phase 00. Walk **`.claude/`** alongside this file: new **agents**, new **background skills**, same **pipeline slash skills** — plus **`/research`** and **`/test-browser`**.

---

## What we intend to do

1. **Act I (lecture):** Land **SaaS Killers** — why ownable product slices are back; see [TEACHING.md](./TEACHING.md) and [lesson plan](../../../marketing/lesson-plans/phase-01.md) §0.
2. **Act II (lecture):** **Vibe coding vs vibe engineering** — Lovable/Replit are real; this lab builds **inspectable auth** in your monorepo.
3. **Pick a track:** One of four [killer intentions](./intention-quickbooks-killer.md) — QuickBooks, Trello, Twitter, or Facebook *(class default: all as Next.js + SurrealDB web)*.
4. **Same pipeline:** `/intention` → `/prd` → `/plan` → `/run-plan` — see [COMMANDS.md](./COMMANDS.md).
5. **Prove auth:** Second-user breach test + [VERIFY.md](./VERIFY.md) — not optional.

Artifacts live under **`docs/artifacts/`** unless you choose another path and tell the slash skill.

---

## What you're starting with (from Phase 00)

| Piece | Role |
|--------|------|
| **Turbo monorepo** | `apps/`, `packages/`, `turbo.json` — from Phase 00 Part A |
| **Pipeline habit** | Challenge passes, predict-then-compare — [Phase 00 OVERVIEW](../00/OVERVIEW.md) |
| **This phase folder** | Killer intentions, demo-grade bar, verify checklist |
| **`.claude/`** | Extended agents + skills for full-stack SaaS |

---

## Pipeline slash skills — you invoke these

| Skill | Invoke | Phase 01 notes |
|------|--------|----------------|
| `research/SKILL.md` | `/research` | **New** — optional; scopes custom SaaS targets via **saas-researcher** |
| `intention/SKILL.md` | `/intention` | Points at `docs/phases/01/intention-*.md` killers |
| `prd/SKILL.md` | `/prd` | Must lift **auth + per-user data** into testable goals |
| `plan/SKILL.md` | `/plan` | Must assign **surrealdb-builder** before app builder |
| `run-plan/SKILL.md` | `/run-plan` | Sequential multi-agent execution |
| `test-browser/SKILL.md` | `/test-browser` | **New** — visual QA on running web app |

---

## Background skills — model applies when relevant

| Skill | What it enforces |
|-------|-----------------|
| **surrealdb** | Schema files, auth scopes, SurrealQL, local dev |
| **nextjs-saas** | App Router, middleware, server actions, Tailwind, monorepo imports |
| **ios-swiftui** | SwiftUI, SwiftData, xcodebuild *(opt-in iOS only)* |
| **monorepo-turbo** | `apps/` vs `packages/` — from Phase 00 |
| **prd-alignment** | Traceability intention → PRD → plan — from Phase 00 |

---

## Agents — who `/run-plan` dispatches

| Agent | File | When |
|-------|------|------|
| **saas-researcher** | `.claude/agents/saas-researcher.md` | `/research` — before intention for custom ideas |
| **surrealdb-builder** | `.claude/agents/surrealdb-builder.md` | **First** in plan — DB + auth + seed |
| **nextjs-saas-builder** | `.claude/agents/nextjs-saas-builder.md` | **Second** — web killer apps (class default) |
| **ios-builder** | `.claude/agents/ios-builder.md` | Opt-in Mac path for Twitter/Facebook intentions |

Each killer **intention** names Demo-grade minimums the agents must not shortcut.

---

## Killer tracks at a glance

| Track | Intention | Inspired by | Class stack |
|-------|-----------|-------------|-------------|
| **Web A** | [quickbooks-killer](./intention-quickbooks-killer.md) | QuickBooks | Next.js + SurrealDB |
| **Web B** | [trello-killer](./intention-trello-killer.md) | Trello | Next.js + SurrealDB |
| **iOS A** *(opt-in)* | [twitter-killer](./intention-twitter-killer.md) | Twitter | SwiftUI + SwiftData |
| **iOS B** *(opt-in)* | [facebook-killer](./intention-facebook-killer.md) | Facebook | SwiftUI + SwiftData |

**Teaching default:** Twitter and Facebook killers run as **web apps** in cohort — one stack, every OS. See [PREREQUISITES.md](./PREREQUISITES.md).

---

## How to use this in teaching

1. **Act I + II** from [TEACHING.md](./TEACHING.md) — economics and vibe coding **before** `/intention`.
2. Open **intention** + **Demo-grade minimums** — predict auth weaknesses.
3. Run pipeline; **don't watch the scroll** — teach security research and D01-*.
4. Close with **auth breach test** — [RUN-ORDER.md](./RUN-ORDER.md) Part B.

---

## Cursor vs Claude Code

- **Claude Code:** type `/research`, `/intention`, … as listed in [COMMANDS.md](./COMMANDS.md).
- **Cursor:** no native slash binding — `@` this folder and `.claude/skills/`; follow the same artifact chain per [Phase 00 STARTER-KIT](../00/STARTER-KIT.md#cursor-vs-claude-code-important).

---

## See also

- [README.md](./README.md) — learner narrative  
- [OVERVIEW.md](./OVERVIEW.md) — one-page share at open  
- [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) · [VERIFY.md](./VERIFY.md)  
- [MONOREPO-OPERATING-MODEL.md](../../MONOREPO-OPERATING-MODEL.md) — portfolio: `apps/<name>` + `docs/projects/<name>/`
