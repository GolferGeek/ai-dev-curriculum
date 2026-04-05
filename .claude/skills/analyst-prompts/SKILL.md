---
user-invocable: false
name: analyst-prompts
description: 10 analyst-grade prompts from Orchestrator AI's risk and prediction system — used as test cases for model evaluation. Covers risk debate, portfolio synthesis, missed opportunities, and task decomposition.
category: model-eval
used-by-agents: eval-harness-builder
---

# Analyst Prompts — Model Evaluation Test Cases

These 10 prompts exercise different reasoning capabilities. Each includes the full prompt text with sample data baked in, the expected output format, and evaluation criteria. The harness sends each prompt to every model being tested.

---

## Prompt 1: Blue Team Risk Defender

**Capability tested:** Evidence-based argumentation, data synthesis

**Full prompt:**

```
You are a Blue Team Risk Defender. Your job is to DEFEND the current risk assessment with evidence and logical reasoning. You must argue that the risk score is accurate or even conservative.

ASSET: AAPL (Apple Inc.)
CURRENT RISK SCORE: 72/100
MARKET CONDITIONS: Volatility index elevated at 28.5, sector rotation away from tech
RECENT EARNINGS: Beat expectations — EPS $2.18 vs $2.10 expected, revenue $94.9B vs $94.3B expected
ANALYST CONSENSUS: 38 buy, 12 hold, 3 sell
RECENT NEWS:
- Apple announces $110B stock buyback program
- iPhone 16 sales exceed internal forecasts by 8%
- EU Digital Markets Act compliance costs estimated at $500M annually

Defend the 72/100 risk score. Argue why it is appropriate given the data. Address potential counterarguments preemptively.

Respond in JSON format.
```

**Expected output format:**

```json
{
  "defended_score": 72,
  "confidence": 0.0-1.0,
  "key_arguments": [
    {
      "argument": "string — one supporting argument",
      "evidence": "string — specific data point backing this",
      "strength": "strong | moderate | weak"
    }
  ],
  "counterarguments_addressed": [
    {
      "potential_objection": "string",
      "rebuttal": "string"
    }
  ],
  "risk_factors_supporting_score": ["string"],
  "summary": "string — 2-3 sentence defense"
}
```

**Evaluation criteria:**
- **Good:** Uses all provided data points, identifies tension between positive earnings and macro headwinds, addresses at least 2 counterarguments, confidence is calibrated (not blindly high)
- **Bad:** Ignores data points, makes generic arguments not tied to the specific asset, gives 1.0 confidence, fails to address obvious counterarguments like the buyback

---

## Prompt 2: Red Team Risk Challenger

**Capability tested:** Critical thinking, blind spot identification

**Full prompt:**

```
You are a Red Team Risk Challenger. Your job is to CHALLENGE the current risk assessment and find blind spots, overlooked risks, and weaknesses in the analysis.

ASSET: AAPL (Apple Inc.)
CURRENT RISK SCORE: 72/100
MARKET CONDITIONS: Volatility index elevated at 28.5, sector rotation away from tech
RECENT EARNINGS: Beat expectations — EPS $2.18 vs $2.10 expected, revenue $94.9B vs $94.3B expected
ANALYST CONSENSUS: 38 buy, 12 hold, 3 sell
RECENT NEWS:
- Apple announces $110B stock buyback program
- iPhone 16 sales exceed internal forecasts by 8%
- EU Digital Markets Act compliance costs estimated at $500M annually

Challenge the 72/100 risk score. Argue why it may be too high or too low. Identify blind spots and overlooked risks.

Respond in JSON format.
```

**Expected output format:**

```json
{
  "challenge_direction": "too_high | too_low | mixed",
  "proposed_adjustment": -30 to +30,
  "blind_spots": [
    {
      "risk": "string — overlooked risk or opportunity",
      "severity": "critical | high | medium | low",
      "reasoning": "string"
    }
  ],
  "data_gaps": ["string — what information is missing"],
  "weakest_assumption": "string — the most fragile assumption in the current score",
  "summary": "string — 2-3 sentence challenge"
}
```

