# Prerequisites — Phase 03

## Required

- Phase 02 completed with a known quality contract or PR requirements
- Git available and a repository with meaningful history
- An AI coding tool that can read the selected repository
- Permission to analyze the selected code
- A clean continuing learner branch

## Repository choices

Choose one:

1. Your own repository, with organizational approval
2. A sanitized internal repository
3. Any suitable public GitHub repository
4. The curriculum or instructor-provided fallback repository

Prefer a repository large enough to contain architecture, history, and tradeoffs, but small enough to investigate during the session.

## Security and policy check

Before opening the repository in an AI tool, confirm:

- The tool is approved for this code classification.
- Repository content may be processed by that tool.
- Secrets and credentials have been removed or protected.
- Customer, employee, health, payment, and other regulated data will not enter prompts.
- The exercise will not write to production services.

If any answer is unclear, use a public repository.

## Prepare the workspace

```bash
git status
git switch learner/my-work
git log --oneline -20
```

Do not create a phase branch or discard existing work. The investigation is
report-first and should not require application-code edits. When applying this
workflow to an employer repository after class, follow that organization's
branch policy.

## Bring one real question

Examples:

- Where is authorization actually enforced?
- Why does this subsystem change so often?
- Which critical behavior has the weakest proof?
- Does the documented Git process match actual practice?
- What would a new contractor misunderstand first?
