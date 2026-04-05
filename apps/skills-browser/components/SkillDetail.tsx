'use client';

import { useEffect, useRef } from 'react';
import type { SkillEntry } from '@/lib/types';
import SourceBadge from './badges/SourceBadge';
import LevelIndicator from './badges/LevelIndicator';
import CategoryTag from './badges/CategoryTag';
import TypeBadge from './badges/TypeBadge';
import CoolnessRating from './badges/CoolnessRating';
import MarkdownRenderer from './MarkdownRenderer';
import FileTree from './FileTree';
import CopyButton from './CopyButton';

interface SkillDetailProps {
  skill: SkillEntry;
  onClose: () => void;
}

export default function SkillDetail({ skill, onClose }: SkillDetailProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Skill detail: ${skill.name}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 flex h-full w-full max-w-2xl flex-col bg-surface-card shadow-2xl animate-slideIn"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-surface-hover hover:text-white"
          aria-label="Close detail panel"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="border-b border-gray-800 p-6 pr-12">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <SourceBadge source={skill.source} />
            <TypeBadge type={skill.type} />
            <CategoryTag category={skill.category} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">{skill.name}</h2>
          <p className="mb-3 text-sm text-gray-400">{skill.description}</p>
          <div className="flex items-center gap-4">
            <LevelIndicator level={skill.level} />
            <CoolnessRating coolness={skill.coolness} />
            {skill.fileCount > 0 && (
              <span className="text-xs text-gray-600">
                {skill.fileCount} file{skill.fileCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex items-center gap-2 border-b border-gray-800 px-6 py-3">
          <CopyButton text={skill.content} label="Copy SKILL.md" />
          {skill.sourceUrl && (
            <a
              href={skill.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-700 px-3 py-1.5 text-sm text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Source
            </a>
          )}
        </div>

        {/* Install instructions (collapsible) */}
        <div className="border-b border-gray-800 px-6 py-3">
          <details className="group">
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-gray-500 transition-colors hover:text-gray-300">
              Install instructions
            </summary>
            <div className="mt-2 rounded-lg bg-surface p-3">
              <code className="text-xs text-gray-400">
                mkdir -p .claude/skills/{skill.name} && paste SKILL.md
              </code>
            </div>
          </details>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <MarkdownRenderer content={skill.content} />
          <FileTree files={skill.files || []} />
        </div>
      </div>
    </div>
  );
}
