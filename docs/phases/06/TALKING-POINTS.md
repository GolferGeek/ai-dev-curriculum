# Phase 06 — Talking points

## The economic reset

- Generous subscriptions and promotional tokens taught individuals to leave the strongest model selected.
- That experience does not predict production economics. An agentic workflow can multiply one user request into many inference calls.
- A subscription is a purchasing arrangement, not an architecture.
- Price is only one cost: include latency, retries, verification, infrastructure, engineering, outages, and failure consequences.
- Avoid promising that prices must rise on a particular schedule. Teach resilience to changing economics.

## Model capability and harness capability

- A model supplies potential capability; the harness turns it into dependable work.
- The harness includes instructions, tools, memory, context, planning, permissions, persistence, verification, recovery, and guardrails.
- Evaluate the model and harness separately. A mature harness around a smaller model may outperform careless use of a larger model.
- Harness assumptions rot too. Remove compensating complexity when improved models no longer need it.

## Local models

- Local models are not automatically equal to frontier models, free, or private merely because they run locally.
- They are increasingly useful for classification, extraction, summarization, routing, routine transformations, first passes, offline work, and sensitive-data workflows.
- Quantization trades memory and speed advantages for some potential capability loss.
- Record the exact model, quantization, context, hardware, runtime, and settings. “The local model” is not a reproducible configuration.
- Compare total cost, control, availability, and data location—not only benchmark quality.

## Define roles instead of hard-coding brands

| Role | Typical work | Default reasoning |
|---|---|---|
| Utility | Formatting, extraction, classification | None/minimal |
| Workhorse | Routine coding, summaries, documentation | Light |
| Specialist | Debugging, review, multi-file changes | Medium |
| Deep thinker | Architecture, ambiguous analysis, recovery | Heavy |
| Critical reviewer | Consequential verification and adjudication | Heavy and independent |

- A role is a durable organizational contract. A model assignment is temporary.
- Capability and reasoning effort are separate. A strong model can run lightly; a modest model can be given more time without becoming a frontier model.
- The request should express intent: role, reasoning, speed, risk, data policy, budget, required features, and verification.

## Model routing

- Routing decides which capability, reasoning effort, model pool, provider/location, and verification policy a task receives.
- Static routing maps known tasks directly.
- Rule-based routing applies explicit organizational policy.
- Semantic or learned routing predicts which candidate will satisfy the task.
- Cascade routing starts economically and escalates after low confidence or failed verification.
- Provider routing chooses an endpoint after model selection.
- Agentic routing can select models, tools, and verification dynamically.
- Sometimes the best route is a cache, database query, deterministic function, or no model at all.

## Market examples without endorsements

- OpenRouter is one current example of aggregated access and automatic routing. It is not used or recommended by this course.
- Reported acquisition interest illustrates the market value of the routing layer, not which service learners should adopt.
- More algorithms, gateways, platforms, and internal routing systems will emerge. Teach the contract and evidence, not a vendor UI.

## Evaluation discipline

- Public leaderboards measure someone else’s distribution.
- Begin with a real decision, representative work, unacceptable failures, and human-reviewed anchors.
- Use deterministic graders whenever possible; use AI judges where judgment is necessary.
- Randomize presentation order and conceal model identity from judges.
- Test position, verbosity, style, self-preference, and correlated-judge bias.
- Judge agreement is not validity. Calibrate against humans and inspect disagreements.
- Averages can hide catastrophic failures. Report severity and worst cases.
- Version the workload, prompt, harness, model, reasoning level, rubric, and judge.

## Continuous improvement

1. Evaluate real work.
2. Assign or revise model roles.
3. Route production work.
4. Observe quality, cost, latency, failures, and overrides.
5. Improve prompts, skills, memory, harnesses, and guardrails.
6. Re-evaluate after meaningful change.

## Takeaway

> Do not ask for the universally best model. Build the best evidence-backed model policy for each workload.
