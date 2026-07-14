# 3 — Artifact Pipeline

*Where do intentions, PRDs, and plans live, and who signs off at each step? Taught in Phase 00 (the pipeline itself).*

**Why this matters:** the pipeline — **intention → PRD → plan → build → verify** — is only repeatable if the artifacts have a home and a reviewer. Chat scrollback is not a home.

## Folder convention (adapt to taste, then commit)

```
docs/
  intentions/     one file per capability — the "what and why"
  prds/           requirements traced to an intention
  plans/          ordered steps with owners, traced to a PRD
```

## Decisions

| Question | Your answer |
|----------|-------------|
| Repo and folder where artifacts live | |
| Who can write an intention? (Recommended: anyone, including non-engineers) | |
| Who reviews an intention before it becomes a PRD? | |
| Who approves a plan before the build starts? | |
| Where does the challenge pass happen — who reads output against intent? | |

## Policy lines

- No build starts without a written intention — even a ten-line one.
- Every PRD requirement must trace to an intention sentence; drift gets flagged, not shrugged at.
- Artifacts are updated when reality changes — a stale intention is worse than none.

## Owner

| Role | Name |
|------|------|
| Owns the convention and keeps the folders honest | |
