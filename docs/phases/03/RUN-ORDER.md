# Run order — Phase 03

## Before you start

- [ ] Phase 02 complete, including a known quality contract or PR requirements
- [ ] Choose team mode or individual mode
- [ ] Select an authorized internal, sanitized, public GitHub, or course-provided repository
- [ ] Confirm the continuing learner branch is clean; the lab is read-first and report-first
- [ ] Confirm no secrets, customer data, or prohibited code will be sent to an unapproved service

## The investigation-and-memory cycle

| Step | Action | Output |
|---|---|---|
| 1 | Ask 5–10 questions about the system | Investigation question set |
| 2 | Make three predictions before running tools | Calibration notes |
| 3 | `/ingest` | Whole-repo orientation |
| 4 | `/map` | Data flow, entry/exit points, auth boundaries |
| 5 | `/security-scan` | Security findings and uncertainty |
| 6 | `/git-story` | Hotspots, coupling, ownership, and actual process |
| 7 | `/improve` and one `/deep-dive [area]` | Improvement and specialist findings |
| 8 | Select findings worth remembering | Memory candidates |
| 9 | Verify and classify each candidate | Observation, explanation, expectation, or guardrail |
| 10 | `/author-agent` | One codebase-specific investigation or memory skill |
| 11 | Update durable project memory | Committed map, guide, decision, vocabulary, or risk note |
| 12 | Propose one finding for promotion | Guardrail/test/quality-contract proposal |
| 13 | Prepare and deliver the return-session report | Investigation packet |

## Start with questions

Choose questions that matter to the repository rather than mechanically running every tool.

### System and architecture

- What does this system do, and what are its major boundaries?
- Where does execution begin for web, API, workers, scheduled jobs, and CLI paths?
- Which modules own business rules?
- Which dependencies cross intended boundaries?
- What appears to be deliberately designed, and what appears accidental?

### Data, identity, and security

- Where does user or customer data enter, move, persist, and leave?
- Where are authentication, authorization, role, and tenant checks enforced?
- Which routes or jobs can change consequential data?
- Where do secrets live, and which processes can access them?
- What would be the highest-impact failure?

### Testing and quality

- Which critical paths have meaningful behavioral tests?
- Is coverage consistent across API, web, workers, and shared packages?
- Do tests exercise failure, authorization, and isolation cases?
- Which written standards are automatically enforced?
- Where can a change pass CI while still violating the architecture?

### Git history and actual team practice

- Which files change most often, and why?
- Which files repeatedly change together?
- What does the commit and branch history say the Git process actually is?
- Are review, testing, and ownership expectations consistently followed?
- Which reversions, incidents, migrations, or abandoned approaches should alter our current system memory?

### Ownership, operations, and change safety

- Who or what team appears to own each major area?
- What is observable in production, and what would fail silently?
- Which changes are easy to roll back?
- What would you refuse to change until you knew more?
- What is the safest useful first change for a new contractor or agent?

## Team mode

1. Agree on one system question and three predictions together.
2. Divide investigation lenses: architecture, data/security, testing, Git/process, and operations/improvements.
3. Work in parallel without editing production code.
4. Rejoin and reconcile contradictions.
5. Produce one shared system story and one shared memory update.
6. Create one custom skill that the whole group can explain and defend.

## Individual mode

1. Choose any authorized repository.
2. Own the full question → evidence → memory → guardrail cycle.
3. Use the standard tools for orientation, then pursue one unique question.
4. Create and test one custom investigation skill.
5. Prepare the same investigation packet as a team.

## Classify before promoting

| Level | Meaning | Appropriate home |
|---|---|---|
| Observation | Evidence from this investigation | `docs/artifacts/` report |
| Explanation | Durable description of how the system works | Architecture/onboarding/project-memory docs |
| Expectation | A practice the team wants future work to follow | Quality contract or PR requirements |
| Enforcement | A mature rule that can block unsafe work | Test, CI check, architecture rule, or merge policy |

Do not promote a finding until its evidence is clear, its scope is known, and the appropriate owner has confirmed it.

## Return-session report

Every person or group gets a short report-back:

1. What does the repository do?
2. What question did you investigate?
3. What surprised you?
4. What did the agent claim that you had to correct or qualify?
5. What would you not change yet?
6. What durable memory did you add or repair?
7. What custom skill did you build?
8. What finding should improve a Phase 02 guardrail?
9. What question should the next investigation ask?

## Definition of done

- [ ] Questions and predictions recorded
- [ ] Standard reports generated and evidence checked
- [ ] One codebase-specific deep dive completed
- [ ] One durable memory artifact added or corrected
- [ ] Git history used to confirm or repair memory
- [ ] One custom investigation skill created and tested
- [ ] One promotion candidate proposed with evidence and owner
- [ ] Investigation packet presented to the room
