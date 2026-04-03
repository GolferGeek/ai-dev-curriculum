---
user-invocable: false
name: day2-prep
description: Access requirements, scope, and safety guidelines for applying research tools to production code on Day 2.
category: research
used-by-agents: agent-author
---

# Day 2 Preparation

Everything in Phase 03 runs on the training repo you built together. Day 2 is when you point the same tools at **your own** codebase — the code that matters to your job. This skill defines how to do that safely.

## Before Day 2 — access checklist

- [ ] Clone the production repo locally (read access is enough to start)
- [ ] Identify the main/default branch — **never commit to it directly**
- [ ] Create a research branch: `git checkout -b research/codebase-analysis`
- [ ] Confirm you have: git history, package manifests, build config
- [ ] You do NOT need: production env vars, secrets, or database access (for research)

## Scope rules

- **Research is read-only.** The commands `/ingest`, `/map`, `/security-scan`, `/git-story`, `/improve`, and `/deep-dive` do not modify code. They only read and report.
- **`/author-agent` creates new files** in `.claude/skills/` only. It does not modify existing code.
- Never run unfamiliar build scripts, install hooks, or execute unknown binaries during research. If the repo has a `Makefile` or `docker-compose.yml` — read them first, don't run them.

## Safety guidelines

- Reports may contain file paths and code snippets. **Do NOT commit reports containing secrets, tokens, or credentials** to a shared branch.
- If `/security-scan` finds actual exposed secrets, report to the repo owner immediately — do not log them in a markdown file.
- Keep research artifacts on your research branch or in a local-only directory.

## Alternative: sandboxed environment

If you cannot or prefer not to run tools directly on your production repo:
1. Create a fresh clone in a sandboxed directory
2. Run all research commands in the sandbox
3. Export the generated skills/agents to your real working environment
4. The Orchestrator AI repo can serve as a well-organized enterprise-style alternative for practice

## Mapping the starter kit to your repo

- The training repo uses **Turborepo** — your repo might use Nx, Lerna, or no monorepo. The commands still work; they read whatever structure exists.
- Copy `.claude/skills/` to your repo to bring your custom agents along.
- Architecture skills (`web-architecture`, `data-architecture`, etc.) will need adaptation for your stack. Use `/author-agent` to create versions that match.
