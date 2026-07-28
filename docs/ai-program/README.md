# AI program — document home

*Starter index for the **document half** of your [monorepo operating model](../MONOREPO-OPERATING-MODEL.md). Adapt this tree in the repository that will own your AI program; fill templates from the [adoption kit](../../marketing/adoption-kit/README.md). Review changes like code — PRs, not silent edits.*

## Choose its home

There is no single required adoption shape:

1. **Current product repository:** add `docs/ai-program/` when one team or platform repository can own the company practice.
2. **New Nx monorepo:** use it as the corporate policy home as applications and libraries move into the shared platform.
3. **Standalone AI program repository:** use this when policy spans many repositories or product code cannot be changed during the course. Document how approved instructions and skills are versioned and distributed downstream.

Do not copy the curriculum unchanged. Remove phase-specific teaching material, replace examples with the company's real commands and paths, name owners, and retain only policies and skills the team intends to operate.

The document set is ready only when a new developer can answer: which tools are approved, what data may be shared, what an agent may change, which checks must pass, how model cost is governed, where decisions live, and who owns the program.

---

## Memory vs context (quick distinction)

| | **Memory** | **Context** |
|---|------------|-------------|
| **What** | Durable record — what we decided, built, learned | What the harness loads *this session* to do work |
| **Analogy** | Company filing cabinet | The advisor's desk |
| **Lives in** | Git markdown, decisions, artifacts | Assembled from memory + code + open files + skills |

**Team truth is memory you wrote on purpose.** Tool auto-memories are personal — never the corporate system of record.

---

## Scope map — where each layer lives

```
docs/
  ai-program/                 ← you are here — corporate memory & policy
    README.md
    01-harness-and-plan.md … 10-leadership-and-org-engagement.md
    guardrails/               scheduled & automated guardrail patterns (see below)
    skills/                   skill scouting, trust, scope, publication, lifecycle
    decisions/                corporate & program decisions (ADRs)
    watchlist.md              deferred toolchain candidates
  corporate/                  optional — deep corporate context ( glossary, compliance )
  groups/                       group / squad / client overlays
    <group-name>/
      README.md               group context loaded when @ this folder
      decisions/
  projects/                   portfolio context — one folder per app (pitch, status, links)
    <project-name>/
      README.md               load with @ when working that app
    _template/                copy to start a new portfolio entry
  artifacts/                  active work + generated reports (promote to projects/ when stable)
AGENTS.md                     corporate **context** passport (every session)
apps/<app>/                   project code + optional app-level NOTES.md
.claude/skills/               workflows + background conventions
.cursor/rules/                scoped context by path
```

Soledevelopreneur mapping: **corporate** = your company; **group** = product line or client; **project** = one app or engagement.

---

## Templates in this folder

Copy from [`marketing/adoption-kit/`](../../marketing/adoption-kit/README.md):

| File | Scope | Covers |
|------|-------|--------|
| [01-harness-and-plan](../../marketing/adoption-kit/01-harness-and-plan.md) | Corporate | Approved tools, plan tiers, data terms |
| [02-instruction-passport](../../marketing/adoption-kit/02-instruction-passport.md) | Corporate context | `AGENTS.md` pattern |
| [03-artifact-pipeline](../../marketing/adoption-kit/03-artifact-pipeline.md) | Project | Intention → PRD → plan homes |
| [04-quality-gates](../../marketing/adoption-kit/04-quality-gates.md) | Corporate + project | What must pass before ship |
| [05-decision-boundaries](../../marketing/adoption-kit/05-decision-boundaries.md) | AI engagement | Agent may / must ask / human only |
| [06-routing-and-spend](../../marketing/adoption-kit/06-routing-and-spend.md) | Corporate | Models, budgets |
| [07-day2-safety](../../marketing/adoption-kit/07-day2-safety.md) | Project + engagement | Brownfield rules |
| [08-terrain-review](../../marketing/adoption-kit/08-terrain-review.md) | Corporate | ADAPT, watchlist, change ritual |
| [09-memory-context-map](../../marketing/adoption-kit/09-memory-context-map.md) | All scopes | Your folder map + owners |
| [10-leadership-and-org-engagement](../../marketing/adoption-kit/10-leadership-and-org-engagement.md) | Corporate + dev group | Personnel engagement, leadership guidance, source-of-truth roles |

**Guardrails sheets** (copy into [`guardrails/`](guardrails/README.md)):

| Sheet | Scope | Skill |
|-------|-------|-------|
| [G1 — Nightly hygiene (GitHub Actions + agents)](../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md) | Corporate + repo | `/nightly-hygiene` |

**GitHub platform handbook** (hardening, Pages, Actions — lives in repo with working YAML): [docs/github/README.md](../github/README.md)

**Skills program handbook:** [skills/README.md](skills/README.md) — corporate policy for scouting, evaluating, publishing, maintaining, and retiring agent skills.

---

## Two kinds of AI engagement

| | **Organizational** (kit 10) | **Agent / workflow** (kits 03–05, pipeline) |
|---|-----------------------------|---------------------------------------------|
| **Scope** | Company practice — leadership, dev group, adoption ladder | One task — what the agent may do now |
| **Documents** | North star, program owner, rituals, coaches | Intentions, boundaries, gates |
| **Skills** | Shared workflows everyone runs | `/intention` → `/commit`, `/terrain-review` |

Full write-up: [Organizational AI engagement](../MONOREPO-OPERATING-MODEL.md#organizational-ai-engagement--people-leadership-and-practice) in the operating model.

---

## Agent session engagement (tactical pointers)

- **Before:** written intention exists; harness is approved; context is `@` files not vibes ([03-artifact-pipeline](../../marketing/adoption-kit/03-artifact-pipeline.md))
- **During:** stay inside decision boundaries ([05-decision-boundaries](../../marketing/adoption-kit/05-decision-boundaries.md)); challenge pass at each artifact step
- **After:** verify running software; merge through quality gates ([04-quality-gates](../../marketing/adoption-kit/04-quality-gates.md)); never ship from chat transcript alone

Full framework: [Memory, context & AI engagement](../MONOREPO-OPERATING-MODEL.md#memory-context-and-ai-engagement) in the operating model.

---

## Owners (fill in)

| Scope | Memory owner | Context owner |
|-------|--------------|---------------|
| Corporate / ai-program | | |
| Group(s) | | |
| Project / artifacts | | |

Unowned folders become stale within a quarter.
