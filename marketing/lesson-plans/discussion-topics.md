# Instructor Discussion Track

*Cross-cutting talks for the five-day course — discussion-first (whiteboard / slides / secondary window), not terminal labs. Pair with each phase’s [lesson plan](./README.md): use these during **§3 build windows** and whenever the room needs business altitude.*

**How to use this doc**
- Each phase lists **primary** talks (do these) and **optional** talks (if time or the room asks).
- Talks are ~15–25 minutes unless marked longer.
- Themes marked *[refresh]* need a current article, pricing page, or vendor policy before the cohort.
- The week compounds: Day 1 plants seeds; later phases harvest them with evidence from the labs.

> **The through-line:** SMBs don’t need a Fortune-500 AI office — they need a **small, explicit operating model**: shared context, right-sized models, human decision boundaries, and proof before ship.

---

## Quick map (phase → discussions)

| Phase | Primary discussions |
|-------|---------------------|
| **00** | Harness engineering · Memory / instruction passport · Shadow AI & plan tiers · Seed model routing · Parallel sessions & burn · SMB operating-model sketch |
| **01** | Corporate context layers (incl. brand) · Human decision boundaries · Secrets & trust · Hooks / policy-as-code (intro) |
| **02** | Comprehension debt & review economics · Living standards · Observability of agent work · Parallel cost discipline |
| **03** | Spec as durable asset (brownfield) · Promote findings → rules · Day-2 safety for *their* repo |
| **04** | Authorize-before-act · Multi-agent coordination trends · Observability on the wire |
| **05** | Skills as org IP · Brand/GTM as preference skills · Skills vs rules vs memories |
| **06** | Model routing (deep) · Eval-driven procurement · Local vs hosted policy · Cost visibility |
| **Week close** | Full SMB AI development program · Beyond engineering · Adoption checklist |

---

## Must-discuss shortlist (if the week gets compressed)

1. Model routing / cost  
2. Corporate context layers (incl. brand)  
3. SMB AI development operating model  
4. Shadow AI + data/IP terms  
5. Harness engineering (name the discipline)  
6. Human decision boundaries  
7. Skills/rules as compounding org IP  
8. Evals as how you buy models  

---

# Phase 00 — Foundations & first build

*Build windows are short (~20–40 min). Plant vocabulary and the operating-model sketch; don’t try to finish every topic.*

### Primary

#### D00-1 — Harness engineering (name it) (~20 min)
**Land:** Prompt engineering → context engineering → **harness engineering** (tools, permissions, hooks, memory, evals, feedback loops). This course *is* harness engineering.

**Talk prompts**
- What’s the difference between the model and the harness?
- Why does “better prompting” stop being enough once agents run tools?
- What pieces of the harness will *their* company need to own vs. rent from a vendor?

**Tie to lab:** The taxonomy in TEACHING.md (LLM / prompt / context / tools / harness / skill / agent).

---

#### D00-2 — Where memory lives (instruction passport) (~20–25 min)
**Land:** Two kinds of memory — **instructions you write** (shareable) vs **auto-memories the tool writes** (usually personal). Team truth lives in git or org-enforced policy.

**Cheat sheet (refresh paths before class)**

| Harness | Team / shared instructions | Personal / auto |
|---------|---------------------------|-----------------|
| **Claude Code** | `CLAUDE.md` / `.claude/CLAUDE.md`, `.claude/rules/`; org managed file via IT | `~/.claude/CLAUDE.md`, `CLAUDE.local.md`, auto `MEMORY.md` |
| **Cursor** | `.cursor/rules/`, `AGENTS.md`; **Team Rules** on Team/Enterprise (can enforce) | User Rules; Memories (per user/project) |
| **Codex** | `AGENTS.md` (+ nested); `.codex/config.toml`; enterprise `requirements.toml` | `~/.codex/AGENTS.md`; local Memories (opt-in) |

**Passport pattern for mixed teams:** `AGENTS.md` as source of truth → `CLAUDE.md` with `@AGENTS.md` → Cursor rules for glob-scoped detail.

