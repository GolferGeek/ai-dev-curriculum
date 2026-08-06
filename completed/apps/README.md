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
| `twitter-killer` | Phase 01 | Supplied SwiftUI/SwiftData reference; the same intention may be delivered as web |
| `facebook-killer` | Phase 01 | Supplied SwiftUI/SwiftData reference; the same intention may be delivered as web |
| `agent-to-agent` | Phase 04 | Multi-service protocol demonstration |
| `skills-browser` | Phase 05, Parts A and B | Skills catalog and registry |
| `model-eval` | Phase 06 | Next.js evaluation lab |
| `ai-program` | Phase 07 | Next.js, repository-backed Markdown |

## Running a reference

Reference applications are deliberately outside the active root npm workspace
so a learner can build an application with the same package name under
`apps/`. Follow the reference application's own README when present; otherwise
use the corresponding phase [starter kit](../../docs/phases/README.md) and run
order as the authoritative setup guide. Install dependencies from the reference
directory.

Example:

```bash
cd completed/apps/http-workspace
npm install
npm run dev
```

Some references depend on shared packages or local services. Read the
corresponding phase prerequisites before running them. The QuickBooks and
Trello browser suites require the approved SurrealDB setup; model-evaluation
provider paths require approved credentials; native iOS requires macOS/Xcode.

Run `npm run completed:check` from the repository root to perform deterministic,
ordered installs and production builds for every JavaScript reference
application, lint the Next.js references, run the AI Program and Skills Browser
unit suites, and run Playwright smoke tests for the browser references. Run
`npm run completed:ios:check` on a Mac with Xcode to build and test the two
optional native iOS references serially. The A2A shared package
builds before its services. Current upstream security exceptions are recorded
in the
[AI terrain watchlist](../../docs/ai-program/07-program-evolution/01-terrain-and-watchlist/README.md);
these examples are training references, not production templates.
