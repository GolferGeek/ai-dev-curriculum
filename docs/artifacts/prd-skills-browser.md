# PRD — Skills Browser

> **Source intention:** [intention-skills-browser.md](./intention-skills-browser.md)
> **App location:** `apps/skills-browser/`

---

## 1. Goals

Traced from intention success criteria:

| # | Goal | Intention trace |
|---|------|-----------------|
| G1 | A developer finds a useful skill they didn't know existed within 30 seconds of opening the app | Success criterion 1 |
| G2 | They can read the full skill content and understand what it does | Success criterion 2 |
| G3 | They can copy a skill and add it to their own project | Success criterion 3 |
| G4 | Browsing is genuinely fun — you want to keep scrolling to see what else is out there | Success criterion 4 |

## 2. Non-goals

Traced from intention "Out of scope":

- **No skill creation or editing** — Anthropic's `skill-creator` handles that.
- **No user accounts or saved favorites** — this is a browse-only tool.
- **No real-time GitHub API calls** — the catalog is pre-built static JSON.
- **No skill installation automation** — copy-paste is sufficient for the demo.
- **No rating/review system** — coolness is curated, not user-generated.

## 3. User stories

### US-1: Browse the catalog
> As a developer, I want to see a card grid of all available skills so I can scan what exists across the ecosystem.

**Acceptance:** Landing page renders a responsive card grid (3 cols desktop, 2 tablet, 1 mobile) with at least 50 skills from at least 3 sources. Each card shows name, source badge, level indicator, category tag, description preview, coolness rating, and type badge.

### US-2: Filter skills
> As a developer, I want to filter by level, source, category, and type so I can narrow down to skills relevant to my needs.

**Acceptance:** Sidebar contains checkbox filters for level (1–5), source (per-repo), category (development, security, productivity, etc.), and type (capability / preference). A coolness range slider sets the minimum coolness threshold. Filters combine with AND logic. A "Clear all filters" link resets everything. Count label shows "Showing X of Y skills."

### US-3: Search skills
> As a developer, I want to search by keyword so I can find a specific skill quickly.

**Acceptance:** Search box performs full-text search across name, description, and content fields. Debounced (300 ms). Minimum 2 characters to trigger. Matching terms highlighted in card descriptions. Result count displayed: "42 results for 'security'."

### US-4: Preview a skill
> As a developer, I want to click a skill card and see its full SKILL.md rendered as formatted markdown so I can evaluate whether it's useful.

**Acceptance:** Detail view shows: skill name (h1), source badge linking to the original repo, level/category/type/coolness badges, full SKILL.md rendered with proper heading hierarchy and syntax-highlighted code blocks. If the skill has supporting files, a collapsible file tree is shown; clicking a file displays its content.

### US-5: Copy a skill
> As a developer, I want to copy a skill's SKILL.md content to my clipboard so I can add it to my own project.

**Acceptance:** Detail view has a "Copy SKILL.md" button. Clicking it copies the raw SKILL.md content to the system clipboard and shows a brief success confirmation (e.g., "Copied!" tooltip for 2 seconds). A "View source" button opens the original source URL in a new tab.

## 4. Technical requirements

### 4A. Catalog builder (`scripts/build-catalog.ts` or similar)

The catalog builder is a Node.js script that runs at build time (or on demand) to produce `public/catalog.json`.

| Step | Description |
|------|-------------|
| **Fetch** | Clone or use GitHub API to retrieve SKILL.md files from at least 3 sources: VoltAgent/awesome-agent-skills, anthropics/skills, and this curriculum's `.claude/skills/`. Optional: rohitg00/awesome-claude-code-toolkit, skills.pawgrammer.com. Respect rate limits (use `GITHUB_TOKEN` env var when available for 5,000 req/hr). |
| **Parse** | Extract YAML frontmatter (`name`, `description`, `user-invocable`, etc.) and body content from each SKILL.md. Use a frontmatter parser (e.g., `gray-matter`). |
| **Categorize** | Auto-assign `level` (1–5) based on file count and content complexity per the categorization rules in skill-catalog-design. Auto-assign `category` from keyword analysis. Auto-assign `type` (capability/preference) from keyword signals. Default `coolness` to 3. |
| **List supporting files** | For each skill folder, list non-SKILL.md files and include their content in the `files` array. |
| **Produce JSON** | Write `catalog.json` with schema: `{ version, generatedAt, totalSkills, sources[], skills[] }`. For catalogs over 500 skills, also produce an index file (metadata only, no `content`/`files`) for fast initial load, with detail files loaded on demand. |

### 4B. Browser app (`apps/skills-browser/`)

