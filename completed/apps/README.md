# Completed reference applications

These are finished reference implementations for the curriculum. They are
available throughout the program for instructor demonstrations, behavioral
comparison, recovery, and post-lab study.

Learner work belongs in [`apps/`](../../apps/README.md).

| Reference | Module | Stack |
|---|---|---|
| `http-workspace` | Phase 00 | Vite, React, Playwright |
| `team-wiki` | Phase 00 | Vite, React, Playwright |
| `pipeline-crm` | Phase 00 | Vite, React, Playwright |
| `ops-pulse` | Phase 00 | Vite, React, Playwright |
| `quickbooks-killer` | Phase 01 | Next.js, SurrealDB |
| `trello-killer` | Phase 01 | Next.js, SurrealDB |
| `twitter-killer` | Phase 01 | SwiftUI, SwiftData |
| `facebook-killer` | Phase 01 | SwiftUI, SwiftData |
| `agent-to-agent` | Phase 04 | Multi-service protocol demonstration |
| `skills-browser` | Phases 05 and 05.5 | Skills catalog and registry |
| `model-eval` | Phase 06 | Next.js evaluation lab |

## Running a reference

Reference applications are deliberately outside the active root npm workspace
so a learner can build an application with the same package name under
`apps/`. Follow the reference application's own README and install its
dependencies from that directory.

Example:

```bash
cd completed/apps/http-workspace
npm install
npm run dev
```

Some references depend on shared packages or local services. Read their README
and the corresponding phase prerequisites before running them.

Run `npm run completed:check` from the repository root to perform deterministic,
ordered installs and production builds for every JavaScript reference
application, lint the Next.js references, and run the four Vite Playwright
smoke tests. The A2A shared package builds before its services. Current upstream
security exceptions are recorded in
[`docs/ai-program/watchlist.md`](../../docs/ai-program/watchlist.md); these
examples are training references, not production templates.
