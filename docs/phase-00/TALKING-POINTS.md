# Phase 00 — Talking points

*The concepts you should be able to explain — at a high level, in a sentence or two — after this phase. You never need to implement these by hand; you need to know them well enough to **steer**. Self-check: read each aloud and finish the sentence. Stuck on one? Ask your agent: "Explain ___ in 3–4 sentences, no jargon, with one analogy."*

## The pipeline (the heart of everything)

- **Intention** — a short statement of what should exist and why, written *before* anything else; the quality of this conversation caps the quality of everything built after it.
- **PRD (product requirements doc)** — the intention turned into checkable goals; every goal should trace back to the intention.
- **Plan** — the PRD turned into ordered build steps with named owners (agents); nothing gets built that isn't in it.
- **The challenge pass** — your job at each step: read what the agent produced and ask "does this actually match what I meant?" before moving on.

## Git (the self-paced survival kit)

- **Repository / clone** — the project and your personal copy of it.
- **Branch** — your own line of work; you build on `my-phase-00`, never directly on a tag.
- **Tag** — a frozen snapshot; the phase tags are known-good starting states you branch *from*.
- **Commit** — a saved checkpoint with a message; commit when something works.

## The build

- **Monorepo** — one repository holding multiple apps and shared packages, so they version and build together.
- **Turborepo** — the task runner that builds/tests every app in the monorepo and caches what hasn't changed (that's why the second build is instant).
- **`apps/` vs `packages/`** — products people use vs. shared code products depend on.
- **npm & `package.json`** — how JavaScript projects declare and install their dependencies; `npm install` fetches, `npm run build` compiles.
- **Vite + React** — the app stack: React describes UI as components that re-render when data changes; Vite is the fast dev server and bundler around it.

## Proving it works

- **Playwright / end-to-end tests** — a robot browser that clicks through your app like a user and fails loudly when a flow breaks.
- **Demo-grade** — the bar: multiple working UI regions, one complete loop, visible error states, and tests that exercise real interaction — a credible product slice, not a hello-world.
- **The verify script** — structural checks that the curriculum kit is intact; green before you build, green after.
