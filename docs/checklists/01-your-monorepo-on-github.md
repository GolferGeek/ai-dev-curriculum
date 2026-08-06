# Checklist 01 — Your monorepo on GitHub

*Get the curriculum onto **`main` in your organization’s repo** — the shell where documents, skills, and apps will live.*

**Prerequisite:** [Pre-class setup](../pre-class-setup.md) (git, Node, GitHub account, one AI agent).

**Next:** [02 — GitHub Actions and skills](02-github-actions-and-skills.md)

---

## What “done” looks like

- A repo under **your** GitHub org (or your personal account for solo practice)
- Default branch **`main`** contains the curriculum tree: `docs/`, `.claude/`, `apps/`, `packages/`, workflows
- Your team clones **your** URL — not only `GolferGeek/ai-dev-curriculum`
- `npm ci` and `./scripts/verify-curriculum-structure.sh` pass locally

---

## 1. Create the empty repo (GitHub)

On github.com (org or personal):

| Setting | Recommended |
|---------|-------------|
| **Name** | e.g. `ai-dev-monorepo`, `platform`, `your-company-dev` |
| **Visibility** | Private for company work; public only if policy allows |
| **Initialize** | **Do not** add README, .gitignore, or license — empty repo |
| **Default branch** | `main` |

Note your repo URL: `https://github.com/<org>/<repo>.git`

- [ ] Empty repo created
- [ ] You have **Admin** on the repo (needed later for Actions secrets and Pages)

---

## 2. Copy curriculum `main` into your repo

Pick **one** path.

### Option A — Clone and retarget remote (most teams)

```bash
# Clone upstream curriculum
git clone https://github.com/GolferGeek/ai-dev-curriculum.git
cd ai-dev-curriculum

# Point at YOUR repo (replace org/repo)
git remote rename origin upstream
git remote add origin https://github.com/<YOUR-ORG>/<YOUR-REPO>.git

# Push full history to your main
git push -u origin main
```

### Option B — GitHub “Import repository” (no local git yet)

1. Your new repo → **Settings** → **Import a repository**
2. Source: `https://github.com/GolferGeek/ai-dev-curriculum`
3. Import → confirm **`main`** is default branch

### Option C — Fork (solo / open source only)

Fork on GitHub, then clone **your fork**. Fine for learning; **company teams usually want Option A or B** so the repo lives cleanly under the org.

- [ ] `main` on your repo matches curriculum structure
- [ ] Remote `origin` is **your** repo (verify: `git remote -v`)

---

## 3. Verify locally

```bash
git clone https://github.com/<YOUR-ORG>/<YOUR-REPO>.git
cd <YOUR-REPO>
npm ci
./scripts/verify-curriculum-structure.sh
npm run build
```

- [ ] `verify-curriculum-structure.sh` prints OK
- [ ] `npm run build` completes (turbo monorepo)

Fix failures before [checklist 02](02-github-actions-and-skills.md).

---

## 4. Team access

| Task | Done |
|------|------|
| Invite dev group with **Write** (or org team) | ☐ |
| Name repo admin (Actions, secrets, rulesets) | ☐ |
| Add repo to internal docs / onboarding | ☐ |

---

## 5. Seed your AI program folder (optional now, required by week close)

Copy adoption kit templates into git memory — not only on someone's laptop:

```bash
mkdir -p docs/ai-program/07-program-evolution/02-proposals-decisions-and-supersession
# Copy templates from marketing/adoption-kit/ as you fill them — see docs/ai-program/README.md
```

- [ ] `docs/ai-program/README.md` reviewed
- [ ] Owner named for `docs/ai-program/` changes

---

## 6. Portfolio folders (when you start building apps)

Each product gets **code + portfolio context** in the same repo:

| Layer | Path |
|-------|------|
| Runnable app | `apps/<name>/` |
| Portfolio context (pitch, audience, status, agent notes) | `docs/projects/<name>/` |

Copy [`docs/projects/_template/`](../projects/_template/README.md) when you add your first app after Phase 00. Index: [Project portfolio](../projects/README.md).

- [ ] Read [projects/README.md](../projects/README.md)
- [ ] First portfolio row added (even if status is "idea" only)

---

## 7. Rename and customize (your call)

| Item | Your choice |
|------|-------------|
| Repo display name / description on GitHub | |
| Replace `@GolferGeek` in `.github/CODEOWNERS` with your team | ☐ |
| Update `site_name` / `site_url` in `mkdocs.yml` when Pages goes live | ☐ |

Do **not** strip `.claude/` or `docs/phases/` — that is the curriculum.

---

## Policy lines

- **Team truth in git** — the org repo is the system of record, not a instructor's fork on one laptop.
- **Upstream updates** — if you keep `upstream` remote, pull curriculum improvements deliberately (PR), not silent merges to `main`.
- **No client names in shared curriculum docs** — company specifics live under `docs/ai-program/` or `docs/groups/<name>/`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Push rejected (non-fast-forward) | You initialized the repo with a README — delete it on GitHub or force-push only if repo is empty and team agrees |
| `npm ci` fails | Node 22+; delete `node_modules`, retry |
| Large push timeout | `git config http.postBuffer 524288000`; or use GitHub Import (Option B) |

---

## Sign-off

| Field | Value |
|-------|-------|
| Your repo URL | |
| Default branch | `main` |
| Repo admin | |
| Date completed | |

**Next →** [02 — GitHub Actions and skills](02-github-actions-and-skills.md)
