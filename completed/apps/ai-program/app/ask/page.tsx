import { AdvisorPanel } from "@/src/components/AdvisorPanel";

export const metadata = { title: "Ask the program" };

export default function AskPage() {
  return <div className="page"><header className="page-header ask-header"><span className="eyebrow">Cited answers, explicit uncertainty</span><h1>Ask the AI Program</h1><p>This advisor is intentionally bounded by the organizational record. It will expose a missing decision before it invents one.</p></header><AdvisorPanel /></div>;
}
