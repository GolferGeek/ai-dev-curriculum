# Intention — Ops pulse dashboard (Track D)

## Why this exists

“Is it up?” and “what broke last?” shouldn’t require SSH and five tabs. A **single dashboard** that shows **check results** and a **short incident log** gives teams **at-a-glance confidence** and a **paper trail** for what was noticed and when.

## Who it’s for

People who operate services or internal platforms and want **visibility** without standing up a full observability vendor in the first iteration.

## What “good” looks like

- **Configurable checks**: e.g. HTTP health endpoints, script exit codes, or “file freshness”—your PRD picks **two or three** check types for v1, not every integration under the sun.
- **Status tiles** (green / yellow / red or similar) with **last run time** and **clear failure text**.
- **Incident or event log**: timestamp, what failed, optional note—so postmortems have a starting point.
- Optional: **on-call or owner** as **static config** (names in a file) for the demo—no paging provider required.

## Out of scope for the first version

- Real PagerDuty/Opsgenie wiring; **document** how you’d plug that in later. **No** live payments or cloud wallet setup in class.

## Success

During the demo someone can **point at the board** and say “we’d know before customers do”—and the **failure path** is as clear as the happy path.
