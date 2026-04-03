import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Ports, TaskState, IntentMandate, ProtocolType } from '@agent-to-agent/shared';
import { randomUUID } from 'crypto';
import { EventBusService } from './event-bus.service';

interface AskRequest {
  message: string;
  mandate?: IntentMandate;
}

interface AskResponse {
  sessionId: string;
  steps: Array<{
    agent: string;
    protocol: string;
    status: string;
    result: unknown;
  }>;
  summary: string;
  mandateSpending?: {
    mandateId: string;
    totalSpent: number;
    remaining: number;
  };
}

@Controller()
export class AskController {
  constructor(private readonly eventBus: EventBusService) {}

  @Post('ask')
  async ask(@Body() body: AskRequest): Promise<AskResponse> {
    const sessionId = randomUUID();
    const steps: AskResponse['steps'] = [];
    let totalSpent = 0;

    // Validate mandate if provided
    if (body.mandate) {
      const mandate = body.mandate;
      // Accept both structured (status/constraints) and simple (maxAmount/expiresAt) formats
      const status = mandate.status ?? 'active';
      if (status !== 'active') {
        throw new HttpException(
          `Mandate ${mandate.id} is not active (status: ${status})`,
          HttpStatus.FORBIDDEN,
        );
      }
      const validUntil = mandate.constraints?.validUntil ?? (mandate as unknown as Record<string, unknown>).expiresAt as string;
      if (validUntil && new Date(validUntil) < new Date()) {
        throw new HttpException(
          `Mandate ${mandate.id} has expired`,
          HttpStatus.FORBIDDEN,
        );
      }
      // Normalize mandate fields for both formats
      const raw = mandate as unknown as Record<string, unknown>;
      if (!mandate.constraints) {
        mandate.constraints = {
          maxAmount: (raw.maxAmount as number) ?? 5,
          currency: (raw.currency as string) ?? 'USD',
          validUntil: raw.expiresAt as string,
        };
      }
      if (!mandate.intent) {
        mandate.intent = (raw.purpose as string) ?? 'general';
      }
    }

    // Step 1: Discover agents
    this.eventBus.emit({
      source: 'orchestrator',
      target: 'all-agents',
      protocol: ProtocolType.A2A,
      summary: 'Discovering available agents via /.well-known/agent-card.json',
      request: { method: 'GET', urls: [4001, 4002, 4003].map(p => `http://localhost:${p}/.well-known/agent-card.json`) },
      status: 'pending',
    });

    let discoveredAgents: Array<{ url: string; available: boolean; card?: Record<string, unknown> }> = [];
    try {
      const discoverResp = await fetch(`http://localhost:${Ports.ORCHESTRATOR}/discover`);
      discoveredAgents = await discoverResp.json();
    } catch {
      // Continue even if discovery fails
    }

    this.eventBus.emit({
      source: 'orchestrator',
      target: 'all-agents',
      protocol: ProtocolType.A2A,
      summary: `Discovery complete — found ${discoveredAgents.filter(a => a.available).length} of ${discoveredAgents.length} agents`,
      response: discoveredAgents,
      status: 'completed',
    });

    steps.push({
      agent: 'orchestrator',
      protocol: 'A2A',
      status: 'completed',
      result: { discoveredAgents: discoveredAgents.length, message: 'Agent discovery completed' },
    });

    // Step 2: Send A2A tasks/send to restaurant-agent
    const restaurantRequest = {
      jsonrpc: '2.0',
      id: `req-${randomUUID()}`,
      method: 'tasks/send',
      params: {
        id: randomUUID(),
        message: {
          role: 'user',
          parts: [{ type: 'text', text: body.message }],
        },
      },
    };

    this.eventBus.emit({
      source: 'orchestrator',
      target: 'restaurant-agent',
      protocol: ProtocolType.A2A,
      summary: `tasks/send — "${body.message}"`,
      request: restaurantRequest,
      status: 'pending',
    });

    let restaurantResult: Record<string, unknown> | null = null;
    try {
      const restaurantResp = await fetch(`http://localhost:${Ports.RESTAURANT}/a2a`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurantRequest),
      });
      restaurantResult = await restaurantResp.json();

      this.eventBus.emit({
        source: 'restaurant-agent',
        target: 'orchestrator',
        protocol: ProtocolType.A2A,
        summary: 'tasks/completed — restaurant recommendations returned',
        response: restaurantResult,
        status: 'completed',
      });

