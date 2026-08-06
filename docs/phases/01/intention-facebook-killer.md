# Intention — Facebook killer (iOS B)

## Why this exists

Facebook became a firehose of ads, algorithmic posts, and distant acquaintances. A **private circle app** on your phone brings back what made it good in the first place: **sharing moments with people you actually care about** — family, close friends, a small community — without surveillance or noise.

This track demonstrates **richer iOS development**: agents should produce a **SwiftUI app with profiles, connections, a feed, and media**, not a contacts list with a blue theme.

> **Platform choice:** this supplied intention is the native reference, not a
> client requirement. A cohort may implement the same private-circle product
> as a web application. Preserve the numbered demo-grade minimums and rewrite
> platform-specific acceptance criteria, architecture, test plan, and builder
> assignment before implementation.

## Who it's for

Families, friend groups, or small communities (5–50 people) who want a **private social space** — share updates, photos, and life events with their actual circle, not a public audience.

## Demo-grade minimums (non-negotiable for "done")

Ship a **multi-screen app** (TabView or NavigationStack with distinct sections), not a single view.

1. **Auth** — Local user profile creation (name, bio, optional avatar/photo). If SurrealDB sync is in scope: sign up / sign in flow. At minimum: app launches into profile setup on first run.
2. **Feed** — Scrollable feed of posts from friends, reverse-chronological. Each post shows: author, text, optional photo placeholder, timestamp, like count.
3. **Post creation** — Compose a post with text and optional photo (from photo picker or placeholder). Posts appear in the feed immediately.
4. **Profiles** — View your own profile and others'. Shows name, bio, friend count, and their posts. Edit your own profile.
5. **Friends** — Send friend request, accept/decline, unfriend. Feed shows posts only from friends (and yourself).
6. **Persistence** — SwiftData for local storage. All profiles, posts, friendships, and likes survive app restart.

## What "great" adds (when time allows)

- Photo grid on profiles (gallery view of posts with images).
- Comments on posts.
- SurrealDB sync for multi-device or multi-user.
- Events or groups within the circle.
- Reactions beyond simple like (heart, laugh, etc.).

## Out of scope for the first version

- Push notifications.
- Real-time messaging / chat.
- Stories or ephemeral content.
- Content moderation or admin controls.
- A second platform in the same lab. Choose native iOS or web and prove that
  version well.

## Success

A user can **set up a profile, add friends, post an update, and browse a feed of their friends' posts** — and the app feels like a **credible private social network**, not a UIKit table view demo.

## How this feeds PRD → plan → app

This file is the **product intention**. The PRD should restate each numbered **Demo-grade minimum** as a **requirement with testable acceptance criteria**. The plan should assign:
- **ios-builder** → for the supplied native route: Xcode project, SwiftData models (User, Post, Friendship/FriendRequest, Like), SwiftUI views (TabView with Feed/Compose/Friends/Profile tabs, post detail, profile view, friend request list), xcodebuild validation.
- **nextjs-saas-builder** → for a web substitution: responsive routes and components, equivalent persisted domain models and authorization boundaries, plus build, lint, unit, and browser validation.
- **surrealdb-builder** (optional) → if sync is in scope, tables (users, posts, friendships, likes) with auth scopes and RELATE for friend connections.

If anything is ambiguous, prefer the **stricter** reading and [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md).
