import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JsonRpcRequest, JsonRpcResponse, TaskState } from '@agent-to-agent/shared';
import { randomUUID } from 'crypto';

interface Restaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  maxPartySize: number;
  avgCostPerPerson: number;
}

const MOCK_RESTAURANTS: Restaurant[] = [
  {
    name: 'Trattoria Milano',
    cuisine: 'Italian',
    priceRange: '$$',
    rating: 4.7,
    maxPartySize: 12,
    avgCostPerPerson: 28,
  },
  {
    name: 'Sakura Garden',
    cuisine: 'Japanese',
    priceRange: '$$$',
    rating: 4.8,
    maxPartySize: 8,
    avgCostPerPerson: 45,
  },
  {
    name: 'Le Petit Bistro',
    cuisine: 'French',
    priceRange: '$$$',
    rating: 4.6,
    maxPartySize: 10,
    avgCostPerPerson: 52,
  },
  {
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    priceRange: '$',
    rating: 4.4,
    maxPartySize: 20,
    avgCostPerPerson: 15,
  },
];

@Controller()
export class TasksController {
  @Post('a2a')
  async handleA2A(@Body() body: JsonRpcRequest): Promise<JsonRpcResponse> {
    // Validate JSON-RPC structure
    if (!body || body.jsonrpc !== '2.0' || !body.method) {
      return {
        jsonrpc: '2.0',
        id: body?.id ?? null,
        error: { code: -32600, message: 'Invalid JSON-RPC request' },
      };
    }

    if (body.method !== 'tasks/send') {
      return {
        jsonrpc: '2.0',
        id: body.id,
        error: { code: -32601, message: `Unknown method: ${body.method}` },
      };
    }

    const params = body.params as Record<string, unknown> | undefined;
    const message = params?.message as { role: string; parts: Array<{ type: string; text?: string }> } | undefined;
    const textPart = message?.parts?.find((p) => p.type === 'text');
    const query = textPart?.text ?? '';

    // Parse search criteria from natural language
    const queryLower = query.toLowerCase();
    const partyMatch = queryLower.match(/(\d+)\s*(?:people|guests|persons|diners)/);
    const partySize = partyMatch ? parseInt(partyMatch[1], 10) : 4;
    const budgetMatch = queryLower.match(/under\s*\$?(\d+)/);
    const budget = budgetMatch ? parseInt(budgetMatch[1], 10) : Infinity;

    // Filter restaurants by criteria
    let results = MOCK_RESTAURANTS.filter(
      (r) => r.maxPartySize >= partySize && r.avgCostPerPerson * partySize <= budget,
    );

    // Filter by cuisine if mentioned
    for (const r of MOCK_RESTAURANTS) {
      if (queryLower.includes(r.cuisine.toLowerCase()) && !results.includes(r)) {
        results = results.filter((res) => res.cuisine.toLowerCase() === r.cuisine.toLowerCase());
        break;
      }
    }

    // If cuisine filter emptied results, try without budget
    if (results.length === 0) {
      results = MOCK_RESTAURANTS.filter((r) => r.maxPartySize >= partySize);
    }

    const taskId = (params?.id as string) ?? randomUUID();

    return {
      jsonrpc: '2.0',
      id: body.id,
      result: {
        id: taskId,
        sessionId: randomUUID(),
        status: {
          state: TaskState.COMPLETED,
          message: {
            role: 'agent',
            parts: [
              {
                type: 'text',
                text: `Found ${results.length} restaurant(s) matching your criteria (party of ${partySize}${budget < Infinity ? `, budget under $${budget}` : ''}).`,
              },
              {
                type: 'data',
                data: { restaurants: results },
              },
            ],
          },
          timestamp: new Date().toISOString(),
        },
      },
    };
  }
}
