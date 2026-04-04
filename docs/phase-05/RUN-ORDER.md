# Run order — Phase 05

## Before you start

- [ ] Phase 04 complete (comfortable with the full pipeline)
- [ ] Node.js 18+ installed
- [ ] GitHub access (for fetching skill repos)

## Steps

| Step | What to type | What happens |
|------|-------------|-------------|
| 1 | `/intention docs/artifacts/intention-skills-browser.md` | Review the intention |
| 2 | `/prd docs/artifacts/intention-skills-browser.md` | Generate PRD |
| 3 | `/plan docs/artifacts/prd-skills-browser.md` | Create implementation plan |
| 4 | `/run-plan docs/artifacts/plan-skills-browser.md` | Build the app |
| 5 | Open `http://localhost:3000` | Browse the skills catalog |
| 6 | `/scan-errors skills-browser` | Check for errors |
| 7 | `/commit pr` | Ship it |

## If something fails

- **GitHub API rate limit** → The catalog builder should cache fetched skills as static JSON. Once built, the app works offline.
- **Skill parsing errors** → Some community skills have non-standard frontmatter. The parser should be lenient — extract what it can, skip what it can't.
- **Too many skills to display** → Pagination or virtual scrolling. The catalog may have 1,000+ entries.
