import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { resolveMarkdownRoute } from "@/src/lib/program";

export function MarkdownContent({ body, sourcePath }: { body: string; sourcePath: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href = "", children }) => {
            const route = resolveMarkdownRoute(sourcePath, href);
            if (/^(https?:|mailto:)/.test(route)) {
              return <a href={route} rel="noreferrer" target="_blank">{children}</a>;
            }
            return <Link href={route}>{children}</Link>;
          },
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
