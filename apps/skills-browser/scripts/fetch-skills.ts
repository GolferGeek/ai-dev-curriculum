/**
 * fetch-skills.ts — Fetches real skill data from GitHub and local sources,
 * then produces a comprehensive catalog.json.
 *
 * Sources:
 *   1. anthropics/skills (GitHub API — actual SKILL.md files)
 *   2. VoltAgent/awesome-agent-skills (README parse)
 *   3. hesreallyhim/awesome-claude-code (README parse)
 *   4. Local curriculum skills (.claude/skills/*)
 *   5. AI Daily Brief master-class skills
 *
 * Usage:  npx tsx scripts/fetch-skills.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseSkillFolder } from './parse-skill';
import { autoCategorizeSeed } from './categorize';
import type { SkillCatalog, SkillEntry, SourceInfo } from './types';

// ── Paths ────────────────────────────────────────────────────────────────────
const SCRIPTS_DIR = __dirname;
const CACHE_DIR = path.join(SCRIPTS_DIR, 'cache');
const SKILLS_DIR = path.resolve(SCRIPTS_DIR, '../../../.claude/skills');
const OUTPUT_DIR = path.resolve(SCRIPTS_DIR, '../data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'catalog.json');

const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

// ── Helpers ──────────────────────────────────────────────────────────────────

function seed(
  partial: Omit<SkillEntry, 'files' | 'hasScripts' | 'hasExamples' | 'fileCount'> &
    Partial<Pick<SkillEntry, 'files' | 'hasScripts' | 'hasExamples' | 'fileCount'>>,
): SkillEntry {
  return {
    files: [],
    hasScripts: false,
    hasExamples: false,
    fileCount: 1,
    ...partial,
  };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Read from cache if fresh, otherwise return null. */
function readCache(key: string): string | null {
  const filePath = path.join(CACHE_DIR, `${key}.json`);
  if (!fs.existsSync(filePath)) return null;
  const stat = fs.statSync(filePath);
  if (Date.now() - stat.mtimeMs > CACHE_MAX_AGE_MS) return null;
  return fs.readFileSync(filePath, 'utf-8');
}

function writeCache(key: string, data: string): void {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(path.join(CACHE_DIR, `${key}.json`), data);
}

let requestCount = 0;

async function ghFetch(url: string, cacheKey: string): Promise<any> {
  const cached = readCache(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  requestCount++;
  if (requestCount > 55) {
    console.warn(`  [rate-limit] Skipping fetch #${requestCount} to stay under 60/hr limit: ${url}`);
    return null;
  }

  console.log(`  [fetch #${requestCount}] ${url}`);
  const resp = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'skills-browser-catalog-builder',
    },
  });

  if (resp.status === 403 || resp.status === 429) {
    console.warn(`  [rate-limited] GitHub returned ${resp.status}. Using cache if available.`);
    return null;
  }

  if (!resp.ok) {
    console.warn(`  [error] ${resp.status} for ${url}`);
    return null;
  }

  const json = await resp.json();
  writeCache(cacheKey, JSON.stringify(json));
  return json;
}

async function ghFetchRaw(url: string, cacheKey: string): Promise<string | null> {
  const cached = readCache(cacheKey);
  if (cached) {
    const parsed = JSON.parse(cached);
    return parsed.__raw || null;
  }

  requestCount++;
  if (requestCount > 55) {
    console.warn(`  [rate-limit] Skipping raw fetch: ${url}`);
    return null;
  }

  console.log(`  [fetch #${requestCount}] ${url}`);
  const resp = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3.raw',
      'User-Agent': 'skills-browser-catalog-builder',
    },
  });

  if (!resp.ok) {
    console.warn(`  [error] ${resp.status} for ${url}`);
    return null;
  }

  const text = await resp.text();
  writeCache(cacheKey, JSON.stringify({ __raw: text }));
  return text;
}

