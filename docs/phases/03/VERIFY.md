# Verify — Phase 03

## Structure

Confirm the full phase package exists:

```bash
find docs/phases/03 -maxdepth 1 -type f -print | sort
```

Expected core files: `README`, `OVERVIEW`, `PREREQUISITES`, `COMMANDS`, `STARTER-KIT`, `RUN-ORDER`, `TALKING-POINTS`, `TEACHING`, `DEMO-GRADE-BAR`, and `VERIFY`.

## Investigation evidence

- [ ] Repository authorization and scope recorded
- [ ] Five to ten questions recorded
- [ ] Three predictions timestamped before reports
- [ ] Standard reports generated
- [ ] One scoped deep dive completed
- [ ] Consequential claims cite evidence
- [ ] Uncertainty and contradictions recorded
- [ ] One AI claim manually verified or corrected

## Memory evidence

- [ ] One durable memory artifact added or corrected
- [ ] The update states what evidence supports it
- [ ] Git history was consulted
- [ ] Staleness or revalidation trigger recorded
- [ ] Appropriate owner identified

## Improvement evidence

- [ ] One custom investigation skill exists
- [ ] The skill states evidence, assumptions, uncertainty, output, and verification
- [ ] The skill was run against the selected repository
- [ ] One finding was classified using the promotion ladder
- [ ] A guardrail proposal identifies benefit and false-positive risk

## Presentation evidence

- [ ] The team can explain one real system flow
- [ ] The team can name the riskiest unknown
- [ ] The team can say what it would not change
- [ ] The team shared what surprised it and what the agent got wrong
- [ ] The next investigation question is explicit

Run the repository check:

```bash
bash scripts/verify-curriculum-structure.sh
```
