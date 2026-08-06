import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
const appRoot = process.cwd();
const repoRoot = path.resolve(appRoot, "../../..");
const outputPath = path.join(appRoot, "data/catalog.json");
const repositoryUrl = "https://github.com/GolferGeek/ai-dev-curriculum";

function sha(value) {
  return createHash("sha256").update(value).digest("hex");
}

function git(...args) {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
}

function parseFrontmatter(content) {
  if (!content.startsWith("---\n")) return {};
  const end = content.indexOf("\n---\n", 4);
  if (end < 0) return {};
  const result = {};
  for (const line of content.slice(4, end).split("\n")) {
    const split = line.indexOf(":");
    if (split < 0) continue;
    const key = line.slice(0, split).trim();
    let value = line.slice(split + 1).trim();
    if (value === "true") value = true;
    else if (value === "false") value = false;
    result[key] = value;
  }
  return result;
}

async function walkFiles(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walkFiles(absolute));
    else if (!entry.name.startsWith(".")) output.push(absolute);
  }
  return output.sort();
}

function inferCategory(functionName, content) {
  const haystack = `${functionName} ${content}`.toLowerCase();
  const rules = [
    ["security", /security|secret|vulnerab|auth|permission/],
    ["quality", /quality|test|lint|review|harden|error|monitor/],
    ["research", /research|analy|map|history|ingest/],
    ["infrastructure", /deploy|ci\/cd|operations|protocol|service|surreal/],
    ["design", /design|ui|ux|swiftui|dashboard/],
    ["data", /database|schema|data layer|query|migration/],
    ["communication", /present|report|document|author|writing/],
    ["productivity", /workflow|automation|template|plan|commit/]
  ];
  return rules.find(([, expression]) => expression.test(haystack))?.[0] ?? "development";
}

function inferType(content) {
  const value = content.toLowerCase();
  const capability = /(api|mcp|browser|fetch|build|deploy|xcodebuild|surrealdb|ollama)/.test(value);
  const preference = /(rules|conventions|standards|checklist|rubric|format|policy)/.test(value);
  return capability || !preference ? "capability" : "preference";
}

function requestedAuthority(content) {
  const value = content.toLowerCase();
  return [
    ["network", /network|fetch|http|github api/],
    ["filesystem write", /write|edit|patch|create file/],
    ["shell execution", /bash|terminal|xcodebuild|npm run/],
    ["external publication", /publish|push|pull request|deploy/],
    ["credentials", /secret|token|credential|api key/]
  ].filter(([, expression]) => expression.test(value)).map(([label]) => label);
}

