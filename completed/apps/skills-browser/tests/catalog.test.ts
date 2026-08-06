import assert from "node:assert/strict";
import test from "node:test";
import catalogData from "../data/catalog.json";
import type { Catalog } from "../lib/types";
const catalog = catalogData as Catalog;

test("catalog contains skills, agents, provenance, and exact hashes", () => {
  assert.ok(catalog.capabilities.some((entry) => entry.kind === "skill"));
  assert.ok(catalog.capabilities.some((entry) => entry.kind === "agent"));
  assert.equal(catalog.totalCapabilities, catalog.capabilities.length);
  for (const entry of catalog.capabilities) {
    assert.match(entry.contentHash, /^[a-f0-9]{64}$/);
    assert.ok(entry.sourceRevision.length >= 12);
    assert.ok(entry.files.length >= 1);
  }
});

test("catalog exposes three decisions including a rejection", () => {
  assert.equal(catalog.evaluations.length, 3);
  assert.ok(catalog.evaluations.some((record) => record.decision === "rejected"));
  assert.ok(catalog.sources.length >= 3);
  assert.ok(catalog.demoDiff.failed.length > 0);
});