| Requirement | Detail |
|-------------|--------|
| **Framework** | Next.js (App Router) with Tailwind CSS for styling. Lives in `apps/skills-browser/` in the Turborepo monorepo. |
| **Static data** | Import `catalog.json` at build time or serve from `public/`. No runtime API calls to GitHub. App works offline once built. |
| **Browse view** | Responsive card grid as the landing page. Filter sidebar on the left (collapses to top bar on mobile). Search bar at the top. Sort options: name, level, coolness, source. |
| **Detail view** | Full-page or slide-over panel. Markdown rendered with `react-markdown` (or similar) with syntax highlighting via `rehype-highlight` or `shiki`. File tree component for supporting files. |
| **Copy to clipboard** | Use the Clipboard API (`navigator.clipboard.writeText`). Show success feedback. |
| **Performance** | For large catalogs, implement client-side pagination or virtual scrolling (e.g., 50 cards per page). Search should use a lightweight client-side index (e.g., `fuse.js` or `flexsearch`). |
| **Empty state** | "No skills match your filters. Try broadening your search." |
| **Accessibility** | Keyboard-navigable cards, proper aria labels on filter controls, focus management on detail view open/close. |

## 5. Data model

```typescript
interface SkillEntry {
  id: string;                    // unique: "{source}/{skill-name}"
  name: string;                  // from frontmatter or folder name
  description: string;           // from frontmatter
  source: string;                // which repo/marketplace it came from
  sourceUrl: string;             // link to original
  level: 1 | 2 | 3 | 4 | 5;    // apprentice through architect
  category: string;              // development, security, productivity, research, etc.
  type: 'capability' | 'preference';
  coolness: 1 | 2 | 3 | 4 | 5; // subjective rating
  userInvocable: boolean;
  hasScripts: boolean;           // has supporting scripts/
  hasExamples: boolean;          // has examples/
  fileCount: number;             // total files in skill folder
  content: string;               // full SKILL.md content (raw markdown)
  files: SkillFile[];            // supporting files
}

interface SkillFile {
  name: string;                  // relative path within skill folder
  content: string;               // file content
}

interface SkillCatalog {
  version: string;               // semver, e.g. "1.0.0"
  generatedAt: string;           // ISO 8601 timestamp
  totalSkills: number;
  sources: SourceInfo[];
  skills: SkillEntry[];
}

interface SourceInfo {
  name: string;                  // display name, e.g. "VoltAgent"
  url: string;                   // repo or site URL
  count: number;                 // skills from this source
}
```

### Level categorization reference

| Level | Name | Rule |
|-------|------|------|
| 1 | Apprentice | Single SKILL.md, < 50 lines, no supporting files |
| 2 | Builder | Single SKILL.md, 50+ lines, structured sections |
| 3 | Arsenal | Has supporting files (scripts/, references/, examples/) |
| 4 | Strategist | References other skills, chaining, dispatch, loops |
| 5 | Architect | Bundle of skills, org-wide scope, governance |

### Category keywords

| Category | Signal keywords |
|----------|----------------|
| development | code, build, test, debug, lint, compile, framework |
| security | scan, harden, auth, secrets, vulnerability, CVE |
| productivity | workflow, automation, template, shortcut, efficiency |
| research | analysis, competitive, documentation, investigate |
| infrastructure | deploy, CI/CD, monitoring, Docker, Kubernetes |
| design | UI, UX, prototype, Figma, design system, layout |
| data | database, schema, migration, query, SQL, SurrealDB |
| communication | writing, review, presentation, report, email |
| quality | lint, architecture, PR, evaluation, standards |

## 6. UI wireframes

### Browse view (desktop)

```
+------------------------------------------------------------------+
|  Skills Browser                              [Sort: coolness v]  |
+------------------------------------------------------------------+
|           |                                                      |
| FILTERS   |  Showing 142 of 1,400 skills                        |
|           |                                                      |
| [Search___]  +-------------+ +-------------+ +-------------+    |
|           |  | skill-creat | | pdf         | | mcp-builder |    |
| Level     |  | Anthropic   | | Anthropic   | | VoltAgent   |    |
| [x] 1 App |  | ** Lv3      | | *** Lv2     | | **** Lv4    |    |
| [x] 2 Bld |  | [develop.]  | | [productiv] | | [develop.]  |    |
| [x] 3 Ars |  | "Meta-skill | | "Read and   | | "Build MCP  |    |
| [ ] 4 Str |  |  that..."   | |  parse..."  | |  servers.." |    |
| [ ] 5 Arc |  | CAP  cool:4 | | CAP  cool:3 | | CAP  cool:5 |    |
|           |  +-------------+ +-------------+ +-------------+    |
| Source    |                                                      |
| [x] Volt  |  +-------------+ +-------------+ +-------------+    |
| [x] Anthr |  | commit-conv | | board-of-ad | | morning-bri |    |
| [x] Curri |  | Curriculum  | | Community   | | Community   |    |
| [ ] Pawgr |  | ** Lv2      | | ** Lv2      | | *** Lv3     |    |
|           |  | [quality]   | | [research]  | | [productiv] |    |
| Category  |  | "Pre-commit | | "Simulate   | | "Summarize  |    |
| [x] devel |  |  quality.." | |  expert..." | |  overnight."|    |
| [x] secur |  | PREF cool:3 | | PREF cool:4 | | CAP  cool:4 |    |
| [ ] produ |  +-------------+ +-------------+ +-------------+    |
| [ ] resea |                                                      |
|           |  +-------------+ +-------------+ +-------------+    |
| Type      |  |  ...        | |  ...        | |  ...        |    |
| [x] CAP   |  +-------------+ +-------------+ +-------------+    |
| [x] PREF  |                                                      |
|           |  < 1  2  3  4  5 ... 24 >   (pagination)            |
| Coolness  |                                                      |
| [====>  ] |                                                      |
|  min: 3   |                                                      |
|           |                                                      |
| Clear all |                                                      |
+-----------+------------------------------------------------------+
```

