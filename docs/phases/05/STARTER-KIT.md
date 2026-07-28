# Starter kit — Phase 05

## Product model

The locator should model these concepts explicitly:

- **Source:** repository, marketplace, local library, or approved internal
  endpoint.
- **Source snapshot:** source revision, retrieval time, license signal, fetch
  result, and content hash.
- **Capability:** stable identity, display name, kind (`skill` or `agent`),
  description, and functional group.
- **Revision:** exact content and files discovered in one snapshot.
- **Projection:** native Claude Code, Cursor, or Codex representation, when
  present.
- **Evaluation:** reviewer, rubric version, evidence, decision, scope,
  restrictions, and re-review trigger.

Do not collapse capability and revision into one record. A familiar name can
point to changed instructions.

## Catalog fields

At minimum capture:

- source URL or local path;
- commit/tag/hash and retrieval timestamp;
- full file inventory and per-file hashes;
- capability kind and functional group;
- description and trigger language;
- bundled scripts, references, and assets;
- requested tools, commands, network, secrets, and write authority;
- dependencies and supported harnesses;
- estimated context cost;
- maturity and maintenance signals;
- trust state, recommended scope, owner, and review trigger.

## Required views

1. **Sources and runs** — freshness, errors, revision, and run-to-run diff.
2. **Catalog** — search, facets, saved filters, and clear result counts.
3. **Capability detail** — full files, provenance, revision, projection
   variants, and warnings.
4. **Compare** — field and content differences between candidates or revisions.
5. **Evaluation** — evidence rubric, sandbox results, recommendation, and
   dissenting notes.

## Suggested implementation roles

- Source scout discovers candidate locations but does not install.
- Catalog builder fetches, snapshots, parses, normalizes, and records failures.
- Browser builder implements the product surfaces.
- Evaluator applies the rubric to an exact revision.
- Security reviewer inspects scripts, authority, and data movement.

Agents may gather evidence; a designated human owns the adoption decision.

## Test fixtures

Include:

- a valid skill folder with supporting files;
- a valid agent definition;
- malformed frontmatter;
- duplicate names from different sources;
- a changed revision with the same name;
- an instruction that requests risky command or network authority; and
- a large resource set to test context and preview behavior.

The reference application is in `completed/apps/skills-browser/`. Use it only
when the instructor opens the comparison or when recovery is necessary.
