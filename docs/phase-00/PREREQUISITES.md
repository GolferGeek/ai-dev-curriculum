# Prerequisites — Phase 00 (00–01 path)

## Required for the intended experience

| Requirement | Why |
|-------------|-----|
| **Claude Code** (CLI) installed and signed in | The pipeline **skills** in `.claude/skills/` (`/intention`, `/prd`, `/plan`, `/run-plan` — invoked by typing `/name`) are the primary automation path. |
| **Anthropic subscription** (or org billing) that covers Claude Code usage | Model calls for agents and long sessions are not free. |
| **Node.js** LTS with **npm** (the curriculum's scripts, docs, and agents all standardize on npm) | Monorepo scripts and Turbo. |

## Cursor (optional but common)

| Requirement | Why |
|-------------|-----|
| **Cursor** + subscription if your workflow uses Cursor | Cursor **does not** execute `.claude` slash skills natively. Use [RUN-ORDER.md](./RUN-ORDER.md) and project [`.cursor/rules/`](../../.cursor/rules/) so the **same curriculum** applies; use **Claude Code** when you need verified `/name` invocation. |

## What we verify in-repo

- [VERIFY.md](./VERIFY.md) — structure checks and (once apps exist) how to add **tests per track**.
