# Checklist 00 — High-level roadmap

*One page: what you adopt, in what order, before and during the course.*

Use this with leadership and the dev group. Detail lives in linked checklists and phase guides — **00** is the map, not the manual.

---

## The arc

```text
Pre-class          → 01 Monorepo on GitHub  → 02 Actions + skills
       ↓                      ↓                         ↓
Phase 00 (pipeline)    docs/ai-program/          Guardrails + Pages URL
       ↓
Phase 01+ (build)      apps/ + docs/projects/    Portfolio grows — SaaS killers + their ideas
```

---

## Before the first session

| Step | Checklist / doc | Done |
|------|-----------------|------|
| Machine, git, Node, one AI agent | [Pre-class setup](../pre-class-setup.md) | ☐ |
| Understand documents vs skills | [Monorepo operating model](../MONOREPO-OPERATING-MODEL.md) | ☐ |

---

## Week one — platform (your repo, not ours)

| Step | Checklist / doc | Done |
|------|-----------------|------|
| **1** | [01 — Your monorepo on GitHub](01-your-monorepo-on-github.md) — curriculum on `main` in **your** GitHub org | ☐ |
| **2** | [02 — GitHub Actions and skills](02-github-actions-and-skills.md) — CI green, skills committed, Pages optional | ☐ |
| **3** | Skim adoption kit [01 Harness](../../marketing/adoption-kit/01-harness-and-plan.md) + [02 Passport](../../marketing/adoption-kit/02-instruction-passport.md) + [G2 Harness map](../guardrails/02-harness-instruction-layers.md) | ☐ |

**Why this order:** agents and Actions need a **team-owned** repo. Cloning locally for class is not the same as putting the monorepo where your company policy and secrets live.

---

## During the course (by phase)

| Phase | Focus | Start here |
|-------|-------|------------|
| **00** | Intention → PRD → plan → build; Turborepo shell | [phases/00/README.md](../phases/00/README.md) |
| **01** | SaaS killer (auth, DB, tests) | [phases/01/README.md](../phases/01/README.md) |
| **02** | Scan, monitor, harden, `/commit pr`; guardrails | [phases/02/README.md](../phases/02/README.md) + [GitHub handbook](../github/README.md) |
| **03–06** | Research, protocols, skills browser, eval lab | [phases/README.md](../phases/README.md) |

After Phase 00 merge to your `main`, the repo is **yours** — phases live under `docs/phases/`, not separate long-lived forks per phase.

---

## After the course (operating model)

| Step | Doc | Done |
|------|-----|------|
| Fill adoption kit (10 templates + guardrails G1) | [adoption kit](../../marketing/adoption-kit/README.md) → commit under `docs/ai-program/` | ☐ |
| Memory / context map and owners | [09 — Memory context map](../../marketing/adoption-kit/09-memory-context-map.md) | ☐ |
| Leadership + org engagement | [10 — Leadership](../../marketing/adoption-kit/10-leadership-and-org-engagement.md) | ☐ |
| Nightly hygiene (Tier 1 → Tier 2) | [Guardrails G1](../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md) | ☐ |

---

## Success criteria (high level)

You are on track when:

- [ ] **One repo** is the team source of truth (your GitHub, not only a laptop clone)
- [ ] **`docs/ai-program/`** has started kit copies with named owners
- [ ] **`.claude/skills/`** is committed; `/intention` → `/run-plan` works in your harness
- [ ] **CI** runs on PRs (`verify` + build/test)
- [ ] **Optional but recommended:** GitHub Pages publishes `docs/` for the team handbook URL
- [ ] **Phase 02+:** Tier 1 nightly cron green before Tier 2 agent PRs
- [ ] **When outgrowing Turbo:** terrain review → optional [03 — Turbo → Nx](03-turbo-to-nx.md) (not a Phase 00 requirement)
- [ ] **When shipping to cloud:** [04 — Deploy apps (Docker + cloud)](04-deploy-apps-docker-cloud.md) — one workflow per app; branches → environments

---

## What comes next in this folder

| Planned # | Topic |
|-----------|--------|
| 04 | **Deploy apps (Docker + cloud)** — [04-deploy-apps-docker-cloud.md](04-deploy-apps-docker-cloud.md) |
| 05 | Adoption kit week-close (all ten templates) |
| 06 | First app to demo-grade (Phase 01 bar) |

Suggest the next checklist when your cohort hits a repeatable pain point — keep each list **one outcome**.

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| Dev lead — repo + Actions | | |
| Program owner — ai-program docs | | |
| Leadership sponsor | | |
