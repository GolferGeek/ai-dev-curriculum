# Plan — Skills Browser

> **Source PRD:** [prd-skills-browser.md](./prd-skills-browser.md)
> **Source intention:** [intention-skills-browser.md](./intention-skills-browser.md)
> **Skills:** [skill-catalog-design](../../.claude/skills/skill-catalog-design/SKILL.md), [skill-sources](../../.claude/skills/skill-sources/SKILL.md)
> **App location:** `apps/skills-browser/`

---

## Architecture Decision: Static JSON Catalog

The catalog is **static JSON** built at setup time, not fetched at runtime. This means:
- The app is fast and works offline once built
- No GitHub API calls at runtime — no rate-limit concerns for users
- The `build-catalog.ts` script can be re-run to refresh the catalog
- Baseline catalog is hardcoded so the app always works, even without a GitHub token

For the demo: include a curated set of ~80-120 skills with pre-fetched content. The script reads local curriculum skills (32 folders) and includes a hand-curated set of skills from VoltAgent, Anthropic, and community sources stored as seed data.

---

## Milestone 1: Catalog Builder

**Agent:** skill-catalog-builder
**Goal:** Produce `apps/skills-browser/data/catalog.json` with 50+ skill entries from 3+ sources.

### Files to create

| File | Purpose |
|------|---------|
| `apps/skills-browser/scripts/build-catalog.ts` | Main catalog builder script |
| `apps/skills-browser/scripts/parse-skill.ts` | Parse SKILL.md — extract YAML frontmatter, auto-categorize level/category/type/coolness |
| `apps/skills-browser/scripts/categorize.ts` | Auto-categorization logic: level from file count + line count, category from keyword analysis, type from capability/preference signals |
| `apps/skills-browser/scripts/seed-skills.ts` | Hand-curated seed data: ~50-70 skills from VoltAgent, Anthropic, and community sources with pre-fetched SKILL.md content |
| `apps/skills-browser/scripts/fetch-github.ts` | Optional GitHub fetcher: given a repo owner/name/path, fetches SKILL.md files via the GitHub API. Uses `GITHUB_TOKEN` env var when available. Falls back to seed data when offline or rate-limited. |
| `apps/skills-browser/data/catalog.json` | Output: the complete catalog (generated, not hand-edited) |
| `apps/skills-browser/scripts/tsconfig.json` | TypeScript config for the scripts (target: ES2022, module: NodeNext) |
| `apps/skills-browser/scripts/types.ts` | Shared types: `SkillEntry`, `SkillFile`, `SkillCatalog`, `SourceInfo` |

### Steps

1. Define the `SkillEntry`, `SkillCatalog`, and `SourceInfo` types in `types.ts` matching the PRD data model.
2. Implement `parse-skill.ts`:
   - Read a SKILL.md file, extract YAML frontmatter using a simple `---` delimiter parser (no external deps, or use `gray-matter` if available).
   - Extract `name`, `description`, `user-invocable` from frontmatter.
   - Return the raw markdown content as `content`.
3. Implement `categorize.ts`:
   - **Level:** Single file + <50 lines = 1, single file + 50+ lines = 2, has supporting files = 3, references other skills = 4, bundle/governance = 5.
   - **Category:** Scan description + content for keyword matches per the PRD category table. Default to `development`.
   - **Type:** Scan for capability keywords (`Bash`, `mcp`, `API`, `fetch`, `build`, `deploy`) vs preference keywords (`rules`, `conventions`, `standards`, `checklist`, `format`). Default to `capability`.
   - **Coolness:** Default to 3. Seed data can override.
4. Implement `seed-skills.ts`:
   - Export an array of pre-fetched skill entries from VoltAgent (pick ~20-30 interesting ones), Anthropic (all 17), and community sources (~10-15).
   - Each entry includes the full SKILL.md content pre-captured as a string.
   - Include `sourceUrl` pointing to the original GitHub location.
5. Implement `build-catalog.ts`:
   - Read all curriculum skills from `../../.claude/skills/*/SKILL.md` (relative to script location).
   - Parse each with `parse-skill.ts`, categorize with `categorize.ts`.
   - Merge with seed skills from `seed-skills.ts`.
   - Optionally fetch from GitHub (if `--fetch` flag is passed and `GITHUB_TOKEN` is set).
   - Deduplicate by `id` (source/skill-name).
   - Sort by name.
   - Write `catalog.json` with the `SkillCatalog` envelope: `{ version, generatedAt, totalSkills, sources[], skills[] }`.
6. Add a `build-catalog` script to the app's `package.json`.

### Verification

