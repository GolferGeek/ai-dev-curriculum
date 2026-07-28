# Guardrails G2 — Harness instruction layers

*Where **Claude Code**, **Cursor**, and **Codex** keep corporate, group, project, and individual instructions, skills, and agents — and how this curriculum maps them to git.*

Taught with D00-2 ([instruction passport](../../marketing/lesson-plans/discussion-topics.md)). Pair with kit [02 — Instruction passport](../../marketing/adoption-kit/02-instruction-passport.md) and [09 — Memory context map](../../marketing/adoption-kit/09-memory-context-map.md).

*[refresh vendor paths before each cohort — links at bottom]*

---

## Read this first: three scopes + one individual box

| Scope | What it is | **Team truth belongs in git** |
|-------|------------|--------------------------------|
| **Corporate** | Company-wide policy, approved stack, boundaries | `docs/ai-program/`, root `AGENTS.md`, canonical `ai/` |
| **Group** | Squad, product line, or client overlay | `docs/groups/<name>/`, scoped rules |
| **Project** | One app or engagement | `docs/artifacts/` or `docs/projects/<name>/`, `apps/<app>/`, path-scoped rules |
| **Individual** | One developer's machine | Personal harness settings — **not** the system of record |

**Memory** = filing cabinet (decisions in markdown). **Context** = what the harness loads this session (assembled from memory + rules + `@` files + skills).

---

## One repo, three harnesses (curriculum default)

This monorepo is **tool-agnostic** but **git-specific**:

| Layer | Path in *your* monorepo | Who reads it |
|-------|-------------------------|--------------|
| Corporate context passport | `AGENTS.md` (root) | Cursor, Codex, many agents |
| Claude project instructions | `CLAUDE.md` (root) — often `@AGENTS.md` + phase pointers | Claude Code |
| Cursor scoped rules | `.cursor/rules/*.mdc` | Cursor Agent |
| Canonical workflows | `ai/skills/` | Humans, generators, and review |
| Canonical specialized agents | `ai/agents/` | Humans, generators, and review |
| Claude Code projection | `.claude/skills/`, `.claude/agents/` | Claude Code |
| Cursor projection | `.cursor/skills/`, `.cursor/agents/` | Cursor editor and CLI |
| Codex projection | `.agents/skills/`, `.codex/agents/` | Codex app, CLI, and IDE extension |
| Corporate memory | `docs/ai-program/` | Humans + agents via `@` |

**Passport pattern (mixed teams):**

```text
AGENTS.md          ← single source of truth (corporate + project basics)
CLAUDE.md          ← @AGENTS.md + Claude-specific notes
.cursor/rules/     ← glob-scoped detail (web vs iOS vs infra)
.codex/config.toml ← Codex sandbox/approval knobs only — not prose policy
```

---

## Comparison — corporate · group · project · individual

### Instructions (context loaded each session)

| Scope | Claude Code | Cursor | Codex |
|-------|-------------|--------|-------|
| **Corporate** | Managed `claudeMd` / managed-settings (IT); project `CLAUDE.md` + `.claude/CLAUDE.md` for team git copy | **Team Rules** (Team/Enterprise dashboard; can enforce) | `requirements.toml` (admin policy floor); org-level config via admin |
| **Group** | Nested `CLAUDE.md` under `docs/groups/<name>/` or app subtree | Nested `AGENTS.md` or `.cursor/rules` with globs for `apps/client-a/**` | Nested `AGENTS.md` on path from repo root → cwd |
| **Project** | Root + nested `CLAUDE.md`; **`docs/projects/<name>/`** portfolio | Root + nested `AGENTS.md`; `.cursor/rules/` | Root + nested `AGENTS.md`; `.codex/config.toml`; **`docs/projects/<name>/`** |
| **Individual** | `~/.claude/CLAUDE.md`, `CLAUDE.local.md` (gitignored), auto **Memories** | **User Rules** (Settings); **Memories** (per user/project) | `~/.codex/AGENTS.md`, `~/.codex/config.toml`; opt-in **Memories** |

**Precedence (simplified):** managed/org policy → project git files → personal/local. When tools disagree, **git wins for the team** — personal layers are preferences only.

