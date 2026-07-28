# Phase 06 — Lesson plan: evaluation, model roles, and routing

*Room mechanics are shared with [Phase 00 teaching](../../docs/phases/00/TEACHING.md). Learner steps are in [Phase 06](../../docs/phases/06/README.md) and its [run order](../../docs/phases/06/RUN-ORDER.md).*

## Session promise

By the end, learners should have the existing Model Evaluation Lab and be able to discuss stable levels of AI work, subscription economics, harness value, local alternatives, and how future model routing can balance quality, thought, speed, cost, privacy, risk, and verification.

The phase does not recommend OpenRouter or any other routing provider. Current products may appear briefly as market examples.

## 1. Opening discussion — why do we leave the biggest model selected?

Ask for a show of hands:

- Who normally selects the strongest model available?
- Who changes reasoning effort before routine work?
- Who knows the API-equivalent cost of last week’s agent usage?
- Who has compared a smaller model under a strong harness with a larger model under a weak harness?

Explain that generous personal subscriptions, promotional access, and employer-funded usage have made frontier inference feel unusually inexpensive. Many people have received far more apparent token value than their monthly fee. That experience may continue in some form, but it is not safe to treat it as a permanent production architecture.

Avoid forecasting an exact date when prices will change. Land the durable point:

> A subscription is a purchasing arrangement. It is not an architecture.

An agent may turn one request into many calls: planning, search, coding, testing, review, repair, and summarization. At scale, teams must understand both per-call economics and total workflow economics.

## 2. The model is not the whole capability

Define the harness as the system surrounding the model:

- Instructions and task framing
- Context selection and compression
- Tools and tool descriptions
- Memory and repository knowledge
- Planning and state persistence
- Permissions and decision boundaries
- Testing, verification, and recovery
- Guardrails and feedback loops

Use two statements:

> The model supplies potential capability.

> The harness turns potential capability into dependable work.

Run or show four cells:

| | Minimal harness | Mature harness |
|---|---|---|
| Smaller model | baseline | harness uplift |
| Stronger model | raw capability | current ceiling |

Ask which improvement came from the model and which came from the surrounding system. Explain that harnesses also accumulate obsolete compensations; improved models should prompt simplification experiments.

## 3. Local models are moving into useful work

Present local models without hype or dismissal. They may not equal frontier systems on difficult, ambiguous, long-horizon work. Models quantized for laptops may lose additional capability. Yet they are already useful for a growing range of work:

- Classification and routing
- Extraction and schema transformation
- Summarization
- Documentation
- Search and memory maintenance
- Routine code transformations
- First-pass analysis
- Offline and sensitive-data workflows

Explain quantization at a practical level: it reduces the memory required to run a model and may improve feasibility or speed, while potentially reducing accuracy. Record the exact quantization, context, runtime, and hardware.

Correct two common claims:

- Local inference is not free: hardware, electricity, maintenance, engineering, and latency still cost something.
- Local inference is not automatically private: logging, telemetry, plugins, remote embeddings, and surrounding systems still matter.

## 4. Stop naming models in applications

Introduce stable organizational roles:

| Role | Typical work | Default reasoning |
|---|---|---|
| Utility | Formatting, extraction, classification | None/minimal |
| Workhorse | Routine coding, summaries, documentation | Light |
| Specialist | Debugging, review, multi-file changes | Medium |
| Deep thinker | Architecture, ambiguity, recovery | Heavy |
| Critical reviewer | Consequential independent review | Heavy |

Use the learner’s intuitive language:

- “My deep thinker with lots of thought is configuration X.”
- “My fast workhorse for straightforward tasks is configuration Y.”

The labels remain when the models change.

Then separate capability from reasoning. The router chooses:

1. What level of model capability is needed?
2. How much reasoning effort should it receive?
3. How quickly must it respond?
4. Where may the data execute?
5. How much may the workflow spend?
6. What verification or escalation is required?

## 5. Model routing

Define routing as selecting an execution policy for a task—not merely picking a brand.

Cover the main families:

- Static routing for known task types
- Explicit rule-based routing
- Complexity classification
- Semantic routing from similar historical work
- Learned routing from evaluation or preference data
- Cascades that begin economically and escalate
- Provider routing after a model has been selected
- Agentic routing across models, tools, and verification

Point out that sometimes the correct route is a cache, deterministic function, database query, or human—not an LLM.

