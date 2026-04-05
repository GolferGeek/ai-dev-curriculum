'use client';

import { useState } from 'react';

interface FileTreeProps {
  files: { name: string; content: string }[];
}

export default function FileTree({ files }: FileTreeProps) {
  const [expandedFile, setExpandedFile] = useState<string | null>(null);

  if (files.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Files ({files.length})
      </h3>
      <div className="rounded-lg border border-gray-800 bg-surface">
        {files.map((file) => (
          <div key={file.name} className="border-b border-gray-800 last:border-b-0">
            <button
              onClick={() => setExpandedFile(expandedFile === file.name ? null : file.name)}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-surface-hover hover:text-white"
            >
              <svg
                className={`h-3 w-3 text-gray-600 transition-transform ${
                  expandedFile === file.name ? 'rotate-90' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="font-mono text-xs">{file.name}</span>
              <span className="ml-auto text-[10px] text-gray-600">
                {file.content.length > 1024
                  ? `${(file.content.length / 1024).toFixed(1)} KB`
                  : `${file.content.length} B`}
              </span>
            </button>
            {expandedFile === file.name && (
              <div className="border-t border-gray-800 bg-surface p-3">
                <pre className="max-h-64 overflow-auto text-xs text-gray-400">
                  <code>{file.content}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
