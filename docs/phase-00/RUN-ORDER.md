# Run order — “grab context and run in sequence”

Hand this to someone who learns best from a **checklist**. It matches [STARTER-KIT.md](./STARTER-KIT.md) and [README.md](./README.md).

## Before you start

1. Read [PREREQUISITES.md](./PREREQUISITES.md).
2. Clone the repo; open it in **Claude Code** (recommended for slash commands) or **Cursor** (follow the same steps manually using the command **files** in `.claude/commands/` as prompts).

## Part A — Monorepo shell

| Step | Action |
|------|--------|
| 1 | Read [intention-monorepo.md](./intention-monorepo.md). |
| 2 | Run **`/intention`** (Claude Code) **or** paste/use `.claude/commands/intention.md` as the prompt in Cursor. |
| 3 | Run **`/prd`**, then **`/plan`** — store outputs under **`docs/artifacts/`** (create the folder if needed). |
| 4 | Run **`/run-plan`** — should delegate to **monorepo-builder** until Turbo + `apps/` + `packages/` match the plan. |
| 5 | Run **`./scripts/verify-curriculum-structure.sh`** (from repo root). Fix until it passes for “monorepo present” checks. |

## Part B — First app (pick A–D)

| Step | Action |
|------|--------|
| 1 | Choose **one** track from [README.md](./README.md#tracks-pick-one). |
| 2 | Open **only** that track’s `intention-*.md`. |
| 3 | **`/prd`** then **`/plan`** from that intention (challenge passes as the course teaches). |
| 4 | **`/run-plan`** with the matching **track** agent (HTTP wiki, CRM, ops). |
| 5 | Run **app tests** when the starter implements them (`turbo run test` or per-app `test` script). Re-run **`verify-curriculum-structure.sh`** if extended. |

## If something fails

1. Capture the error (build, test, or verify script).
2. Fix forward **or** reset uncommitted app work and re-run **`/run-plan`** from a clean **plan** file.
3. Keep **`.claude/`**, **`docs/phase-00/`**, **`CLAUDE.md`**, and **`.cursor/rules/`** — wipe generated **app** code only if you need a clean retry.

## Cursor users

Use **[@ references](https://www.cursor.com/docs)** to `docs/phase-00/STARTER-KIT.md` and the relevant `.claude/commands/*.md` file so the agent follows the same steps as slash commands in Claude Code.