function inferCategory(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();
  if (/secur|audit|vulnerab|pentest|threat|malware/.test(text)) return 'security';
  if (/test|qa|playwright|jest|cypress|e2e|debug/.test(text)) return 'testing';
  if (/deploy|ci[\s/]cd|docker|kubernetes|cloud|aws|gcp|azure|terraform|infra|devops|worker/.test(text)) return 'devops';
  if (/design|ui|ux|css|tailwind|figma|art|visual|canvas|animation|gsap|theme/.test(text)) return 'design';
  if (/doc|pdf|pptx|docx|xlsx|csv|readme|writing|markdown|presentation|slides/.test(text)) return 'documentation';
  if (/database|sql|postgres|redis|mongo|dynamo|cosmos|surreal|clickhouse|duckdb|neon|data/.test(text)) return 'data';
  if (/plan|prd|roadmap|strategy|product|pm|discovery|stakeholder|okr|retro|sprint/.test(text)) return 'planning';
  if (/market|seo|growth|pricing|email.*market|social|content.*strat|copywriting|launch|campaign|referral|ads/.test(text)) return 'marketing';
  if (/archit|monorepo|scaffold|pattern|composition/.test(text)) return 'architecture';
  if (/quality|lint|review|commit|pr\b/.test(text)) return 'quality';
  if (/research|analyz|ingest|interview|sentiment/.test(text)) return 'research';
  if (/agent|mcp|protocol|orchestrat/.test(text)) return 'protocols';
  if (/automat|workflow|hook|n8n|whatsapp|notification/.test(text)) return 'productivity';
  return 'development';
}

function inferLevel(description: string): 1 | 2 | 3 | 4 | 5 {
  const text = description.toLowerCase();
  if (/meta|orchestrat|bundle|governance|multi-agent|team/.test(text)) return 5;
  if (/chain|dispatch|advanced|enterprise|full.?stack/.test(text)) return 4;
  if (/integration|sdk|api|framework|deploy|scaffold/.test(text)) return 3;
  if (/best.?practice|pattern|convention|guide|standard/.test(text)) return 2;
  return 2;
}

function inferCoolness(description: string): 1 | 2 | 3 | 4 | 5 {
  const text = description.toLowerCase();
  let score = 3;
  if (/ai|agent|real-time|visual|security|protocol|3d|video|voice/.test(text)) score++;
  if (/autonomous|generative|interactive|intelligent/.test(text)) score++;
  if (text.length > 100) score++;
  return Math.min(5, Math.max(1, score)) as 1 | 2 | 3 | 4 | 5;
}

function inferType(description: string): 'capability' | 'preference' {
  const text = description.toLowerCase();
  if (/best.?practice|convention|standard|guideline|style|pattern|rule/.test(text)) return 'preference';
  return 'capability';
}

function makeEntry(
  id: string,
  name: string,
  description: string,
  source: string,
  sourceUrl: string,
  content?: string,
): SkillEntry {
  const fullContent = content || `# ${name}\n\n${description}`;
  return seed({
    id,
    name,
    description,
    source,
    sourceUrl,
    level: inferLevel(description),
    category: inferCategory(name, description),
    type: inferType(description),
    coolness: inferCoolness(description),
    userInvocable: true,
    content: fullContent,
  });
}

// ── Source 1: anthropics/skills ──────────────────────────────────────────────

async function fetchAnthropicSkills(): Promise<SkillEntry[]> {
  console.log('\n=== Source 1: anthropics/skills ===');

  const listing = await ghFetch(
    'https://api.github.com/repos/anthropics/skills/contents/skills',
    'anthropic-skills-listing',
  );

  if (!listing || !Array.isArray(listing)) {
    console.warn('  Could not fetch anthropics/skills listing');
    return [];
  }

  const entries: SkillEntry[] = [];
  const dirs = listing.filter((item: any) => item.type === 'dir');
  console.log(`  Found ${dirs.length} skill directories`);

  for (const dir of dirs) {
    const skillName = dir.name;
    const skillMdUrl = `https://api.github.com/repos/anthropics/skills/contents/skills/${skillName}/SKILL.md`;
    const raw = await ghFetchRaw(skillMdUrl, `anthropic-skill-${skillName}`);

    let description = `Official Anthropic skill: ${skillName}`;
    let content = `# ${skillName}\n\n${description}`;

    if (raw) {
      content = raw;
      // Extract description from frontmatter or first paragraph
      const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
      if (fmMatch) {
        const descMatch = fmMatch[1].match(/description:\s*(.+)/);
        if (descMatch) description = descMatch[1].trim().replace(/^["']|["']$/g, '');
      }
      if (description.startsWith('Official Anthropic')) {
        // Try first non-heading paragraph
        const lines = raw.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---') && trimmed.length > 20) {
            description = trimmed.slice(0, 200);
            break;
          }
        }
      }
    }

    entries.push(
      makeEntry(
        `anthropic/${skillName}`,
        skillName,
        description,
        'anthropic',
        `https://github.com/anthropics/skills/tree/main/skills/${skillName}`,
        content,
      ),
    );
  }

  console.log(`  Parsed ${entries.length} Anthropic skills`);
  return entries;
}

