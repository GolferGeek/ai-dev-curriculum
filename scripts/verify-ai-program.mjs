#!/usr/bin/env node

import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const program = path.join(root, "docs", "ai-program");

const requiredFiles = [
  "README.md",
  "PROGRAM-MAP.md",
  "PROGRAM-CONTRACT.md",
  "PROGRAM-PROFILES.md",
  "PROFILE-FULL.json",
  "PROFILE-ESSENTIAL.json",
  "PROFILE-LIGHT.json",
  "COVERAGE-MATRIX.md",
  "GRC-OPERATING-MAP.md",
  "08-program-intelligence/HOW-TO-ASK.md",
  "08-program-intelligence/QUERY-ACCEPTANCE.md",
  "07-program-evolution/03-freshness-and-scheduled-review/README.md",
  "07-program-evolution/01-terrain-and-watchlist/README.md",
  "07-program-evolution/02-proposals-decisions-and-supersession/README.md",
  "07-program-evolution/02-proposals-decisions-and-supersession/_template.md",
  "02-technology-governance/03-skills-and-specialized-agents/README.md",
  "02-technology-governance/03-skills-and-specialized-agents/11-functional-organization.md",
  "02-technology-governance/03-skills-and-specialized-agents/12-agent-portability.md",
  "07-program-evolution/06-adoption-outcomes-and-improvement/01-cultural-principles-and-desired-behaviors/README.md",
  "07-program-evolution/06-adoption-outcomes-and-improvement/02-workforce-experience-and-role-impacts/README.md",
  "07-program-evolution/06-adoption-outcomes-and-improvement/03-ai-literacy-training-and-coaching/README.md",
  "07-program-evolution/06-adoption-outcomes-and-improvement/04-psychological-safety-and-escalation/README.md",
  "07-program-evolution/06-adoption-outcomes-and-improvement/05-communication-and-change-management/README.md",
  "07-program-evolution/06-adoption-outcomes-and-improvement/06-sentiment-listening-and-privacy/README.md",
  "07-program-evolution/06-adoption-outcomes-and-improvement/07-adoption-outcomes-and-improvement/README.md",
];

const profileFiles = [
  "PROFILE-FULL.json",
  "PROFILE-ESSENTIAL.json",
  "PROFILE-LIGHT.json",
];

const categories = [
  "01-direction-and-governance",
  "02-technology-governance",
  "03-risk-management",
  "04-compliance-and-obligations",
  "05-controls-and-assurance",
  "06-delivery-and-operations",
  "07-program-evolution",
  "08-program-intelligence",
];

const normativeBaselines = [
  "02-technology-governance/01-harnesses-and-interfaces/README.md",
  "02-technology-governance/05-protocols-counterparties-and-payments/README.md",
  "03-risk-management/02-data-privacy-security-and-confidentiality/README.md",
  "06-delivery-and-operations/01-intention-to-operation-lifecycle/README.md",
  "06-delivery-and-operations/02-quality-and-release-gates/README.md",
  "07-program-evolution/06-adoption-outcomes-and-improvement/README.md",
];

const failures = [];

for (const relative of requiredFiles) {
  const absolute = path.join(program, relative);
  try {
    await access(absolute);
  } catch {
    failures.push(`missing ${path.relative(root, absolute)}`);
  }
}

for (const relative of profileFiles) {
  let profile;
  try {
    profile = JSON.parse(await readFile(path.join(program, relative), "utf8"));
  } catch (error) {
    failures.push(`${relative} is not valid JSON: ${error.message}`);
    continue;
  }
  for (const field of ["id", "label", "description", "audience", "limitations"]) {
    if (typeof profile[field] !== "string" || profile[field].trim() === "") {
      failures.push(`${relative} lacks a valid ${field}`);
    }
  }
  for (const field of ["includedFolders", "includedDocuments", "expansionTriggers"]) {
    if (!Array.isArray(profile[field]) || !profile[field].every((item) => typeof item === "string")) {
      failures.push(`${relative} lacks a valid ${field} list`);
    }
  }
  for (const folder of profile.includedFolders ?? []) {
    if (folder === "*") continue;
    try {
      await access(path.join(program, folder, "README.md"));
    } catch {
      failures.push(`${relative} includes missing folder ${folder}`);
    }
  }
  for (const document of profile.includedDocuments ?? []) {
    if (document === "*") continue;
    try {
      await access(path.join(program, document));
    } catch {
      failures.push(`${relative} includes missing document ${document}`);
    }
  }
}

