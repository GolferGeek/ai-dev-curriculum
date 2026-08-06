"use client";

import { useMemo, useState } from "react";
import { generateProposal } from "@/src/lib/proposals";
import type { Finding } from "@/src/lib/types";

export function ProposalBuilder({ findings }: { findings: Finding[] }) {
  const [findingId, setFindingId] = useState(findings[0]?.id ?? "");
  const [title, setTitle] = useState("Resolve AI Program ownership gap");
  const [resolution, setResolution] = useState("");
  const [scope, setScope] = useState("organization");
  const [owner, setOwner] = useState("UNASSIGNED");
  const [approver, setApprover] = useState("UNASSIGNED");
  const [reviewDate, setReviewDate] = useState("");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const selected = useMemo(() => findings.find((item) => item.id === findingId), [findingId, findings]);

  function prepare() {
    setGenerated(generateProposal({ title, finding: selected, resolution, scope, owner, approver, reviewDate }));
    setCopied(false);
  }

  return (
    <div className="proposal-layout">
      <section className="proposal-form card">
        <div className="section-heading">
          <span className="section-number">01</span>
          <div><h2>Describe the proposed change</h2><p>Use a finding as the trigger, then supply the human decision context.</p></div>
        </div>
        <label>Finding
          <select value={findingId} onChange={(event) => setFindingId(event.target.value)}>
            {findings.slice(0, 80).map((item) => <option key={item.id} value={item.id}>{item.title} — {item.sourcePath}</option>)}
          </select>
        </label>
        <label>Proposal title<input value={title} onChange={(event) => setTitle(event.target.value)} /></label>
        <label>Proposed resolution<textarea rows={5} value={resolution} onChange={(event) => setResolution(event.target.value)} placeholder="What should change, why, and under which boundary?" /></label>
        <div className="form-grid">
          <label>Scope<input value={scope} onChange={(event) => setScope(event.target.value)} /></label>
          <label>Review date<input type="date" value={reviewDate} onChange={(event) => setReviewDate(event.target.value)} /></label>
          <label>Owner<input value={owner} onChange={(event) => setOwner(event.target.value)} /></label>
          <label>Approver<input value={approver} onChange={(event) => setApprover(event.target.value)} /></label>
        </div>
        <button className="primary-button" onClick={prepare} type="button">Prepare reviewable Markdown</button>
      </section>

      <section className="proposal-output card">
        <div className="section-heading">
          <span className="section-number">02</span>
          <div><h2>Review artifact</h2><p>Copy this into the decision workflow. Nothing is saved or activated here.</p></div>
        </div>
        {generated ? (
          <>
            <div className="proposal-warning"><strong>Proposed, not policy.</strong> Human review and an accepted decision are still required.</div>
            <pre>{generated}</pre>
            <button
              className="secondary-button"
              onClick={async () => {
                await navigator.clipboard.writeText(generated);
                setCopied(true);
              }}
              type="button"
            >{copied ? "Copied" : "Copy Markdown"}</button>
          </>
        ) : <div className="empty-state tall">Complete the proposal fields to generate a bounded review artifact.</div>}
      </section>
    </div>
  );
}