async function buildEntry(mainFile, kind, revision, retrievedAt) {
  const directory = path.dirname(mainFile);
  const allFiles = await walkFiles(directory);
  const relativeMain = path.relative(repoRoot, mainFile).replaceAll(path.sep, "/");
  const functionName = relativeMain.split("/")[2];
  const content = await readFile(mainFile, "utf8");
  const frontmatter = parseFrontmatter(content);
  const files = [];
  for (const file of allFiles) {
    const fileContent = await readFile(file, "utf8");
    files.push({
      name: path.relative(directory, file).replaceAll(path.sep, "/"),
      content: fileContent,
      size: (await stat(file)).size,
      hash: sha(fileContent)
    });
  }
  const name = String(frontmatter.name ?? path.basename(directory));
  const description = String(frontmatter.description ?? content.split("\n").find((line) => line.trim() && !line.startsWith("#") && line !== "---") ?? `${kind} definition`);
  const authority = requestedAuthority(content);
  const warnings = [];
  if (authority.includes("external publication")) warnings.push("Can affect external or shared state; requires explicit scope and approval.");
  if (authority.includes("credentials")) warnings.push("May encounter credentials or secrets; verify data and logging boundaries.");
  if (files.some((file) => file.name.endsWith(".sh") || file.name.endsWith(".mjs"))) warnings.push("Includes executable supporting files; inspect before use.");
  const hasSupportingFiles = files.length > 1;
  const chains = /(delegates to|chains with|spawn|invoke.*agent|mandatory-skills)/i.test(content);
  const level = chains ? 4 : hasSupportingFiles ? 3 : content.split("\n").length >= 50 ? 2 : 1;
  const risk = authority.includes("external publication") || authority.includes("credentials") ? "high" : authority.length >= 2 ? "medium" : "low";
  const supportedHarnesses = [
    ["Claude Code", path.join(repoRoot, ".claude", kind === "skill" ? "skills" : "agents")],
    ["Cursor", path.join(repoRoot, ".cursor", kind === "skill" ? "skills" : "agents")],
    ["Codex", path.join(repoRoot, kind === "skill" ? ".agents/skills" : ".codex/agents")]
  ].filter(([, projectionRoot]) => projectionRoot).map(([label]) => label);
  const id = `${kind}-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${sha(relativeMain).slice(0, 8)}`;
  return {
    id,
    kind,
    name,
    description: description.replace(/^['"]|['"]$/g, ""),
    source: "Canonical curriculum library",
    sourceUrl: `${repositoryUrl}/blob/main/${relativeMain}`,
    sourceRevision: revision,
    retrievedAt,
    license: "repository-license; client review required",
    contentHash: sha(files.map((file) => `${file.name}:${file.hash}`).join("\n")),
    originalPath: relativeMain,
    observedFormat: kind === "skill" ? "portable SKILL.md folder" : "canonical AGENT.md definition",
    supportedHarnesses,
    level,
    function: functionName,
    category: inferCategory(functionName, content),
    type: inferType(content),
    maturity: "evaluated",
    userInvocable: frontmatter["user-invocable"] !== false,
    hasScripts: files.some((file) => /(^|\/)scripts?\//.test(file.name) || /\.(sh|mjs|js|ts)$/.test(file.name)),
    hasExamples: files.some((file) => /(^|\/)(examples?|fixtures?)\//.test(file.name)),
    fileCount: files.length,
    content,
    files,
    warnings,
    requestedAuthority: authority,
    risk
  };
}

async function main() {
  const revision = git("rev-parse", "HEAD");
  const retrievedAt = git("log", "-1", "--format=%cI", "--", "ai").slice(0, 10);
  const skillFiles = (await walkFiles(path.join(repoRoot, "ai/skills"))).filter((file) => file.endsWith("/SKILL.md"));
  const agentFiles = (await walkFiles(path.join(repoRoot, "ai/agents"))).filter((file) => file.endsWith("/AGENT.md"));
  const capabilities = [];
  for (const file of skillFiles) capabilities.push(await buildEntry(file, "skill", revision, retrievedAt));
  for (const file of agentFiles) capabilities.push(await buildEntry(file, "agent", revision, retrievedAt));
  capabilities.sort((a, b) => a.name.localeCompare(b.name) || a.kind.localeCompare(b.kind));
  const projectionCount = async (directory, suffix) => (await walkFiles(path.join(repoRoot, directory))).filter((file) => file.endsWith(suffix)).length;
  const sources = [
    { name: "Canonical AI library", authority: "canonical", path: "ai/", revision, retrievedAt, status: "complete", count: capabilities.length, note: "Authoritative source for reusable skills and specialized agents." },
    { name: "Claude Code projection", authority: "projection", path: ".claude/", revision, retrievedAt, status: "complete", count: await projectionCount(".claude", ".md"), note: "Generated compatibility snapshot; never an independent policy source." },
    { name: "Cursor projection", authority: "projection", path: ".cursor/", revision, retrievedAt, status: "complete", count: await projectionCount(".cursor", ".md"), note: "Generated compatibility snapshot; regenerate from ai/." },
    { name: "Codex projection", authority: "projection", path: ".agents/ and .codex/", revision, retrievedAt, status: "complete", count: await projectionCount(".agents/skills", "SKILL.md") + await projectionCount(".codex/agents", ".toml"), note: "Generated compatibility snapshot across skills and agent roles." }
  ];
  const findName = (name) => capabilities.find((entry) => entry.name === name)?.name ?? name;
  const catalog = {
    version: "1.0.0",
    generatedAt: `${retrievedAt}T00:00:00Z`,
    sourceRevision: revision,
    totalCapabilities: capabilities.length,
    sources,
    capabilities,
    evaluations: [
      { capability: findName("skill-scout"), decision: "approved", scope: "Course discovery exercises using configured local sources", evidence: ["Exact revision and hashes captured", "Non-install boundary verified", "Catalog diff output defined"], owner: "Course maintainer", reReviewTrigger: "Source or requested-authority change" },
      { capability: findName("security-scan"), decision: "restricted", scope: "Authorized repositories without protected production secrets", evidence: ["Read-only scan intent", "Findings require human review", "External reporting not authorized"], owner: "Repository security reviewer", reReviewTrigger: "Scanner gains write or network authority" },
      { capability: findName("nightly-hygiene"), decision: "rejected", scope: "Unattended activation in a client repository", evidence: ["Can create branches and pull requests", "Requires client-specific credentials and authority", "No client owner or approval exists in the course baseline"], owner: "UNASSIGNED client authority", reReviewTrigger: "Client assigns owner, credentials, scope, and rollback" }
    ],
    demoDiff: {
      label: "Training fixture — run 2026-08-05 → 2026-08-06",
      added: ["ai-program-advisor"],
      changed: ["nightly-hygiene"],
      removed: ["legacy-marketplace-import"],
      unchanged: ["security-scan", "skill-scout"],
      failed: ["approved-private-source (access denied)"]
    }
  };
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);
  console.log(`Catalog generated: ${capabilities.length} capabilities from ${sources.length} snapshots.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
