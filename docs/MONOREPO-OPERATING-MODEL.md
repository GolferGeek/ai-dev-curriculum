# Monorepo operating model — skills + documents

*For **soledevelopreneurs** and small teams: the monorepo is not only where **apps** live. It is where **how you work** lives — decisions, policy, and repeatable agent workflows in **git**, reviewable like code.*

Scouting new AI tools is **one job** this model supports. So are defining product, building, verifying, shipping, researching a brownfield repo, and deciding what to adopt next. Same pattern every time: **documents hold truth; skills run workflows on that truth.**

---

## The two layers

| Layer | What it is | Where it lives | Human role |
|-------|------------|----------------|------------|
| **Documents** | Intentions, policy, decisions, reports — *what we believe and what we decided* | `docs/ai-program/`, `docs/artifacts/`, track intentions | Author, review, merge via PR |
| **Skills & agents** | Repeatable workflows — *how the agent helps* | Canonical `ai/`; generated Claude Code, Cursor, and Codex projections | Invoke, refine with `author-agent` when a pattern repeats |

**Chat is not the system of record.** A decision in Slack is decoration. A decision in `docs/ai-program/decisions/` with an owner is real.

---

## Folder map (starter layout)

```
apps/                          # products you ship
packages/                      # shared libraries
docs/
  ai-program/                  # corporate memory & policy (adoption kit + README)
    01-harness-and-plan.md … 09-memory-context-map.md
    watchlist.md               # deferred candidates (ADAPT Track)
    decisions/                 # corporate / program decisions (ADRs)
  corporate/                   # optional — glossary, compliance, long-form domain
  groups/<name>/               # group / squad / client memory + context
  projects/<name>/             # portfolio context per app (README, pitch, status)
    _template/                 # copy when starting a new app
  artifacts/                   # active build artifacts; promote to projects/ when stable
ai/
  skills/<function>/           # canonical reusable workflows
  agents/<function>/           # canonical specialized executors
.claude/                       # generated Claude Code projection
.cursor/                       # generated Cursor projection
.agents/ + .codex/             # generated Codex projections
AGENTS.md                      # corporate context passport (loaded every session)
.cursor/rules/                 # scoped context by path
turbo.json                     # build/test/lint orchestration
```

After Part A, **`docs/ai-program/`** and **`ai/`** are as important as
**`apps/`**. Keep generated harness projections in git so each supported tool
loads the same reviewed capability library.

---

## The portfolio monorepo (why teams keep building)

A monorepo lowers the cost of **the second app**, and the third. Teams that start here often discover they can ship more than they expected: **SaaS killers**, internal tools, and products they've wanted for years. One repository holds the whole **portfolio** — not scattered repos and forgotten prototypes.

| Scope | Path | Role |
|-------|------|------|
| **Corporate** | `docs/ai-program/`, `AGENTS.md` | How the company works with agents |
| **Group** | `docs/groups/<name>/` | Client or product-line overlay |
| **Project / portfolio entry** | `apps/<name>/` + **`docs/projects/<name>/`** | Runnable app + **portfolio context** (pitch, audience, status, links to intention) |
| **Active build** | `docs/artifacts/` | Intention → PRD → plan while in flight; promote to `docs/projects/` when stable |

**Put everything here.** Shared packages in `packages/`; each new idea gets `apps/<name>` and a matching **`docs/projects/<name>/`** folder — the project's context files in git, reviewable like code. That folder is how agents and new teammates understand *this* product without re-explaining every session.

Full guide: [docs/projects/README.md](./projects/README.md).

---

## Jobs the operating model covers

Each row is something a soledevelopreneur actually does. Documents say *what*; skills say *how the agent participates*.

