import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/src/components/MarkdownContent";
import { MetadataChips } from "@/src/components/MetadataChips";
import { loadActiveProgramSnapshot } from "@/src/lib/active-program";
import { findDocument } from "@/src/lib/program";

export default async function DocumentPage({ params }: { params: Promise<{ path?: string[] }> }) {
  const { path: segments = [] } = await params;
  const snapshot = await loadActiveProgramSnapshot();
  const document = findDocument(snapshot, segments.join("/"));
  if (!document) notFound();
  return (
    <div className="page document-page">
      <nav className="breadcrumbs"><Link href="/program">AI Program</Link><span><b>/</b>{document.sourcePath}</span></nav>
      <header className="document-header"><div><span className="eyebrow">Supporting program record</span><h1>{document.title}</h1><p className="source-path">docs/ai-program/{document.sourcePath}</p></div></header>
      {Object.keys(document.metadata).length > 0 ? <MetadataChips metadata={document.metadata} /> : null}
      <article className="document-card"><MarkdownContent body={document.body} sourcePath={document.sourcePath} /></article>
    </div>
  );
}