**Talk prompts**
- If it must be true for everyone Monday, where does it live?
- What should never go in Memories?
- Who owns updates to the passport — and is it reviewed like code?

**Secondary-window activity:** Open *their* harness files; draft 10 lines of `AGENTS.md` for a real backlog item.

---

#### D00-3 — Shadow AI & plan tiers (~15–20 min)
**Land:** Consumer vs Business/Enterprise terms differ on **training defaults, retention, IP indemnity**. Personal accounts on company code are a governance failure.

**Talk prompts**
- What plan is everyone actually on this week? *[refresh vendor tables]*
- Privacy Mode / ZDR / training opt-out — who verified?
- What’s our rule for customer data and secrets in prompts?

**Take-home seed:** “Company work uses company-approved plans only.”

---

#### D00-4 — Model routing (seed) (~10–15 min)
**Land:** Today most people pick one frontier model and leave it. That’s convenient and expensive. Routing (and soon harness auto-routing) sends simple work to small/fast models and hard work to frontier — often **40–70%+** token savings when most agent traffic is routine. *[refresh savings claims]*

**Talk prompts**
- What % of agent actions this morning were “list files / read / lint” vs “design architecture”?
- If the harness routed those for you tomorrow, what policy would you want written down *now*?

**Defer deep dive to Phase 06** — here just plant the cost barbell.

---

#### D00-5 — Parallel sessions & burn rate (~10 min)
**Land:** Second tabs / subagents are how you teach during builds — and they **multiply** token use. Parallelism is a budget decision, not just a productivity trick.

**Talk prompts**
- When is a second session worth it?
- Should research workers run on a cheaper model than the architect?

---

#### D00-6 — SMB operating-model sketch (~20–25 min)
**Land:** A one-page “AI development program” for a shop of 2–20 people — not a center of excellence org chart.

**Whiteboard the seven pieces**
1. Approved harness + plan tier  
2. Shared instruction passport  
3. Artifact pipeline (intention → PRD → plan → build)  
4. Quality gates + living standards  
5. Human decision boundaries (may / must ask)  
6. Cost / routing policy  
7. Day-2 rules for the real repo  

**Talk prompts**
- Which piece do you already have? Which is missing?
- Who is accountable for #5 and #6 — eng lead, owner, or IT?

**Revisit on Day 5** with their filled-in version.

### Optional (Phase 00)
- Spec/intention as durable asset (preview — full weight in 03/05)
- Extending agents beyond engineering (preview — Day 5)

---

# Phase 01 — Real apps (auth + data)

*Longer build (~45–60 min). Best day for **corporate context** and **decision boundaries**.*

### Primary

#### D01-1 — Corporate context layers (~25–30 min)
**Land:** Agents only behave like “your company” if company knowledge is structured and loadable. Brand and GTM are not decoration — they are **context**.

**Layers to draw**

| Layer | Examples | Home |
|-------|----------|------|
| Org / policy | No secrets in chat; approved tools; residency | Managed rules / Team Rules |
| Brand & GTM | Colors, type, voice, claims we never make | Preference skill or `brand/` rules |
| Domain | Industry terms, compliance quirks | Skills + later eval prompts |
| Product / repo | Stack, auth rules, demo-grade bar | Passport + architecture skills |
| Personal | Verbosity, aliases | User rules / local memory |

**Talk prompts**
- Where do your brand guidelines live today — PDF? Figma? Nobody’s head?
- What happens when an agent invents a tagline that legal would reject?
- What’s the minimum brand pack an SMB should commit this quarter?

**Secondary-window:** Outline a one-page `brand-context.md` (colors, voice, forbidden claims) for their company — even if unfinished.

---

#### D01-2 — Human decision boundaries (~20 min)
**Land:** Autonomy is a ladder. Agents may explore; may edit under review; may **not** touch prod, spend money, or ship without a human. Same mental model as AP2 mandates (Phase 04) — **authorize before act**.

**Talk prompts**
- List five actions; sort into *agent may* / *agent must ask* / *human only*.
- Who is the accountable human when the agent was “mostly right”?

