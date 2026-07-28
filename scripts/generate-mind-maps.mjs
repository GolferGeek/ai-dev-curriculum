#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourcePath = path.join(
  root,
  "docs",
  "mind-maps",
  "source",
  "program-map.json",
);
const outputRoot = path.join(root, "docs", "mind-maps");
const phaseRoot = path.join(outputRoot, "phases");
const check = process.argv.includes("--check");

const data = JSON.parse(await readFile(sourcePath, "utf8"));

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function validateNode(node, trail) {
  if (!node || typeof node.title !== "string" || !node.title.trim()) {
    throw new Error(`Mind-map node lacks a title at ${trail}`);
  }
  if (node.children !== undefined && !Array.isArray(node.children)) {
    throw new Error(`Mind-map children must be an array at ${trail}`);
  }
  for (const [index, child] of (node.children ?? []).entries()) {
    validateNode(child, `${trail}/${index + 1}`);
  }
}

function nodeCount(node) {
  return 1 + (node.children ?? []).reduce((sum, child) => sum + nodeCount(child), 0);
}

function nodeDepth(node) {
  const children = node.children ?? [];
  return children.length
    ? 1 + Math.max(...children.map((child) => nodeDepth(child)))
    : 1;
}

function outline(node, indent = "    ") {
  const note = node.note ? ` _note="${escapeXml(node.note)}"` : "";
  const children = node.children ?? [];
  if (!children.length) {
    return `${indent}<outline text="${escapeXml(node.title)}"${note}/>`;
  }
  return [
    `${indent}<outline text="${escapeXml(node.title)}"${note}>`,
    ...children.map((child) => outline(child, `${indent}  `)),
    `${indent}</outline>`,
  ].join("\n");
}

function opml(map) {
  const ownerEmail = map.ownerEmail
    ? `    <ownerEmail>${escapeXml(map.ownerEmail)}</ownerEmail>`
    : null;
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<opml version="2.0">',
    "  <head>",
    `    <title>${escapeXml(map.title)}</title>`,
    `    <ownerName>${escapeXml(
      map.ownerName ?? "GolferGeek AI Development Curriculum",
    )}</ownerName>`,
    ownerEmail,
    "  </head>",
    "  <body>",
    outline(map, "    "),
    "  </body>",
    "</opml>",
    "",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

const intro = {
  ...data.intro,
  children: data.intro.canvasChildren ?? data.intro.children,
};

const maps = [
  { ...intro, destination: path.join(outputRoot, intro.file) },
  { ...data.master, destination: path.join(outputRoot, data.master.file) },
  ...data.phases.map((map) => ({
    ...map,
    destination: path.join(phaseRoot, map.file),
  })),
];

const filenames = new Set();
for (const map of maps) {
  validateNode(map, map.title);
  const nodes = nodeCount(map);
  const depth = nodeDepth(map);
  const maxNodes = map.compatibility?.maxNodes ?? 100;
  const maxDepth = map.compatibility?.maxDepth ?? 5;
  if (nodes > maxNodes) {
    throw new Error(
      `${map.title} has ${nodes} nodes; MindNode compatibility limit is ${maxNodes}.`,
    );
  }
  if (depth > maxDepth) {
    throw new Error(
      `${map.title} has depth ${depth}; MindNode compatibility limit is ${maxDepth}.`,
    );
  }
  if (filenames.has(map.destination)) {
    throw new Error(`Duplicate mind-map destination: ${map.destination}`);
  }
  filenames.add(map.destination);
}

await mkdir(phaseRoot, { recursive: true });

const stale = [];
for (const map of maps) {
  const expected = opml(map);
  if (check) {
    let actual = "";
    try {
      actual = await readFile(map.destination, "utf8");
    } catch {
      stale.push(path.relative(root, map.destination));
      continue;
    }
    if (actual !== expected) stale.push(path.relative(root, map.destination));
  } else {
    await writeFile(map.destination, expected);
  }
}

if (stale.length) {
  console.error("Mind maps are missing or stale:");
  for (const file of stale) console.error(`- ${file}`);
  process.exit(1);
}

console.log(
  check
    ? `Mind maps match source: ${maps.length} OPML files.`
    : `Generated ${maps.length} MindNode-compatible OPML files.`,
);
