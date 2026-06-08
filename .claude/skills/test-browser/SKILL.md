---
description: Visually test a running app in Chrome — navigate, interact, verify UI, capture screenshots or GIFs.
---

# /test-browser

When the user runs this command:

1. Check that the app is running (e.g. `npm run dev` or Xcode simulator). If not, suggest how to start it.
2. Use the **Chrome browser tools** (`mcp__claude-in-chrome__*`) to:
   - Open the app URL in a new tab (default: `http://localhost:3000` or as specified).
   - Navigate through the core user flows defined in the intention/plan.
   - Verify that UI elements, data, and interactions work as expected.
   - Capture a **GIF** of the walkthrough if the user wants a demo artifact.
3. Report what **works**, what's **broken**, and what **doesn't meet the demo-grade bar**.
4. For **iOS apps**: remind the user to test in the Simulator; browser testing applies to the web companion or API endpoints if any.

This command is for **visual QA**, not automated test suites (use `npm run test` or `xcodebuild test` for those).

Arguments: `$ARGUMENTS` — optional URL or app name.
