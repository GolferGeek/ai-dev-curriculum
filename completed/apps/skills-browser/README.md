# Capability Registry reference
This is the completed Phase 05 Parts A and B reference application. It builds a
static, revision-specific catalog from the canonical `ai/` library and presents
skills and specialized agents without turning discovery into approval or
installation.

## What it demonstrates

- canonical skills and agents in one searchable catalog;
- source revision, retrieval date, complete-folder hashes, and original paths;
- function, kind, category, harness, trust, authority, and risk filters;
- full source and supporting-file preview;
- canonical-versus-generated projection status;
- an explicitly labeled run-to-run diff fixture covering added, changed,
  removed, unchanged, and failed outcomes;
- three scope-specific evaluation decisions, including one rejection; and
- copy-with-attribution and source inspection without one-click installation.

The catalog is generated locally from repository content. Generated Claude
Code, Cursor, and Codex files are compatibility snapshots; `ai/` remains the
source of truth.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3400>.

## Verify

```bash
npm run catalog:generate
npm run lint
npm run test:unit
npm run build
npm test
```

## Safety boundary

This browser does not install, publish, approve, or execute a discovered
capability. Evaluation records are training evidence for exact revisions and
scopes. A client assigns its own owners, review authority, approved sources,
permissions, and re-review triggers before organization-wide use.
