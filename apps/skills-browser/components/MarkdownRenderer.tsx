'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import CopyButton from './CopyButton';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-gray-200 prose-p:text-gray-400 prose-a:text-accent-light prose-strong:text-gray-200 prose-code:text-accent-light prose-pre:bg-surface prose-pre:border prose-pre:border-gray-800 prose-th:text-gray-300 prose-td:text-gray-400 prose-li:text-gray-400">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre({ children, ...props }) {
            // Extract text content from children for the copy button
            const codeText = extractText(children);
            return (
              <div className="group relative">
                <pre {...props}>{children}</pre>
                {codeText && (
                  <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <CopyButton text={codeText} label="Copy" className="!py-1 !px-2 !text-xs" />
                  </div>
                )}
              </div>
            );
          },
        }}
      />
    </div>
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as React.ReactElement).props.children);
  }
  return '';
}
