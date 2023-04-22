import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { UserService } from '../user/user.service';

@Module({
	imports: [],
	controllers: [ArticleController],
	providers: [ArticleService, UserService]
})
export class ArticleModule {
}