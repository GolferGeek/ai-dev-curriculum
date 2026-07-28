# Commands — Phase 03 research workflow

## Standard chain

```text
/ingest
/map
/security-scan
/git-story
/improve
/deep-dive [area]
/author-agent
```

## What each command owes you

| Command | Required behavior |
|---|---|
| `/ingest` | Cite structure, configs, entry points, and uncertainty |
| `/map` | Trace concrete flows and trust boundaries |
| `/security-scan` | Separate evidence, severity, and assumptions |
| `/git-story` | Use commits, churn, coupling, reversions, and contributors as evidence |
| `/improve` | Rank opportunities by impact, evidence, and confidence |
| `/deep-dive` | Answer a scoped question without losing system context |
| `/author-agent` | Encode a repeatable question, evidence standard, and output |

## Useful deep dives

```text
/deep-dive frontend
/deep-dive backend
/deep-dive data
/deep-dive auth
/deep-dive tests
/deep-dive observability
/deep-dive path/to/subsystem
```

## Custom skill ideas

- Git-process audit
- API consistency
- Test-coverage consistency and completeness
- Authorization map
- Business-rule locator
- Ownership map
- Migration risk
- Feature-flag inventory
- Observability map
- Documentation drift
- Project-memory refresh
- Finding promotion

## A strong custom skill specifies

1. The question it answers
2. The evidence it must inspect
3. What it must not assume
4. How it distinguishes fact from inference
5. How it records uncertainty
6. Its output format
7. How a human or deterministic tool can verify it

## Proposed cycle skills

These may be created during the lab; they are patterns, not assumed installed commands.

- **`/project-memory`** — reconcile current code, docs, reports, and Git history into a reviewable memory update.
- **`/promote-finding`** — decide whether a verified finding remains an observation, becomes explanation, becomes an expectation, or is mature enough for enforcement.
