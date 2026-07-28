# Phase 02 — Instructor Teaching Guide

*This is the **instructor-facing** companion to Phase 02. It is not a checklist of what to type — that's [RUN-ORDER.md](./RUN-ORDER.md). It's not the learner cheat sheet either — that's [TALKING-POINTS.md](./TALKING-POINTS.md). **Share at open:** [OVERVIEW.md](./OVERVIEW.md) — one-page learner anchor (today · learn · leave with). The **content lecture** (citations, industry data, thesis bullets) lives in [marketing/lesson-plans/phase-02.md](../../../marketing/lesson-plans/phase-02.md). This document is **what you teach, in what order, and where you stop the scan to explain it.***

*Shared room mechanics (predict-then-compare, don't watch the scroll, parallel sessions) are the same as Phase 00 — see [Phase 00 TEACHING.md](../00/TEACHING.md) for the spine. Phase 02 applies that pattern to the **closing bracket**.*

---

## The core reality of this phase

**The quality pipeline often finishes in under an hour. The scan is not the lesson.** If you spend the session watching `/fix-errors` scroll, you have wasted the room.

Phase 00 planted guardrails: standards, correctness, proof. Phase 01 built something real — auth, data, a demo you were proud of yesterday. Phase 02 is the turn: **generation got cheap; review and comprehension are the scarce skills now.**

> **The one idea this phase exists to deliver:** The **closing bracket** is not a single command — it is a **discipline**: scan → read → fix → scan architecture → harden → gate → review → **compound the standards**. Interactive gates run when a human invokes them; **nightly hygiene** runs the same proof chain on a cron so the repo stays healthy when nobody is at the keyboard. A green pipeline is **necessary, not sufficient** — someone still has to **understand** what shipped.

The value is in what wraps around the scan:

1. **Teach** the economics of review — comprehension debt, the quality tax, gates + human judgment ([lesson plan §1](../../../marketing/lesson-plans/phase-02.md)).
2. **Review the quality contract together.** No new intention — the subject is yesterday's app plus demo-grade bar and `pr-requirements`. Ask: *Would a reviewer approve this?*
3. **Predict.** Before `/scan-errors`, have the room say what will break in an app they were proud of yesterday.
4. **Run the pipeline** (often ~30–60 min of agent time). Nobody watches the scroll. This window is **D02-1 through D02-4** — comprehension debt, living standards, observability, nightly hygiene.
5. **Reflect** — prediction vs. report, comprehension check on one unread function, gate decision, optional Tier 1 workflow demo.

The predict-then-compare move still manufactures the discussion. Yesterday's "done" becomes today's teaching moment.

### Rough timing (Day 2 morning — shares the day with Phase 03)

| Block | ~Time | What's happening |
|---|---|---|
| **Intro — State of the AI Union: Quality** | 45–60 min | Lesson plan §1 (1a–1e). Whiteboard or tabs for citations — no deck required. |
| **Walk-through — the quality contract** | 20–30 min | Three uncomfortable questions, pair structure, living `pr-requirements`. **Predict** before scan. |
| **Run the quality pipeline** | 45–60 min | `/scan-errors` → `/fix-errors` → `/monitor` → `/harden` → `/commit pr` → `/pr-eval`. Teach **while it runs** (D02-*). |
| **Scheduled hygiene (optional but recommended)** | 20–30 min | Local `/nightly-hygiene` rehearsal or manual Tier 1 workflow run. Land Tier 1 vs Tier 2. |
| **Closing reflect** | 30–45 min | Prediction vs. reality, comprehension check, gate decision, "what they must leave believing." |

If the room is fast, run `/pr-eval` on a second PR or promote a monitor finding into `pr-requirements` live. Slack lives in the reflect block.

---

## Connect to Phase 00 (60 seconds at the open)

Land the thread before the quality lecture:

> Phase 00 named the **closing bracket**: build · lint · test · verify · browser. Phase 01 added **auth and data** — where demos become products and where mistakes become breaches. Today we make the closing bracket **repeatable and automated**: scanners find, fixers fix, the gate blocks, reviews compound standards — and **nightly hygiene** runs the same chain when you're asleep. This is the guardrails module we planted on Day 1.

Point at [D00-7](../../../marketing/lesson-plans/discussion-topics.md) if anyone asks "didn't we already cover this?" — that was the **plant**; today is the **practice**.

---

## The opener: "State of the AI Union: Quality"

**Do not re-write the lecture here.** Deliver [lesson plan §1](../../../marketing/lesson-plans/phase-02.md) — technology (six skills in three pairs), three thesis points, why it matters, how the space is changing, citations (Osmani, Willison, DORA, Böckeler).

**Instructor notes:**

- **Label vendor data honestly** — GitClear and CodeRabbit are directional; DORA is the neutral anchor.
- **Land the thesis in one sentence:** *The machine that writes code in a blink also duplicates, drifts, and leaves you holding code no human understands — review is the antidote.*
- **Whiteboard beats slides** for this phase unless you want citation URLs on screen. Phase 00 has an opening deck for course framing; Phase 02 does not require one.

**Close the opener with the one thing they must carry into the lab:** *A green chat message is not proof. A green CI run is not comprehension. Your job is to deliver code you have proven to work — and understood.*

---

## Walk-through — the quality contract (before anyone types)

There is no new app intention. The **quality contract** is demo-grade bar + living `pr-requirements` + the three questions from [README.md](./README.md):

1. Any lint/type errors or failing tests?
2. Anything bypassing the shared data layer or handling auth inconsistently?
3. Would a reviewer actually approve this?

**Pause-and-teach anchors:**

- **At the pair structure** — scanners **never** fix. That separation is what makes reports trustworthy. You read and judge before `/fix-errors` or `/harden` touches code.
- **At `pr-requirements`** — open [`.claude/skills/pr-requirements/SKILL.md`](../../../.claude/skills/pr-requirements/SKILL.md). When `/pr-eval` finds a gap, a new rule lands here. **Same bug shouldn't pass twice.** Tie to [D02-2](../../../marketing/lesson-plans/discussion-topics.md).
- **At predict** — go around the room: "What will `/scan-errors` find? What will `/monitor` find that tests missed?" Write guesses on the board. You will compare in reflect.

---

## Run the quality pipeline (teach while it runs)

Kick off [RUN-ORDER.md](./RUN-ORDER.md) steps 1–7. **Do not narrate the scroll.** Slot discussion blocks by **which step is running**, not by wall-clock perfection — scans are fast; your job is to fill the window.

### What to teach during each step

| Step running | Primary discussion | Secondary activity |
|---|---|---|
| **`/scan-errors`** | [D02-1 — Comprehension debt](../../../marketing/lesson-plans/discussion-topics.md) (~20 min) | Read `error-report.md` together when it lands — classify severity before fix |
| **`/fix-errors`** | [D02-2 — Living standards](../../../marketing/lesson-plans/discussion-topics.md) (~15 min) | Draft one rule line from a finding — "what would we add to `pr-requirements`?" |
| **`/monitor`** | Architecture vs. tests — "green tests, wrong wiring" | Skim `monitor-report.md` — ask which violation would hurt in prod |
| **`/harden`** | Why harden re-runs error scan — fixes can regress | Watch for a fix that breaks build — teach from it if it happens |
| **`/commit pr`** | [D02-3 — Observability](../../../marketing/lesson-plans/discussion-topics.md) (~15 min) | Point at diff, commit message, test output — not the chat transcript |
| **`/pr-eval`** | Gate decision live — approve vs. request changes | If a new rule is added, show it in `pr-requirements` immediately |

**Parallel sessions:** Run `/scan-errors` in one terminal while discussing D02-1 in the room — same pattern as Phase 00 builds.

---

## Scheduled hygiene — the closing bracket on a cron (~20–30 min)

Interactive gates only run when invoked. **Nightly hygiene** is the repo immune system — taught here, optional in RUN-ORDER Part B.

**Land [D02-4](../../../marketing/lesson-plans/discussion-topics.md):**

| Tier | What runs | When to enable |
|---|---|---|
| **Tier 1** | `build · lint · test` on cron | First — no agent API key |
| **Tier 2** | Scan → fix → monitor → harden → maintenance branch + PR | After Tier 1 is green and local `/nightly-hygiene` succeeds |

**Say it out loud:**

> The closing bracket doesn't only run when you're at the keyboard. Tier 1 proves the repo still compiles on a schedule. Tier 2 opens a **maintenance PR** — humans still merge. Auto-merge to `main` is out of scope unless kit 05 documents an exception.

**Demo options (pick one):**

1. **Local rehearsal** — `/nightly-hygiene` (skill in `.claude/skills/nightly-hygiene/`). Walk the same chain without GitHub.
2. **Tier 1 manual run** — GitHub Actions → `nightly-hygiene-tier1.yml` → workflow_dispatch. Show the run log.
3. **Show the worksheets** — [G1 adoption kit](../../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md) + [docs/github/actions-and-agents.md](../../github/actions-and-agents.md).

**Discussion hooks:**

- What would you let a nightly bot fix without asking? What is always human-only?
- Who owns the workflow YAML and API spend when the cron runs headless?

**Do not enable Tier 2 in the room** unless the cohort has agreed decision boundaries and API budget — show the YAML and the policy table instead.

---

## Reflect (the bulk of the lesson)

Work through in order:

- **Prediction vs. reality.** Walk the board. How much would they have shipped yesterday without `/scan-errors` or `/monitor`?
- **Comprehension check.** Pick one AI-written function nobody has read. Explain-or-rewrite in 60 seconds. Name **comprehension debt** if they can't.
- **Did fixing break anything?** Point at hardener re-scan — regression is normal; the gate catches it.
- **The gate decision.** What is the *one* thing they'd refuse to merge even if CI is green?
- **Standards compounded?** Did `/pr-eval` add a rule? Show the diff in `pr-requirements`.
- **Business connection.** At Phase 01 speed you *could* ship today; this phase is why you don't ship blind.

If time allows: open [checklist 02 — GitHub Actions and skills](../../checklists/02-github-actions-and-skills.md) and mark what they already have vs. what they'd add at home.

---

## Discussion prompts (keep in your back pocket)

- "CI is green. Would you merge without reading the diff?"
- "Personal tool Memory vs. a committed rule in the repo — which survives a new hire's laptop?"
- "What's the audit trail you'd show a customer — chat log or GitHub PR?"
- "If the nightly bot opens a PR at 2am, who merges it — and who pays for the API calls?"
- "Cheaper model for lint fixes, expensive model for architecture review — where would you draw the line?"

## Likely questions (and the honest answer)

- **"Can't I just run `npm run build` myself?"** — Yes, once. The skills **classify, report, batch-fix, and re-scan** — and `/monitor` catches what tests miss. The pipeline is repeatable and teachable to the team.
- **"Why separate scan and fix?"** — So you **judge the report** before anything changes. Auto-fix without review is how you merge comprehension debt faster.
- **"/pr-eval found something new — do we really need another rule?"** — One line in `pr-requirements` beats the same review comment every sprint. That's the compound interest.
- **"Is Tier 2 safe?"** — Only with explicit decision boundaries (kit G1 table). Tier 1 is the on-ramp — prove build · lint · test on cron first.
- **"We don't use GitHub Actions — skip hygiene?"** — Skip Tier 2 until you have a cron surface; still run the **interactive** chain locally. The *pattern* (scheduled proof + PR for humans) ports to Azure Pipelines, etc. — see [checklist 04](../../checklists/04-deploy-apps-docker-cloud.md).

## Failure modes to welcome as teaching moments

Engineer the session so these surface — then teach from them:

- **Scanner finds nothing** — "Would you have predicted that? What does that say about yesterday's confidence?"
- **Monitor finds auth/data-layer bypass** — the Phase 01 trust boundary, live. Better today than in prod.
- **Fix breaks a test** — why `/harden` re-runs `/scan-errors`. The gate exists for this.
- **Harden can't auto-fix** — not everything yields to agents; manual fix + re-monitor is professional work.
- **PR eval requests changes on "trivial" style** — living standards vs. bike-shedding; who approves org-wide rules?

---

## What they must leave Phase 02 believing

1. Generation is cheap; **review and comprehension are the scarce, leveraged skills now.**
2. AI code carries a **measurable quality tax** — counter it deliberately with scanners, monitors, and gates.
3. Automated gates are **necessary but not sufficient** — a human owns "is this right and maintainable?"
4. Standards should **compound**: every review that finds a gap should make the next one harder to repeat.
5. The **closing bracket runs on a schedule too** — Tier 1 cron + optional Tier 2 maintenance PRs; humans still merge.
6. **Observability** lives in diffs, commits, test output, and PRs — not in a green chat message.

*Content lecture and citations: [phase-02.md](../../../marketing/lesson-plans/phase-02.md). Typed steps: [RUN-ORDER.md](./RUN-ORDER.md). Learner concepts: [TALKING-POINTS.md](./TALKING-POINTS.md). Discussion scripts: [D02-*](../../../marketing/lesson-plans/discussion-topics.md).*
