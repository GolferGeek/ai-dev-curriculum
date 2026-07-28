---
description: Whole-repo orientation — what is this codebase, what does it do, how is it organized.
---

# /ingest

**Input:** None (analyzes current repo). Optional path to focus on a subdirectory.
**Output:** Orientation report at `docs/artifacts/ingest-report.md`.

When the user runs this command:

1. Invoke the **repo-researcher** agent with task "orient".
   - With a path argument → focus orientation on that subdirectory while still noting its place in the larger repo.
   - Without argument → orient on the entire repository.

2. The agent reads the directory tree, READMEs, config files, and entry points. It does **not** modify anything — it only reports.

3. The report covers:
   - **Identity** — what is this project, what problem does it solve
   - **Tech stack** — languages, frameworks, runtimes, key dependencies
   - **Directory structure** — annotated tree with purpose of each top-level directory
   - **Apps / services list** — what each app does, its status, its stack
   - **Shared packages** — libraries, utilities, shared configs
   - **Config / build system** — monorepo tooling, CI, environment setup
   - **Naming conventions** — file naming, export patterns, variable style

4. Write the report to `docs/artifacts/ingest-report.md`.

5. Tell the user:
   - A one-paragraph summary of what this codebase is
   - The path to the full report
   - Suggest `/map` next to trace data flow and API surfaces

## Example usage

```
/ingest                         # orient on the entire repo
/ingest apps/quickbooks-killer  # focus on the QuickBooks killer app
```

Arguments: `$ARGUMENTS` — optional path to a subdirectory.
