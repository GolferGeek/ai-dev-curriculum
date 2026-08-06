import Link from "next/link";
import type { Finding } from "@/src/lib/types";

export function FindingList({ findings, limit }: { findings: Finding[]; limit?: number }) {
  const visible = typeof limit === "number" ? findings.slice(0, limit) : findings;
  if (visible.length === 0) {
    return <div className="empty-state">No deterministic findings in this view.</div>;
  }

  return (
    <div className="finding-list">
      {visible.map((finding) => (
        <Link className="finding-row" href={finding.route} key={finding.id}>
          <span className={`severity-icon ${finding.severity}`} aria-hidden="true" />
          <span className="finding-copy">
            <strong>{finding.title}</strong>
            <span>{finding.detail}</span>
            <small>{finding.sourcePath}</small>
          </span>
          <span className={`severity-label ${finding.severity}`}>{finding.severity}</span>
        </Link>
      ))}
    </div>
  );
}
