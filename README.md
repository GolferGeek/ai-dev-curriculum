# AI Development Curriculum (Starter Kit)

Open-source curriculum and starter codebase for AI-assisted development with **agents**, **skills**, and **commands** (Claude Code–first; patterns apply across tools).

**Status:** In development. Phase-by-phase user guides and prompts will land here as each milestone ships.

**Phase 00:** [docs/phase-00/README.md](./docs/phase-00/README.md) — **Part A:** Turbo monorepo + **Part B:** one app track (learners) or **all tracks** (maintainer reference apps). **Starter kit map:** [docs/phase-00/STARTER-KIT.md](./docs/phase-00/STARTER-KIT.md). **Run in order:** [docs/phase-00/RUN-ORDER.md](./docs/phase-00/RUN-ORDER.md). **Prerequisites:** [docs/phase-00/PREREQUISITES.md](./docs/phase-00/PREREQUISITES.md). **Verify:** `./scripts/verify-curriculum-structure.sh` — [docs/phase-00/VERIFY.md](./docs/phase-00/VERIFY.md). **Demo bar (what “done” means):** [docs/phase-00/DEMO-GRADE-BAR.md](./docs/phase-00/DEMO-GRADE-BAR.md).

**This tree (checkpoint):** there is **no** root `package.json` workspace, **no** Turbo, and **no** `apps/` yet — only **documentation and `.claude/`**. Intentions describe what **`/run-plan`** must build next. After Part A/B land, follow [VERIFY.md](./docs/phase-00/VERIFY.md) for `npm install`, `npm run build`, and `npm run test`.

Maintainers: internal build specs and PRD live in **`.docs/`** (listed in `.gitignore` and not published in the public clone).

---

## 0.0 intention — **demo-grade** React apps (show what agents can do)

This repo is meant to **impress**: with strong intentions, skills, and prompts, teams should ship **credible product slices** quickly—not a single “starter page” per app with a track badge and two bullet points.

### What ships

- **Vite + React** (or equivalent) under **`apps/<name>`** for each track you maintain. **No** Node-only scripts that only write `dist/app.txt` unless the PRD explicitly demands a CLI-only slice.
- **Product-shaped UIs** — each app implements its **track intention** ([HTTP](./docs/phase-00/intention-http-workspace.md), [Wiki](./docs/phase-00/intention-team-wiki.md), [CRM](./docs/phase-00/intention-pipeline-crm.md), [Ops](./docs/phase-00/intention-ops-pulse.md)) through **real workflows**: navigation or multiple panels, forms, lists, persistence where the intention requires it (**`localStorage` is fine** for class).
- **Cross-cutting bar** — [docs/phase-00/DEMO-GRADE-BAR.md](./docs/phase-00/DEMO-GRADE-BAR.md) defines what **is not enough** (e.g. one static hero) and what **counts as demo-grade**. Track files add **numbered minimums** for that product.

### What “rolled back” means here

If an implementation pass only produces **static marketing-style screens**, treat that as **not meeting 0.0**—use the **checkpoint** rollback in this README, **tighten docs or prompts** (intentions, agents, this section), then re-run. **Do not** lower the bar to “React mount + title.” The goal is to show **speed to quality**, not speed to empty shells.

### Run, browser, tests

- **After build:** **run** the app (`npm run dev`, `turbo run dev`, `vite preview` as documented) and **use it in a real browser** (Chrome or equivalent). CLI-only green is **not** enough for “done.”
- **Tests:** **build + unit/smoke** per app, plus **Playwright (Chromium)** (or equivalent) **through at least one user-visible workflow** per intent—not only “heading is visible.” See [VERIFY.md](./docs/phase-00/VERIFY.md).
- If results are still placeholder stubs, **iterate** using the maintainer loop below until this README plus **`docs/phase-00/`** produce **demo-grade** apps.

---

## Maintainer loop — README-driven build until green

Anyone (human or agent) should be able to start from **clone + this README + `docs/phase-00/`** and reproduce the monorepo and apps **without hidden chat context**. If a run fails, **don’t stack fixes on a dirty guess** — **reset to the checkpoint**, **improve the repo** (README, scripts, configs), **commit + push**, and run the flow again.

1. **Follow** this README and `docs/phase-00/` end-to-end (plus committed `.claude/`).
2. **Build** everything the docs imply (`npm install`, monorepo, apps, tests).
3. **If it fails** — or the result is still a **starter shell** when **demo-grade React** (per [DEMO-GRADE-BAR.md](./docs/phase-00/DEMO-GRADE-BAR.md) and track **intention-*.md** files) was required:
   - **Rollback** to the **checkpoint commit** (see below):  
     `git fetch origin && git reset --hard origin/main`  
     (if `main` is the checkpoint), or:  
     `git reset --hard <checkpoint-SHA>`
   - **Edit** what was wrong — usually **README**, **`docs/phase-00/intention-*.md`**, **`docs/phase-00/DEMO-GRADE-BAR.md`**, `.claude/agents/`, `docs/phase-00/VERIFY.md`, `CLAUDE.md`, or scripts — so the *next* attempt targets **real workflows**, not one static screen per app.
   - **Commit** and **push**.
4. **Run the README path again** from a fresh mindset (new clone optional).
5. **Repeat** until all of the following pass:
   - `npm run build`, `npm run test` (or documented equivalents)
   - **The app is running** (dev or preview) and **checked in a browser** — manually and/or via Playwright as documented in `docs/phase-00/VERIFY.md`

**Checkpoint commit (rollback while developing):** discard failed implementation and return to **documented-only** instructions (no `apps/` or Turbo in tree yet — **not** tag `0.0` — see below). The checkpoint is the commit whose message starts with **`docs: demo-grade bar, strong track intentions, README checkpoint`**.

```bash
git fetch origin
git reset --hard "$(git rev-list -n 1 --grep='^docs: demo-grade bar, strong track intentions, README checkpoint' --all)"
```

If that ever matches more than one commit, pick the intended one with `git log --oneline --grep='demo-grade bar'`. Optional: maintainers may tag that commit as **`docs-checkpoint`**, then `git reset --hard docs-checkpoint`.

---

## Tag **`0.0`** (and optional branch **`00`**) — the learner starting point

**Intention:** A learner **pulls the repo**, **checks out `0.0`** (or branch **`00`** — same commit), pastes prompts **by hand**, and it **works** because maintainers **already walked the full README path** and said: *“That’s the commit we want to start from.”*

**When you’re done testing** (all the way through — build, tests, browser if documented):

1. **Confirm** you’re on the winning commit and it’s green: `git rev-parse HEAD`
2. **Tag that exact commit** — not a guess, the SHA you validated:
   ```bash
   git tag -a 0.0 -m "Validated: README + docs path works end-to-end"
   git push origin 0.0
   ```
   (Use `0.0.0` if you prefer three-part tags.)
3. **Optional — branch `00`** so instructions can say “go to branch `00`”:
   ```bash
   git branch 00 0.0
   git push origin 00
   ```
4. **Learners:** `git clone … && git checkout 0.0` **or** `git checkout 00` — same tree, **proven** by your run-through.

**Relationship:** The **checkpoint SHA** above (full hash in the code block) is for **rolling back failed implementation** while you’re still building toward `0.0`. Tag **`0.0`** lands on the commit **after** you’ve finished that work and **validated** it — the **published** “start here” snapshot.

---
