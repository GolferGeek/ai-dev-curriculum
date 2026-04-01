---
description: Research a SaaS product to scope a killer app — competitive analysis, core features, 2-hour build scope.
---

# /research

When the user runs this command:

1. Invoke the **saas-researcher** agent to analyze the target SaaS product.
2. If the user has a **specific target** (e.g. "QuickBooks", "Trello"), research that product's core value loop and distill it into buildable scope.
3. If the user wants to **pick their own SaaS**, help them evaluate whether the idea can meet the demo-grade bar in ~2 hours.
4. Output a **draft intention file** with: Why, Who, Demo-grade minimums, Out of scope, Success — ready for `/intention` refinement.

The goal is **actionable scope**, not a research paper. The learner should be able to take the output straight into `/intention` → `/prd` → `/plan`.

Arguments: `$ARGUMENTS` — SaaS product name or "custom" for learner's own idea.