- `npx tsx apps/skills-browser/scripts/build-catalog.ts` produces valid JSON.
- `catalog.json` has `totalSkills >= 50`.
- `sources.length >= 3` (curriculum, VoltAgent, Anthropic at minimum).
- Each skill entry has all required fields (no `undefined` or `null` for `name`, `description`, `level`, `category`, `type`).

---

## Milestone 2: Next.js App Scaffolding

**Agent:** skill-browser-builder
**Goal:** A working Next.js app shell that starts on `localhost:3000`.

### Files to create

| File | Purpose |
|------|---------|
| `apps/skills-browser/package.json` | Next.js + Tailwind + react-markdown + rehype-highlight dependencies |
| `apps/skills-browser/tsconfig.json` | TypeScript config for the Next.js app |
| `apps/skills-browser/next.config.js` | Next.js config (output: standalone for monorepo) |
| `apps/skills-browser/tailwind.config.js` | Tailwind config with dark theme colors |
| `apps/skills-browser/postcss.config.js` | PostCSS config for Tailwind |
| `apps/skills-browser/app/layout.tsx` | Root layout: dark theme, `<html>` with dark class, header "Skills Browser", metadata |
| `apps/skills-browser/app/page.tsx` | Landing page placeholder: imports catalog.json, renders "X skills loaded" |
| `apps/skills-browser/app/globals.css` | Tailwind directives (`@tailwind base/components/utilities`), dark background, custom scrollbar |
| `apps/skills-browser/lib/types.ts` | Re-export or duplicate the `SkillEntry` / `SkillCatalog` types for the frontend |
| `apps/skills-browser/lib/catalog.ts` | Load and export catalog data from `data/catalog.json` |

### Steps

1. Create `package.json` with dependencies: `next`, `react`, `react-dom`, `tailwindcss`, `postcss`, `autoprefixer`, `react-markdown`, `rehype-highlight`, `remark-gfm`. Dev deps: `typescript`, `@types/react`, `@types/node`.
2. Create config files: `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`.
3. Create `app/globals.css` with Tailwind directives and dark-mode base styles.
4. Create `app/layout.tsx` with dark theme, header bar with "Skills Browser" title.
5. Create `app/page.tsx` that imports `catalog.json` and renders a simple count.
6. Create `lib/types.ts` and `lib/catalog.ts`.
7. Run `npm install` in the app directory.

### Verification

- `cd apps/skills-browser && npm run dev` starts without errors.
- `http://localhost:3000` shows the header and skill count.
- `npm run build` completes without errors.

---

## Milestone 3: Browse View (Card Grid)

**Agent:** skill-browser-builder
**Goal:** Landing page renders a responsive card grid of all skills.

### Files to create

| File | Purpose |
|------|---------|
| `apps/skills-browser/components/SkillCard.tsx` | Individual skill card component |
| `apps/skills-browser/components/SkillGrid.tsx` | Responsive grid container |
| `apps/skills-browser/components/badges/SourceBadge.tsx` | Colored badge by source (blue=Anthropic, green=VoltAgent, purple=curriculum, gray=community) |
| `apps/skills-browser/components/badges/LevelIndicator.tsx` | Level dots (1-5) with level name tooltip |
| `apps/skills-browser/components/badges/CategoryTag.tsx` | Pill badge for category |
| `apps/skills-browser/components/badges/TypeBadge.tsx` | Small "CAP" or "PREF" pill |
| `apps/skills-browser/components/badges/CoolnessRating.tsx` | Star rating (1-5) |

### Steps

1. Build badge components first — small, reusable, visually distinct.
   - `SourceBadge`: color map per source name, small rounded pill.
   - `LevelIndicator`: filled/unfilled dots, tooltip with level name (Apprentice/Builder/Arsenal/Strategist/Architect).
   - `CategoryTag`: pill with category name, subtle background color.
   - `TypeBadge`: "CAP" in blue or "PREF" in amber, small uppercase pill.
   - `CoolnessRating`: star icons, filled up to the coolness value.
2. Build `SkillCard.tsx`:
   - Card with subtle border, hover shadow transition.
   - Layout: name (bold, top), source badge (top-right), level indicator, category tag, description preview (2 lines, truncated with `line-clamp-2`), bottom row with type badge and coolness rating.
   - Entire card is clickable (sets selected skill state).
   - Add `data-testid="skill-card"` for testing.
