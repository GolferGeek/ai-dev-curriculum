# Harnesses and models

status: draft
owner: UNASSIGNED
last-reviewed: 2026-07-28
next-review: 2026-08-28
applies-to: organization

This facet governs the interfaces, model providers, routing rules, spend, and
portability choices used for software development.

## Curriculum baseline

- Cursor IDE is the recommended common environment because developers can keep
  code, terminals, source control, and multiple project/agent conversations in
  one interface.
- Claude Code and Codex are fully supported primary harnesses.
- Developers may use Cursor's agent interface or launch Claude Code or Codex
  through the terminal or supported editor integrations.
- Client procurement, security, data, and provider policy overrides personal
  preference.
- Canonical documents, skills, and agents remain in the repository so a
  harness change does not erase organizational knowledge.
- A harness may constrain available model providers. Multi-provider access can
  also change because of product strategy, acquisition, pricing, or terms;
  treat vendor politics as dated terrain rather than permanent fact.

These are course defaults, not an unnamed client's approved policy.

## Decisions the client must make

- Approved harnesses, versions, deployment modes, and account types.
- Approved model providers and models by data classification and task.
- Whether local, private, or hosted inference is required.
- Routing rules for quality, latency, context, modality, and cost.
- Budget alerts, hard limits, fallback, and outage behavior.
- Telemetry, retention, training-use, residency, and administrator controls.
- Plugin, extension, CLI, MCP, and network installation policy.
- Evaluation cadence and retirement response.

## Required controls

- Model names in code or docs must be configurable and dated.
- Routing changes require workload-specific evaluation.
- Secrets must use approved secret storage.
- Every provider needs an exit path and exportable organizational memory.
- Fallback must not silently send restricted data to a less trusted provider.
- Usage and cost reporting must support team and project accountability.

## Ask this facet

- Which harness and model may I use for this repository and data?
- Can I send this code or customer artifact to a hosted model?
- May I choose a different model inside Cursor?
- What model should handle planning, coding, review, images, or long context?
- What happens if the preferred provider is unavailable?
- When was our routing decision last tested against real work?

## Evidence and review triggers

Link approved provider terms, privacy/security review, model evaluations, spend
reports, incident history, and decision records here. Re-review on model
retirement, material capability change, provider ownership or terms change,
security event, cost anomaly, or a new regulated data class.
