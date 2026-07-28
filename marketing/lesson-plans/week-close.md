# Day 5 — Build Your AI Development Operating System

Day Five introduces no new phase. The seven phases supplied the parts; today participants install those parts in a repository they intend to keep using.

This is a supervised implementation clinic, not another lecture. The instructor helps each team make sound choices, work through real repository constraints, and leave with a usable AI-development operating model in git.

**Day Five promise:** leave with a repository that can support real application work, shared agent instructions, repeatable skills, governed LLM use, a safe Git process, and one verified change.

---

## The three repository paths

Every participant chooses one path during the opening:

| Path | Best for | Work today |
|------|----------|------------|
| **Harden the current repository** | A team with a real codebase it can use safely | Understand it, add the operating-model folders, document boundaries, wire quality gates, and complete one low-risk change |
| **Create the company monorepo** | A team ready to establish a shared application platform | Create or migrate to Nx, add one or two applications, establish shared libraries and targets, then install the AI operating model |
| **Create the AI program repository** | A team that cannot modify product code today or needs a cross-repository policy home | Copy and adapt `docs/ai-program/`, shared skills, templates, governance, and Git processes; name how product repositories consume them |

The curriculum repository is a source kit, not a package participants must adopt whole. Copy the pieces that express durable practice. Remove course-only examples and phase materials. Preserve local conventions that already work.

---

## What we teach

Most teaching happens as short, just-in-time clinics while teams work.

### 1. Repository architecture

- When an Nx monorepo helps and when migration would create unnecessary risk.
- The distinction between applications, reusable libraries, repository tooling, and company policy.
- How Nx targets, affected commands, caching, and dependency boundaries support fast verification.
- How to add an application without turning the day into a framework migration marathon.

### 2. The repository as organizational memory

- `docs/ai-program/` records what the company believes, permits, measures, and has decided.
- `AGENTS.md` gives agents the small amount of standing context they need every session.
- `.claude/skills/` or the team's equivalent records repeatable ways of working.
- Project intentions, plans, and evidence remain closer to the application.
- Chat history and personal tool memories are not the company system of record.

### 3. Skills and working conventions

- Select only the skills the team will actually use.
- Adapt paths, commands, terminology, and approval boundaries to the repository.
- Test one skill against a real task.
- Assign owners, review skills like code, and retire obsolete instructions.
- Keep policy in documents and executable workflow in skills.

### 4. Git and delivery

- Branch, commit, review, merge, and rollback conventions for agent-assisted work.
- Required checks and the exact commands an agent must run.
- What evidence belongs in a pull request.
- Which actions are automatic, approval-gated, or human-only.
- How small changes and clean commits preserve comprehension.

### 5. LLM governance

- Approved harnesses, accounts, plans, and data-handling terms.
- What code or data may be sent to which provider.
- Model routing by risk, quality, latency, and cost.
- Budget ownership and usage visibility.
- Human decision boundaries, secrets handling, audit evidence, and incident response.
- A scheduled process for revisiting models and tools as the market changes.

### 6. Applying the full development loop

Each team uses the week's discipline on one bounded task:

`understand → intend → plan → implement → test → inspect → document → review`

The task may add an application, create a shared library, harden an existing feature, add a quality gate, or install and test a skill. A small finished slice is better than a large unfinished migration.

---

## Recommended day

### 1. Choose the path and define “done” — 30 minutes

Each team states:

- the repository it will work in;
- the path it chose;
- the one application or capability in scope;
- the highest-risk unknown;
- the evidence it will show at the end.

The instructor checks repository access, secrets, privacy constraints, and whether the selected scope can finish today.

### 2. Repository orientation and baseline — 45 minutes

Before changing anything, teams prove they understand the current state:

- install and start commands;
- repository structure and dependency graph;
- existing tests, linting, builds, and deployment;
- current Git protections;
- current agent instructions or automation;
- sensitive areas that are out of scope.

Record the baseline. If the repository does not start or test before the work, that fact must not be blamed on the day's change.

### 3. Architecture implementation — 90 minutes

Depending on the chosen path:

- create or refine the Nx workspace;
- migrate existing applications incrementally;
- add one or two bounded applications;
- define shared libraries only where reuse is real;
- create consistent `build`, `test`, `lint`, and `serve` targets;
- establish the corporate, group, and project document scopes.

Do not force Nx onto a repository merely to satisfy the course. The desired outcome is a maintainable operating platform, not a particular folder tree.

### 4. Install the AI operating model — 90 minutes

Teams adapt the ten adoption-kit templates into `docs/ai-program/` and create the minimum effective versions of:

- approved harness and account policy;
- root instruction passport;
- artifact and decision locations;
- quality gates;
- decision and permission boundaries;
- model-routing and spend policy;
- brownfield safety rules;
- tool and model review cadence;
- corporate, group, and project context map;
- leadership, program ownership, and adoption rituals.

Then they select and adapt the skills they intend to use. At least one skill must be exercised against the repository rather than merely copied.

### 5. Complete one real change — 90–120 minutes

Run one bounded item through the complete workflow. Require:

- a written intention;
- a visible plan;
- a focused diff;
- tests or browser evidence;
- an explanation of what the agent got wrong or required human judgment;
- a pull request or review-ready branch following the team's new Git rules.

