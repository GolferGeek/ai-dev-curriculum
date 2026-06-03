# Pre-Class Setup

*Do this before our first session — roughly 20–30 minutes. Then class time goes to building, not installing. If anything gets stuck, come 30 minutes early on day one and we'll sort it out together.*

> **One requirement:** a **Mac, Windows, or Linux laptop you can install software on.** A locked-down machine, Chromebook, or tablet won't work for this course.

## 1. Make a GitHub account (~2 min)

Sign up free at [github.com](https://github.com/). We'll use it from day one.

## 2. Install git (~5 min)

- **Windows:** download from [git-scm.com](https://git-scm.com/) and run the installer (defaults are fine).
- **Mac:** open Terminal, type `git --version`, and accept the install prompt if one appears.

**Check it worked:** `git --version` prints a version number.

## 3. Install Node.js (~5 min)

Download the **LTS** version from [nodejs.org](https://nodejs.org/) and run the installer (defaults are fine).

**Check it worked:** `node --version` prints a version number (v24 or higher is current).

## 4. Pick your AI coding agent (~10 min)

This curriculum is driven by an AI agent — you direct it; it builds. Its skills and commands live in this repo's `.claude/` folder, and they work with several tools. **Bring whichever you already have a relationship with:**

- **Claude Code (CLI)** — if you have a Claude subscription (or API credits): `npm install -g @anthropic-ai/claude-code`, then run `claude` and sign in. *Note: a bare free Claude account is too limited for class — you'll want a subscription or starter API credits from [platform.claude.com](https://platform.claude.com/).*
- **Cursor** — free tier, no card: download at [cursor.com](https://www.cursor.com/), open it once and sign in. A visual editor with the agent built in.
- **Codex** — if you have a ChatGPT account: see [chatgpt.com/codex](https://chatgpt.com/codex/).

Not sure? Install **Cursor** — it's the easiest free start, and we'll compare tools in class.

Confused about subscriptions vs. API keys, or what any of this costs? See **[Accounts, subscriptions & API keys](accounts-and-keys.md)** — five minutes, saves an hour. (The deeper lesson of this whole curriculum: the skill transfers; the tool doesn't matter much.)

## 5. Clone this curriculum (~3 min)

In Terminal (Mac) or Command Prompt (Windows):

```bash
git clone https://github.com/GolferGeek/ai-dev-curriculum.git
cd ai-dev-curriculum
```

If git or the clone gives you trouble, that's fine — ask your AI agent: *"Walk me through cloning https://github.com/GolferGeek/ai-dev-curriculum.git, one step at a time, and tell me how to check it worked."* Getting the agent to dig you out is the first lesson anyway.

## Checklist

- [ ] GitHub account created
- [ ] `git --version` works
- [ ] `node --version` works
- [ ] One AI agent installed and signed in (Claude Code, Cursor, or Codex)
- [ ] Curriculum repo cloned

See you in class — we start at [Phase 00](phase-00/README.md).
