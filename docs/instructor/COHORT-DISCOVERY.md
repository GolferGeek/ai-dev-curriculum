# Cohort discovery guide

Use this guide before the cohort and during the Great Convergence opening. The
goal is to understand what the room wants, what it can already do, what it is
allowed to do, and how the instructor should adapt examples and facilitation.

Discovery does not lower the developer-level or evidence bar. It determines
where the instructor begins, which examples will matter, which constraints
must remain visible, and which client decisions belong in the AI program.

## Use it in two passes

### Before the cohort

Ask the client sponsor and a technical representative to complete the detailed
questions. Record confirmed answers, unknowns, owners, and follow-up dates.
Resolve account, network, data, tool, source-access, and delivery blockers
before Day 1.

### In the opening

Use a 10–15 minute conversational version to hear the developers directly.
Ask for a show of hands, a one-to-five signal, short answers in chat, or a
brief pair discussion. Do not turn the opening into an intake meeting.

Say this before a mixed-client discussion:

> Share categories and sanitized examples. Do not disclose confidential code,
> architecture, incidents, customers, credentials, or data from your
> organization.

## Live room questions

These questions are enough for the opening:

1. What kind of organization or organizations are represented?
2. Are you primarily a software shop, or does software support another
   business such as manufacturing?
3. How many developers are on your team, and which roles are in this room?
4. Are you excited, curious, skeptical, anxious, or being required to adopt
   agentic development?
5. What coding-agent experience do you already have?
6. Where does your development work currently wait the longest?
7. How strong is your automated-testing and delivery system today?
8. Which SaaS, ERP, spreadsheet, integration, or manual-process gap keeps
   recurring?
9. Which code or data boundaries must AI tools never cross?
10. What would make this week concretely useful by Friday?

## Detailed client discovery

### Organization and customers

- Is the organization a software product company, software consultancy,
  manufacturer, professional-services firm, public institution, or something
  else?
- Does it build for employees, customers, partners, or all three?
- Is this a private cohort for one client or a shared cohort containing
  multiple clients?
- Which business systems dominate today—ERP, CRM, line-of-business SaaS,
  spreadsheets, custom applications, or vendor integrations?
- Where does the organization's workflow have to bend around those systems?

For a manufacturer, ask specifically:

- Which ERP or MES workflows do not fit the floor, warehouse, quality,
  maintenance, scheduling, or reporting process?
- Which gaps are handled with spreadsheets, paper, duplicate entry, or tribal
  knowledge?
- Which systems, machines, or vendors expose usable APIs or event data?
- What operational data is sensitive, safety-relevant, or unavailable outside
  the facility?

### Team and capability

- How many developers are there?
- What are their languages, frameworks, platforms, and experience levels?
- Who provides product management, architecture, QA, security, data,
  infrastructure, UX, and operations?
- Does the team mostly build new products, maintain brownfield systems,
  integrate vendor products, or support internal applications?
- Can participants comfortably use Git, pull requests, a terminal, package
  managers, tests, and an IDE?
- Can they read unfamiliar code, trace application boundaries, and diagnose a
  failing build?
- Who can approve tools, merge code, deploy software, and accept risk?

### AI experience and sentiment

- Who uses code completion, model chat, IDE agents, CLI agents, or agent-first
  environments today?
- Which harnesses, models, and providers have they tried?
- What worked well enough to change someone's behavior?
- What hallucination, security issue, weak result, or organizational reaction
  reduced trust?
- Are participants excited, curious, skeptical, anxious, or mandated?
- Which concerns are technical, and which are about role, identity,
  accountability, or job security?
- Does leadership expect productivity, reduced cost, faster delivery, new
  products, better quality, or all of them?

Do not argue someone out of skepticism. Convert claims into testable questions
and let the labs provide evidence.

### Development system

- What is the path from an idea to deployed software?
- Where does work wait—definition, prioritization, access, implementation,
  review, testing, security, procurement, or release?
- How frequently can the team safely release?
- What automated unit, integration, contract, browser, security, and
  regression tests exist?
