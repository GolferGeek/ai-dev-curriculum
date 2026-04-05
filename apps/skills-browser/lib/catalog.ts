import catalogData from '../data/catalog.json';
import type { SkillCatalog } from './types';

export const catalog: SkillCatalog = catalogData as SkillCatalog;
export const skills = catalog.skills;
export const sources = catalog.sources;
