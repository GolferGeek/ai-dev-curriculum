# Prerequisites — Phase 00 (00–01 path)

## Required for the intended experience

| Requirement | Why |
|-------------|-----|
| **Client-approved coding harness** installed and signed in | Cursor IDE is the recommended common environment; Claude Code and Codex are supported. |
| **Approved account and model access** for the selected harness | Product plans, limits, model access, and data terms must be confirmed for the cohort. |
| **Node.js** LTS with **npm** (the curriculum's scripts, docs, and agents all standardize on npm) | Monorepo scripts and Turbo. |

**Windows:** Install [Git for Windows](https://git-scm.com/download/win) so Claude Code can use its Bash tool (PowerShell alone works, but Git Bash is smoother). Repo verify scripts under `scripts/*.sh` need Git Bash or WSL. Cursor and Codex also run natively on Windows — same workflow as macOS.

## Harness verification

Run `npm run ai:check` before class. It verifies that the canonical `ai/`
library and the Claude Code, Cursor, and Codex projections match. Learners follow
[RUN-ORDER.md](./RUN-ORDER.md) regardless of which supported interface invokes
the named capability.

## What we verify in-repo

- [VERIFY.md](./VERIFY.md) — structure checks and (once apps exist) how to add **tests per track**.
