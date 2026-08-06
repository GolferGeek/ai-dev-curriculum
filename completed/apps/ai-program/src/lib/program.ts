import fs from "node:fs";
import path from "node:path";
import type {
  CategoryHealth,
  Finding,
  FindingSeverity,
  ProgramDocument,
  ProgramMetadata,
  ProgramNode,
  ProgramSnapshot,
} from "./types";
import { documentIncluded, filterProgramNode, selectProgramProfile } from "./profiles";

const REQUIRED_METADATA = [
  "status",
  "owner",
  "backup-owner",
  "approved-by",
  "last-reviewed",
  "next-review",
  "applies-to",
  "evidence",
  "supersedes",
] as const;

const CATEGORY_PATTERN = /^\d{2}-/;

function isDirectory(candidate: string): boolean {
  try {
    return fs.statSync(candidate).isDirectory();
  } catch {
    return false;
  }
}

export function resolveProgramRoot(): string {
  const configured = process.env.AI_PROGRAM_ROOT;
  const candidates = [
    configured,
    path.resolve(process.cwd(), "docs/ai-program"),
    path.resolve(process.cwd(), "../../../docs/ai-program"),
    path.resolve(process.cwd(), "../../docs/ai-program"),
  ].filter((candidate): candidate is string => Boolean(candidate));

  const root = candidates.find(isDirectory);
  if (!root) {
    throw new Error(
      "Unable to locate docs/ai-program. Set AI_PROGRAM_ROOT to the canonical program directory.",
    );
  }
  return root;
}

