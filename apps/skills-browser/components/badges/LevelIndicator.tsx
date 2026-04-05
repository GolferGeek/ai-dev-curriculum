'use client';

const levelNames = ['', 'Apprentice', 'Builder', 'Arsenal', 'Strategist', 'Architect'];

export default function LevelIndicator({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1.5" title={levelNames[level] || `Level ${level}`}>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              i <= level ? 'bg-accent-light' : 'bg-gray-700'
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] text-gray-500">{levelNames[level]}</span>
    </div>
  );
}
