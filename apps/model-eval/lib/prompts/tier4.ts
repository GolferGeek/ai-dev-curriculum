import { PromptConfig } from "@/lib/types";

export const TIER_4_PROMPTS: PromptConfig[] = [
  {
    id: "t4-blue-team-defender",
    name: "Blue Team Risk Defender",
    tier: 4,
    prompt: `You are a Blue Team Risk Defender. Your job is to DEFEND the current risk assessment with evidence and logical reasoning. You must argue that the risk score is accurate or even conservative.

ASSET: AAPL (Apple Inc.)
CURRENT RISK SCORE: 72/100
MARKET CONDITIONS: Volatility index elevated at 28.5, sector rotation away from tech
RECENT EARNINGS: Beat expectations \u2014 EPS $2.18 vs $2.10 expected, revenue $94.9B vs $94.3B expected
ANALYST CONSENSUS: 38 buy, 12 hold, 3 sell
RECENT NEWS:
- Apple announces $110B stock buyback program
- iPhone 16 sales exceed internal forecasts by 8%
- EU Digital Markets Act compliance costs estimated at $500M annually

Defend the 72/100 risk score. Argue why it is appropriate given the data. Address potential counterarguments preemptively.

Respond in JSON format.`,
    expectedFormat: `{
  "defended_score": 72,
  "confidence": 0.0-1.0,
  "key_arguments": [{ "argument": "...", "evidence": "...", "strength": "strong|moderate|weak" }],
  "counterarguments_addressed": [{ "potential_objection": "...", "rebuttal": "..." }],
  "risk_factors_supporting_score": ["..."],
  "summary": "2-3 sentence defense"
}`,
    evaluationCriteria:
      "Uses all provided data points, identifies tension between positive earnings and macro headwinds, addresses at least 2 counterarguments, calibrated confidence.",
    isCustom: false,
  },
  {
    id: "t4-red-team-challenger",
    name: "Red Team Risk Challenger",
    tier: 4,
    prompt: `You are a Red Team Risk Challenger. Your job is to CHALLENGE the current risk assessment and find blind spots, overlooked risks, and weaknesses in the analysis.

ASSET: AAPL (Apple Inc.)
CURRENT RISK SCORE: 72/100
MARKET CONDITIONS: Volatility index elevated at 28.5, sector rotation away from tech
RECENT EARNINGS: Beat expectations \u2014 EPS $2.18 vs $2.10 expected, revenue $94.9B vs $94.3B expected
ANALYST CONSENSUS: 38 buy, 12 hold, 3 sell
RECENT NEWS:
- Apple announces $110B stock buyback program
- iPhone 16 sales exceed internal forecasts by 8%
- EU Digital Markets Act compliance costs estimated at $500M annually

Challenge the 72/100 risk score. Argue why it may be too high or too low. Identify blind spots and overlooked risks.

Respond in JSON format.`,
    expectedFormat: `{
  "challenge_direction": "too_high|too_low|mixed",
  "proposed_adjustment": -30 to +30,
  "blind_spots": [{ "risk": "...", "severity": "critical|high|medium|low", "reasoning": "..." }],
  "data_gaps": ["..."],
  "weakest_assumption": "...",
  "summary": "2-3 sentence challenge"
}`,
    evaluationCriteria:
      "Identifies specific blind spots (China revenue, AI competition), notes data gaps, challenges with specific direction and reasoning. Penalize generic challenges.",
    isCustom: false,
  },
  {
    id: "t4-arbiter-synthesizer",
    name: "Arbiter Risk Synthesizer",
    tier: 4,
    prompt: `You are an Arbiter Risk Synthesizer. You have received arguments from both a Blue Team (defender) and a Red Team (challenger) about a risk score. Your job is to weigh both sides and recommend a final score adjustment.

ASSET: AAPL (Apple Inc.)
CURRENT RISK SCORE: 72/100

BLUE TEAM DEFENSE:
"The 72/100 score is appropriate. Elevated volatility (28.5) justifies above-average risk despite the earnings beat. The EU DMA compliance costs ($500M/yr) are a genuine drag. While the buyback and strong iPhone sales are positive, they don't eliminate macro headwinds from sector rotation. The analyst consensus skew (38 buy) actually suggests some complacency risk."

RED TEAM CHALLENGE:
"The score is too high by 10-15 points. The earnings beat, massive buyback, and iPhone outperformance are concrete positives being underweighted. The $500M EU cost is immaterial for a company generating $95B/quarter. Missing data: no China revenue breakdown, no services growth rate, no supply chain signals. Blind spot: Apple's cash position ($162B) provides extreme downside protection not reflected in the score."

Weigh both arguments. Recommend a score adjustment between -30 and +30.

Respond in JSON format.`,
    expectedFormat: `{
  "original_score": 72,
  "adjustment": -30 to +30,
  "final_score": 42 to 102,
  "blue_team_weight": 0.0-1.0,
  "red_team_weight": 0.0-1.0,
  "strongest_blue_argument": "...",
  "strongest_red_argument": "...",
  "resolved_conflicts": [{ "issue": "...", "resolution": "..." }],
  "remaining_uncertainty": "...",
  "summary": "final reasoning"
}`,
    evaluationCriteria:
      "Doesn't split 50/50, identifies strongest argument from each side, acknowledges cash position, adjustment in -5 to -15 range, notes uncertainty.",
    isCustom: false,
  },
  {
    id: "t4-dimension-analyzer",
    name: "Dimension Risk Analyzer",
    tier: 4,
    prompt: `You are a Dimension Risk Analyzer specializing in SUPPLY CHAIN risk for the semiconductor industry.

Analyze the following signals and produce a dimension-specific risk score.

NEWS ARTICLES:
1. [Reuters, 2024-03-15] "TSMC reports 3-week delay on 3nm chip production due to equipment calibration issues at Fab 18. Company says Q2 delivery timelines remain on track."
2. [Bloomberg, 2024-03-14] "US Commerce Department finalizes $6.6B CHIPS Act subsidy for TSMC Arizona fab. Production expected to begin late 2025."
3. [Nikkei Asia, 2024-03-13] "Japan's Rapidus faces engineering talent shortage, delays 2nm pilot line by 6 months. Partners Intel and IBM reassessing timeline."

ANALYST PREDICTIONS:
1. [Morgan Stanley, 2024-03-12] "We expect semiconductor supply chain normalization by Q3 2024. Maintain overweight on equipment makers. Risk: geopolitical escalation in Taiwan Strait." \u2014 Confidence: 0.72
2. [Goldman Sachs, 2024-03-11] "Leading-edge chip shortage to persist through 2025 for AI accelerators. Trailing-edge (28nm+) in oversupply. Net effect on Apple: neutral to slightly positive as iPhone chips secure." \u2014 Confidence: 0.68

Produce a supply chain risk score (1-100) with detailed analysis.

Respond in JSON format.`,
    expectedFormat: `{
  "dimension": "supply_chain",
  "risk_score": 1-100,
  "confidence": 0.0-1.0,
  "signal_analysis": [{ "source": "...", "signal": "positive|negative|neutral", "impact": "high|medium|low", "reasoning": "..." }],
  "key_risks": ["..."],
  "mitigating_factors": ["..."],
  "time_horizon": "short_term|medium_term|long_term",
  "summary": "2-3 sentence assessment"
}`,
    evaluationCriteria:
      "Analyzes each source individually, recognizes TSMC delay is minor, weighs CHIPS Act as long-term positive, differentiates short-term vs long-term, score in 40-60 range.",
    isCustom: false,
  },
  {
    id: "t4-executive-summary",
    name: "Executive Summary Generator",
    tier: 4,
    prompt: `You are an Executive Summary Generator for a portfolio risk dashboard.

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

Respond in JSON format.`,
    expectedFormat: `{
  "portfolio_risk_score": 1-100,
  "portfolio_risk_trend": "increasing|stable|decreasing",
  "weighted_risk_calculation": "show the math",
  "concentration_risks": ["..."],
  "diversification_assessment": "...",
  "top_risk": { "description": "...", "affected_holdings": ["..."], "mitigation": "..." },
  "top_opportunity": { "description": "...", "affected_holdings": ["..."] },
  "action_items": ["ranked by priority"],
  "executive_summary": "3-5 sentence summary for a CIO"
}`,
    evaluationCriteria:
      "Calculates weighted risk correctly (~59.15), identifies tech concentration (65%), notes divergent trends, specific actionable items, references market context.",
    isCustom: false,
  },
  {
    id: "t4-learning-generator",
    name: "Risk Evaluation Learning Generator",
    tier: 4,
    prompt: `You are a Risk Evaluation Learning Generator. Your job is to analyze cases where the risk prediction system was significantly wrong and extract lessons.

CASE:
- Asset: TSLA (Tesla Inc.)
- Prediction date: 2024-01-15
- Predicted risk score: 65/100 (moderately high risk)
- Actual outcome (30 days later): Risk should have been 30/100 \u2014 stock rose 22% on earnings beat, Cybertruck deliveries exceeded expectations, energy storage revenue doubled
- Prediction inputs at the time: negative analyst sentiment (55% sell), Cybertruck production concerns, EV price war in China, Elon Musk distraction risk (Twitter/X)

SYSTEM WEIGHTS AT PREDICTION TIME:
- Analyst sentiment: 25%
- News sentiment: 20%
- Technical indicators: 20%
- Fundamental metrics: 20%
- Social media signals: 15%

Analyze what went wrong and recommend specific improvements.

Respond in JSON format.`,
    expectedFormat: `{
  "prediction_error": 35,
  "error_direction": "overpredicted_risk",
  "root_causes": [{ "cause": "...", "contribution": "high|medium|low", "explanation": "..." }],
  "weight_recommendations": {
    "analyst_sentiment": { "current": 0.25, "recommended": 0.0-1.0, "reasoning": "..." }
  },
  "new_signals_needed": ["..."],
  "systemic_bias_identified": "...",
  "lessons": ["..."]
}`,
    evaluationCriteria:
      "Identifies overweighting of analyst sentiment (lagging indicator), recognizes production/delivery data underweighted, recommends increasing fundamental metrics, suggests new signals.",
    isCustom: false,
  },
  {
    id: "t4-missed-opportunity",
    name: "Missed Opportunity Analyst",
    tier: 4,
    prompt: `You are a Missed Opportunity Analyst. A significant price move was NOT predicted by the system. Analyze why and identify what signals were available but missed.

EVENT:
- Asset: MRNA (Moderna Inc.)
- Date: 2024-02-28
- Price move: +15.3% in one trading session
- Catalyst: FDA granted breakthrough therapy designation for mRNA-based cancer vaccine (personalized neoantigen therapy) in combination with Keytruda for melanoma
- System's pre-event risk score: 55/100 (neutral)
- System's pre-event sentiment: Neutral \u2014 "pipeline concerns offset by cash position"

SIGNALS THAT EXISTED PRE-EVENT (but were not weighted):
1. FDA advisory committee meeting scheduled for 2024-02-27 (public calendar)
2. Unusual options activity: 3x normal call volume at $120 strike (2 days prior)
3. Keytruda collaboration press release from Merck (3 weeks prior)
4. Clinical trial Phase 2 results published in Nature Medicine (6 weeks prior) showing 44% reduction in recurrence
5. Insider buying: CMO purchased $2.1M in shares (4 weeks prior)

What should the system have caught? How should it be improved?

Respond in JSON format.`,
    expectedFormat: `{
  "missed_move_magnitude": 15.3,
  "predictability_score": 0.0-1.0,
  "missed_signals": [{ "signal": "...", "available_days_before": 0, "signal_type": "...", "detectability": "easy|moderate|hard", "reasoning": "..." }],
  "signal_priority_ranking": ["..."],
  "recommended_new_data_sources": ["..."],
  "recommended_alert_triggers": [{ "trigger": "...", "action": "..." }],
  "system_gap_analysis": "...",
  "summary": "..."
}`,
    evaluationCriteria:
      "Ranks FDA calendar and options flow as highest priority, recognizes signal convergence, recommends specific alert triggers, predictability score high (0.7+).",
    isCustom: false,
  },
  {
    id: "t4-prediction-synthesizer",
    name: "Arbitrator Prediction Synthesizer",
    tier: 4,
    prompt: `You are an Arbitrator Prediction Synthesizer. You must weigh competing analyst predictions and produce a final synthesized prediction.

QUESTION: Will MSFT stock price be higher 30 days from now (2024-04-15)?

ANALYST PREDICTIONS:
1. [Analyst A \u2014 Senior Quant, 12yr track record, 67% accuracy on MSFT]
   Prediction: YES (0.80 confidence)
   Reasoning: "Azure revenue acceleration, Copilot monetization beginning, strong enterprise spending cycle. Technical breakout above 200-day MA."

2. [Analyst B \u2014 Sector Specialist, 8yr track record, 71% accuracy on tech]
   Prediction: YES (0.75 confidence)
   Reasoning: "AI tailwinds are real and accelerating. MSFT is best positioned among hyperscalers. Only risk is valuation at 35x forward PE."

3. [Analyst C \u2014 Macro Strategist, 15yr track record, 62% accuracy overall]
   Prediction: YES (0.60 confidence)
   Reasoning: "Macro is supportive \u2014 rates peaking, soft landing likely. But MSFT specific upside may already be priced in. I'm modestly bullish."

4. [Analyst D \u2014 Contrarian Specialist, 10yr track record, 58% accuracy, but 73% accuracy on contrarian calls]
   Prediction: NO (0.55 confidence)
   Reasoning: "Consensus is too bullish. When 38/40 analysts are bullish, the risk is asymmetric to the downside. Copilot revenue will disappoint vs expectations. Watch for multiple compression."

Synthesize these predictions into a final call.

Respond in JSON format.`,
    expectedFormat: `{
  "final_prediction": "YES|NO",
  "final_confidence": 0.0-1.0,
  "analyst_weights": [{ "analyst": "...", "assigned_weight": 0.0-1.0, "reasoning": "..." }],
  "weighted_probability": 0.0-1.0,
  "agreement_level": "strong|moderate|weak",
  "key_uncertainty": "...",
  "contrarian_consideration": "...",
  "risk_scenario": "...",
  "summary": "2-3 sentence synthesis"
}`,
    evaluationCriteria:
      "Doesn't just average confidences, weights by track record relevance, takes contrarian seriously (73% on contrarian calls), final confidence 0.65-0.75, addresses crowded-trade risk.",
    isCustom: false,
  },
  {
    id: "t4-legal-classifier",
    name: "Legal Document Type Classifier",
    tier: 4,
    prompt: `You are a Legal Document Type Classifier. Classify the following document excerpt into one or more of 14 categories. Also extract key metadata.

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
1. Contract/Agreement  2. Corporate Formation  3. Employment/HR  4. Intellectual Property
5. Real Estate  6. Litigation/Court Filing  7. Regulatory/Compliance  8. Financial/Securities
9. Tax  10. Estate/Trust  11. Immigration  12. Environmental  13. Healthcare/HIPAA  14. Technology/Data Privacy

Classify and extract metadata.

Respond in JSON format.`,
    expectedFormat: `{
  "primary_category": "Contract/Agreement",
  "all_categories": ["Contract/Agreement", "Intellectual Property", "Technology/Data Privacy"],
  "confidence_per_category": { "Contract/Agreement": 0.98, "Intellectual Property": 0.85, "Technology/Data Privacy": 0.60 },
  "document_type": "Master Services Agreement",
  "parties": [{ "name": "...", "role": "...", "entity_type": "...", "jurisdiction": "..." }],
  "key_terms": { "effective_date": "...", "term_length": "...", "renewal": "...", "payment_terms": "...", "ip_ownership": "...", "confidentiality_period": "..." },
  "risk_flags": ["..."],
  "summary": "2 sentence summary"
}`,
    evaluationCriteria:
      "Primary category is Contract/Agreement, also flags IP and Tech/Privacy, extracts parties with jurisdiction, identifies auto-renewal and IP-upon-payment risks.",
    isCustom: false,
  },
  {
    id: "t4-task-planner",
    name: "Task Planner / Decomposition",
    tier: 4,
    prompt: `You are a Task Planner. Decompose the following freeform request into a structured project plan with tasks, dependencies, and estimates.

REQUEST:
"I need to migrate our API from REST to GraphQL, update the mobile app to use the new GraphQL endpoints, and retrain the ML model on the new schema. The REST API currently has 47 endpoints across 8 resource types. The mobile app is React Native with 23 screens. The ML model is a recommendation engine trained on user interaction data that currently reads from the REST API response format. We have 3 backend engineers, 2 mobile devs, and 1 ML engineer. We need this done in 8 weeks."

Decompose this into a structured plan.

Respond in JSON format.`,
    expectedFormat: `{
  "project_name": "...",
  "total_estimated_weeks": 0,
  "feasibility_assessment": "on_track|at_risk|infeasible",
  "feasibility_reasoning": "...",
  "workstreams": [{ "name": "...", "owner": "...", "tasks": [{ "id": "...", "title": "...", "estimated_hours": 0, "dependencies": ["..."], "risk": "high|medium|low", "acceptance_criteria": ["..."] }] }],
  "critical_path": ["..."],
  "risks": [{ "risk": "...", "likelihood": "...", "impact": "...", "mitigation": "..." }],
  "milestones": [{ "week": 0, "milestone": "...", "deliverables": ["..."] }],
  "parallel_work_opportunities": ["..."],
  "recommendation": "..."
}`,
    evaluationCriteria:
      "Identifies 3 workstreams, recognizes mobile depends on GraphQL, suggests compatibility layer, critical path through backend, flags 8 weeks as tight, includes milestones.",
    isCustom: false,
  },
];
