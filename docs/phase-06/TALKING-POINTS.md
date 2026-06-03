# Phase 06 — Talking points

*The concepts you should be able to explain — at a high level, in a sentence or two — after this phase. Stuck on one? Ask your agent: "Explain ___ in 3–4 sentences, no jargon, with one analogy."*

## The question this phase answers

- **Benchmarks vs. your workload** — public leaderboards measure someone else's prompts; the only ranking that matters is on *your* prompts, *your* data, *your* criteria. You should be able to explain why "which model is best?" is an empirical question, not a brand question.

## The contestants

- **Local vs. hosted models** — local (via Ollama) runs on your machine: private, free per-call, limited by your hardware. Hosted (via API) is more capable but costs money and your data leaves the building. The tradeoff, in one breath.
- **Ollama** — the local model runtime: `ollama pull <model>` downloads one, then your code calls it over a local HTTP API.
- **Model size & quantization (hand-wave level)** — bigger models are smarter and slower; quantization shrinks them to fit smaller machines at a small quality cost.
- **Model names rot** — tags and versions change monthly; the harness is built to swap contestants, because the roster is always stale.

## How the tournament works

- **Eval harness** — the runner: send every prompt to every model, collect every answer, time everything.
- **AI judges** — other models score each answer against a rubric; using *several* judges guards against one judge's taste.
- **Rubric / criteria** — accuracy, reasoning, structure, insight — defined *before* judging, so scores mean something.
- **Two-round scoring** — screen everything cheaply first, then rank the survivors carefully; the same pattern humans use for hiring.
- **Correlated judges (the gotcha)** — judges that share training data can agree *and all be wrong*; more judges means more confidence only if they're independent. This is the deepest idea in the phase.

## Reading the results

- **Speed vs. quality scatter** — tokens/second against judged quality; the "best" model is a point on a tradeoff curve, and the right pick depends on the job.
- **The takeaway sentence** — "for *this* workload, model X wins at quality, model Y wins per dollar/second, and here's the data."
