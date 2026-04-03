import { Controller, Get } from '@nestjs/common';
import { AgentCard } from '@agent-to-agent/shared';

@Controller('.well-known')
export class AgentCardController {
  @Get('agent-card.json')
  getAgentCard(): AgentCard {
    return {
      name: 'premium-data-service',
      description: 'Provides premium restaurant reviews, ratings, and insider tips — requires x402 payment',
      url: 'http://localhost:4003',
      version: '1.0.0',
      capabilities: {
        streaming: false,
        pushNotifications: false,
        stateTransitionHistory: false,
      },
      skills: [
        {
          id: 'premium-reviews',
          name: 'Premium Reviews',
          description: 'Provides premium restaurant reviews, detailed ratings, and insider recommendations',
          inputModes: ['application/json', 'text/plain'],
          outputModes: ['application/json', 'text/plain'],
        },
      ],
      defaultInputModes: ['application/json', 'text/plain'],
      defaultOutputModes: ['application/json', 'text/plain'],
      securitySchemes: {
        x402: {
          type: 'x402-payment',
          description: 'Requires x402 HTTP payment protocol for access',
        },
      },
    };
  }
}
