# 9 — Memory, Context & Scope Map

*Where does corporate, group, and project knowledge live — and what may agents load vs what stays human-only? Companion to [MONOREPO-OPERATING-MODEL.md](../../docs/MONOREPO-OPERATING-MODEL.md#memory-context-and-ai-engagement).*

**Why this matters:** without a map, everything lands in chat or personal tool memories. Agents get inconsistent context; teams re-decide the same things; "corporate memory" is whatever someone remembers from last Tuesday.

## Memory vs context (your words)

| | Memory (filing cabinet) | Context (the desk) |
|---|-------------------------|---------------------|
| **Corporate** | | |
| **Group** | | |
| **Project** | | |

## Folder map (adapt, commit to `docs/ai-program/` or repo root README)

| Scope | Memory paths | Context paths (what agents load) |
|-------|--------------|----------------------------------|
| **Corporate** | `docs/ai-program/`, `decisions/`, canonical `ai/` | `AGENTS.md` + generated harness projection |
| **Group** | `docs/groups/<name>/`, `…/decisions/` | `docs/groups/<name>/README.md`, group rules |
| **Project** | `docs/projects/<name>/` (portfolio), `docs/artifacts/` (active build) | `@docs/projects/<name>/`; intention + plan; `apps/<name>/`; scoped rules |

## What never goes in the repo (personal / forbidden)

| Never commit | Where it wrongly ends up instead |
|--------------|----------------------------------|
| Secrets, credentials, customer PII | `.env`, personal Memories |
| | |
| | |

## AI engagement defaults (link to other kit pieces)

**Organizational** — kit [10](10-leadership-and-org-engagement.md): leadership north star, program owner, dev-group maintainers, adoption ladder, planning/building rituals.

**Per session (agent)** — kits 03, 04, 05:

| Moment | Rule | Kit piece |
|--------|------|-----------|
| Start a session | Load passport + **`@docs/projects/<app>/`** or active intention | 02, 03 |
| Agent proposes a change | Inside decision boundaries | 05 |
| Before merge | Quality gates green | 04 |
| Brownfield / prod-adjacent | Day-2 safety card | 07 |
| New tool hype | ADAPT before team-wide switch | 08 |

## Owners

| Scope | Who maintains memory | Who maintains context |
|-------|----------------------|------------------------|
| Corporate | | |
| Group | | |
| Project | | |