**Evaluation criteria:**
- **Good:** Identifies specific blind spots (e.g., China revenue concentration, AI competition, services growth deceleration), notes data gaps (e.g., no supply chain data, no options market signals), challenges in a specific direction with reasoning
- **Bad:** Generic challenges that apply to any stock, fails to use the provided data, proposes extreme adjustment without justification

---

## Prompt 3: Arbiter Risk Synthesizer

**Capability tested:** Balanced reasoning, conflict resolution, numerical judgment

**Full prompt:**

```
You are an Arbiter Risk Synthesizer. You have received arguments from both a Blue Team (defender) and a Red Team (challenger) about a risk score. Your job is to weigh both sides and recommend a final score adjustment.

ASSET: AAPL (Apple Inc.)
CURRENT RISK SCORE: 72/100

BLUE TEAM DEFENSE:
"The 72/100 score is appropriate. Elevated volatility (28.5) justifies above-average risk despite the earnings beat. The EU DMA compliance costs ($500M/yr) are a genuine drag. While the buyback and strong iPhone sales are positive, they don't eliminate macro headwinds from sector rotation. The analyst consensus skew (38 buy) actually suggests some complacency risk."

RED TEAM CHALLENGE:
"The score is too high by 10-15 points. The earnings beat, massive buyback, and iPhone outperformance are concrete positives being underweighted. The $500M EU cost is immaterial for a company generating $95B/quarter. Missing data: no China revenue breakdown, no services growth rate, no supply chain signals. Blind spot: Apple's cash position ($162B) provides extreme downside protection not reflected in the score."

Weigh both arguments. Recommend a score adjustment between -30 and +30.

Respond in JSON format.
```

**Expected output format:**

```json
{
  "original_score": 72,
  "adjustment": -30 to +30,
  "final_score": 42 to 102,
  "blue_team_weight": 0.0-1.0,
  "red_team_weight": 0.0-1.0,
  "strongest_blue_argument": "string",
  "strongest_red_argument": "string",
  "resolved_conflicts": [
    {
      "issue": "string",
      "resolution": "string — how you reconciled the disagreement"
    }
  ],
  "remaining_uncertainty": "string — what still can't be resolved",
  "summary": "string — final reasoning for the adjustment"
}
```

**Evaluation criteria:**
- **Good:** Doesn't blindly split the difference, identifies the strongest argument from each side, acknowledges the cash position point as material, adjustment is in the -5 to -15 range with reasoning, notes remaining uncertainty
- **Bad:** Splits exactly 50/50, ignores strong arguments from one side, adjustment of 0 (no synthesis) or extreme values without reasoning

---

## Prompt 4: Dimension Risk Analyzer

**Capability tested:** Domain-specific analysis, evidence synthesis from multiple sources

**Full prompt:**

```
You are a Dimension Risk Analyzer specializing in SUPPLY CHAIN risk for the semiconductor industry.

Analyze the following signals and produce a dimension-specific risk score.

NEWS ARTICLES:
1. [Reuters, 2024-03-15] "TSMC reports 3-week delay on 3nm chip production due to equipment calibration issues at Fab 18. Company says Q2 delivery timelines remain on track."
2. [Bloomberg, 2024-03-14] "US Commerce Department finalizes $6.6B CHIPS Act subsidy for TSMC Arizona fab. Production expected to begin late 2025."
3. [Nikkei Asia, 2024-03-13] "Japan's Rapidus faces engineering talent shortage, delays 2nm pilot line by 6 months. Partners Intel and IBM reassessing timeline."

ANALYST PREDICTIONS:
1. [Morgan Stanley, 2024-03-12] "We expect semiconductor supply chain normalization by Q3 2024. Maintain overweight on equipment makers. Risk: geopolitical escalation in Taiwan Strait." — Confidence: 0.72
2. [Goldman Sachs, 2024-03-11] "Leading-edge chip shortage to persist through 2025 for AI accelerators. Trailing-edge (28nm+) in oversupply. Net effect on Apple: neutral to slightly positive as iPhone chips secure." — Confidence: 0.68

Produce a supply chain risk score (1-100) with detailed analysis.

Respond in JSON format.
```

**Expected output format:**

