# Demo-grade bar — Phase 04

Phase 04 succeeds when an observer can verify independent actors discovering, delegating, authorizing, transacting, and reporting—not when the dashboard merely animates.

## Pass

- All five services start independently.
- Agent Cards accurately describe endpoints, skills, and capabilities.
- Discovery visibly changes when a service becomes unavailable.
- At least two A2A delegations complete.
- One task exposes meaningful lifecycle state.
- The paid service first returns `402 Payment Required`.
- A mandate limits purpose, amount, and validity.
- The payment retry and result are visible.
- Protocol events stream to the UI.
- A learner can inspect and narrate one raw exchange.
- The class can distinguish tool invocation from delegated agency.
- The team identifies one trust or anti-abuse control missing from the demo.

## Fail

- Services are one process pretending to be independent agents.
- Cards advertise capabilities that do not exist.
- A direct REST call is labeled A2A without task semantics.
- Payment succeeds without an authorization decision.
- The UI claims a payment happened when no 402/retry exchange occurred.
- Raw messages are unavailable.
- The demo implies its mock mandate, proof, or signatures are production security.
- The discussion ends at protocol names and never reaches authority, reputation, or accountability.

## Excellent

- Failure, expiry, insufficient authority, duplicate requests, and agent unavailability are visible and understandable.
- The system separates the reputation of principal, agent, and provider.
- The demo includes an agent-friendly content response as the “first rung.”
- Learners can map the restaurant scenario to a real customer/vendor or Patron AI relationship.
- The proposed production design includes identity, mandate, rate limits, audit, intervention, and dispute handling.

