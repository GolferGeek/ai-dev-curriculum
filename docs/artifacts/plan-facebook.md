# Plan -- Facebook Killer (iOS B)

**PRD:** [docs/artifacts/prd-facebook.md](./prd-facebook.md)
**Intention:** [docs/artifacts/intention-facebook.md](./intention-facebook.md)

## Milestones

### Milestone 1: SwiftData Models -- **ios-builder**

Build the data layer with four SwiftData @Model classes and a sample-data seeder.

**What gets built:**
- `User` -- name, bio, avatarData (optional Data), isCurrentUser flag
- `Post` -- text, photoData (optional Data), timestamp, author relationship to User, computed likeCount
- `Friendship` -- fromUser/toUser relationships, statusRaw string (pending/accepted/declined) for #Predicate compatibility
- `Like` -- user/post relationships (unique constraint: one like per user per post)
- `SampleData` -- static helper that inserts demo users, friendships, and posts

**Files created:**
- `apps/facebook-killer/project.yml` (XcodeGen spec)
- `apps/facebook-killer/facebook-killer/App/FacebookKillerApp.swift`
- `apps/facebook-killer/facebook-killer/Models/User.swift`
- `apps/facebook-killer/facebook-killer/Models/Post.swift`
- `apps/facebook-killer/facebook-killer/Models/Friendship.swift`
- `apps/facebook-killer/facebook-killer/Models/Like.swift`
- `apps/facebook-killer/facebook-killer/Helpers/SampleData.swift`

**Verification:**
```bash
cd apps/facebook-killer && xcodegen generate
xcodebuild -scheme facebook-killer -destination 'platform=iOS Simulator,name=iPhone 16' build
```

### Milestone 2: SwiftUI Views -- **ios-builder**

Build the full view layer: onboarding, tab-based navigation, feed, compose, friends, and profile screens.

**What gets built:**
- `OnboardingView` -- name + bio required fields, optional photo, sample-data toggle, "Create Profile" button
- `MainTabView` -- TabView with 4 tabs: Feed, Compose, Friends, Profile
- `FeedView` -- scrollable list of posts from friends + self, like button, empty state
- `ComposeView` -- text editor + optional photo picker, "Post" button
- `FriendsView` -- three sections: Pending Requests, My Friends, Discover
- `ProfileView` -- own profile with edit mode, friend count, user's posts
- `UserProfileView` -- other user's profile with Add Friend / Unfriend button
- Accessibility identifiers on ALL interactive views for XCUITest

**Files created:**
- `apps/facebook-killer/facebook-killer/Views/OnboardingView.swift`
- `apps/facebook-killer/facebook-killer/Views/MainTabView.swift`
- `apps/facebook-killer/facebook-killer/Views/FeedView.swift`
- `apps/facebook-killer/facebook-killer/Views/ComposeView.swift`
- `apps/facebook-killer/facebook-killer/Views/FriendsView.swift`
- `apps/facebook-killer/facebook-killer/Views/ProfileView.swift`
- `apps/facebook-killer/facebook-killer/Views/UserProfileView.swift`
- `apps/facebook-killer/facebook-killer/Views/PostRowView.swift`

**Verification:**
```bash
xcodebuild -scheme facebook-killer -destination 'platform=iOS Simulator,name=iPhone 16' build
```

### Milestone 3: XCTest Unit Tests + XCUITest UI Tests -- **ios-builder**

Add both test targets with full coverage of PRD test expectations.

**What gets built:**
- XCTest: model creation, friend request lifecycle, like/unlike, feed filtering
- XCUITest: onboarding flow, compose + post, feed display, friends tab, profile view
- `-UITest` launch argument support for in-memory SwiftData

**Files created:**
- `apps/facebook-killer/facebook-killerTests/ModelTests.swift`
- `apps/facebook-killer/facebook-killerUITests/UITests.swift`

**Verification:**
```bash
xcodebuild -scheme facebook-killer -destination 'platform=iOS Simulator,name=iPhone 16' build test
```

## Goal-to-milestone traceability

| PRD Goal | Milestone |
|----------|-----------|
| G1 Onboarding | M2 (OnboardingView), M3 (testOnboardingFlow) |
| G2 Feed | M1 (Post model), M2 (FeedView), M3 (testFeedDisplay) |
| G3 Post Creation | M1 (Post model), M2 (ComposeView), M3 (testComposeAndPost) |
| G4 Profiles | M1 (User model), M2 (ProfileView, UserProfileView), M3 (testProfileView) |
| G5 Friends | M1 (Friendship model), M2 (FriendsView), M3 (testFriendsTab) |
| G6 Persistence | M1 (SwiftData models), M3 (-UITest in-memory toggle) |

## Risks

1. **XcodeGen version mismatch** -- Mitigate: use simple project.yml, test generation before building.
2. **SwiftData #Predicate limitations** -- Mitigate: use raw string for Friendship status instead of enum.
3. **Simulator availability** -- Mitigate: query `xcrun simctl list` and fall back to available device.
4. **PhotosPicker requires iOS 16+** -- Mitigate: targeting iOS 17+, no risk.

## Final verification

```bash
cd apps/facebook-killer
xcodegen generate
xcodebuild -scheme facebook-killer -destination 'platform=iOS Simulator,name=iPhone 16' build test
```

## Next step

Execute with `/run-plan docs/artifacts/plan-facebook.md`.
