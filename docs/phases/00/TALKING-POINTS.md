# Phase 00 — Talking points

*The concepts you should be able to explain — at a high level, in a sentence or two — after this phase. You never need to implement these by hand; you need to know them well enough to **steer**. Self-check: read each aloud and finish the sentence. Stuck on one? Ask your agent: "Explain ___ in 3–4 sentences, no jargon, with one analogy."*

## Who's teaching this (and what you're becoming)

- **Soledevelopreneur** — one builder with full responsibility (product, code, verification, delivery) using agents — no big platform team or internal AI enablement org behind you; that's who most learners are becoming.
- **AI scout** — someone in the weeds ahead of the room, trying tools and workflows, then reporting what's actually working *now* and where things are heading — nimble and professional, not a scaled training company with a frozen quarterly playbook.
- **Field notes, not doctrine** — this repo (`docs/`, `.claude/`, the phases) is trail markers from the last scout run; the **pipeline** (intention → PRD → plan → build → verify) outlasts any single model or harness, and the markers get updated when the terrain shifts.
- **Tempering the scout** — a scout finds many cool things; adoption has a cost (effort, migration, team attention). The discipline is matching excitement to what you already run and what change actually costs — not pivoting every time something new drops. From further back, *"Woo, this is cool!"* is often the fourth cool thing this week.
- **Process change vs. product development** — the goal is not to spend all your time retooling; it's to fold what survives the filter into a stable enough workflow to ship. This course is what held up after ~two years of that loop — find, try, keep, teach.
- **The new trade-off** — scoped builds got fast; **staying on top of harnesses and models is exhausting** (capability from intention through testing keeps improving weekly). The guardrails that don't shrink: **standards** (tech stack, coding, company, project), **correctness** (does what you specified), **proof** (properly tested). That work is **constant pruning** plus **periodic upheaval** when the terrain jumps. *(Phase 00 names this; the **guardrails** thread — gates, boundaries, skills in the repo — comes next in detail.)*

## Monorepo operating model (documents + skills)

- **Two layers** — **documents** (`docs/ai-program/`, `docs/artifacts/`, decisions) hold *what you believe and decided*; **skills & agents** (`.claude/`) hold *how the agent helps* — reviewed and merged like code, not lost in chat.
- **Memory vs context** — **memory** is the filing cabinet (decisions, artifacts, history); **context** is the desk (what the harness loads this session from memory + code + `@` files). Team truth is memory you wrote on purpose — not personal tool Memories.
- **Three scopes** — **corporate** (`docs/ai-program/`, `AGENTS.md`), **group** (`docs/groups/<name>/`), **project** (`docs/artifacts/` or `docs/projects/<name>/`, app code). Promote durable lessons up; archive stale project context.
- **AI engagement (two layers)** — **organizational:** leadership guardrails, program owner, skill steward, adoption ladder (aware → coach), planning/building culture — kit 10; **agent session:** boundaries and pipeline on each task — kits 03–05.
- **Jobs it covers** — decide policy, define work, build, verify, ship, understand brownfield, improve, adapt to change — scouting is one row, not the whole table.
- **Growing the system** — when a pattern repeats, `/author-agent` codifies it; when policy stabilizes, it moves into `docs/ai-program/`. The monorepo **compounds**.
- **Take-home map** — [MONOREPO-OPERATING-MODEL.md](../../MONOREPO-OPERATING-MODEL.md), [docs/ai-program/README.md](../../ai-program/README.md), [adoption kit](../../../marketing/adoption-kit/README.md) (ten templates).

## The pipeline (the heart of everything)

- **Bracket the work** — for any particular effort, **define** and **prove** bracket the agent's build: `( intention ) · build · ( build · lint · test · verify · browser )`. The middle is thin and fast **for well-scoped slices** — often under an hour in this course, not for every system you'll ever ship. A **full application** is many bracketed iterations; size each effort so both brackets are appropriate before you move on. Skipping any step in the closing bracket still fails.
- **Scoping** — acceleration applies to **well-scoped slices**, not every system you'll ever ship; the course deliberately sizes Phase 00 for often-under-an-hour builds and Phase 01 for ~two hours — bigger work takes longer, and knowing how to slice work is part of the skill.
- **Intention** — a short statement of what should exist and why, written *before* anything else; the quality of this conversation caps the quality of everything built after it.
- **PRD (product requirements doc)** — the intention turned into checkable goals; every goal should trace back to the intention.
- **Plan** — the PRD turned into ordered build steps with named owners (agents); nothing gets built that isn't in it.
- **The challenge pass** — your job at each step: read what the agent produced and ask "does this actually match what I meant?" before moving on.

## Git (the self-paced survival kit)

- **Repository / clone** — the project and your personal copy of it.
- **Branch** — your own line of work; you build on `my-phase-00`, never directly on a tag.
- **Tag** — a frozen snapshot; the phase tags are known-good starting states you branch *from*.
- **Commit** — a saved checkpoint with a message; commit when something works.

## The build

- **Monorepo** — one repository for multiple apps *and* the shared libraries they depend on (`packages/*`: UI kits, types, API clients, config); all apps consume the same source of truth instead of copy-pasting between repos. Industry example: Google keeps the vast majority of its code in one repo (Piper) so teams can share and refactor at scale — each product still deploys separately.
- **What you're handed in Phase 00** — a working Turbo monorepo shell, not just checklists; you can copy its layout and conventions into your own repo when you start building multiple products.
- **Turborepo** — a **task runner and cache** on top of npm workspaces (not a full platform like Nx or a giant build system like Bazel). It orchestrates `build`/`test`/`lint` across apps and packages in dependency order, runs tasks in parallel, and **caches unchanged work** — that's why the second root build is often near-instant. Simple setup: one `turbo.json` plus the scripts you already have.
- **Other monorepo tools (context only)** — **Nx** is a broader platform (plugins, generators, distributed CI); **Bazel/Buck** target polyglot repos at massive scale; **Lerna/Rush** emphasize publishing and enterprise policy. Turbo fits this course: capable, lightweight, easy to scaffold and feel the cache win on day one.
- **`apps/` vs `packages/`** — products people use vs. shared code products depend on.
- **npm & `package.json`** — how JavaScript projects declare and install their dependencies; `npm install` fetches, `npm run build` compiles.
- **Vite + React** — the app stack: React describes UI as components that re-render when data changes; Vite is the fast dev server and bundler around it.

## Proving it works (closing bracket)

Run in order — do not skip to the browser:

1. **Build** — `npm run build` (compiles; TypeScript and bundler errors fail here)
2. **Lint** — `npm run lint` when configured (style and static checks)
3. **Test** — `npm run test` (all suites green). On the **first effort** for a slice, the agent should **create** enough coverage, not just run one happy-path check:
   - **Unit tests** — functions and components in isolation
   - **API / HTTP tests** — routes and integrations (curl-style checks, supertest, or fetch against your API)
   - **End-to-end tests** — full user flows (Playwright in Phase 00)
   - **Browser verification** — open the running app; `/test-browser` or in-app browser when you need visual QA beyond automated e2e
4. **Verify** — challenge pass against the intention and demo-grade minimums (does it match what you meant?)
5. **Browser** — human or agent eyes on the running UI; layout, empty states, "does this feel like a tool?"

- **Demo-grade** — the bar: multiple working UI regions, one complete loop, visible error states, and tests that exercise real interaction — a credible product slice, not a hello-world.
- **The verify script** — structural checks that the curriculum kit is intact; green before you build, green after.