// ── Source 2: VoltAgent/awesome-agent-skills ──────────────────────────────────

async function fetchVoltAgentSkills(): Promise<SkillEntry[]> {
  console.log('\n=== Source 2: VoltAgent/awesome-agent-skills ===');

  const readmeData = await ghFetch(
    'https://api.github.com/repos/VoltAgent/awesome-agent-skills/readme',
    'voltagent-readme',
  );

  if (!readmeData) {
    console.warn('  Could not fetch VoltAgent README');
    return [];
  }

  const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
  return parseAwesomeReadme(readmeContent, 'voltagent', 'https://github.com/VoltAgent/awesome-agent-skills');
}

/**
 * Parse a markdown README that lists skills in bold-link format:
 * - **[owner/name](url)** - Description
 */
function parseAwesomeReadme(
  markdown: string,
  source: string,
  fallbackSourceUrl: string,
): SkillEntry[] {
  const entries: SkillEntry[] = [];
  const seen = new Set<string>();

  // Match pattern: - **[name](url)** - description
  const skillRegex = /[-*]\s+\*\*\[([^\]]+)\]\(([^)]+)\)\*\*\s*[-–—]\s*(.+)/g;
  let match: RegExpExecArray | null;

  while ((match = skillRegex.exec(markdown)) !== null) {
    const rawName = match[1].trim();
    const url = match[2].trim();
    const description = match[3].trim();

    // Extract a short id from the name (e.g. "anthropics/docx" -> "docx")
    const nameParts = rawName.split('/');
    const vendor = nameParts.length > 1 ? nameParts[0] : source;
    const skillName = nameParts.length > 1 ? nameParts.slice(1).join('/') : rawName;

    const id = `${source}/${slugify(rawName)}`;
    if (seen.has(id)) continue;
    seen.add(id);

    entries.push(
      makeEntry(
        id,
        skillName,
        description,
        source,
        url || fallbackSourceUrl,
      ),
    );
  }

  console.log(`  Parsed ${entries.length} skills from README`);
  return entries;
}

// ── Source 3: hesreallyhim/awesome-claude-code ────────────────────────────────

async function fetchAwesomeClaudeCode(): Promise<SkillEntry[]> {
  console.log('\n=== Source 3: hesreallyhim/awesome-claude-code ===');

  const readmeData = await ghFetch(
    'https://api.github.com/repos/hesreallyhim/awesome-claude-code/readme',
    'awesome-claude-code-readme',
  );

  if (!readmeData) {
    console.warn('  Could not fetch awesome-claude-code README');
    return [];
  }

  const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');

  const entries: SkillEntry[] = [];
  const seen = new Set<string>();

  // This README uses a different format:
  // - [Name](url) by [author](url) - Description
  const entryRegex = /[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s+by\s+\[([^\]]+)\]\([^)]+\)\s*[-–—]\s*(.+)/g;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(readmeContent)) !== null) {
    const name = match[1].trim();
    const url = match[2].trim();
    const author = match[3].trim();
    const description = match[4].trim();

    const id = `community/${slugify(name)}`;
    if (seen.has(id)) continue;
    seen.add(id);

    entries.push(
      makeEntry(
        id,
        name,
        `${description} (by ${author})`,
        'community',
        url,
      ),
    );
  }

  console.log(`  Parsed ${entries.length} entries from awesome-claude-code`);
  return entries;
}

// ── Source 4: Local curriculum skills ─────────────────────────────────────────

function fetchLocalSkills(): SkillEntry[] {
  console.log('\n=== Source 4: Local curriculum skills ===');

  if (!fs.existsSync(SKILLS_DIR)) {
    console.warn(`  Skills directory not found: ${SKILLS_DIR}`);
    return [];
  }

  const entries: SkillEntry[] = [];
  const skillDirs = fs.readdirSync(SKILLS_DIR).filter((d) => {
    const fullPath = path.join(SKILLS_DIR, d);
    return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'SKILL.md'));
  });

  console.log(`  Found ${skillDirs.length} local skill directories`);

  for (const dir of skillDirs) {
    try {
      const skill = parseSkillFolder(
        path.join(SKILLS_DIR, dir),
        'curriculum',
        'https://github.com/GolferGeek/ai-dev-curriculum/tree/main/.claude/skills',
      );
      entries.push(skill);
    } catch (err) {
      console.warn(`  Warning: Failed to parse ${dir}: ${(err as Error).message}`);
    }
  }

  console.log(`  Parsed ${entries.length} curriculum skills`);
  return entries;
}