- Are CI, code review, protected branches, deployment, observability, rollback,
  and incident learning reliable?
- Which coding standards and architectural decisions are documented and
  enforced?
- How much undocumented project or company knowledge lives only in people's
  heads?

### Opportunity portfolio

Ask for candidates in three categories:

| Category | Useful questions |
|---|---|
| Internal | Which manual workflow, spreadsheet, report, approval, reconciliation, or integration consumes time or creates errors? |
| Customer-facing | Which service, portal, insight, workflow, or response could improve experience or retention? |
| Expansion | Which new product, capability, market, or revenue experiment was previously too expensive to try? |

For each candidate, ask:

- Who experiences the problem?
- What measurable value would change?
- What is the smallest useful slice?
- What data and integrations does it require?
- What can go wrong, and who bears the consequence?
- Who will own, test, operate, fund, and eventually retire it?

### Constraints and authority

- Which privacy, security, regulatory, contractual, IP, or data-residency
  constraints apply?
- What code or data may never enter a hosted model?
- Which models, providers, harnesses, tools, MCP servers, skills, and agents
  are approved, prohibited, or undecided?
- Are cloud access, local models, software installation, browsers, GitHub,
  package registries, ports, or downloads restricted?
- Which codebases require high assurance, formal traceability, independent
  review, or line-by-line approval?
- What may an agent read, propose, edit, execute, publish, deploy, or delete?
- Who grants exceptions?

Record these as decisions or explicit gaps in `docs/ai-program/`. Do not turn
an instructor recommendation into client policy.

### Change and maintenance capacity

- Who will own the AI program after the course?
- Who will maintain project memory, skills, specialized agents, standards,
  tests, and harness projections?
- How frequently can the organization review changing models, tools,
  advisories, and vendor terms?
- How much experimentation can teams absorb without creating novelty churn?
- What is the rollout and rollback path for a new AI capability?
- Is the organization willing to fund maintenance after the excitement of the
  first build?

### Success

- What must participants understand by Friday?
- What must they be able to demonstrate without instructor help?
- Which leadership decision should the evidence inform?
- What should be measurably different after 30, 60, and 90 days?
- Which adoption, delivery, quality, risk, or business indicators matter?
- What result would mean “not now” is the correct conclusion?

## Adaptation guide

| Discovery signal | Instructor response |
|---|---|
| Software product team | Emphasize brownfield understanding, quality, parallel work, and delivery governance |
| Manufacturer or operations-heavy organization | Use ERP gaps, integrations, internal workflows, reporting, and operational data examples |
| Small generalist team | Favor one end-to-end path and clear ownership over elaborate specialization |
| Large or multi-team organization | Emphasize canonical capabilities, precedence, portfolio governance, and cross-team contracts |
| Excited room | Protect the evidence bar and name overreach risks early |
| Skeptical room | Use prediction, controlled comparisons, and observable proof; avoid vendor evangelism |
| Mandated or anxious room | Acknowledge the lack of choice, preserve human authority, and make role changes discussable |
| Weak testing practice | Use reference applications first and spend more time rebuilding the verification bracket |
| High-assurance codebase | Constrain agents to research, test generation, review, and tightly bounded proposals |
| Mixed-client cohort | Use sanitized categories, shared fixtures, and private client follow-up for sensitive decisions |
| No maintenance owner | Treat production adoption as blocked; the course may still build understanding and evidence |

## Instructor record

Capture:

- cohort type and represented organizations;
- developer count, roles, stacks, and experience;
- room sentiment and prior AI experience;
- opportunity themes and candidate projects;
- testing and delivery maturity;
- data, security, tool, and authority constraints;
- accessibility, remote-delivery, and support needs;
- client decisions, owners, gaps, and escalation items;
- adaptations made to examples, grouping, pacing, and recovery; and
- desired Friday and 30/60/90-day outcomes.

Store client-confidential discovery outside the public curriculum repository.
Only approved, sanitized decisions and durable organizational guidance belong
in the client's AI-program repository.