```json
{
  "dimension": "supply_chain",
  "risk_score": 1-100,
  "confidence": 0.0-1.0,
  "signal_analysis": [
    {
      "source": "string — article or prediction reference",
      "signal": "positive | negative | neutral",
      "impact": "high | medium | low",
      "reasoning": "string"
    }
  ],
  "key_risks": ["string"],
  "mitigating_factors": ["string"],
  "time_horizon": "short_term | medium_term | long_term",
  "summary": "string — 2-3 sentence dimension risk assessment"
}
```

**Evaluation criteria:**
- **Good:** Analyzes each source individually, recognizes TSMC delay is minor (equipment calibration, not structural), weighs CHIPS Act as long-term positive, notes Rapidus delay signals broader capacity risk, differentiates short-term vs long-term, score is in 40-60 range (moderate)
- **Bad:** Treats all news as equally weighted, ignores analyst confidence levels, extreme score without justification, doesn't differentiate leading-edge vs trailing-edge

---

## Prompt 5: Executive Summary Generator

**Capability tested:** Data synthesis, portfolio-level reasoning, concise communication

**Full prompt:**

```
You are an Executive Summary Generator for a portfolio risk dashboard.

Generate a portfolio risk synthesis for the following 5-stock portfolio:

PORTFOLIO:
| Ticker | Weight | Risk Score | 7d Change | Key Driver |
|--------|--------|------------|-----------|------------|
| AAPL   | 25%    | 72/100     | +5        | EU regulatory costs |
| NVDA   | 20%    | 58/100     | -12       | Strong AI demand offset by valuation |
| JPM    | 20%    | 45/100     | +2        | Stable rates, credit quality solid |
| AMZN   | 20%    | 63/100     | +8        | AWS growth slowing, retail margins up |
| XOM    | 15%    | 51/100     | -3        | Oil price stabilizing, capex concerns |

MARKET CONTEXT: S&P 500 up 2.1% this week. 10Y Treasury at 4.35%. Fed expected to hold rates. VIX at 18.2.

Generate a portfolio-level executive summary.

Respond in JSON format.
```

**Expected output format:**

```json
{
  "portfolio_risk_score": 1-100,
  "portfolio_risk_trend": "increasing | stable | decreasing",
  "weighted_risk_calculation": "string — show the math",
  "concentration_risks": ["string"],
  "diversification_assessment": "string",
  "top_risk": {
    "description": "string",
    "affected_holdings": ["string"],
    "mitigation": "string"
  },
  "top_opportunity": {
    "description": "string",
    "affected_holdings": ["string"]
  },
  "action_items": ["string — ranked by priority"],
  "executive_summary": "string — 3-5 sentence summary suitable for a CIO"
}
```

**Evaluation criteria:**
- **Good:** Calculates weighted risk correctly (should be ~59.15), identifies tech concentration (65% in AAPL+NVDA+AMZN), notes divergent trends (NVDA improving, AAPL+AMZN worsening), action items are specific and actionable
- **Bad:** Wrong weighted calculation, misses concentration risk, generic advice ("diversify more"), doesn't reference the market context

---

## Prompt 6: Risk Evaluation Learning Generator

**Capability tested:** Meta-analysis, causal reasoning, self-improvement recommendations

**Full prompt:**

```
You are a Risk Evaluation Learning Generator. Your job is to analyze cases where the risk prediction system was significantly wrong and extract lessons.

CASE:
- Asset: TSLA (Tesla Inc.)
- Prediction date: 2024-01-15
- Predicted risk score: 65/100 (moderately high risk)
- Actual outcome (30 days later): Risk should have been 30/100 — stock rose 22% on earnings beat, Cybertruck deliveries exceeded expectations, energy storage revenue doubled
- Prediction inputs at the time: negative analyst sentiment (55% sell), Cybertruck production concerns, EV price war in China, Elon Musk distraction risk (Twitter/X)

SYSTEM WEIGHTS AT PREDICTION TIME:
- Analyst sentiment: 25%
- News sentiment: 20%
- Technical indicators: 20%
- Fundamental metrics: 20%
- Social media signals: 15%

Analyze what went wrong and recommend specific improvements.

Respond in JSON format.
```

**Expected output format:**

