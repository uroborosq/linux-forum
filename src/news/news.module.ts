import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { UserService } from '../user/user.service';

@Module({
	imports: [],
	controllers: [NewsController],
	providers: [NewsService, UserService],
})
export class NewsModule{}