import { PromptConfig } from "@/lib/types";

export const TIER_3_PROMPTS: PromptConfig[] = [
  {
    id: "t3-chart-reading",
    name: "Chart Reading",
    tier: 3,
    image: "test-images/chart.png",
    prompt: `Look at this bar chart and answer:
1. What are the top 3 categories by value?
2. What is the approximate value for each?
3. What is the total across all categories?

Respond with JSON:
{
  "top3": [
    { "category": "...", "value": "..." },
    { "category": "...", "value": "..." },
    { "category": "...", "value": "..." }
  ],
  "total": "..."
}`,
    expectedFormat: `{
  "top3": [
    { "category": "Engineering", "value": "$580K" },
    { "category": "Sales", "value": "$450K" },
    { "category": "Marketing", "value": "$320K" }
  ],
  "total": "$1,810K"
}`,
    evaluationCriteria:
      "Correct top 3 in right order, values within 10%, total calculated correctly. Penalize wrong order, hallucinated categories, values way off.",
    isCustom: false,
  },
  {
    id: "t3-screenshot-ocr",
    name: "Screenshot OCR",
    tier: 3,
    image: "test-images/code-screenshot.png",
    prompt: `Read the code in this image and tell me:
1. What programming language is this?
2. What is the function name?
3. What does it do?
4. What is the time complexity?

Respond with JSON:
{
  "language": "...",
  "functionName": "...",
  "description": "...",
  "timeComplexity": "..."
}`,
    expectedFormat: `{
  "language": "Python",
  "functionName": "fibonacci",
  "description": "Calculates the nth Fibonacci number using recursion",
  "timeComplexity": "O(2^n)"
}`,
    evaluationCriteria:
      "All 4 fields correct: Python, fibonacci, recursive description, O(2^n) complexity. Penalize wrong language, wrong function name, missing recursion, wrong complexity.",
    isCustom: false,
  },
  {
    id: "t3-ui-critique",
    name: "UI Critique",
    tier: 3,
    image: "test-images/ui-issues.png",
    prompt: `Review this UI screenshot and identify usability issues. List at least 3 problems you see, with specific locations and why they're problems.

Respond with JSON:
{
  "issues": [
    { "location": "...", "problem": "...", "severity": "high|medium|low", "fix": "..." }
  ]
}`,
    expectedFormat: `{
  "issues": [
    { "location": "Submit button", "problem": "White text on yellow background - poor contrast, WCAG fail", "severity": "high", "fix": "Use dark text or darker background" },
    { "location": "Label text", "problem": "Text truncated mid-word with ellipsis", "severity": "medium", "fix": "Allow text wrapping or show full text on hover" },
    { "location": "Action buttons", "problem": "Two buttons overlapping each other", "severity": "high", "fix": "Fix layout spacing and positioning" }
  ]
}`,
    evaluationCriteria:
      "Identifies all 3 known issues with specific locations, correct severity, actionable fixes. Penalize missed issues, hallucinated issues, vague locations.",
    isCustom: false,
  },
];
