'use client';

const categoryColors: Record<string, string> = {
  protocols: 'bg-cyan-500/10 text-cyan-400',
  development: 'bg-green-500/10 text-green-400',
  quality: 'bg-yellow-500/10 text-yellow-400',
  architecture: 'bg-violet-500/10 text-violet-400',
  testing: 'bg-red-500/10 text-red-400',
  documentation: 'bg-blue-500/10 text-blue-400',
  deployment: 'bg-orange-500/10 text-orange-400',
  security: 'bg-rose-500/10 text-rose-400',
  data: 'bg-teal-500/10 text-teal-400',
  workflow: 'bg-indigo-500/10 text-indigo-400',
  ai: 'bg-fuchsia-500/10 text-fuchsia-400',
  devops: 'bg-amber-500/10 text-amber-400',
};

export default function CategoryTag({ category }: { category: string }) {
  const colors = categoryColors[category] || 'bg-gray-500/10 text-gray-400';
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ${colors}`}>
      {category}
    </span>
  );
}
