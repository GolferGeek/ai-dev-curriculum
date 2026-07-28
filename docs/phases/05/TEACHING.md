# Phase 05 — Instructor teaching guide

This guide controls the room. The expanded narrative and citations live in
[the lesson plan](../../../marketing/lesson-plans/phase-05.md); learners follow
[RUN-ORDER.md](RUN-ORDER.md).

## Outcomes and timing

Suggested block: 3–3.5 hours, including a 15-minute break.

| Segment | Time | Instructor outcome |
|---|---:|---|
| Reframe and vocabulary | 25 min | Learners distinguish skills, agents, rules, tools, memory, and code |
| Canonical library and harnesses | 20 min | Learners trace one capability into three projections |
| Threat model and rubric | 30 min | Learners can name evidence required before adoption |
| Plan challenge | 20 min | The build plan includes snapshots, diffs, full preview, and tests |
| Build and checkpoints | 75 min | A working locator exists without unauthorized installation |
| Evaluation board | 35 min | Each group defends an adoption and a rejection |
| Debrief and handoff | 15 min | Owners, scopes, and re-review triggers are explicit |

## Before class

- Refresh sources, record exact revisions, and preserve an offline cache.
- Verify one skill, one agent, one revision change, and one malformed fixture.
- Choose a candidate with a realistic authority or supply-chain concern.
- Confirm that the room can discuss policy without exposing client secrets.
- Open the canonical `ai/` tree and all three generated projections.

## Opening

Say: “These files can instruct an agent that can read code, run commands, and
use tools. Treat them as behavioral dependencies, not prompt collectibles.”

Ask the room to classify five examples: a coding standard, a PDF workflow, a
security reviewer, a database connector, and an architecture decision. Correct
the mechanism, not only the label.

## Demonstration: canonical versus native

1. Open one canonical skill and one canonical agent in `ai/`.
2. Find their generated Claude Code, Cursor, and Codex versions.
3. Show which semantics remain stable and which metadata/layout changes.
4. Run `npm run ai:check`.
5. Explain why nested function groups help people while flat projections help
   runtimes.

Stop and ask: “Which copy would you review and edit?” The answer is canonical
`ai/`.

## Teach the evaluation rubric

Draw six columns:

```text
purpose | provenance | behavior | authority | evidence | ownership
```

For each candidate require:

- a clear job and non-goals;
- source, license signal, exact revision, and complete files;
- trigger, non-trigger, collision, and failure behavior;
- commands, files, network, credentials, tools, and writes requested;
- sandbox and outcome evidence; and
- scope, owner, expiration, and re-review event.

Use the deliberately risky candidate. Do not ask “Is it malicious?” Ask “What
could it do with the authority it requests, and what evidence would lower that
risk?”

## Build checkpoints

### Checkpoint 1 — source boundary

Stop when fetching works. Verify immutable snapshot metadata, cache behavior,
rate-limit handling, and visible failures. Reject a design that silently uses a
stale snapshot as current.

### Checkpoint 2 — normalization boundary

Stop after parsing. Compare a skill folder with three agent formats. Verify
stable capability identity and exact revisions remain separate. Preserve
unknown fields and parse failures.

### Checkpoint 3 — product boundary

Stop when the catalog appears. Require full-file preview and revision display
before celebrating filters or visual polish. Have one learner locate bundled
scripts without using the source website.

### Checkpoint 4 — judgment boundary

Have groups evaluate three candidates. One must be rejected or restricted.
Challenge decisions based on stars, vendor reputation, or a single happy-path
demo.

## Evaluation board

Each group gets three minutes:

1. State the candidate, exact revision, and intended job.
2. Show the most important evidence.
3. Recommend scope and restrictions.
4. Name the owner and re-review trigger.
5. Defend why another candidate was rejected.

Peers may challenge missing evidence, excessive authority, collisions, or an
unclear outcome. The instructor approves the reasoning quality, not adoption.

## Common failure modes

- **The catalog becomes an app-store clone.** Redirect to full inspection and
  trust evidence.
- **Agents and skills are collapsed.** Revisit delegated role versus reusable
  procedure.
- **Generated projections are treated as independent sources.** Trace back to
  canonical `ai/`.
- **All candidates pass.** Require a rejection and improve the rubric.
- **Installation sneaks into “copy.”** Remove the action or relabel it as
  export; publication belongs in Phase 05.5.
- **Live network fails.** Use the dated offline snapshot and still demonstrate
  the diff.

## Close

Ask each learner to finish:

- “A capability belongs at organizational scope only when…”
- “An approved name is not enough because…”
- “I would trigger re-review when…”

Preview Phase 05.5: the locator will become a registry that records policy,
generates native projections, and uses Git review for publication.
