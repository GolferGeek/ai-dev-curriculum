'use client';

import { useState, useMemo } from 'react';
import { skills as allSkills, sources, catalog } from '@/lib/catalog';
import type { SkillEntry } from '@/lib/types';
import { filterSkills, getUniqueValues, defaultFilters, type FilterState } from '@/lib/filters';
import SkillGrid from '@/components/SkillGrid';
import FilterSidebar from '@/components/FilterSidebar';
import SkillDetail from '@/components/SkillDetail';

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selectedSkill, setSelectedSkill] = useState<SkillEntry | null>(null);

  const { sources: availableSources, categories: availableCategories } = useMemo(
    () => getUniqueValues(allSkills),
    []
  );

  const filteredSkills = useMemo(
    () => filterSkills(allSkills, filters),
    [filters]
  );

  const capabilityCount = allSkills.filter((s) => s.type === 'capability').length;
  const preferenceCount = allSkills.filter((s) => s.type === 'preference').length;

  return (
    <div>
      {/* Stats header */}
      <div className="mb-6 rounded-xl border border-gray-800 bg-surface-card p-5">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-4xl font-bold text-accent-light">{catalog.totalSkills}</span>
          <span className="text-lg text-gray-300">
            skills from{' '}
            <span className="font-semibold text-white">{sources.length} sources</span>
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-400">
          <span>
            <span className="font-medium text-gray-200">{capabilityCount}</span> capabilities
          </span>
          <span className="text-gray-700">|</span>
          <span>
            <span className="font-medium text-gray-200">{preferenceCount}</span> preferences
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {sources.map((src) => (
            <a
              key={src.name}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-300 transition-colors hover:border-accent hover:text-accent-light"
            >
              {src.name} ({src.skillCount})
            </a>
          ))}
        </div>
      </div>

      {/* Main layout: sidebar + grid */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Filter sidebar */}
        <div className="w-full shrink-0 lg:w-64">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
            availableSources={availableSources}
            availableCategories={availableCategories}
          />
        </div>

        {/* Grid */}
        <div className="min-w-0 flex-1">
          <SkillGrid
            skills={filteredSkills}
            total={allSkills.length}
            onSelect={setSelectedSkill}
          />
        </div>
      </div>

      {/* Detail panel */}
      {selectedSkill && (
        <SkillDetail
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
}
