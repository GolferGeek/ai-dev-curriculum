import { Controller, Sse } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { EventBusService } from './event-bus.service';

interface MessageEvent {
  data: string;
  id?: string;
  type?: string;
}

@Controller()
export class EventsController {
  constructor(private readonly eventBus: EventBusService) {}

  @Sse('events')
  stream(): Observable<MessageEvent> {
    return this.eventBus.events$.pipe(
      map((event) => ({
        data: JSON.stringify(event),
        id: event.id,
        type: 'protocol-event',
      })),
    );
  }
}
