# Prerequisites — Phase 00 (00–01 path)

## Required for the intended experience

| Requirement | Why |
|-------------|-----|
| **Claude Code** (CLI) installed and signed in | **Slash commands** in `.claude/commands/` (`/intention`, `/prd`, `/plan`, `/run-plan`) are the primary automation path. |
| **Anthropic subscription** (or org billing) that covers Claude Code usage | Model calls for agents and long sessions are not free. |
| **Node.js** LTS and a package manager (**pnpm** recommended for Turborepo; npm/yarn if you standardize otherwise) | Monorepo scripts and Turbo. |

## Cursor (optional but common)

| Requirement | Why |
|-------------|-----|
| **Cursor** + subscription if your workflow uses Cursor | Cursor **does not** execute `.claude` slash commands natively. Use [RUN-ORDER.md](./RUN-ORDER.md) and project [`.cursor/rules/`](../../.cursor/rules/) so the **same curriculum** applies; use **Claude Code** when you need verified `/` commands. |

## What we verify in-repo

- [VERIFY.md](./VERIFY.md) — structure checks and (once apps exist) how to add **tests per track**.
