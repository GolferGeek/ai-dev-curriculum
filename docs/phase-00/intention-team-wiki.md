# Intention — Team wiki / runbook hub (Track B)

## Why this exists

Knowledge lives in Slack threads, private notes, and heads. A **lightweight wiki** with **markdown**, **simple structure**, and **search** gives teams a **single place** for how things work: runbooks, decisions, links, and “how we deploy X”—without pretending to be a full enterprise CMS on day one.

## Who it’s for

Engineering and ops people who need **fast capture**, **readable pages**, and **discovery** (search + browse) more than heavy permissions modeling in v1.

## What “good” looks like

- **Spaces or folders** (or top-level sections) so content doesn’t become one flat list.
- **Markdown pages** with preview; create / edit / delete with a **sensible default** (e.g. last-edited metadata).
- **Search** across titles and body (client-side or simple index is fine for v1).
- **Navigation** that doesn’t get lost after ten pages—sidebar or tree, your call in the PRD.

## Out of scope for the first version

- Fine-grained ACLs and compliance workflows; stub **roles** only if needed for learning, not production IAM.

## Success

A teammate can **find** last week’s runbook in **under a minute** and **edit** without breaking the layout—feels like a tool you’d actually open during an incident.
