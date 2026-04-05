'use client';

const sourceColors: Record<string, string> = {
  curriculum: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  voltagent: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  anthropic: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  community: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
};

export default function SourceBadge({ source }: { source: string }) {
  const colors = sourceColors[source] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${colors}`}
    >
      {source}
    </span>
  );
}
