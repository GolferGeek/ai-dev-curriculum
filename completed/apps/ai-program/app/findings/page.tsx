import { FindingList } from "@/src/components/FindingList";
import { loadActiveProgramSnapshot } from "@/src/lib/active-program";

export const metadata = { title: "Findings" };

export default async function FindingsPage() {
  const snapshot = await loadActiveProgramSnapshot();
  const blockers = snapshot.findings.filter((item) => item.severity === "blocker");
  const warnings = snapshot.findings.filter((item) => item.severity === "warning");
  return (
    <div className="page">
      <header className="page-header"><span className="eyebrow">Deterministic program analysis · {snapshot.profile.label} profile</span><h1>Findings</h1><p>Every result points back to a repository record included in the active view. Counts describe profile-scoped record readiness, not legal or compliance status.</p></header>
      <section className="finding-summary"><div><strong>{blockers.length}</strong><span>blockers</span></div><div><strong>{warnings.length}</strong><span>warnings</span></div><div><strong>{snapshot.stats.overdueCount}</strong><span>overdue reviews</span></div></section>
      <section className="finding-section"><div className="section-title-row compact"><div><span className="eyebrow">Must resolve</span><h2>Blockers</h2></div></div><FindingList findings={blockers} /></section>
      <section className="finding-section"><div className="section-title-row compact"><div><span className="eyebrow">Needs review</span><h2>Warnings</h2></div></div><FindingList findings={warnings} /></section>
    </div>
  );
}
