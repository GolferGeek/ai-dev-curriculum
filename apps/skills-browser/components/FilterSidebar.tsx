'use client';

import { useState } from 'react';
import type { FilterState } from '@/lib/filters';

const levelNames = ['', 'Apprentice', 'Builder', 'Arsenal', 'Strategist', 'Architect'];

const sortOptions = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'level-asc', label: 'Level (low-high)' },
  { value: 'level-desc', label: 'Level (high-low)' },
  { value: 'coolness-desc', label: 'Coolness (high-low)' },
  { value: 'coolness-asc', label: 'Coolness (low-high)' },
] as const;

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  availableSources: { name: string; count: number }[];
  availableCategories: { name: string; count: number }[];
}

export default function FilterSidebar({
  filters,
  onChange,
  onReset,
  availableSources,
  availableCategories,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLevel = (level: number) => {
    const levels = filters.levels.includes(level)
      ? filters.levels.filter((l) => l !== level)
      : [...filters.levels, level];
    onChange({ ...filters, levels });
  };

  const toggleSource = (source: string) => {
    const sources = filters.sources.includes(source)
      ? filters.sources.filter((s) => s !== source)
      : [...filters.sources, source];
    onChange({ ...filters, sources });
  };

  const toggleCategory = (category: string) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onChange({ ...filters, categories });
  };

  const toggleType = (type: string) => {
    const types = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onChange({ ...filters, types });
  };

  const hasActiveFilters =
    filters.search.length > 0 ||
    filters.levels.length > 0 ||
    filters.sources.length > 0 ||
    filters.categories.length > 0 ||
    filters.types.length > 0 ||
    filters.sortBy !== 'name';

  const sidebar = (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search skills..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-surface py-2 pl-10 pr-8 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: '' })}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Sort</h4>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
          className="w-full rounded-lg border border-gray-700 bg-surface px-3 py-2 text-sm text-gray-300 outline-none focus:border-accent"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Level */}
      <FilterSection title="Level">
        {[1, 2, 3, 4, 5].map((level) => (
          <label key={level} className="flex cursor-pointer items-center gap-2 text-sm text-gray-300 hover:text-white">
            <input
              type="checkbox"
              checked={filters.levels.includes(level)}
              onChange={() => toggleLevel(level)}
              className="h-3.5 w-3.5 rounded border-gray-600 bg-surface text-accent focus:ring-accent/50"
            />
            <span className="flex items-center gap-1.5">
              <span className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`inline-block h-1.5 w-1.5 rounded-full ${i <= level ? 'bg-accent-light' : 'bg-gray-700'}`}
                  />
                ))}
              </span>
              {levelNames[level]}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Source */}
      <FilterSection title="Source">
        {availableSources.map(({ name, count }) => (
          <label key={name} className="flex cursor-pointer items-center gap-2 text-sm text-gray-300 hover:text-white">
            <input
              type="checkbox"
              checked={filters.sources.includes(name)}
              onChange={() => toggleSource(name)}
              className="h-3.5 w-3.5 rounded border-gray-600 bg-surface text-accent focus:ring-accent/50"
            />
            <span className="flex-1">{name}</span>
            <span className="text-xs text-gray-600">{count}</span>
          </label>
        ))}
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        {availableCategories.map(({ name, count }) => (
          <label key={name} className="flex cursor-pointer items-center gap-2 text-sm text-gray-300 hover:text-white">
            <input
              type="checkbox"
              checked={filters.categories.includes(name)}
              onChange={() => toggleCategory(name)}
              className="h-3.5 w-3.5 rounded border-gray-600 bg-surface text-accent focus:ring-accent/50"
            />
            <span className="flex-1">{name}</span>
            <span className="text-xs text-gray-600">{count}</span>
          </label>
        ))}
      </FilterSection>

      {/* Type */}
      <FilterSection title="Type">
        {['capability', 'preference'].map((type) => (
          <label key={type} className="flex cursor-pointer items-center gap-2 text-sm text-gray-300 hover:text-white">
            <input
              type="checkbox"
              checked={filters.types.includes(type)}
              onChange={() => toggleType(type)}
              className="h-3.5 w-3.5 rounded border-gray-600 bg-surface text-accent focus:ring-accent/50"
            />
            <span className={type === 'capability' ? 'text-blue-400' : 'text-amber-400'}>
              {type === 'capability' ? 'Capability' : 'Preference'}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
        >
          Reset all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-gray-500 hover:text-white lg:hidden"
        aria-label="Toggle filters"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
        {hasActiveFilters && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
            {filters.levels.length + filters.sources.length + filters.categories.length + filters.types.length + (filters.search ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="mb-4 rounded-xl border border-gray-800 bg-surface-card p-4 lg:hidden">
          {sidebar}
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-4 rounded-xl border border-gray-800 bg-surface-card p-4">
          {sidebar}
        </div>
      </div>
    </>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</h4>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}