| Job | Documents (truth) | Skills / agents (workflow) |
|-----|-------------------|----------------------------|
| **Decide policy** | Adoption kit 1, 5, 6; `decisions/` | `/terrain-review assess "…"` → ADAPT worksheet |
| **Define work** | `intention.md` → PRD → plan in `docs/artifacts/` | `/intention`, `/prd`, `/plan` |
| **Build** | Plan milestones | `/run-plan` → track builders |
| **Verify** | Demo-grade bar, quality gates (kit 4) | `npm run build`, `/scan-errors`, `/test-browser` |
| **Ship** | PR requirements | `/commit`, `/monitor`, `/harden`, `/pr-eval` |
| **Understand brownfield** | Ingest / map / security reports | `/ingest`, `/map`, `/security-scan`, `/git-story` |
| **Improve** | Improve report | `/improve`, `/deep-dive` |
| **Adapt to change** | Watchlist, terrain review (kit 8) | `/terrain-review` → **terrain-scout** |
| **Codify what worked** | New skill or agent file | `/author-agent` |

Scouting is the **`/terrain-review`** row — not the whole model.

---

## Memory, context, and AI engagement

The monorepo is how a **practice** compounds — not only shipping apps, but encoding **who you are**, **how you decide**, and **how agents participate**. Three scopes; two kinds of knowledge at each scope.

### Memory vs context

| | **Memory** | **Context** |
|---|------------|-------------|
| **Purpose** | Durable record — decisions, history, artifacts | Working set — what the harness can *see* this session |
| **Question it answers** | "What did we decide? What happened?" | "What does the agent need right now to do this job well?" |
| **Review** | PR merge, named owner, dated decisions | Assembled from memory + code + `@` files + loaded skills |
| **Wrong place for team truth** | Slack, email, personal tool **Memories** | Vibes, "you remember last time" |

**Corporate memory** without **corporate context** in `AGENTS.md` means new sessions start cold. **Context** without **memory** means you re-debate the same choices every month.

### Three scopes

| Scope | **Memory** (keep) | **Context** (load) | Typical paths |
|-------|-------------------|--------------------|---------------|
| **Corporate** | Company-wide policy, vendor terms, compliance, program decisions, ADRs | Stack conventions, boundaries, domain basics, shared capabilities | `docs/ai-program/`, `decisions/`, `AGENTS.md`, canonical `ai/` |
| **Group** | Squad, product-line, or client-specific decisions and conventions | Group README, scoped rules when working in that area | `docs/groups/<name>/`, optional group skills |
| **Project** | Intentions, PRDs, plans, scan reports, feature decisions | Active intention + plan, app README, path-scoped rules | `docs/artifacts/` or **`docs/projects/<name>/`** (portfolio), `apps/<app>/` |

**Soledevelopreneur:** corporate = your business; group = a client or product line; project = one app or delivery.

**Curriculum default:** Phase artifacts live in `docs/artifacts/` — that is **project memory** for the active build. Promotion rule: when something becomes standing policy, move it **up** to `docs/ai-program/` or `docs/groups/`.

### Corporate memory & context

**Memory — what the organization must not forget**

- Adoption kit templates ([01–09](../marketing/adoption-kit/README.md)) once filled
- `decisions/` — ADAPT outcomes, architecture choices, vendor selections
- `watchlist.md` — deferred toolchain candidates
- Optional `docs/corporate/` — glossary, compliance packs, long-form "why we exist"

**Context — what every agent session should inherit**

- **`AGENTS.md`** — instruction passport ([kit 02](../marketing/adoption-kit/02-instruction-passport.md))
- **`ai/`** — canonical shared skills and specialized agents, organized by
  function (Phases 05 and 05.5 deepen this)
- **Harness policy** — approved tools and data terms ([kit 01](../marketing/adoption-kit/01-harness-and-plan.md))

Corporate context is **stable-ish**; refresh on ADAPT Integrate or quarterly terrain review — not on every hype cycle.

### Group memory & context

For teams with more than one concern — platform vs product, or multiple clients:

- **Group memory:** `docs/groups/<name>/decisions/`, retros, "how we work with this client"
- **Group context:** `docs/groups/<name>/README.md` — load with `@` when working that area; optional `.cursor/rules` glob for `apps/client-a/**`