Use a provider-neutral request:

```yaml
capability: workhorse
reasoning: light
speed: interactive
risk: controlled
data_policy: internal
max_cost: 0.05
required_features:
  - structured_output
verification:
  - schema
  - task_acceptance
```

## 6. A market category is forming

Briefly explain that gateways, cloud platforms, open-source frameworks, model providers, and internal enterprise systems are developing routing capabilities. OpenRouter is one current example the instructor has encountered; it aggregates access and offers automatic routing. It is not used by the class and is not an endorsed architecture.

Reported 2026 acquisition discussions involving Stripe and OpenRouter can be used as a time-stamped signal that the market sees strategic value in routing, usage metering, and inference economics. Clearly say that talks are not a completed acquisition and that the example will age.

The lasting point:

> Do not build the lesson around a routing company. Build a clear model taxonomy, evaluation system, and policy that routing implementations can execute.

## 7. Understand the existing evaluation before running it

Walk through the lab’s existing design:

- Twenty-one configurable prompts across four tiers
- Local and optional hosted contestants
- Contestant, judge, or both roles
- Repeated runs for consistency
- Accuracy, reasoning, structure, and insight criteria
- Round 1 screening and Round 2 comparison
- Heatmap, speed, quality-versus-speed, consistency, and drilldown views

Public leaderboards can identify candidates, but they do not decide the learner’s workload.

## 8. Calibrate judgment

Use deterministic checks first:

- Schema validity
- Exact values
- Tests
- Tool-call correctness
- Required or forbidden content
- State changes

Use human judgment for domain correctness and consequential meaning. AI judges can scale structured review after calibration.

Demonstrate failure modes:

- Position and ordering bias
- Verbosity and style preference
- Model-family or self preference
- Correlated judges agreeing while wrong
- Ambiguous rubrics
- Global averages hiding within-task failures
- Repeated trials that appear stable but remain invalid

Randomize answer order, conceal model identity, compare judges with human labels, and inspect disagreements.

## 9. Lab — keep the proven scope

Learners:

1. Build the harness and dashboard.
2. Select models, judges, prompts, repetitions, and weights.
3. Start, pause, resume, or subset the evaluation.
4. Watch the results populate.
5. Read several raw outputs before trusting aggregate scores.
6. Compare speed, quality, and consistency.
7. Run Round 2 and export the report.

The full evaluation may continue in the background. Use cached results if classroom inference is too slow.

The class does not add reasoning-level experiments, harness comparisons, a router, or a routing replay.

## 10. Closing discussion

Require each group to answer:

1. Which configuration earned each role?
2. What evidence supports the assignment?
3. Where did the harness change the result?
4. Which work was local good enough for?
5. Which failures required escalation?
6. How could these results eventually inform model roles?
7. What might a future router need to know?
8. Where did human judgment disagree with AI judges?
9. What should the next evaluation change?

Close with:

> Do not ask for the universally best model. Build the best evidence-backed model policy for each workload—and keep improving it.

## Instructor sources and refresh notes

- OpenAI, “Harness engineering: leveraging Codex in an agent-first world” — https://openai.com/index/harness-engineering/
- Anthropic, “Effective harnesses for long-running agents” — https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Anthropic, “Demystifying evals for AI agents” — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- Anthropic, “Building effective agents” — https://www.anthropic.com/engineering/building-effective-agents
- Ollama documentation — https://docs.ollama.com/faq
- RouteLLM — https://github.com/lm-sys/RouteLLM
- OpenRouter Auto Router, optional market example only — https://openrouter.ai/docs/guides/routing/routers/auto-router
- OpenRouter provider routing, optional market example only — https://openrouter.ai/docs/guides/routing/provider-selection
- Axios, reported Stripe/OpenRouter talks, 24 July 2026 — https://www.axios.com/2026/07/24/stripe-openrouter-merger-ai-currency
- The Information, reported Stripe/OpenRouter talks — https://www.theinformation.com/briefings/stripe-talks-buy-startup-openrouter
- Hamel Husain, evaluation FAQ — https://hamel.dev/blog/posts/evals-faq/
- Eugene Yan, LLM evaluators — https://eugeneyan.com/writing/llm-evaluators/

Refresh all model, product, price, and acquisition examples immediately before teaching. Keep them out of the durable architecture.
