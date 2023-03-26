import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';

@Module({
	imports: [],
	controllers: [ReplyController],
	providers: []
})
export class ReplyModule {
}