### Detail view (full page or slide-over)

```
+------------------------------------------------------------------+
|  [< Back to browse]                                              |
+------------------------------------------------------------------+
|                                                                  |
|  # skill-creator                                                 |
|                                                                  |
|  [Anthropic]  Level 3 - Arsenal  [development]  CAP  cool: 4    |
|  3 files                                                         |
|                                                                  |
|  [Copy SKILL.md]  [Copy folder]  [View source ->]               |
|                                                                  |
+------------------------------------------------------------------+
|                                                                  |
|  ## Install                                                      |
|  ```                                                             |
|  mkdir -p .claude/skills/skill-creator                           |
|  # paste SKILL.md into .claude/skills/skill-creator/SKILL.md    |
|  ```                                                             |
|                                                                  |
|  ---                                                             |
|                                                                  |
|  ## SKILL.md                                (rendered markdown)  |
|  ┌──────────────────────────────────────────────────────────┐    |
|  │ ---                                                      │    |
|  │ name: skill-creator                                      │    |
|  │ description: Create new Claude Code skills from a...     │    |
|  │ ---                                                      │    |
|  │                                                          │    |
|  │ # Skill Creator                                          │    |
|  │                                                          │    |
|  │ When this skill applies:                                 │    |
|  │ - User asks to create a new skill                        │    |
|  │ - User asks to convert a workflow into a skill           │    |
|  │                                                          │    |
|  │ ## Steps                                                 │    |
|  │ 1. Identify the core job of the skill...                 │    |
|  │ 2. Write the SKILL.md with frontmatter...                │    |
|  │ ...                                                      │    |
|  └──────────────────────────────────────────────────────────┘    |
|                                                                  |
|  ## Files                                    (collapsible tree)  |
|  v skill-creator/                                                |
|    > SKILL.md                                          (2.1 KB)  |
|    > templates/                                                  |
|      > basic-skill.md                                  (0.8 KB)  |
|    > examples/                                                   |
|      > example-output.md                               (1.2 KB)  |
|                                                                  |
+------------------------------------------------------------------+
```

## 7. Test expectations

Each demo-grade minimum from the intention must be verifiable:

| Demo-grade minimum | How to verify |
|--------------------|---------------|
| Catalog contains skills from at least 3 different sources | Automated test: parse `catalog.json`, assert `sources.length >= 3` and each source has `count > 0`. |
| Browse view shows a card grid with at least 50 skills | Browser test: load the app, count rendered card elements (`[data-testid="skill-card"]`), assert `>= 50`. |
| Filter by level, source, and category works | Browser test: click a level filter checkbox, assert card count decreases. Repeat for source and category. Verify "Showing X of Y" label updates. Clear filters, assert original count restored. |
| Search finds skills by name and description | Browser test: type a known skill name in the search box, assert matching card appears. Type a keyword from a known description, assert relevant card appears. Assert result count label updates. |
| Click a skill → see full SKILL.md rendered as markdown | Browser test: click a card, assert detail view opens. Assert the h1 matches the skill name. Assert the rendered content contains markdown elements (headings, code blocks, lists). |
| Copy button copies skill content to clipboard | Browser test: open a skill detail, click "Copy SKILL.md", read clipboard content, assert it matches the skill's raw `content` field from the catalog. (Note: clipboard access requires `--enable-features=ClipboardContentSetting` in headless Chrome or use of the Permissions API.) |
| The app looks good — clean, modern, enjoyable to browse | Manual review: screenshot the browse view and detail view. Verify consistent spacing, readable typography, proper color contrast, responsive layout at 3 breakpoints (desktop 1280px, tablet 768px, mobile 375px). |
| Each skill links back to its original source | Browser test: open a skill detail, assert the "View source" link `href` starts with `https://github.com/` (or the appropriate source domain). Assert the link opens in a new tab (`target="_blank"`). |

### Additional build verification

- `npm run build` in `apps/skills-browser/` completes without errors.
- `catalog.json` is valid JSON and conforms to the `SkillCatalog` interface (validate with a TypeScript script or JSON schema).
- All card fields render (no `undefined` or `null` displayed in the UI).
- Search + filter combination works (apply a filter, then search within filtered results).

---

**Next step:** `/plan` to produce implementation milestones and agent assignments.
