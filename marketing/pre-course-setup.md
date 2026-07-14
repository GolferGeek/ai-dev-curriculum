# Pre-Course Setup Checklist

*Complete this before Day 1. It takes about 30–45 minutes, and it means your first morning goes to concepts and building instead of downloads. If anything fails, note it and arrive a little early — we'll fix it during setup.*

## 1. Your AI coding agent (required)

- [ ] Choose one: **Claude Code**, **Cursor**, **Codex**, or **Claude Desktop**. Any works; the workflow is the same.
- [ ] Get a **paid subscription** (~$20/month minimum) — free tiers do not have enough model bandwidth for the labs.
- [ ] Install it, sign in, and confirm you can ask it a question and get an answer.
- [ ] **If you'll use it for employer work:** check the plan's data terms (training opt-out / Privacy Mode). We discuss this on Day 1, but know what plan you're on.

## 2. Core tools (required)

- [ ] **Git** — `git --version` prints a version.
  - **Windows:** install [Git for Windows](https://git-scm.com/download/win) (gives you Git Bash, which the AI agents use).
- [ ] **Node.js LTS (18+) with npm** — `node --version` and `npm --version` both print versions. [nodejs.org](https://nodejs.org)
- [ ] **A code editor** — VS Code or similar (Cursor users already have one).
- [ ] **A GitHub account** — free is fine; you'll clone the course repo and push your work.

## 3. Day 2+ tools (install now if you can)

- [ ] **SurrealDB** (used from Day 1 afternoon on):
  - Windows (PowerShell): `iwr https://windows.surrealdb.com -useb | iex`
  - macOS: `brew install surrealdb/tap/surreal`
  - Linux: `curl -sSf https://install.surrealdb.com | sh`
  - Or Docker (any OS): `docker run --rm -p 8000:8000 surrealdb/surrealdb:latest start`
  - Verify: `surreal version` prints a version.
- [ ] **Chrome** — used for browser verification of the apps you build.

## 4. Optional

- [ ] **Ollama** ([ollama.com](https://ollama.com)) — for running local models in the Day 4 model-eval lab. Useful but not required; hosted models work too.
- [ ] **Anthropic API key** — only if you want to use API-based models in the eval lab.
- [ ] **Mac only, opt-in:** Xcode — solely for the optional native iOS track. The class default is web apps on every OS; do not install Xcode just for this course.

## Platform notes

- **Windows, macOS, and Linux all work** for the entire core curriculum. There is no Mac requirement.
- Windows users: prefer **Git Bash** (from Git for Windows) or PowerShell when a command doesn't work in the other.
- If SurrealDB on Windows complains about `VCRUNTIME140.dll`, install the [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist).

## Quick self-test (all should succeed)

```bash
git --version
node --version
npm --version
surreal version
```

…and your AI coding agent answers a prompt when signed in. If all five work, you're ready for Day 1.
