import { Controller, Get } from '@nestjs/common';
import { AgentCard, Ports } from '@agent-to-agent/shared';

interface DiscoveryResult {
  url: string;
  available: boolean;
  card?: AgentCard;
  error?: string;
}

@Controller()
export class DiscoveryController {
  @Get('discover')
  async discover(): Promise<DiscoveryResult[]> {
    const agentPorts = [Ports.RESTAURANT, Ports.BOOKING, Ports.PREMIUM];
    const results = await Promise.all(
      agentPorts.map((port) => this.fetchAgentCard(port)),
    );
    return results;
  }

  private async fetchAgentCard(port: number): Promise<DiscoveryResult> {
    const url = `http://localhost:${port}`;
    try {
      const response = await fetch(
        `${url}/.well-known/agent-card.json`,
      );
      if (!response.ok) {
        return { url, available: false, error: `HTTP ${response.status}` };
      }
      const card: AgentCard = await response.json();
      return { url, available: true, card };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return { url, available: false, error: message };
    }
  }
}
