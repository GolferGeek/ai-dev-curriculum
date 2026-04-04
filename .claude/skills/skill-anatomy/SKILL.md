---
user-invocable: false
name: skill-anatomy
description: The 5 levels of Claude Code skills, SKILL.md structure, frontmatter fields, progressive disclosure, capability vs preference. Required knowledge for cataloging and displaying skills.
category: skills-browser
used-by-agents: skill-catalog-builder, skill-browser-builder
---

# Skill Anatomy

Everything an agent needs to know about how Claude Code skills are structured, categorized, and evaluated. This is the foundation for cataloging and displaying skills in the browser.

## The 5 Levels of Claude Code Skills

### Level 1 — Apprentice: Understanding the Landscape

Skills are folders. Each contains a `SKILL.md` file and optionally supporting files (scripts, references, assets, examples). The open standard (agentskills.io) makes skills portable across 44+ tools — Claude Code, Codex, Cursor, Gemini CLI, and more.

Two fundamental types exist:
- **Capability uplift** — adds new functions the model cannot do alone (e.g., browser testing, MCP integration, API wrappers)
- **Encoded preference** — captures YOUR workflow, YOUR standards, YOUR decisions (e.g., commit conventions, architecture rules, review checklists)

### Level 2 — Builder: Anatomy of an Effective Skill

One clear job per skill. If you need "and" in the description, split it.

**Name:** lowercase, hyphens, gerund form when possible (`scan-errors`, `research-patterns`, `terminal-reporting`).

**Description:** The most critical field. Write it as a trigger — "Use when user says..." or "Apply when building..." Claude reads every description at startup to decide which skill to invoke. A bad description means the skill never fires.

**Instructions:** Numbered steps. Be explicit about order and conditions. Each step should be independently verifiable.

**Output format:** Show the expected output literally. Use code blocks with exact formatting. The agent should produce output that matches the template without guessing.

**Gotcha section:** Document failure patterns you have seen. "When X happens, do Y instead of Z." These are the highest-value lines in any skill — they prevent repeated mistakes.

**Constraints:** Sharp negatives. "Do NOT modify files outside the app directory." "NEVER skip the build check." Constraints are more reliable than positive instructions for preventing errors.

### Level 3 — Arsenal: Starter Kit

Immediately useful skills you can customize to your context. Examples from the community:
- `research-with-confidence` — structured research with source verification
- `devils-advocate` — challenge assumptions before committing to a design
- `morning-briefing` — summarize overnight changes, open PRs, failing builds
- `board-of-advisors` — simulate multiple expert perspectives on a decision

The value is in customization. Fork a community skill, inject your project's conventions, and it becomes a preference skill that gets more valuable over time.

### Level 4 — Strategist: Advanced Patterns

**Skill Dispatcher:** A meta-skill that routes requests to the right skill based on context. Reads the user's intent and delegates. Useful when you have 20+ skills and the model needs help choosing.

**Skill Chaining:** Output of one skill becomes input to the next. Example: `research` -> `prd` -> `plan` -> `run-plan`. Each skill's output format must match the next skill's expected input.

**Loop Skills:** Iterative refinement. Run a skill, evaluate the output, refine, repeat. Example: `scan-errors` -> `fix-errors` -> `scan-errors` (until clean). The loop skill defines exit conditions.

**Agentic Loops:** Skills that spawn sub-agents for parallel work. Example: scan 5 apps simultaneously, each with its own agent, merge results. Requires careful coordination to avoid conflicts.

### Level 5 — Architect: Organizational Libraries

Building skill libraries for teams and organizations:

1. **Discovery** — identify repeating workflows that should be skills
2. **Curation** — select which skills enter the official library
3. **Validation** — test that skills produce correct output across edge cases
4. **Bundling** — group skills into installable collections (e.g., "security pack", "SaaS starter")
5. **Ownership** — assign SME owners per skill, quarterly reviews, version control

Skills at this level have release notes, changelogs, and deprecation policies.

## The 5 Skill Killers

1. **Vague descriptions** — "Helps with code" tells Claude nothing. Be specific about the trigger condition.
2. **Over-defining process** — listing 47 steps when 7 would do. The model fills in obvious gaps; focus on the non-obvious.
3. **Stating obvious content** — "Write clean code" adds zero value. Only state things Claude would NOT do by default.
4. **Missing failure patterns** — no gotcha section means the skill will fail the same way twice.
5. **Monolithic structure** — one giant skill that tries to do everything. Split by responsibility.

## Capability vs Preference

**Capability skills** add new functions — browser testing, API integrations, file format parsers. These may become obsolete as the model improves or new tools emerge.

**Preference skills** encode YOUR workflow — your commit standards, your architecture rules, your review criteria. These get more valuable over time as you refine them.

**Investment advice:** Invest heavily in preference skills. They compound. Capability skills are useful but replaceable.

## Progressive Disclosure (Token Cost)

Skills load in three levels to manage context window cost:

- **Level 1: Description** (~100 tokens) — always loaded at startup. Claude reads every skill description to decide what to invoke. Keep descriptions tight.
- **Level 2: SKILL.md body** (full instructions) — loaded when the skill triggers. This is the main content. Can be hundreds of lines.
- **Level 3: Folder contents** (scripts, assets, references) — loaded as needed during execution. Only pulled when the skill's instructions reference them.

This means: your description is your most expensive line (loaded every session). Your SKILL.md body is medium cost (loaded per invocation). Supporting files are cheap (loaded on demand).

## Context Binding Rule

**"About the skill"** = lives in the skill folder. Instructions, templates, examples, scripts — anything specific to what this skill does.

**"About you or your org"** = external pointer. Reference `CLAUDE.md` or other project-level config. Don't duplicate project conventions inside a skill — point to the source of truth.

Example: A commit skill should reference the project's `pr-requirements` skill for acceptance criteria, not copy those criteria into its own SKILL.md.

## The Litmus Test

> "After the skill runs, do I use the output directly or do I edit/correct it?"

If you are iterating on the output, improve the skill. The goal is zero post-skill editing for the common case. Edge cases are fine — but if you're always fixing the same thing, encode that fix in the skill.

## Full Frontmatter Fields

### Open Standard Fields
- `name` (required) — skill identifier, lowercase with hyphens
- `description` (required) — trigger condition and purpose
- `license` — SPDX identifier (e.g., `Apache-2.0`, `MIT`)
- `compatibility` — which tools support this skill
- `metadata` — arbitrary key-value pairs

### Claude Code Extension Fields
- `disable-model-invocation` — prevent Claude from auto-invoking this skill
- `user-invocable` — whether the user can invoke directly (default: true)
- `allowed-tools` — restrict which tools the skill can use
- `model` — override the model for this skill
- `effort` — token budget hint (`low`, `medium`, `high`)
- `context` — additional files to load into context
- `agent` — run this skill as a sub-agent
- `hooks` — lifecycle hooks (before/after)
- `paths` — file path restrictions
- `shell` — shell to use for Bash commands
- `argument-hint` — hint text for argument input

## String Substitutions

Available inside SKILL.md for dynamic content:

- `$ARGUMENTS` — the full argument string passed to the skill
- `$0` through `$N` — positional arguments
- `${CLAUDE_SESSION_ID}` — unique ID for the current session
- `${CLAUDE_SKILL_DIR}` — absolute path to this skill's folder (useful for referencing supporting files)
