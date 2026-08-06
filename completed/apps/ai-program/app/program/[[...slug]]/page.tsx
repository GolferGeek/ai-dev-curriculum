import Link from "next/link";
import { notFound } from "next/navigation";
import { FindingList } from "@/src/components/FindingList";
import { MarkdownContent } from "@/src/components/MarkdownContent";
import { MetadataChips } from "@/src/components/MetadataChips";
import { loadActiveProgramSnapshot } from "@/src/lib/active-program";
import { findNode } from "@/src/lib/program";

export default async function ProgramNodePage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug: segments = [] } = await params;
  const slug = segments.join("/");
  const snapshot = await loadActiveProgramSnapshot();
  const node = findNode(snapshot.root, slug);
  if (!node) notFound();
  const findings = snapshot.findings.filter((item) => item.sourcePath === node.document.sourcePath);
  const crumbs = node.slug ? node.slug.split("/") : [];

  return (
    <div className="page document-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/program">AI Program</Link>
        {crumbs.map((crumb, index) => {
          const target = crumbs.slice(0, index + 1).join("/");
          return <span key={target}><b>/</b><Link href={`/program/${target}`}>{crumb.replace(/^\d{2}-/, "").replace(/-/g, " ")}</Link></span>;
        })}
      </nav>

      <header className="document-header">
        <div>
          <span className="eyebrow">Folder-level company stance</span>
          <h1>{node.title}</h1>
          <p className="source-path">docs/ai-program/{node.document.sourcePath}</p>
        </div>
        <span className={`status ${node.document.metadata.status === "draft" ? "attention" : "ready"}`}>
          {node.document.metadata.status ?? "unclassified"}
        </span>
      </header>

      <MetadataChips metadata={node.document.metadata} />

      {findings.length > 0 ? (
        <section className="inline-findings">
          <div className="section-title-row compact"><div><span className="eyebrow">Record health</span><h2>{findings.length} finding{findings.length === 1 ? "" : "s"}</h2></div></div>
          <FindingList findings={findings} />
        </section>
      ) : null}

      {node.children.length > 0 ? (
        <section className="child-node-section">
          <span className="eyebrow">Contained nodes</span>
          <div className="child-node-grid">
            {node.children.map((child) => <Link href={child.route} key={child.slug}><span>↳</span><strong>{child.title}</strong></Link>)}
          </div>
        </section>
      ) : null}

      <article className="document-card"><MarkdownContent body={node.document.body} sourcePath={node.document.sourcePath} /></article>
    </div>
  );
}