Groups **inherit** corporate passport; they **override** only where documented.

### Project memory & context

**Portfolio entry — one app in the catalog**

Each product in the monorepo should have a **portfolio folder**: `docs/projects/<name>/` alongside `apps/<name>/`. That is the project's **context file set in git** — pitch, audience, status, how to run, links to intention/PRD. Agents load it with `@docs/projects/<name>/`. See [projects/README.md](./projects/README.md).

**Memory — the artifact chain and evidence**

- Intention → PRD → plan ([kit 03](../marketing/adoption-kit/03-artifact-pipeline.md))
- Generated reports: ingest, map, security, errors, terrain review → `docs/artifacts/`
- Demo-grade bar, acceptance notes, "what we shipped / what we deferred"

**Context — what steers *this* build**

- The **active** intention and plan files
- Relevant app code and tests
- Scoped rules for the paths being touched

When the project ends, **promote** durable lessons to group or corporate memory; **archive** or delete stale artifacts so agents do not load wrong-era context.

### Organizational AI engagement — people, leadership, and practice

**Organizational engagement** is broader than "what may the agent do on this ticket." It is how a **small or mid-sized company** builds a sustained practice: leadership publishes **guardrails and pace**, the **development group** maintains **source of truth** in the repo, and everyone knows how **planning, building, and operating** with agents is supposed to work.

| Who | Responsibility | Where it lives |
|-----|----------------|----------------|
| **Leadership** | North star, budget, approved tools, adoption **pace** (tempering org-wide), executive sponsorship | Kit [10](../marketing/adoption-kit/10-leadership-and-org-engagement.md), kits 01 & 06, `decisions/` |
| **AI program owner** | Keeps `docs/ai-program/` current; rituals on calendar; blockers escalated | Kit 10; `docs/ai-program/README.md` |
| **Capability steward** | Reviews canonical `ai/`; `author-agent` discipline; generation and recertification | Kit 02, `ai/README.md` |
| **Every developer** | Pipeline on real work; challenge pass; verify before merge | Kits 03–05, 04 |
| **Coaches / reviewers** | Intention and PR review; skeptics onboarded to first safe task | Kit 03, 10 |

**Personnel engagement ladder:** aware → experimenting (sandbox) → **pipeline on real work** → verify habit → passport/skill contributor → coach. Skipping rungs produces shadow AI and re-debated policy.

**Planning engagement:** intentions are welcome from non-engineers; **review before build** is mandatory; leadership shows up to judge *fit*, not to prompt.

**Building engagement:** predict → build → reflect; plans name owners; merge only through gates with a **named accountable human**.

**Development group source of truth** — what must stay aligned in git so every harness loads the same story:

- `AGENTS.md` + kits 01–10
- Shared skills (intention → ship + terrain review + your custom rituals)
- Artifact paths and quality gate commands
- Group overlays under `docs/groups/` when teams diverge

Leadership **does not** maintain slide-deck truth that diverges from the repo. If it matters, it merges to `docs/ai-program/`.

Fill in: [kit 10 — Leadership & organizational engagement](../marketing/adoption-kit/10-leadership-and-org-engagement.md).

### Agent engagement — one session, one task

*Tactical* — how humans and agents interact **during work** (distinct from org engagement above):

| Phase of engagement | What happens | Document / skill |
|--------------------|--------------|------------------|
| **Authorize** | Approved harness, plan tier, data terms | Kit 01; corporate memory |
| **Scope** | Written intention; explicit non-goals | Kit 03; `/intention` |
| **Bound** | Agent may / must ask / human only | Kit 05 |
| **Execute** | Skills and agents on loaded context | Generated harness projection; project files |
| **Challenge** | Human reads output against intent | Pipeline habit; `/prd-alignment` |
| **Verify** | Running software, not transcript | Kit 04; `/scan-errors`, tests |
| **Ship** | Merge with gates; accountable human | `/commit`, `/pr-eval` |
| **Brownfield** | Read-first, smallest blast radius | Kit 07 |
| **Adapt** | New tools through ADAPT, not hype | Kit 08; `/terrain-review` |
| **Codify** | Repeatable pattern → new skill | `/author-agent` |

