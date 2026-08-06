# Commands — Phase 05 Part B

Use the equivalent capability invocation for the selected harness:

```text
intention → PRD → plan → run-plan
skill-publish <evaluation>
skill-maintain
scan-errors skills-browser
monitor skills-browser
commit pr
pr-eval
```

Suggested repository and data commands:

```bash
npm run ai:generate
npm run ai:check
npm run build
npm test
bash scripts/verify-curriculum-structure.sh
```

The implementation must expose documented equivalents for:

```text
registry schema apply
registry migrate-static
registry verify-parity
registry refresh
registry maintenance-report
registry backup
registry restore
```

Schema apply and migration must be idempotent. Publication produces a branch
and reviewable diff; it must not write directly to a protected branch.

## Authority by command

| Action | Expected authority |
|---|---|
| Scout and inspect | Read configured sources |
| Evaluate | Create an evidence record |
| Approve | Bind a decision to revision and scope |
| Publish | Propose canonical Git changes |
| Generate | Rebuild native projections from canonical source |
| Install | Separate project or user authorization |
| Revoke/retire | Policy owner plus review trail |
