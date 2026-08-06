export type MetadataValue = string | string[];

export interface ProgramMetadata {
  status?: string;
  owner?: string;
  "backup-owner"?: string;
  "approved-by"?: string;
  "last-reviewed"?: string;
  "next-review"?: string;
  "applies-to"?: string;
  evidence?: string[];
  supersedes?: string;
  [key: string]: MetadataValue | undefined;
}

export interface ProgramDocument {
  absolutePath: string;
  sourcePath: string;
  title: string;
  body: string;
  metadata: ProgramMetadata;
  route: string;
  folderSlug: string;
  isReadme: boolean;
}

export interface ProgramNode {
  name: string;
  title: string;
  slug: string;
  route: string;
  document: ProgramDocument;
  children: ProgramNode[];
}

export type FindingSeverity = "blocker" | "warning" | "info";
export type FindingKind =
  | "missing-metadata"
  | "unassigned-owner"
  | "unassigned-approver"
  | "draft-state"
  | "overdue-review"
  | "missing-evidence"
  | "broken-reference"
  | "change-record";

export interface Finding {
  id: string;
  severity: FindingSeverity;
  kind: FindingKind;
  title: string;
  detail: string;
  sourcePath: string;
  route: string;
  categorySlug?: string;
}

export interface CategoryHealth {
  node: ProgramNode;
  score: number;
  state: "blocked" | "attention" | "ready";
  blockers: number;
  warnings: number;
  findings: Finding[];
}

export interface ProgramSnapshot {
  profile: ProgramProfile;
  profiles: ProgramProfile[];
  root: ProgramNode;
  categories: CategoryHealth[];
  documents: ProgramDocument[];
  findings: Finding[];
  generatedAt: string;
  stats: {
    categoryCount: number;
    folderCount: number;
    documentCount: number;
    blockerCount: number;
    warningCount: number;
    overdueCount: number;
  };
}

export interface ProgramProfile {
  id: string;
  label: string;
  description: string;
  audience: string;
  limitations: string;
  includedFolders: string[];
  includedDocuments: string[];
  expansionTriggers: string[];
}

export interface Citation {
  label: string;
  sourcePath: string;
  route: string;
}

export interface AdvisorAnswer {
  intent: "health" | "missing" | "change" | "stale" | "wrong" | "culture" | "profile" | "general";
  headline: string;
  answer: string;
  scope: string;
  owner: string;
  freshness: string;
  uncertainty: string;
  nextAction: string;
  citations: Citation[];
  relatedFindings: Finding[];
}
