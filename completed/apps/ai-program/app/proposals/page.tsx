import { ProposalBuilder } from "@/src/components/ProposalBuilder";
import { loadActiveProgramSnapshot } from "@/src/lib/active-program";

export const metadata = { title: "Prepare proposal" };

export default async function ProposalsPage() {
  const snapshot = await loadActiveProgramSnapshot();
  return (
    <div className="page">
      <header className="page-header"><span className="eyebrow">Review before activation</span><h1>Prepare a program proposal</h1><p>Turn an exact finding into a bounded review artifact. This workspace never writes to the canonical program or silently changes policy.</p></header>
      <ProposalBuilder findings={snapshot.findings} />
    </div>
  );
}
