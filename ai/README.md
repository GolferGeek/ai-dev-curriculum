# Canonical AI Tooling

This directory is the source of truth for the organization's reusable AI
development capabilities.

```text
ai/
  functions.json
  skills/<function>/<skill>/SKILL.md
  agents/<function>/<agent>/AGENT.md
  agents/<function>/<agent>/agent.json
```

Edit files here. Do not edit generated harness projections directly.

## Generated project projections

| Harness | Skills | Agents |
|---|---|---|
| Claude Code | `.claude/skills/` | `.claude/agents/` |
| Cursor | `.cursor/skills/` | `.cursor/agents/` |
| Codex | `.agents/skills/` | `.codex/agents/` |

Generate projections:

```bash
npm run ai:generate
```

Check for missing files, stale files, or drift:

```bash
npm run ai:check
```

Skills use the portable `SKILL.md` convention. Agents have a portable
instruction body and metadata record because the three harnesses use different
agent schemas:

- `AGENT.md` contains the harness-independent role and operating instructions.
- `agent.json` contains the name, description, skill relationships, and
  harness overlays.
- Model choices, permissions, tool names, and other vendor-specific settings
  belong in `overlays`, not in the portable instruction body.

Generated directories contain `.generated.json` markers and are committed so
the repository works immediately after cloning. CI verifies they remain
synchronized with this directory.

## Functional organization

`functions.json` is the complete taxonomy. Canonical capabilities are grouped
by the work they enable:

1. Foundation and planning.
2. Application delivery.
3. Quality and release.
4. Research and understanding.
5. Protocols and agent systems.
6. Skill and agent governance.
7. Model and tool evaluation.

The generator deliberately flattens each harness projection. Names such as
`prd`, `error-scanner`, and `terrain-scout` remain stable regardless of how
each harness handles nested discovery. The functional hierarchy is for people,
ownership, review, and lifecycle management; the flat projections maximize
runtime compatibility.
