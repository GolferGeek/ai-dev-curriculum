# PRD -- Facebook Killer (iOS B)

**Intention:** [docs/artifacts/intention-facebook.md](./intention-facebook.md)

## Summary

A private-circle social networking iOS app built with SwiftUI and SwiftData. Users create a local profile, connect with friends via requests, post text and photo updates, and browse a reverse-chronological feed of their circle's activity. The app targets iOS 17+ and persists all data locally with SwiftData.

## Goals

Each goal traces to a Demo-grade minimum from the intention.

### G1 -- Onboarding (Intention #1: Onboarding / Auth)

The app detects whether a current user profile exists on launch. If none exists, the user sees an onboarding screen.

**Acceptance criteria:**
- AC1.1: First launch shows OnboardingView with name field (required), bio field (required), optional photo picker, and a "Create Profile" button.
- AC1.2: "Create Profile" is disabled until name and bio are non-empty.
- AC1.3: After profile creation the app navigates to MainTabView and never shows onboarding again (until data is cleared).
- AC1.4: A toggle on the onboarding screen seeds sample data (users, posts, friendships) for demo purposes.

### G2 -- Feed (Intention #2: Feed)

A scrollable, reverse-chronological feed of posts from the current user and their accepted friends.

**Acceptance criteria:**
- AC2.1: FeedView shows posts sorted newest-first.
- AC2.2: Each post cell displays: author name, post text, optional photo, relative timestamp, like count.
- AC2.3: Only posts from accepted friends and the current user appear.
- AC2.4: A like button on each post toggles like/unlike for the current user and updates the count immediately.
- AC2.5: Feed is empty-state aware ("No posts yet").

### G3 -- Post Creation (Intention #3: Post creation)

Users compose and publish posts with text and optional photos.

**Acceptance criteria:**
- AC3.1: ComposeView has a text field (required) and an optional photo picker button.
- AC3.2: "Post" button is disabled until text is non-empty.
- AC3.3: After posting, the user returns to the feed and the new post appears at the top.

### G4 -- Profiles (Intention #4: Profiles)

View and edit profiles.

**Acceptance criteria:**
- AC4.1: ProfileView (own) shows name, bio, avatar, friend count, and the user's posts.
- AC4.2: ProfileView has an "Edit Profile" mode to update name, bio, and avatar.
- AC4.3: UserProfileView (others) shows name, bio, avatar, friend count, their posts, and an "Add Friend" or "Unfriend" button depending on friendship state.

### G5 -- Friends (Intention #5: Friends)

Friend request lifecycle and friend list management.

**Acceptance criteria:**
- AC5.1: FriendsView shows three sections: Pending Requests (incoming), My Friends, Discover (non-friend users).
- AC5.2: User can send a friend request from Discover or from another user's profile.
- AC5.3: User can accept or decline a pending request.
- AC5.4: User can unfriend an existing friend.
- AC5.5: Feed updates to reflect friendship changes (new friend's posts appear, unfriended user's posts disappear).

### G6 -- Persistence (Intention #6: Persistence)

All data survives app restart.

**Acceptance criteria:**
- AC6.1: SwiftData models for User, Post, Friendship, Like are stored in a persistent container.
- AC6.2: Killing and relaunching the app preserves all profiles, posts, friendships, and likes.
- AC6.3: When launched with `-UITest` argument, the app uses an in-memory SwiftData store (for test isolation).

## Non-goals

- Push notifications
- Real-time messaging / chat
- Stories or ephemeral content
- Content moderation or admin controls
- Android version
- Server sync (SurrealDB or otherwise)
- Comments on posts
- Photo gallery view on profiles
- Reactions beyond simple like
- Pagination / infinite scroll (all posts load at once for demo)

## Success criteria

1. `xcodebuild build` succeeds with zero errors for the facebook-killer scheme.
2. `xcodebuild test` passes all XCTest unit tests and XCUITest UI tests.
3. A user can complete the full flow: onboarding -> add friend -> compose post -> see post in feed -> like post -> view profile.
4. Data persists across simulated app restarts.

## Test expectations

### XCTest unit tests (facebook-killerTests target)

- **testUserCreation** -- Create a User, verify properties.
- **testPostCreation** -- Create a Post with author relationship, verify computed likeCount.
- **testFriendRequestLifecycle** -- Send request (pending), accept (accepted), unfriend (delete). Verify status transitions.
- **testLikeUnlike** -- Like a post, verify likeCount increments. Unlike, verify it decrements.
- **testFeedFiltering** -- Verify only posts from friends and self are returned.

### XCUITest UI tests (facebook-killerUITests target)

- **testOnboardingFlow** -- Launch app, fill name + bio, create profile, verify main tabs appear.
- **testComposeAndPost** -- Compose a post with text, submit, verify it appears in the feed.
- **testFeedDisplay** -- With sample data, verify feed shows posts with author, text, timestamp, like count.
- **testFriendsTab** -- Navigate to Friends tab, verify sections (pending, friends, discover) are visible.
- **testProfileView** -- Navigate to Profile tab, verify name, bio, friend count are displayed.

## Open questions

1. Should the sample-data toggle create a fixed set of users/posts or randomize? (Decision: fixed set for deterministic testing.)
2. Maximum photo size / compression? (Decision: defer -- use raw Data from PhotosPicker for now.)

## Next step

Pass this file to `/plan`:
```
/plan docs/artifacts/prd-facebook.md
```
