# Intention — HTTP workspace (Track A)

## Why this exists

Developers constantly repeat the same manual steps: find an endpoint, swap environments, tweak headers, compare responses. A **local-first HTTP workspace** makes that **fast, repeatable, and shareable** inside a team—without standing up a full gateway or paying for a hosted API client on day one.

This track is also a **demo of velocity**: agents should produce something that **feels like Postman/Insomnia-class tooling**, not a landing page that *talks about* HTTP.

## Who it’s for

Individual developers and small teams who want **collections of requests**, **named environments** (e.g. local vs staging), and **saved context** (last responses, notes) so onboarding and debugging aren’t tribal knowledge only.

## Demo-grade minimums (non-negotiable for “done”)

Ship a **multi-area UI** (e.g. sidebar + main panels, or clear tabs), not a single hero section.

1. **Collections** — User can create **at least one named collection** and **add multiple requests** (method, URL; headers and body optional but strongly preferred for at least one request).
2. **Send** — User can **select a request and send it** (use **`fetch`** to a **public** URL for the demo—e.g. `https://httpbin.org/get` or similar—or a documented mock). Show **status, response body (or snippet), and timing or error** in a dedicated **response panel**.
3. **Environments** — User can define **at least two named environments** with variables (e.g. `baseUrl`) and **see them applied** when building the request URL or headers.
4. **History** — **Recent runs** list (last N calls) with **re-run** or quick open—persisted across refresh (**`localStorage`** is fine).
5. **Navigation** — Obvious way to move between collections list, request editor, environments, and history without confusion.

## What “great” adds (when time allows)

- Import/export collection as JSON.
- Pretty-print JSON responses; copy response button.
- Variables in path/headers with clear resolution preview.

## Out of scope for the first version

- Real payment or auth provider integration; OAuth dance can be **documented as a follow-on**, not required for v1.
- Team sync / cloud backup (local or single-user persistence is enough).

## Success

Someone new can **create requests, switch environment, hit Run, and inspect the response**—and the UI looks like a **credible API client**, not a slide deck.

## How this feeds PRD → plan → app

This file is the **product intention** learners copy or align to before **`/prd`**. Treat **Demo-grade minimums** above as the **contract**: the PRD should restate each numbered item as a **requirement with testable acceptance criteria**; the plan should name **screens or tabs**, **data shapes** (collections, requests, environments, history entries), **`localStorage` (or other) keys**, and **which public URL** you will call for the live send demo. If anything is ambiguous, prefer the **stricter** reading and [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md)—not a slimmed-down “starter page.”
