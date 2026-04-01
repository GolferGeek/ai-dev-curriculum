# Run order — Phase 03

## Before you start

- [ ] Phase 02 complete (at least one app with clean `/scan-errors` and `/monitor`)
- [ ] Training repo has git history (commits from phases 00-02)
- [ ] You're comfortable with the command → agent → report pattern from Phase 02

## Steps

| Step | What to type | What happens |
|------|-------------|-------------|
| 1 | `/ingest` | Whole-repo orientation. Produces `docs/artifacts/ingest-report.md`. |
| 2 | `/map` | Maps data flow, entry/exit points, auth boundaries. Produces `docs/artifacts/map-report.md`. |
| 3 | `/security-scan` | Security analysis. Produces `docs/artifacts/security-report.md`. |
| 4 | `/git-story` | Git history analysis. Produces `docs/artifacts/git-story-report.md`. |
| 5 | `/improve` | Improvement opportunities. Produces `docs/artifacts/improve-report.md`. |
| 6 | `/deep-dive frontend` | Specialist deep-dive on one area. Produces `docs/artifacts/deep-dive-report.md`. |
| 7 | `/author-agent` | Create a custom agent or skill from patterns you observed. |

## The full research chain at a glance

```
/ingest           →  ingest-report.md       (what is this?)
/map              →  map-report.md          (how does data flow?)
/security-scan    →  security-report.md     (what's risky?)
/git-story        →  git-story-report.md    (who changed what?)
/improve          →  improve-report.md      (what could be better?)
/deep-dive [area] →  deep-dive-report.md    (specialist analysis)
/author-agent     →  new skill files        (build your own tools)
```

## Deep-dive variants

| Command | Focus area |
|---------|-----------|
| `/deep-dive frontend` | Components, routing, state management, UI patterns |
| `/deep-dive backend` | API routes, middleware, auth flow, server actions |
| `/deep-dive data` | Schema, queries, access control, migrations |
| `/deep-dive [path]` | Any specific directory or module |

## If something fails

- **Ingest seems incomplete** → The repo may be large. Try `/deep-dive [specific-area]` for focused analysis.
- **Security scan finds nothing** → The training repo was built with architecture skills that enforce good patterns. That's a success! Try introducing a deliberate vulnerability to see the scanner catch it.
- **Git story is thin** → You need real commit history. If you only have 1-2 commits, go back and use `/commit` from Phase 02 on a few changes first.
- **Author-agent output doesn't work** → The generated skill is a starting point. Test it, refine it, test again. This is the learning.
