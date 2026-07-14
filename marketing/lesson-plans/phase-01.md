# Phase 01 — Lesson Plan

*The **content** you deliver for Phase 01. Room mechanics (timing, predict-then-compare) are shared with [Phase 00's TEACHING.md](../../docs/phase-00/TEACHING.md); the exact steps are in [docs/phase-01/README.md](../../docs/phase-01/README.md) and [RUN-ORDER.md](../../docs/phase-01/RUN-ORDER.md). This document is what you **talk about**.*

**Session arc:** Intro lecture → Intention walk-through → Build (it runs) → Closing discussion. Phase 01 raises the stakes: the app now has real **auth** and a real **database**, which is exactly where AI-built apps fail in the wild. The closing discussion is a *live verification of the auth-and-data chain* — the most important thing in the phase.

> **Default to web.** In practice we build **every track as a web app** (Next.js + SurrealDB), including the Twitter and Facebook "killers" whose provided intentions describe them as iOS. One shared stack means **Windows, macOS, and Linux** all work the same for the class path — no one needs a Mac or Xcode, everyone can follow along, and the time goes to the concepts instead of platform setup. **SwiftUI / SwiftData / Xcode are macOS-only** (Apple provides no Windows/Linux Xcode); that path stays open only as an individual opt-in, never a cohort requirement. SurrealDB install one-liners (including Windows PowerShell) are in [PREREQUISITES.md](../../docs/phase-01/PREREQUISITES.md).

> **Instructor refresh:** anywhere this plan says *[refresh]*, pull the current version of the link before the cohort. Security incidents and tool releases below are real and dated, but the space moves fast — check for something newer. Citations with URLs are at the bottom.

---

## 1. Intro — "The State of the AI Union: Real Apps"

Phase 00 proved the pipeline. Phase 01's lecture is about what changes when "real" enters the picture: persistence, identity, and the trust boundary — and why that's the exact place the industry is getting burned.

### 1a. The technology we're going to be using

- **SurrealDB** — the database. Multi-model (document + graph + relational + vector) with **auth scopes and JWT built in**, so identity lives *in the data layer*, not bolted on. Schemas are written contracts, version-controlled like code.
- **Next.js (App Router)** — the web framework. Some code runs on the **server** (safe, near the data), some in the **browser**. **Server actions** are how a form posts straight to server code — which makes them a *trust boundary*, a point we'll return to hard.
- **Authentication** — signup vs. sign-in (create an identity vs. prove it); **session/JWT** (the tamper-evident wristband); **protected routes** (pages that check the wristband); and the one that matters most, **per-user data isolation** (the database itself scopes records to their owner).
- **SwiftUI + SwiftData** — *optional iOS path only.* By default all four products are built as web apps; this stack comes into play only if a learner specifically asks to try native iOS.
- **`/test-browser`** — an agent drives a real Chrome session and reports what a human would see. Visual QA, on top of Playwright.

### 1b. The points we're trying to make

1. **"Real" moves the demo-grade bar up.** Credible now means a working chain: **signup → sign-in → protected page → per-user persisted data.** If any link is faked, it isn't demo-grade.
2. **The pipeline scales to a team of agents.** Same `/intention → /prd → /plan → /run-plan`, but `/run-plan` now orchestrates a *sequence*: `surrealdb-builder` lays the data layer and auth first, then the app builder builds on top. You're directing a small team now, not one worker.
3. **Auth and data isolation are where AI-built apps fail — so that's what we verify hardest.** This isn't hypothetical; it's the dominant real-world failure mode (Section 1e). The barbell's back end has a name in this phase: *prove a second user cannot see the first user's data.*

### 1c. Why those points are important

- A broken build in Phase 00 was an embarrassment. A broken **auth** in Phase 01 is a **data breach** — the difference between "ugly demo" and "customer records on the open internet."
- The speed that makes agents amazing is the same speed that ships an exposed database before anyone looks. The discipline — *verify the auth-and-data chain every time* — is the price of using this speed on anything real.
- For a business audience: this is the slide that earns trust. You are the instructor who says "here's the fast way, AND here's how the fast way leaks data, AND here's how we stop it." That credibility is the product.

### 1d. How this area is changing

- **App-builders went full-stack — unevenly.** Lovable, Replit Agent, and Bolt now generate auth + database + deploy; v0 stays frontend-first. The consistent weak spot across all of them is the backend — auth and data — which is precisely what this phase teaches you to inspect. *[refresh: current capabilities move monthly.]*
- **Databases are going "AI-native."** SurrealDB shipped 3.0 and raised a $23M Series A extension (Feb 2026), repositioning around agent memory and vector search. Treat the AI-native framing as a claim to examine, not gospel — independent benchmarks are mixed (Section 1e). *[refresh.]*
- **The framework layer itself became an attack surface.** React Server Components are now the default in Next.js — and in Dec 2025 the React team disclosed **CVE-2025-55182 ("React2Shell"), a CVSS 10.0 unauthenticated RCE** via server-function deserialization. Server actions are power *and* a trust boundary. *[refresh.]*
- **Apple went official** (relevant mainly to the optional iOS path). Xcode 26.3 added Intelligence agents, and Claude Code / Codex drive Xcode via MCP (Apple's `xcrun mcpbridge`). Agents are strong at SwiftUI views and SwiftData models, weak at project-file edits and code signing. *[refresh — very recent.]*

### 1e. What interesting people are saying about the direction

Use one or two live. **Paraphrase and cite on screen; these are real and dated.**

- **Simon Willison — "vibe coding" vs. "vibe engineering" (Oct 2025).** His verified distinction is the phase's thesis in one line: vibe coding is "the fast, loose and irresponsible way of building software with AI—entirely prompt-driven, and with no attention paid to how the code actually works"; vibe *engineering* is where "seasoned professionals accelerate their work with LLMs while staying proudly and confidently accountable for the software they produce." That accountability is what Phase 01 teaches.
- **The security research — this is your centerpiece.** Real, primary-sourced 2025–2026 findings, all pointing at the same failure:
  - **Wiz / Base44 (Jul 2025):** a complete auth bypass — a non-secret `app_id` was enough to hit undocumented registration/OTP endpoints and create a verified account on *any* private app, SSO included. Wiz's own conclusion: "the most immediate risks stem from fundamental security controls—proper authentication and secure API design."
  - **Escape.tech (2025):** scanned 5,600+ public vibe-coded apps → 2,000+ vulnerabilities, 400+ exposed secrets, database keys "trivially retrievable from frontend bundles."
  - **Lovable (CVE-2025-48757):** misconfigured row-level security let attackers bypass frontend checks and read data directly — the per-user-isolation failure, live.
  - Academic backup, if you want numbers: Georgetown CSET found 86% of AI-generated code failed to defend against XSS; Carnegie Mellon found only ~10.5% of generated functions passed security review. *(Avoid the "62%" headline floating around — it's marketing, not a study.)*
- **The SurrealDB skeptics.** Balance the AI-native marketing with the Hacker News benchmark thread questioning its numbers and maturity vs. Postgres — a healthy "don't bet the company on an unproven DB" counterweight. *[refresh.]*

**Land the lecture:** the tools got fast enough to ship a real app in an afternoon — and fast enough to ship a *breach* in an afternoon. The skill that separates the two is verifying the auth-and-data chain. That's what we're about to do.

---

## 2. The intention walk-through

Open the provided intention for the chosen track — [QuickBooks](../../docs/phase-01/intention-quickbooks-killer.md), [Trello](../../docs/phase-01/intention-trello-killer.md), [Twitter](../../docs/phase-01/intention-twitter-killer.md), or [Facebook](../../docs/phase-01/intention-facebook-killer.md) killer.

### What this app is
A credible "ownable" version of a SaaS product — invoices/expenses, a kanban board, a personal feed, or a friend circle — with **real signup, real sign-in, and per-user data** in SurrealDB. Not localStorage. Not a starter screen.

### How the intention sets the agents up to succeed
Walk the intention and point at *why it produces a good build*:
- It names **Demo-grade minimums** that now explicitly include the **auth chain and per-user data** — so the agent can't stop at a pretty dashboard with no login.
- It scopes the **data model** (what an invoice/card/post *is*) — which becomes the SurrealDB schema, the version-controlled contract.
- It implies the **multi-agent plan**: data layer + auth first (`surrealdb-builder`), then the app (`nextjs-saas-builder` or `ios-builder`). Point out that the intention's clarity is what lets `/plan` split the work correctly.

The lesson to say out loud: **the intention is doing the security work up front.** Because it demands the auth-and-data chain as a first-class requirement, the agents build it in instead of leaving the hole that burned Base44 and Lovable.

### Why we don't rewrite the intentions
Same as Phase 00: these are tuned and they work — we **read and critique**, we don't modify. New in Phase 01: after this build, learners can author their own (or run `/research "your idea"` to draft one). The in-class exercise stays *predict what this intention will produce* — including "predict where the auth could be weak."

---

## 3. The build (it runs — keep teaching)

`/run-plan` now runs agents in sequence: SurrealDB + auth, then the app — the Next.js builder by default (the iOS builder only on the opt-in path). Budget ~60 minutes — longer than Phase 00 because there's a real backend. **Nobody watches the bar.** Use the window for the security material in 1e, and for Phase 01 talks in [discussion-topics.md](discussion-topics.md) (corporate context layers / brand, human decision boundaries, secrets hygiene). Remember every tool runs more than one session at once — you can have a second track generating in parallel to compare later. Steps: [RUN-ORDER.md](../../docs/phase-01/RUN-ORDER.md).

---

## 4. Closing discussion — "Did the auth-and-data chain actually hold?"

This is the highest-value discussion in the phase. Don't just admire the app — **try to break it.**

- **Walk the chain, out loud, on the running app** (`/test-browser` helps): signup → sign-in → protected route bounces a signed-out user → data persists after refresh. Make them point at each link.
- **Attempt the breach.** Create a second user. Can user B see user A's data? Try a protected URL while signed out. Try to read another user's record directly. *This is the Base44 / Lovable failure, reproduced (or prevented) in the room.* Whatever the result, it's the lesson.
- **Prove it runs** (`npm run build`, `npm run test`, `/test-browser`; optional iOS path: `xcodebuild ... build test`). A green chat message is still not a passing test.
- **"Where was the leverage — and where was the risk?"** Leverage was upstream (the intention demanded the auth chain). Risk lives in the trust boundaries — server actions, the database's isolation rules — the exact spots the CVEs hit.
- **"What would you refuse to ship?"** Connect to the business: at this speed you *could* ship this today. What has to be true first? That question is the whole back half of the course (Days 3–4).

### What they must leave Phase 01 believing
1. "Real" means the whole chain — auth + per-user data — not a pretty screen.
2. The pipeline scales: you now direct a *sequence of agents*, and the intention is what lets it split correctly.
3. AI builds auth and data fast **and wrong** by default — verifying that chain is non-negotiable, and it's the difference between a demo and a breach.
4. The leverage is still upstream, in an intention that demands security as a first-class requirement.

---

## Citations (verify/refresh before teaching)

- Simon Willison, "Vibe engineering," 7 Oct 2025 — https://simonwillison.net/2025/Oct/7/vibe-engineering/
- Gal Nagli / Wiz Research, "Critical Vulnerability in AI Vibe Coding Platform Base44," 29 Jul 2025 — https://www.wiz.io/blog/critical-vulnerability-base44
- Escape.tech, "How we discovered 2k+ vulnerabilities in apps built with vibe coding," 2025 — https://escape.tech/blog/methodology-how-we-discovered-vulnerabilities-apps-built-with-vibe-coding/
- CVE-2025-48757 (Lovable row-level-security misconfiguration) — see NVD/GitHub advisory *[refresh: confirm current write-up]*
- React team, "Critical Security Vulnerability in React Server Components" (CVE-2025-55182, CVSS 10.0), 3 Dec 2025 — https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components
- SiliconANGLE, "SurrealDB raises $23M to expand AI-native multi-model database," 17 Feb 2026 — https://siliconangle.com/2026/02/17/surrealdb-raises-23m-expand-ai-native-multi-model-database/
- Hacker News, "Benchmarking SurrealDB 3.x vs. Postgres, Mongo, Neo4j and Redis" (skeptical thread) — https://news.ycombinator.com/item?id=48323844
- Apple Developer, "Xcode, agents, and you," WWDC26 session 259 — https://developer.apple.com/videos/play/wwdc2026/259/ *[refresh: confirm session number]*

*Do not cite as fact (unverified / marketing): the "62%" vibe-coding figure, "$36B / 350% YoY" valuations, "170 apps" for CVE-2025-48757, and any GitGuardian/Moltbook secret-leak counts. Use the primary sources above instead.*
