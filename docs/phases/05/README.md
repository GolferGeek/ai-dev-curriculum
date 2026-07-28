# Phase 05 — Skill scouting and governance

*Last verified: July 2026*

Build a Skills Locator that scouts public and internal sources, normalizes a refreshable catalog, supports research and filtering, and helps people evaluate whether a skill belongs at personal, project/team, or enterprise scope.

The product is not an installer. Discovery is broad; trust is earned.

## Learn

- Skill vs. agent, rule, tool/MCP, memory, and code
- Capability vs. preference and maturity
- Personal/project/enterprise scopes and precedence
- Provenance, revisions, permissions, dependencies, and context cost
- Trigger tests, collisions, sandboxing, ownership, and retirement
- Scout → evaluate → approve/modify/reject → publish → maintain

## Build

`apps/skills-browser/`: fetch and cache configured sources, parse complete skill folders, diff recurring scouting runs, search/filter, preview all files, show a skills matrix, and record evaluation recommendations locally. Phase 05 does not automate organizational publication.

## Outputs

- Refreshable static catalog and catalog diff
- Search/filter/detail interface
- Skills matrix with provenance, maturity, risk, scope, permissions, and revision
- Evaluations of three skills, including one rejection
- One sandbox-tested candidate
- Personal/project/enterprise policy discussion

## Program foundation

Read [docs/ai-program/skills/](../../ai-program/skills/README.md). Use `/skill-scout` and `/skill-evaluate`. Phase 05.5 adds SurrealDB, shared policy, installations, and lifecycle state.

## Documents

[OVERVIEW](OVERVIEW.md) · [PREREQUISITES](PREREQUISITES.md) · [COMMANDS](COMMANDS.md) · [STARTER-KIT](STARTER-KIT.md) · [RUN-ORDER](RUN-ORDER.md) · [TALKING-POINTS](TALKING-POINTS.md) · [TEACHING](TEACHING.md) · [DEMO-GRADE-BAR](DEMO-GRADE-BAR.md) · [VERIFY](VERIFY.md)
