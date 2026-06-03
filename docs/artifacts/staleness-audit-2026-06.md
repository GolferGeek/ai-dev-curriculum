# Staleness Audit — June 2026

> **Status: fixes applied 2026-06-03** (50 edits across 29 files — see git diff). Deliberately left alone: "Twitter killer" naming (kept on purpose), dependency version bumps and Phase 06 `ollama pull` verification (both belong to the dry run), and historical report artifacts (ingest/error/security reports are snapshots of past runs).

*Full-repo scan for drift (the curriculum is ~3 months old; the ecosystem isn't). ~50 raw findings, consolidated and ranked below. Use this alongside a dry run of Phase 00: the audit flags, the dry run confirms. Items marked **VERIFIED** were checked against current sources this week; items marked **CHECK** need confirmation during the dry run.*

---

## Tier 1 — fix before any class (breaks or confuses immediately)

**1. Commands → skills reconciliation. CHECK (high confidence).**
Claude Code migrated slash commands into the skills format; the repo's `CLAUDE.md` already says "all commands are in `.claude/skills/`" — but several docs still point at the old world:
- `docs/phase-00/PREREQUISITES.md:7` — "Slash commands in `.claude/commands/`"
- `docs/phase-00/STARTER-KIT.md:28` — "`.claude/commands/` — you invoke these"
- `docs/phase-00/COMMANDS.md:3` — "these are the **slash commands**"
- `.claude/agents/agent-author.md:20,50` — instructs creating/reading `.claude/commands/<name>.md`
Note: typing `/name` still works — it invokes a skill — so this is a terminology-and-paths cleanup, not a redesign. Decide whether `.claude/commands/` still exists or everything lives in skills, then make the docs match reality.

**2. Next.js 14 → 16. VERIFIED.**
Current stable is **Next.js 16.2** (March 2026). `create-next-app` will scaffold 16.x, so students will see a different framework than the docs describe, and 15/16 included breaking changes (async request APIs, etc.).
- `docs/phase-01/README.md:17` — "Next.js 14 (App Router)"
- `docs/artifacts/prd-trello.md:5` — "built with Next.js 14"
- Check `.claude/skills/nextjs-saas/` and the phase-01 builder agents for 14-era patterns.

**3. Xcode 15+ → Xcode 26. VERIFIED.**
Apple moved to year-based versioning; current is **Xcode 26.5**, and as of **April 28, 2026** App Store submissions require the iOS 26 SDK. "Xcode 15+" reads two generations old.
- `docs/phase-01/PREREQUISITES.md:21`, `docs/phase-01/RUN-ORDER.md:7`
- `docs/phase-01/README.md:139` — simulator destination `iPhone 17` (CHECK which simulators ship with Xcode 26.5)
- Expect SwiftUI/SwiftData API drift in the iOS builder agents — the dry run of an iOS track will surface it.

**4. Stale Claude model ID. VERIFIED.**
- `.claude/skills/tool-calling-tests/SKILL.md:392` — `claude-sonnet-4-20250514` is a year-old snapshot ID. Replace with a current model string (see "Confirmed current" below).

---

## Tier 2 — fix before running that phase

**5. Phase 06 model roster. CHECK.**
The eval contestants and `ollama pull` tags (`gemma4:*`, `qwen3.5`, `deepseek-r1`, "QwQ", "GPT-OSS 20B") rot fastest of anything in the repo. Before running Phase 06: try every pull command, and refresh the contestant/judge lists to whatever is current. (`docs/phase-06/RUN-ORDER.md:14-22`, `.claude/skills/model-eval-design/SKILL.md:29`.) Consider rewriting the skill to say "current top local models — refresh each cohort" rather than pinning names.

**6. Phase 05 skill-source repos and counts. CHECK.**
- `docs/phase-05/README.md:39` — "VoltAgent/awesome-agent-skills, 1,060+" (count will be wrong; verify repo still lives there)
- `docs/artifacts/intention-skills-browser.md:23-27` — awesome-claude-code, anthropics/skills "17", play.aidailybrief.ai — verify each URL, and soften hard counts to "hundreds/thousands."

**7. Expired example dates in protocol skills. Low effort, real confusion.**
- `.claude/skills/a2p-protocol/SKILL.md:31-32` — mandate validity `2025-01-01 → 2025-12-31` (expired; students will copy an already-invalid example)
- Same file :51 and `.claude/skills/a2a-protocol/SKILL.md:120` — `INV-2024-001` examples
- `.claude/skills/ag-ui-protocol/SKILL.md:63` — 2025 timestamps
Make example dates current or clearly placeholder (`YYYY-MM-DD`).

---

## Tier 3 — cosmetic / judgment calls

**8. "Twitter killer."** Twitter has been X for years. Either rename, or keep it as a deliberately retro teaching name — but make it a choice, not an oversight. (`docs/phase-01/intention-twitter-killer.md`, builder agent, README references.)

**9. Analyst-prompt example citations dated 2024.** (`.claude/skills/analyst-prompts/SKILL.md:181-187`) Fine as fixtures; consider refreshing so students don't read them as live data.

**10. Dependency minor bumps.** `turbo ^2.4.4`, `playwright ^1.49.1`, `packageManager: npm@10.9.0` — run an update pass during the dry run; not urgent unless something fails.

**11. Pricing/subscription claims.** `docs/phase-00/PREREQUISITES.md:8` (Claude subscription required) — still accurate as of June 2026 (bare free accounts are ~2–5 prompts/5h). Re-verify each cohort; this one moves.

---

## Confirmed current — do NOT "fix"

- **`claude-sonnet-4-6`, `claude-haiku-4-5`, `claude-opus-4-6`** (multimodal-tests, ollama-integration, model-eval artifacts) — these match Anthropic's current model strings as of June 2026. The only stale Claude ID found is item 4.
- `npm install -g @anthropic-ai/claude-code` — still the standard install.
- No references found to Project IDX, Gemini Code Assist, or Bard — nothing to clean there.

---

## Suggested ritual

1. **Dry-run Phase 00 (and one Phase 01 track) before each cohort** — it's both rehearsal and drift detection.
2. Add a **"Last verified: YYYY-MM"** stamp to each phase README so staleness is visible instead of silent.
3. Re-run this audit (it's a one-prompt job for an agent) before each new cohort, and keep the punch lists in `docs/artifacts/`.
