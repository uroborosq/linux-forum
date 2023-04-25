import { Module } from '@nestjs/common'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'
import { UserService } from '../user/user.service'
import { NewsGateway } from './news.gateway'

@Module({
	imports: [],
	controllers: [NewsController],
	providers: [NewsService, UserService, NewsGateway],
})
export class NewsModule{}