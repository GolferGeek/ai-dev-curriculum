# Phase 06 — Instructor teaching guide

*Share [OVERVIEW.md](OVERVIEW.md) at open. Exact learner steps are in [RUN-ORDER.md](RUN-ORDER.md). The expanded lecture and citations live in the [lesson plan](../../../marketing/lesson-plans/phase-06.md).*

## Teaching outcome

Learners should leave with a working evaluation lab and enough vocabulary to question “I always use the best model”: subscription economics, harness value, local alternatives, model roles, reasoning levels, and the emerging routing category.

## Room arc

1. **Expose the habit.** Ask who leaves the strongest available model selected and why.
2. **Separate subscription from architecture.** Show how agent calls multiply at scale.
3. **Separate model from harness.** Explain how instructions, tools, memory, and verification alter useful capability; do not add another experiment to the lab.
4. **Make local concrete.** Run a modest local model; discuss fit, quantization, privacy, and limitations.
5. **Define organizational roles.** Utility, workhorse, specialist, deep thinker, critical reviewer.
6. **Separate reasoning effort.** Decide how much thought, speed, and verification the task needs.
7. **Walk through the existing evaluation.** Contestants, prompts, repetitions, judges, rubric, tournament, and dashboard.
8. **Run and inspect.** Read failures and disagreements, not only the leaderboard.
9. **Interpret roles.** Ask where results suggest utility, workhorse, specialist, or deep-thinker use.
10. **Discuss routing.** Explain the emerging category without building it.
11. **Close the loop.** Better evaluation supports better future model choices.

## Worked discussion example

Prompt the room with a routine API response-normalization task. Ask learners to classify it as utility, workhorse, specialist, or deep thinker, and to describe how much thought, speed, privacy, and verification it deserves. Then compare that prediction with the existing lab’s evidence. No router is implemented.

## Explain the routing layers conceptually

1. The application states intent.
2. Organizational policy restricts allowed roles, locations, and budgets.
3. A routing implementation selects a configuration.
4. The harness executes and verifies.
5. Outcomes can eventually update evaluation evidence.

Current vendors may illustrate a layer, but no vendor belongs at the center of the diagram.

## Discussion prompts

- What work deserves the deep thinker?
- What work are we currently overpaying for?
- Which tasks are too sensitive to leave the machine?
- When is a local result good enough?
- Can a strong harness compensate for a smaller model here?
- What failure should force a future system to escalate?
- What must never be delegated to an AI judge alone?
- How will we know the router is making good decisions?
- What change should trigger the next evaluation?

## Instructor failure modes

- Teaching a fixed model roster as if it were durable
- Making OpenRouter or any vendor the lesson
- Treating AI-judge agreement as truth
- Optimizing average score while hiding severe failures
- Comparing configurations without recording prompts and settings
- Claiming local inference is free or automatically private
- Equating “heavy reasoning” with “largest model” in every case
- Turning a routing discussion into extra coding scope
- Ending with a leaderboard instead of a decision record

## Close

> The final skill is not choosing today’s winner. It is building an organization that can keep choosing well as models, harnesses, economics, and workloads change.
