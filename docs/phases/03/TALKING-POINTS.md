# Phase 03 — Talking points

*The concepts you should be able to explain — at a high level, in a sentence or two — after this phase. Stuck on one? Ask your agent: "Explain ___ in 3–4 sentences, no jargon, with one analogy."*

## The reciprocal loop with Phase 02

- **Phase 02 builds guardrails; Phase 03 improves them** — quality gates encode what the team already knows, while investigation discovers what the system and its guardrails do not yet know.
- **The codebase should understand itself better** — a successful investigation leaves durable explanations, maps, questions, skills, tests, or rules in the repository rather than disappearing into a one-time report.
- **The memory cycle** — ask questions → select findings worth remembering → update memory as the system changes → use Git history and new incidents to correct the memory → promote verified findings into better guardrails.
- **Self-improving development system** — each defect, surprise, review comment, investigation, and successful repair can make future work easier to understand and harder to damage.

## Reading a strange codebase

- **Orientation (`/ingest`)** — ask what the system does, what stack it uses, how it is organized, and where execution begins.
- **Entry and exit points (`/map`)** — find where requests enter and where data leaves; tracing one real feature end-to-end is often the fastest path to understanding.
- **Auth boundaries** — locate where "anyone" becomes "this user, role, or tenant," then verify that the boundary is consistently enforced.
- **Data flow** — narrate one feature as user action → handler → business rule → query → storage → response.
- **Safe-change boundary** — good research identifies what is safe to change, what needs more evidence, and what should not be touched yet.

## Questions are the investigation

- **Start with predictions** — guess the churn hotspot, auth boundary, riskiest dependency, or least-tested subsystem before running tools; comparison calibrates trust.
- **Ask for evidence** — polished explanations are claims. Require files, commits, tests, configuration, and observations that support them.
- **Ask codebase-specific questions** — the standard toolkit orients you; the valuable work begins when you create questions that fit the system in front of you.
- **Record uncertainty** — a useful report distinguishes observed facts, supported inferences, preferences, policies, and unresolved questions.

## Reading the history (`/git-story`)

- **Hotspots and churn** — frequently changed files may contain complexity, instability, hidden ownership, or changing requirements.
- **Coupling** — files that repeatedly change together may share a dependency the architecture does not make obvious.
- **Documented process vs. actual process** — Git history reveals whether branch, commit, review, ownership, and testing expectations are consistently followed.
- **History repairs memory** — a system map that ignores recent migrations, reversions, incidents, and ownership changes becomes misleading; Git is evidence for keeping memory current.

## Project memory

- **Observations** — evidence-backed findings from a particular investigation; keep them in research reports.
- **Explanations** — durable maps, vocabulary, ownership, design decisions, risks, and onboarding guidance.
- **Expectations** — practices the team wants future changes to follow; place them in the quality contract or PR requirements.
- **Enforced guardrails** — mature expectations become tests, CI checks, architecture rules, coverage gates, or merge policy.
- **Promotion path** — observation → explanation → expectation → enforcement. Do not turn one uncertain agent finding directly into an organization-wide rule.
- **Repository memory beats conversational memory** — durable memory is versioned, reviewable, attributable, discoverable, correctable, and available to people and agents.

## Making your own investigation tools (`/author-agent`)

- **Agent vs. skill** — an agent is a role with tools and boundaries; a skill is reusable knowledge or a repeatable workflow.
- **Custom investigation skill** — define the question, required evidence, prohibited assumptions, uncertainty format, output, and verification method.
- **Useful candidates** — API consistency, Git-process audit, test-coverage audit, authorization map, migration risk, ownership map, business-rule locator, docs drift, feature flags, observability, or onboarding questions.
- **`/promote-finding` pattern** — a useful custom skill can classify a finding, test its evidence, identify an owner, and recommend whether it remains a report, becomes documentation, becomes agent guidance, or becomes a deterministic guardrail.
- **The meta-skill** — notice a valuable question or method you repeat, encode it, test it, and leave it with the repository.

## Open Codebase Investigation Lab

- **Team mode** — groups investigate one repository in parallel, dividing architecture, data flow, security, Git history, testing, and improvement questions before synthesizing one system story.
- **Individual mode** — each learner chooses an authorized internal, sanitized, public GitHub, or course-provided repository and owns the investigation end-to-end.
- **The deliverable is an investigation packet** — questions and predictions, evidence-backed findings, uncertainty, updated project memory, one custom skill, one promotion candidate, and a recommended safe first change.
- **The return session matters** — share what surprised you, what the agent got wrong, what you would not change, what memory you added, and what guardrail should improve.
- **Day-2 safety** — authorized repositories only, approved tools only, no secrets or customer data in prompts, research branch, and read-first behavior.

## What good looks like

- Someone new can explain one important system flow using committed evidence.
- The team knows which conclusions are facts and which remain hypotheses.
- One useful piece of memory was added or corrected.
- One codebase-specific investigation skill was created and tested.
- One verified finding was proposed for promotion into a Phase 02 guardrail.
- The repository is easier to understand and harder to damage than before the lab.
