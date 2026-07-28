# Prerequisites — Phase 01

Everything from [phase 00 prerequisites](../00/PREREQUISITES.md), plus Phase 00 **complete** (monorepo + one track app). Read [OVERVIEW.md](./OVERVIEW.md) before the session.

## Required (all tracks)

- **SurrealDB** — Install locally:
  - **Windows (PowerShell):** `iwr https://windows.surrealdb.com -useb | iex`
  - **macOS:** `brew install surrealdb/tap/surreal`
  - **Linux:** `curl -sSf https://install.surrealdb.com | sh`
  - **Docker (any OS):** `docker run --rm -p 8000:8000 surrealdb/surrealdb:latest start`
  - Verify: `surreal version` should print a current 2.x/3.x release
  - If Windows reports missing `VCRUNTIME140.dll` / `MSVCP140.dll`, install the [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist).

## Required (web tracks — the class default)

- **Node.js 18+** (same as phase 00)
- **npm** (same as phase 00)

> **Platform note:** The default Phase 01 path is **Next.js + SurrealDB on every OS** (Windows, macOS, Linux). Cursor, Claude Code, and Codex all run on Windows; the apps and SurrealDB behave the same. Use PowerShell or Git Bash — prefer [Git for Windows](https://git-scm.com/download/win) if you use Claude Code natively (enables its Bash tool).

## Required (iOS tracks: Twitter killer, Facebook killer) — Mac only, opt-in

> **Not the class default.** Native **SwiftUI / SwiftData / Xcode** tracks require **macOS**. Windows and Linux participants stay on the web versions of those products. Treat iOS as an individual opt-in, not a cohort requirement.

- **macOS** (Xcode only runs on Mac — there is no Windows/Linux substitute)
- **Xcode 26+** — Install from the Mac App Store. Includes Simulator, SwiftUI, SwiftData. (Apple now versions Xcode by year; App Store submissions require the iOS 26 SDK as of April 2026.)
- **Xcode Command Line Tools**: `xcode-select --install`
- Verify: `xcodebuild -version` should print Xcode 26+

## Optional (all tracks)

- **Chrome** + Claude-in-Chrome extension — for `/test-browser` visual QA
- **Docker** — alternative for running SurrealDB without native install
