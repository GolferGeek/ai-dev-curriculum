# Verify — Phase 07

## Product and program

- [ ] Eight category roots render.
- [ ] Full, Essential, and Light definitions validate.
- [ ] Switching profile filters navigation, findings, and advisor retrieval.
- [ ] The selected profile records limitations and expansion triggers.
- [ ] Every program folder has a README.
- [ ] Folder navigation is derived, not duplicated.
- [ ] Status, owner, approver, scope, last review, and next review are visible.
- [ ] Findings link to exact records.
- [ ] The six canonical questions return bounded answers.
- [ ] Culture and profile questions return bounded, cited answers.
- [ ] Sentiment guidance prohibits covert monitoring and individual performance
      inference without an approved requirement and governed process.
- [ ] One unanswerable question produces a gap, not permission.
- [ ] One full requirement-to-control trace is shown.
- [ ] Proposal creation changes no active policy file.
- [ ] One real low-risk change has tests, evidence, reviewer, and recovery.
- [ ] Course/fictional material is not labeled client policy.
- [ ] 30/60/90-day ownership is recorded.

## Application checks

```bash
cd completed/apps/ai-program
npm ci
npm run lint
npm run test:unit
npm run build
npm test
```

## Repository checks

```bash
./scripts/verify-curriculum-structure.sh
npm run ai:generate
npm run ai:check
npm run ai:program:check
npm run docs:links
npm run mindmaps:generate
npm run mindmaps:check
npm run build
npm test
```

## Browser challenge

At desktop and narrow mobile widths:

1. Open the overview and count eight categories.
2. Navigate to a nested folder and compare its rendered text with README.
3. Switch Full → Essential → Light and compare folder/finding counts.
4. Open AI Culture → Sentiment, Listening, and Privacy.
5. Ask “What are we lacking?” and “How is our AI culture?”; open every cited source.
6. Inspect the trace and identify the missing authority link.
7. Prepare a proposal and confirm the active source tree is unchanged.
8. Resize and verify navigation, profile controls, content, tables, findings, and forms remain
   usable without clipped actions or horizontal page overflow.

## Handoff evidence

Record repository revision, date, harness/model, app test result, program-check
result, trace reviewed, proposal status, governed change result, reviewer,
remaining blocker, and next review owner/date.
