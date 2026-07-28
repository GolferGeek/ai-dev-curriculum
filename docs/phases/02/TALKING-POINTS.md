# Phase 02 — Talking points

*The concepts you should be able to explain — at a high level, in a sentence or two — after this phase. Stuck on one? Ask your agent: "Explain ___ in 3–4 sentences, no jargon, with one analogy."*

## The three kinds of "broken"

- **Build/type/lint/test errors** — the machine-checkable kind: it doesn't compile, it violates style rules, or a test fails. Scanners find these; fixers batch-fix root causes rather than whack-a-mole symptoms.
- **Architecture violations** — code that *works* but is wired wrong: auth checked in the wrong layer, an app reaching directly into another's database, secrets in client code. Invisible to tests, fatal over time.
- **Severity / classification** — not all errors are equal; you should be able to say why a security gap outranks a lint warning.

## The pipeline pairs (scanner → fixer)

- **`/scan-errors` → `/fix-errors`** — find build-quality problems, then fix until zero.
- **`/monitor` → `/harden`** — find architecture violations, then fix them.
- **Report-only vs. fix** — scanners never change code; that separation is what makes the reports trustworthy.

## Shipping like a professional

- **Commit** — a coherent checkpoint with a message that explains *why*; fast checks should keep it cheap enough to commit and continue working.
- **Push** — starts broader asynchronous validation while the developer moves to another independent task.
- **Progressive validation** — checks get more extensive as the change approaches main: seconds at edit time, under a minute at commit, several minutes after push, and the stringent evidence-producing evaluation before human review.
- **Quality contract** — the repository's explicit definition of mergeable: required tests, coverage by subsystem, architecture and security rules, review requirements, and permitted exceptions.
- **Pull request (PR)** — a proposed set of changes that someone (or some agent) reviews before it joins the main line.
- **PR preparation** — builder, test, security, and architecture evaluators produce a review-ready evidence pack before asking for human attention.
- **Merge gate** — verifies that every required check and approval applies to the exact commit being merged. A branch change makes old evidence stale.
- **Code review** — human judgment remains available for questions, ambiguity, policy, and exceptions; the evaluator should not be the first person to discover an obvious mechanical failure.

## Agents are contractors

- **Capability is uneven** — agents, consultants, contractors, and new employees arrive with different ability, enthusiasm, context, and willingness to sound certain when they are wrong.
- **Confidence is a claim, not evidence** — ask what files, tests, history, and observations support an answer; require assumptions and uncertainty to be stated.
- **Onboard before assigning consequential work** — give the agent coding standards, project conventions, approved stacks, Git and testing procedures, business vocabulary, security boundaries, and escalation rules.
- **Prime the contractor** — repository instructions, committed skills, examples, and quality contracts turn a generic agent into a worker prepared for this organization.
- **Trust is progressive** — begin with read and explain, then propose, then make a bounded low-risk change under close review. Expand authority only after repeated evidence of reliable behavior.

## The constraint moved up the stack

- **The constraint / rate-limiting step** — AI did not remove the delivery bottleneck; it moved it from typing code toward defining, testing, evaluating, and approving changes.
- **Generated PRs are not throughput** — measure trusted merges and useful production outcomes, not lines written or PRs opened.
- **The human review queue** — if AI produces changes faster but humans review every diff traditionally, work-in-progress grows while delivery speed barely changes.
- **Human-in-the-loop → human-on-the-loop** — repetitive inspection can become automated evidence and exception handling; humans increasingly define policy, audit outcomes, and decide ambiguous or high-risk cases.
- **Autonomy is earned by change class** — low-risk, reversible, observable changes may eventually need no mandatory human touch; auth, payments, privacy, destructive migrations, and unclear product decisions retain stronger approval boundaries.

## Repair and revalidation

- **Bounded automatic repair** — an agent may fix a failure when the cause is clear, the change is narrow, no product or architecture decision is required, and the agent cannot approve or merge its own work.
- **Escalate ambiguity** — authorization failures, unsafe migrations, conflicting standards, and unclear business behavior go back to a developer or owner.
- **Never grade your own homework** — separate builder, test, security/architecture, repair, and final-evaluator roles so one mistaken assumption is less likely to survive every stage.
- **Revalidate the changed commit** — rerun the failed check, every check affected by the repair, and a final invariant suite. Serious software may require the complete evaluation after every substantive repair.
- **Commit and continue** — start asynchronous validation, move to independent work, and return when results arrive. Parallelism should reduce waiting, not scrutiny.

## The clever part — the loop that learns

- **The feedback loop** — when a PR review finds a new kind of problem, that rule is written into the requirements checklist, so every *future* commit gets checked for it automatically. The quality bar rises by itself. You should be able to explain why this matters more than any single fix.
- **Reviewer findings become infrastructure** — convert escaped defects into a deterministic check, regression test, evaluator skill, risk rule, or improved acceptance criterion.
- **The evaluation system is a product** — keep measuring false confidence, escaped defects, unnecessary escalations, repair success, and how much safe autonomy each class of change has earned.

## Comprehension debt & the review bottleneck

- **Comprehension debt** — when agents produce far more code than humans can read, the gap between "it works" and "we understand it" becomes the real risk — not the lint error you didn't run.
- **Review bottleneck** — generation got cheap; **understanding and judgment** are the scarce skills now. A green pipeline is necessary, not sufficient.
- **4× output ≠ 4× value** — unless someone reviewed all of it; cite Osmani/DORA directionally, verify numbers before teaching.
- **Confidence is the final bottleneck** — the PR system should manufacture enough trustworthy evidence that routine changes no longer require synchronous human inspection.

## Living standards (rules that compound)

- **`pr-requirements`** — a living checklist in `.claude/skills/pr-requirements/SKILL.md`; grows when `/pr-eval` finds a gap so the same mistake can't pass twice.
- **Committed rules vs. tool Memories** — team truth lives in git (survives a new hire's laptop); personal Memories don't.
- **Who approves org-wide rules** — a process question, not a tooling question; kit 04–05 and `docs/ai-program/`.

## Observability & scheduled hygiene

- **Observability** — audit trail lives in diffs, commits, test output, and PRs — not in a green chat message.
- **Nightly hygiene (Tier 1)** — cron runs `build · lint · test` without an agent API key; proves the repo still compiles when nobody is at the keyboard.
- **Nightly hygiene (Tier 2)** — scan → fix → monitor → harden → **maintenance PR**; humans merge; decision boundaries in [G1 worksheet](../../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md).
- **`/nightly-hygiene`** — local rehearsal of the Tier 2 chain before enabling GitHub Actions automation.
