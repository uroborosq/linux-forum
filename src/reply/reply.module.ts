import { Module } from '@nestjs/common'
import { ReplyController } from './reply.controller'
import { ReplyService } from './reply.service'
import { UserService } from '../user/user.service'

@Module({
	imports: [],
	controllers: [ReplyController],
	providers: [ReplyService, UserService],
	exports: [ReplyService]
})
export class ReplyModule {
}