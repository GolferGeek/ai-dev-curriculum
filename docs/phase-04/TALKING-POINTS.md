# Phase 04 — Talking points

*The concepts you should be able to explain — at a high level, in a sentence or two — after this phase. Stuck on one? Ask your agent: "Explain ___ in 3–4 sentences, no jargon, with one analogy."*

## The big idea

- **Protocol vs. API** — an API is one service's private front door; a protocol is a *shared language* any two strangers can speak. Agents need protocols because they have to work with services they've never met.
- **Why this phase exists** — the next era of software is agents discovering, hiring, and paying each other; you should be able to describe that future in two sentences.

## The protocols (one line each, that's enough)

- **A2A (Agent-to-Agent)** — how agents find and hire each other: each publishes an **Agent Card** (a public résumé of what it can do), and they exchange work as structured **tasks** over JSON-RPC.
- **JSON-RPC** — the plain envelope format those messages travel in: "here's the method I want, here are the parameters, give me a result or an error."
- **AP2 (payments authorization)** — the *permission* layer: a human signs a **mandate** ("this agent may spend up to $X on Y, until date Z") so an agent can buy things without a blank check.
- **x402 (HTTP payments)** — the *transaction* layer: a service answers "402 Payment Required," the agent presents payment proof, and the door opens. (Fun fact: 402 sat unused in the HTTP spec for ~30 years waiting for this.)
- **AG-UI** — how agent activity streams *to a human's screen* as live events, so you can watch the machines negotiate in real time.
- **MCP (Model Context Protocol)** — how an agent plugs into tools and data sources (databases, file systems, services) in a standard way.

## The architecture you built

- **Orchestrator** — the conductor agent that takes the user's goal and delegates pieces to specialist agents.
- **Specialist services** — independent NestJS services, each an agent with its own card, skills, and (sometimes) prices.
- **The dashboard** — a Next.js app subscribed to the AG-UI event stream; Discover / Ask / Explore are just three views over the same live protocol traffic.
- **Mandate flow, end to end** — the sentence to be able to say: "the user signs a spending mandate, the orchestrator hires a specialist via A2A, hits a 402 paywall, pays under the mandate via x402, and every step streams to the dashboard."
