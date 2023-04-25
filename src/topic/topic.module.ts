import { Module } from '@nestjs/common'
import { TopicsController } from './topic.controller'
import { TopicService } from './topic.service'
import { UserService } from '../user/user.service'

@Module({
	imports: [],
	controllers: [TopicsController],
	providers: [TopicService, UserService]
})
export class TopicModule {
}