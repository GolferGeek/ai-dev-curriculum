# PRD — Twitter Killer (iOS A)

Source intention: `docs/artifacts/intention-twitter.md`

## Summary

A local-first iOS micro-blog app built with SwiftUI and SwiftData. Users create a profile, compose short text posts, follow other users, and read a reverse-chronological timeline filtered to people they follow. The app ships as a multi-screen TabView experience with real persistence -- no server required.

## Goals

Each goal traces to a Demo-grade minimum in the intention.

### G1 — Onboarding (Intention #1: Onboarding / Auth)

The app detects whether a local user profile exists. If not, it presents an onboarding screen requiring name (non-empty) and handle (non-empty). After saving, the user lands on the main tab view. On subsequent launches the onboarding is skipped.

**Acceptance criteria:**
- First launch shows onboarding screen with name and handle text fields and a "Get Started" button.
- Button is disabled until both fields are non-empty.
- After completing onboarding, the main tab view is displayed.
- Restarting the app skips onboarding and goes directly to the main tab view.

### G2 — Post creation (Intention #2: Post creation)

A compose tab lets the user write a text post and publish it. The post is saved to SwiftData with the current user as author and the current timestamp.

**Acceptance criteria:**
- Compose tab contains a text editor and a "Post" button.
- Post button is disabled when text is empty.
- Tapping Post saves the post and clears the text field.
- The new post appears in the feed immediately.

### G3 — Timeline feed (Intention #3: Timeline feed)

The feed tab shows a reverse-chronological list of posts from users the current user follows, plus the current user's own posts.

**Acceptance criteria:**
- Posts are ordered newest-first.
- Only posts from followed users and self are shown.
- Each post cell displays author name, handle, timestamp, and text.
- An empty state message is shown when no posts exist.

### G4 — User profiles (Intention #4: User profiles)

Tapping a user name/avatar in the feed navigates to that user's profile showing name, handle, post count, their posts, and a follow/unfollow button (hidden on own profile).

**Acceptance criteria:**
- Profile view shows name, handle, and post count.
- A list of that user's posts is displayed below the profile info.
- Follow/unfollow button is visible on other users' profiles.
- Own profile is accessible via the Profile tab with edit and sign-out options.

### G5 — Follow system (Intention #5: Follow system)

Users can follow and unfollow other users. Follow state is persisted. The timeline respects follow relationships.

**Acceptance criteria:**
- Tapping "Follow" on a user profile creates a Follow relationship in SwiftData.
- Tapping "Unfollow" removes the Follow relationship.
- The feed immediately reflects follow/unfollow changes.
- A "Discover Users" view lists all users so the current user can find people to follow.

### G6 — Persistence (Intention #6: Persistence)

All data is stored in SwiftData. Users, Posts, and Follow relationships survive app termination and relaunch.

**Acceptance criteria:**
- After creating a profile, posting, and following users, force-quit and relaunch shows all data intact.
- SwiftData models: User, Post, Follow with appropriate relationships.

## Non-goals

- Push notifications
- Real-time streaming / WebSocket feed
- Direct messages
- Content moderation or reporting
- Android version
- Server sync / SurrealDB
- Likes, image attachments, reply threads, search
- iPad or macOS layout optimization

## Success criteria

1. `xcodebuild build` succeeds with zero errors.
2. `xcodebuild test` passes all XCTest and XCUITest targets.
3. The full user flow works: launch -> onboard -> post -> discover users -> follow -> see filtered feed.
4. App has multiple screens via TabView (Feed, Compose, Profile) plus navigation to UserProfile and DiscoverUsers.
5. Data persists across simulated app restarts.

## Test expectations

### XCTest (unit tests)

- **testUserCreation** — Create a User model, verify properties are set correctly.
- **testPostCreation** — Create a Post with an author relationship, verify author and timestamp.
- **testFollowAndUnfollow** — Create a Follow, verify follower/followed. Delete the Follow, verify removal.
- **testTimelineFiltering** — Create multiple users and posts. Verify that filtering posts to followed users + self returns the correct set.

### XCUITest (UI tests)

- **testOnboardingFlow** — Launch fresh, verify onboarding appears, fill in name and handle, tap Get Started, verify main tab view appears.
- **testComposeAndPost** — Navigate to compose tab, type text, tap Post, verify post appears in feed.
- **testFeedDisplay** — Verify feed tab shows posts in reverse-chronological order.
- **testProfileDisplay** — Navigate to profile tab, verify name and handle are displayed.

## Open questions

1. Should there be a character limit on posts (like Twitter's 280)? Decision: no limit for v1, keep it simple.
2. Should the "Discover Users" screen be a separate tab or accessible from navigation? Decision: accessible via a button in the feed or profile, not a separate tab.