// ── Source 5: AI Daily Brief master-class skills ─────────────────────────────

function fetchMasterClassSkills(): SkillEntry[] {
  console.log('\n=== Source 5: AI Daily Brief master-class skills ===');

  const skills: SkillEntry[] = [
    makeEntry(
      'masterclass/researching-with-confidence',
      'researching-with-confidence',
      'A skill for conducting thorough research with source validation, confidence scoring, and structured output. Ensures AI research is grounded and verifiable.',
      'masterclass',
      'https://www.youtube.com/watch?v=skills-masterclass',
    ),
    makeEntry(
      'masterclass/devils-advocate',
      'devils-advocate',
      'Challenge assumptions and stress-test ideas by arguing the opposing viewpoint. Useful for decision-making, PRD reviews, and strategy sessions.',
      'masterclass',
      'https://www.youtube.com/watch?v=skills-masterclass',
    ),
    makeEntry(
      'masterclass/morning-briefing',
      'morning-briefing',
      'Generate a personalized daily briefing covering calendar, priorities, blockers, and key metrics. Designed for founders and team leads.',
      'masterclass',
      'https://www.youtube.com/watch?v=skills-masterclass',
    ),
    makeEntry(
      'masterclass/board-of-advisors',
      'board-of-advisors',
      'Simulate a virtual board of advisors with diverse perspectives — technical, business, legal, UX. Each advisor gives independent feedback on your proposal.',
      'masterclass',
      'https://www.youtube.com/watch?v=skills-masterclass',
    ),
  ];

  console.log(`  Added ${skills.length} master-class skills`);
  return skills;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Skills Catalog Builder ===');
  console.log(`Cache dir: ${CACHE_DIR}`);
  console.log(`Output: ${OUTPUT_FILE}\n`);

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Fetch from all sources
  const [anthropicSkills, voltAgentSkills, communitySkills] = await Promise.all([
    fetchAnthropicSkills(),
    fetchVoltAgentSkills(),
    fetchAwesomeClaudeCode(),
  ]);

  const localSkills = fetchLocalSkills();
  const masterClassSkills = fetchMasterClassSkills();

  // Combine all
  const allSkills = [
    ...localSkills,
    ...anthropicSkills,
    ...voltAgentSkills,
    ...communitySkills,
    ...masterClassSkills,
  ];

  // Deduplicate by id (prefer earlier entries — local > anthropic > volt > community)
  const seen = new Set<string>();
  const deduped: SkillEntry[] = [];
  for (const skill of allSkills) {
    if (!seen.has(skill.id)) {
      seen.add(skill.id);
      deduped.push(skill);
    }
  }

  // Sort by name
  deduped.sort((a, b) => a.name.localeCompare(b.name));

  // Compute source stats
  const sourceMap = new Map<string, number>();
  for (const skill of deduped) {
    sourceMap.set(skill.source, (sourceMap.get(skill.source) || 0) + 1);
  }

  const sourceUrls: Record<string, string> = {
    curriculum: 'https://github.com/GolferGeek/ai-dev-curriculum/tree/main/.claude/skills',
    anthropic: 'https://github.com/anthropics/skills',
    voltagent: 'https://github.com/VoltAgent/awesome-agent-skills',
    community: 'https://github.com/hesreallyhim/awesome-claude-code',
    masterclass: 'https://www.youtube.com/watch?v=skills-masterclass',
  };

  const sources: SourceInfo[] = Array.from(sourceMap.entries()).map(([name, count]) => ({
    name,
    url: sourceUrls[name] || '',
    skillCount: count,
  }));

  // Build catalog
  const catalog: SkillCatalog = {
    version: '2.0.0',
    generatedAt: new Date().toISOString(),
    totalSkills: deduped.length,
    sources,
    skills: deduped,
  };

  // Write
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2));

  // Summary
  console.log('\n=== SUMMARY ===');
  console.log(`Total skills: ${catalog.totalSkills}`);
  console.log(`Sources:`);
  for (const s of sources) {
    console.log(`  ${s.name}: ${s.skillCount} skills`);
  }
  console.log(`GitHub API requests used: ${requestCount}`);
  console.log(`Output: ${OUTPUT_FILE}`);
  console.log('Done.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
