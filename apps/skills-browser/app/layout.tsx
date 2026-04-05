import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Skills Browser — Claude Code Skill Ecosystem',
  description: 'Discover and browse 79+ free Claude Code skills from 4 sources',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col">
        <header className="border-b border-gray-800 bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20">
                <svg className="h-5 w-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Skills Browser
                </h1>
                <p className="text-xs text-gray-500">
                  Claude Code Skill Ecosystem
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="border-t border-gray-800 bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
              <span>
                Built with the{' '}
                <a
                  href="https://github.com/GolferGeek/ai-dev-curriculum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-colors hover:text-accent-light"
                >
                  AI Dev Curriculum
                </a>
              </span>
              <div className="flex gap-3">
                <a href="https://github.com/VoltAgent/awesome-agent-skills" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gray-400">VoltAgent</a>
                <a href="https://github.com/anthropics/skills" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gray-400">Anthropic</a>
                <a href="https://github.com/hesreallyhim/awesome-claude-code" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gray-400">Community</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
