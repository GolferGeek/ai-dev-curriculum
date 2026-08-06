# Implementation plan — AI Program Governance & GRC application
## Inputs

- [Intention](intention-ai-governance-grc-app.md)
- [PRD](prd-ai-governance-grc-app.md)
- [Canonical program map](../ai-program/PROGRAM-MAP.md)

## Milestones

### 1. Repository-backed program reader

- **Owner:** Next.js application builder
- **Build:** Markdown/frontmatter reader, folder hierarchy, document routing,
  breadcrumbs, relative source mapping, and deterministic program snapshot.
- **Files:** `completed/apps/ai-program/src/lib/`, App Router pages, shared types.
- **Goals:** 1, 2, 6.
- **Verify:** unit tests plus a production build against the real
  `docs/ai-program/` tree.

### 2. Program interface and navigation

- **Owner:** Next.js application builder
- **Build:** responsive application shell, folder-derived left navigation,
  eight-category overview, status metadata, category cards, findings, empty
  states, loading state, and error boundaries.
- **Files:** `completed/apps/ai-program/app/`, `src/components/`, styles.
- **Goals:** 1, 2, 6.
- **Verify:** Playwright navigation flow at desktop and narrow viewport.

### 3. Program advisor and trace

- **Owner:** Next.js application builder
- **Build:** deterministic question classifier and evidence retriever, qualified
  response contract, citations, canonical suggested questions, trace view, and
  explicit draft/missing-link states.
- **Files:** `src/lib/advisor.ts`, advisor UI, API route, trace page.
- **Goals:** 3, 4.
- **Verify:** advisor/trace unit tests and Playwright flows.

### 4. Reviewable proposal workspace

- **Owner:** Next.js application builder
- **Build:** finding selection, resolution input, Markdown proposal generation,
  copy/download-friendly output, and non-activation warning.
- **Files:** proposal page and `src/lib/proposals.ts`.
- **Goals:** 5.
- **Verify:** proposal unit test and browser flow; confirm source tree remains
  unchanged.

### 5. Reference packaging and verification

- **Owner:** quality gate
- **Build:** local README, scripts, ESLint, TypeScript, Playwright configuration,
  and completed-app index/check integration.
- **Files:** app configuration, e2e tests, `completed/apps/README.md`, completed
  app verifier.
- **Goals:** 6 and all success criteria.
- **Verify:** install, lint, unit, e2e, and production build.

### 6. Phase 07 curriculum package

- **Owner:** curriculum author
- **Build:** complete ten-document phase package plus a full Day 5 lesson plan
  that teaches adaptation, health review, traceability, qualified questioning,
  proposal preparation, and one safe program change.
- **Files:** `docs/phases/07/`, `marketing/lesson-plans/phase-07.md`, curriculum
  navigation and instructor guidance.
- **Goals:** product adoption and take-home delivery.
- **Verify:** curriculum structure, links, MkDocs strict build, and cross-file
  command/path review.

### 7. Eight-phase reconciliation

- **Owner:** curriculum author
- **Build:** present eight primary phases `00`–`07`; consistently label existing
  `05.5` material as Phase 05 Part B rather than a ninth phase; update syllabus,
  maps, readiness, lesson indexes, and verification scripts.
- **Files:** root/docs/marketing indexes, Phase 05/05.5 references, mind-map
  source and generated projections.
- **Goals:** coherent course architecture.
- **Verify:** repository search finds no contradictory module counts or “no new
  phase” Day 5 language; mind-map generation is clean.

## Risks and mitigations

- **A polished UI may overstate authority.** Every page surfaces status, owner,
  approval, freshness, and the course-baseline warning.
- **The filesystem and UI may drift.** Navigation and metrics are generated
  directly from the folder tree; tests use the real tree.
- **Markdown links may not map cleanly into routes.** Preserve repository source
  citations and validate relative links independently.
- **Current content is intentionally incomplete.** Treat missing owners,
  approvals, and evidence as first-class findings, not seed fake approvals.
- **A deterministic advisor may be mistaken for general AI.** Describe it as a
  bounded program advisor and preserve an explicit future adapter boundary.
- **Phase 05.5 links may break if physically moved.** Retain the directory and
  reclassify it semantically as Phase 05 Part B.
- **Reference-app dependencies expand verification time.** Keep the app
  standalone and add it to the ordered completed-app check.

## Verification

Application:

```bash
cd completed/apps/ai-program
npm ci
npm run lint
npm run test:unit
npm run build
npm test
```

Repository:

```bash
./scripts/verify-curriculum-structure.sh
npm run ai:generate
npm run ai:check
npm run ai:program:check
npm run docs:links
npm run mindmaps:generate
npm run mindmaps:check
npm run build
npm test
npm run completed:check
```

Documentation:

```bash
python -m venv .tmp/mkdocs-venv
.tmp/mkdocs-venv/bin/pip install -r docs/requirements.txt
.tmp/mkdocs-venv/bin/mkdocs build --strict
```

## Alignment result

Every PRD goal is delivered by at least one milestone; no milestone adds an
authority, compliance claim, database, authentication system, or external
integration outside the approved intention. The order protects the source
model first, then builds views and workflows on that model, and only then
changes the curriculum contract.