for (const relative of normativeBaselines) {
  const absolute = path.join(program, relative);
  let content;
  try {
    content = await readFile(absolute, "utf8");
  } catch {
    continue;
  }

  for (const field of [
    "status:",
    "owner:",
    "last-reviewed:",
    "next-review:",
    "applies-to:",
  ]) {
    if (!content.includes(field)) failures.push(`${relative} lacks ${field}`);
  }
  if (!/^## Ask this node$/m.test(content)) {
    failures.push(`${relative} lacks an agent-query section`);
  }
  if (!/review trigger/i.test(content)) {
    failures.push(`${relative} lacks review triggers`);
  }
}

async function verifyFolderReadmes(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const hasReadme = entries.some(
    (entry) => entry.isFile() && entry.name === "README.md",
  );
  if (!hasReadme) {
    failures.push(`${path.relative(root, directory)} lacks README.md`);
  } else {
    const readme = path.join(directory, "README.md");
    const content = await readFile(readme, "utf8");
    for (const field of [
      "status:",
      "owner:",
      "backup-owner:",
      "approved-by:",
      "last-reviewed:",
      "next-review:",
      "applies-to:",
      "evidence:",
      "supersedes:",
    ]) {
      if (!content.includes(field)) {
        failures.push(`${path.relative(root, readme)} lacks ${field}`);
      }
    }
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      await verifyFolderReadmes(path.join(directory, entry.name));
    }
  }
}

await verifyFolderReadmes(program);

const index = await readFile(path.join(program, "README.md"), "utf8");
for (const category of categories) {
  if (!index.includes(`${category}/README.md`)) {
    failures.push(`README.md does not link ${category}/README.md`);
  }
}

for (const requiredLink of [
  "PROGRAM-MAP.md",
  "PROGRAM-CONTRACT.md",
  "PROGRAM-PROFILES.md",
  "COVERAGE-MATRIX.md",
  "GRC-OPERATING-MAP.md",
  "08-program-intelligence/HOW-TO-ASK.md",
  "08-program-intelligence/QUERY-ACCEPTANCE.md",
  "07-program-evolution/03-freshness-and-scheduled-review/README.md",
]) {
  if (!index.includes(requiredLink)) {
    failures.push(`README.md does not link ${requiredLink}`);
  }
}

const coverage = await readFile(path.join(program, "COVERAGE-MATRIX.md"), "utf8");
for (const domain of [
  "Harnesses and interfaces",
  "Models and routing",
  "GRC traceability",
  "AI culture and behavior",
  "Sentiment and listening",
  "Program scale",
  "Agent authority",
  "Skills and agents",
  "Tools and MCP",
  "A2A and counterparties",
  "Quality and release",
  "Change and modernization",
]) {
  if (!coverage.includes(domain)) {
    failures.push(`COVERAGE-MATRIX.md lacks ${domain}`);
  }
}

const grcMap = await readFile(
  path.join(program, "GRC-OPERATING-MAP.md"),
  "utf8",
);
for (const field of [
  "status:",
  "owner:",
  "backup-owner:",
  "approved-by:",
  "last-reviewed:",
  "next-review:",
  "applies-to:",
  "evidence:",
  "supersedes:",
]) {
  if (!grcMap.includes(field)) {
    failures.push(`GRC-OPERATING-MAP.md lacks ${field}`);
  }
}
for (const concept of [
  "authoritative requirement",
  "risk tier",
  "control",
  "evidence",
  "owner and approver",
  "exception",
  "freshness",
]) {
  if (!grcMap.toLowerCase().includes(concept)) {
    failures.push(`GRC-OPERATING-MAP.md lacks ${concept}`);
  }
}
if (!/^## Ask this map$/m.test(grcMap)) {
  failures.push("GRC-OPERATING-MAP.md lacks an agent-query section");
}

const advisor = await readFile(
  path.join(
    root,
    "ai",
    "skills",
    "06-skill-and-agent-governance",
    "ai-program-advisor",
    "SKILL.md",
  ),
  "utf8",
);
if (!advisor.includes("GRC-OPERATING-MAP.md")) {
  failures.push("canonical ai-program-advisor does not route through the GRC map");
}
if (!/^## GRC trace contract$/m.test(advisor)) {
  failures.push("canonical ai-program-advisor lacks the GRC trace contract");
}

if (failures.length) {
  console.error("AI program verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `AI program verified: ${requiredFiles.length} required documents, ${categories.length} folder-backed categories, ${profileFiles.length} scale profiles, ${normativeBaselines.length} normative baselines, and decision-domain coverage.`,
);
