# Phase 03 — Investigate, remember, improve

*Last verified: July 2026*

Phase 03 teaches you to understand a codebase you did not write—and to leave it easier for the next person or agent to understand.

Phase 02 built the quality system: tests, architecture checks, PR requirements, and merge evidence. Phase 03 completes the loop. You ask better questions, investigate the system and its history, capture verified knowledge as durable project memory, and promote mature findings back into stronger Phase 02 guardrails.

> **The codebase should understand itself better after every investigation.**

## What you will produce

- An investigation question set and three written predictions
- Evidence-backed orientation, map, security, Git-story, improvement, and deep-dive reports
- One durable project-memory addition or correction
- One codebase-specific investigation skill
- One verified finding proposed for promotion into a guardrail
- A short investigation packet presented to the room

## The core cycle

1. **Ask questions about the system.**
2. **Select verified answers worth remembering.**
3. **Update memory as new questions, changes, incidents, and decisions occur.**
4. **Use Git history to correct incomplete or stale memory.**
5. **Promote mature findings into documentation, agent guidance, tests, or gates.**
6. **Let improved guardrails shape the next change—and investigate again.**

This is the reciprocal relationship:

| Phase 02 | Phase 03 |
|---|---|
| Encodes what the team knows | Discovers what the team does not yet know |
| Evaluates proposed changes | Investigates the existing system |
| Blocks known failure modes | Finds undocumented patterns and risks |
| Produces trusted merge evidence | Produces trusted system understanding |
| Improves from escaped defects | Feeds verified discoveries back into guardrails |

## The standard research toolkit

| Skill | Question |
|---|---|
| `/ingest` | What is this system? |
| `/map` | How do requests and data move? |
| `/security-scan` | Where are the trust and exposure risks? |
| `/git-story` | What does history reveal about change, ownership, and practice? |
| `/improve` | What is costly, fragile, duplicated, untested, or obsolete? |
| `/deep-dive [area]` | What do we need to understand deeply? |
| `/author-agent` | What valuable question or method should become reusable? |

The standard skills orient you. The real work begins when you form questions specific to the repository.

## Project memory is layered

Do not turn one confident finding directly into a hard rule.

1. **Observation** — evidence from this investigation
2. **Explanation** — durable description of how the system works
3. **Expectation** — practice the team wants future work to follow
4. **Enforcement** — test, CI check, architecture rule, or merge policy

The promotion path is **observation → explanation → expectation → enforcement**.

## Choose your lab mode

### Team investigation

Small groups choose one repository and divide architecture, data/security, testing, Git/process, and operations questions. They investigate in parallel, reconcile contradictions, and produce one shared system story.

### Individual investigation

Each learner chooses an authorized internal repository, sanitized project, public GitHub repository, or course-provided fallback. They own the complete question → evidence → memory → guardrail cycle.

Both modes create the same investigation packet. See [RUN-ORDER.md](./RUN-ORDER.md).

## Safety boundary

- Use only repositories you are authorized to access.
- Use only AI services approved for the code and data involved.
- Do not place secrets, customer information, credentials, or prohibited code in prompts.
- Stay on the continuing learner branch for the course; use the target
  organization's branch policy when repeating the investigation at work.
- Begin read-only and report-first.
- Propose changes; do not modify production systems during this lab.
- If policy is unclear, use a public or course-provided repository.

## Phase documents

- [OVERVIEW.md](./OVERVIEW.md) — learner-facing session anchor
- [PREREQUISITES.md](./PREREQUISITES.md) — access and safety preparation
- [RUN-ORDER.md](./RUN-ORDER.md) — exact lab flow
- [COMMANDS.md](./COMMANDS.md) — research skill reference
- [STARTER-KIT.md](./STARTER-KIT.md) — roles, artifacts, and investigation packet
- [TALKING-POINTS.md](./TALKING-POINTS.md) — concepts to explain
- [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) — what counts as credible
- [VERIFY.md](./VERIFY.md) — evidence checklist
- [TEACHING.md](./TEACHING.md) — instructor delivery guide
- [Lesson plan](../../../marketing/lesson-plans/phase-03.md) — content lecture

## Why this matters

Project understanding usually walks out of meetings, review comments, and experienced employees' heads. Phase 03 makes understanding cumulative. Research leaves evidence; evidence becomes memory; memory becomes standards; mature standards become guardrails. The repository becomes easier to join, safer to change, and better able to teach both people and agents how it works.
