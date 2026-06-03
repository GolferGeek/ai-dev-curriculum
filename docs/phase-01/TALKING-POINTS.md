# Phase 01 — Talking points

*The concepts you should be able to explain — at a high level, in a sentence or two — after this phase. You steer; the agents implement. Stuck on one? Ask your agent: "Explain ___ in 3–4 sentences, no jargon, with one analogy."*

## The upgrade from Phase 00

- **localStorage vs. a real database** — Phase 00 apps remembered things only in one browser; a database remembers them for every user, on every device, permanently.
- **SaaS** — software you rent in the browser; this phase you build the *ownable* version of one, which is why we call them "killers."

## Web track

- **Next.js** — a React framework where some code runs on the *server* (safe, fast, near the data) and some in the *browser*; you should be able to say which kind of work belongs where.
- **App Router / server actions** — how pages and their server-side form handling are organized; the form posts to the server, the server talks to the database.
- **Middleware (auth)** — the gatekeeper that runs before a page loads and bounces you to sign-in if you don't belong.
- **SurrealDB** — the local database: schemas define what records look like, and queries read/write them.
- **Schema** — the written contract for your data ("an invoice has a client, line items, a status") — version-controlled like code.

## Authentication (worth being able to whiteboard)

- **Signup vs. sign-in** — creating an identity vs. proving it.
- **Session / JWT** — the tamper-evident "wristband" the server gives your browser so you don't re-prove your identity on every click.
- **Protected route** — a page that checks the wristband first.
- **Per-user data isolation** — the database itself scopes records to their owner, so users can't see each other's data even if the UI messes up.

## iOS track (if you chose it)

- **SwiftUI** — Apple's declarative UI: you describe what the screen *is* for a given state, not how to mutate it.
- **SwiftData** — local persistence for those apps; the iOS cousin of "the database remembers."
- **Simulator / `xcodebuild`** — how iOS apps run and build without a physical phone.

## Proving it works

- **Visual testing (`/test-browser`)** — an agent drives a real browser, looks at the screens, and reports what a human would see.
- **Demo-grade for SaaS** — real signup → sign-in → protected pages → persisted per-user data. If any link in that chain is faked, it isn't demo-grade.
