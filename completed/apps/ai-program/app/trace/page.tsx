import Link from "next/link";

export const metadata = { title: "Control trace" };

const stages = [
  { number: "01", label: "Requirement", value: "Answers must cite scope, authority, freshness, conflicts, gaps, and next action.", state: "Draft course baseline", source: "/document/PROGRAM-CONTRACT", sourceLabel: "Program contract" },
  { number: "02", label: "Applicable scope", value: "Organization-level AI Program questions and repository-backed answers.", state: "Recorded", source: "/program/01-direction-and-governance/02-scope-layers-and-precedence", sourceLabel: "Scope and precedence" },
  { number: "03", label: "Risk rationale", value: "An unqualified answer can turn a course default, stale record, or absent decision into apparent permission.", state: "Draft", source: "/program/03-risk-management/01-risk-taxonomy-tiers-and-appetite", sourceLabel: "Risk taxonomy" },
  { number: "04", label: "Control", value: "The AI Program answer contract and bounded advisor procedure.", state: "Designed", source: "/program/08-program-intelligence/07-citations-provenance-and-uncertainty", sourceLabel: "Citations and uncertainty" },
  { number: "05", label: "Enforcement", value: "Canonical advisor skill plus deterministic application response schema.", state: "Instruction + application", source: "/program/05-controls-and-assurance/02-enforcement-surfaces-and-guardrails", sourceLabel: "Enforcement surfaces" },
  { number: "06", label: "Evidence", value: "Query acceptance scenarios and application unit/browser verification.", state: "Course evidence only", source: "/document/08-program-intelligence/QUERY-ACCEPTANCE", sourceLabel: "Query acceptance" },
  { number: "07", label: "Owner & approver", value: "UNASSIGNED / UNASSIGNED", state: "Missing — deployment blocker", source: "/program/01-direction-and-governance/03-roles-ownership-and-decision-rights", sourceLabel: "Decision rights" },
  { number: "08", label: "Exception", value: "No accepted exception is recorded. Missing authority must keep consequential action restricted.", state: "None recorded", source: "/program/03-risk-management/06-exceptions-residual-risk-and-acceptance", sourceLabel: "Residual risk" },
  { number: "09", label: "Freshness", value: "Review dates are recorded; provider, incident, owner, control, and evidence changes trigger earlier review.", state: "Scheduled", source: "/program/07-program-evolution/03-freshness-and-scheduled-review", sourceLabel: "Freshness" },
];

export default function TracePage() {
  return (
    <div className="page trace-page">
      <header className="page-header"><span className="eyebrow">Requirement → evidence → decision</span><h1>Control trace</h1><p>A complete trace makes the governing claim inspectable. This specimen deliberately exposes the missing client approval instead of pretending the course baseline is policy.</p></header>
      <div className="trace-banner"><span>CURRICULUM-REQ-001</span><div><strong>Demonstration trace</strong><p>Useful for teaching and adaptation. Not approved client policy or proof of compliance.</p></div></div>
      <div className="trace-flow">
        {stages.map((stage, index) => (
          <div className="trace-stage" key={stage.number}>
            <div className="trace-number">{stage.number}</div>
            <div className="trace-content"><span className="eyebrow">{stage.label}</span><h2>{stage.value}</h2><div><span className={stage.state.includes("Missing") ? "status blocked" : "status attention"}>{stage.state}</span><Link href={stage.source}>{stage.sourceLabel} →</Link></div></div>
            {index < stages.length - 1 ? <span className="trace-line" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
