---
user-invocable: false
name: multimodal-tests
description: Tier 3 test prompts — multimodal (image + text) tasks. Chart reading, screenshot OCR, UI critique. Models that aren't multimodal skip these.
category: model-eval
used-by-agents: eval-harness-builder
---

# Multimodal Tests (Tier 3)

These prompts test image + text comprehension. Models that don't support images skip these tests entirely — that's data (the model can't do multimodal).

## How to detect multimodal support

- **Ollama:** check model capabilities via `GET /api/show` — look for `projector` in the model architecture, or test with a small image and catch the error
- **Anthropic:** Claude models support images via content blocks with type `image`
- **Gemma 4:** all variants are multimodal (text + image input)
- **Most Qwen/Llama/DeepSeek models:** text-only (skip these tests)

## How to send images

**Ollama:**
```json
{
  "model": "gemma4:e4b",
  "messages": [{
    "role": "user",
    "content": "What do you see in this image?",
    "images": ["<base64-encoded-image>"]
  }],
  "stream": false
}
```

**Anthropic:**
```json
{
  "model": "claude-sonnet-4-6",
  "messages": [{
    "role": "user",
    "content": [
      { "type": "image", "source": { "type": "base64", "media_type": "image/png", "data": "<base64>" } },
      { "type": "text", "text": "What do you see?" }
    ]
  }]
}
```

## Test Images

Store at `apps/model-eval/test-images/`. Create simple, unambiguous test images:

### chart.png
A simple bar chart with 5 bars:
- Sales: $450K
- Marketing: $320K
- Engineering: $580K
- Support: $190K
- Operations: $270K

Create programmatically with an HTML canvas or SVG rendered to PNG. Clear labels, distinct colors, readable values.

### code-screenshot.png
A screenshot of a Python function:
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
Take a screenshot of this code in a dark-themed editor. Clear, readable font.

### ui-issues.png
A mock UI with 3 obvious issues:
1. A button with white text on a light yellow background (contrast fail)
2. A text label truncated with "..." in the middle of a word
3. Two buttons overlapping each other

Create as a simple HTML page screenshot.

---

## Prompt 1: Chart Reading

**Image:** `test-images/chart.png`

**Prompt:**
```
Look at this bar chart and answer:
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
}
```

**Expected output:**
```json
{
  "top3": [
    { "category": "Engineering", "value": "$580K" },
    { "category": "Sales", "value": "$450K" },
    { "category": "Marketing", "value": "$320K" }
  ],
  "total": "$1,810K"
}
```

**Evaluation criteria:**
- **Good:** correct top 3 in right order, values within 10%, total calculated correctly
- **Bad:** wrong order, values way off, missing categories, hallucinated categories not in the chart

---

## Prompt 2: Screenshot OCR

**Image:** `test-images/code-screenshot.png`

**Prompt:**
```
Read the code in this image and tell me:
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
}
```

**Expected output:**
```json
{
  "language": "Python",
  "functionName": "fibonacci",
  "description": "Calculates the nth Fibonacci number using recursion",
  "timeComplexity": "O(2^n)"
}
```

**Evaluation criteria:**
- **Good:** all 4 correct, identifies the exponential time complexity
- **Bad:** wrong language, can't read function name, misses the recursion, wrong complexity

---

## Prompt 3: UI Critique

**Image:** `test-images/ui-issues.png`

**Prompt:**
```
Review this UI screenshot and identify usability issues. List at least 3 problems you see, with specific locations and why they're problems.

Respond with JSON:
{
  "issues": [
    { "location": "...", "problem": "...", "severity": "high|medium|low", "fix": "..." }
  ]
}
```

**Expected output (3 known issues):**
1. White text on yellow background — poor contrast, accessibility fail (WCAG)
2. Truncated label — text cut off mid-word, user can't read the full label
3. Overlapping buttons — can't click the button underneath, layout broken

**Evaluation criteria:**
- **Good:** identifies all 3 real issues with specific locations, correct severity, actionable fixes
- **Bad:** misses obvious issues, hallucinated issues not present, vague locations like "the page looks bad"
