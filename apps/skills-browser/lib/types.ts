export interface SkillEntry {
  id: string;
  name: string;
  description: string;
  source: string;
  sourceUrl: string;
  level: 1 | 2 | 3 | 4 | 5;
  category: string;
  type: 'capability' | 'preference';
  coolness: 1 | 2 | 3 | 4 | 5;
  userInvocable: boolean;
  hasScripts: boolean;
  hasExamples: boolean;
  fileCount: number;
  content: string;
  files: { name: string; content: string }[];
}

export interface SkillCatalog {
  version: string;
  generatedAt: string;
  totalSkills: number;
  sources: { name: string; url: string; skillCount: number }[];
  skills: SkillEntry[];
}