**Tie to lab:** Auth chain verification — humans prove isolation; agents don’t get a free pass.

---

#### D01-3 — Secrets, trust boundaries, and context hygiene (~15–20 min)
**Land:** Speed ships breaches. Context windows are not vaults. `.env`, customer PII, and prod credentials never belong in Memories or casual chat.

**Talk prompts**
- What would Base44/Lovable look like *inside* an agent session (wrong context → wrong ship)?
- What’s our checklist before pasting anything into the harness?

**Tie to lab:** Second-user isolation attempt; security checklist file.

### Optional (Phase 01)
- Hooks / policy-as-code intro (PreToolUse, deny lists) — deepen in Phase 02
- Parallel second track as cost/quality compare

---

# Phase 02 — Quality gates

*Pipeline is fast; discussions can be dense. This is the **economics of review** day.*

### Primary

#### D02-1 — Comprehension debt & the review bottleneck (~20–25 min)
**Land:** Generation got cheap; understanding didn’t. 4× output ≠ 4× delivered value if humans can’t review it. Gates are necessary; comprehension is still human.

**Talk prompts**
- What would you refuse to merge even if CI is green?
- How does your team capture “we learned X in review” so it doesn’t recur?

**Tie to lab:** Pick one unread AI function; explain-or-rewrite in 60 seconds.

---

#### D02-2 — Living standards (rules that compound) (~15–20 min)
**Land:** `pr-requirements` / Team Rules / managed CLAUDE.md — standards that **grow** when reviews find gaps. Same bug shouldn’t pass twice.

**Talk prompts**
- Personal Memories vs committed rule — which survives a new hire’s laptop?
- Who approves a new org-wide rule?

**Secondary-window:** Promote one finding from `/scan-errors` or `/monitor` into a draft rule line.

---

#### D02-3 — Observability of agent work (~15 min)
**Land:** A green chat message is not an audit trail. Diffs, commits, test output, and (later) wire logs are how you know.

**Talk prompts**
- What evidence would you show a customer or auditor that the change was reviewed?
- Where does agent activity need to show up in *your* existing tools (GitHub, Linear, Slack)?

### Optional (Phase 02)
- Parallel agents & burn (revisit with quality lens: “cheaper model for lint fixer?”)
- Hooks as hard gates vs markdown as soft gates

---

# Phase 03 — Brownfield research

*Research tools produce reports, not apps — perfect for **operating-model** depth on real systems.*

### Primary

#### D03-1 — Spec & understanding as the durable assets (~20 min)
**Land:** In brownfield, the scarce work is comprehension. Code can be regenerated; a wrong change to a system you don’t understand cannot. Intentions/maps/security notes are corporate memory.

**Talk prompts**
- What’s the minimum research packet before touching prod?
- How does this change estimation and “AI will just rewrite it” fantasies?

---

#### D03-2 — Promote research → passport / skills (~15–20 min)
**Land:** `/ingest` and `/map` findings that matter forever belong in `AGENTS.md` / rules / `/author-agent` — not in chat scrollback.

**Talk prompts**
- Which finding from today’s run should be committed before anyone leaves?
- Skill vs rule: workflow vs always-on constraint?

**Tie to lab:** `/author-agent` as Day-2 bridge.

---

#### D03-3 — Day-2 safety for *their* repo (~15–20 min)
**Land:** Read-first, no secrets in prompts, smallest blast radius, human owns the change decision. This is the highest-value SMB conversation of the week if they’re bringing a real codebase Friday.

**Talk prompts**
- What’s off-limits for agents on Monday?
- Who signs off on the first AI-assisted PR to production?

### Optional (Phase 03)
- Corporate context for legacy (messy code confuses models — reconstruct from UI/DB/network when source lies)

---

# Phase 04 — Protocols

*Multi-service build = fat window. Elevate from “cool demo” to **authorize-before-act** and multi-agent ops.*

### Primary

#### D04-1 — Authorize before act (~20–25 min)
**Land:** Mandates / decision boundaries aren’t only for crypto payments. Any agent that can spend, email customers, or change prod needs an explicit authorization model. AP2 is the industry’s payment version of a general rule.

