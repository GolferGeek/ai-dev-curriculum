import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { parseFrontmatter, loadProgramSnapshot, resolveMarkdownRoute } from "../src/lib/program";

const COMPLETE_FRONTMATTER = `---
status: draft
owner: UNASSIGNED
backup-owner: Backup
approved-by: UNASSIGNED
last-reviewed: 2026-08-01
next-review: 2026-09-01
applies-to: organization
evidence: []
supersedes: none
---
`;

test("parses scalar and list frontmatter", () => {
  const result = parseFrontmatter(`---\nstatus: draft\nevidence:\n  - test.md\n  - run.json\n---\n# Body`);
  assert.equal(result.metadata.status, "draft");
  assert.deepEqual(result.metadata.evidence, ["test.md", "run.json"]);
  assert.equal(result.body, "# Body");
});

test("derives folder hierarchy and deterministic findings", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "ai-program-test-"));
  const profile = {
    id: "full",
    label: "Full",
    description: "Test profile",
    audience: "Tests",
    limitations: "Not policy",
    includedFolders: ["*"],
    includedDocuments: ["*"],
    expansionTriggers: [],
  };
  for (const [filename, id, label] of [
    ["PROFILE-FULL.json", "full", "Full"],
    ["PROFILE-ESSENTIAL.json", "essential", "Essential"],
    ["PROFILE-LIGHT.json", "light", "Light"],
  ]) {
    fs.writeFileSync(path.join(root, filename), JSON.stringify({ ...profile, id, label }));
  }
  fs.writeFileSync(path.join(root, "README.md"), `${COMPLETE_FRONTMATTER}\n# Program`);
  const category = path.join(root, "01-direction");
  fs.mkdirSync(category);
  fs.writeFileSync(path.join(category, "README.md"), `${COMPLETE_FRONTMATTER}\n# Direction\n[Missing](missing.md)`);

  const snapshot = loadProgramSnapshot({ root, today: "2026-08-06" });
  assert.equal(snapshot.root.children[0].title, "Direction");
  assert.equal(snapshot.stats.folderCount, 2);
  assert.equal(snapshot.categories.length, 1);
  assert.ok(snapshot.findings.some((finding) => finding.kind === "unassigned-owner"));
  assert.ok(snapshot.findings.some((finding) => finding.kind === "broken-reference"));
  assert.equal(snapshot.categories[0].state, "blocked");
  fs.rmSync(root, { recursive: true, force: true });
});

test("maps Markdown references into application routes", () => {
  assert.equal(
    resolveMarkdownRoute("01-direction/README.md", "../PROGRAM-CONTRACT.md#answer-contract"),
    "/document/PROGRAM-CONTRACT#answer-contract",
  );
  assert.equal(resolveMarkdownRoute("README.md", "01-direction/README.md"), "/program/01-direction");
});
