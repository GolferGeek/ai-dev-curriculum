import type {
  AdvisorAnswer,
  Citation,
  Finding,
  ProgramDocument,
  ProgramSnapshot,
} from "./types";

const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "could",
  "from",
  "have",
  "how",
  "into",
  "our",
  "that",
  "the",
  "this",
  "what",
  "when",
  "where",
  "which",
  "with",
  "would",
]);

export function classifyQuestion(question: string): AdvisorAnswer["intent"] {
  const normalized = question.toLowerCase();
  if (/\b(profile|full version|essential version|light version|small version|scale)\b/.test(normalized)) return "profile";
  if (/\b(culture|sentiment|workforce|psychological safety|employee experience|people feel|trust)\b/.test(normalized)) return "culture";
  if (/\b(old|stale|outdated|expired|overdue|fresh)\b/.test(normalized)) return "stale";
  if (/\b(chang|new|recent|different|updated|terrain)\w*\b/.test(normalized)) return "change";
  if (/\b(wrong|broken|conflict|fail|bad|problem)\w*\b/.test(normalized)) return "wrong";
  if (/\b(lack|missing|gap|incomplete|need)\w*\b/.test(normalized)) return "missing";
  if (/\b(health|governance|ready|readiness|doing|status)\w*\b/.test(normalized)) return "health";
  return "general";
}

function citation(document: ProgramDocument): Citation {
  return {
    label: document.title,
    sourcePath: document.sourcePath,
    route: document.route,
  };
}

function bySource(snapshot: ProgramSnapshot, sourcePath: string): Citation | undefined {
  const document = snapshot.documents.find((item) => item.sourcePath === sourcePath);
  return document ? citation(document) : undefined;
}

function sourceSet(snapshot: ProgramSnapshot, paths: string[]): Citation[] {
  return paths
    .map((sourcePath) => bySource(snapshot, sourcePath))
    .filter((item): item is Citation => Boolean(item));
}

function topFindings(snapshot: ProgramSnapshot, predicate?: (finding: Finding) => boolean): Finding[] {
  const severityOrder = { blocker: 0, warning: 1, info: 2 };
  return snapshot.findings
    .filter(predicate ?? (() => true))
    .sort((left, right) => severityOrder[left.severity] - severityOrder[right.severity])
    .slice(0, 6);
}

function searchableTerms(question: string): string[] {
  return question
    .toLowerCase()
    .split(/[^a-z0-9-]+/)
    .filter((term) => term.length > 3 && !STOP_WORDS.has(term));
}

function searchDocuments(snapshot: ProgramSnapshot, question: string): ProgramDocument[] {
  const terms = searchableTerms(question);
  if (terms.length === 0) return [];
  return snapshot.documents
    .map((document) => {
      const haystack = `${document.title}\n${document.body}`.toLowerCase();
      return {
        document,
        score: terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0),
      };
    })
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map((result) => result.document);
}

