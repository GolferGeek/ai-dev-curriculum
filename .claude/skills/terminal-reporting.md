---
name: terminal-reporting
description: How phase-02 agents report progress and results to the user in the terminal. Consistent formatting for scans, fixes, monitors, and reviews.
category: quality
used-by-agents: error-scanner, error-fixer, arch-monitor, arch-hardener, commit-agent, pr-evaluator
---

# Terminal Reporting

All phase-02 agents must keep the user informed with clear, visual progress updates. The user should never wonder "what's happening?" or "how much is left?"

## During work — progress updates

Print periodic updates as you work. Use tables and counts so the user can scan quickly.

**While scanning (error-scanner, arch-monitor):**

```
🔍 Scanning quickbooks-killer...
   ├─ Build:  running...
   ├─ Lint:   waiting
   └─ Tests:  waiting
```

Update as each completes:

```
🔍 Scanning quickbooks-killer...
   ├─ Build:  ✓ clean
   ├─ Lint:   3 errors found
   └─ Tests:  running...
```

**While fixing (error-fixer, arch-hardener):**

Show what agents are working on and their progress:

```
🔧 Fixing quickbooks-killer (round 1 of 3)

   Errors: 12 total → 8 remaining
   ┌──────────────┬───────┬─────────┬───────────┐
   │ Severity     │ Found │ Fixed   │ Remaining │
   ├──────────────┼───────┼─────────┼───────────┤
   │ Critical     │     2 │      2  │         0 │
   │ High         │     5 │      3  │         2 │
   │ Medium       │     4 │      1  │         3 │
   │ Low          │     1 │      0  │         1 │
   └──────────────┴───────┴─────────┴───────────┘

   Working on: [high] Missing auth check in /api/invoices/[id]/route.ts
   Working on: [high] Direct surrealdb import in dashboard/page.tsx
```

Update the table as fixes complete. Show which specific issues are being worked on.

**While monitoring (arch-monitor):**

Show findings as they accumulate:

```
📋 Monitoring quickbooks-killer...

   Files scanned: 23 / 31
   ┌──────────────┬───────┐
   │ Severity     │ Found │
   ├──────────────┼───────┤
   │ High         │     3 │
   │ Medium       │     5 │
   │ Low          │     2 │
   └──────────────┴───────┘

   Latest: [medium] Missing empty state in /expenses/page.tsx
```

**While committing (commit-agent):**

Show each check as it runs:

```
🚀 Pre-commit quality gate

   ┌─────────────────────┬─────────┐
   │ Check               │ Status  │
   ├─────────────────────┼─────────┤
   │ Error scan           │ ✓ pass  │
   │ Architecture monitor │ running │
   │ PR requirements      │ waiting │
   └─────────────────────┴─────────┘
```

**While evaluating PR (pr-evaluator):**

Show progress through the diff:

```
📝 Evaluating PR #42 — "Add invoice detail page"

   Files reviewed: 8 / 12
   ┌──────────────────┬─────────┐
   │ Category         │ Issues  │
   ├──────────────────┼─────────┤
   │ Must fix         │       1 │
   │ Should fix       │       2 │
   │ Suggestions      │       3 │
   └──────────────────┴─────────┘

   Reviewing: src/app/invoices/[id]/page.tsx
```

## After work — final summary

Always end with a clear summary table. This is the most important output — it's what the user screenshots, shares with their team, or acts on next.

**Error scan final:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Error Scan Complete — quickbooks-killer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌──────────────┬───────┐
  │ Severity     │ Count │
  ├──────────────┼───────┤
  │ Critical     │     0 │
  │ High         │     2 │
  │ Medium       │     5 │
  │ Low          │     3 │
  └──────────────┴───────┘

  Total: 10 errors

  High errors:
  1. [test] e2e/auth.spec.ts:23 — Signup test timeout
  2. [build] src/app/api/invoices/route.ts:14 — Type error

  Report: docs/artifacts/error-report.md
  Next step: /fix-errors quickbooks
```

**Fix errors final:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Fix Errors Complete — quickbooks-killer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Rounds: 2 of 3
  ┌──────────────┬───────┬───────┬───────────┐
  │ Severity     │ Found │ Fixed │ Remaining │
  ├──────────────┼───────┼───────┼───────────┤
  │ Critical     │     0 │     0 │         0 │
  │ High         │     2 │     2 │         0 │
  │ Medium       │     5 │     5 │         0 │
  │ Low          │     3 │     2 │         1 │
  └──────────────┴───────┴───────┴───────────┘

  Remaining (low priority):
  1. [lint] Unused import in src/components/Sidebar.tsx

  Report: docs/artifacts/error-report.md
  Next step: /monitor quickbooks
```

**Monitor final:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Architecture Monitor — quickbooks-killer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Files scanned: 31
  ┌──────────────┬───────┐
  │ Severity     │ Found │
  ├──────────────┼───────┤
  │ High         │     2 │
  │ Medium       │     4 │
  │ Low          │     1 │
  └──────────────┴───────┘

  High findings:
  1. [web-architecture] Direct surrealdb import
     src/app/dashboard/page.tsx:3
  2. [data-architecture] Auth not checked before query
     src/app/api/expenses/route.ts:8

  Report: docs/artifacts/monitor-report.md
  Next step: /harden quickbooks
```

**Commit final (pass):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━
  Pre-Commit — PASSED ✓
━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌─────────────────────┬────────┐
  │ Check               │ Result │
  ├─────────────────────┼────────┤
  │ Error scan          │ ✓ pass │
  │ Architecture monitor│ ✓ pass │
  │ PR requirements     │ ✓ pass │
  └─────────────────────┴────────┘

  Ready to commit 8 files.
  Message: "feat: add invoice detail page with mark-as-paid"
  
  Proceed? (approve to commit)
```

**Commit final (blocked):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━
  Pre-Commit — BLOCKED ✗
━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌─────────────────────┬─────────┐
  │ Check               │ Result  │
  ├─────────────────────┼─────────┤
  │ Error scan          │ ✓ pass  │
  │ Architecture monitor│ ✗ 2 high│
  │ PR requirements     │ ✓ pass  │
  └─────────────────────┴─────────┘

  Blocking issues:
  1. Direct surrealdb import in dashboard
  2. Missing auth check in expenses API

  Run /harden quickbooks to fix, then try /commit again.
```

**PR eval final:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PR Review — #42 "Add invoice detail page"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Verdict: REQUEST CHANGES

  ┌──────────────────┬───────┐
  │ Category         │ Count │
  ├──────────────────┼───────┤
  │ Must fix         │     1 │
  │ Should fix       │     2 │
  │ Suggestions      │     3 │
  └──────────────────┴───────┘

  Must fix:
  1. [web-architecture] API route /api/invoices/[id]
     skips auth check — any user can view any invoice.

  New rule added to pr-requirements:
  + "API routes with [id] params must verify the
     resource belongs to the authenticated user."

  Full review: docs/artifacts/pr-review-42.md
```

## Formatting rules

- **Use tables** for any count-based data. They're scannable.
- **Use emoji sparingly** — 🔍 scan, 🔧 fix, 📋 monitor, 🚀 commit, 📝 review. One per section header, not on every line.
- **Always show "Next step"** after scan/monitor commands so the user knows what to do.
- **Always show the report path** so the user can open the full details.
- **Keep progress updates compact** — update in place when possible, don't flood the terminal.
- **Bold the verdict** on commit and PR eval — pass/blocked/approve/request changes should be unmissable.
