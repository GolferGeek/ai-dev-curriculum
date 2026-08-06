import Link from "next/link";
import type { ReactNode } from "react";
import type { ProgramNode, ProgramSnapshot } from "@/src/lib/types";
import { ProfileSelector } from "@/src/components/ProfileSelector";

function NodeBranch({ node, depth = 0 }: { node: ProgramNode; depth?: number }) {
  if (node.children.length === 0) {
    return (
      <Link className="tree-link" href={node.route} style={{ paddingLeft: `${18 + depth * 14}px` }}>
        <span className="tree-dot" />
        <span>{node.title}</span>
      </Link>
    );
  }

  return (
    <details className="tree-branch" open={depth < 1}>
      <summary style={{ paddingLeft: `${10 + depth * 14}px` }}>
        <span className="chevron">›</span>
        <Link href={node.route}>{node.title}</Link>
      </summary>
      <div>{node.children.map((child) => <NodeBranch key={child.slug} node={child} depth={depth + 1} />)}</div>
    </details>
  );
}

export function ProgramShell({ snapshot, children }: { snapshot: ProgramSnapshot; children: ReactNode }) {
  return (
    <div className="app-frame">
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">A</span>
          <span>
            <strong>AI Program</strong>
            <small>Governance &amp; GRC</small>
          </span>
        </Link>

        <nav className="primary-nav" aria-label="Primary">
          <Link href="/">Overview</Link>
          <Link href="/findings">Findings <span>{snapshot.stats.blockerCount + snapshot.stats.warningCount}</span></Link>
          <Link href="/ask">Ask the program</Link>
          <Link href="/trace">Control trace</Link>
          <Link href="/proposals">Prepare proposal</Link>
        </nav>

        <div className="nav-section-label">Program structure</div>
        <nav className="program-tree" aria-label="AI Program folders">
          {snapshot.root.children.map((node) => <NodeBranch key={node.slug} node={node} />)}
        </nav>

        <div className="sidebar-foot">
          <span className="live-dot" />
          Reading the repository
          <small>{snapshot.stats.documentCount} Markdown records</small>
        </div>
      </aside>

      <div className="content-column">
        <header className="topbar">
          <div>
            <span className="eyebrow">Company-owned operating memory</span>
          </div>
          <div className="topbar-actions">
            <ProfileSelector active={snapshot.profile} profiles={snapshot.profiles} />
            <div className="baseline-pill"><span /> Draft course baseline</div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