      steps.push({
        agent: 'restaurant-agent',
        protocol: 'A2A',
        status: 'completed',
        result: restaurantResult,
      });
    } catch (err) {
      this.eventBus.emit({
        source: 'restaurant-agent',
        target: 'orchestrator',
        protocol: ProtocolType.A2A,
        summary: `tasks/failed — ${err instanceof Error ? err.message : 'Connection failed'}`,
        status: 'failed',
      });

      steps.push({
        agent: 'restaurant-agent',
        protocol: 'A2A',
        status: 'failed',
        result: { error: err instanceof Error ? err.message : 'Connection failed' },
      });
    }

    // Step 3: Extract top restaurant from results and send to booking-agent
    let topRestaurant = 'Trattoria Milano';
    let partySize = 4;
    try {
      const result = (restaurantResult as Record<string, unknown>)?.result as Record<string, unknown>;
      const status = result?.status as Record<string, unknown>;
      const msg = status?.message as Record<string, unknown>;
      const parts = msg?.parts as Array<Record<string, unknown>>;
      const dataPart = parts?.find((p) => p.type === 'data');
      const data = dataPart?.data as Record<string, unknown>;
      const restaurants = data?.restaurants as Array<Record<string, unknown>>;
      if (restaurants && restaurants.length > 0) {
        topRestaurant = restaurants[0].name as string;
      }
      const sizeMatch = body.message.toLowerCase().match(/(\d+)\s*(?:people|guests|persons|diners|party|under)/);
      if (sizeMatch) partySize = parseInt(sizeMatch[1], 10);
    } catch {
      // Use defaults
    }

    // Step 4: Booking agent — includes x402 and AP2 flow
    const reviewCost = 0.50;

    // AP2 mandate check event
    if (body.mandate) {
      this.eventBus.emit({
        source: 'orchestrator',
        target: 'mandate-checker',
        protocol: ProtocolType.AP2,
        summary: `Mandate check — budget $${body.mandate.constraints.maxAmount.toFixed(2)}, spent $${totalSpent.toFixed(2)}, purpose: "${body.mandate.intent}"`,
        request: body.mandate,
        status: 'completed',
      });

      if (totalSpent + reviewCost > body.mandate.constraints.maxAmount) {
        this.eventBus.emit({
          source: 'mandate-checker',
          target: 'orchestrator',
          protocol: ProtocolType.AP2,
          summary: 'Mandate spending limit would be exceeded — blocking request',
          status: 'failed',
        });

        steps.push({
          agent: 'booking-agent',
          protocol: 'AP2',
          status: 'blocked',
          result: {
            error: 'Mandate spending limit would be exceeded',
            totalSpent,
            reviewCost,
            maxAmount: body.mandate.constraints.maxAmount,
          },
        });
      }
    }

    // x402 payment required from premium-data-service
    this.eventBus.emit({
      source: 'premium-data-service',
      target: 'orchestrator',
      protocol: ProtocolType.X402,
      summary: `402 Payment Required — $${reviewCost.toFixed(2)} for premium restaurant reviews`,
      request: { method: 'GET', url: `http://localhost:${Ports.PREMIUM}/reviews/${encodeURIComponent(topRestaurant)}` },
      response: { status: 402, headers: { 'X-Payment-Amount': reviewCost, 'X-Payment-Currency': 'USD' } },
      status: 'pending',
    });

    // x402 payment proof sent
    this.eventBus.emit({
      source: 'orchestrator',
      target: 'premium-data-service',
      protocol: ProtocolType.X402,
      summary: `Payment proof sent — $${reviewCost.toFixed(2)} via mandate ${body.mandate?.id ?? 'direct'}`,
      request: { paymentProof: 'tok_demo_proof', amount: reviewCost, mandateRef: body.mandate?.id },
      status: 'completed',
    });

    // A2A task/send to booking-agent
    const bookingParts: Array<Record<string, unknown>> = [
      { type: 'text', text: `Book a table at "${topRestaurant}" for ${partySize} people` },
      {
        type: 'data',
        data: {
          restaurantName: topRestaurant,
          partySize,
          ...(body.mandate ? { mandate: body.mandate } : {}),
        },
      },
    ];

    const bookingRequest = {
      jsonrpc: '2.0',
      id: `req-${randomUUID()}`,
      method: 'tasks/send',
      params: {
        id: randomUUID(),
        message: {
          role: 'user',
          parts: bookingParts,
        },
      },
    };

    this.eventBus.emit({
      source: 'orchestrator',
      target: 'booking-agent',
      protocol: ProtocolType.A2A,
      summary: `tasks/send — Book table at "${topRestaurant}" for ${partySize}`,
      request: bookingRequest,
      status: 'pending',
    });

    let bookingResult: Record<string, unknown> | null = null;
    try {
      const bookingResp = await fetch(`http://localhost:${Ports.BOOKING}/a2a`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingRequest),
      });
      bookingResult = await bookingResp.json();

      const bResult = bookingResult?.result as Record<string, unknown>;
      const bStatus = bResult?.status as Record<string, unknown>;
      const bMsg = bStatus?.message as Record<string, unknown>;
      const bParts = bMsg?.parts as Array<Record<string, unknown>>;
      if (bParts?.some((p) => (p.data as Record<string, unknown>)?.premiumReviews)) {
        totalSpent += reviewCost;
      }

      this.eventBus.emit({
        source: 'booking-agent',
        target: 'orchestrator',
        protocol: ProtocolType.A2A,
        summary: 'tasks/completed — booking confirmed',
        response: bookingResult,
        status: 'completed',
      });

      steps.push({
        agent: 'booking-agent',
        protocol: 'A2A',
        status: 'completed',
        result: bookingResult,
      });
    } catch (err) {
      this.eventBus.emit({
        source: 'booking-agent',
        target: 'orchestrator',
        protocol: ProtocolType.A2A,
        summary: `tasks/failed — ${err instanceof Error ? err.message : 'Connection failed'}`,
        status: 'failed',
      });

      steps.push({
        agent: 'booking-agent',
        protocol: 'A2A',
        status: 'failed',
        result: { error: err instanceof Error ? err.message : 'Connection failed' },
      });
    }

    // Build summary
    const summary = `Orchestrated dinner planning: discovered ${discoveredAgents.length} agents, found restaurants matching "${body.message}", booked ${topRestaurant} for ${partySize} guests.${totalSpent > 0 ? ` Premium reviews cost $${totalSpent.toFixed(2)}.` : ''}`;

    // Emit final summary event
    this.eventBus.emit({
      source: 'orchestrator',
      target: 'user',
      protocol: ProtocolType.REST,
      summary: `Run complete — ${summary}`,
      status: 'completed',
    });

    const response: AskResponse = {
      sessionId,
      steps,
      summary,
    };

    if (body.mandate) {
      response.mandateSpending = {
        mandateId: body.mandate.id,
        totalSpent,
        remaining: body.mandate.constraints.maxAmount - totalSpent,
      };
    }

    return response;
  }
}
