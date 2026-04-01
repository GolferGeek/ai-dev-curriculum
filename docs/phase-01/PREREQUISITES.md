# Prerequisites — Phase 01

Everything from [phase 00 prerequisites](../phase-00/PREREQUISITES.md), plus:

## Required (all tracks)

- **SurrealDB** — Install locally:
  - macOS: `brew install surrealdb/tap/surreal`
  - Linux: `curl -sSf https://install.surrealdb.com | sh`
  - Docker: `docker run --rm -p 8000:8000 surrealdb/surrealdb:latest start`
  - Verify: `surreal version` should print 2.x+

## Required (web tracks: QuickBooks killer, Trello killer)

- **Node.js 18+** (same as phase 00)
- **npm** (same as phase 00)

## Required (iOS tracks: Twitter killer, Facebook killer)

- **macOS** (Xcode only runs on Mac)
- **Xcode 15+** — Install from the Mac App Store. Includes Simulator, SwiftUI, SwiftData.
- **Xcode Command Line Tools**: `xcode-select --install`
- Verify: `xcodebuild -version` should print Xcode 15+

## Optional (all tracks)

- **Chrome** + Claude-in-Chrome extension — for `/test-browser` visual QA
- **Docker** — alternative for running SurrealDB without native install
