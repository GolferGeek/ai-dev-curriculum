---
user-invocable: false
name: quick-tasks
description: Tier 1 test prompts — fast, focused tasks that test speed and basic competence. Entity extraction, classification, summarization, JSON conversion, code fixing. ~20-50 token responses.
category: model-eval
used-by-agents: eval-harness-builder
---

# Quick Tasks — Tier 1 Evaluation Prompts

Fast, focused prompts that test basic LLM competence. Each task should complete in under 5 seconds and produce a short, structured response. These form the baseline: if a model can't do these well, it won't handle Tier 2 or Tier 3.

---

## Prompt 1: Entity Extraction

### Prompt Text

```
Extract the 5 most important entities (people, companies, locations, dates, amounts) from the following paragraph. Return them as a JSON array of objects with keys: entity, type, value.

"On March 15, 2026, Microsoft announced the acquisition of Databricks for $47 billion. CEO Satya Nadella said the deal, expected to close by Q3, will strengthen Azure's data platform. The San Francisco-based company was founded by Ali Ghodsi in 2013."
```

### Expected Output Format

```json
[
  { "entity": "Microsoft", "type": "company", "value": "Microsoft" },
  { "entity": "Databricks", "type": "company", "value": "Databricks" },
  { "entity": "$47 billion", "type": "amount", "value": "47000000000" },
  { "entity": "Satya Nadella", "type": "person", "value": "Satya Nadella" },
  { "entity": "March 15, 2026", "type": "date", "value": "2026-03-15" }
]
```

Acceptable alternatives for the 5th slot: "Ali Ghodsi" (person), "San Francisco" (location), or "2013" (date). All are valid top-5 picks.

### Evaluation Criteria

| Criterion | Weight | Scoring |
|-----------|--------|---------|
| Correct entities identified | 40% | +1 per correct entity out of 5. Microsoft, Databricks, $47B, Satya Nadella are required (4 of 5). 5th can be Ali Ghodsi, San Francisco, or 2013. |
| Valid JSON output | 20% | Must parse as valid JSON. 0 if invalid. |
| Correct entity types | 20% | Each entity must have the right type (person, company, location, date, amount). |
| No hallucinated entities | 20% | -1 per entity not present in the source text. |

---

## Prompt 2: Sentiment Classification

### Prompt Text

```
Classify the sentiment of this customer review as positive, negative, or neutral. Return a JSON object with keys: sentiment, confidence (0-1), reasoning.

"The product arrived on time but the packaging was damaged. The item itself works fine though the manual was missing. Customer service was helpful when I called."
```

### Expected Output Format

```json
{
  "sentiment": "neutral",
  "confidence": 0.65,
  "reasoning": "Mixed experience — delivery was on time and product works, but packaging was damaged and manual was missing. Customer service was a positive note. Overall neither clearly positive nor negative."
}
```

### Evaluation Criteria

| Criterion | Weight | Scoring |
|-----------|--------|---------|
| Correct classification | 40% | "neutral" is correct. "mixed" is acceptable if the model explicitly maps it to neutral. "positive" or "negative" alone is wrong. |
| Reasonable confidence | 20% | Should be in the 0.5-0.75 range. Extreme confidence (>0.9) for a clearly mixed review is penalized. |
| Reasoning quality | 20% | Must reference specific details from the review (packaging, manual, customer service). Generic reasoning scores lower. |
| Valid JSON output | 20% | Must parse as valid JSON with all 3 required keys. |

---

## Prompt 3: One-Sentence Summary

### Prompt Text

```
Summarize this paragraph in exactly one sentence of no more than 30 words:

"The Paris Climate Agreement, signed by 196 nations in 2015, set a goal to limit global warming to 1.5 degrees Celsius above pre-industrial levels. However, recent reports from the IPCC indicate that current national pledges are insufficient to meet this target. Global carbon emissions continue to rise, with 2025 marking the highest recorded levels. Scientists warn that without immediate and drastic reductions in greenhouse gas emissions, the 1.5-degree threshold will be breached by 2030. Several nations have begun implementing carbon taxes, investing in renewable energy, and phasing out coal-fired power plants. Despite these efforts, developing nations argue they need more financial support from wealthier countries to transition their economies. The debate over climate finance remains one of the most contentious issues in international climate negotiations, with the Green Climate Fund falling short of its $100 billion annual target."
```

