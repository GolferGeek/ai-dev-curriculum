import * as fs from 'fs';
import * as path from 'path';
import type { SkillEntry } from './types';
import { categorizeLevel, categorizeCategory, categorizeType, categorizeCoolness } from './categorize';

interface FrontmatterData {
  name?: string;
  description?: string;
  'user-invocable'?: boolean;
  category?: string;
  'used-by-agents'?: string;
}

function parseFrontmatter(raw: string): { data: FrontmatterData; content: string } {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('---')) {
    return { data: {}, content: raw };
  }

  const endIndex = trimmed.indexOf('---', 3);
  if (endIndex === -1) {
    return { data: {}, content: raw };
  }

  const yamlBlock = trimmed.slice(3, endIndex).trim();
  const content = trimmed.slice(endIndex + 3).trim();

  const data: FrontmatterData = {};
  for (const line of yamlBlock.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();

    if (key === 'name') data.name = value;
    else if (key === 'description') data.description = value;
    else if (key === 'user-invocable') data['user-invocable'] = value === 'true';
    else if (key === 'category') data.category = value;
    else if (key === 'used-by-agents') data['used-by-agents'] = value;
  }

  return { data, content };
}

export function parseSkillFolder(skillDir: string, source: string, sourceUrlBase: string): SkillEntry {
  const folderName = path.basename(skillDir);
  const skillMdPath = path.join(skillDir, 'SKILL.md');

  const raw = fs.readFileSync(skillMdPath, 'utf-8');
  const { data, content } = parseFrontmatter(raw);

  const name = data.name || folderName;
  const description = data.description || content.split('\n').find(l => l.trim().length > 0 && !l.startsWith('#')) || '';
  const userInvocable = data['user-invocable'] !== false; // default true if not specified

  // Check for supporting files
  const allFiles = fs.readdirSync(skillDir);
  const fileCount = allFiles.length;
  const hasScripts = allFiles.some(f => f === 'scripts' || f.endsWith('.sh') || f.endsWith('.ts') || f.endsWith('.js'));
  const hasExamples = allFiles.some(f => f === 'examples' || f.includes('example'));

  const lineCount = raw.split('\n').length;
  const level = categorizeLevel(raw, fileCount, lineCount);
  const category = data.category || categorizeCategory(name, description, raw);
  const type = categorizeType(description, raw);
  const coolness = categorizeCoolness(description, raw, lineCount);

  // Read all files in the skill folder
  const files: { name: string; content: string }[] = [];
  for (const f of allFiles) {
    const fPath = path.join(skillDir, f);
    const stat = fs.statSync(fPath);
    if (stat.isFile()) {
      files.push({ name: f, content: fs.readFileSync(fPath, 'utf-8') });
    }
  }

  return {
    id: `${source}/${folderName}`,
    name,
    description,
    source,
    sourceUrl: `${sourceUrlBase}/${folderName}`,
    level,
    category,
    type,
    coolness,
    userInvocable,
    hasScripts,
    hasExamples,
    fileCount,
    content: raw,
    files,
  };
}
