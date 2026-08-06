import Link from "next/link";
import { FindingList } from "@/src/components/FindingList";
import { loadActiveProgramSnapshot } from "@/src/lib/active-program";

export default async function OverviewPage() {
  const snapshot = await loadActiveProgramSnapshot();
  const overallScore = Math.round(snapshot.categories.reduce((sum, category) => sum + category.score, 0) / snapshot.categories.length);

  return (
    <div className="page dashboard-page">
      <section className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">AI direction, governance, risk &amp; compliance</span>
          <h1>Your AI Program.<br /><em>Visible and answerable.</em></h1>
          <p>One company-owned record for the decisions, controls, capabilities, culture, evidence, and open questions that shape how your organization uses AI.</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/ask">Ask the program <span>→</span></Link>
            <Link className="text-button" href="/program">Browse the record</Link>
          </div>
        </div>
        <div className="health-orbit-card">
          <div className="orbit-score">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="51" pathLength="100" />
              <circle className="progress" cx="60" cy="60" r="51" pathLength="100" strokeDasharray={`${overallScore} 100`} />
            </svg>
            <div><strong>{overallScore}</strong><span>readiness</span></div>
          </div>
          <div className="health-summary">
            <span className="status blocked">Blocked</span>
            <h2>Structure ready.<br />Authority incomplete.</h2>
            <p>The baseline is intentionally honest: assign owners, approval, and evidence before treating it as company policy.</p>
          </div>
        </div>
      </section>

      <section className="metric-strip" aria-label="Program metrics">
        <div><strong>{snapshot.stats.categoryCount}</strong><span>governance categories</span></div>
        <div><strong>{snapshot.stats.folderCount}</strong><span>folder-level stances</span></div>
        <div><strong>{snapshot.stats.blockerCount}</strong><span>readiness blockers</span></div>
        <div><strong>{snapshot.stats.overdueCount}</strong><span>overdue reviews</span></div>
      </section>

      <section className="profile-context" aria-label="Active program profile">
        <div><span className="eyebrow">Active view</span><h2>{snapshot.profile.label} profile</h2></div>
        <p>{snapshot.profile.description} {snapshot.profile.limitations}</p>
        <Link href="/document/PROGRAM-PROFILES">Compare profiles →</Link>
      </section>

      <section className="dashboard-section">
        <div className="section-title-row">
          <div><span className="eyebrow">The operating model</span><h2>Eight connected categories</h2></div>
          <p>Scores are deterministic projections of the records beneath each category—not compliance ratings.</p>
        </div>
        <div className="category-grid">
          {snapshot.categories.map((category, index) => (
            <Link className="category-card" href={category.node.route} key={category.node.slug}>
              <div className="category-topline"><span>{String(index + 1).padStart(2, "0")}</span><span className={`status ${category.state}`}>{category.state}</span></div>
              <h3>{category.node.title}</h3>
              <div className="category-score"><strong>{category.score}</strong><span>/ 100 readiness</span></div>
              <div className="mini-bar"><span style={{ width: `${category.score}%` }} /></div>
              <div className="category-findings"><span>{category.blockers} blockers</span><span>{category.warnings} warnings</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-section split-section">
        <div>
          <div className="section-title-row compact"><div><span className="eyebrow">Highest priority</span><h2>What needs attention</h2></div></div>
          <FindingList findings={snapshot.findings} limit={6} />
          <Link className="text-button section-link" href="/findings">See all findings →</Link>
        </div>
        <aside className="principle-card">
          <span className="section-number">GRC</span>
          <blockquote>“A missing decision is a finding—not permission.”</blockquote>
          <p>The application can organize evidence and expose gaps. It cannot interpret law, accept risk, approve an exception, or certify compliance.</p>
          <Link href="/trace">Inspect the trace model →</Link>
        </aside>
      </section>
    </div>
  );
}
