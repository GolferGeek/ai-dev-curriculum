import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AgentCardController } from './agent-card.controller';
import { ReviewsController } from './reviews.controller';

@Module({
  controllers: [AppController, AgentCardController, ReviewsController],
})
export class AppModule {}
