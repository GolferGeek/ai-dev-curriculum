# Named skills — Phase 01 workflow

Phase 01 uses the same cross-harness pipeline spine as Phase 00, plus
`research` (optional) and `test-browser` (verification). The slash examples are
shorthand; invoke, select, or explicitly request the generated capability in
your supported interface.

```
/research "QuickBooks"          →  draft intention (optional — custom or explore)
/intention docs/phases/01/intention-<track>.md  →  docs/artifacts/intention.md
/prd docs/artifacts/intention.md               →  docs/artifacts/prd.md
/plan docs/artifacts/prd.md                    →  docs/artifacts/plan.md
/run-plan docs/artifacts/plan.md               →  SurrealDB layer + app in apps/
/test-browser                                  →  visual QA (web)
```

## Skill reference

| Slash skill | Input | Output | What it does |
|---------|-------|--------|-------------|
| **`/research`** | Product name or idea (e.g. `"Trello"`, `"our internal CRM"`) | Draft intention under `docs/artifacts/` or suggested path | Invokes **saas-researcher** — competitive scope, demo-grade sketch. Use before `/intention` for **custom** killers. |
| **`/intention`** | Provided killer intention (see below) or your draft | `docs/artifacts/intention.md` | Reviews intention with you — **auth chain and Demo-grade minimums** must stay explicit. |
| **`/prd`** | Refined intention | `docs/artifacts/prd.md` | Goals, non-goals, acceptance criteria — every Demo-grade minimum → testable requirement. |
| **`/plan`** | PRD | `docs/artifacts/plan.md` | Milestones with **agent owners**: `surrealdb-builder` first, then `nextjs-saas-builder` or `ios-builder`. |
| **`/run-plan`** | Plan | Code in `apps/`, `packages/` | Runs agents **in order** — data/auth before UI. |
| **`/test-browser`** | Running app URL (or discover from repo) | Visual QA report | Chrome session — layout, flows, obvious breakage. Web tracks. |

## Provided intentions (pick one)

| Track | File |
|-------|------|
| Web A — QuickBooks killer | [intention-quickbooks-killer.md](./intention-quickbooks-killer.md) |
| Web B — Trello killer | [intention-trello-killer.md](./intention-trello-killer.md) |
| iOS A — Twitter killer *(opt-in)* | [intention-twitter-killer.md](./intention-twitter-killer.md) |
| iOS B — Facebook killer *(opt-in)* | [intention-facebook-killer.md](./intention-facebook-killer.md) |

**Class default:** build **all tracks as Next.js + SurrealDB web apps** unless a learner explicitly opts into iOS on Mac.

## Typical order — QuickBooks killer (web)

```
/intention docs/phases/01/intention-quickbooks-killer.md
/prd docs/artifacts/intention.md
/plan docs/artifacts/prd.md
/run-plan docs/artifacts/plan.md
npm run build && npm run test
/test-browser
```

Substitute `intention-trello-killer.md`, etc. For a **custom** product:

```
/research "describe your SaaS target or internal tool"
/intention docs/artifacts/intention.md
…
```

## Challenge passes (same discipline as Phase 00)

Before proceeding at each step, read the artifact and ask *does this match what I meant?*

| Step | Check |
|------|--------|
| After `/prd` | Every **Demo-grade minimum** in the intention has a PRD goal with **testable** acceptance criteria — especially **auth** and **per-user data**. |
| After `/plan` | **surrealdb-builder** milestone exists **before** app builder; verification steps include **second-user isolation**. |
| Before `/run-plan` | Plan is clear enough that an agent won't "finish" at a fake login or localStorage. |

Skills flag drift; **you** own the judgment.

## Agents invoked by `/run-plan`

| Agent | Phase 01 role |
|-------|----------------|
| **saas-researcher** | Via `/research` only — scopes custom killers |
| **surrealdb-builder** | Schema, auth scopes, seed data, local SurrealDB wiring |
| **nextjs-saas-builder** | Next.js app — pages, auth flows, server actions, tests |
| **ios-builder** | SwiftUI + SwiftData *(opt-in Mac path only)* |

Background skills that apply automatically: **surrealdb**, **nextjs-saas**, **ios-swiftui**, **monorepo-turbo**, **prd-alignment**.

## Supported harnesses

Use the generated Claude Code, Cursor, or Codex projection and follow the same
artifact chain. Harness syntax may differ; outputs and verification do not. See
[STARTER-KIT.md](./STARTER-KIT.md).

## See also

- [RUN-ORDER.md](./RUN-ORDER.md) — step checklist including auth breach test  
- [VERIFY.md](./VERIFY.md) — prove demo-grade + isolation  
- [TEACHING.md](./TEACHING.md) — instructor pause points
