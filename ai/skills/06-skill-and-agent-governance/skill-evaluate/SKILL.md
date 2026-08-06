---
name: skill-evaluate
description: Evaluate an exact agent-skill revision for organizational relevance, provenance, security, permissions, trigger precision, collisions, tests, compatibility, context cost, maturity, and appropriate personal/project/enterprise scope. Use before adopting, approving, or updating any external or internal skill.
---

# Skill evaluate

Read `docs/ai-program/02-technology-governance/03-skills-and-specialized-agents/04-evaluation-and-trust.md`, `05-security-and-permissions.md`, `06-triggers-tests-and-context.md`, and `07-provenance-and-versioning.md`.

1. Resolve the exact revision and collect every file without executing scripts.
2. Establish provenance, ownership, license, content hash, dependencies, and supported tools.
3. Inspect instructions and linked resources for permissions, exfiltration, destructive actions, approval bypass, and weakened guardrails.
4. Test positive triggers, negative triggers, collisions, ambiguity, prohibited behavior, and representative outputs in an isolated scope.
5. Assess context cost, maturity, maintenance burden, portability, and organizational fit.
6. Record facts, inferences, uncertainty, and evidence separately.
7. Recommend reject, learn/rebuild, sandbox, approve with changes, or approve as-is; recommend scope, owner, expiration, and re-review triggers.
8. Never publish or approve the skill.

Output: `docs/artifacts/skill-evaluation.md`.
