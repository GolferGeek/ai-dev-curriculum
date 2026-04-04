---
user-invocable: false
name: skill-catalog-design
description: Data model and UI design for the skills browser — categorization by level/source/category/coolness, search, filtering, skill preview with copy-to-clipboard.
category: skills-browser
used-by-agents: skill-catalog-builder, skill-browser-builder
---

# Skill Catalog Design

Data model, categorization rules, and UI design for the skills browser application. This skill is the shared contract between the catalog builder (produces data) and the browser builder (displays data).

## Data Model

Every skill in the catalog is represented as a `SkillEntry`:

```typescript
interface SkillEntry {
  id: string;                    // unique: source/skill-name
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
  hasExamples: boolean;          // has examples
  fileCount: number;             // total files in skill folder
  content: string;               // full SKILL.md content
  files: { name: string; content: string }[];  // supporting files
}
```

The catalog is stored as a JSON array of `SkillEntry` objects. The browser reads this file at build time (static import) or at runtime (fetch from public directory).

## Categorization Rules

### Level (1-5)

Based on complexity indicators found in the skill folder and content:

| Level | Name | Indicators |
|-------|------|------------|
| 1 | Apprentice | Single SKILL.md, < 50 lines, no supporting files |
| 2 | Builder | Single SKILL.md, 50+ lines, structured sections (steps, output format, constraints) |
| 3 | Arsenal | Has supporting files (scripts/, references/, examples/), immediately usable |
| 4 | Strategist | References other skills (chaining), dispatches to sub-skills, defines loops |
| 5 | Architect | Bundle of skills, org-wide scope, defines ownership/governance |

When auto-categorizing: check file count first, then scan content for chain/dispatch keywords (`mandatory-skills`, `used-by-agents`, `delegates to`, `chains with`).

### Category

Infer from description + content keywords. Standard categories:

- **development** — coding, building, testing, debugging
- **security** — scanning, hardening, auth, secrets
- **productivity** — workflows, automation, templates
- **research** — analysis, competitive intelligence, documentation
- **infrastructure** — deployment, CI/CD, monitoring
- **design** — UI/UX, prototyping, design systems
- **data** — databases, schemas, migrations, queries
- **communication** — writing, reviews, presentations
- **quality** — linting, architecture rules, PR evaluation

If no clear category matches, default to `development`.

### Coolness (1-5)

Subjective rating based on:

- **Usefulness** — how broadly applicable is this skill? (1 = niche, 5 = everyone needs this)
- **Creativity** — does it solve the problem in a clever way? (1 = obvious, 5 = "I never thought of that")
- **Wow-factor** — would you show this to a colleague? (1 = mundane, 5 = jaw-dropping)

Average the three dimensions and round. For auto-categorization, default to 3 (neutral) and let curators adjust.

### Type (capability vs preference)

- **Capability:** the skill adds functions the model cannot do alone — browser testing, API integrations, file format parsing, external tool wrappers. Keywords: `Bash`, `mcp`, `API`, `fetch`, `scrape`, `build`, `deploy`.
- **Preference:** the skill encodes a workflow, standard, or decision — commit conventions, architecture rules, review checklists, reporting formats. Keywords: `rules`, `conventions`, `standards`, `checklist`, `format`, `template`, `report`.

When both apply, prefer `capability` if the skill primarily executes external actions.

## UI Design

### Browse View (Card Grid)

The default landing page shows a responsive card grid with filtering sidebar.

**Each card shows:**
- Skill name (bold, linked to detail view)
- Source badge (small, colored by source — e.g., blue for Anthropic, green for VoltAgent)
- Level indicator (1-5 dots or stars)
- Category tag (pill badge)
- Description preview (first 100 characters, truncated with ellipsis)
- Coolness indicator (fire emoji count or star rating)
- Type badge (small "CAP" or "PREF" pill)

**Card layout:**
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Cards have subtle hover effect (shadow or border highlight)
- Click anywhere on the card to open detail view

**Empty state:** "No skills match your filters. Try broadening your search."

### Filter Sidebar

Left sidebar (collapses to top bar on mobile) with:

- **Search box** — full-text search across name + description + content. Debounced, results update as you type.
- **Level** — checkboxes for each level (1-5) with level name labels
- **Source** — checkboxes for each source (VoltAgent, Anthropic, etc.)
- **Category** — checkboxes for each category with skill count badges
- **Type** — two checkboxes: Capability, Preference
- **Coolness** — range slider (1-5 minimum coolness)
- **Clear all filters** link at the bottom

Show the total count of matching skills above the grid: "Showing 142 of 1,400 skills"

### Detail View

Full-page or modal view for a single skill:

**Header section:**
- Skill name (h1)
- Source badge with link to original
- Level, category, type, coolness badges
- File count indicator

**Content section:**
- Full SKILL.md rendered as formatted markdown
- Syntax highlighting for code blocks
- Proper heading hierarchy

**File tree section** (if skill has supporting files):
- Collapsible tree showing all files in the skill folder
- Click a file to view its content
- Each file shows its size

**Action buttons:**
- **Copy SKILL.md** — copies the full SKILL.md content to clipboard
- **Copy folder** — copies the entire skill folder structure as a shell script that recreates it
- **View source** — opens the original source URL in a new tab
- **Install command** — shows a copyable one-liner to install the skill:
  ```
  git clone --depth 1 --filter=blob:none --sparse {repo-url} && cd {repo} && git sparse-checkout set {skill-folder}
  ```

### Search

- Full-text search across `name`, `description`, and `content` fields
- Results ranked by relevance (name match > description match > content match)
- Search highlights matching terms in the card description
- Minimum 2 characters to trigger search
- Show search result count: "42 results for 'security'"

## Catalog File Format

The catalog builder produces a single JSON file:

```json
{
  "version": "1.0.0",
  "generatedAt": "2026-04-01T12:00:00Z",
  "totalSkills": 1400,
  "sources": [
    { "name": "VoltAgent", "url": "https://github.com/VoltAgent/awesome-agent-skills", "count": 1060 }
  ],
  "skills": [
    { ... SkillEntry ... }
  ]
}
```

The browser reads this file. For large catalogs (1,000+), consider splitting into an index file (metadata only, no `content` or `files` fields) and individual detail files loaded on demand.
