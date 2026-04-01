# Demo-grade bar — what “impressive” means here

This curriculum is a **showcase for agents, skills, and prompts**: learners should see that the right instructions produce **real product surfaces quickly**, not a single static screen with a title and two bullets.

## Not enough (reject and iterate)

- **One route / one panel** that only describes the product (“Track A · …”) with no interactive workflow.
- **No persistence** where the intention implies saved work (collections, pages, deals, incidents)—**`localStorage` or equivalent in-browser persistence is fine** for class; a real backend is optional unless the PRD demands it.
- **Playwright (or tests) that only assert** visible text on the landing view—tests must **exercise at least one meaningful interaction** (send request, save page, move card, add log entry, etc.).

## Enough to ship a phase (maintainers + learners)

- **Multiple distinct UI regions or routes** so the app feels like a **tool** (navigation, layout, list + detail, or wizard step)—not a marketing one-pager.
- **At least one complete loop** per track (see that track’s `intention-*.md` **Demo-grade minimums**).
- **Errors and empty states** where users can hit them (e.g. invalid URL, empty collection)—briefly is fine.
- **Tests** that follow a user-visible path through the loop, not only `document.title`.

Track-specific requirements live in:

- [intention-http-workspace.md](./intention-http-workspace.md)
- [intention-team-wiki.md](./intention-team-wiki.md)
- [intention-pipeline-crm.md](./intention-pipeline-crm.md)
- [intention-ops-pulse.md](./intention-ops-pulse.md)

When in doubt, **match the track intention file**, then this bar, then the root **README** § 0.0 intention.
