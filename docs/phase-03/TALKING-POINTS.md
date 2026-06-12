# Phase 03 — Talking points

*The concepts you should be able to explain — at a high level, in a sentence or two — after this phase. Stuck on one? Ask your agent: "Explain ___ in 3–4 sentences, no jargon, with one analogy."*

## Reading a strange codebase (the day-1-on-the-job skill)

- **Orientation (`/ingest`)** — the first questions for any repo: what is this, what's the stack, how is it organized, where does it start?
- **Entry and exit points (`/map`)** — where requests come *in* (routes, handlers, UIs) and where data goes *out* (databases, APIs, files); tracing one request end-to-end is the fastest way to understand a system.
- **Auth boundaries** — the lines in the code where "anyone" becomes "only you"; you should be able to point at where they ought to be.
- **Data flow** — being able to narrate "the user clicks here → this handler → this query → this table" for one real feature.

## Reading the history (`/git-story`)

- **Hotspots & churn** — files that change constantly are where the complexity (and the bugs) live; git history is evidence, not trivia.
- **Velocity & contributors** — what the commit record says about how a team actually works.

## Finding what's wrong

- **Security scan** — the classic checks: exposed secrets, injection risks, missing auth, data leaking somewhere it shouldn't.
- **Tech debt / dead code (`/improve`)** — code that costs you every month: unused, untested, or duplicated. You should be able to say why deleting code is often the best improvement.
- **Verify-on-known-ground** — the trick of running research tools on a repo you *already know* (the one you built) to calibrate how much to trust them before pointing them at a stranger's production code.

## Making your own tools (`/author-agent`)

- **Agent vs. skill** — an agent is a *role* with tools and rules; a skill is *knowledge or a workflow* an agent applies. You should be able to say which a given idea wants to be.
- **The meta-skill** — noticing a pattern you keep repeating and turning it into a reusable skill: the moment you stop being only a user of the toolkit and start being its author.
- **Day-2 safety** — the extra care production code demands: read-only first, no secrets in prompts, smallest possible blast radius.
