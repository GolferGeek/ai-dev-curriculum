#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const program = path.join(root, "docs", "ai-program");

const requiredFiles = [
  "README.md",
  "PROGRAM-CONTRACT.md",
  "COVERAGE-MATRIX.md",
  "HOW-TO-ASK.md",
  "QUERY-ACCEPTANCE.md",
  "CHANGE-AND-FRESHNESS.md",
  "watchlist.md",
  "decisions/README.md",
  "decisions/_template.md",
  "harnesses-and-models/README.md",
  "coding-governance/README.md",
  "skills/README.md",
  "skills/11-functional-organization.md",
  "skills/12-agent-portability.md",
  "agent-systems/README.md",
  "security-and-data/README.md",
  "delivery-and-quality/README.md",
  "adoption-and-measurement/README.md",
  "guardrails/README.md",
];

const facets = [
  "harnesses-and-models/README.md",
  "coding-governance/README.md",
  "agent-systems/README.md",
  "security-and-data/README.md",
  "delivery-and-quality/README.md",
  "adoption-and-measurement/README.md",
];

const handbookFacets = ["skills/README.md", "guardrails/README.md"];

const failures = [];

for (const relative of requiredFiles) {
  const absolute = path.join(program, relative);
  try {
    await access(absolute);
  } catch {
    failures.push(`missing ${path.relative(root, absolute)}`);
  }
}

for (const relative of facets) {
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
  if (!/^## Ask this facet$/m.test(content)) {
    failures.push(`${relative} lacks an agent-query section`);
  }
  if (!/review trigger/i.test(content)) {
    failures.push(`${relative} lacks review triggers`);
  }
}

for (const relative of handbookFacets) {
  const content = await readFile(path.join(program, relative), "utf8");
  if (!/agent|ask|question|query/i.test(content)) {
    failures.push(`${relative} lacks agent-query guidance`);
  }
}

const index = await readFile(path.join(program, "README.md"), "utf8");
for (const relative of facets) {
  const directory = relative.split("/")[0];
  if (!index.includes(`${directory}/README.md`)) {
    failures.push(`README.md does not link ${relative}`);
  }
}

for (const requiredLink of [
  "PROGRAM-CONTRACT.md",
  "COVERAGE-MATRIX.md",
  "HOW-TO-ASK.md",
  "QUERY-ACCEPTANCE.md",
  "CHANGE-AND-FRESHNESS.md",
]) {
  if (!index.includes(requiredLink)) {
    failures.push(`README.md does not link ${requiredLink}`);
  }
}

const coverage = await readFile(path.join(program, "COVERAGE-MATRIX.md"), "utf8");
for (const domain of [
  "Harnesses and interfaces",
  "Models and routing",
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

if (failures.length) {
  console.error("AI program verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `AI program verified: ${requiredFiles.length} required documents, ${facets.length} normative facets, and decision-domain coverage.`,
);
