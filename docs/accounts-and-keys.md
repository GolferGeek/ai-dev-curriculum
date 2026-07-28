# Accounts, Subscriptions & API Keys

*What you're paying for (often nothing), and the one distinction that prevents most of the confusion.*

## The one distinction that matters

Two different things both get called "my AI account":

1. **Your coding agent's access** — how Claude Code / Cursor / Codex itself is powered. Usually a subscription you sign into once. You use this every day of the curriculum.
2. **A model API key** — a secret string that lets *software you build* call a model and pay per use. It lives in a `.env` file inside a project. You only need one when an app you've built calls a model at runtime.

Your subscription does not give your code an API key, and an API key does not power your coding agent. Different doors, different billing. Most "why doesn't this work / why am I being charged" moments trace back to mixing these up.

## The two common ways access is funded

- **Seat or subscription** — access to an interactive coding product, normally with usage limits that vary by plan. This is the common path for a daily coding harness.
- **API, usage-based** — credentials that let software call a model. Billing, limits, and data terms are controlled separately from an interactive product.

Prices, included usage, plan names, model access, and data terms change frequently. The client must confirm approved products and current terms before each cohort; this document deliberately promises no free tier or fixed monthly price.

## Course position

- **Cursor IDE is the recommended common classroom environment.** It keeps code, terminals, multiple projects, and agent sessions in one visual workspace.
- **Claude Code and Codex are supported harnesses.** Learners can run them from Cursor's terminal or use their supported editor/desktop surfaces.
- **The client may standardize access.** If it does, use the client-approved account, model, retention, and data-handling configuration.
- **The course does not depend on one provider.** The canonical skills, specialized agents, and program decisions live in the monorepo and are projected into each supported harness.

Before class, the instructor records the cohort's approved access choices in `docs/ai-program/decisions/` and refreshes any time-sensitive claims in `docs/ai-program/watchlist.md`.

## API key hygiene (non-negotiable)

- Keys live in `.env`. Never in code, never in git. (This repo's `.gitignore` already excludes `.env` — keep it that way in your own projects too.)
- A key is a password that spends your money. Don't paste it in chats, screenshots, or shared docs.
- If a key leaks anyway: **revoke it and make a new one.** Takes a minute, costs nothing, and everyone has done it once.
- Before handing a key to an experiment, set a spending limit in the provider's dashboard.

## What each phase actually needs

- **Phases 00–05.5:** just your approved coding harness. No model API keys are required by the default labs.
- **Phase 06 (Model Eval Lab):** [Ollama](https://ollama.com/) — free and local — for the local contestants; an Anthropic API key only if you include the hosted Claude contestants.
- **Phase 04 (Protocols):** runs with mocks by default; keys only if you wire real hosted models in.

If you're unsure, start with zero application API keys. Confirm interactive-tool access with the instructor or your employer before class rather than creating unapproved accounts.
