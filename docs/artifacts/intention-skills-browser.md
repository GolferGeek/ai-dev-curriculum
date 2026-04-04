# Intention — Skills Browser

## Why

There are nearly 1,000 free Claude Code skills scattered across GitHub repos, community marketplaces, and Anthropic's own examples — but discovering them is painful. You have to browse multiple repos, read raw markdown files, and guess whether a skill is any good. The AI Daily Brief Skills Master Class defines 5 levels of skill maturity (Apprentice to Architect) and distinguishes capability skills (new functions) from preference skills (encoded workflows), but there's no tool that applies this framework to the ecosystem.

We're building that tool. A browseable, searchable catalog of every free skill we can find — categorized, rated, and copyable.

## Who

- **Primary:** Developers looking for skills to add to their projects
- **Secondary:** Learners in this curriculum exploring the ecosystem
- **Tertiary:** Teams evaluating which skills to adopt organization-wide

## What we're building

A **Skills Browser** app (`apps/skills-browser/`) — a Next.js app that fetches real skills from across the ecosystem, catalogs them, and lets anyone browse, search, filter, preview, and copy them.

### Data sources (all free, open source)

| Source | URL | Skills | What's in it |
|--------|-----|--------|-------------|
| **VoltAgent/awesome-agent-skills** | github.com/VoltAgent/awesome-agent-skills | ~750 | Official skills from 40+ vendor teams: Microsoft, Trail of Bits, Hugging Face, Firecrawl, HashiCorp, Stripe, Cloudflare, Supabase, and more |
| **awesome-claude-code** | github.com/hesreallyhim/awesome-claude-code | ~190 | Community-curated ecosystem catalog — skills, workflows, tools, hooks, slash commands |
| **This curriculum** | .claude/skills/ in this repo | 32 | Battle-tested skills from phases 00-05 |
| **anthropics/skills** | github.com/anthropics/skills | 17 | Official Anthropic skills with full SKILL.md content (skill-creator, pdf, docx, pptx, xlsx, algorithmic-art, mcp-builder, etc.) |
| **AI Daily Brief master class** | play.aidailybrief.ai | 4 | researching-with-confidence, devils-advocate, morning-briefing, board-of-advisors |

**Total: ~990+ skills from 5 sources**

### The catalog builder

A Node.js script (`scripts/fetch-skills.ts`) that:
1. Fetches from GitHub API with 24-hour file caching (respects rate limits)
2. Parses YAML frontmatter from actual SKILL.md files where available
3. Parses README markdown to extract skill entries from curated lists
4. Auto-categorizes by level (1-5), category (15 categories), type (capability/preference), and coolness (1-5)
5. Deduplicates, sorts, and produces `data/catalog.json`
6. Works offline after first fetch — cached data is sufficient

### The 5-level classification (from AI Daily Brief Skills Master Class)

| Level | Name | Criteria |
|-------|------|----------|
| 1 | **Apprentice** | Simple, single SKILL.md, one clear job |
| 2 | **Builder** | Well-structured with sections, gotchas, output templates |
| 3 | **Arsenal** | Ready-to-use, customizable, has supporting files |
| 4 | **Strategist** | Chains, dispatches, loops — orchestrates other skills |
| 5 | **Architect** | Organizational library, version-controlled, team-wide |

### Capability vs Preference (from the master class)

- **Capability** — adds a new function (generating PDFs, working with APIs). May become obsolete as models improve.
- **Preference** — encodes YOUR workflow, YOUR standards. Gets more valuable over time. Invest here.

### The UI

**Browse view:**
- Card grid showing all skills (paginated or virtual-scrolled for 990+ entries)
- Each card: name, source badge (colored by source), level dots (1-5), category tag, type badge (CAP/PREF), coolness stars, description preview
- Responsive grid (1-4 columns)

**Filter sidebar:**
- Search bar: instant full-text across name + description + content
- Level checkboxes (Apprentice through Architect)
- Source checkboxes with counts (voltagent 747, community 192, curriculum 32, anthropic 17, masterclass 4)
- Category checkboxes (15 categories: development, design, devops, testing, documentation, security, etc.)
- Type toggle (all/capability/preference)
- Sort: name, level, coolness

**Detail view (slide-over panel):**
- Full SKILL.md rendered as formatted markdown with syntax-highlighted code blocks
- File list if skill has supporting files
- Copy SKILL.md button with clipboard toast
- View Source link to original GitHub URL
- Install instructions

### How the catalog is built

The catalog is **pre-built as static JSON** — no runtime API calls to GitHub. The fetch script can be re-run to refresh. This means:
- The app works offline once built
- No GitHub API rate limit issues at runtime
- Fast client-side filtering across 990+ entries

## Demo-grade minimums

- [x] Catalog contains skills from at least 3 different sources — **5 sources**
- [x] Browse view shows a card grid with at least 50 skills — **992 skills**
- [x] Filter by level, source, and category works
- [x] Search finds skills by name and description
- [x] Click a skill → see full SKILL.md rendered as markdown
- [x] Copy button copies skill content to clipboard
- [x] The app looks good — clean, modern, dark theme, enjoyable to browse
- [x] Each skill links back to its original source

## Out of scope

- Skill creation/editing (Anthropic's `skill-creator` handles this)
- User accounts or saved favorites
- Real-time GitHub API calls at runtime (use pre-built static catalog)
- Skill installation automation (copy-paste is fine for the demo)
- Rating/review system (coolness is auto-categorized, not user-generated)

## What we learned building this

1. **The Agent Skills open standard** (agentskills.io) makes skills portable across 44+ tools — Claude Code, Codex, Cursor, Gemini CLI, and more
2. **VoltAgent's awesome-agent-skills** is the richest single source (750+ from real vendor teams)
3. **GitHub API caching** is essential — 60 requests/hour limit means you need local caching
4. **Auto-categorization** works surprisingly well with keyword matching against skill descriptions
5. **Tailwind in a monorepo workspace** requires the CSS to be processed correctly — stale `.next` cache can cause styling failures

## Success criteria

1. A developer can find a useful skill they didn't know existed within 30 seconds of opening the app
2. They can read the full skill content and understand what it does
3. They can copy it and add it to their own project
4. Browsing is genuinely fun — you want to keep scrolling to see what else is out there
