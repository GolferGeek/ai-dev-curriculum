# Starter kit — Phase 02

Phase 02 operates on the learner's Phase 01 application. No fresh application
is copied into `apps/`.

## Capability pairs

```text
scanner → fixer
monitor → hardener
commit gate → PR evaluator
```

The first role in each pair finds or judges. The second changes or responds.
Separation reduces the chance that an agent quietly grades its own work.

## Finding record

Every finding should include:

- stable ID and severity;
- file, line, or runtime location;
- observation and reproducible evidence;
- impact and affected user or boundary;
- confidence and possible false-positive explanation;
- recommended smallest fix;
- required test; and
- status, owner, and disposition.

## Quality evidence

Retain:

- before/after failing and passing output;
- focused regression tests;
- build, lint, test, and type-check results;
- browser/runtime observations;
- security or architecture evidence when relevant;
- reviewed Git diff; and
- rejected findings with rationale.

## Teaching fixtures

Include examples of a real defect, a misleading symptom, a flaky or weak test,
an architecture drift finding, and a UI behavior that automated checks alone
do not expose.
