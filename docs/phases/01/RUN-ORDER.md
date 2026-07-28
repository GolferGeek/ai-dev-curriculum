# Run order — Phase 01

## Before you start

- [ ] Phase 00 complete (monorepo + one app track working)
- [ ] [PREREQUISITES.md](./PREREQUISITES.md) — SurrealDB installed (`surreal version`)
- [ ] Read [OVERVIEW.md](./OVERVIEW.md) — today · learn · leave with
- [ ] Instructors: [TEACHING.md](./TEACHING.md) for Act I/II timing and auth reflect script
- [ ] (Optional) Chrome + Claude-in-Chrome for `/test-browser`
- [ ] (iOS opt-in only) Xcode 26+ on Mac

---

## Part A — Pipeline build

Pick one killer — [README § Pick your SaaS killer](./README.md#pick-your-saas-killer). **Class default:** all tracks as **Next.js + SurrealDB web**.

| Step | What to type | What happens |
|------|-------------|-------------|
| 1 | *(Optional)* `/research "your idea"` | Draft intention for a **custom** killer via saas-researcher. Skip if using provided intention. |
| 2 | `/intention docs/phases/01/intention-<track>.md` | Reviews intention. Outputs `docs/artifacts/intention.md`. |
| 3 | `/prd docs/artifacts/intention.md` | PRD from intention. Outputs `docs/artifacts/prd.md`. |
| 4 | **Challenge pass** — PRD covers every Demo-grade minimum? Auth + per-user data explicit? | Fix before `/plan`. |
| 5 | `/plan docs/artifacts/prd.md` | Plan with **surrealdb-builder** before app builder. Outputs `docs/artifacts/plan.md`. |
| 6 | **Challenge pass** — plan assigns agents in order? Verification includes isolation? | Fix before `/run-plan`. |
| 7 | `/run-plan docs/artifacts/plan.md` | SurrealDB + auth, then app. ~60–90 min. |
| 8 | Ensure SurrealDB is running; start the app per agent output | App reachable in browser |

Replace `<track>` with: `quickbooks-killer`, `trello-killer`, `twitter-killer`, or `facebook-killer`.

### Skill chain at a glance

```
/intention docs/phases/01/intention-quickbooks-killer.md  →  intention.md
/prd docs/artifacts/intention.md                          →  prd.md
/plan docs/artifacts/prd.md                               →  plan.md
/run-plan docs/artifacts/plan.md                          →  apps/<killer> + DB layer
```

See [COMMANDS.md](./COMMANDS.md) for `/research` and `/test-browser`.

---

## Part B — Prove auth (required — this is the lesson)

Do not skip. See [VERIFY.md](./VERIFY.md) for full checklist.

| Step | What to do | Pass |
|------|-----------|------|
| 9 | **Auth chain walk** — signup → sign-in → protected app → sign out | Each link works on the running app |
| 10 | **Persist** — create domain data; refresh browser | Data survives |
| 11 | **Second user** — create user A with distinctive data; sign out; create user B | B does **not** see A's data (lists, dashboard, direct URLs) |
| 12 | **Signed-out access** — hit protected page/API without session | Rejected or redirected |
| 13 | `npm run build` && `npm run test` (web) or `xcodebuild build test` (iOS opt-in) | Green |
| 14 | `/test-browser` (web) or Simulator walkthrough | Visual QA matches manual chain |
| 15 | Line-by-line check vs intention **Demo-grade minimums** + [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md) | All required items true |

**Instructor:** run step 11 **in the room** — prediction vs reality on auth weaknesses from before the build.

---

## If something fails

| Problem | Action |
|---------|--------|
| Build/compile errors | Fix forward or `/fix-errors` if Phase 02 skills available; else agent or manual fix |
| Fake login / no DB | Stop — reset plan/PRD; intention auth requirements missing |
| B sees A's data | **Auth failure** — fix scopes/queries; re-run from `/harden` or plan; re-test step 11 |
| SurrealDB not running | Start DB per prerequisites; restart app |
| Plan skipped DB agent | Regenerate `/plan` — surrealdb-builder must be first |
| Wrong product scope | Challenge pass failed — go back to `/prd` or intention |

---

## After Phase 01

- **Phase 02:** `/scan-errors` → `/monitor` → `/commit` on this app — would a reviewer approve it?
- **Portfolio:** add `docs/projects/<killer>/` when promoting the product narrative — [projects/README.md](../../projects/README.md)
