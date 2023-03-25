import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "./user/user.module";
import { TopicModule } from "./topic/topic.module";
import { ReplyModule } from "./reply/reply.module";
import { CategoryModule } from "./category/category.module";
import { ArticleModule } from "./article/article.module";

@Module({
  imports: [UserModule, TopicModule, ReplyModule, CategoryModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
