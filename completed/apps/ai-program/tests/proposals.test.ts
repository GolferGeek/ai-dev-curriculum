import assert from "node:assert/strict";
import test from "node:test";
import { generateProposal } from "../src/lib/proposals";

test("generates a non-activating review proposal", () => {
  const proposal = generateProposal({
    title: "Assign a program owner",
    resolution: "The AI steering group will nominate an accountable owner.",
    scope: "organization",
    owner: "AI steering group",
    approver: "CTO",
    reviewDate: "2026-09-01",
  });
  assert.match(proposal, /status: proposed/);
  assert.match(proposal, /does not change policy/i);
  assert.match(proposal, /Required approver: CTO/);
  assert.match(proposal, /rollback/i);
});
