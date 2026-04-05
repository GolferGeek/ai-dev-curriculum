---
user-invocable: false
name: tool-calling-tests
description: Tier 2 test prompts — tool/function calling ability. Single tool call, multi-tool chaining, tool selection from multiple options. Tests structured output compliance.
category: model-eval
used-by-agents: eval-harness-builder
---

# Tool Calling Tests — Tier 2 Evaluation Prompts

These prompts test whether a model can produce structured tool/function calls rather than just text responses. This is critical for agentic workflows where the model must invoke APIs, not describe them.

---

## Prompt 1: Single Tool Call

### User Message

```
What's the weather in Denver right now?
```

### Tools Provided

```json
[
  {
    "type": "function",
    "function": {
      "name": "get_weather",
      "description": "Get current weather for a location",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "City name or city, state/country"
          },
          "units": {
            "type": "string",
            "enum": ["fahrenheit", "celsius"],
            "description": "Temperature units"
          }
        },
        "required": ["location"]
      }
    }
  }
]
```

### Expected Response Format

The model should return a tool call, not a text response. Expected structure:

```json
{
  "tool_calls": [
    {
      "id": "call_abc123",
      "type": "function",
      "function": {
        "name": "get_weather",
        "arguments": "{\"location\": \"Denver, CO\"}"
      }
    }
  ]
}
```

Acceptable `location` values: "Denver", "Denver, CO", "Denver, Colorado".

### Evaluation Criteria

| Criterion | Weight | Scoring |
|-----------|--------|---------|
| Tool call produced (not text) | 40% | Model must return a tool_call, not a text response saying what the weather might be. Score 0 if the model hallucinates a weather response. |
| Correct function name | 20% | Must call `get_weather`, not a made-up function. |
| Valid parameters | 20% | `location` must be present and contain "Denver". Arguments must be valid JSON. |
| No extra tool calls | 20% | Should produce exactly 1 tool call. Multiple calls is penalized. |

---

## Prompt 2: Multi-Tool Chain

### User Message

```
I need to fly from SFO to JFK on March 15 and book a hotel near Times Square for 2 nights.
```

### Tools Provided

```json
[
  {
    "type": "function",
    "function": {
      "name": "search_flights",
      "description": "Search for available flights",
      "parameters": {
        "type": "object",
        "properties": {
          "from": {
            "type": "string",
            "description": "Departure airport code"
          },
          "to": {
            "type": "string",
            "description": "Arrival airport code"
          },
          "date": {
            "type": "string",
            "description": "Flight date in YYYY-MM-DD format"
          },
          "passengers": {
            "type": "integer",
            "description": "Number of passengers",
            "default": 1
          }
        },
        "required": ["from", "to", "date"]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "book_hotel",
      "description": "Book a hotel room",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "Hotel location or area"
          },
          "checkin": {
            "type": "string",
            "description": "Check-in date in YYYY-MM-DD format"
          },
          "checkout": {
            "type": "string",
            "description": "Check-out date in YYYY-MM-DD format"
          },
          "guests": {
            "type": "integer",
            "description": "Number of guests",
            "default": 1
          }
        },
        "required": ["location", "checkin", "checkout"]
      }
    }
  }
]
```

### Expected Response Format

The model should return two tool calls:

```json
{
  "tool_calls": [
    {
      "id": "call_flight1",
      "type": "function",
      "function": {
        "name": "search_flights",
        "arguments": "{\"from\": \"SFO\", \"to\": \"JFK\", \"date\": \"2026-03-15\", \"passengers\": 1}"
      }
    },
    {
      "id": "call_hotel1",
      "type": "function",
      "function": {
        "name": "book_hotel",
        "arguments": "{\"location\": \"Times Square, New York\", \"checkin\": \"2026-03-15\", \"checkout\": \"2026-03-17\", \"guests\": 1}"
      }
    }
  ]
}
```

### Evaluation Criteria

| Criterion | Weight | Scoring |
|-----------|--------|---------|
| Both tools called | 30% | Must produce exactly 2 tool calls. 0.5 if only one is called. |
| Correct function names | 15% | `search_flights` and `book_hotel`. |
| Flight parameters correct | 20% | from="SFO", to="JFK", date includes "03-15". |
| Hotel parameters correct | 20% | location mentions "Times Square", checkout is 2 nights after checkin (March 17). |
| Dates are logical | 15% | Checkin should match or follow the flight date. Checkout should be exactly 2 nights later. |

---

## Prompt 3: Tool Selection

### User Message

```
Translate 'hello world' to Spanish.
```

### Tools Provided

