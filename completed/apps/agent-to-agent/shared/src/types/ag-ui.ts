import { ProtocolType } from './common';

export interface AgUiEvent {
  id: string;
  type: string;
  timestamp: string;
  data?: unknown;
}

export interface ProtocolExchange {
  id: string;
  source: string;
  target: string;
  protocol: ProtocolType;
  timestamp: string;
  summary: string;
  request: unknown;
  response: unknown;
}
