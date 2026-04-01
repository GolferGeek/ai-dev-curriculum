# Plan — Twitter Killer (iOS A)

Source PRD: `docs/artifacts/prd-twitter.md`
Source intention: `docs/artifacts/intention-twitter.md`

## Milestones

### Milestone 1: SwiftData models (User, Post, Follow)

**Agent:** ios-builder

**What gets built:**
- SwiftData `@Model` classes: `User` (name, handle, bio, avatarData, createdAt), `Post` (text, timestamp, author relationship to User), `Follow` (follower/followed relationships to User)
- ModelContainer configuration in the App entry point
- Support for `--uitesting` launch argument: in-memory SwiftData store + cleared UserDefaults for test isolation

**Files created:**
- `apps/twitter-killer/twitter-killer/Models/User.swift`
- `apps/twitter-killer/twitter-killer/Models/Post.swift`
- `apps/twitter-killer/twitter-killer/Models/Follow.swift`
- `apps/twitter-killer/twitter-killer/TwitterKillerApp.swift`

**Verification:**
```
xcodebuild -scheme twitter-killer -destination 'platform=iOS Simulator,name=iPhone 16' build
```

**PRD goals covered:** G6 (Persistence)

---

### Milestone 2: SwiftUI views

**Agent:** ios-builder

**What gets built:**
- `OnboardingView` — name + handle text fields, Get Started button, saves User to SwiftData, stores flag in UserDefaults
- `MainTabView` — TabView with Feed, Compose, Profile tabs
- `FeedView` — reverse-chronological posts from followed users + self, empty state, navigation to user profiles
- `ComposeView` — text input + Post button, creates Post in SwiftData
- `ProfileView` — current user stats (name, handle, post count, follower/following counts), edit profile, sign out, link to Discover Users
- `UserProfileView` — other user's profile with follow/unfollow toggle and their posts
- `DiscoverUsersView` — list of all users with follow/unfollow buttons
- `PostCellView` — reusable post cell (author name, handle, timestamp, text)
- Accessibility identifiers on all interactive elements for XCUITest

**Files created:**
- `apps/twitter-killer/twitter-killer/Views/OnboardingView.swift`
- `apps/twitter-killer/twitter-killer/Views/MainTabView.swift`
- `apps/twitter-killer/twitter-killer/Views/FeedView.swift`
- `apps/twitter-killer/twitter-killer/Views/ComposeView.swift`
- `apps/twitter-killer/twitter-killer/Views/ProfileView.swift`
- `apps/twitter-killer/twitter-killer/Views/UserProfileView.swift`
- `apps/twitter-killer/twitter-killer/Views/DiscoverUsersView.swift`
- `apps/twitter-killer/twitter-killer/Views/PostCellView.swift`

**Verification:**
```
xcodebuild -scheme twitter-killer -destination 'platform=iOS Simulator,name=iPhone 16' build
```

**PRD goals covered:** G1 (Onboarding), G2 (Post creation), G3 (Timeline feed), G4 (User profiles), G5 (Follow system)

---

### Milestone 3: XCTest unit tests + XCUITest UI tests

**Agent:** ios-builder

**What gets built:**
- XCTest target with unit tests for model creation, follow/unfollow, timeline filtering
- XCUITest target with UI tests for onboarding flow, compose + post, feed display, profile display
- Both test targets registered in `project.yml`

**Files created:**
- `apps/twitter-killer/twitter-killerTests/UserTests.swift`
- `apps/twitter-killer/twitter-killerTests/PostTests.swift`
- `apps/twitter-killer/twitter-killerTests/FollowTests.swift`
- `apps/twitter-killer/twitter-killerTests/TimelineTests.swift`
- `apps/twitter-killer/twitter-killerUITests/OnboardingUITests.swift`
- `apps/twitter-killer/twitter-killerUITests/ComposeUITests.swift`
- `apps/twitter-killer/twitter-killerUITests/FeedUITests.swift`
- `apps/twitter-killer/twitter-killerUITests/ProfileUITests.swift`

**Verification:**
```
xcodebuild -scheme twitter-killer -destination 'platform=iOS Simulator,name=iPhone 16' build test
```

**PRD goals covered:** All goals verified via tests

---

## Verification (final)

```bash
cd apps/twitter-killer
xcodebuild -scheme twitter-killer -destination 'platform=iOS Simulator,name=iPhone 16' build test
```

## Risks

1. **XcodeGen version mismatch** — Mitigate by using simple project.yml with minimal config.
2. **SwiftData relationship complexity** — Follow model needs explicit follower/followed without inverse conflicts. Mitigate by avoiding bidirectional inverses and using manual queries.
3. **Simulator availability** — The named simulator may not exist. Mitigate by checking `xcrun simctl list devices available` and using whatever iPhone is available.
4. **UI test flakiness** — SwiftUI animations can cause timing issues. Mitigate by using `--uitesting` launch argument for in-memory store and adding `waitForExistence` calls.