export function parseFrontmatter(markdown: string): {
  metadata: ProgramMetadata;
  body: string;
} {
  if (!markdown.startsWith("---\n")) {
    return { metadata: {}, body: markdown };
  }

  const end = markdown.indexOf("\n---\n", 4);
  if (end === -1) {
    return { metadata: {}, body: markdown };
  }

  const block = markdown.slice(4, end);
  const metadata: ProgramMetadata = {};
  let activeList: string | undefined;

  for (const line of block.split("\n")) {
    const listItem = line.match(/^\s+-\s+(.+)$/);
    if (listItem && activeList) {
      const current = metadata[activeList];
      metadata[activeList] = [
        ...(Array.isArray(current) ? current : []),
        listItem[1].trim(),
      ];
      continue;
    }

    const field = line.match(/^([a-zA-Z0-9-]+):\s*(.*)$/);
    if (!field) continue;
    const [, key, rawValue] = field;
    const value = rawValue.trim();
    activeList = undefined;

    if (value === "[]") {
      metadata[key] = [];
    } else if (value.startsWith("[") && value.endsWith("]")) {
      metadata[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    } else if (!value) {
      metadata[key] = [];
      activeList = key;
    } else {
      metadata[key] = value.replace(/^['"]|['"]$/g, "");
    }
  }

  return { metadata, body: markdown.slice(end + 5) };
}

export function titleFromMarkdown(markdown: string, fallback: string): string {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? humanize(fallback);
}

export function humanize(value: string): string {
  return value
    .replace(/^\d+(?:\.\d+)?-/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function routeForSource(sourcePath: string): string {
  if (sourcePath === "README.md") return "/program";
  if (sourcePath.endsWith("/README.md")) {
    return `/program/${sourcePath.slice(0, -"/README.md".length)}`;
  }
  return `/document/${sourcePath.replace(/\.md$/, "")}`;
}

function readDocument(root: string, absolutePath: string): ProgramDocument {
  const markdown = fs.readFileSync(absolutePath, "utf8");
  const { metadata, body } = parseFrontmatter(markdown);
  const sourcePath = path.relative(root, absolutePath).split(path.sep).join("/");
  const isReadme = path.basename(absolutePath) === "README.md";
  const folderSlug = isReadme
    ? path.dirname(sourcePath) === "."
      ? ""
      : path.dirname(sourcePath).split(path.sep).join("/")
    : path.dirname(sourcePath).split(path.sep).join("/");

  return {
    absolutePath,
    sourcePath,
    title: titleFromMarkdown(body, path.basename(absolutePath, ".md")),
    body,
    metadata,
    route: routeForSource(sourcePath),
    folderSlug,
    isReadme,
  };
}

function buildNode(root: string, directory: string): ProgramNode {
  const readme = path.join(directory, "README.md");
  if (!fs.existsSync(readme)) {
    throw new Error(`Folder node is missing README.md: ${path.relative(root, directory)}`);
  }
  const document = readDocument(root, readme);
  const slug = path.relative(root, directory).split(path.sep).join("/");
  const children = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((entry) => buildNode(root, path.join(directory, entry.name)));

  return {
    name: path.basename(directory),
    title: document.title,
    slug: slug === "." ? "" : slug,
    route: slug === "." ? "/program" : `/program/${slug}`,
    document,
    children,
  };
}

function walkMarkdown(root: string, directory = root): ProgramDocument[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkMarkdown(root, absolutePath);
      if (entry.isFile() && entry.name.endsWith(".md")) {
        return [readDocument(root, absolutePath)];
      }
      return [];
    });
}

function categoryFor(sourcePath: string): string | undefined {
  const first = sourcePath.split("/")[0];
  return CATEGORY_PATTERN.test(first) ? first : undefined;
}

function finding(
  document: ProgramDocument,
  severity: FindingSeverity,
  kind: Finding["kind"],
  title: string,
  detail: string,
  suffix: string = kind,
): Finding {
  return {
    id: `${document.sourcePath}:${suffix}`,
    severity,
    kind,
    title,
    detail,
    sourcePath: document.sourcePath,
    route: document.route,
    categorySlug: categoryFor(document.sourcePath),
  };
}

function metadataFindings(document: ProgramDocument, today: string): Finding[] {
  const missing = REQUIRED_METADATA.filter((key) => document.metadata[key] === undefined);
  const findings: Finding[] = [];

  if (missing.length > 0) {
    findings.push(
      finding(
        document,
        "blocker",
        "missing-metadata",
        "Required authority metadata is missing",
        `Missing: ${missing.join(", ")}.`,
      ),
    );
  }

  if (document.metadata.owner === "UNASSIGNED") {
    findings.push(
      finding(
        document,
        "blocker",
        "unassigned-owner",
        "Accountable owner is unassigned",
        "This node cannot be treated as operational company policy until an accountable owner accepts it.",
      ),
    );
  }
  if (document.metadata["approved-by"] === "UNASSIGNED") {
    findings.push(
      finding(
        document,
        "blocker",
        "unassigned-approver",
        "Approver is unassigned",
        "No authorized person is recorded as approving this position.",
      ),
    );
  }
  if (document.metadata.status?.toLowerCase() === "draft") {
    findings.push(
      finding(
        document,
        "warning",
        "draft-state",
        "Content remains draft",
        "Treat this material as a course baseline or proposal, not approved organizational policy.",
      ),
    );
  }

  const nextReview = document.metadata["next-review"];
  if (typeof nextReview === "string" && /^\d{4}-\d{2}-\d{2}$/.test(nextReview) && nextReview < today) {
    findings.push(
      finding(
        document,
        "warning",
        "overdue-review",
        "Scheduled review is overdue",
        `The next review was due ${nextReview}.`,
      ),
    );
  }

  if (Array.isArray(document.metadata.evidence) && document.metadata.evidence.length === 0) {
    findings.push(
      finding(
        document,
        "warning",
        "missing-evidence",
        "No evidence pointer is recorded",
        "The node has no durable evidence link. This does not prove that the described practice operates.",
      ),
    );
  }

  return findings;
}

function referenceFindings(document: ProgramDocument): Finding[] {
  const links = [...document.body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)];
  return links.flatMap((match, index) => {
    const raw = match[1].trim().replace(/^<|>$/g, "");
    if (!raw || raw.startsWith("#") || /^(https?:|mailto:)/.test(raw)) return [];
    const relative = decodeURIComponent(raw.split("#")[0].split(/\s+['"]/)[0]);
    if (!relative) return [];
    const target = path.resolve(path.dirname(document.absolutePath), relative);
    if (fs.existsSync(target)) return [];
    return [
      finding(
        document,
        "blocker",
        "broken-reference",
        "A repository reference is broken",
        `Cannot resolve ${relative} from ${document.sourcePath}.`,
        `broken-reference-${index}`,
      ),
    ];
  });
}

function categoryHealth(node: ProgramNode, findings: Finding[]): CategoryHealth {
  const relevant = findings.filter(
    (item) => item.categorySlug === node.name || item.sourcePath.startsWith(`${node.name}/`),
  );
  const blockers = relevant.filter((item) => item.severity === "blocker").length;
  const warnings = relevant.filter((item) => item.severity === "warning").length;
  const score = Math.max(8, 100 - blockers * 10 - warnings * 3);
  return {
    node,
    score,
    state: blockers > 0 ? "blocked" : warnings > 0 ? "attention" : "ready",
    blockers,
    warnings,
    findings: relevant,
  };
}

export function loadProgramSnapshot(options?: {
  root?: string;
  today?: string;
  profile?: string;
}): ProgramSnapshot {
  const rootPath = options?.root ?? resolveProgramRoot();
  const today = options?.today ?? new Date().toISOString().slice(0, 10);
  const { profile, profiles } = selectProgramProfile(
    rootPath,
    options?.profile ?? process.env.AI_PROGRAM_PROFILE,
  );
  const fullRoot = buildNode(rootPath, rootPath);
  const root = filterProgramNode(fullRoot, profile);
  if (!root) throw new Error(`Program profile ${profile.id} excludes the program root.`);
  const documents = walkMarkdown(rootPath).filter((document) => documentIncluded(document, profile));
  const findings = documents.flatMap((document) => [
    ...metadataFindings(document, today),
    ...referenceFindings(document),
  ]);
  const categories = root.children
    .filter((node) => CATEGORY_PATTERN.test(node.name))
    .map((node) => categoryHealth(node, findings));

  return {
    profile,
    profiles,
    root,
    categories,
    documents,
    findings,
    generatedAt: new Date().toISOString(),
    stats: {
      categoryCount: categories.length,
      folderCount: documents.filter((document) => document.isReadme).length,
      documentCount: documents.length,
      blockerCount: findings.filter((item) => item.severity === "blocker").length,
      warningCount: findings.filter((item) => item.severity === "warning").length,
      overdueCount: findings.filter((item) => item.kind === "overdue-review").length,
    },
  };
}

export function findNode(root: ProgramNode, slug: string): ProgramNode | undefined {
  if (root.slug === slug) return root;
  for (const child of root.children) {
    const match = findNode(child, slug);
    if (match) return match;
  }
  return undefined;
}

export function findDocument(snapshot: ProgramSnapshot, sourceWithoutExtension: string): ProgramDocument | undefined {
  const normalized = `${sourceWithoutExtension.replace(/^\/+/, "")}.md`;
  return snapshot.documents.find((document) => document.sourcePath === normalized);
}

export function resolveMarkdownRoute(currentSourcePath: string, href: string): string {
  if (!href || href.startsWith("#") || /^(https?:|mailto:)/.test(href)) return href;
  const [rawPath, anchor] = href.split("#");
  const source = path.posix.normalize(path.posix.join(path.posix.dirname(currentSourcePath), rawPath));
  return `${routeForSource(source)}${anchor ? `#${anchor}` : ""}`;
}