### Skills (repeatable workflows)

| Scope | Claude Code | Cursor | Codex |
|-------|-------------|--------|-------|
| **Corporate / shared** | `.claude/skills/` in repo; org **managed settings** / plugins (Enterprise) | Team-published skills (where enabled); project skills in repo | `.agents/skills/` in repo; admin/system skill paths |
| **Group / project** | Same repo tree — scope by skill design + `@` docs | `.cursor/skills` or repo skill folders (see Cursor docs); rules for when to load | `.agents/skills/` per repo; nested discovery walking up from cwd |
| **Individual** | `~/.claude/skills/` (personal) | User-level skill config | `~/.agents/skills` or user skill paths in `~/.codex/` |

**Curriculum skills** are authored in `ai/skills/`. Running
`npm run ai:generate` publishes identical skill folders to `.claude/skills/`,
`.cursor/skills/`, and `.agents/skills/`. Running `npm run ai:check` detects
missing, stale, or edited projections.

**GitHub Actions:** only **committed** `.claude/skills/` + `prompt: "/skill-name"` via [`anthropics/claude-code-action`](https://github.com/anthropics/claude-code-action) — see [Actions + agents](../github/actions-and-agents.md).

### Agents (specialized sub-workers)

| Scope | Claude Code | Cursor | Codex |
|-------|-------------|--------|-------|
| **Corporate / project** | `.claude/agents/*.md` | `.cursor/agents/*.md` | `.codex/agents/*.toml` |
| **Individual** | `~/.claude/agents/` | `~/.cursor/agents/` | `~/.codex/agents/` |

**Curriculum agents** are authored as a portable body plus metadata under
`ai/agents/`. The generator writes Claude Code and Cursor Markdown definitions
and Codex TOML definitions. Harness-specific model, permission, sandbox, and
tool settings belong in overlays rather than the portable body.

### Settings & enforcement (hard guardrails)

| | Claude Code | Cursor | Codex |
|---|-------------|--------|-------|
| **Corporate enforce** | Server-managed settings, MDM plist / registry, `managed-settings.json` on disk | **Team Rules** (required vs optional) | `requirements.toml` + system `/etc/codex/` |
| **Project** | `.claude/settings.json` | `.cursor/` hooks (deterministic), project rules | `.codex/config.toml` |
| **Individual** | `~/.claude/settings.json`, `.claude/settings.local.json` | User Rules | `~/.codex/config.toml` |

**Soft guardrails** = markdown (CLAUDE.md, AGENTS.md, skills). **Hard guardrails** = managed policy, hooks, permissions, CI — kit [04](../../marketing/adoption-kit/04-quality-gates.md) and [05](../../marketing/adoption-kit/05-decision-boundaries.md).

---

## Detail by tool

### Claude Code (CLI)

| Kind | Team / project (git) | Individual (machine) | Corporate (IT) |
|------|------------------------|----------------------|----------------|
| Instructions | `CLAUDE.md`, `.claude/CLAUDE.md`, nested `CLAUDE.md` | `~/.claude/CLAUDE.md`, `CLAUDE.local.md` | Managed `claudeMd`; [server-managed settings](https://code.claude.com/docs/en/server-managed-settings) |
| Skills | `.claude/skills/` | `~/.claude/skills/` | Plugins + managed policy |
| Agents | `.claude/agents/` | `~/.claude/agents/` | Managed restrictions |
| Settings | `.claude/settings.json` | `~/.claude/settings.json`, `.claude/settings.local.json` | `managed-settings.json`, MDM |

Official: [Settings](https://code.claude.com/docs/en/settings) · [Skills](https://code.claude.com/docs/en/skills) · [Admin setup](https://code.claude.com/docs/en/admin-setup)

### Cursor (IDE)

| Kind | Team / project (git) | Individual (machine) | Corporate (Team/Enterprise) |
|------|------------------------|----------------------|----------------------------|
| Instructions | `.cursor/rules/*.mdc`, `AGENTS.md` (root + nested) | **User Rules** in Settings | [**Team Rules**](https://cursor.com/docs/rules) (dashboard; enforceable) |
| Skills | Project skill folders / `@` skills (see Cursor docs) | User scope | Team-distributed where enabled |
| Agents | `.cursor/agents/*.md`; compatibility reads for Claude and Codex agent folders | `~/.cursor/agents/` | Team policy and plugins |
| Legacy | `.cursorrules` (deprecated — migrate to `.cursor/rules/`) | — | — |

**Precedence:** Team Rules → Project Rules → User Rules ([Cursor rules docs](https://cursor.com/docs/rules)).

**Note:** use `.cursor/rules/` for conditional or glob-scoped instructions and
`.cursor/agents/` for specialized delegated roles. Cursor also documents
compatibility with `.claude/agents/` and `.codex/agents/`, but this curriculum
generates a native Cursor projection so support is explicit.

### Codex (OpenAI CLI / ChatGPT coding agent)

| Kind | Team / project (git) | Individual (machine) | Corporate (admin) |
|------|------------------------|----------------------|-------------------|
| Instructions | `AGENTS.md` (root → cwd chain), `AGENTS.override.md` | `~/.codex/AGENTS.md` | `requirements.toml` policy floor |
| Skills | `.agents/skills/<skill>/SKILL.md` | `~/.agents/skills` | System/admin skill paths |
| Agents | `.codex/agents/*.toml` | `~/.codex/agents/*.toml` | Managed policy can constrain settings |
| Config (not prose) | `.codex/config.toml` | `~/.codex/config.toml` | `/etc/codex/config.toml`, managed requirements |
| Memories | — | Opt-in Memories | Admin controls |

Official: [AGENTS.md guide](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [Skills](https://learn.chatgpt.com/docs/agent-configuration/skills) · [Subagents and custom agents](https://learn.chatgpt.com/docs/agent-configuration/subagents)

**Size limit:** combined `AGENTS.md` chain defaults to **32 KiB** — split across nested dirs or raise `project_doc_max_bytes` in config.

---

## What never belongs in the wrong box

| Never commit | Why | Put it instead |
|--------------|-----|----------------|
| Secrets, API keys, customer PII | Scanning + leak risk | GitHub Secrets, vault, `.env` (gitignored) |
| “Team policy” only in Memories | New hire's laptop won't have it | `AGENTS.md` or `docs/ai-program/` |
| Sole copy of a workflow in chat | Not repeatable | Canonical `ai/skills/` + PR |
| Duplicated conflicting passports | Tools merge unpredictably | One `AGENTS.md`; thin overlays per harness |

---

## Fill-in: your harness map

| Scope | Memory path (decisions) | Context path (agents load) | Owner |
|-------|-------------------------|----------------------------|-------|
| Corporate | | `AGENTS.md`, canonical `ai/`, generated harness projections | |
| Group | `docs/groups/<name>/` | | |
| Project | `docs/artifacts/` | Scoped rules / nested AGENTS | |
| Individual | *(none in git)* | Personal Rules / `~/.claude/` | Each dev |

| Approved harness(es) | Corporate enforcement mechanism |
|--------------------|---------------------------------|
| ☐ Claude Code ☐ Cursor ☐ Codex | |

---

## Official docs *(refresh)*

| Tool | Instructions | Skills | Admin / corporate |
|------|--------------|--------|-------------------|
| Claude Code | [Settings](https://code.claude.com/docs/en/settings) | [Skills](https://code.claude.com/docs/en/skills) · [Agents](https://code.claude.com/docs/en/sub-agents) | [Admin setup](https://code.claude.com/docs/en/admin-setup) |
| Cursor | [Rules](https://cursor.com/docs/rules) | [Skills](https://cursor.com/docs/skills) · [Agents](https://cursor.com/docs/subagents) | Team dashboard |
| Codex | [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | [Skills](https://learn.chatgpt.com/docs/agent-configuration/skills) · [Agents](https://learn.chatgpt.com/docs/agent-configuration/subagents) | `requirements.toml` / enterprise docs |

**Next:** [Checklist 02 — GitHub Actions and skills](../checklists/02-github-actions-and-skills.md) · [GitHub hardening](../github/hardening.md)
