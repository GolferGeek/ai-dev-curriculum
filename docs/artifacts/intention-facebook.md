# Intention -- Facebook Killer (iOS B) -- Refined

## Why this exists

Facebook devolved into ads, algorithmic noise, and distant acquaintances. A **private circle app** restores what made social networking valuable: **sharing moments with people you actually care about** -- family, close friends, a small community -- without surveillance or noise.

This track demonstrates **rich iOS development**: SwiftUI with profiles, connections, a feed, media handling, and SwiftData persistence -- a credible product slice, not a starter screen.

## Who it's for

Families, friend groups, or small communities (5-50 people) who want a **private social space** to share updates, photos, and life events with their actual circle rather than a public audience.

## Demo-grade minimums (non-negotiable for "done")

The app ships as a **multi-screen TabView app**, not a single view.

1. **Onboarding / Auth** -- Local user profile creation on first launch: name (required), bio (required), optional avatar photo. App launches into onboarding if no current user exists, then transitions to main tabs.
2. **Feed** -- Scrollable feed of posts from friends and self, reverse-chronological. Each post shows: author name, text, optional photo, timestamp, like count, and a like button.
3. **Post creation** -- Compose a post with text (required) and optional photo. Posts appear in the feed immediately after creation.
4. **Profiles** -- View your own profile and other users' profiles. Shows name, bio, friend count, and their posts. Edit your own profile (name, bio, avatar).
5. **Friends** -- Send friend request, accept/decline pending requests, unfriend. Feed filters to posts from accepted friends and yourself.
6. **Persistence** -- SwiftData for all local storage. Profiles, posts, friendships, and likes survive app restart.

## Out of scope

- Push notifications
- Real-time messaging / chat
- Stories or ephemeral content
- Content moderation or admin controls
- Android version
- SurrealDB sync (deferred to optional future milestone)
- Comments on posts
- Photo gallery view on profiles
- Reactions beyond simple like

## Success

A user can **set up a profile, add friends, post an update with an optional photo, like posts, and browse a feed of their friends' posts** -- and the app feels like a **credible private social network**, not a UIKit table view demo. It builds clean, tests pass, and SwiftData persistence works across restarts.

## Next step

Pass this file to `/prd` to produce the PRD:
```
/prd docs/artifacts/intention-facebook.md
```
