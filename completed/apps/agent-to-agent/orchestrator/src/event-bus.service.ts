import { Injectable } from '@nestjs/common';
import { ReplaySubject } from 'rxjs';
import { ProtocolType } from '@agent-to-agent/shared';
import { randomUUID } from 'crypto';

export interface ProtocolEvent {
  id: string;
  timestamp: string;
  source: string;
  target: string;
  protocol: ProtocolType;
  summary: string;
  request?: unknown;
  response?: unknown;
  status: 'pending' | 'completed' | 'failed';
}

@Injectable()
export class EventBusService {
  /** Replay up to 50 events for late subscribers (covers the SSE race) */
  private readonly subject = new ReplaySubject<ProtocolEvent>(50, 5000);

  /** Observable that SSE controller subscribes to */
  get events$() {
    return this.subject.asObservable();
  }

  /** Emit a protocol event */
  emit(
    partial: Omit<ProtocolEvent, 'id' | 'timestamp'>,
  ): ProtocolEvent {
    const event: ProtocolEvent = {
      id: randomUUID(),
      timestamp: new Date().toISOString(),
      ...partial,
    };
    this.subject.next(event);
    return event;
  }
}
