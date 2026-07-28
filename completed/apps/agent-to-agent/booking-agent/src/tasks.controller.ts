import { Controller, Post, Body } from '@nestjs/common';
import { JsonRpcRequest, JsonRpcResponse, TaskState } from '@agent-to-agent/shared';
import { randomUUID } from 'crypto';

interface TimeSlot {
  time: string;
  available: boolean;
}

const MOCK_SLOTS: TimeSlot[] = [
  { time: '6:00 PM', available: true },
  { time: '6:30 PM', available: false },
  { time: '7:00 PM', available: true },
  { time: '7:30 PM', available: true },
  { time: '8:00 PM', available: true },
  { time: '8:30 PM', available: false },
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
    const message = params?.message as { role: string; parts: Array<{ type: string; text?: string; data?: Record<string, unknown> }> } | undefined;
    const textPart = message?.parts?.find((p) => p.type === 'text');
    const dataPart = message?.parts?.find((p) => p.type === 'data');
    const query = textPart?.text ?? '';

    // Extract restaurant name and party size
    const restaurantName = (dataPart?.data?.restaurantName as string) ?? this.extractRestaurantName(query);
    const partyMatch = query.toLowerCase().match(/(\d+)\s*(?:people|guests|persons|diners|party)/);
    const partySize = (dataPart?.data?.partySize as number) ?? (partyMatch ? parseInt(partyMatch[1], 10) : 4);

    const availableSlots = MOCK_SLOTS.filter((s) => s.available);
    const confirmationNumber = `RES-${Date.now().toString(36).toUpperCase()}`;

    // Fetch premium reviews if available (x402 flow — Milestone 4)
    let premiumReviews: unknown = null;
    const mandateHeader = (dataPart?.data?.mandate as Record<string, unknown>) ?? null;
    try {
      premiumReviews = await this.fetchPremiumReviews(restaurantName, mandateHeader);
    } catch {
      // Premium reviews are optional — continue without them
    }

    const taskId = (params?.id as string) ?? randomUUID();

    const responseParts: Array<Record<string, unknown>> = [
      {
        type: 'text',
        text: `Booking confirmed at ${restaurantName} for ${partySize} guests. Confirmation: ${confirmationNumber}`,
      },
      {
        type: 'data',
        data: {
          restaurantName,
          partySize,
          confirmationNumber,
          availableSlots,
          selectedSlot: availableSlots[0]?.time ?? 'No slots available',
        },
      },
    ];

    if (premiumReviews) {
      responseParts.push({
        type: 'data',
        data: { premiumReviews },
      });
    }

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
            parts: responseParts,
          },
          timestamp: new Date().toISOString(),
        },
      },
    };
  }

  private extractRestaurantName(text: string): string {
    // Simple extraction — look for quoted names or known patterns
    const quoted = text.match(/["']([^"']+)["']/);
    if (quoted) return quoted[1];
    // Fallback: look for "at <Name>"
    const atMatch = text.match(/at\s+([A-Z][a-zA-Z\s]+)/);
    if (atMatch) return atMatch[1].trim();
    return 'Unknown Restaurant';
  }

  /**
   * Milestone 4 & 5: Fetch premium reviews from premium-data-service.
   * Handles x402 payment gate: if 402 received, creates mock proof and retries.
   * If a mandate is provided, passes it along.
   */
  private async fetchPremiumReviews(
    restaurantName: string,
    mandate: Record<string, unknown> | null,
  ): Promise<unknown> {
    const encodedName = encodeURIComponent(restaurantName);
    const url = `http://localhost:4003/reviews/${encodedName}`;

    const headers: Record<string, string> = {};
    if (mandate) {
      headers['X-Payment-Mandate'] = JSON.stringify(mandate);
    }

    // First attempt — expect 402
    const firstResponse = await fetch(url, { headers });

    if (firstResponse.status === 402) {
      // x402 flow: create mock proof and retry
      const mockProof = `mock-proof-${Date.now()}`;
      headers['X-Payment-Proof'] = mockProof;
      if (mandate) {
        headers['X-Payment-Mandate'] = JSON.stringify(mandate);
      }

      const secondResponse = await fetch(url, { headers });
      if (secondResponse.ok) {
        return secondResponse.json();
      }
      return null;
    }

    if (firstResponse.ok) {
      return firstResponse.json();
    }

    return null;
  }
}