**Agent session principles (teach these):**

1. **No build without intention** — even ten lines in project memory.
2. **Context is assembled on purpose** — passport + project artifacts + code; bad output is usually bad context.
3. **Autonomy is a ladder** — kit 05 columns migrate left only deliberately, after verification proves trust.
4. **Verify beats vibe** — engagement succeeds when the app runs and tests pass, not when the model sounded confident.
5. **Personal Memories ≠ team memory** — never store secrets or policy only in tool auto-memory.

Fill your scope map: [kit 09](../marketing/adoption-kit/09-memory-context-map.md). Org engagement: [kit 10](../marketing/adoption-kit/10-leadership-and-org-engagement.md). Index: [`docs/ai-program/README.md`](./ai-program/README.md).

---

## How decisions work

1. **Spot** a question (new harness, spend limit, agent boundary, architecture rule).
2. **Write** it down — ADAPT worksheet, decision file, or adoption-kit template section.
3. **Review** like code — PR, named owner, challenge pass ("does this match what we meant?").
4. **Integrate** — merge updates to `docs/ai-program/` and, if needed, canonical
   `ai/`; regenerate all supported harness projections.
5. **Run** the matching skill next time — don't re-debate from memory.

**Tempering rule:** scout signal → ADAPT **Price** → Integrate, Track, or Reject. See [AI-CHANGE-PROCESS.md](./AI-CHANGE-PROCESS.md).

---

## Growing the system

You will not ship with every skill on day one. The course gives you a **seed set**; you extend it:

- Something repeats three times → **`/author-agent`** → new skill or agent.
- A policy stabilizes → move from chat into **`docs/ai-program/`**.
- A report type becomes ritual → standardize output path under **`docs/artifacts/`**.

The monorepo **compounds**: documents get richer, skills get sharper, apps share more `packages/`. That compounding is the product — not a frozen checklist from a vendor.

---

## Mixed-tool teams (Cursor + Claude Code + Codex)

Documents and canonical capabilities are harness-agnostic.
**`AGENTS.md`** is the shared passport. `CLAUDE.md` and Cursor rules add only
harness-specific loading guidance. `npm run ai:generate` publishes reviewed
interpretations to `.claude/skills/` and `.claude/agents/`,
`.cursor/skills/` and `.cursor/agents/`, and `.agents/skills/` plus
`.codex/agents/`. Never hand-maintain a projection.

---

## What the course hands you

| Deliverable | Role in the operating model |
|-------------|----------------------------|
| Turbo shell (`apps/`, `packages/`) | Where products and shared code live |
| Pipeline skills | Define → build workflow |
| Quality / research skills | Verify and understand |
| [Adoption kit](../marketing/adoption-kit/README.md) (10 templates) | Policy, scope map, **leadership & org engagement** |
| [`docs/ai-program/README.md`](./ai-program/README.md) | Index for corporate / group / project document homes |
| [`/terrain-review`](./AI-CHANGE-PROCESS.md) | Starter **decision** workflow for change |
| This doc | The map of how it fits together |

---

## See also

- [AI-CHANGE-PROCESS.md](./AI-CHANGE-PROCESS.md) — ADAPT, watchlist, terrain review (one workflow)
- [Adoption kit](../marketing/adoption-kit/README.md) — fill-in policy templates
- [Phase 00 STARTER-KIT](./phases/00/STARTER-KIT.md) — canonical library and harness projections
- [Instruction passport](../marketing/adoption-kit/02-instruction-passport.md) — `AGENTS.md` pattern
- [Leadership & org engagement](../marketing/adoption-kit/10-leadership-and-org-engagement.md) — personnel adoption, dev-group source of truth
