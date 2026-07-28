# GitHub Actions + Claude Code agents

*Run the same skills you use in the terminal — `/nightly-hygiene`, `/scan-errors`, `@claude` — on GitHub's runners.*

**This is real, not theoretical.** Anthropic ships an official action: [`anthropics/claude-code-action@v1`](https://github.com/anthropics/claude-code-action). It runs Claude Code headless, loads skills from `.claude/skills/`, and supports **cron schedules**.

Docs: [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions)

---

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│  GitHub (your repo)                                         │
│  .claude/skills/  CLAUDE.md  docs/ai-program/guardrails/   │
└───────────────────────────┬─────────────────────────────────┘
                            │ checkout
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  ubuntu-latest runner                                       │
│  Tier 1: npm run build · lint · test  (no API key)          │
│  Tier 2: anthropics/claude-code-action@v1                   │
│          prompt: "/nightly-hygiene"                         │
└───────────────────────────┬─────────────────────────────────┘
                            │ maintenance/* branch + PR
                            ▼
                     Human review → merge main
```

**CI is the common denominator** — Cursor, Claude Code, and Codex on laptops differ; Actions + committed skills do not.

---

## Authentication (pick one)

| Method | Secret / config | Best for |
|--------|-----------------|----------|
| **API key** | `ANTHROPIC_API_KEY` in repository secrets | Teams with Anthropic API billing |
| **OAuth token** | `CLAUDE_CODE_OAUTH_TOKEN` (`claude setup-token`) | Pro/Max subscribers |
| **GitHub App** | Install [Claude app](https://github.com/apps/claude) + API key | Interactive `@claude` on PRs/issues |
| **Workload Identity Federation** | `anthropic_federation_rule_id` + service account IDs | No long-lived API key in GitHub |

Setup: `/install-github-app` in Claude Code terminal **or** [manual setup guide](https://github.com/anthropics/claude-code-action/blob/main/docs/setup.md).

**Never** commit keys. Use `${{ secrets.ANTHROPIC_API_KEY }}` only.

---

## Invoking skills in Actions

From [official docs](https://code.claude.com/docs/en/github-actions#using-skills):

> The `prompt` input accepts a skill invocation as well as plain text. For a skill in your repository's `.claude/skills/` directory, run `actions/checkout` before the action step and pass `/skill-name`.

**This curriculum:**

| Skill | Local | In Actions (`prompt:`) |
|-------|-------|------------------------|
| Full hygiene chain | `/nightly-hygiene` | `"/nightly-hygiene"` |
| Scan only | `/scan-errors` | `"/scan-errors"` or `"/scan-errors quickbooks"` |
| PR review (custom prompt) | — | Plain-text prompt + `gh pr` tools |

Example from this repo — [`nightly-hygiene-tier2.yml`](../../.github/workflows/nightly-hygiene-tier2.yml):

```yaml
- uses: actions/checkout@v7

- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    prompt: "/nightly-hygiene"
    claude_args: |
      --max-turns 30
      --model claude-sonnet-4-20250514
      --allowedTools "Read,Write,Edit,Bash(npm:*),Bash(gh:*),Bash(git:*),Bash(./scripts/*)"
      --append-system-prompt "Follow CLAUDE.md and .claude/skills/. Never push to main. Open a maintenance/* PR only."
```

**Required permissions** on the job:

```yaml
permissions:
  contents: write
  pull-requests: write
  id-token: write
```

---

## Tier 1 — mechanical cron (no agent)

File: [`.github/workflows/nightly-hygiene-tier1.yml`](../../.github/workflows/nightly-hygiene-tier1.yml)

| Trigger | `schedule` weekdays + `workflow_dispatch` |
| Runs | `./scripts/verify-curriculum-structure.sh`, `npm run build`, `npm test` |
| Permissions | `contents: read` |

**Pass criteria:** green for two weeks (or documented manual runs) before Tier 2.

---

## Tier 2 — agent hygiene PR

File: [`.github/workflows/nightly-hygiene-tier2.yml`](../../.github/workflows/nightly-hygiene-tier2.yml)

1. Checkout repo (skills + agents on disk)
2. Mechanical pre-check (same as Tier 1)
3. `claude-code-action` with `prompt: "/nightly-hygiene"`
4. Skill creates `maintenance/YYYY-MM-DD-nightly` branch + PR (see [`.claude/skills/nightly-hygiene/SKILL.md`](../../.claude/skills/nightly-hygiene/SKILL.md))

**Until `ANTHROPIC_API_KEY` is set:** use **workflow_dispatch** only (manual “Run workflow”). Uncomment or enable the `schedule` block after secrets + kit 05 boundaries are signed off.

PR body must include (template: [`.github/pull_request_template/hygiene.md`](../../.github/pull_request_template/hygiene.md)):

1. Scan / monitor summary (`docs/artifacts/`)
2. What changed
3. Proof — CI green on the branch
4. Human comprehension checklist

---

## Interactive `@claude` (PRs and issues)

File: [`.github/workflows/claude-assistant.yml`](../../.github/workflows/claude-assistant.yml)

Based on [official `examples/claude.yml`](https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml). Responds when someone comments `@claude` on a PR or issue.

**Use cases in class:**

- “@claude explain this diff”
- “@claude fix the failing test shown in CI”
- Read-only review workflow — restrict `--allowedTools` to `Read` and `Bash(gh pr comment:*)`

Separate **write** workflows from **read-only review** workflows (different tool allowlists).

---

## PR / push CI

File: [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)

Runs on every PR and push to `main`:

- `./scripts/verify-curriculum-structure.sh` — curriculum structure gate
- `npm run build` and `npm test` — monorepo proof

Add the job name as a **required status check** in your ruleset after the first green run.

---

## Mapping to Phase 02 closing bracket

| Step | Interactive | GitHub Actions |
|------|-------------|----------------|
| Build · lint · test | `/scan-errors` · `/fix-errors` | Tier 1 + pre-step in Tier 2 |
| Standards | `/monitor` · `/harden` | Inside `/nightly-hygiene` skill |
| Ship proof | `/commit pr` | Bot PR — **human merge** |
| Browser / verify | Human | Not scheduled |

---

## Cost and safety

| Risk | Mitigation |
|------|------------|
| Runaway token spend | `--max-turns`, workflow timeout, billing alerts |
| Over-broad tools | Explicit `--allowedTools` allowlist |
| Prompt injection on issues | Separate read-only review workflow; don’t auto-run on all issue bodies |
| Silent merge | Ruleset: require human approval; no auto-merge |

Security: [claude-code-action security docs](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md)

---

## Local rehearsal (required before Tier 2 cron)

```text
/nightly-hygiene              # full chain
/nightly-hygiene dry-run        # scan + monitor only
/nightly-hygiene tier1        # build · test only
```

Report: `docs/artifacts/nightly-hygiene-report.md`

Policy worksheet: [G1 — Nightly hygiene](../../marketing/adoption-kit/guardrails/01-nightly-hygiene-github-actions.md)

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Action skips / no Claude run | Confirm `ANTHROPIC_API_KEY` secret; check App permissions |
| Skill not found | `actions/checkout` **before** `claude-code-action`; skill must exist at `.claude/skills/<name>/SKILL.md` |
| CI not required on merge | Add job name to ruleset status checks |
| Claude commits to `main` | Tighten prompt + `--allowedTools`; enforce ruleset block direct push |
| Scheduled runs don’t appear | Cron uses UTC; fork repos disable schedule until enabled |

*[refresh]* Re-verify `@v1` inputs and model IDs before each cohort — [migration guide](https://github.com/anthropics/claude-code-action/blob/main/docs/migration-guide.md) if upgrading from beta.
