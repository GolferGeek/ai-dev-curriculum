# Intention — Skills Browser

## Why

Reusable skills and specialized agents are scattered across public
repositories, community catalogs, vendor examples, and internal projects.
Counts and formats change continuously. Discovering them requires browsing
multiple sources, inspecting complete folders, comparing revisions, and
judging whether a behavioral dependency is appropriate for a real
organization.

We're building that tool: a browseable, searchable, refreshable capability
catalog from configured sources—functionally organized, provenance-aware,
fully previewable, revision-specific, and ready for evidence-based evaluation.

## Who

- **Primary:** Developers looking for skills to add to their projects
- **Secondary:** Learners in this curriculum exploring the ecosystem
- **Tertiary:** Teams evaluating which skills to adopt organization-wide

## What we're building

A **Capability Browser** app (`apps/skills-browser/`) — a Next.js app that
fetches skills and specialized agent definitions from configured sources,
catalogs exact revisions, and lets developers browse, search, filter, preview,
compare, and evaluate them.

### Data sources (all free, open source)

| Source type | Example | What's retained |
|--------|-----|-------------|
| **Canonical internal library** | `ai/` in this repository | Skills, agents, function membership, ownership, and generated projections |
| **Official examples/specifications** | Configured vendor or standard repositories | Exact revision, license, complete folders, and format metadata |
| **Curated public catalogs** | Approved GitHub sources | Candidate links, source signals, and parse status |
| **Client/internal repositories** | Approved organization sources | Private capabilities subject to client access and data policy |

Counts are refreshed during each scouting run and displayed with source revision and timestamp; no total is treated as permanent.

### The catalog builder

A Node.js script (`scripts/fetch-skills.ts`) that:
1. Fetches from GitHub API with 24-hour file caching (respects rate limits)
2. Parses YAML frontmatter from actual SKILL.md files where available
3. Parses README markdown to extract skill entries from curated lists
4. Auto-categorizes by level (1-5), category (15 categories), type (capability/preference), and coolness (1-5)
5. Deduplicates without erasing forks, diffs the prior run, and produces `data/catalog.json`
6. Works offline after first fetch — dated cached snapshots remain visibly
   distinct from a current refresh
7. Parses both skill folders and supported native agent formats without
   discarding unknown metadata

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
- Card grid showing skills and agents (paginated or virtual-scrolled)
- Each card: name, source badge (colored by source), level dots (1-5), category tag, type badge (CAP/PREF), coolness stars, description preview
- Responsive grid (1-4 columns)

**Filter sidebar:**
- Search bar: instant full-text across name + description + content
- Level checkboxes (Apprentice through Architect)
- Source checkboxes with counts from the selected scouting run
- Category checkboxes (15 categories: development, design, devops, testing, documentation, security, etc.)
- Type toggle (all/capability/preference)
- Sort: name, level, coolness

**Detail view (slide-over panel):**
- Full SKILL.md rendered as formatted markdown with syntax-highlighted code blocks
- File list if skill has supporting files
- Evaluation action with personal/project/enterprise scope recommendation
- View Source link to original GitHub URL
- Evaluation and export actions clearly labeled as unapproved

### How the catalog is built

The catalog is **pre-built as static JSON** — no runtime API calls to GitHub. The fetch script can be re-run to refresh. This means:
- The app works offline once built
- No GitHub API rate limit issues at runtime
- Fast client-side filtering across the full current catalog, with the displayed total computed from data

## Demo-grade minimums

- [ ] Catalog refreshes from at least three configured sources or dated caches
- [ ] Skills and specialized agents are represented
- [ ] Source snapshots preserve exact revisions and file hashes
- [ ] Search and function/kind/source/harness/risk/trust filters work
- [ ] Click a capability to preview every file and requested authority
- [ ] Compare revisions and scouting runs
- [ ] Complete three evidence-backed evaluations including one rejection
- [ ] Every capability links to its original source and revision

## Out of scope

- Skill creation/editing (Anthropic's `skill-creator` handles this)
- User accounts or saved favorites
- Real-time GitHub API calls at runtime (use pre-built static catalog)
- Skill or agent installation automation
- Organizational publication and persistent shared policy (Phase 05.5)

## What we learned building this

1. Skill-folder conventions can be portable, while specialized agent formats
   still require native projections.
2. Canonical function groups improve organizational browsing without forcing
   runtime directories to be nested.
3. Source counts and adoption claims decay; snapshots, timestamps, and diffs
   matter more than headline totals.
4. Caching is operationally necessary, but stale data must remain visible.
5. Classification helps discovery; human review of complete content and
   authority remains necessary.

## Success criteria

1. A developer can find a useful skill they didn't know existed within 30 seconds of opening the app
2. They can read the full skill content and understand what it does
3. They can explain the evidence, authority, and revision behind a recommendation
4. They can reject or restrict a candidate without pressure to install it
