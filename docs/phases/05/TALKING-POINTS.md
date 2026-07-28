# Phase 05 — Talking points

## Skills and agents are different

- A **skill** packages reusable instructions, references, scripts, and assets
  that help an agent perform a kind of work.
- A **specialized agent** is a delegated role with a purpose, operating
  instructions, tools, and authority boundaries.
- A **rule** constrains behavior broadly; a **tool** supplies an external
  capability; **memory** preserves facts and decisions; **code** implements the
  product.
- Use the smallest mechanism that solves the problem. Do not turn every note
  into a skill or every workflow into a delegated agent.

## Functional organization

- Humans browse capabilities by the work they need to do: planning, delivery,
  quality, research, protocols, governance, or evaluation.
- The canonical `ai/` library therefore uses nested function groups.
- Tool runtimes may require flat directories. Generation preserves stable
  names while translating layout and metadata.
- The generated copies are deployment artifacts; canonical content is the
  organizational source.

## Behavioral and supply-chain dependencies

- A capability can affect commands, files, network access, credentials, and
  downstream agent behavior.
- Popularity helps discovery but is not trust evidence.
- Review the exact revision, all bundled files, dependencies, scripts, and
  requested authority.
- A good description is also a trigger contract. Test when it should activate,
  when it should not, and what happens when capabilities overlap.

## Scope and lifecycle

- Personal experimentation, project/team adoption, and organizational
  publication carry different authority and review obligations.
- Approval belongs to a revision, scope, and policy—not permanently to a name.
- Every adopted capability needs an owner, outcome, review interval, and
  event-driven re-review trigger.
- Upstream change, local modification, tool-format change, security findings,
  poor outcomes, or owner departure can all require re-review.

## Product thesis

- Search makes discovery usable.
- Full-file preview makes informed inspection possible.
- A matrix makes scope, risk, maturity, and ownership discussable.
- Recurring scouting makes ecosystem change visible.
- A locator informs decisions; a registry records and enforces them.

## The sentence to remember

> Treat AI instructions with the same seriousness as code dependencies:
> discover widely, pin precisely, test behavior, limit authority, and keep an
> owner.
