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

- **Commit** — a checkpoint with a message that explains *why*; the quality gate runs before it.
- **Quality gate** — the non-negotiable checklist (build passes, tests pass, no violations) that blocks a commit until it's clean.
- **Pull request (PR)** — a proposed set of changes that someone (or some agent) reviews before it joins the main line.
- **Code review** — reading the change and judging it: correct? safe? consistent with the architecture? This is the durable human skill, practiced as a process.

## The clever part — the loop that learns

- **The feedback loop** — when a PR review finds a new kind of problem, that rule is written into the requirements checklist, so every *future* commit gets checked for it automatically. The quality bar rises by itself. You should be able to explain why this matters more than any single fix.
