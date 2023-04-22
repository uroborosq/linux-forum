import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Patch,
	Post,
	UseFilters,
	UseGuards
} from '@nestjs/common';
import { Reply, Role } from '@prisma/client';
import { ReplyDto, TextDto } from './reply.dto';
import { ReplyService } from './reply.service';
import {
	PrismaKnownRequestFilter,
	PrismaValidationErrorFilter
} from '../prisma-exception-filter/prisma-known-request.filter';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../auth/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthOptionalGuard } from '../auth/auth.optional-guard';
import { UserService } from '../user/user.service';


@ApiTags('replies')
@Controller('replies')
export class ReplyController {
	constructor(private readonly replyService: ReplyService,
		private readonly userService: UserService) {
	}

	@Get('/id/:replyId')
	@ApiOperation({ summary: 'Get reply by id' })
	@ApiResponse({ status: 200, description: 'Reply exists and can be received' })
	@ApiResponse({ status: 403, description: 'User is not allowed to view this reply' })
	@ApiResponse({ status: 404, description: 'Reply with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getReply(@Session() session: SessionContainer, @Param('replyId') postId: number): Promise<Reply> {
		const reply = await this.replyService.get(postId);
		if (reply == undefined) {
			throw new HttpException('Not Found', 404);
		}
		return reply;
	}
	@Get('/topic/:topicId/page/:pageNumber')
	@ApiOperation({ summary: 'Get reply by topic id' })
	@ApiResponse({ status: 200, description: 'Replies exists and can be received' })
	@ApiResponse({ status: 403, description: 'User is not allowed to view these replies' })
	@ApiResponse({ status: 404, description: 'Topic with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getRepliesByTopicId(@Param('topicId') topicId: number, @Param('pageNumber') pageNumber: number): Promise<Reply[]> {
		return this.replyService.getByTopicId(topicId, pageNumber);
	}
	@Post('')
	@ApiOperation({ summary: 'Create reply' })
	@ApiResponse({ status: 200, description: 'Reply successfully posted' })
	@ApiResponse({ status: 403, description: 'User is not allowed to post this reply' })
	@ApiResponse({ status: 404, description: 'Topic with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async createReply(@Session() session: SessionContainer, @Body() data: ReplyDto) {
		return this.replyService.create(data, session.getUserId());
	}
	@Patch('/text/:replyId')
	@ApiOperation({ summary: 'Update reply\'s text' })
	@ApiResponse({ status: 200, description: 'Reply successfully updated' })
	@ApiResponse({ status: 403, description: 'User is not allowed to update this reply' })
	@ApiResponse({ status: 404, description: 'Reply with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async updateText(@Session() session: SessionContainer, @Param('replyId') replyId: number, @Body() text: TextDto) {
		if (await this.userService.getUserRole(session.getUserId()) == Role.ADMIN || (await this.replyService.get(replyId)).authorId == session.getUserId()) {
			return this.replyService.updateText(replyId, text.text);
		} else {
			throw new HttpException('Forbidden', 403);
		}
	}
	@Delete(':replyId')
	@ApiOperation({ summary: 'Delete reply' })
	@ApiResponse({ status: 200, description: 'Reply successfully deleted' })
	@ApiResponse({ status: 403, description: 'User is not allowed to delete this reply' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async deleteReply(@Session() session: SessionContainer, @Param('replyId') replyId: number) {
		if (await this.userService.getUserRole(session.getUserId()) == Role.ADMIN || (await this.replyService.get(replyId)).authorId == session.getUserId()) {
			return this.replyService.delete(replyId);
		} else {
			throw new HttpException('Forbidden', 403);
		}
	}

	@Get('/pages/:topicId')
	@ApiOperation({summary: 'Get number of pages'})
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getNumberPages(@Param('topicId') topicId: number) {
		return this.replyService.getNumberPages(topicId);
	}

}
