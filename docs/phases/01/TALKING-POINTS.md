# Phase 01 — Talking points

*The concepts you should be able to explain — at a high level, in a sentence or two — after this phase. You steer; the agents implement. Self-check: read each aloud and finish the sentence. Stuck on one? Ask your agent: "Explain ___ in 3–4 sentences, no jargon, with one analogy."*

## SaaS Killers — why build again

- **The SaaS bargain** — companies traded custom software (slow, licensed, per-machine, self-hosted) for subscription access to good-enough products — and often **stopped staffing dev** for line-of-business tools.
- **What went underground** — workflows that didn't fit the product became spreadsheets, manual process, and "we'll never get to that backlog item."
- **The reopening (~2025–26)** — for **well-scoped slices**, AI-assisted build got fast again; teams replace **narrow misfit SaaS** with ownable internal tools — not cloning every enterprise suite overnight.
- **SaaS killer** — a **credible, ownable slice** of a famous product (invoices, kanban, feed, friends) in **your monorepo** — subscription-shaped problem, **your** code and data.
- **David vs Goliath** — incumbent SaaS has breadth and brand; small teams win on **fit and speed** when the terrain (models, harnesses) shifts faster than Goliath's roadmap.
- **Moving port** — big orgs **commit** to LLM, harness, and governance choices; AI keeps moving the destination; small teams can **re-aim** the next slice without turning an aircraft carrier.

## Vibe coding vs vibe engineering

- **Vibe coding** — describe the app, generate until it *feels* done, ship the preview — little obligation to understand auth or data wiring (Karpathy's term; Willison's warning).
- **The Lovable / Replit path** — real and fast; those platforms are **adding guardrails** (RLS templates, checks, secure Next.js patterns) — credit that, don't pretend it's 2024.
- **Vibe engineering** — agents may write every line, but **you** own intention, review, test, and proof — especially the **auth-and-data chain**.
- **What this course does** — pipeline + Demo-grade minimums + **second-user isolation test** — not "trust the hosted preview."

## The upgrade from Phase 00

- **localStorage vs real database** — Phase 00 remembered data in one browser; SurrealDB (or SwiftData on iOS opt-in) remembers per **user**, across sessions and devices.
- **No auth vs real auth** — Phase 00 apps had no identity; Phase 01 apps **must** implement signup, sign-in, protected routes, and logout that actually work.
- **Single agent vs agent team** — `/run-plan` sequences **surrealdb-builder** (data + auth) then **nextjs-saas-builder** or **ios-builder** — data layer before UI.

## Web stack (class default)

- **Next.js (App Router)** — React framework with **server** and **client** code; know which work belongs where (data and secrets stay server-side).
- **Server actions** — forms post to server functions — a **trust boundary**; power and risk (see React server-component CVE class).
- **Middleware (auth)** — code that runs **before** a page loads to reject unsigned visitors.
- **SurrealDB** — local multi-model database; **schemas** define record shapes; **auth scopes** enforce who can read/write what.
- **Schema** — version-controlled data contract ("an invoice has line items and a status") — ambiguity here becomes production bugs.

## Authentication (whiteboard-worthy)

- **Signup vs sign-in** — creating an identity vs proving you own it.
- **Session / JWT** — tamper-evident token the server issues so the browser doesn't re-prove every click.
- **Protected route** — page or API that **checks** the token before showing data or running logic.
- **Per-user data isolation** — database rules scope records to `$auth.id` (or equivalent) — **user B must not read user A's rows** even if the UI misbehaves.
- **Trust boundary** — any place client input becomes server action or DB query — where vibe-coded apps leak.

## iOS track (opt-in, Mac only)

- **SwiftUI** — declarative UI: describe screens from state.
- **SwiftData** — on-device persistence for the iOS killers.
- **Simulator / `xcodebuild`** — build and test without a physical device.
- **Not the class default** — Twitter/Facebook intentions are built as **web apps** in cohort unless someone explicitly opts into Mac + Xcode.

## Proving it works

- **Demo-grade for SaaS** — signup → sign-in → protected app → **persisted per-user data** → empty/error states — see [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md).
- **Second-user breach test** — create two accounts; verify B cannot see A's data via UI, URL, or direct query — **non-negotiable.**
- **`/test-browser`** — agent-driven Chrome walkthrough — eyes on the app, not the chat transcript.
- **Closing bracket** — `npm run build` → `npm run test` → verify against intention → browser — same discipline as Phase 00, higher bar.

## What comes next

- **Phase 02** — scanners, gates, PR review — would a **reviewer** approve what you built today?
- **Guardrails in the company** — speed came back; **standards, correctness, proof** must live in the repo again — adoption kit 04–05, nightly hygiene.