**Talk prompts**
- Map “mandate” onto *your* business: refunds, discounts, vendor orders, deploys.
- What’s the audit trail if something goes wrong?

---

#### D04-2 — Multi-agent coordination (industry direction) (~15–20 min)
**Land:** Single-agent demos → coordinated teams of agents (Anthropic agentic trends, Forrester agentic SDLC). Your dashboard is a miniature of that future. *[refresh trend report]*

**Talk prompts**
- Where would *your* company publish an Agent Card?
- What must stay human-orchestrated for the next 12 months?

---

#### D04-3 — Observability on the wire (~10–15 min)
**Land:** Explore mode = verification for agent systems. Same barbell back-end as Playwright for UIs.

**Talk prompts**
- Can someone narrate one JSON-RPC exchange without jargon?
- What would you log in production that this demo makes visible?

### Optional (Phase 04)
- Nested `AGENTS.md` under multi-service apps
- Cost of fan-out (many agents × frontier model)

---

# Phase 05 — Skills Browser

*Best second deep-dive on **org IP** after Phase 00’s passport talk.*

### Primary

#### D05-1 — Skills as organizational IP (~20–25 min)
**Land:** Preference skills encode *how we work* and get more valuable over time; capability skills may get eaten by better models. Open Agent Skills format = write once, run across tools. *[refresh adopter count]*

**Talk prompts**
- What are the top three preference skills your company needs by Friday?
- Who maintains the skill library — and how do you review a skill like a PR?

---

#### D05-2 — Brand & GTM as preference skills (~15–20 min)
**Land:** Colors, voice, layout constraints, forbidden claims — loadable context, not a PDF nobody opens. Connect to D01-1.

**Talk prompts**
- Capability or preference: “generate PDF invoices” vs “never use Comic Sans / never promise ROI we can’t prove”?
- Preview-before-install: malicious skills are a supply-chain risk (tie to Phase 01 security posture).

**Secondary-window:** Draft Level-1 brand preference skill frontmatter + 10 instruction lines.

---

#### D05-3 — Skills vs rules vs memories (~10–15 min)
**Land:** Always-on constraints → rules/passport; on-demand workflows → skills; personal recall → memories. Mixing them is how teams confuse themselves.

| Layer | Job |
|-------|-----|
| Rules / AGENTS / CLAUDE.md | Always-on constraints |
| Skills | On-demand workflows & domain packs |
| Memories | Personal recall — not team truth |

### Optional (Phase 05)
- Marketplace hygiene and audit ritual (scripts? network? secrets?)

---

# Phase 06 — Model Eval Lab

*Long eval run = best teaching window of the week for **routing, procurement, and residency**.*

### Primary

#### D06-1 — Model routing (deep) (~25–30 min)
**Land:** Don’t leave the session on Fable/Opus forever. Policy examples: Haiku/Flash for navigation & lint; Sonnet-class for implementation; frontier for architecture; cascade escalate on failed verification. Harnesses will automate this — your job is the **policy and metrics** (cheap-share %, escalation rate, quality on golden prompts). *[refresh model names/prices]*

**Talk prompts**
- Design a three-tier route table for *your* team’s week.
- What signal means “escalate” (schema fail, test fail, human flag) vs “accept cheap”?
- How do you stop false escalations from erasing savings?

**Tie to lab:** Scatter plot = the routing dashboard’s cousin.

---

#### D06-2 — Eval-driven procurement (~20 min)
**Land:** Leaderboards measure someone else’s prompts. Buy and re-buy models with **your** golden set. Re-run when tags rotate.

**Talk prompts**
- What five prompts would your company put on the track Monday?
- Who owns the harness when a vendor ships a new “best” model?

---

#### D06-3 — Local vs hosted (privacy–cost–quality) (~15–20 min)
**Land:** Residency is part of routing. Sensitive data → local/Ollama or contracted ZDR; ceiling quality → API. Write the triangle into policy.

**Talk prompts**
- Which workloads must never leave the building?
- What’s the acceptable quality drop for air-gapped work?

---

