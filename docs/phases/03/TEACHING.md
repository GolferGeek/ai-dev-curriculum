# Phase 03 — Instructor teaching guide

*Share [OVERVIEW.md](./OVERVIEW.md) at open. Exact learner steps are in [RUN-ORDER.md](./RUN-ORDER.md). Content lecture and citations live in the [lesson plan](../../../marketing/lesson-plans/phase-03.md).*

## Teaching outcome

Learners should leave believing that understanding is a maintained repository asset. Investigation is complete only when verified knowledge improves project memory and, when mature, strengthens the guardrails built in Phase 02.

## Room arc

1. **Reconnect to Phase 02.** Guardrails encode known risks; they cannot encode what the team has never discovered.
2. **Teach the memory cycle.** Questions → evidence → memory → promotion → guardrails → new events → new questions.
3. **Model question formation.** Turn “explain the repo” into sharp, falsifiable questions.
4. **Choose lab mode and repository.** Enforce authorization and read-first boundaries.
5. **Predict before tools.** Capture three guesses publicly.
6. **Run standard research.** Learners work; nobody watches the scroll.
7. **Pursue a unique question.** Standard tools are the beginning, not the assignment.
8. **Build memory.** Verify, classify, and commit one durable improvement.
9. **Create a skill.** Encode a question or memory-maintenance method.
10. **Promote carefully.** Propose one finding for docs, agent guidance, quality contract, test, CI, or merge policy.
11. **Return session.** Share surprises, corrections, boundaries, and next questions.

## Demonstrate the promotion ladder

Use one concrete example:

- Observation: three recent authorization regressions touched the same route family.
- Explanation: route-level ownership checks are inconsistent.
- Expectation: every route returning tenant data must prove ownership.
- Enforcement: add authorization contract tests and require them in the high-risk PR profile.

Ask at every transition: **What additional evidence or ownership confirmation makes this promotion legitimate?**

## Facilitation prompts

- What would a new contractor misunderstand here?
- Which claim sounds certain but has weak evidence?
- Where does written architecture disagree with actual imports or history?
- What did a reversion or incident teach that current docs forgot?
- What knowledge is worth preserving?
- What should remain a note rather than become a gate?
- What could we enforce deterministically?
- What would make this memory stale?

## Team-mode mechanics

- Give groups a shared investigation brief before they divide.
- Require each lens to cite evidence.
- Reserve synthesis time; parallel reports are not a system understanding.
- Make contradictions visible rather than averaging them away.
- Assign a memory editor to keep the packet coherent.

## Individual-mode mechanics

- Check repository safety before the learner begins.
- Require a unique question beyond the standard reports.
- Pair learners briefly for adversarial review of one conclusion.
- Hold every learner to the same investigation-packet bar.

## Return session

Keep presentations short and comparable. Require nine answers from [RUN-ORDER.md](./RUN-ORDER.md). The most important moments are:

- a prediction that was wrong,
- a confident agent claim that needed qualification,
- memory that was repaired by Git history,
- a rule that should—or should not—be promoted,
- the next question the system now makes possible.

## Instructor failure modes

- Running every command as a checklist with no driving question
- Treating generated reports as truth
- Rewarding volume over evidence
- Skipping the synthesis after parallel work
- Promoting preferences or speculative findings into hard gates
- Letting proprietary-code policy remain implicit
- Ending without a durable memory update

## Close

> Phase 02 made changes prove themselves. Phase 03 makes the system explain itself—and uses every better explanation to improve how future changes are judged.
