# 2 — Instruction Passport

*Where does shared team knowledge for agents live, so every tool and every teammate gets the same truth? Taught in Phase 00 (talk D00-2) and deepened in Phase 05 (skills vs rules vs memories).*

**Why this matters:** there are two kinds of agent memory — **instructions you write** (shareable, reviewable, in git) and **auto-memories the tool writes** (personal, per-laptop). Team truth must live in the first kind.

## The passport pattern for mixed-tool teams

1. **`AGENTS.md`** at the repo root is the source of truth (Codex and Cursor read it natively).
2. **`CLAUDE.md`** contains one line — `@AGENTS.md` — so Claude Code reads the same file.
3. **`.cursor/rules/`** holds glob-scoped detail where Cursor needs per-folder rules.

## Starter `AGENTS.md` skeleton (copy, then fill)

```markdown
# [Company] — Agent Instructions

## Stack & conventions
- [languages, frameworks, package manager]
- [naming, folder layout, "we always / we never" lines]

## Build & verify
- Build: [command]   Test: [command]   Lint: [command]
- Never claim done until these pass.

## Boundaries
- Never read or write [paths — .env, secrets, customer data dirs].
- Ask a human before [deploys, migrations, deleting files, spending money].

## Domain notes
- [industry terms, compliance quirks, gotchas a new hire would need]
```

## Decisions

| Question | Your answer |
|----------|-------------|
| Passport location (repo + path) | |
| Which tools must read it (Claude Code / Cursor / Codex)? | |
| Reviewed like code (PRs required)? | Yes / No |
| What must **never** go in personal Memories? | secrets, customer data, … |

## Owner

| Role | Name |
|------|------|
| Maintains the passport and merges changes | |
