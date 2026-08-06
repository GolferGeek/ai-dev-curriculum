# Guardrails — instruction & harness map

*Where skills, agents, and team instructions live — and what belongs in git vs on a laptop.*

| Sheet | Topic |
|-------|--------|
| G1 | [Nightly hygiene](../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md) · [GitHub handbook](../github/README.md) |
| **G2** | **[Harness instruction layers](02-harness-instruction-layers.md)** — Claude Code, Cursor, Codex |

Worksheets live under [`marketing/adoption-kit/guardrails/`](../../marketing/adoption-kit/guardrails/README.md). Copy filled policy into `docs/ai-program/05-controls-and-assurance/02-enforcement-surfaces-and-guardrails/`.

**Operating model:** [Memory vs context](../MONOREPO-OPERATING-MODEL.md#memory-context-and-ai-engagement) · [Checklist 02](../checklists/02-github-actions-and-skills.md)

---

## Folder layout (this repo)

```text
docs/guardrails/          ← harness + guardrail handbooks (you are here)
docs/github/              ← Pages, hardening, Actions (CI common denominator)
docs/ai-program/05-controls-and-assurance/02-enforcement-surfaces-and-guardrails/   ← your filled-in policy copies
ai/                           ← canonical skills + agents by function
.claude/ + .cursor/ + .agents/ + .codex/   ← generated harness projections
AGENTS.md                     ← cross-harness context passport in git
```

**We do not split `docs/guardrails/` into `cursor/`, `codex/`, and `claude/` folders yet.** One sheet (**G2**) with three sections stays easier to refresh and teaches the **passport pattern** first. If a tool section outgrows ~150 lines, split later (e.g. `02b-cursor.md`) — not before.

---

## Quick rule

| If it must be true for everyone Monday | If it's personal preference |
|----------------------------------------|----------------------------|
| Git: `AGENTS.md`, `docs/ai-program/`, canonical `ai/`, generated projections | Tool **Memories**, `*.local.md`, `~/.claude/`, User Rules |

**GitHub Actions** (scheduled hygiene) reads **committed** `.claude/skills/` — not Cursor User Rules or Codex Memories.
