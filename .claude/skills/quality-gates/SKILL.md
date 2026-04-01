---
user-invocable: false
name: quality-gates
description: Defines the quality gate checks — build, lint, test — and how to run them for each app type. Used by error-scanner and commit-agent.
category: quality
used-by-agents: error-scanner, error-fixer, commit-agent
---

# Quality Gates

## Web apps (Next.js in `apps/`)

```bash
# From app directory:
npm run build          # TypeScript + Next.js compilation
npm run lint           # ESLint (if configured)
npm run test           # Playwright e2e tests (requires running app + SurrealDB)

# From monorepo root:
npx turbo run build    # Builds all apps
npx turbo run test     # Tests all apps
```

**Build must produce zero errors.** Warnings are acceptable but should be tracked.

**Tests require infrastructure:**
- SurrealDB running on localhost:8000
- Schema applied (`packages/surrealdb` apply scripts)
- App running in dev or preview mode

## iOS apps (SwiftUI in `apps/`)

```bash
# From app directory:
xcodebuild -scheme <AppName> -destination 'platform=iOS Simulator,name=iPhone 17' build
xcodebuild -scheme <AppName> -destination 'platform=iOS Simulator,name=iPhone 17' test
```

**Build must succeed.** Zero errors, zero crashes.

**Tests run in simulator.** XCTest unit tests + XCUITest UI tests. Tests use `--uitesting` flag for clean state.

**Important:** Only one iOS app can test at a time on a simulator. Never run iOS tests in parallel.

## Error classification

When scanning, classify each error:

| Severity | Meaning | Example |
|----------|---------|---------|
| **critical** | Build fails, app won't start | TypeScript error, missing import, Swift compilation error |
| **high** | Tests fail, features broken | Playwright assertion failure, XCUITest failure |
| **medium** | Lint violations, warnings | ESLint errors, TypeScript strict warnings |
| **low** | Style issues, minor warnings | Unused imports, formatting |

Fix critical and high first. Medium next. Low only if time allows.
