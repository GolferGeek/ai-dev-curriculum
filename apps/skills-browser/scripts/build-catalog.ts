import * as fs from 'fs';
import * as path from 'path';
import { parseSkillFolder } from './parse-skill';
import { seedSkills } from './seed-skills';
import type { SkillCatalog, SkillEntry, SourceInfo } from './types';

const SKILLS_DIR = path.resolve(__dirname, '../../../.claude/skills');
const OUTPUT_DIR = path.resolve(__dirname, '../data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'catalog.json');

function main() {
  console.log('Building skills catalog...\n');

  // 1. Read local curriculum skills
  const localSkills: SkillEntry[] = [];
  const skillDirs = fs.readdirSync(SKILLS_DIR).filter((d) => {
    const fullPath = path.join(SKILLS_DIR, d);
    return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'SKILL.md'));
  });

  console.log(`Found ${skillDirs.length} local curriculum skills`);

  for (const dir of skillDirs) {
    try {
      const skill = parseSkillFolder(
        path.join(SKILLS_DIR, dir),
        'curriculum',
        'https://github.com/GolferGeek/ai-dev-curriculum/tree/main/.claude/skills'
      );
      localSkills.push(skill);
    } catch (err) {
      console.warn(`  Warning: Failed to parse ${dir}: ${(err as Error).message}`);
    }
  }

  console.log(`  Parsed ${localSkills.length} curriculum skills`);

  // 2. Merge with seed skills (external sources)
  console.log(`\nAdding ${seedSkills.length} seed skills from external sources`);

  const allSkills = [...localSkills, ...seedSkills];

  // 3. Deduplicate by id
  const seen = new Set<string>();
  const deduped: SkillEntry[] = [];
  for (const skill of allSkills) {
    if (!seen.has(skill.id)) {
      seen.add(skill.id);
      deduped.push(skill);
    }
  }

  // 4. Sort by name
  deduped.sort((a, b) => a.name.localeCompare(b.name));

  // 5. Compute source stats
  const sourceMap = new Map<string, number>();
  for (const skill of deduped) {
    sourceMap.set(skill.source, (sourceMap.get(skill.source) || 0) + 1);
  }

  const sourceUrls: Record<string, string> = {
    curriculum: 'https://github.com/GolferGeek/ai-dev-curriculum/tree/main/.claude/skills',
    anthropic: 'https://github.com/anthropics/skills',
    voltagent: 'https://github.com/VoltAgent/awesome-agent-skills',
    community: 'https://github.com/hesreallyhim/awesome-claude-code',
  };

  const sources: SourceInfo[] = Array.from(sourceMap.entries()).map(([name, count]) => ({
    name,
    url: sourceUrls[name] || '',
    skillCount: count,
  }));

  // 6. Build catalog envelope
  const catalog: SkillCatalog = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    totalSkills: deduped.length,
    sources,
    skills: deduped,
  };

  // 7. Write output
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2));

  console.log(`\nCatalog written to ${OUTPUT_FILE}`);
  console.log(`  Total skills: ${catalog.totalSkills}`);
  console.log(`  Sources: ${sources.map((s) => `${s.name} (${s.skillCount})`).join(', ')}`);
  console.log(`\nDone.`);
}

main();
