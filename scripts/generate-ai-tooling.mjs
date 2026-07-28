#!/usr/bin/env node

import { constants } from "node:fs";
import {
  access,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const canonicalRoot = path.join(root, "ai");
const canonicalSkills = path.join(canonicalRoot, "skills");
const canonicalAgents = path.join(canonicalRoot, "agents");

const skillTargets = [
  path.join(root, ".claude", "skills"),
  path.join(root, ".cursor", "skills"),
  path.join(root, ".agents", "skills"),
];

const agentTargets = {
  claude: path.join(root, ".claude", "agents"),
  cursor: path.join(root, ".cursor", "agents"),
  codex: path.join(root, ".codex", "agents"),
};

const bootstrap = process.argv.includes("--bootstrap-from-claude");
const checkOnly = process.argv.includes("--check");
const organize = process.argv.includes("--organize");

async function exists(target) {
  try {
    await access(target, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function filesUnder(directory) {
  if (!(await exists(directory))) return [];
  const files = [];

  async function visit(current, relative = "") {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = path.join(current, entry.name);
      const childRelative = path.join(relative, entry.name);
      if (entry.isDirectory()) {
        await visit(absolute, childRelative);
      } else if (entry.isFile()) {
        files.push(childRelative);
      }
    }
  }

  await visit(directory);
  return files;
}

async function directoriesContaining(directory, marker) {
  if (!(await exists(directory))) return [];
  const directories = [];

  async function visit(current) {
    const entries = await readdir(current, { withFileTypes: true });
    if (entries.some((entry) => entry.isFile() && entry.name === marker)) {
      directories.push(current);
      return;
    }
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.isDirectory()) await visit(path.join(current, entry.name));
    }
  }

  await visit(directory);
  return directories;
}

async function functionManifest() {
  return JSON.parse(
    await readFile(path.join(canonicalRoot, "functions.json"), "utf8"),
  );
}

async function organizeCanonicalSource() {
  const manifest = await functionManifest();
  for (const [category, definition] of Object.entries(manifest)) {
    for (const [type, names] of [
      ["skills", definition.skills],
      ["agents", definition.agents],
    ]) {
      const typeRoot = path.join(canonicalRoot, type);
      const categoryRoot = path.join(typeRoot, category);
      await mkdir(categoryRoot, { recursive: true });
      for (const name of names) {
        const flat = path.join(typeRoot, name);
        const destination = path.join(categoryRoot, name);
        if (await exists(flat)) {
          if (await exists(destination)) {
            throw new Error(`Both flat and categorized sources exist for ${type}/${name}`);
          }
          await rename(flat, destination);
        }
      }
    }
  }
}

function parseClaudeAgent(source, filename) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Invalid Claude agent frontmatter: ${filename}`);

  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    fields[key] = value.replace(/^(['"])([\s\S]*)\1$/, "$2");
  }

  if (!fields.name || !fields.description) {
    throw new Error(`Agent requires name and description: ${filename}`);
  }

  const required = fields["mandatory-skills"]
    ? fields["mandatory-skills"].split(",").map((value) => value.trim()).filter(Boolean)
    : [];
  const optional = fields["optional-skills"]
    ? fields["optional-skills"].split(",").map((value) => value.trim()).filter(Boolean)
    : [];
  const tools = fields.tools
    ? fields.tools.split(",").map((value) => value.trim()).filter(Boolean)
    : [];
  const readOnly = tools.length > 0 && !tools.includes("Write") && !tools.includes("Edit");

  return {
    body: match[2].trimEnd() + "\n",
    metadata: {
      name: fields.name,
      description: fields.description,
      skills: { required, optional },
      overlays: {
        claude: { tools },
        cursor: readOnly ? { readonly: true } : {},
        codex: readOnly ? { sandbox_mode: "read-only" } : {},
      },
    },
  };
}

async function bootstrapCanonicalSource() {
  if ((await exists(canonicalSkills)) || (await exists(canonicalAgents))) {
    throw new Error("Refusing to bootstrap because canonical skills or agents already exist.");
  }

  const sourceSkills = path.join(root, ".claude", "skills");
  const sourceAgents = path.join(root, ".claude", "agents");
  await mkdir(canonicalRoot, { recursive: true });
  await cp(sourceSkills, canonicalSkills, { recursive: true });
  await mkdir(canonicalAgents, { recursive: true });

  const agentFiles = (await readdir(sourceAgents))
    .filter((name) => name.endsWith(".md"))
    .sort();

  for (const filename of agentFiles) {
    const source = await readFile(path.join(sourceAgents, filename), "utf8");
    const { body, metadata } = parseClaudeAgent(source, filename);
    const destination = path.join(canonicalAgents, metadata.name);
    await mkdir(destination, { recursive: true });
    await writeFile(path.join(destination, "AGENT.md"), body);
    await writeFile(
      path.join(destination, "agent.json"),
      JSON.stringify(metadata, null, 2) + "\n",
    );
  }
}

function yamlScalar(value) {
  return JSON.stringify(value);
}

function claudeAgent(metadata, body) {
  const lines = [
    "---",
    `name: ${metadata.name}`,
    `description: ${yamlScalar(metadata.description)}`,
  ];

  const tools = metadata.overlays?.claude?.tools ?? [];
  if (tools.length) lines.push(`tools: ${tools.join(", ")}`);
  if (metadata.skills?.required?.length) {
    lines.push(`mandatory-skills: ${metadata.skills.required.join(", ")}`);
  }
  if (metadata.skills?.optional?.length) {
    lines.push(`optional-skills: ${metadata.skills.optional.join(", ")}`);
  }
  lines.push("---", "", body.trimEnd(), "");
  return lines.join("\n");
}

function cursorAgent(metadata, body) {
  const lines = [
    "---",
    `name: ${metadata.name}`,
    `description: ${yamlScalar(metadata.description)}`,
  ];
  const overlay = metadata.overlays?.cursor ?? {};
  if (overlay.model) lines.push(`model: ${overlay.model}`);
  if (overlay.readonly === true) lines.push("readonly: true");
  if (overlay.is_background === true) lines.push("is_background: true");
  lines.push("---", "", body.trimEnd(), "");
  return lines.join("\n");
}

function codexAgent(metadata, body) {
  const overlay = metadata.overlays?.codex ?? {};
  const lines = [
    `name = ${JSON.stringify(metadata.name)}`,
    `description = ${JSON.stringify(metadata.description)}`,
    `developer_instructions = ${JSON.stringify(body.trim())}`,
  ];
  if (overlay.model) lines.push(`model = ${JSON.stringify(overlay.model)}`);
  if (overlay.model_reasoning_effort) {
    lines.push(
      `model_reasoning_effort = ${JSON.stringify(overlay.model_reasoning_effort)}`,
    );
  }
  if (overlay.sandbox_mode) {
    lines.push(`sandbox_mode = ${JSON.stringify(overlay.sandbox_mode)}`);
  }
  lines.push("");
  return lines.join("\n");
}

async function buildProjection(destinationRoot) {
  const skillDirectories = await directoriesContaining(canonicalSkills, "SKILL.md");
  const skillNames = new Set();
  for (const target of skillTargets) {
    const destination = path.join(destinationRoot, path.relative(root, target));
    await mkdir(destination, { recursive: true });
    for (const source of skillDirectories) {
      const name = path.basename(source);
      if (target === skillTargets[0] && skillNames.has(name)) {
        throw new Error(`Duplicate canonical skill name: ${name}`);
      }
      skillNames.add(name);
      await cp(source, path.join(destination, name), { recursive: true });
    }
    await writeFile(
      path.join(destination, ".generated.json"),
      JSON.stringify({ source: "ai/skills", generated: true }, null, 2) + "\n",
    );
  }

  for (const [harness, target] of Object.entries(agentTargets)) {
    const destination = path.join(destinationRoot, path.relative(root, target));
    await mkdir(destination, { recursive: true });
    await writeFile(
      path.join(destination, ".generated.json"),
      JSON.stringify({ source: "ai/agents", generated: true }, null, 2) + "\n",
    );

    const directories = await directoriesContaining(canonicalAgents, "agent.json");
    const names = new Set();

    for (const directory of directories) {
      const name = path.basename(directory);
      if (names.has(name)) throw new Error(`Duplicate canonical agent name: ${name}`);
      names.add(name);
      const metadata = JSON.parse(await readFile(path.join(directory, "agent.json"), "utf8"));
      const body = await readFile(path.join(directory, "AGENT.md"), "utf8");
      if (metadata.name !== name) {
        throw new Error(`Agent directory/name mismatch: ${name}/${metadata.name}`);
      }

      const extension = harness === "codex" ? "toml" : "md";
      const output =
        harness === "claude"
          ? claudeAgent(metadata, body)
          : harness === "cursor"
            ? cursorAgent(metadata, body)
            : codexAgent(metadata, body);
      await writeFile(path.join(destination, `${name}.${extension}`), output);
    }
  }
}

async function compareDirectories(expected, actual) {
  const expectedFiles = await filesUnder(expected);
  const actualFiles = await filesUnder(actual);
  const expectedSet = new Set(expectedFiles);
  const actualSet = new Set(actualFiles);
  const failures = [];

  for (const file of expectedFiles) {
    if (!actualSet.has(file)) {
      failures.push(`missing ${path.relative(root, path.join(actual, file))}`);
      continue;
    }
    const [left, right] = await Promise.all([
      readFile(path.join(expected, file)),
      readFile(path.join(actual, file)),
    ]);
    if (!left.equals(right)) {
      failures.push(`drift ${path.relative(root, path.join(actual, file))}`);
    }
  }

  for (const file of actualFiles) {
    if (!expectedSet.has(file)) {
      failures.push(`stale ${path.relative(root, path.join(actual, file))}`);
    }
  }
  return failures;
}

async function validateCanonical() {
  if (!(await exists(canonicalSkills)) || !(await exists(canonicalAgents))) {
    throw new Error(
      "Canonical ai/skills and ai/agents are required. Run with --bootstrap-from-claude once.",
    );
  }

  const manifest = await functionManifest();
  const expectedSkills = new Map();
  const expectedAgents = new Map();
  for (const [category, definition] of Object.entries(manifest)) {
    for (const name of definition.skills) {
      if (expectedSkills.has(name)) throw new Error(`Skill appears twice in functions.json: ${name}`);
      expectedSkills.set(name, category);
    }
    for (const name of definition.agents) {
      if (expectedAgents.has(name)) throw new Error(`Agent appears twice in functions.json: ${name}`);
      expectedAgents.set(name, category);
    }
  }

  const skillDirectories = await directoriesContaining(canonicalSkills, "SKILL.md");
  const actualSkills = new Map();
  for (const directory of skillDirectories) {
    const name = path.basename(directory);
    const category = path.relative(canonicalSkills, directory).split(path.sep)[0];
    actualSkills.set(name, category);
  }
  const agentDirectories = await directoriesContaining(canonicalAgents, "agent.json");
  const actualAgents = new Map();
  for (const directory of agentDirectories) {
    const name = path.basename(directory);
    const category = path.relative(canonicalAgents, directory).split(path.sep)[0];
    actualAgents.set(name, category);
  }

  for (const [name, category] of expectedSkills) {
    if (actualSkills.get(name) !== category) {
      throw new Error(`Skill ${name} must live under ai/skills/${category}/`);
    }
  }
  for (const [name, category] of expectedAgents) {
    if (actualAgents.get(name) !== category) {
      throw new Error(`Agent ${name} must live under ai/agents/${category}/`);
    }
  }
  for (const name of actualSkills.keys()) {
    if (!expectedSkills.has(name)) throw new Error(`Unclassified canonical skill: ${name}`);
  }
  for (const name of actualAgents.keys()) {
    if (!expectedAgents.has(name)) throw new Error(`Unclassified canonical agent: ${name}`);
  }
}

async function main() {
  if (bootstrap) await bootstrapCanonicalSource();
  if (organize) await organizeCanonicalSource();
  await validateCanonical();

  if (checkOnly) {
    const temporary = await mkdtemp(path.join(tmpdir(), "ai-tooling-projection-"));
    try {
      await buildProjection(temporary);
      const failures = [];
      for (const target of [...skillTargets, ...Object.values(agentTargets)]) {
        const expected = path.join(temporary, path.relative(root, target));
        failures.push(...(await compareDirectories(expected, target)));
      }
      if (failures.length) {
        for (const failure of failures) console.error(failure);
        process.exitCode = 1;
      } else {
        console.log("AI tooling projections match canonical sources.");
      }
    } finally {
      await rm(temporary, { recursive: true, force: true });
    }
    return;
  }

  for (const target of [...skillTargets, ...Object.values(agentTargets)]) {
    await rm(target, { recursive: true, force: true });
  }
  await buildProjection(root);
  console.log("Generated Claude Code, Cursor, and Codex skills and agents.");
}

await main();
