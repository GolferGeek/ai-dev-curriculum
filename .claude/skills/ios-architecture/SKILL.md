---
user-invocable: false
name: ios-architecture
description: Architectural rules for SwiftUI iOS apps — mandatory for iOS builders, scanners, monitors, and PR evaluators.
category: architecture
used-by-agents: ios-builder, error-scanner, error-fixer, arch-monitor, arch-hardener, commit-agent, pr-evaluator
---

# iOS Architecture Rules (SwiftUI)

These rules are **mandatory** — violations are errors, not suggestions.

## Data models

- **All persistence uses SwiftData.** `@Model` classes with `@Query` in views. No Core Data, no raw SQLite, no UserDefaults for domain data.
- **`@AppStorage` is only for preferences** (theme, onboarding-completed flag, current user ID). Never for domain entities.
- **Model relationships use `@Relationship`.** No manual ID lookups or string-based foreign keys.
- **Violation:** Domain data in UserDefaults. Manual ID-based lookups instead of relationships. Core Data usage.

## View architecture

- **Views are thin.** A view displays data and sends user actions. Extract complex logic to methods on the model or to helper structs.
- **Navigation uses `NavigationStack` or `TabView`.** No custom navigation state management unless SwiftUI navigation genuinely can't handle the case.
- **Every list has an empty state.** Use `ContentUnavailableView` or a custom empty state — never a blank screen.
- **Violation:** Business logic in view body. Manual navigation state management. Missing empty states.

## SwiftData patterns

- **`ModelContainer` is set up once** in the `@main` App struct. Views use `@Environment(\.modelContext)` or `@Query`.
- **Support `--uitesting` launch argument** that switches to in-memory storage and clears UserDefaults. Every app must support clean-slate testing.
- **No direct `modelContext.save()` calls** unless you need explicit transaction control. SwiftData auto-saves.
- **Violation:** ModelContainer created in a view. No UI testing support. Manual save calls without justification.

## Accessibility

- **All interactive elements have accessibility identifiers** for XCUITest. Use `.accessibilityIdentifier("meaningful_name")`.
- **Labels and buttons have accessibility labels** when the visual context isn't enough.
- **Violation:** Interactive elements without identifiers. XCUITest that relies on index-based queries instead of identifiers.

## Testing

- **XCTest for unit tests** — test model logic, relationships, computed properties. Use in-memory ModelContainer.
- **XCUITest for UI tests** — test real user flows through the app. Always use `--uitesting` launch argument.
- **Tests must cover the core user loop** — at minimum: onboarding → create primary entity → view it → navigate.
- **Violation:** No UI tests. Tests that depend on persistent state from previous runs.

## Build

- **Project must build from CLI** with `xcodebuild`. No manual Xcode intervention required.
- **Use XcodeGen** (`project.yml`) for project generation when possible — keeps the `.xcodeproj` reproducible.
- **Target iOS 17+.** No backwards compatibility hacks.
