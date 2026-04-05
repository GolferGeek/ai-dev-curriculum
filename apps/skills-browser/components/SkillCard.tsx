'use client';

import type { SkillEntry } from '@/lib/types';
import SourceBadge from './badges/SourceBadge';
import LevelIndicator from './badges/LevelIndicator';
import CategoryTag from './badges/CategoryTag';
import TypeBadge from './badges/TypeBadge';
import CoolnessRating from './badges/CoolnessRating';

interface SkillCardProps {
  skill: SkillEntry;
  onClick: (skill: SkillEntry) => void;
}

export default function SkillCard({ skill, onClick }: SkillCardProps) {
  return (
    <button
      data-testid="skill-card"
      onClick={() => onClick(skill)}
      className="group relative flex w-full flex-col rounded-xl border border-gray-800 bg-surface-card p-4 text-left transition-all duration-150 hover:scale-[1.02] hover:border-gray-600 hover:bg-surface-hover hover:shadow-lg hover:shadow-accent/5 focus:outline-none focus:ring-2 focus:ring-accent/50"
    >
      {/* Top row: name + source */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold text-white group-hover:text-accent-light">
          {skill.name}
        </h3>
        <SourceBadge source={skill.source} />
      </div>

      {/* Level */}
      <div className="mb-2">
        <LevelIndicator level={skill.level} />
      </div>

      {/* Description */}
      <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-400">
        {skill.description}
      </p>

      {/* Bottom row: category, type, coolness */}
      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <CategoryTag category={skill.category} />
          <TypeBadge type={skill.type} />
        </div>
        <CoolnessRating coolness={skill.coolness} />
      </div>
    </button>
  );
}
