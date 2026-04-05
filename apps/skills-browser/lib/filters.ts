import type { SkillEntry } from './types';

export interface FilterState {
  search: string;
  levels: number[];
  sources: string[];
  categories: string[];
  types: string[]; // 'capability' | 'preference'
  sortBy: 'name' | 'level-asc' | 'level-desc' | 'coolness-desc' | 'coolness-asc';
}

export const defaultFilters: FilterState = {
  search: '',
  levels: [],
  sources: [],
  categories: [],
  types: [],
  sortBy: 'name',
};

export function filterSkills(skills: SkillEntry[], filters: FilterState): SkillEntry[] {
  let result = skills;

  // Text search
  if (filters.search.length >= 2) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }

  // Level filter
  if (filters.levels.length > 0) {
    result = result.filter((s) => filters.levels.includes(s.level));
  }

  // Source filter
  if (filters.sources.length > 0) {
    result = result.filter((s) => filters.sources.includes(s.source));
  }

  // Category filter
  if (filters.categories.length > 0) {
    result = result.filter((s) => filters.categories.includes(s.category));
  }

  // Type filter
  if (filters.types.length > 0) {
    result = result.filter((s) => filters.types.includes(s.type));
  }

  // Sort
  result = [...result].sort((a, b) => {
    switch (filters.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'level-asc':
        return a.level - b.level || a.name.localeCompare(b.name);
      case 'level-desc':
        return b.level - a.level || a.name.localeCompare(b.name);
      case 'coolness-desc':
        return b.coolness - a.coolness || a.name.localeCompare(b.name);
      case 'coolness-asc':
        return a.coolness - b.coolness || a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return result;
}

export function getUniqueValues(skills: SkillEntry[]) {
  const sources = new Map<string, number>();
  const categories = new Map<string, number>();

  for (const s of skills) {
    sources.set(s.source, (sources.get(s.source) || 0) + 1);
    categories.set(s.category, (categories.get(s.category) || 0) + 1);
  }

  return {
    sources: Array.from(sources.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count })),
    categories: Array.from(categories.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count })),
  };
}