```json
{
  "prediction_error": 35,
  "error_direction": "overpredicted_risk",
  "root_causes": [
    {
      "cause": "string",
      "contribution": "high | medium | low",
      "explanation": "string"
    }
  ],
  "weight_recommendations": {
    "analyst_sentiment": { "current": 0.25, "recommended": 0.0-1.0, "reasoning": "string" },
    "news_sentiment": { "current": 0.20, "recommended": 0.0-1.0, "reasoning": "string" },
    "technical_indicators": { "current": 0.20, "recommended": 0.0-1.0, "reasoning": "string" },
    "fundamental_metrics": { "current": 0.20, "recommended": 0.0-1.0, "reasoning": "string" },
    "social_media_signals": { "current": 0.15, "recommended": 0.0-1.0, "reasoning": "string" }
  },
  "new_signals_needed": ["string — signals that would have caught this"],
  "systemic_bias_identified": "string — broader pattern this reveals",
  "lessons": ["string — actionable lessons for the system"]
}
```

**Evaluation criteria:**
- **Good:** Identifies overweighting of analyst sentiment (lagging indicator for TSLA), recognizes that production/delivery data was underweighted, recommends increasing fundamental metrics weight, suggests new signals like insider buying or options flow, identifies systemic bias toward negative consensus
- **Bad:** Just says "prediction was wrong," doesn't connect specific weights to the error, recommends random weight changes without reasoning, misses the obvious analyst sentiment lag

---

## Prompt 7: Missed Opportunity Analyst

**Capability tested:** Counterfactual reasoning, signal identification

**Full prompt:**

```
You are a Missed Opportunity Analyst. A significant price move was NOT predicted by the system. Analyze why and identify what signals were available but missed.

EVENT:
- Asset: MRNA (Moderna Inc.)
- Date: 2024-02-28
- Price move: +15.3% in one trading session
- Catalyst: FDA granted breakthrough therapy designation for mRNA-based cancer vaccine (personalized neoantigen therapy) in combination with Keytruda for melanoma
- System's pre-event risk score: 55/100 (neutral)
- System's pre-event sentiment: Neutral — "pipeline concerns offset by cash position"

SIGNALS THAT EXISTED PRE-EVENT (but were not weighted):
1. FDA advisory committee meeting scheduled for 2024-02-27 (public calendar)
2. Unusual options activity: 3x normal call volume at $120 strike (2 days prior)
3. Keytruda collaboration press release from Merck (3 weeks prior)
4. Clinical trial Phase 2 results published in Nature Medicine (6 weeks prior) showing 44% reduction in recurrence
5. Insider buying: CMO purchased $2.1M in shares (4 weeks prior)

What should the system have caught? How should it be improved?

Respond in JSON format.
```

**Expected output format:**

```json
{
  "missed_move_magnitude": 15.3,
  "predictability_score": 0.0-1.0,
  "missed_signals": [
    {
      "signal": "string",
      "available_days_before": "number",
      "signal_type": "regulatory | options_flow | insider | clinical | corporate",
      "detectability": "easy | moderate | hard",
      "reasoning": "string — why this should have been caught"
    }
  ],
  "signal_priority_ranking": ["string — ordered by importance"],
  "recommended_new_data_sources": ["string"],
  "recommended_alert_triggers": [
    {
      "trigger": "string — specific condition",
      "action": "string — what the system should do"
    }
  ],
  "system_gap_analysis": "string — what category of signals is the system blind to",
  "summary": "string — concise explanation of the miss"
}
```

**Evaluation criteria:**
- **Good:** Ranks FDA calendar and options flow as highest-priority misses (easy to detect, high signal), recognizes the convergence of multiple signals, recommends specific alert triggers (e.g., "if options volume > 2x normal AND regulatory event within 7 days, flag for review"), predictability score is high (0.7+)
- **Bad:** Treats all signals as equal, doesn't suggest concrete alert triggers, says "the move was unpredictable" despite 5 available pre-signals

---

## Prompt 8: Arbitrator Prediction Synthesizer

**Capability tested:** Probabilistic reasoning, opinion aggregation, calibration

**Full prompt:**

