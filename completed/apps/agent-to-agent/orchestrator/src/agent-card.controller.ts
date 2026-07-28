import { Controller, Get } from '@nestjs/common';
import { AgentCard } from '@agent-to-agent/shared';

@Controller('.well-known')
export class AgentCardController {
  @Get('agent-card.json')
  getAgentCard(): AgentCard {
    return {
      name: 'orchestrator',
      description: 'Coordinates tasks across restaurant, booking, and premium-data agents',
      url: 'http://localhost:4000',
      version: '1.0.0',
      capabilities: {
        streaming: false,
        pushNotifications: false,
        stateTransitionHistory: true,
      },
      skills: [
        {
          id: 'coordinate',
          name: 'Coordinate',
          description: 'Delegates tasks to other agents and aggregates results',
          inputModes: ['application/json', 'text/plain'],
          outputModes: ['application/json', 'text/plain'],
        },
      ],
      defaultInputModes: ['application/json', 'text/plain'],
      defaultOutputModes: ['application/json', 'text/plain'],
    };
  }
}