3. Build `SkillGrid.tsx`:
   - CSS Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`.
   - Receives filtered skill list as prop.
   - Gap between cards.
4. Update `app/page.tsx`:
   - Import catalog, render `SkillGrid` with all skills.
   - Add a header showing total count.

### Verification

- Page shows a grid of skill cards.
- Cards display all required fields: name, source badge, level, category, type, coolness, description preview.
- Grid is responsive: 1 column on mobile, 2 on tablet, 3-4 on desktop.
- No `undefined` or `null` values visible in any card.

---

## Milestone 4: Filters + Search

**Agent:** skill-browser-builder
**Goal:** Users can filter and search the skill catalog client-side.

### Files to create

| File | Purpose |
|------|---------|
| `apps/skills-browser/components/FilterSidebar.tsx` | Filter sidebar with all filter controls |
| `apps/skills-browser/components/SearchBar.tsx` | Search input with debounce |
| `apps/skills-browser/components/SortDropdown.tsx` | Sort selector: name, level, coolness |
| `apps/skills-browser/components/SkillCount.tsx` | "Showing X of Y skills" label |
| `apps/skills-browser/lib/filters.ts` | Filter + search logic: apply filters, text search, sort |
| `apps/skills-browser/components/EmptyState.tsx` | "No skills match your filters" message |

### Steps

1. Implement `lib/filters.ts`:
   - `filterSkills(skills, filters)` — apply level, source, category, type, and coolness filters with AND logic.
   - `searchSkills(skills, query)` — full-text search across `name`, `description`, and `content`. Case-insensitive. Minimum 2 characters.
   - `sortSkills(skills, sortBy)` — sort by name (alpha), level (numeric), or coolness (numeric desc).
   - Extract unique values for each filter dimension from the catalog (for checkbox labels).
2. Build `SearchBar.tsx`:
   - Text input with search icon.
   - Debounced (300ms) onChange handler.
   - Clear button when text is present.
   - Shows result count when searching: "X results for 'query'".
3. Build `FilterSidebar.tsx`:
   - **Level** section: checkboxes for 1-5, each labeled with level name.
   - **Source** section: checkboxes for each source, with skill count next to each.
   - **Category** section: checkboxes for each category.
   - **Type** section: checkboxes for Capability / Preference.
   - **Coolness** section: minimum coolness slider (1-5) or checkboxes.
   - "Clear all filters" link at bottom.
   - Collapses to a top bar or hamburger menu on mobile.
4. Build `SortDropdown.tsx`: select/dropdown with sort options.
5. Build `SkillCount.tsx`: "Showing X of Y skills" with bold count numbers.
6. Build `EmptyState.tsx`: message + suggestion to broaden search.
7. Update `app/page.tsx`:
   - Add state for filters, search query, sort order.
   - Wire filter sidebar, search bar, sort dropdown to state.
   - Apply `filterSkills` + `searchSkills` + `sortSkills` pipeline.
   - Pass filtered results to `SkillGrid`.
   - Show `EmptyState` when filtered results are empty.
   - Show `SkillCount` above the grid.

### Verification

- Clicking a level checkbox reduces the card count; unchecking restores it.
- Clicking a source checkbox filters to that source only.
- Typing a known skill name in search shows matching cards.
- "Showing X of Y skills" updates as filters change.
- "Clear all filters" resets everything.
- Empty state appears when no skills match.
- Sort by coolness puts highest-rated skills first.

---

## Milestone 5: Detail View

**Agent:** skill-browser-builder
**Goal:** Clicking a skill card opens a detail panel showing the full SKILL.md and copy/link actions.

### Files to create

| File | Purpose |
|------|---------|
| `apps/skills-browser/components/SkillDetail.tsx` | Main detail view component (slide-over panel) |
| `apps/skills-browser/components/MarkdownRenderer.tsx` | Renders markdown with react-markdown + rehype-highlight + remark-gfm |
| `apps/skills-browser/components/FileTree.tsx` | Collapsible file tree for supporting files |
| `apps/skills-browser/components/CopyButton.tsx` | Copy-to-clipboard button with toast confirmation |

### Steps

1. Build `MarkdownRenderer.tsx`:
   - Uses `react-markdown` with `rehype-highlight` for syntax highlighting and `remark-gfm` for GitHub-flavored markdown (tables, strikethrough).
   - Styled with Tailwind prose classes (`prose prose-invert` for dark theme).
   - Code blocks get a dark background with copy button.
2. Build `CopyButton.tsx`:
   - Uses `navigator.clipboard.writeText()`.
   - Shows "Copied!" tooltip/toast for 2 seconds on success.
   - Falls back to `document.execCommand('copy')` if clipboard API unavailable.
3. Build `FileTree.tsx`:
   - Collapsible tree from the `files` array on a `SkillEntry`.
   - Click a file to show its content in a code viewer.
   - Shows file size next to each entry.
4. Build `SkillDetail.tsx`:
   - Slide-over panel from the right (or full-page on mobile).
   - **Header:** Skill name (h1), source badge linking to `sourceUrl`, level/category/type/coolness badges, file count.
   - **Actions bar:** "Copy SKILL.md" button, "View Source" link (`target="_blank"`, opens `sourceUrl`).
   - **Content:** Full SKILL.md rendered via `MarkdownRenderer`.
   - **Files section:** `FileTree` component (shown only if `files.length > 0`).
   - **Close button** or click-outside to dismiss.
   - Focus trap for accessibility; Escape key closes the panel.
5. Update `app/page.tsx`:
   - Add `selectedSkill` state.
   - Clicking a `SkillCard` sets `selectedSkill`.
   - Render `SkillDetail` when `selectedSkill` is set.
   - Overlay/backdrop behind the panel.

### Verification

- Clicking a card opens the detail panel with the skill's full content.
- Markdown renders with proper headings, code blocks (syntax highlighted), lists, and tables.
- "Copy SKILL.md" copies raw content to clipboard (verify with paste).
- "View Source" opens the correct GitHub URL in a new tab.
- File tree appears for skills that have supporting files.
- Escape key or close button dismisses the panel.

---

## Milestone 6: Polish

**Agent:** skill-browser-builder
**Goal:** Visual polish, performance, accessibility, and final demo readiness.

### Files to modify

| File | Change |
|------|--------|
| `apps/skills-browser/app/layout.tsx` | Add ecosystem stats in header (X skills from Y sources), footer with source attribution |
| `apps/skills-browser/components/SkillCard.tsx` | Smooth hover transitions, focus ring for keyboard navigation |
| `apps/skills-browser/components/SkillDetail.tsx` | Slide-in animation, smooth transitions, loading state |
| `apps/skills-browser/components/FilterSidebar.tsx` | Mobile-responsive collapse, smooth toggle animation |
| `apps/skills-browser/app/globals.css` | Custom scrollbar, selection colors, transition defaults |
| `apps/skills-browser/components/SkillGrid.tsx` | Pagination (50 per page) or virtual scrolling if catalog is large |

### Steps

1. **Card hover effects:** Subtle scale-up (1.02), shadow elevation, border color change on hover. Smooth transition (150ms).
2. **Detail panel animation:** Slide in from right with backdrop fade. Smooth close animation.
3. **Loading states:** Skeleton cards while catalog loads (if imported async).
4. **Header polish:** Show ecosystem stats: "Browsing X skills from Y sources". Subtle gradient or accent line.
5. **Footer:** Source attribution with links to VoltAgent, Anthropic, and community repos. "Built with the AI Dev Curriculum" link.
6. **Mobile responsive:** Filter sidebar collapses to a toggleable top section. Detail view goes full-screen on mobile. Cards stack single-column.
7. **Pagination:** If showing 50+ cards, paginate at 50 per page with page controls at the bottom.
8. **Accessibility:** `aria-label` on filter controls, `role="dialog"` on detail panel, keyboard-navigable cards (Tab + Enter), focus management when detail opens/closes.
9. **Empty state polish:** Illustration or icon, friendly copy, suggest actions.
10. Final pass: verify no `undefined`/`null` in UI, consistent spacing, readable typography, proper color contrast.

### Verification

- Cards have visible hover effects.
- Detail panel slides in/out smoothly.
- Filter sidebar collapses on mobile.
- App looks polished at 1280px, 768px, and 375px widths.
- Keyboard navigation works (Tab through cards, Enter to open, Escape to close).
- `npm run build` passes.
- All 8 demo-grade minimums from the intention are met.

---

## Risk Register

| Risk | Mitigation |
|------|------------|
| GitHub API rate limiting during catalog build | Seed data ensures the app always works without any API calls. `--fetch` flag is optional. |
| Large catalog (1000+ skills) slows the browser | Pagination at 50 per page. Keep catalog under 200 skills for the demo. |
| SKILL.md format varies across sources | Parser handles missing frontmatter gracefully — falls back to folder name for `name`, first paragraph for `description`. |
| External skill content changes or disappears | Static JSON means the catalog is a snapshot. Re-run build-catalog to refresh. |
| react-markdown bundle size | Use dynamic import for the detail view so markdown renderer only loads when needed. |

---

## Demo-Grade Checklist

Traced from [intention-skills-browser.md](./intention-skills-browser.md):

- [ ] Catalog contains skills from at least 3 different sources (M1)
- [ ] Browse view shows a card grid with at least 50 skills (M3)
- [ ] Filter by level, source, and category works (M4)
- [ ] Search finds skills by name and description (M4)
- [ ] Click a skill -> see full SKILL.md rendered as markdown (M5)
- [ ] Copy button copies skill content to clipboard (M5)
- [ ] The app looks good -- clean, modern, enjoyable to browse (M6)
- [ ] Each skill links back to its original source (M5)

---

**Next step:** `/run-plan` to execute milestones in order, starting with Milestone 1 (catalog builder).
