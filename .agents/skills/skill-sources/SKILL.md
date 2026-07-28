---
user-invocable: false
name: skill-sources
description: Govern approved sources for discovering portable skills and specialized agents without turning dated marketplace claims into policy.
category: skills-browser
used-by-agents: skill-catalog-builder
---

# Capability Source Policy

Use this policy when gathering external skills or specialized agents for the
Phase 05 catalog. Source lists are configuration, not timeless curriculum facts.

## Required source record

Before fetching, create or update a source record with:

- source name and canonical URL
- capability kinds available: skills, agents, or both
- owner and licensing model
- approved retrieval method
- scope or path to inspect
- last verified date and source revision
- client approval status
- known security or provenance concerns

Store time-sensitive observations in `docs/ai-program/watchlist.md` or a dated
decision record. Never put a remembered item count, star count, rate limit, or
vendor claim into an enduring requirement.

## Preferred source order

1. Official provider examples and open standards.
2. Client-owned repositories.
3. Reputable, license-clear open-source repositories.
4. Community indexes used for discovery only.
5. Web marketplaces only with explicit permission and a documented retrieval
   method.

An index is not automatically a distributable source. Follow each entry to its
original repository and verify its license and attribution.

## Retrieval rules

1. Ask before network access when the caller has not already authorized it.
2. Prefer a pinned clone, release archive, or documented API over page scraping.
3. Respect published access limits and robots/access controls.
4. Capture the source revision and retrieval date.
5. Do not execute downloaded scripts while cataloging.
6. Treat missing or conflicting licenses as `review-required`.
7. Preserve original content and provenance; normalize only catalog metadata.
8. Report partial failures instead of silently presenting an incomplete catalog
   as complete.

## Portability claim

A `SKILL.md`-based folder is a useful portable source format, but harness behavior,
metadata extensions, tool permissions, and invocation details can differ. The
canonical copy belongs in `ai/`; `npm run ai:generate` publishes reviewed
interpretations for Claude Code, Cursor, and Codex. Specialized agents require
harness-specific projections even when their underlying instructions are shared.

## Freshness gate

Before each cohort:

1. verify every enabled source URL and license;
2. record its current revision;
3. refresh the catalog;
4. compare the new catalog with the prior one;
5. review additions, removals, and changed content;
6. update the watchlist or create a decision record for material changes.

The catalog UI must compute its counts from current data. Course claims should
describe the process and evidence, not promise a particular marketplace size.
