# Agent portability and harness projections

Skills have a broadly portable folder convention, but specialized agent
definitions and metadata differ by harness. Portability therefore requires a
canonical source and deliberate translation, not identical copied files.

## Canonical model

```text
ai/
  skills/<function>/<name>/SKILL.md
  agents/<function>/<name>/AGENT.md
  agents/<function>/<name>/agent.json
  functions.json
```

`AGENT.md` contains tool-neutral role instructions. `agent.json` contains a
stable name, description, required/optional skills, and native overlay
metadata.

## Generated projections

| Harness | Skills | Agents |
|---|---|---|
| Claude Code | `.claude/skills/<name>/` | `.claude/agents/<name>.md` |
| Cursor | `.cursor/skills/<name>/` | `.cursor/agents/<name>.md` |
| Codex | `.agents/skills/<name>/` | `.codex/agents/<name>.toml` |

Runtime layouts remain flat for maximum compatibility. Functional hierarchy
is preserved in the canonical manifest and registry.

## Rules

- Edit canonical source only.
- Generate all projections in one change.
- Inspect semantic differences, tools, model overrides, and read-only settings.
- Test trigger behavior and delegated authority in every supported harness.
- Do not claim exact parity when a harness lacks a feature.
- Keep stable names unless a migration updates all references.
- Treat provider and format documentation as time-sensitive.

## Change workflow

Update the governing policy and canonical capability, run
`npm run ai:generate`, run `npm run ai:check`, inspect the full diff, and merge
through review. The registry records the canonical and generated revisions.
