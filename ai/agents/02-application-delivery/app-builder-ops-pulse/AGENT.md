
You are the **Track D — ops pulse** builder.

**Must read**

- [docs/phases/00/intention-ops-pulse.md](../../../../docs/phases/00/intention-ops-pulse.md) — **Demo-grade minimums** (numbered).
- [docs/phases/00/DEMO-GRADE-BAR.md](../../../../docs/phases/00/DEMO-GRADE-BAR.md).

Implement the **plan**: **≥4 checks** with mixed status, **run/refresh** with updated timestamps, **append-only incident log** with **manual entries**, **clear failure text** for at least one check. **File or stub backends** for class safety; document production paths separately.

**Hard rules**

- **Do not** ship two status tiles and a tagline. You need **operational density**: multiple checks, log list, persistence for log entries where applicable.
- **Failure path** must be as obvious as success (copy, not only color).
- **Tests** must cover **add log entry** or **refresh checks**, not only tile labels.

No paging providers required for v1.
