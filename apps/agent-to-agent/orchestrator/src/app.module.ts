import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AgentCardController } from './agent-card.controller';
import { DiscoveryController } from './discovery.controller';
import { AskController } from './ask.controller';
import { EventsController } from './events.controller';
import { EventBusService } from './event-bus.service';

@Module({
  controllers: [AppController, AgentCardController, DiscoveryController, AskController, EventsController],
  providers: [EventBusService],
})
export class AppModule {}