### 6. Readiness review and presentations — 45–60 minutes

Each team presents the repository, not a chat transcript.

| Show | Listening for |
|------|---------------|
| Repository architecture | The structure has a reason; Nx was chosen deliberately |
| One working application or change | Running behavior and a bounded scope |
| `docs/ai-program/` | Real names, tools, paths, boundaries, and owners |
| Agent instructions and one tested skill | Repository-specific guidance, not untouched course text |
| Git and quality gates | Exact commands, review evidence, and rollback path |
| LLM governance | Approved usage, data boundaries, routing, spend, and accountability |
| Monday's next action | One owner, one task, and one date |

---

## Optional stretch exercise — Build the room's agent network

Use this when a participant does not have another project in mind, a team finishes early, or the room wants to continue the Phase 04 work.

Each participant builds one small AI assistant that represents a person, team, or fictional company. The assistant should have a useful but narrow job—for example:

- answer questions about an approved product catalog;
- qualify a vendor or customer request;
- locate an internal policy and return evidence;
- request a meeting within approved hours;
- prepare, but not approve, a purchase request;
- match a candidate to published role requirements;
- provide a bounded support or operations capability.

Then make the assistants interoperable through the A2A patterns taught in Phase 04:

1. Publish an accurate Agent Card.
2. Declare one or two skills and their input, output, authentication, and limitation expectations.
3. Accept a delegated task from another participant's assistant.
4. Maintain visible task state and return an inspectable result or artifact.
5. Connect two assistants, then connect the room into a small network.
6. Show the messages, task states, evidence, denials, and human interventions in the dashboard or logs.

The goal is not unrestricted autonomous conversation. The goal is **safe representation across an organizational boundary**.

### Security design

Before connecting an assistant to the room, its owner writes a capability and authority card:

| Question | Required answer |
|----------|-----------------|
| Who does this assistant represent? | Named person, team, or fictional company |
| What may it discover and disclose? | Explicit data classes and sources |
| What tasks may it accept? | Narrow allowlist |
| What may it change or promise? | Explicit limit; default is nothing |
| What requires human approval? | Spending, commitments, external messages, sensitive data, destructive actions |
| Which tools and credentials may it use? | Least-privilege list |
| What evidence must it record? | Caller, request, decision, tool use, result, denial, approval |
| How is access revoked? | A tested kill switch or credential-revocation path |

Require:

- authenticated agent identity rather than trusting self-description;
- least-privilege, short-lived credentials;
- server-side authorization on every consequential action;
- input and output validation;
- separation between public discovery information and protected business data;
- rate limits, fan-out limits, timeouts, and spending limits where relevant;
- prompt-injection and untrusted-content handling;
- no secrets in prompts, logs, Agent Cards, or returned artifacts;
- human approval for commitments, payments, sensitive disclosure, and destructive changes;
- auditable task and tool events;
- a visible deny response that explains what boundary was reached without leaking protected policy;
- revocation and shutdown that work even if the model continues asking.

### Adversarial room test

Pair participants. One assistant requests legitimate work; the other deliberately tests a boundary:

- request an undeclared capability;
- ask for protected data;
- try to change the goal mid-task;
- submit instructions inside untrusted content;
- attempt excessive fan-out;
- reuse expired or inappropriate authority;
- ask the assistant to conceal its action from the human;
- request a purchase, message, or destructive action without approval.

The assistant passes when it completes the allowed portion, refuses or escalates the prohibited portion, records what happened, and remains useful. A blanket refusal is secure but not yet a good assistant.

### Stretch deliverable

Each participant shows:

- their Agent Card and declared skills;
- the authority card;
- one successful cross-agent task;
- one denied or escalated task;
- the event or audit evidence;
- how the enterprise can revoke the assistant;
- one limitation that would need hardening before production.

This exercise turns A2A from a protocol demonstration into an enterprise design problem: **how can my agent work with your agent without either organization surrendering control?**

---

## Definition of done

Day Five is complete when the team has:

- [ ] chosen and documented one of the three repository paths;
- [ ] a repository that installs and runs, or a recorded pre-existing blocker;
- [ ] an Nx decision—adopt, migrate incrementally, or deliberately defer—with rationale;
- [ ] at least one application or real repository capability in scope;
- [ ] `docs/ai-program/` adapted to the organization rather than copied unchanged;
- [ ] a concise root agent-instruction file;
- [ ] a small, owned set of skills with at least one tested;
- [ ] Git branches, approvals, required checks, and review evidence defined;
- [ ] approved LLM accounts, data rules, routing, spend ownership, and human-only boundaries recorded;
- [ ] one bounded change taken through implementation and verification;
- [ ] a named program owner and a 30-day follow-up date.

---

## Instructor posture

Coach, diagnose, and challenge. Do not make every repository look like the curriculum repository.

Ask repeatedly:

- What problem does this structure solve?
- Is this company policy, group context, project memory, or an executable skill?
- How will a new developer discover this?
- How will an agent know what it may do?
- What proves the change works?
- Who owns this after today?

The strongest Day Five result may be a modest code change accompanied by a durable operating model. The course succeeds when participants can continue safely without the instructor.
