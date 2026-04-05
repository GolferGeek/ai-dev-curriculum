import { PromptConfig } from "@/lib/types";

export const TIER_2_PROMPTS: PromptConfig[] = [
  {
    id: "t2-single-tool-call",
    name: "Single Tool Call",
    tier: 2,
    prompt: "What's the weather in Denver right now?",
    tools: [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Get current weather for a location",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "City name or city, state/country",
              },
              units: {
                type: "string",
                enum: ["fahrenheit", "celsius"],
                description: "Temperature units",
              },
            },
            required: ["location"],
          },
        },
      },
    ],
    expectedFormat: `{
  "tool_calls": [
    {
      "function": {
        "name": "get_weather",
        "arguments": { "location": "Denver, CO" }
      }
    }
  ]
}`,
    evaluationCriteria:
      "Tool call produced, not text (40%). Correct function name (20%). Valid parameters with Denver location (20%). Exactly 1 tool call (20%).",
    isCustom: false,
  },
  {
    id: "t2-multi-tool-chain",
    name: "Multi-Tool Chain",
    tier: 2,
    prompt:
      "I need to fly from SFO to JFK on March 15 and book a hotel near Times Square for 2 nights.",
    tools: [
      {
        type: "function",
        function: {
          name: "search_flights",
          description: "Search for available flights",
          parameters: {
            type: "object",
            properties: {
              from: {
                type: "string",
                description: "Departure airport code",
              },
              to: { type: "string", description: "Arrival airport code" },
              date: {
                type: "string",
                description: "Flight date in YYYY-MM-DD format",
              },
              passengers: {
                type: "integer",
                description: "Number of passengers",
                default: 1,
              },
            },
            required: ["from", "to", "date"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "book_hotel",
          description: "Book a hotel room",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "Hotel location or area",
              },
              checkin: {
                type: "string",
                description: "Check-in date in YYYY-MM-DD format",
              },
              checkout: {
                type: "string",
                description: "Check-out date in YYYY-MM-DD format",
              },
              guests: {
                type: "integer",
                description: "Number of guests",
                default: 1,
              },
            },
            required: ["location", "checkin", "checkout"],
          },
        },
      },
    ],
    expectedFormat: `{
  "tool_calls": [
    {
      "function": { "name": "search_flights", "arguments": { "from": "SFO", "to": "JFK", "date": "2026-03-15" } }
    },
    {
      "function": { "name": "book_hotel", "arguments": { "location": "Times Square, New York", "checkin": "2026-03-15", "checkout": "2026-03-17" } }
    }
  ]
}`,
    evaluationCriteria:
      "Both tools called (30%). Correct function names (15%). Flight params correct (20%). Hotel params correct (20%). Dates are logical (15%).",
    isCustom: false,
  },
  {
    id: "t2-tool-selection",
    name: "Tool Selection",
    tier: 2,
    prompt: "Translate 'hello world' to Spanish.",
    tools: [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Get current weather for a location",
          parameters: {
            type: "object",
            properties: { location: { type: "string" } },
            required: ["location"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "search_flights",
          description: "Search for available flights",
          parameters: {
            type: "object",
            properties: {
              from: { type: "string" },
              to: { type: "string" },
              date: { type: "string" },
            },
            required: ["from", "to", "date"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "send_email",
          description: "Send an email message",
          parameters: {
            type: "object",
            properties: {
              to: { type: "string" },
              subject: { type: "string" },
              body: { type: "string" },
            },
            required: ["to", "subject", "body"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "translate_text",
          description: "Translate text from one language to another",
          parameters: {
            type: "object",
            properties: {
              text: { type: "string", description: "Text to translate" },
              target_language: {
                type: "string",
                description: "Language to translate to",
              },
              source_language: {
                type: "string",
                description: "Source language (auto-detect if omitted)",
              },
            },
            required: ["text", "target_language"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "calculate_math",
          description: "Evaluate a mathematical expression",
          parameters: {
            type: "object",
            properties: { expression: { type: "string" } },
            required: ["expression"],
          },
        },
      },
    ],
    expectedFormat: `{
  "tool_calls": [
    {
      "function": {
        "name": "translate_text",
        "arguments": { "text": "hello world", "target_language": "Spanish" }
      }
    }
  ]
}`,
    evaluationCriteria:
      "Correct tool selected (40%): translate_text only. No extra tools (20%). Parameters correct (20%). Tool call not text (20%).",
    isCustom: false,
  },
];
