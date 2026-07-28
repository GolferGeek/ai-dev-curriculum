#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const files = execFileSync("git", ["ls-files", "*.md"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean)
  .filter(
    (file) =>
      file === "README.md" ||
      file === "AGENTS.md" ||
      file === "CLAUDE.md" ||
      file.startsWith("docs/") ||
      file.startsWith("marketing/") ||
      file.startsWith("ai/"),
  );

const failures = [];

for (const file of files) {
  const absolute = path.join(root, file);
  const content = await readFile(absolute, "utf8");
  const withoutFences = content.replace(/```[\s\S]*?```/g, "");
  const targets = [];

  for (const match of withoutFences.matchAll(/!?\[[^\]]*]\(([^)\n]+)\)/g)) {
    targets.push(match[1]);
  }
  for (const match of withoutFences.matchAll(/^\s*\[[^\]]+]:\s*(\S+)/gm)) {
    targets.push(match[1]);
  }

  for (let raw of targets) {
    raw = raw.trim();
    if (raw.startsWith("<")) {
      const end = raw.indexOf(">");
      raw = end >= 0 ? raw.slice(1, end) : raw.slice(1);
    } else {
      raw = raw.split(/\s+["']/)[0];
    }

    if (
      !raw ||
      raw.startsWith("#") ||
      raw.startsWith("/") ||
      /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(raw)
    ) {
      continue;
    }

    const targetWithoutFragment = raw.split("#")[0].split("?")[0];
    if (!targetWithoutFragment) continue;

    let decoded;
    try {
      decoded = decodeURIComponent(targetWithoutFragment);
    } catch {
      failures.push(`${file}: invalid URL encoding in ${raw}`);
      continue;
    }

    const resolved = path.resolve(path.dirname(absolute), decoded);
    if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
      failures.push(`${file}: link escapes repository: ${raw}`);
      continue;
    }

    try {
      await access(resolved);
    } catch {
      failures.push(`${file}: missing target ${raw}`);
    }
  }
}

if (failures.length) {
  console.error(`Markdown link verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Markdown links verified across ${files.length} tracked curriculum files.`,
);
