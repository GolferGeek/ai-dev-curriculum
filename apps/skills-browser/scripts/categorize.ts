import type { SkillEntry } from './types';

const categoryKeywords: Record<string, string[]> = {
  architecture: ['architecture', 'architectural', 'monorepo', 'turbo', 'scaffold', 'layout', 'structure'],
  quality: ['quality', 'lint', 'test', 'error', 'scan', 'fix', 'gate', 'pr-req', 'commit', 'review'],
  research: ['research', 'analyze', 'deep-dive', 'ingest', 'map', 'git-story', 'history', 'orient'],
  security: ['security', 'vulnerab', 'auth', 'secret', 'injection', 'scan'],
  protocols: ['protocol', 'a2a', 'a2p', 'ag-ui', 'json-rpc', 'agent card'],
  'skills-browser': ['skill-catalog', 'skill-anatomy', 'skill-source', 'catalog', 'browse'],
  development: ['build', 'deploy', 'dev', 'code', 'implement', 'create', 'nextjs', 'swift', 'ios', 'react', 'web'],
  productivity: ['productivity', 'workflow', 'automat', 'template', 'generat'],
  documentation: ['doc', 'pdf', 'pptx', 'docx', 'xlsx', 'readme', 'markdown', 'writing'],
  design: ['design', 'canvas', 'art', 'visual', 'ui', 'css', 'tailwind', 'style'],
  data: ['data', 'database', 'surrealdb', 'sql', 'schema', 'query', 'surreal'],
  planning: ['plan', 'prd', 'intention', 'milestone', 'scope', 'alignment'],
  devops: ['ci', 'cd', 'pipeline', 'docker', 'kubernetes', 'deploy', 'infra', 'cloud', 'aws', 'gcp'],
  testing: ['test', 'playwright', 'jest', 'cypress', 'browser-test', 'e2e'],
};

const capabilityKeywords = [
  'bash', 'mcp', 'api', 'fetch', 'build', 'deploy', 'run', 'execute',
  'generate', 'create', 'scan', 'fix', 'install', 'script', 'command',
  'tool', 'action', 'invoke', 'convert', 'parse', 'render',
];

const preferenceKeywords = [
  'rules', 'conventions', 'standards', 'checklist', 'format', 'style',
  'guidelines', 'patterns', 'principles', 'practices', 'requirements',
  'constraints', 'policy', 'alignment', 'criteria',
];

export function categorizeLevel(content: string, fileCount: number, lineCount: number): 1 | 2 | 3 | 4 | 5 {
  // Level 5: bundle/governance — references multiple other skills or is a meta-skill
  const skillRefs = (content.match(/skills?\//g) || []).length;
  if (skillRefs >= 5 || content.includes('bundle') || content.includes('governance')) return 5;

  // Level 4: chains/dispatches — references other skills or agents
  if (skillRefs >= 2 || content.includes('invoke') && content.includes('agent')) return 4;

  // Level 3: has supporting files or references
  if (fileCount > 1 || content.includes('references/') || content.includes('scripts/')) return 3;

  // Level 2: well-structured single file with sections
  if (lineCount >= 50) return 2;

  // Level 1: simple single file
  return 1;
}

export function categorizeCategory(name: string, description: string, content: string): string {
  const text = `${name} ${description} ${content}`.toLowerCase();

  let bestCategory = 'development';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    let score = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestCategory;
}

export function categorizeType(description: string, content: string): 'capability' | 'preference' {
  const text = `${description} ${content}`.toLowerCase();

  let capScore = 0;
  let prefScore = 0;

  for (const kw of capabilityKeywords) {
    if (text.includes(kw)) capScore++;
  }
  for (const kw of preferenceKeywords) {
    if (text.includes(kw)) prefScore++;
  }

  return prefScore > capScore ? 'preference' : 'capability';
}

export function categorizeCoolness(description: string, content: string, lineCount: number): 1 | 2 | 3 | 4 | 5 {
  let score = 3; // default

  // Longer, more detailed skills are cooler
  if (lineCount > 200) score++;
  if (lineCount > 400) score++;

  // Interesting keywords boost coolness
  const coolWords = ['protocol', 'security', 'ai', 'agent', 'visual', 'design', 'dashboard', 'real-time'];
  const text = `${description} ${content}`.toLowerCase();
  for (const w of coolWords) {
    if (text.includes(w)) { score++; break; }
  }

  return Math.min(5, Math.max(1, score)) as 1 | 2 | 3 | 4 | 5;
}

export function autoCategorizeSeed(entry: Partial<SkillEntry>): Partial<SkillEntry> {
  const desc = entry.description || '';
  const content = entry.content || '';
  const lineCount = content.split('\n').length;

  return {
    ...entry,
    level: entry.level || categorizeLevel(content, entry.fileCount || 1, lineCount),
    category: entry.category || categorizeCategory(entry.name || '', desc, content),
    type: entry.type || categorizeType(desc, content),
    coolness: entry.coolness || categorizeCoolness(desc, content, lineCount),
  };
}
