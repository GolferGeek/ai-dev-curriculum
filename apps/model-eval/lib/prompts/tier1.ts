import { PromptConfig } from "@/lib/types";

export const TIER_1_PROMPTS: PromptConfig[] = [
  {
    id: "t1-entity-extraction",
    name: "Entity Extraction",
    tier: 1,
    prompt: `Extract the 5 most important entities (people, companies, locations, dates, amounts) from the following paragraph. Return them as a JSON array of objects with keys: entity, type, value.

"On March 15, 2026, Microsoft announced the acquisition of Databricks for $47 billion. CEO Satya Nadella said the deal, expected to close by Q3, will strengthen Azure's data platform. The San Francisco-based company was founded by Ali Ghodsi in 2013."`,
    expectedFormat: `[
  { "entity": "Microsoft", "type": "company", "value": "Microsoft" },
  { "entity": "Databricks", "type": "company", "value": "Databricks" },
  { "entity": "$47 billion", "type": "amount", "value": "47000000000" },
  { "entity": "Satya Nadella", "type": "person", "value": "Satya Nadella" },
  { "entity": "March 15, 2026", "type": "date", "value": "2026-03-15" }
]`,
    evaluationCriteria:
      "Correct entities identified (40%): Microsoft, Databricks, $47B, Satya Nadella required. Valid JSON output (20%). Correct entity types (20%). No hallucinated entities (20%).",
    isCustom: false,
  },
  {
    id: "t1-sentiment-classification",
    name: "Sentiment Classification",
    tier: 1,
    prompt: `Classify the sentiment of this customer review as positive, negative, or neutral. Return a JSON object with keys: sentiment, confidence (0-1), reasoning.

"The product arrived on time but the packaging was damaged. The item itself works fine though the manual was missing. Customer service was helpful when I called."`,
    expectedFormat: `{
  "sentiment": "neutral",
  "confidence": 0.65,
  "reasoning": "Mixed experience \u2014 delivery was on time and product works, but packaging was damaged and manual was missing. Customer service was a positive note. Overall neither clearly positive nor negative."
}`,
    evaluationCriteria:
      "Correct classification (40%): 'neutral' is correct. Reasonable confidence (20%): should be 0.5-0.75. Reasoning quality (20%): must reference specifics. Valid JSON (20%).",
    isCustom: false,
  },
  {
    id: "t1-one-sentence-summary",
    name: "One-Sentence Summary",
    tier: 1,
    prompt: `Summarize this paragraph in exactly one sentence of no more than 30 words:

"The Paris Climate Agreement, signed by 196 nations in 2015, set a goal to limit global warming to 1.5 degrees Celsius above pre-industrial levels. However, recent reports from the IPCC indicate that current national pledges are insufficient to meet this target. Global carbon emissions continue to rise, with 2025 marking the highest recorded levels. Scientists warn that without immediate and drastic reductions in greenhouse gas emissions, the 1.5-degree threshold will be breached by 2030. Several nations have begun implementing carbon taxes, investing in renewable energy, and phasing out coal-fired power plants. Despite these efforts, developing nations argue they need more financial support from wealthier countries to transition their economies. The debate over climate finance remains one of the most contentious issues in international climate negotiations, with the Green Climate Fund falling short of its $100 billion annual target."`,
    expectedFormat:
      "Despite 196 nations signing the Paris Agreement, current emission pledges remain insufficient to prevent breaching the 1.5-degree warming threshold by 2030.",
    evaluationCriteria:
      "Key point captured (40%): gap between pledges and 1.5-degree target. Brevity (20%): one sentence, 30 words or fewer. No hallucination (20%). Readability (20%).",
    isCustom: false,
  },
  {
    id: "t1-nl-to-json",
    name: "Natural Language to JSON",
    tier: 1,
    prompt: `Convert this natural language description to a structured JSON object:

"John Smith is a 34-year-old software engineer at Google in Mountain View. He has 8 years of experience and specializes in distributed systems and Go programming."`,
    expectedFormat: `{
  "name": "John Smith",
  "age": 34,
  "title": "software engineer",
  "company": "Google",
  "location": "Mountain View",
  "yearsExperience": 8,
  "specializations": ["distributed systems", "Go programming"]
}`,
    evaluationCriteria:
      "All fields present (30%): all 7 fields required. Correct values (30%). Valid JSON (20%). Correct types (20%): age/yearsExperience as numbers, specializations as array.",
    isCustom: false,
  },
  {
    id: "t1-code-bug-fix",
    name: "Code Bug Fix",
    tier: 1,
    prompt: `Fix the bug in this JavaScript function that is supposed to return the sum of all elements in an array:

\`\`\`javascript
function sumArray(arr) {
  let total = 0;
  for (let i = 1; i <= arr.length; i++) {
    total += arr[i];
  }
  return total;
}
\`\`\``,
    expectedFormat: `The bug is an off-by-one error in the loop. The loop starts at index 1 (skipping the first element) and goes to arr.length (accessing an undefined index). Fix:

\`\`\`javascript
function sumArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
\`\`\``,
    evaluationCriteria:
      "Bug correctly identified (30%): both i=1 and <= issues. Fix is correct (40%). Explanation is clear (20%). No unnecessary changes (10%).",
    isCustom: false,
  },
];
