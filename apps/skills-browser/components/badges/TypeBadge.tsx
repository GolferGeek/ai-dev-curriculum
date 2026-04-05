'use client';

export default function TypeBadge({ type }: { type: 'capability' | 'preference' }) {
  const isCapability = type === 'capability';
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
        isCapability
          ? 'border-blue-500/40 text-blue-400'
          : 'border-amber-500/40 text-amber-400'
      }`}
    >
      {isCapability ? 'CAP' : 'PREF'}
    </span>
  );
}
