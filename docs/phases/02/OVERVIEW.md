# Phase 02 — Overview

*One page: what today is, what you're learning, what you keep. Share this link at open; re-read at close. Not a printed handout — a bookmark.*

**Prereq:** Phase 01 complete — at least one SaaS killer app built and working.

**Thesis:** Phase 00 named the **closing bracket**. Phase 01 built something real. Today you make verification **repeatable**: scan → read → fix → gate → review — and learn why **comprehension**, not generation, is the scarce skill now.

---

## What we're doing today

| Block | What happens |
|---|---|
| **Framing lecture** | Why review is the bottleneck — comprehension debt, quality tax, gates + human judgment ([lesson plan](../../../marketing/lesson-plans/phase-02.md)). |
| **Quality contract walk-through** | No new app. Subject is **yesterday's Phase 01 app** + demo-grade bar + living `pr-requirements`. Three questions: lint/tests clean? architecture clean? would a reviewer approve? |
| **Predict, then run** | Guess what `/scan-errors` and `/monitor` will find — *then* run the pipeline. |
| **Interactive quality pipeline** | `/scan-errors` → `/fix-errors` → `/monitor` → `/harden` → `/commit pr` → `/pr-eval`. Read each report **before** the fixer runs. |
| **Scheduled hygiene (optional)** | Same proof chain on a cron — Tier 1 `build · lint · test`; Tier 2 maintenance PR after scan/fix/monitor/harden. Local rehearsal: `/nightly-hygiene`. |
| **Closing reflect** | Prediction vs. report; explain one unread AI function; what would you refuse to merge even if CI is green? |

The scan is often fast. **Nobody watches the scroll** — that window is for discussion (comprehension debt, living standards, observability, nightly hygiene).

---

## What you're learning (high level)

- **Generation got cheap; review and comprehension are scarce** — a green chat message is not proof; a green CI run is not understanding.
- **Three kinds of broken** — build/lint/test errors (machine-checkable), architecture violations (works but wired wrong), and severity (not all findings are equal).
- **Scanner → fixer pairs** — scanners **find only**; you judge the report, then fixers change code. That separation keeps reports trustworthy.
- **Quality gate + PR review** — `/commit` blocks until clean; `/pr-eval` approves or requests changes and can **add rules** so the same gap can't pass twice.
- **Living standards** — `pr-requirements` compounds: every review that finds a new gap makes the next ship harder to repeat.
- **Closing bracket on a schedule** — nightly hygiene runs when nobody is at the keyboard; humans still merge maintenance PRs.

---

## What you leave with (ongoing process + artifacts)

**In the repo after today:**

- A **cleaner Phase 01 app** — errors fixed, architecture violations addressed, changes on a branch or PR with evidence.
- **Reports** — `docs/artifacts/error-report.md`, `monitor-report.md` from your scans.
- **Stronger `pr-requirements`** — at least one new rule if `/pr-eval` found a gap (standards that compound).
- **Optional:** Tier 1 nightly workflow enabled; decision worksheet started for Tier 2 ([G1 guardrails](../../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md)).

**In your head for every project after:**

- The **quality chain** you'll run before every ship: scan → fix → monitor → harden → commit gate → PR eval.
- The discipline: **automated gates are necessary, not sufficient** — someone owns "is this right and maintainable?"
- **Observability** lives in diffs, commits, test output, and PRs — not in the agent transcript.
- A path to **org guardrails** — [docs/github/](../../github/README.md), [checklist 02 — GitHub Actions and skills](../../checklists/02-github-actions-and-skills.md), adoption kit 04–05.

---

## Where to go next

| When | Open |
|---|---|
| **Step by step** | [RUN-ORDER.md](./RUN-ORDER.md) — Part A pipeline; Part B hygiene |
| **During the lab** | [README.md](./README.md) — full narrative |
| **End of day self-check** | [TALKING-POINTS.md](./TALKING-POINTS.md) — can you explain each concept? |
| **Instructors** | [TEACHING.md](./TEACHING.md) · [lesson plan](../../../marketing/lesson-plans/phase-02.md) · [D02-* discussion scripts](../../../marketing/lesson-plans/discussion-topics.md) |
