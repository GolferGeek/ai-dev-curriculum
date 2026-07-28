# Phase 04 — PowerPoint presenter guide

This is the plain-language script for `phase-04-agent-to-agent-future.pptx`.

You do not need to recite it. Use the **Say**, **Ask**, and **Transition** lines to keep the story moving.

## Slides 1–2 — Establish the destination

**Say:** “This phase is about a change in how companies are reached. Websites made companies reachable by people. Agent interfaces will make companies reachable by software acting for those people and for other companies.”

**Ask:** “If a customer’s agent arrived at your company tomorrow, what could it actually do?”

**Transition:** “Before we discuss protocols, let’s make the visitor concrete.”

## Slides 3–4 — Person visit versus agent visit

**Say:** “A human can tolerate navigation, branding, and missing structure. An agent wants facts, provenance, policy, and an action path. The company must also know who that agent represents.”

**Ask:** “Which information on your homepage would an agent have difficulty interpreting correctly?”

**Transition:** “There is an easy first improvement.”

## Slides 5–6 — The first rung

**Say:** “Return Markdown or structured data when an agent requests it. That makes the company easier to read. But reading is not a relationship. It cannot maintain a task, negotiate, or make a commitment.”

**Ask:** “What is one page or process at your company that should have a clean machine-readable version?”

**Transition:** “To go further, we must distinguish a tool from another actor.”

## Slides 7–10 — MCP versus A2A

**Say:** “MCP gives the controlling AI application access to capabilities. A2A lets one independent agent delegate a goal to another independent agent. MCP can be bidirectional; the difference is the delegation boundary.”

Use the examples:

- MCP: “Read my unread messages.”
- A2A: “Find candidates matching this goal and return with evidence.”

**Ask:** “If the remote system decides how to complete the goal and maintains task state, does it feel more like a tool or a counterparty?”

**Transition:** “Now let’s put agents on both sides of a real market.”

## Slides 11–14 — Patron AI

**Say:** “A candidate’s agent carries goals, constraints, evidence, and permission to communicate. A company agent publishes opportunities, asks questions, protects private information, and routes good matches to humans.”

**Say:** “This is not an argument for scraping LinkedIn or Indeed. Those platforms restrict unauthorized automation. Patron AI’s opportunity is to design the marketplace for authorized agents from the start.”

**Ask:** “What should a company agent ask before it gives a candidate a human’s attention?”

**Transition:** “The minute outreach becomes cheap, a new market problem appears.”

## Slides 15–17 — Attention and reputation

**Say:** “An agent can submit 480 applications. The sender’s cost approaches zero, but the employer still pays the filtering cost. The platform must measure relevance, evidence, and respect for boundaries—not raw activity.”

**Ask:** “Should a poor agent configuration permanently hurt the human’s reputation?”

**Land:** Separate reputation for the principal, the agent instance, the provider, and the claims presented.

**Transition:** “Employment is only one example. The same relationship appears between companies.”

## Slides 18–20 — Vendor and customer agents

Read the dialogue aloud:

1. “Your invoice is ready.”
2. “Does it match our purchase order?”
3. “Yes; here is the evidence.”
4. “It is within policy. Submit payment.”
5. “We need ten more widgets.”
6. “Here are two compliant options.”
7. “Order the approved option.”
8. “Your widgets are on the way.”

**Say:** “This is not just eight API calls. It is a continuing relationship with identity, authority, evidence, commitments, payment, and fulfillment.”

**Transition:** “Now the protocol names have jobs to do.”

## Slides 21–27 — Protocol map

Introduce one protocol at a time:

- A2A finds an agent and manages delegated work.
- MCP gives each agent access to its own tools and data.
- AP2 records authorization and spending limits.
- x402 requests and executes payment for an HTTP resource.
- AG-UI makes the work visible to the human.

**Say:** “AP2 and x402 are not the same. AP2 answers ‘was this allowed?’ x402 answers ‘how does this resource get paid?’”

**Ask:** “Which layer would detect that the price is within the payment rail but outside the user’s permitted budget?” Answer: authorization or policy, not settlement.

**Transition:** “Our demo puts these layers into one visible story.”

## Slides 28–34 — The restaurant demo

### Discover

**Say:** “The orchestrator retrieves Agent Cards. A card is a machine-readable business card: identity, endpoint, capabilities, authentication requirements, and skills.”

### Ask

**Say:** “The orchestrator gives specialists a goal. We are looking for task delegation and state—not merely an HTTP request.”

### Pay

**Say:** “The booking agent hits the premium-data service. It receives 402. The mandate is checked. The demo creates mock proof and retries.”

### Explore

**Say:** “The raw exchange is the evidence. We should identify source, target, method, parameters, state, result, authorization, and payment challenge.”

**Ask:** “If the UI said payment succeeded but there were no 402 and retry events, would you believe it?”

**Transition:** “The restaurant story is small. The design questions are universal.”

## Slides 35–37 — Transfer to the company

Walk through:

- Surface
- Identity
- Authority
- Policy
- Evidence
- Attention
- Intervention
- Accountability

**Ask each learner:** “What is your company’s first narrow agent-facing capability?”

Close:

> “Publish narrowly. Bound authority. Protect attention. Keep human control.”

