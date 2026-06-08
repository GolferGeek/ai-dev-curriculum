---
user-invocable: false
name: ios-swiftui
description: Apply when building iOS apps — SwiftUI views, SwiftData models, Xcode project structure, xcodebuild CLI, XCTest.
---

# iOS / SwiftUI

When this skill applies:

- **Project structure**: Create an Xcode project under `apps/<app-name>/` with standard layout: `<AppName>/` (sources), `<AppName>Tests/` (unit tests), `<AppName>UITests/` (UI tests). Use `.xcodeproj` (not workspace) unless CocoaPods or SPM workspace is needed.
- **SwiftUI views**: Use `NavigationStack` for drill-down, `TabView` for top-level sections. Prefer `@State`, `@Binding`, `@Environment` over manual observation where possible.
- **SwiftData**: Define models with `@Model` macro. Set up `ModelContainer` in the `@main` App struct. Use `@Query` in views for automatic fetching. Relationships via `@Relationship`.
- **Networking**: Use `URLSession` with `async/await` for HTTP calls. For SurrealDB, POST to `http://localhost:8000/sql` with `NS`/`DB`/`Authorization` headers or use `surrealdb.swift` SPM package.
- **Auth**: Store tokens in Keychain (via a simple wrapper) or `@AppStorage` for dev. Check token on app launch → route to login or main.
- **Testing**: `XCTest` for unit tests (model logic, network mocks). `XCUITest` for UI flows — launch app, tap elements, assert text exists.
- **CLI build**: `xcodebuild -scheme <Name> -destination 'platform=iOS Simulator,name=iPhone 16' build test` from repo root. Use `-resultBundlePath` for CI artifacts.
- **Previews**: Add `#Preview` blocks for key views with mock data so the design is visible without running the full app.
- **Monorepo note**: Xcode projects sit alongside Next.js apps in `apps/`. They don't participate in `turbo run build` — use a separate npm script or Makefile target (e.g. `"build:ios": "xcodebuild -scheme ..."`).