### Expected Output Format

```
Despite 196 nations signing the Paris Agreement, current emission pledges remain insufficient to prevent breaching the 1.5-degree warming threshold by 2030.
```

### Evaluation Criteria

| Criterion | Weight | Scoring |
|-----------|--------|---------|
| Key point captured | 40% | Must mention the gap between pledges and the 1.5-degree target. This is the central tension of the paragraph. |
| Brevity | 20% | Must be one sentence, 30 words or fewer. Penalize if over 30 words or multiple sentences. |
| No hallucination | 20% | All claims in the summary must appear in the source. No invented statistics or claims. |
| Readability | 20% | Grammatically correct, flows naturally, not a list of fragments. |

---

## Prompt 4: Natural Language to JSON

### Prompt Text

```
Convert this natural language description to a structured JSON object:

"John Smith is a 34-year-old software engineer at Google in Mountain View. He has 8 years of experience and specializes in distributed systems and Go programming."
```

### Expected Output Format

```json
{
  "name": "John Smith",
  "age": 34,
  "title": "software engineer",
  "company": "Google",
  "location": "Mountain View",
  "yearsExperience": 8,
  "specializations": ["distributed systems", "Go programming"]
}
```

### Evaluation Criteria

| Criterion | Weight | Scoring |
|-----------|--------|---------|
| All fields present | 30% | Must include all 7 fields: name, age, title, company, location, yearsExperience, specializations. -1 per missing field. |
| Correct values | 30% | Each field must contain the correct value from the source text. Age and yearsExperience must be numbers, not strings. |
| Valid JSON | 20% | Must parse as valid JSON. 0 if invalid. |
| Correct types | 20% | age = number, yearsExperience = number, specializations = array of strings. String where number expected is penalized. |

---

## Prompt 5: Code Bug Fix

### Prompt Text

````
Fix the bug in this JavaScript function that is supposed to return the sum of all elements in an array:

```javascript
function sumArray(arr) {
  let total = 0;
  for (let i = 1; i <= arr.length; i++) {
    total += arr[i];
  }
  return total;
}
```
````

### Expected Output Format

````
The bug is an off-by-one error in the loop. The loop starts at index 1 (skipping the first element) and goes to `arr.length` (accessing an undefined index). Fix:

```javascript
function sumArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
```
````

### Evaluation Criteria

| Criterion | Weight | Scoring |
|-----------|--------|---------|
| Bug correctly identified | 30% | Must identify BOTH issues: starts at 1 instead of 0, and uses `<=` instead of `<`. Partial credit if only one is identified. |
| Fix is correct | 40% | The corrected code must work: `i = 0` and `i < arr.length`. Alternative correct solutions (e.g., using `reduce`, `forEach`) are acceptable if they produce the right result. |
| Explanation is clear | 20% | Must explain WHY the original code is wrong, not just show the fix. |
| No unnecessary changes | 10% | Should not refactor the function beyond fixing the bug (e.g., renaming variables, changing structure). Minor style changes are acceptable. |

---

## Harness Integration Notes

- **Timeout:** 10 seconds per prompt. If a model exceeds this, score 0.
- **Temperature:** Use temperature 0 for reproducible results.
- **Scoring:** Each prompt produces a score from 0.0 to 1.0. The Tier 1 aggregate score is the average of all 5.
- **Parsing:** For JSON-output prompts (1, 2, 4), try to parse the response as JSON first. If the model wraps it in markdown code fences, strip those before parsing.
- **Comparison:** Store raw responses alongside scores for human review of edge cases.
