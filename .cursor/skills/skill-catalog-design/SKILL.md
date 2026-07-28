---
user-invocable: false
name: skill-catalog-design
description: Data model and UI design for a capability browser covering skills and specialized agents with provenance, trust, search, filtering, and safe preview.
category: skills-browser
used-by-agents: skill-catalog-builder, skill-browser-builder
---

# Capability Catalog Design

This is the shared contract between the catalog builder and capability browser.
It preserves the difference between a reusable procedure and a delegated role.

## Data Model

Every item is represented as a `CapabilityEntry`:

```typescript
interface CapabilityEntry {
  id: string;                    // unique: source/revision/path
  kind: 'skill' | 'agent';
  name: string;                  // from frontmatter or folder name
  description: string;
  source: string;                // which repo/marketplace it came from
  sourceUrl: string;             // link to original
  sourceRevision: string;
  retrievedAt: string;           // ISO date
  license: string | 'review-required';
  contentHash: string;
  originalPath: string;
  observedFormat: string;        // skill folder, Claude agent, Cursor agent, Codex TOML...
  supportedHarnesses: string[];
  level: 1 | 2 | 3 | 4 | 5;    // apprentice through architect
  function: string;              // stable organizational taxonomy
  category: string;              // secondary discovery label
  type: 'capability' | 'preference';
  maturity: 'candidate' | 'evaluated' | 'approved' | 'restricted' | 'retired';
  userInvocable: boolean;
  hasScripts: boolean;
  hasExamples: boolean;
  fileCount: number;
  content: string;               // exact source definition
  files: { name: string; content: string; size: number }[];
  warnings: string[];
}
```

The browser reads a versioned static JSON catalog. Unknown metadata is
preserved where practical rather than silently dropped.

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

### Maturity

- **candidate:** discovered, not trusted or installable by default;
- **evaluated:** exact revision inspected and tested;
- **approved:** authorized for a stated scope;
- **restricted:** allowed only under named conditions; and
- **retired:** preserved for history but no longer selected.

Popularity and novelty may aid discovery, but they are not trust or maturity.

### Type (capability vs preference)

- **Capability:** the skill adds functions the model cannot do alone — browser testing, API integrations, file format parsing, external tool wrappers. Keywords: `Bash`, `mcp`, `API`, `fetch`, `scrape`, `build`, `deploy`.
- **Preference:** the skill encodes a workflow, standard, or decision — commit conventions, architecture rules, review checklists, reporting formats. Keywords: `rules`, `conventions`, `standards`, `checklist`, `format`, `template`, `report`.

When both apply, prefer `capability` if the skill primarily executes external actions.

## UI Design

### Browse View (Card Grid)

The default landing page shows a responsive card grid with filtering sidebar.

**Each card shows:**
- Capability name and kind (skill or agent)
- Source badge (small, colored by source — e.g., blue for Anthropic, green for VoltAgent)
- Level indicator (1-5 dots or stars)
- Category tag (pill badge)
- Description preview (first 100 characters, truncated with ellipsis)
- Maturity and license status
- Type badge (small "CAP" or "PREF" pill)

**Card layout:**
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Cards have subtle hover effect (shadow or border highlight)
- Click anywhere on the card to open detail view

**Empty state:** "No capabilities match your filters. Try broadening your search."

### Filter Sidebar

Left sidebar (collapses to top bar on mobile) with:

- **Search box** — full-text search across name + description + content. Debounced, results update as you type.
- **Level** — checkboxes for each level (1-5) with level name labels
- **Source** — checkboxes for each source (VoltAgent, Anthropic, etc.)
- **Category** — checkboxes for each category with skill count badges
- **Type** — two checkboxes: Capability, Preference
- **Kind and maturity** — skill/agent plus lifecycle state
- **Clear all filters** link at the bottom

Show computed counts above the grid, for example: "Showing 142 of 318
capabilities." Never hard-code a catalog total in the interface or course copy.

### Detail View

Full-page or modal view for one capability:

**Header section:**
- Capability name and kind (h1)
- Source badge with link to original
- Level, function, category, type, maturity, and license badges
- Revision, retrieval date, hash, observed format, and harness compatibility
- File count indicator

**Content section:**
- Full source definition rendered safely as Markdown or text
- Syntax highlighting for code blocks
- Proper heading hierarchy

**File tree section** (if skill has supporting files):
- Collapsible tree showing all files in the skill folder
- Click a file to view its content
- Each file shows its size

**Action buttons:**
- **Copy source** — copies the exact definition with attribution
- **Export reviewed bundle** — available only for entries whose policy permits it
- **View source** — opens the original source URL in a new tab

The browser must not present an unreviewed one-line installation action.

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
  "generatedAt": "2026-07-28T12:00:00Z",
  "totalCapabilities": 318,
  "sources": [
    {
      "name": "example-source",
      "url": "https://example.invalid/repository",
      "revision": "pinned-revision",
      "retrievedAt": "2026-07-28",
      "status": "complete",
      "count": 318
    }
  ],
  "capabilities": [
    { "...": "CapabilityEntry" }
  ]
}
```

The browser reads this file. If measured performance shows the catalog is too
large for one payload, split it into a metadata index and detail files loaded on
demand. Base that decision on a performance budget, not a remembered catalog
size.
