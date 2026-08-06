import assert from "node:assert/strict";
import test from "node:test";
import { answerQuestion, classifyQuestion } from "../src/lib/advisor";
import { loadProgramSnapshot } from "../src/lib/program";

test("classifies the canonical health questions", () => {
  assert.equal(classifyQuestion("How is our governance?"), "health");
  assert.equal(classifyQuestion("What are we lacking?"), "missing");
  assert.equal(classifyQuestion("What's changing?"), "change");
  assert.equal(classifyQuestion("What's old?"), "stale");
  assert.equal(classifyQuestion("What's wrong?"), "wrong");
  assert.equal(classifyQuestion("How is our AI culture?"), "culture");
  assert.equal(classifyQuestion("Can we use the light profile?"), "profile");
});

test("answers culture questions without turning sentiment into surveillance", () => {
  const answer = answerQuestion("What does our AI culture and sentiment show?", loadProgramSnapshot({ today: "2026-08-06" }));
  assert.equal(answer.intent, "culture");
  assert.match(answer.answer, /silent employee monitoring/i);
  assert.ok(answer.citations.some((item) => item.sourcePath.includes("sentiment-listening-and-privacy")));
});

test("profiles filter navigation, findings, and advisor scope", () => {
  const full = loadProgramSnapshot({ today: "2026-08-06", profile: "full" });
  const light = loadProgramSnapshot({ today: "2026-08-06", profile: "light" });
  assert.equal(light.profile.id, "light");
  assert.ok(light.stats.folderCount < full.stats.folderCount);
  assert.ok(light.stats.blockerCount < full.stats.blockerCount);
  assert.equal(answerQuestion("Which profile is active?", light).intent, "profile");
  assert.ok(light.documents.every((document) => !document.sourcePath.includes("05-capability-lifecycle")));
});

test("answers from the real program with qualification and citations", () => {
  const answer = answerQuestion("What are we lacking?", loadProgramSnapshot({ today: "2026-08-06" }));
  assert.equal(answer.intent, "missing");
  assert.match(answer.uncertainty, /not permission/i);
  assert.match(answer.nextAction, /Direction and Governance/i);
  assert.ok(answer.citations.length >= 2);
  assert.ok(answer.relatedFindings.length > 0);
});
