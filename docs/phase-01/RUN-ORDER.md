# Run order — Phase 01

## Before you start

- [ ] Phase 00 complete (monorepo + one app track working)
- [ ] SurrealDB installed (`surreal version` prints 2.x+)
- [ ] (iOS tracks) Xcode 15+ installed (`xcodebuild -version`)
- [ ] (Optional) Chrome + Claude-in-Chrome extension for `/test-browser`

## Steps

1. **Pick your SaaS killer** — read the intention files in this folder. Choose Web A (QuickBooks), Web B (Trello), iOS A (Twitter), or iOS B (Facebook). Or run `/research custom` to scope your own.

2. **Refine intention** — `/intention` to review and tighten the provided intention for your track.

3. **Write PRD** — `/prd` to turn intention into requirements with acceptance criteria.

4. **Challenge pass** — Does every PRD goal trace to the intention? Are non-goals explicit? Fix before proceeding.

5. **Write plan** — `/plan` to create milestones. Plan should name which agents handle which steps.

6. **Challenge pass** — Does the plan justify the PRD? Does it cover demo-grade minimums? Fix before proceeding.

7. **Build** — `/run-plan` to execute. Agents build in order: SurrealDB layer → app layer.

8. **Verify build** — `npm run build` (web) or `xcodebuild build` (iOS).

9. **Run tests** — `npm run test` (web) or `xcodebuild test` (iOS).

10. **Visual QA** — `/test-browser` to walk through the app in Chrome (web tracks). iOS tracks: test in Simulator.

11. **Iterate** — Fix what's broken, re-run tests, re-test visually until demo-grade bar is met.
