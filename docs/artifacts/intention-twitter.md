# Intention — Twitter Killer (iOS A) — Refined

Source: `docs/phase-01/intention-twitter-killer.md`

## Why

Social media feeds are dominated by engagement-optimizing algorithms that prioritize outrage over connection. A local-first micro-blog iOS app gives users a clean, chronological timeline where they control who they follow and what they see. No ads, no algorithm, no platform risk.

This track proves that AI agents can produce a multi-screen SwiftUI app with real SwiftData persistence, not a single-view placeholder.

## Who

People who want a private or small-group micro-blog: post thoughts, follow friends or family, and read a chronological timeline. "Twitter for your circle" without toxicity or corporate control.

## Demo-grade minimums

1. **Onboarding / Auth** -- On first launch the app presents a profile-creation screen requiring name and handle. After creation the user lands on the main feed. Profile persists across launches.
2. **Post creation** -- A compose screen with a text field and post button. Publishing a post attaches the current user as author with a timestamp and the post appears immediately in the feed.
3. **Timeline feed** -- A scrollable, reverse-chronological list of posts from followed users plus the current user. Empty state when no posts exist.
4. **User profiles** -- View any user's profile showing name, handle, post count, and a list of their posts. Follow/unfollow toggle visible on other users' profiles.
5. **Follow system** -- Follow and unfollow other users. The timeline filters to show only posts from followed users and the current user.
6. **Persistence** -- SwiftData stores all Users, Posts, and Follow relationships. Data survives app restart.

## Out of scope

- Push notifications
- Real-time streaming / WebSocket feed
- Direct messages
- Content moderation or reporting
- Android version
- Server sync / SurrealDB (first version is local-only)
- Likes, image attachments, reply threads, search

## Success

A user can launch the app, create a profile, post a thought, discover and follow another user, and see a filtered timeline of posts from people they follow. The app feels like a credible social client with multiple screens and real persistence, not a SwiftUI tutorial leftover.
