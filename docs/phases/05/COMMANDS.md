# Commands — Phase 05

Invocation syntax varies by harness. Use the equivalent canonical capability
in Cursor, Claude Code, or Codex.

```text
intention → PRD → plan → run-plan
skill-scout
skill-evaluate <source> <revision>
scan-errors skills-browser
test-browser skills-browser
commit pr
```

Repository checks:

```bash
npm run ai:check
npm run build
npm test
bash scripts/verify-curriculum-structure.sh
```

## Command contracts

| Capability | Reads | Produces | Must not do |
|---|---|---|---|
| `skill-scout` | Configured sources and prior snapshot | New immutable snapshot, normalized catalog, diff, failures | Install or approve |
| `skill-evaluate` | One exact revision and policy | Evidence worksheet and recommendation | Float approval across versions |
| `scan-errors` | App and logs | Prioritized findings | Quietly rewrite unrelated code |
| `test-browser` | Running app and test cases | Visual/interaction evidence | Treat screenshots as functional proof |
| `commit` | Reviewed diff and checks | Intentional checkpoint or PR | Include secrets or unrelated work |

Scouting and evaluation are read-only by default. Phase 05.5 introduces
publication and maintenance actions with explicit authority.
