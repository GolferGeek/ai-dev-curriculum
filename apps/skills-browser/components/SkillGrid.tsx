'use client';

import type { SkillEntry } from '@/lib/types';
import SkillCard from './SkillCard';

interface SkillGridProps {
  skills: SkillEntry[];
  total: number;
  onSelect: (skill: SkillEntry) => void;
}

export default function SkillGrid({ skills, total, onSelect }: SkillGridProps) {
  return (
    <div>
      <div className="mb-4 text-sm text-gray-400">
        Showing{' '}
        <span className="font-semibold text-white">{skills.length}</span>
        {skills.length !== total && (
          <>
            {' '}of{' '}
            <span className="font-semibold text-white">{total}</span>
          </>
        )}{' '}
        skills
      </div>
      {skills.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} onClick={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 py-20">
      <svg
        className="mb-4 h-12 w-12 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <p className="text-lg font-medium text-gray-400">No skills match your filters</p>
      <p className="mt-1 text-sm text-gray-600">Try broadening your search or clearing some filters.</p>
    </div>
  );
}
