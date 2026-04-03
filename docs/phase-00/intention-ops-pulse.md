# Intention — Ops pulse dashboard (Track D)

## Why this exists

“Is it up?” and “what broke last?” shouldn’t require SSH and five tabs. A **single dashboard** that shows **check results** and a **short incident log** gives teams **at-a-glance confidence** and a **paper trail** for what was noticed and when.

This track should read as **ops tooling**: tiles that update, logs you can append, failure text you can trust—not two colored boxes and a tagline.

## Who it’s for

People who operate services or internal platforms who want **visibility** without standing up a full observability vendor in the first iteration.

## Demo-grade minimums (non-negotiable for “done”)

Ship **monitoring-shaped** UI: checks, time, and log—not a status poster.

1. **Checks** — **At least 4 configured checks** (mix of outcomes: OK / warn / fail). Each row or tile shows **name, status, last run time**, and **short detail** (HTTP code, error text, or “script output”).
2. **Run / refresh** — User can trigger **“Run checks”** or **refresh** and see **updated timestamps** (use **`fetch`** to public endpoints, **mocked timers**, or deterministic stubs—document what’s real vs simulated).
3. **Incident log** — **Append-only list** of events: timestamp, severity or source, message; user can **add a manual entry** (e.g. “Investigating DB latency”).
4. **Persistence** — Log and check config survive refresh (**`localStorage`** or equivalent) where applicable; pure simulated checks should still **persist manual log entries**.
5. **Failure UX** — At least one check demonstrates **clear failure text** (not only red color)—same prominence as success.

## What “great” adds (when time allows)

- Grouping checks by service or region.
- Snooze / acknowledge (client-only flag).
- Static “owner” or on-call name from config file for the demo.

## Out of scope for the first version

- Real PagerDuty/Opsgenie wiring; **document** how you’d plug that in later. **No** live payments or cloud wallet setup in class.

## Success

During the demo someone can **run checks, see a failure explained, and add an incident note** that **survives reload**—the story is **operational**, not decorative.

## How this feeds PRD → plan → app

This file is the **product intention** before **`/prd`**. The PRD should list **≥4 checks** with expected outcomes (OK/warn/fail) and **incident log** fields. The plan should define **run checks** behavior (real `fetch` vs. stub—document which), **how last-run times update**, **log persistence**, and **one failing check** with visible **error text** (not color-only). Tie work to [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md); avoid two decorative tiles and a headline.
