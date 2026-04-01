# Demo-grade bar — Phase 01

Same spirit as [phase 00](../phase-00/DEMO-GRADE-BAR.md), raised for a real stack.

## Reject

- Single static landing page or hero screen.
- Auth screen that doesn't actually authenticate (fake login).
- No database — still using localStorage or hardcoded data.
- Tests only assert page titles or "welcome" text.

## Require

- **Real auth flow**: sign up → sign in → see protected content. Logout works. Unauthenticated users get redirected.
- **Real data**: SurrealDB (web tracks) or SwiftData (iOS tracks) — create, read, update, delete cycle with persistence across sessions.
- **Multi-area UI**: dashboard/sidebar/nav + at least two distinct feature views (e.g. invoice list + invoice detail, board + card detail).
- **Error and empty states**: new user sees helpful empty state, not a broken page. Bad input shows errors.
- **Tests**: Playwright (web) or XCTest/XCUITest (iOS) exercising at least the core user loop — not just "page loads."

## Great (stretch)

- Polished responsive design.
- Real-time updates (SurrealDB `LIVE SELECT`).
- Multiple user roles or permissions.
- Data export/import.
- GIF or video demo captured with `/test-browser`.
