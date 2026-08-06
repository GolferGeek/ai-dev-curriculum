# 7 — Day-2 Safety Card

*The rules for agents on your real codebase — the first Monday and every day after. Taught in Phase 03 (talk D03-3).*

**Why this matters:** the course repos were disposable; your production repo is not. Code can be regenerated — a wrong change to a system nobody fully understands cannot. Comprehension first, smallest blast radius always.

## The card (print it, pin it)

1. **Read first.** Research before changing: orientation, entry/exit map, git history of the area you're touching.
2. **No secrets in prompts.** `.env`, credentials, customer PII never enter a chat, a Memory, or a pasted log.
3. **Smallest blast radius.** First AI-assisted tasks are low-risk: docs, tests, an isolated bug — not the payment path.
4. **Branch, never main.** Agents work on branches; humans merge.
5. **A human owns the change decision.** Every time.

## Your first targets

| Question | Your answer |
|----------|-------------|
| First repo agents are allowed into | |
| Paths / systems that are **off-limits** for now | |
| 2–3 low-risk backlog items for the first AI-assisted PRs | |
| Who signs off on the first AI-assisted PR to production? | |
| Minimum research packet before touching an unfamiliar area | orientation + map + risk notes |

Classify the first target in [11 — GRC Control Map](11-grc-control-map.md).
Record the data involved, required evidence, rollback or recovery action,
monitoring signal, stop condition, and authorized residual-risk decision before
expanding beyond low-risk work.

## Policy lines

- Off-limits means off-limits — encode it in the passport's Boundaries section (template 2), not just this card.
- Expand agent access one system at a time, after a clean track record — not because a deadline is loud.

## Owner

| Role | Name |
|------|------|
| Owns the off-limits list and access expansion | |