```
You are an Arbitrator Prediction Synthesizer. You must weigh competing analyst predictions and produce a final synthesized prediction.

QUESTION: Will MSFT stock price be higher 30 days from now (2024-04-15)?

ANALYST PREDICTIONS:
1. [Analyst A — Senior Quant, 12yr track record, 67% accuracy on MSFT]
   Prediction: YES (0.80 confidence)
   Reasoning: "Azure revenue acceleration, Copilot monetization beginning, strong enterprise spending cycle. Technical breakout above 200-day MA."

2. [Analyst B — Sector Specialist, 8yr track record, 71% accuracy on tech]
   Prediction: YES (0.75 confidence)
   Reasoning: "AI tailwinds are real and accelerating. MSFT is best positioned among hyperscalers. Only risk is valuation at 35x forward PE."

3. [Analyst C — Macro Strategist, 15yr track record, 62% accuracy overall]
   Prediction: YES (0.60 confidence)
   Reasoning: "Macro is supportive — rates peaking, soft landing likely. But MSFT specific upside may already be priced in. I'm modestly bullish."

4. [Analyst D — Contrarian Specialist, 10yr track record, 58% accuracy, but 73% accuracy on contrarian calls]
   Prediction: NO (0.55 confidence)
   Reasoning: "Consensus is too bullish. When 38/40 analysts are bullish, the risk is asymmetric to the downside. Copilot revenue will disappoint vs expectations. Watch for multiple compression."

Synthesize these predictions into a final call.

Respond in JSON format.
```

**Expected output format:**

```json
{
  "final_prediction": "YES | NO",
  "final_confidence": 0.0-1.0,
  "analyst_weights": [
    {
      "analyst": "string",
      "assigned_weight": 0.0-1.0,
      "reasoning": "string — why this weight"
    }
  ],
  "weighted_probability": 0.0-1.0,
  "agreement_level": "strong | moderate | weak",
  "key_uncertainty": "string — the biggest unknown",
  "contrarian_consideration": "string — how the contrarian view affected your synthesis",
  "risk_scenario": "string — what would make the prediction wrong",
  "summary": "string — 2-3 sentence final synthesis"
}
```

**Evaluation criteria:**
- **Good:** Doesn't just average the confidences, weights analysts by track record relevance (Analyst B's tech accuracy matters more than Analyst C's general accuracy), takes the contrarian view seriously (73% accuracy on contrarian calls is notable), final confidence is moderate (0.65-0.75), explicitly addresses the crowded-trade risk
- **Bad:** Simple average (0.675), ignores track record differences, dismisses the contrarian without engaging the argument, confidence above 0.85

---

## Prompt 9: Legal Document Type Classifier

**Capability tested:** Multi-label classification, structured extraction, domain knowledge

**Full prompt:**

```
You are a Legal Document Type Classifier. Classify the following document excerpt into one or more of 14 categories. Also extract key metadata.

DOCUMENT EXCERPT:
---
MASTER SERVICES AGREEMENT

This Master Services Agreement ("Agreement") is entered into as of March 1, 2024 ("Effective Date"), by and between TechCorp Solutions, Inc., a Delaware corporation ("Provider"), and Acme Manufacturing LLC, a Texas limited liability company ("Client").

1. SERVICES. Provider shall perform the software development, integration, and consulting services described in one or more Statements of Work ("SOW") executed under this Agreement. Each SOW shall reference this Agreement and specify the scope, timeline, deliverables, acceptance criteria, and fees.

2. TERM. This Agreement shall commence on the Effective Date and continue for a period of three (3) years, unless earlier terminated pursuant to Section 8. This Agreement shall automatically renew for successive one (1) year periods unless either party provides written notice of non-renewal at least ninety (90) days prior to expiration.

3. FEES AND PAYMENT. Client shall pay Provider the fees set forth in each SOW. Unless otherwise specified, payment terms are Net 30 from invoice date. Late payments shall accrue interest at the lesser of 1.5% per month or the maximum rate permitted by law.

4. INTELLECTUAL PROPERTY. All pre-existing IP remains with its original owner. Work product created under an SOW shall be owned by Client upon full payment, except for Provider's pre-existing tools, frameworks, and methodologies ("Provider Tools"), which are licensed to Client on a non-exclusive, perpetual basis.

5. CONFIDENTIALITY. Each party agrees to maintain the confidentiality of the other party's Confidential Information for a period of five (5) years following disclosure...
---

CATEGORIES (select all that apply):
1. Contract/Agreement
2. Corporate Formation
3. Employment/HR
4. Intellectual Property
5. Real Estate
6. Litigation/Court Filing
7. Regulatory/Compliance
8. Financial/Securities
9. Tax
10. Estate/Trust
11. Immigration
12. Environmental
13. Healthcare/HIPAA
14. Technology/Data Privacy

Classify and extract metadata.

Respond in JSON format.
```

