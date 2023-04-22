import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TopicModule } from './topic/topic.module';
import { ReplyModule } from './reply/reply.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { NewsModule } from './news/news.module';
import { TopicService } from './topic/topic.service';
import { ReplyService } from './reply/reply.service';
import { ArticleService } from './article/article.service';
import { CategoryService } from './category/category.service';
import { AuthModule } from './auth/auth.module';
import * as SuperTokensConfig from './config';
import { UserService } from './user/user.service';

@Module({
	imports: [
		UserModule,
		TopicModule,
		ReplyModule,
		CategoryModule,
		ArticleModule,
		NewsModule,
		AuthModule.forRoot({
			connectionURI: SuperTokensConfig.connectionUri,
			appInfo: SuperTokensConfig.appInfo,
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		TopicService,
		ReplyService,
		ArticleService,
		CategoryService,
		UserService
	],
})
export class AppModule {}