export function answerQuestion(question: string, snapshot: ProgramSnapshot): AdvisorAnswer {
  const intent = classifyQuestion(question);
  const root = snapshot.root.document.metadata;
  const rootOwner = typeof root.owner === "string" ? root.owner : "Not recorded";
  const review = typeof root["last-reviewed"] === "string" ? root["last-reviewed"] : "not recorded";
  const nextReview = typeof root["next-review"] === "string" ? root["next-review"] : "not recorded";
  const decisionRecords = snapshot.documents.filter(
    (document) =>
      document.sourcePath.startsWith("07-program-evolution/02-proposals-decisions-and-supersession/") &&
      !document.isReadme &&
      !document.sourcePath.endsWith("_template.md"),
  );

  const common = {
    scope: `${typeof root["applies-to"] === "string" ? root["applies-to"] : "Organization baseline"} · ${snapshot.profile.label} profile`,
    owner: rootOwner,
    freshness: `Program index reviewed ${review}; next scheduled review ${nextReview}.`,
    uncertainty:
      "This reference analyzes repository records only. Drafts, unassigned owners, and absent evidence are gaps—not permission, legal interpretation, or proof of compliance.",
  };

  if (intent === "culture") {
    const culturePrefix = "07-program-evolution/06-adoption-outcomes-and-improvement";
    const cultureDocuments = snapshot.documents.filter((document) => document.sourcePath.startsWith(culturePrefix));
    const cultureFindings = snapshot.findings.filter((item) => item.sourcePath.startsWith(culturePrefix));
    return {
      ...common,
      intent,
      headline: "Culture is governed; sentiment is bounded evidence.",
      answer: `The ${snapshot.profile.label} view includes ${cultureDocuments.length} culture and adoption records with ${cultureFindings.filter((item) => item.severity === "blocker").length} blockers and ${cultureFindings.filter((item) => item.severity === "warning").length} warnings. The program distinguishes cultural behaviors, workforce impacts, learning, psychological safety, communication, privacy-governed sentiment, and outcomes. It prohibits treating sentiment as individual performance data or silent employee monitoring.`,
      nextAction:
        "Assign people, privacy, security, and program owners; approve the listening purpose and prohibited uses; then establish an aggregate baseline with visible follow-through.",
      citations: sourceSet(snapshot, [
        `${culturePrefix}/README.md`,
        `${culturePrefix}/04-psychological-safety-and-escalation/README.md`,
        `${culturePrefix}/06-sentiment-listening-and-privacy/README.md`,
        `${culturePrefix}/07-adoption-outcomes-and-improvement/README.md`,
      ]),
      relatedFindings: topFindings(snapshot, (item) => item.sourcePath.startsWith(culturePrefix)),
    };
  }

  if (intent === "profile") {
    return {
      ...common,
      intent,
      headline: `The application is using the ${snapshot.profile.label} profile.`,
      answer: `${snapshot.profile.description} ${snapshot.profile.limitations} This profile includes ${snapshot.stats.folderCount} folder-level records. Filtering changes the view and its readiness counts; it never overrides an applicable requirement, risk treatment, accepted decision, or stricter overlay.`,
      nextAction:
        snapshot.profile.expansionTriggers.length > 0
          ? `Review the selected profile when any expansion trigger occurs, beginning with: ${snapshot.profile.expansionTriggers[0]}.`
          : "Keep Full as the discovery view, then record any smaller client-selected profile as an approved, scoped decision.",
      citations: sourceSet(snapshot, ["PROGRAM-PROFILES.md", "PROGRAM-CONTRACT.md", "GRC-OPERATING-MAP.md"]),
      relatedFindings: topFindings(snapshot),
    };
  }

  if (intent === "health") {
    return {
      ...common,
      intent,
      headline: "The structure is strong; organizational readiness is blocked.",
      answer: `The program has ${snapshot.stats.categoryCount} canonical categories and ${snapshot.stats.folderCount} folder-level records. It currently has ${snapshot.stats.blockerCount} blockers and ${snapshot.stats.warningCount} warnings. The dominant blockers are unassigned accountability and approval, so the course baseline must not be treated as active company policy yet.`,
      nextAction:
        "Assign an accountable program owner and authorized approver, then review the eight category roots in risk order and link operating evidence.",
      citations: sourceSet(snapshot, ["README.md", "PROGRAM-CONTRACT.md", "COVERAGE-MATRIX.md"]),
      relatedFindings: topFindings(snapshot),
    };
  }

  if (intent === "missing") {
    const ownerGaps = snapshot.findings.filter((item) => item.kind === "unassigned-owner").length;
    const approvalGaps = snapshot.findings.filter((item) => item.kind === "unassigned-approver").length;
    const evidenceGaps = snapshot.findings.filter((item) => item.kind === "missing-evidence").length;
    return {
      ...common,
      intent,
      headline: "Ownership, approval, and operating evidence are the largest gaps.",
      answer: `The current record contains ${ownerGaps} unassigned-owner findings, ${approvalGaps} unassigned-approver findings, and ${evidenceGaps} records without evidence pointers. The hierarchy describes what each node must contain, but a client still needs to supply its names, approved decisions, systems, controls, and evidence locations.`,
      nextAction:
        "Start with Direction and Governance, then complete one high-consequence requirement-to-control trace before broadening coverage.",
      citations: sourceSet(snapshot, [
        "COVERAGE-MATRIX.md",
        "01-direction-and-governance/03-roles-ownership-and-decision-rights/README.md",
        "05-controls-and-assurance/03-evidence-and-retention/README.md",
      ]),
      relatedFindings: topFindings(snapshot, (item) =>
        ["missing-metadata", "unassigned-owner", "unassigned-approver", "missing-evidence"].includes(item.kind),
      ),
    };
  }

  if (intent === "change") {
    return {
      ...common,
      intent,
      headline:
        decisionRecords.length > 0
          ? `${decisionRecords.length} accepted or proposed decision records require review.`
          : "No populated decision records describe an active organizational change.",
      answer:
        decisionRecords.length > 0
          ? "The decision register contains records beyond its template. Review their status and supersession links before treating them as current."
          : "The program includes a terrain/watchlist and a decision workflow, but the curriculum baseline has no populated accepted decision record. That absence means the app cannot responsibly claim what changed for a client.",
      nextAction:
        "Record each material change as a dated proposal or accepted decision with affected scope, migration, rollback, validation, approver, and supersession history.",
      citations: sourceSet(snapshot, [
        "07-program-evolution/01-terrain-and-watchlist/README.md",
        "07-program-evolution/02-proposals-decisions-and-supersession/README.md",
        "07-program-evolution/03-freshness-and-scheduled-review/README.md",
      ]),
      relatedFindings: topFindings(snapshot, (item) => item.categorySlug === "07-program-evolution"),
    };
  }

  if (intent === "stale") {
    const overdue = snapshot.findings.filter((item) => item.kind === "overdue-review");
    return {
      ...common,
      intent,
      headline:
        overdue.length > 0
          ? `${overdue.length} documents are past their scheduled review date.`
          : "No dated review is overdue, but freshness is not proven by dates alone.",
      answer:
        overdue.length > 0
          ? "The listed records are past their declared next-review date and should be revalidated against current decisions and terrain."
          : "Scheduled dates are currently within range. However, event triggers, draft status, unassigned owners, changed tools, incidents, or invalid evidence can make a record stale before its calendar date.",
      nextAction:
        "Review high-risk nodes after any provider, data, authority, incident, control, or owner change; record the decision instead of merely advancing a date.",
      citations: sourceSet(snapshot, [
        "07-program-evolution/03-freshness-and-scheduled-review/README.md",
        "08-program-intelligence/04-staleness-and-expiration/README.md",
      ]),
      relatedFindings: overdue.length > 0 ? overdue.slice(0, 6) : topFindings(snapshot, (item) => item.kind === "draft-state"),
    };
  }

  if (intent === "wrong") {
    const broken = snapshot.findings.filter((item) => item.kind === "broken-reference");
    const metadata = snapshot.findings.filter((item) => item.kind === "missing-metadata");
    return {
      ...common,
      intent,
      headline:
        broken.length + metadata.length > 0
          ? `${broken.length + metadata.length} structural defects need correction.`
          : "No deterministic structural defect was found; policy correctness still requires human review.",
      answer: `The analyzer found ${broken.length} broken relative references and ${metadata.length} documents missing the required authority metadata. It can also expose draft, owner, approval, evidence, and freshness gaps. It cannot determine that a legal interpretation or business stance is substantively correct.`,
      nextAction:
        "Repair deterministic defects first, then route substantive conflicts or questionable positions to the accountable owner and authorized approver.",
      citations: sourceSet(snapshot, [
        "PROGRAM-CONTRACT.md",
        "08-program-intelligence/05-conflicts-and-control-failures/README.md",
        "08-program-intelligence/07-citations-provenance-and-uncertainty/README.md",
      ]),
      relatedFindings: topFindings(snapshot, (item) =>
        ["broken-reference", "missing-metadata", "draft-state"].includes(item.kind),
      ),
    };
  }

  const matches = searchDocuments(snapshot, question);
  return {
    ...common,
    intent,
    headline: matches.length > 0 ? "Relevant program records were found." : "The program does not contain a qualified answer.",
    answer:
      matches.length > 0
        ? `The bounded advisor found ${matches.length} relevant records. Review the cited sources and their authority metadata; this reference does not infer a permissive answer from similarity alone.`
        : "No sufficiently specific repository record matched the question. Absence of a rule is not permission.",
    nextAction:
      matches.length > 0
        ? "Open the sources, confirm the requested system, data, action, and scope, then route any unresolved decision to the named owner."
        : "Describe the system, data class, requested action, organizational scope, and decision owner; then add an approved record through the proposal workflow.",
    citations: matches.map(citation),
    relatedFindings: topFindings(snapshot, (item) => matches.some((document) => document.sourcePath === item.sourcePath)),
  };
}