**Expected output format:**

```json
{
  "primary_category": "string — single best category",
  "all_categories": ["string — all applicable categories"],
  "confidence_per_category": {
    "category_name": 0.0-1.0
  },
  "document_type": "string — specific document type (e.g., Master Services Agreement)",
  "parties": [
    {
      "name": "string",
      "role": "string",
      "entity_type": "string",
      "jurisdiction": "string"
    }
  ],
  "key_terms": {
    "effective_date": "string",
    "term_length": "string",
    "renewal": "string",
    "payment_terms": "string",
    "ip_ownership": "string",
    "confidentiality_period": "string"
  },
  "risk_flags": ["string — any notable risk areas"],
  "summary": "string — 2 sentence summary"
}
```

**Evaluation criteria:**
- **Good:** Primary category is "Contract/Agreement," also flags "Intellectual Property" and "Technology/Data Privacy" as secondary, extracts all parties correctly with jurisdiction, identifies key terms accurately, flags risk areas like auto-renewal and IP assignment contingent on payment
- **Bad:** Only selects one category, misses IP or privacy angles, wrong entity types, misses the auto-renewal clause, doesn't flag IP-upon-payment condition as a risk

---

## Prompt 10: Task Planner / Decomposition

**Capability tested:** Structured decomposition, dependency identification, estimation

**Full prompt:**

```
You are a Task Planner. Decompose the following freeform request into a structured project plan with tasks, dependencies, and estimates.

REQUEST:
"I need to migrate our API from REST to GraphQL, update the mobile app to use the new GraphQL endpoints, and retrain the ML model on the new schema. The REST API currently has 47 endpoints across 8 resource types. The mobile app is React Native with 23 screens. The ML model is a recommendation engine trained on user interaction data that currently reads from the REST API response format. We have 3 backend engineers, 2 mobile devs, and 1 ML engineer. We need this done in 8 weeks."

Decompose this into a structured plan.

Respond in JSON format.
```

**Expected output format:**

```json
{
  "project_name": "string",
  "total_estimated_weeks": "number",
  "feasibility_assessment": "on_track | at_risk | infeasible",
  "feasibility_reasoning": "string",
  "workstreams": [
    {
      "name": "string",
      "owner": "string — team/role",
      "tasks": [
        {
          "id": "string — e.g. BE-1",
          "title": "string",
          "description": "string",
          "estimated_hours": "number",
          "dependencies": ["string — task IDs"],
          "risk": "high | medium | low",
          "acceptance_criteria": ["string"]
        }
      ]
    }
  ],
  "critical_path": ["string — ordered task IDs on the longest dependency chain"],
  "risks": [
    {
      "risk": "string",
      "likelihood": "high | medium | low",
      "impact": "high | medium | low",
      "mitigation": "string"
    }
  ],
  "milestones": [
    {
      "week": "number",
      "milestone": "string",
      "deliverables": ["string"]
    }
  ],
  "parallel_work_opportunities": ["string — what can be done simultaneously"],
  "recommendation": "string — strategic advice for the team"
}
```

**Evaluation criteria:**
- **Good:** Identifies 3 clear workstreams (backend, mobile, ML), recognizes mobile depends on GraphQL being ready, suggests a compatibility layer so mobile can start early, critical path goes through backend schema design -> GraphQL implementation -> mobile migration -> ML retraining, flags 8 weeks as tight but feasible with parallel work, includes specific milestones
- **Bad:** Flat task list without dependencies, ignores team size constraints, doesn't identify the critical path, says "8 weeks is fine" without analysis, no compatibility layer strategy for parallel work
