export type CapabilityKind = "skill" | "agent";
export type CapabilityMaturity = "candidate" | "evaluated" | "approved" | "restricted" | "retired";
export interface CapabilityFile {
  name: string;
  content: string;
  size: number;
  hash: string;
}

export interface CapabilityEntry {
  id: string;
  kind: CapabilityKind;
  name: string;
  description: string;
  source: string;
  sourceUrl: string;
  sourceRevision: string;
  retrievedAt: string;
  license: string;
  contentHash: string;
  originalPath: string;
  observedFormat: string;
  supportedHarnesses: string[];
  level: 1 | 2 | 3 | 4 | 5;
  function: string;
  category: string;
  type: "capability" | "preference";
  maturity: CapabilityMaturity;
  userInvocable: boolean;
  hasScripts: boolean;
  hasExamples: boolean;
  fileCount: number;
  content: string;
  files: CapabilityFile[];
  warnings: string[];
  requestedAuthority: string[];
  risk: "low" | "medium" | "high";
}

export interface SourceSnapshot {
  name: string;
  authority: "canonical" | "projection" | "fixture";
  path: string;
  revision: string;
  retrievedAt: string;
  status: "complete" | "partial" | "failed";
  count: number;
  note: string;
}

export interface EvaluationRecord {
  capability: string;
  decision: "approved" | "restricted" | "rejected";
  scope: string;
  evidence: string[];
  owner: string;
  reReviewTrigger: string;
}

export interface Catalog {
  version: string;
  generatedAt: string;
  sourceRevision: string;
  totalCapabilities: number;
  sources: SourceSnapshot[];
  capabilities: CapabilityEntry[];
  evaluations: EvaluationRecord[];
  demoDiff: {
    label: string;
    added: string[];
    changed: string[];
    removed: string[];
    unchanged: string[];
    failed: string[];
  };
}
