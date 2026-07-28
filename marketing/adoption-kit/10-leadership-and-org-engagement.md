# 10 — Leadership Guidance & Organizational AI Engagement

*How does a small or mid-sized company build **personnel engagement** with AI — not just "who may click what in the agent," but how leadership steers adoption and how the development group maintains a **source of truth** for planning, building, and verifying with agents? Companion to [MONOREPO-OPERATING-MODEL.md](../../docs/MONOREPO-OPERATING-MODEL.md#organizational-ai-engagement).*

**Why this matters:** tool installs fail when leadership treats AI as a personal productivity hack. Wins come when **leadership publishes guardrails**, **the dev group owns the repo of truth** (`docs/ai-program/` + canonical `ai/`), and **everyone** knows how planning and building with agents is supposed to feel — intention first, verify hard, humans accountable.

---

## Two kinds of "engagement" (don't conflate)

| | **Organizational engagement** (this template) | **Agent/workflow engagement** (kit 05, pipeline) |
|---|------------------------------------------------|-----------------------------------------------------|
| **Who** | Leadership, managers, whole dev group | Individual session with an agent |
| **Question** | How do we adopt AI as a company practice? | What may this agent do on this task right now? |
| **Lives in** | Kit 10, leadership decisions, rituals | Kit 05, `/intention` → `/commit`, quality gates |

---

## Leadership guidance (what executives and leads publish)

Fill this in **with leadership names** — even a short section beats an implicit "everyone figure it out."

### North star (3–5 sentences)

*Why are we doing this? What gets faster? What must **not** get sacrificed (security, quality, customer trust)?*

```




```

### Pace & tempering (scout discipline at org level)

| Question | Your answer |
|----------|-------------|
| Who may introduce a new harness or major workflow change? | |
| Default when someone brings "the fourth cool thing this week"? | ADAPT / pilot / wait |
| How long we finish a migration before starting the next one | |

### Guardrails leadership owns (link to other kit pieces)

| Topic | Document | Named approver |
|-------|----------|----------------|
| Approved tools & data terms | [01-harness-and-plan](01-harness-and-plan.md) | |
| Spend & model routing | [06-routing-and-spend](06-routing-and-spend.md) | |
| Agent autonomy boundaries | [05-decision-boundaries](05-decision-boundaries.md) | |
| Change adoption (ADAPT) | [08-terrain-review](08-terrain-review.md) | |

### What leadership communicates to the company

- [ ] AI-assisted work still has **named human owners** for merged code.
- [ ] We do **not** put company secrets in personal tool Memories or public chats.
- [ ] **Verify the running product** — demos and transcripts are not proof.
- [ ] Non-engineers may write or review **intentions**; engineers own **merge**.

---

## Development group — source of truth owners

The **dev group** (or platform team) maintains what everyone loads — not leadership's slide deck, **git**:

| Asset | Maintainer | Review cadence |
|-------|------------|----------------|
| `AGENTS.md` / instruction passport | | |
| `docs/ai-program/` (kits 01–10) | | |
| `ai/` (canonical skills and agents) + generated projections | | |
| Artifact pipeline convention | | |
| Quality gate commands | | |
| Group overlays `docs/groups/<name>/` | | |

**Program owner** (one name): accountable for the whole `docs/ai-program/` folder staying current.

**Skill steward** (one name): merges new/changed skills; runs `/author-agent` discipline.

---

## Personnel engagement — how people actually adopt

Engagement is a **ladder**, not a mandate. Track where your team is; don't skip rungs.

| Stage | What it looks like | How you support it |
|-------|-------------------|-------------------|
| **Aware** | Knows approved tool exists | Kit 01 published; lunch demo |
| **Experimenting** | Personal tasks, not team workflow | Sandbox repo; no prod |
| **Pipeline** | Uses intention → PRD → plan → build on real work | Kit 03; `/intention` ritual |
| **Verify habit** | Runs gates; challenge pass; browser/tests | Kit 04; Phase 02 culture |
| **Contributor** | Updates passport or adds a capability | `author-agent`; PR to canonical `ai/` |
| **Coach** | Reviews others' intentions/PRs | Named reviewer in kit 03 |

| Question | Your answer |
|----------|-------------|
| First safe backlog item every new adopter tries | |
| Who coaches skeptics (name, not "whoever") | |
| Where wins get shared (standup, wiki, retro) | |
| Shadow AI policy — personal accounts on company code? | |

---

## Engagement across the work — planning, building, operating

### Planning with AI (intention culture)

- **Who** may start an intention? (Recommended: anyone with a problem — PM, ops, dev.)
- **Who** must review before PRD/build? 
- **Where** intentions live: `docs/projects/` or `docs/artifacts/` ([03-artifact-pipeline](03-artifact-pipeline.md))
- **Leadership role:** show up for intention critique on strategic initiatives — not to prompt, to **judge fit**.

### Building with AI (execution culture)

- **Predict** before `/run-plan`; **reflect** after — not passive watching.
- **Plans** name owners (human or agent); nothing built outside the plan without a new intention.
- **Merge** only through quality gates; accountable human on every PR.

### Operating with AI (after ship)

- Brownfield rules: [07-day2-safety](07-day2-safety.md)
- Terrain review: [08-terrain-review](08-terrain-review.md)
- Promote project lessons → group/corporate memory ([09-memory-context-map](09-memory-context-map.md))

---

## Rituals (put on the calendar)

| Ritual | Cadence | Owner | Outcome |
|--------|---------|-------|---------|
| AI program standup (15 min) | Weekly | Program owner | Blockers, one win, one policy gap |
| Intention review (strategic) | Per initiative | Product + eng lead | Signed intention before build |
| Quality gate office hours | Biweekly | Skill steward | Help people run `/scan-errors`, gates |
| Terrain review | Monthly / quarterly | Kit 08 owner | `/terrain-review` report filed |
| Leadership readout | Quarterly | Executive sponsor | Guardrails still right? pace OK? |

---

## Skills that encode org engagement (seed set → yours)

Copy patterns from this curriculum; extend with `/author-agent`:

| Skill | Org engagement it supports |
|-------|---------------------------|
| `/intention`, `/prd`, `/plan` | Planning discipline |
| `/run-plan` | Building with agents |
| `/scan-errors`, `/commit`, `/pr-eval` | Verify & ship |
| `/terrain-review` | Org-level change tempering |
| `/author-agent` | Dev group codifies what worked |

Add your own when a ritual repeats — e.g. `/onboard-dev`, `/intention-review`, `/incident-with-agent`.

---

## Owner

| Role | Name |
|------|------|
| Executive sponsor (guardrails, pace, budget) | |
| AI program owner (`docs/ai-program/`) | |
| Capability steward (canonical `ai/` and projections) | |
| Security / data terms verifier | |
