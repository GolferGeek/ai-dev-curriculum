# Starter kit — one capability library, three coding harnesses

The starter kit is the complete course repository at the immutable
`starter-kit-v1` tag. Create one learner branch from that tag and keep it for
the entire program. There are no phase branches or phase tags.

## What learners receive

| Area | Purpose |
|---|---|
| `docs/` | Course material, intentions, artifacts, decisions, and the organizational AI program |
| `ai/` | Canonical skills and specialized agents, organized by business function |
| `.claude/` | Generated Claude Code skills and agents |
| `.cursor/` | Generated Cursor skills, agents, and project rules |
| `.agents/skills/` | Generated Codex skills |
| `.codex/agents/` | Generated Codex agent roles |
| `apps/` | Empty active workspace where learners build |
| `completed/apps/` | Finished reference implementations for instructor-directed comparison and recovery |
| `packages/` | Shared code used by learner applications |

The generated harness directories are committed so a learner can start
immediately. The canonical source remains `ai/`; do not hand-edit a generated
copy.

## Why the canonical library is organized by function

A growing organization should not browse one enormous alphabetical list.
Skills and agents are grouped by the work they support:

1. Foundation and planning.
2. Application delivery.
3. Quality and release.
4. Research and understanding.
5. Protocols and agent systems.
6. Skill and agent governance.
7. Model and tool evaluation.

Each canonical skill lives at
`ai/skills/<function>/<skill>/SKILL.md`. Each canonical agent lives at
`ai/agents/<function>/<agent>/AGENT.md` with an adjacent `agent.json` metadata
file. Stable names let the generator create the layouts each harness expects
without changing what the capability means.

## Choose a working interface

Cursor is the recommended common IDE because it keeps code, terminals, source
control, and agent conversations in one environment. Learners may use Cursor's
agent interface, launch Claude Code or Codex from its terminal, or use the
Claude Code and Codex editor integrations.

Claude Code and Codex are also fully supported as primary harnesses. The
client's security, procurement, and model-provider policy controls which tools
and models are allowed. The curriculum teaches the same durable workflow in
all three.

## Generate and verify projections

Run these commands after changing canonical capabilities:

```bash
npm run ai:generate
npm run ai:check
```

`ai:generate` rebuilds all three harness projections. `ai:check` generates into
a temporary location and fails if a committed projection is missing, stale, or
hand-edited.

## The Phase 00 workflow

Phase 00 uses the same pipeline learners will repeat all week:

```text
intention → PRD → plan → run the plan → build → lint → test → verify → browser
```

Part A examines the monorepo and capability library. Part B builds one
demo-grade application in `apps/`. The intentions and cross-cutting grade bar
define the result before an agent writes code.

Pipeline capabilities include `intention`, `prd`, `plan`, and `run-plan`.
Specialized builders include the monorepo and Phase 00 application builders.
The exact invocation syntax can differ by harness; the artifact contract and
quality gates do not.

## Instructor walkthrough

Before the first lab:

1. Show the one learner branch and explain why work accumulates rather than
   resetting at each phase.
2. Open `ai/` and one generated projection side by side.
3. Trace one canonical skill and one canonical agent into all three harnesses.
4. Run `npm run ai:check`.
5. Open `apps/` and `completed/apps/`; explain when reference code may be used.
6. Demonstrate intention → PRD → plan without beginning the build.

During the lab, make learners inspect the artifact produced at every boundary.
After the lab, ask them to name which knowledge belongs in documents, a skill,
an agent, code, or a temporary conversation.

## Guardrails

- Do not edit generated harness folders directly.
- Do not copy finished applications back into `apps/` as a substitute for the
  lab.
- Do not let a tool-specific invocation become the learning objective.
- Do not grant an agent publication, credential, or production authority just
  because it can generate code.
- Keep stable organizational knowledge in Git; treat personal tool memory as a
  convenience, not the source of truth.

See [the canonical AI library](../../../ai/README.md), the
[monorepo operating model](../../MONOREPO-OPERATING-MODEL.md), and the
[harness instruction map](../../guardrails/02-harness-instruction-layers.md).
