# Intention — Twitter killer (iOS A)

## Why this exists

Social media is controlled by algorithms optimized for engagement, not connection. A **personal micro-blog app** on your phone gives you a clean, chronological feed where you control who you follow and what you see — no ads, no algorithm, no character-limit anxiety.

This track demonstrates **iOS-native development with AI**: agents should produce a **SwiftUI app with real persistence and multiple screens**, not a single-view placeholder.

## Who it's for

Anyone who wants a **personal or small-group micro-blog** — post thoughts, follow friends or family, read a chronological timeline. Think "Twitter for your circle" without the toxicity or platform risk.

## Demo-grade minimums (non-negotiable for "done")

Ship a **multi-screen app** (TabView or NavigationStack with distinct sections), not a single view.

1. **Auth** — Local user profile setup (name, handle, optional avatar). If SurrealDB sync is in scope: sign up / sign in flow. At minimum: app launches into profile creation on first run, then main feed.
2. **Post creation** — Compose and publish a post (text, timestamp, author). Posts appear immediately in the timeline.
3. **Timeline feed** — Scrollable, reverse-chronological list of posts from followed users (or all users in local mode). Pull-to-refresh or auto-update.
4. **User profiles** — View a user's profile (name, handle, post count). See their posts. Follow/unfollow toggle.
5. **Follow system** — Follow and unfollow users. Timeline filters to show only posts from followed users (plus your own).
6. **Persistence** — SwiftData for local storage. All posts, users, and follow relationships survive app restart.

## What "great" adds (when time allows)

- Like/heart on posts with count.
- Image attachments (photo picker).
- SurrealDB sync so data lives on a server and multiple devices can share.
- Reply threads.
- Search users or posts.

## Out of scope for the first version

- Push notifications.
- Real-time streaming / WebSocket feed.
- Direct messages.
- Content moderation or reporting.
- Android version.

## Success

A user can **launch the app, create a profile, post a thought, follow another user, and see a filtered timeline** — and the app feels like a **credible social client**, not a SwiftUI tutorial leftover.

## How this feeds PRD → plan → app

This file is the **product intention**. The PRD should restate each numbered **Demo-grade minimum** as a **requirement with testable acceptance criteria**. The plan should assign:
- **ios-builder** → Xcode project, SwiftData models (User, Post, Follow), SwiftUI views (TabView with Feed/Compose/Profile tabs, user profile view, post cell), xcodebuild validation.
- **surrealdb-builder** (optional) → if sync is in scope, tables (users, posts, follows) with auth scopes.

If anything is ambiguous, prefer the **stricter** reading and [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md).