#### D06-4 — Cost visibility (~10–15 min)
**Land:** Tokens are a first-class budget line. Parallel agents, long contexts, and frontier defaults are how SMBs get surprised. Visibility before blame.

**Talk prompts**
- Who sees the bill today?
- What’s a sane weekly cap per developer / per project?

### Optional (Phase 06)
- Correlated judges & when humans override the podium (already in lesson plan closing)

---

# Week close (Day 5 / final session)

*Synthesize into their adoption plan — even if Day 5 is “their repo” instead of Phase 06.*

### Primary

#### D-CLOSE-1 — Assemble the SMB AI development program (~30–40 min)
**Land:** Fill the seven-piece sketch from D00-6 with *their* names, tools, and owners. This is the course’s business deliverable. Use the [adoption kit](../adoption-kit/README.md) — one fill-in template per piece.

**Working agenda**
1. Harness + plan tier decision  
2. Passport location + first PR to create it  
3. Artifact folder convention  
4. Gate commands they’ll actually run  
5. Decision-boundary one-pager  
6. Routing + spend policy (even if manual for now)  
7. First brownfield target + safety card  

---

#### D-CLOSE-2 — Beyond engineering (~15–20 min)
**Land:** Same discipline for ops, marketing, finance agents — intention, context, verify. Small teams win when domain experts can drive the pipeline without becoming full-time engineers.

**Talk prompts**
- Who outside eng should get a seat in the next cohort of this workflow?
- What’s the first non-eng intention worth writing?

---

#### D-CLOSE-3 — What compounds vs what expires (~10 min)
**Land:** Specs, rules, preference skills, evals, and decision boundaries compound. Model brand loyalty and chat Memories expire. Invest accordingly.

---

## Suggested timing vs build windows

| Phase | While the machine runs, prefer… |
|-------|----------------------------------|
| 00 | D00-1, D00-2, D00-4 (seed), D00-5 |
| 01 | D01-1, D01-2, D01-3 |
| 02 | D02-1, D02-2, D02-3 |
| 03 | D03-1, D03-2, D03-3 |
| 04 | D04-1, D04-2, D04-3 |
| 05 | D05-1, D05-2, D05-3 |
| 06 | D06-1, D06-2, D06-3 (eval run is long — use it) |
| Close | D-CLOSE-1 (required), D-CLOSE-2 |

Heavy talks (D00-6, D01-1, D06-1, D-CLOSE-1) can also sit in dedicated lecture blocks if the build finishes early.

---

## Citation & refresh anchors

Pull current versions before teaching; themes are stable:

- **Routing / cost:** industry guides on cascade vs classifier routing; Anthropic/OpenAI model pricing pages *[refresh]*
- **Agentic trends:** Anthropic *2026 Agentic Coding Trends Report*; Forrester agentic SDLC; SIG *State of Software* (harness engineering framing)
- **Governance:** Tessl / engineering-leader writeups on agent governance (routing, evals, ownership)
- **Memory files:** [Claude Code memory docs](https://code.claude.com/docs/en/memory), [Cursor Rules](https://cursor.com/docs/rules), [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md), [Codex Memories](https://developers.openai.com/codex/memories)
- **Data / IP:** vendor enterprise privacy pages; consumer vs business training defaults *[refresh — policies move]*
- **Skills standard:** [agentskills.io](https://agentskills.io), Anthropic Skills engineering post

*Do not treat vendor marketing savings % as guarantees — teach the **mechanism** (route routine away from frontier; measure escalation) and let their Phase 06 data argue the numbers.*

---

## Relationship to other instructor docs

| Doc | Role |
|-----|------|
| [phase-XX.md](./README.md) | What you **talk about** for that phase’s tech thesis |
| [docs/phase-00/TEACHING.md](../../docs/phase-00/TEACHING.md) | Room mechanics, predict-then-compare |
| **This file** | Cross-cutting **business / harness / org** discussions, slotted by phase |
| Per-phase RUN-ORDER | What to type |

When a lesson plan says “nobody watches the bar — keep teaching,” prefer the **Primary** list for that phase above.
