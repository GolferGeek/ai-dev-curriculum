---
user-invocable: false
name: pr-requirements
description: PR acceptance criteria — what /commit checks before shipping and /pr-eval checks when reviewing. Living document that grows when reviews find gaps.
category: quality
used-by-agents: commit-agent, pr-evaluator, arch-monitor, arch-hardener
---

# PR Requirements

These are the rules that must be satisfied before code ships. `/commit` checks these before committing. `/pr-eval` checks them when reviewing. When a reviewer finds a violation that escaped, they add it here so it can't escape again.

**Zero-tolerance policy:** These checks apply to the **entire codebase**, not just the current diff. Pre-existing violations block the commit just like new ones. If you find issues that predate your changes, fix them before committing — the gate doesn't grandfather anything in.

## Build quality (non-negotiable)

- [ ] `npm run build` passes with zero errors (web apps)
- [ ] `xcodebuild build` passes with zero errors (iOS apps)
- [ ] `npm run lint` passes (if configured)
- [ ] No TypeScript `any` types anywhere in source code (pre-existing or new) — replace with proper types
- [ ] No `catch (e: any)` — use `catch (e: unknown)` with proper narrowing
- [ ] No `// @ts-ignore` or `// @ts-nocheck` anywhere in source code

## Test quality (non-negotiable)

- [ ] All existing tests pass
- [ ] New features have tests covering the core user loop
- [ ] Tests exercise real user flows, not just "page renders"
- [ ] No tests skipped (`.skip`) without a linked issue explaining why

## Architecture compliance

- [ ] Database access only through `packages/surrealdb/` (see `data-architecture` skill)
- [ ] Auth tokens in HTTP-only cookies only, managed by middleware (see `web-architecture` skill)
- [ ] SwiftData for all iOS persistence, with UI testing support (see `ios-architecture` skill)
- [ ] No direct provider imports in app code — use the shared packages

## Code quality

- [ ] No hardcoded secrets, tokens, or credentials
- [ ] No `console.log` debugging left in production code (use proper error handling)
- [ ] Error states handled — API errors, empty collections, auth failures
- [ ] New UI elements have accessibility identifiers (iOS) or semantic HTML (web)

## Commit hygiene

- [ ] Commit message describes *why*, not just *what*
- [ ] Each commit is a logical unit — not a dump of unrelated changes
- [ ] No generated files committed (`.next/`, `DerivedData/`, `node_modules/`)

## Reviewer-added rules

*When `/pr-eval` finds a violation that the above rules didn't catch, add it here with the date and context. This section grows over time.*

<!-- Example:
- 2026-04-01: API routes must return 401 (not 200 with error body) for auth failures. Found in QuickBooks invoice route. -->
