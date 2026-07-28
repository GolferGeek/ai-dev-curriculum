# Intention — Team wiki / runbook hub (Track B)

## Why this exists

Knowledge lives in Slack threads, private notes, and heads. A **lightweight wiki** with **markdown**, **simple structure**, and **search** gives teams a **single place** for how things work: runbooks, decisions, links, and “how we deploy X”—without pretending to be a full enterprise CMS on day one.

This track should **feel like a tiny Notion/Confluence slice**: structure, editing, and findability—not a green gradient with the word “Spaces” on it.

## Who it’s for

Engineering and ops people who need **fast capture**, **readable pages**, and **discovery** (search + browse) more than heavy permissions modeling in v1.

## Demo-grade minimums (non-negotiable for “done”)

Ship **browse + read + write + search** as **real interactions**, not copy on a single screen.

1. **Structure** — **At least two spaces or folders** (or top-level sections), each holding **multiple pages**. A **tree or sidebar** shows hierarchy; clicking navigates.
2. **Pages** — **Markdown** with **edit mode** and **rendered preview** (split view, or tab toggle—your call). Create, **edit**, and **delete** a page; show **title** and **last updated** (can be client-side clock on save).
3. **Search** — Query **filters the page list** by title and/or body (client-side index is fine). Empty state when no matches.
4. **Persistence** — All content survives refresh (**`localStorage`**, IndexedDB, or file API—pick one; document it in the app README or in-repo note).
5. **One “runbook” path** — From open app, user can reach a **specific runbook page** in **≤ 3 clicks** (proves navigation isn’t decorative).

## What “great” adds (when time allows)

- Wikilinks between pages `[[]]` or simple `[[Page name]]` resolution.
- Syntax-highlighted code blocks in preview.
- Export page as Markdown file.

## Out of scope for the first version

- Fine-grained ACLs and compliance workflows; stub **roles** only if needed for learning, not production IAM.

## Success

A teammate can **find** a page via search, **edit** it, refresh, and **still see their changes**—the tool feels **usable during an incident**, not like a concept mock.

## How this feeds PRD → plan → app

This file is the **product intention** before **`/prd`**. The PRD should map each **Demo-grade minimum** to requirements (including **two spaces with multiple pages each**, **CRUD**, **search**, **persistence**). The plan should sketch **navigation** (sidebar/tree + content area), **page model** (id, title, markdown body, space id, updatedAt), **seed pages** for the ≤3-click runbook path, and **where data lives** (`localStorage` etc.). If scope is tight, cut “great” features—not the minimums in this file or [DEMO-GRADE-BAR.md](./DEMO-GRADE-BAR.md).
