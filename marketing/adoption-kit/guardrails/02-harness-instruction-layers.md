# Guardrails G2 — Harness instruction layers

*Worksheet — full reference: [docs/guardrails/02-harness-instruction-layers.md](../../../docs/guardrails/02-harness-instruction-layers.md)*

**Question:** If it must be true for everyone Monday, where does it live for **each approved harness**?

## Approved harnesses (check all that apply)

☐ Claude Code · ☐ Cursor · ☐ Codex

## Corporate (company-wide)

| Harness | Team instructions live at | Corporate enforcement (IT/admin) | Owner |
|---------|---------------------------|----------------------------------|-------|
| Claude Code | `CLAUDE.md` / `.claude/` + `AGENTS.md` | Managed settings / MDM | |
| Cursor | `AGENTS.md`, `.cursor/rules/` | Team Rules (dashboard) | |
| Codex | `AGENTS.md` | `requirements.toml` / admin config | |

**Single passport (recommended):** root `AGENTS.md` is source of truth → thin `CLAUDE.md` + Cursor rules.

## Group / client overlay

| Group name | Memory (`docs/groups/…`) | Context (rules / nested AGENTS) |
|------------|--------------------------|----------------------------------|
| | | |

## Project (this monorepo)

| Item | Path in your repo |
|------|-------------------|
| Canonical skills and agents | `ai/skills/<function>/`, `ai/agents/<function>/` |
| Generated Claude Code projection | `.claude/skills/`, `.claude/agents/` |
| Generated Cursor projection | `.cursor/skills/`, `.cursor/agents/` |
| **Portfolio context (per app)** | **`docs/projects/<name>/`** — pitch, status, `@` load for agents |
| Generated Codex projection | `.agents/skills/`, `.codex/agents/` |
| Cursor scoped rules | `.cursor/rules/` |
| Active intention / PRD / plan (in flight) | `docs/artifacts/` → promote to `docs/projects/` when stable |

## Individual — never the system of record

| Harness | Personal only (do not put team policy here) |
|---------|-----------------------------------------------|
| Claude Code | `~/.claude/`, `CLAUDE.local.md`, Memories |
| Cursor | User Rules, Memories |
| Codex | `~/.codex/AGENTS.md`, Memories |

## Policy line

Team truth lives in **git** (`docs/ai-program/`, `AGENTS.md`, canonical `ai/`).
Generated projections are committed and verified so every supported harness reads
the same reviewed source.

**Owner:** ___________________ · **Review cadence:** ☐ quarterly with kit 08 terrain review
