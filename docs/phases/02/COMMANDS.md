# Commands — Phase 02

Use the equivalent capability invocation in Cursor, Claude Code, or Codex:

```text
scan-errors <app>
fix-errors <approved findings>
monitor <app>
harden <app>
test-browser <app>
commit pr
pr-eval
```

Run repository checks from the root:

```bash
npm run build
npm test
npm run ai:check
bash scripts/verify-curriculum-structure.sh
```

## Command boundaries

| Capability | Purpose | Boundary |
|---|---|---|
| `scan-errors` | Find and prioritize likely failures | Reports; does not make every suggested change |
| `fix-errors` | Repair reviewed findings | Smallest relevant changes; preserve tests |
| `monitor` | Observe architecture and quality drift | Reports or opens reviewable proposals |
| `harden` | Address approved structural risk | Requires evidence and regression tests |
| `test-browser` | Verify running behavior | Complements, not replaces, automated tests |
| `commit` | Prepare a trusted checkpoint | Requires a reviewed diff and green gates |
| `pr-eval` | Independent pre-merge assessment | Reports remaining risk and missing proof |
