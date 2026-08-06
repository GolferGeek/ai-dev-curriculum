import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CopySourceButton from "@/components/CopySourceButton";
import { getCapability } from "@/lib/catalog";
export default async function CapabilityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = getCapability(id);
  if (!entry) notFound();
  return <main className="detail-page">
    <Link href="/" className="back-link">← Back to catalog</Link>
    <section className="detail-hero">
      <div><div className="card-top"><span className={`kind ${entry.kind}`}>{entry.kind}</span><span className={`risk ${entry.risk}`}>{entry.risk} risk</span><span className="status">{entry.maturity}</span></div><h1>{entry.name}</h1><p>{entry.description}</p></div>
      <div className="detail-actions"><CopySourceButton content={entry.content} attribution={`${entry.sourceUrl}@${entry.sourceRevision}`} /><a href={entry.sourceUrl} target="_blank" rel="noreferrer">View canonical source ↗</a></div>
    </section>
    <section className="provenance-grid">
      <div><span>Exact revision</span><strong>{entry.sourceRevision.slice(0, 12)}</strong></div><div><span>Content hash</span><strong>{entry.contentHash.slice(0, 12)}</strong></div><div><span>Retrieved</span><strong>{entry.retrievedAt}</strong></div><div><span>Observed format</span><strong>{entry.observedFormat}</strong></div><div><span>Function</span><strong>{entry.function}</strong></div><div><span>Harnesses</span><strong>{entry.supportedHarnesses.join(" · ")}</strong></div>
    </section>
    {entry.warnings.length > 0 && <section className="warning-box"><h2>Review before use</h2>{entry.warnings.map((warning) => <p key={warning}>{warning}</p>)}<p><strong>Requested authority:</strong> {entry.requestedAuthority.join(", ") || "No consequential authority detected by the static triage."}</p></section>}
    <div className="detail-columns"><article className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.content}</ReactMarkdown></article><aside className="file-tree"><h2>Complete folder</h2><p>{entry.fileCount} files · every file retained</p>{entry.files.map((file) => <details key={file.name} open={file.name === "SKILL.md" || file.name === "AGENT.md"}><summary>{file.name}<small>{file.size} bytes · {file.hash.slice(0, 8)}</small></summary><pre>{file.content}</pre></details>)}</aside></div>
  </main>;
}
