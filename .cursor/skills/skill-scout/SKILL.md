---
name: skill-scout
description: Scout configured skill sources, refresh a skills catalog, and produce a provenance-aware diff of new, changed, removed, overlapping, or risky candidates. Use for recurring skill discovery and shortlisting; never approve, install, or publish.
---

# Skill scout

Read `docs/ai-program/02-technology-governance/03-skills-and-specialized-agents/03-scouting-and-discovery.md` and its scouting checklist.

1. Confirm approved sources, scope, cadence, and network authority.
2. Snapshot source URLs, revisions, and timestamps.
3. Discover skill folders and supporting files; hash content.
4. Compare with the prior catalog: added, changed, removed, renamed, scripts/permissions changed, overlaps.
5. Deduplicate by provenance and content, preserving forks.
6. Classify initial relevance, category, capability/preference, and apparent maturity. Mark these as triage, not approval.
7. Write a catalog diff with errors, uncertainty, and recommended evaluation queue.
8. Do not copy, install, approve, or execute discovered skills.

Output: `docs/artifacts/skill-scout-report.md`.
