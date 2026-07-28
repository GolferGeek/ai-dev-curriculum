import { Controller, Get } from '@nestjs/common';
import { AgentCard } from '@agent-to-agent/shared';

@Controller('.well-known')
export class AgentCardController {
  @Get('agent-card.json')
  getAgentCard(): AgentCard {
    return {
      name: 'restaurant-agent',
      description: 'Finds restaurants by cuisine, location, price range, and other criteria',
      url: 'http://localhost:4001',
      version: '1.0.0',
      capabilities: {
        streaming: false,
        pushNotifications: false,
        stateTransitionHistory: false,
      },
      skills: [
        {
          id: 'search-restaurants',
          name: 'Search Restaurants',
          description: 'Finds restaurants matching given criteria such as cuisine type, location, and price range',
          inputModes: ['application/json', 'text/plain'],
          outputModes: ['application/json', 'text/plain'],
        },
      ],
      defaultInputModes: ['application/json', 'text/plain'],
      defaultOutputModes: ['application/json', 'text/plain'],
    };
  }
}
