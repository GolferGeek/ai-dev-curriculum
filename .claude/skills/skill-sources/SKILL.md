---
user-invocable: false
name: skill-sources
description: Where to find free Claude Code skills — GitHub repos, marketplaces, official examples. Data sources for the skills browser catalog.
category: skills-browser
used-by-agents: skill-catalog-builder
---

# Skill Sources

Where to find free Claude Code skills for the catalog. Each source is described with its URL, scale, quality level, and how to fetch content programmatically.

## Source 1: VoltAgent/awesome-agent-skills

- **URL:** https://github.com/VoltAgent/awesome-agent-skills
- **Scale:** 1,060+ skills
- **Quality:** Highest. Curated from official vendor teams — Anthropic, Google, Vercel, Stripe, Cloudflare, Supabase, and more.
- **License:** Varies by skill (check individual SKILL.md files)
- **How to fetch:** Clone the repo or use GitHub API to list directories. Each skill is a folder with a `SKILL.md`. Use raw content URLs for individual files:
  ```
  https://raw.githubusercontent.com/VoltAgent/awesome-agent-skills/main/{skill-name}/SKILL.md
  ```
  Use the GitHub API to list all directories:
  ```
  GET https://api.github.com/repos/VoltAgent/awesome-agent-skills/contents/
  ```

## Source 2: anthropics/skills

- **URL:** https://github.com/anthropics/skills
- **Scale:** 17 skills
- **Quality:** Official Anthropic examples. Reference implementations showing best practices.
- **License:** Apache 2.0
- **Notable skills:** `skill-creator` (meta-skill that builds other skills), document skills (`pdf`, `docx`, `pptx`, `xlsx`), design skills, `mcp-builder`.
- **How to fetch:** Same pattern as above — clone or use GitHub API:
  ```
  GET https://api.github.com/repos/anthropics/skills/contents/
  ```
  Raw content:
  ```
  https://raw.githubusercontent.com/anthropics/skills/main/{skill-name}/SKILL.md
  ```

## Source 3: hesreallyhim/awesome-claude-code

- **URL:** https://github.com/hesreallyhim/awesome-claude-code
- **Scale:** 36k+ stars. Curated ecosystem catalog.
- **Quality:** Mixed — this is an index, not a skill repository. It catalogs skills, agents, plugins, hooks, commands, and orchestrators from across the ecosystem. Quality depends on the linked source.
- **License:** Varies by linked project
- **Content type:** README-based catalog with links to external repos. CSV export available for bulk processing.
- **How to fetch:** Parse the README.md for links to skill repositories. Then fetch from each linked repo individually. The CSV export (if available) provides structured data:
  ```
  GET https://api.github.com/repos/hesreallyhim/awesome-claude-code/contents/README.md
  ```

## Source 4: skills.pawgrammer.com

- **URL:** https://skills.pawgrammer.com
- **Scale:** 280+ free community skills
- **Quality:** Community-contributed. Verification badges indicate tested skills.
- **Categories:** Development, Science, Business, Productivity, Infrastructure
- **How to fetch:** Web scrape or check if an API is available. Skills are organized by category with downloadable SKILL.md files. Look for a JSON API endpoint or structured data in the page source.

## Source 5: rohitg00/awesome-claude-code-toolkit

- **URL:** https://github.com/rohitg00/awesome-claude-code-toolkit
- **Scale:** 63 skills, 135 agents, 42 commands
- **Quality:** Bulk collection. Apache 2.0.
- **License:** Apache 2.0
- **How to fetch:** Clone the repo. Skills are in a structured directory:
  ```
  GET https://api.github.com/repos/rohitg00/awesome-claude-code-toolkit/contents/skills/
  ```

## How to Fetch from GitHub

General pattern for any GitHub-hosted skill repository:

1. **List directories** via the GitHub API:
   ```
   GET https://api.github.com/repos/{owner}/{repo}/contents/{path}
   ```
   Returns JSON array of directory entries. Filter for `type: "dir"` to find skill folders.

2. **Read SKILL.md** via raw content URL:
   ```
   https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{skill-folder}/SKILL.md
   ```

3. **Parse YAML frontmatter** from the SKILL.md content. Frontmatter is between `---` delimiters at the top of the file. Extract `name`, `description`, `user-invocable`, and any other fields.

4. **Check for supporting files** by listing the skill folder contents:
   ```
   GET https://api.github.com/repos/{owner}/{repo}/contents/{skill-folder}/
   ```
   Look for `scripts/`, `references/`, `assets/`, `examples/` subdirectories and additional files beyond SKILL.md.

5. **Rate limiting:** GitHub API allows 60 requests/hour unauthenticated, 5,000/hour with a token. For large repos (1,000+ skills), use a token and batch requests.

## The Open Standard

**agentskills.io** defines the portable skill format. Published by Anthropic and adopted by Microsoft, OpenAI, Atlassian, Figma, GitHub, and others.

Key points:
- Skills are folders with a `SKILL.md` file
- YAML frontmatter provides metadata
- The same skill works across Claude Code, Codex, Cursor, Gemini CLI, and 44+ tools
- The standard defines frontmatter fields, folder structure, and invocation semantics
- Portability means a skill written for Claude Code can be used in Cursor without modification (and vice versa)

This portability is what makes skill curation valuable — a single catalog serves users of any compatible tool.
