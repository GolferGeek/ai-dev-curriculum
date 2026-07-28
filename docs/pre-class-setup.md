# Pre-Class Setup

*Do this before our first session — roughly 20–30 minutes. Then class time goes to building, not installing. If anything gets stuck, come 30 minutes early on day one and we'll sort it out together.*

> **Two requirements:** professional software-development experience and a **Mac, Windows, or Linux laptop you can install software on.** This is a developer course, not an introduction to programming. A locked-down machine, Chromebook, or tablet will not support the labs.

## 1. Make a GitHub account (~2 min)

Sign up free at [github.com](https://github.com/). We'll use it from day one.

## 2. Install git (~5 min)

- **Windows:** download from [git-scm.com](https://git-scm.com/) and run the installer (defaults are fine).
- **Mac:** open Terminal, type `git --version`, and accept the install prompt if one appears.

**Check it worked:** `git --version` prints a version number.

## 3. Install Node.js (~5 min)

Download the **LTS** version from [nodejs.org](https://nodejs.org/) and run the installer (defaults are fine).

**Check it worked:** `node --version` prints a version number. Use the currently supported LTS release approved by your organization.

## 4. Pick your AI coding agent (~10 min)

This curriculum is driven by AI coding agents: you frame the work, the agent helps build it, and you remain accountable for the result. The canonical skills and specialized agents live in `ai/`; generated projections support all three classroom harnesses.

- **Recommended: Cursor IDE** — use it as the common visual workspace, with Cursor Agent or a supported CLI in its terminal.
- **Supported: Claude Code** — use its CLI or supported editor integration.
- **Supported: Codex** — use its app, CLI, editor integration, or a terminal inside Cursor.

Install only the product and account approved by your organization. Current installation links, plan terms, and client decisions belong in the cohort setup packet because they can change faster than the curriculum.

Confused about subscriptions vs. API keys, or what any of this costs? See **[Accounts, subscriptions & API keys](accounts-and-keys.md)** — five minutes, saves an hour. (The deeper lesson of this whole curriculum: the skill transfers; the tool doesn't matter much.)

## 5. Clone this curriculum (~3 min)

In Terminal (Mac) or Command Prompt (Windows):

```bash
git clone https://github.com/GolferGeek/ai-dev-curriculum.git
cd ai-dev-curriculum
npm install
npm run ai:check
npm run ai:program:check
```

If git or the clone gives you trouble, that's fine — ask your AI agent: *"Walk me through cloning https://github.com/GolferGeek/ai-dev-curriculum.git, one step at a time, and tell me how to check it worked."* Getting the agent to dig you out is the first lesson anyway.

## Checklist

- [ ] GitHub account created
- [ ] `git --version` works
- [ ] `node --version` works
- [ ] Client-approved AI coding harness installed and signed in
- [ ] Curriculum repo cloned
- [ ] `npm run ai:check` and `npm run ai:program:check` pass

See you in class — we start at [Phase 00](phases/00/README.md).

**Standing up a team repo?** After pre-class, work [Checklist 01 — Your monorepo on GitHub](checklists/01-your-monorepo-on-github.md) then [02 — GitHub Actions and skills](checklists/02-github-actions-and-skills.md). Map: [Checklist 00 — High-level](checklists/00-high-level.md).
