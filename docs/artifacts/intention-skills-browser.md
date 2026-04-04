# Intention — Skills Browser

## Why

There are over 1,000 free Claude Code skills scattered across GitHub repos, community marketplaces, and Anthropic's own examples. But discovering them is painful — you have to browse multiple repos, read raw markdown files, and guess whether a skill is any good. There's no single place to search, filter, compare, and grab what you need.

We're building that place.

## Who

- **Primary:** Developers looking for skills to add to their projects
- **Secondary:** Learners in this curriculum exploring the ecosystem
- **Tertiary:** Teams evaluating which skills to adopt organization-wide

## What we're building

A **Skills Browser** app (`apps/skills-browser/`) — a Next.js app with a pre-built catalog of skills from across the ecosystem.

### Data sources (all free, open source)

| Source | URL | Scale |
|--------|-----|-------|
| VoltAgent/awesome-agent-skills | github.com/VoltAgent/awesome-agent-skills | 1,060+ from vendor teams |
| anthropics/skills | github.com/anthropics/skills | 17 official Anthropic skills |
| awesome-claude-code | github.com/hesreallyhim/awesome-claude-code | Curated ecosystem catalog |
| skills.pawgrammer.com | skills.pawgrammer.com | 280+ community skills |
| This curriculum | .claude/skills/ in this repo | 38 battle-tested skills |

### The catalog

Each skill entry includes:
- **Name** and **description** (from SKILL.md frontmatter)
- **Source** — which repo it came from, with link
- **Level** (1-5) — Apprentice through Architect, based on complexity
- **Category** — development, security, productivity, research, protocols, design, documents, etc.
- **Type** — capability (new function) or preference (encoded workflow)
- **Coolness** (1-5) — subjective rating of usefulness × creativity
- **Full content** — the complete SKILL.md rendered as markdown
- **Supporting files** — if the skill has scripts, templates, examples

### The UI

**Browse view:**
- Card grid showing all skills
- Filter sidebar: level (1-5), source, category, type (capability/preference)
- Search bar: full-text across name + description + content
- Sort by: name, level, coolness, source
- Each card shows: name, source badge, level indicator, category tag, description preview

**Detail view:**
- Full SKILL.md rendered as formatted markdown
- File tree if skill has supporting files (click to view any file)
- Copy button — copies the SKILL.md content to clipboard
- Install instructions (how to add to your `.claude/skills/`)
- Link to original source

### How the catalog is built

The catalog is **pre-built as static JSON** — no runtime API calls to GitHub. The `skill-catalog-builder` agent:
1. Fetches SKILL.md files from each source repo
2. Parses YAML frontmatter
3. Auto-categorizes (level, category, type) based on content analysis
4. Produces a `catalog.json` that the Next.js app reads at build time

This means the app works offline once built. The catalog can be refreshed by re-running the builder.

## Demo-grade minimums

- [ ] Catalog contains skills from at least 3 different sources
- [ ] Browse view shows a card grid with at least 50 skills
- [ ] Filter by level, source, and category works
- [ ] Search finds skills by name and description
- [ ] Click a skill → see full SKILL.md rendered as markdown
- [ ] Copy button copies skill content to clipboard
- [ ] The app looks good — clean, modern, enjoyable to browse
- [ ] Each skill links back to its original source

## Out of scope

- Skill creation/editing (Anthropic's `skill-creator` handles this)
- User accounts or saved favorites
- Real-time GitHub API calls (use pre-built static catalog)
- Skill installation automation (copy-paste is fine for the demo)
- Rating/review system (coolness is curated, not user-generated)

## Success criteria

1. A developer can find a useful skill they didn't know existed within 30 seconds of opening the app
2. They can read the full skill content and understand what it does
3. They can copy it and add it to their own project
4. Browsing is genuinely fun — you want to keep scrolling to see what else is out there
