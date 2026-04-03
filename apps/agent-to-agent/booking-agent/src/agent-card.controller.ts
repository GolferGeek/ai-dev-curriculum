import { Controller, Get } from '@nestjs/common';
import { AgentCard } from '@agent-to-agent/shared';

@Controller('.well-known')
export class AgentCardController {
  @Get('agent-card.json')
  getAgentCard(): AgentCard {
    return {
      name: 'booking-agent',
      description: 'Checks restaurant availability and creates reservations',
      url: 'http://localhost:4002',
      version: '1.0.0',
      capabilities: {
        streaming: false,
        pushNotifications: false,
        stateTransitionHistory: false,
      },
      skills: [
        {
          id: 'check-availability',
          name: 'Check Availability',
          description: 'Checks restaurant availability for a given date/time and party size, and books reservations',
          inputModes: ['application/json', 'text/plain'],
          outputModes: ['application/json', 'text/plain'],
        },
      ],
      defaultInputModes: ['application/json', 'text/plain'],
      defaultOutputModes: ['application/json', 'text/plain'],
    };
  }
}
