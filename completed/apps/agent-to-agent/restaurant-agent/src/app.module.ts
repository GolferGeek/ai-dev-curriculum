import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AgentCardController } from './agent-card.controller';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [AppController, AgentCardController, TasksController],
})
export class AppModule {}
