# Verify — Phase 01 (SaaS killer + auth chain)

Phase 01 proof is stricter than Phase 00: **real auth**, **real database**, **per-user isolation**. A green build with a fake login or shared data **fails** verification.

---

## Goals

1. **Phase 00 still valid** — monorepo structure and prior app(s) intact.
2. **Killer app demo-grade** — meets [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) and your track's **Demo-grade minimums** in `intention-*.md`.
3. **Auth-and-data chain holds** — including **second-user isolation** (manual breach test).
4. **Automated tests green** — Playwright (web) or XCTest (iOS opt-in) exercises the core loop, not just "page loads."

---

## 1. Structure script (always)

From repo root:

```bash
./scripts/verify-curriculum-structure.sh
```

Confirms Phase 01 docs, intentions, and `.claude/` agents/skills exist.

---

## 2. SurrealDB running (web tracks)

Before testing the app:

```bash
surreal version    # 2.x or 3.x
```

Database must be reachable the way your app expects (local file, memory, or Docker — see agent output / app README). If the app can't persist data, **stop** — fix SurrealDB before auth testing.

---

## 3. Build and test (web — class default)

From repo root:

```bash
npm run build
npm run test
```

| Check | Pass |
|-------|------|
| Build | Zero compile/type errors for your killer app |
| Tests | Playwright (or app test suite) runs **auth or core user loop** — not only static text assertions |

---

## 4. Auth chain walkthrough (manual — required)

On the **running app**, verify each link:

| # | Step | Pass criteria |
|---|------|----------------|
| 1 | **Sign up** | New account created; no silent failure |
| 2 | **Sign in** | Same credentials work after sign-out or fresh session |
| 3 | **Protected route** | Signed-out user **cannot** view dashboard / main app (redirect or 401) |
| 4 | **Persist** | Create a record (invoice, card, post, …); refresh browser — **still there** |
| 5 | **Sign out** | Session cleared; protected routes blocked again |

Optional: `/test-browser` — agent reports same flows visually.

---

## 5. Second-user isolation test (manual — required)

This is the **Phase 01 differentiator**. Do not skip.

| # | Step | Pass criteria |
|---|------|----------------|
| 1 | Create **user A**; add distinctive data (e.g. invoice "ACME-001") | A sees only A's data |
| 2 | Sign out; create **user B** | B's account separate |
| 3 | As B, browse lists, dashboards, detail URLs | **No** A data visible |
| 4 | As B, try A's record URL or ID if exposed | **Denied** — empty, 403, or not found |
| 5 | Signed out, hit protected API/page | **Rejected** |

**Fail** if B sees A's rows, or if auth is UI-only (API returns data without token). Fix via plan/intention — re-run builders — **re-test**.

Document what you tried in your PR or session notes — this is the evidence vibe engineering requires.

---

## 6. Verify against intention

Open your track's `intention-*.md` **Demo-grade minimums** line by line. Each numbered item must be **demonstrably true** on the running app. If one is "almost" — iterate or fix upstream artifacts.

Cross-check [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) **Reject** list — none apply.

---

## 7. iOS opt-in path only

If you built Twitter/Facebook on **SwiftUI + SwiftData** (Mac + Xcode):

```bash
xcodebuild -scheme <AppName> -destination 'platform=iOS Simulator,name=iPhone 17' build test
```

Same **auth + isolation** manual tests in Simulator — two accounts, two data sets.

---

## 8. Secrets and client bundle (spot check)

Open browser DevTools → Sources or Network. **Fail** if database URLs, service tokens, or admin keys appear in client JS. (See Escape.tech vibe-coding research — [lesson plan](../../../marketing/lesson-plans/phase-01.md).)

---

## “Wipe and retry”

Safe to delete: generated **`apps/<killer>`** folder and re-run `/run-plan` from a fixed plan.

Do **not** delete: `.claude/`, `docs/phases/01/`, killer **intentions**, `docs/artifacts/` until you've archived what you need.

---

## README-driven validation

If a maintainer cannot get from **Phase 00 done + PREREQUISITES + RUN-ORDER** to a verified killer app **without extra chat**, fix the docs and retry.

---

## What “done” means for instructors

Learner can explain (see [TALKING-POINTS.md](./TALKING-POINTS.md)):

- Why this is **not vibe coding**
- What **per-user isolation** means
- What they would **refuse to ship** before Phase 02 gates

See [TEACHING.md](./TEACHING.md) reflect block for live room execution.
