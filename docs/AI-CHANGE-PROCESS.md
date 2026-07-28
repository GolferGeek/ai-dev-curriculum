# Handling change in an ever-changing AI world

*The tools on screen this month will differ next quarter. The discipline here is how **soledevelopreneurs** and small teams **absorb** change without spending all their time on process change instead of product development.*

This is **one workflow** in the [monorepo operating model](./MONOREPO-OPERATING-MODEL.md) — documents + skills for **deciding** what to adopt, not the whole system. It pairs with adoption kit [08-terrain-review](../marketing/adoption-kit/08-terrain-review.md) and **`/terrain-review`** in `.claude/skills/`.

---

## The problem

Scouts (you, vendors, Twitter, conferences) surface **many** exciting things. Teams that pivot on every signal burn attention, abandon half-finished migrations, and never ship. Teams that freeze ignore real improvements until they're years behind.

You need a **repeatable filter**: discover → price → try → keep or defer — with decisions in **git**, not in chat memory.

---

## ADAPT — the change filter

Run ADAPT on every candidate worth more than a passing glance (new harness, model, MCP server, agent pattern, skill format, pricing tier).

| Step | Question | Output |
|------|----------|--------|
| **A — Assess** | What is it? What problem does it solve *for us*? Is this scout signal strong or noise? | One paragraph + link |
| **D — Price** | What does adoption cost? Migration, retraining, abandoned in-flight work, policy updates? Is this the **fourth cool thing this week**? | Cost estimate (hours/days), risks |
| **P — Pilot** | Can we time-box a trial with clear success criteria on a **branch or sandbox**? | Pilot plan + exit criteria |
| **I — Integrate** | Did the pilot pass? Update passport, harness policy, skills, eval roster — via **PR**, not silent edits. | Merged decision record |
| **T — Track** | Not now — but worth watching. When do we look again? | Dated entry on watchlist |

**Verdicts:** `integrate` · `track` · `reject`

Only **Integrate** changes what the team runs by default. **Track** goes on the watchlist with a review date. **Reject** gets a one-line reason so you don't re-debate it next month.

---

## Where it lives in your monorepo

Commit team AI policy next to your code — same review discipline as application changes.

```
docs/ai-program/                    # adoption kit + operating model
  01-harness-and-plan.md            # … through 09-memory-context-map.md
  watchlist.md                      # candidates in Track (dated review)
  decisions/                        # one file per Integrate or Reject
  README.md                         # scope map index
docs/corporate/                     # optional — glossary, compliance
docs/groups/<name>/                 # group / client memory + context
docs/projects/<name>/               # optional — per-initiative artifacts
docs/artifacts/                     # agent-generated reports (optional archive)
.claude/
  skills/                           # instruction passport grows here (Phase 05)
  agents/
    terrain-scout.md                # runs structured terrain reviews
```

After Part A (monorepo shell), create `docs/ai-program/` even if templates are still rough. **Empty policy folders are fine; missing folders mean "we never decided."**

---

## Rituals (how often)

| Ritual | When | Who | What |
|--------|------|-----|------|
| **Terrain review** | Monthly (solo) or quarterly (team) | Named owner from [08-terrain-review](../marketing/adoption-kit/08-terrain-review.md) | Run `/terrain-review`; refresh watchlist; re-check harness + model policy (pieces 1 & 6) |
| **ADAPT on signal** | When something new is worth >30 min of attention | Whoever spotted it | Fill ADAPT in a branch; PR to `decisions/` or `watchlist.md` |
| **Cohort / dry-run audit** | Before teaching or a major release | Instructor / maintainer | Staleness pass on docs, model IDs, prerequisites (see `docs/artifacts/staleness-audit-*.md`) |

**Rule of thumb:** vendor details (model names, plan tiers, CLI flags) rotate **monthly**; pipeline and ADAPT rotate **yearly** if at all.

---

## The workflow: `/terrain-review`

One **skill + agent** in your monorepo operating model — same pattern as `/intention` or `/scan-errors`, applied to toolchain change:

```
/terrain-review                    # full review → docs/artifacts/terrain-review-report.md
/terrain-review assess "MCP X"     # ADAPT worksheet for one candidate
/terrain-review watchlist          # refresh dates + stale entries only
```

The **terrain-scout** agent:

1. Reads `docs/ai-program/` (watchlist, decisions, harness policy).
2. Scans `.claude/`, root config, and phase README "last verified" stamps for drift.
3. Produces a structured report: drift findings, watchlist hygiene, recommended ADAPT items.
4. **Does not** auto-change harness, skills, or dependencies — humans merge decisions.

This is the same scout discipline you learned in Phase 00, **codified** so you're not reinventing the process every time something new drops.

---

## Connection to the course

| Course idea | Change process |
|-------------|----------------|
| Scout finds; you temper | ADAPT **Price** + **Track** |
| Pipeline outlasts tools | Integrate updates passport/skills, not "throw away intention → PRD" |
| Verify the software | Pilot exit criteria must include **running** checks, not demo hype |
| Adoption kit in git | `docs/ai-program/` + `decisions/` |
| Two years find → keep → teach | This doc + `/terrain-review` is the **keep → teach** packaging |

---

## Starter watchlist entry

```markdown
## [Tool or pattern name]
- **Spotted:** YYYY-MM-DD (source: …)
- **Problem it might solve:** …
- **Review on:** YYYY-MM-DD
- **Owner:** @name
- **Notes:** …
```

When review date hits, run ADAPT and move the entry to `decisions/` or delete with reason.

---

## See also

- [Monorepo operating model](./MONOREPO-OPERATING-MODEL.md) — skills + documents for every job, not just scouting
- [Adoption kit](../marketing/adoption-kit/README.md) — eight fill-in policy templates
- [Phase 00 talking points — scout & tempering](./phases/00/TALKING-POINTS.md)
- [Week close — staying current](../marketing/lesson-plans/week-close.md)
