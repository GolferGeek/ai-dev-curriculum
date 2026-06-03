# Accounts, Subscriptions & API Keys

*What you're paying for (often nothing), and the one distinction that prevents most of the confusion.*

## The one distinction that matters

Two different things both get called "my AI account":

1. **Your coding agent's access** — how Claude Code / Cursor / Codex itself is powered. Usually a subscription you sign into once. You use this every day of the curriculum.
2. **A model API key** — a secret string that lets *software you build* call a model and pay per use. It lives in a `.env` file inside a project. You only need one when an app you've built calls a model at runtime.

Your subscription does not give your code an API key, and an API key does not power your coding agent. Different doors, different billing. Most "why doesn't this work / why am I being charged" moments trace back to mixing these up.

## The two ways to pay

- **Subscription** — a flat monthly fee for the tool with generous usage. Simple and predictable; the right choice for your daily coding agent.
- **API, pay-per-token** — you pre-load credits (or attach billing) and each call costs fractions of a cent to cents. For light student use this is often the *cheapest* path — a few dollars can last weeks. The right choice for apps you build that call models.

Prices and free tiers change monthly. **Check the provider's pricing page; don't trust any number written in a doc** (including this one).

## Tool by tool

- **Claude Code** — sign in with a Claude subscription (the smooth path for this curriculum), or use API credits from [platform.claude.com](https://platform.claude.com/) (a small starter amount is typically free, no card). The bare free claude.ai account is too limited for real working sessions.
- **Cursor** — the free Hobby tier is enough to start (no card); Pro removes the caps, and verified university students can currently get [a year of Pro free](https://cursor.com/students).
- **Codex** — sign in with a ChatGPT account; paid tiers raise the limits.
- **Gemini** — Google's coding-assistant lineup is mid-transition as of mid-2026, so we don't teach a Gemini setup path; it would be stale in weeks. The Gemini API works fine as a *model* option for apps you build, if you want it.

## API key hygiene (non-negotiable)

- Keys live in `.env`. Never in code, never in git. (This repo's `.gitignore` already excludes `.env` — keep it that way in your own projects too.)
- A key is a password that spends your money. Don't paste it in chats, screenshots, or shared docs.
- If a key leaks anyway: **revoke it and make a new one.** Takes a minute, costs nothing, and everyone has done it once.
- Before handing a key to an experiment, set a spending limit in the provider's dashboard.

## What each phase actually needs

- **Phases 00–05:** just your coding agent. No API keys at all.
- **Phase 06 (Model Eval Lab):** [Ollama](https://ollama.com/) — free and local — for the local contestants; an Anthropic API key only if you include the hosted Claude contestants.
- **Phase 04 (Protocols):** runs with mocks by default; keys only if you wire real hosted models in.

If you're unsure, start with zero keys and your coding agent's free tier — you can complete most of the curriculum before spending a dollar.
