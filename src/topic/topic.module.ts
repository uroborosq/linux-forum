import { Module } from "@nestjs/common";
import { TopicsController } from "./topic.controller";

@Module({
  imports: [],
  controllers: [TopicsController],
  providers: []
})
export class TopicModule {}