```json
[
  {
    "type": "function",
    "function": {
      "name": "get_weather",
      "description": "Get current weather for a location",
      "parameters": {
        "type": "object",
        "properties": {
          "location": { "type": "string" }
        },
        "required": ["location"]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "search_flights",
      "description": "Search for available flights",
      "parameters": {
        "type": "object",
        "properties": {
          "from": { "type": "string" },
          "to": { "type": "string" },
          "date": { "type": "string" }
        },
        "required": ["from", "to", "date"]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "send_email",
      "description": "Send an email message",
      "parameters": {
        "type": "object",
        "properties": {
          "to": { "type": "string" },
          "subject": { "type": "string" },
          "body": { "type": "string" }
        },
        "required": ["to", "subject", "body"]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "translate_text",
      "description": "Translate text from one language to another",
      "parameters": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string",
            "description": "Text to translate"
          },
          "target_language": {
            "type": "string",
            "description": "Language to translate to"
          },
          "source_language": {
            "type": "string",
            "description": "Source language (auto-detect if omitted)"
          }
        },
        "required": ["text", "target_language"]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "calculate_math",
      "description": "Evaluate a mathematical expression",
      "parameters": {
        "type": "object",
        "properties": {
          "expression": { "type": "string" }
        },
        "required": ["expression"]
      }
    }
  }
]
```

### Expected Response Format

```json
{
  "tool_calls": [
    {
      "id": "call_translate1",
      "type": "function",
      "function": {
        "name": "translate_text",
        "arguments": "{\"text\": \"hello world\", \"target_language\": \"Spanish\"}"
      }
    }
  ]
}
```

### Evaluation Criteria

| Criterion | Weight | Scoring |
|-----------|--------|---------|
| Correct tool selected | 40% | Must call `translate_text` and only `translate_text`. Calling any other tool is a penalty. |
| No extra tools called | 20% | Exactly 1 tool call. Calling irrelevant tools (weather, flights, etc.) scores 0. |
| Parameters correct | 20% | text="hello world" (or "Hello world"), target_language="Spanish" (or "es"). |
| Tool call not text | 20% | Must be a structured tool call. If the model just responds "hola mundo" in text, score 0 on structure but give 0.25 partial credit for knowing the answer. |

---

## Ollama-Specific Notes

### Sending Tools to Ollama

Ollama's `/api/chat` endpoint accepts tools in the request body:

```json
{
  "model": "llama3.1",
  "messages": [
    { "role": "user", "content": "What's the weather in Denver?" }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": { ... }
      }
    }
  ],
  "stream": false
}
```

### Expected Tool Call Response from Ollama

When a model supports tool calling, Ollama returns:

```json
{
  "message": {
    "role": "assistant",
    "content": "",
    "tool_calls": [
      {
        "function": {
          "name": "get_weather",
          "arguments": {
            "location": "Denver, CO"
          }
        }
      }
    ]
  }
}
```

Note: Ollama returns `arguments` as an object, not a JSON string. The harness should handle both formats.

### Models Without Tool Support

Some Ollama models don't support the `tools` field and will return a plain text response instead of a tool call. The harness should:

1. Check if the response contains `tool_calls` in the message.
2. If not, score 0 on structure/compliance.
3. Still check the text response for partial credit: if the model says "I would call get_weather with location Denver" that shows understanding even without structured output. Award up to 0.25 partial credit.
4. Log which models support tool calling vs. which don't for the comparison report.

### Anthropic API Format

For Anthropic models, tools are sent differently:

```json
{
  "model": "claude-sonnet-4-20250514",
  "messages": [
    { "role": "user", "content": "What's the weather in Denver?" }
  ],
  "tools": [
    {
      "name": "get_weather",
      "description": "Get current weather for a location",
      "input_schema": {
        "type": "object",
        "properties": {
          "location": { "type": "string" }
        },
        "required": ["location"]
      }
    }
  ]
}
```

And the response uses `tool_use` content blocks:

```json
{
  "content": [
    {
      "type": "tool_use",
      "id": "toolu_abc123",
      "name": "get_weather",
      "input": { "location": "Denver, CO" }
    }
  ]
}
```

The harness must normalize both formats before scoring.

---

## Harness Integration Notes

- **Timeout:** 15 seconds per prompt. Tool-calling prompts may take longer than text generation.
- **Temperature:** Use temperature 0 for reproducible results.
- **Scoring:** Each prompt produces a score from 0.0 to 1.0. The Tier 2 aggregate score is the average of all 3.
- **Capability detection:** Before running Tier 2 tests, check if the model supports tool calling. If it doesn't, skip with a note rather than scoring 0 across the board.
- **Format normalization:** The harness must normalize tool call formats across Ollama (object arguments) and OpenAI-compatible APIs (string arguments) before comparing against expected output.
