import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common'
import { ApiBody, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Role, Topic } from '@prisma/client'
import { TopicDto } from './topic.dto'
import { TopicService } from './topic.service'
import {
	PrismaKnownRequestFilter,
	PrismaValidationErrorFilter
} from '../prisma-exception-filter/prisma-known-request.filter'
import { AuthGuard } from '../auth/auth.guard'
import { Session } from '../auth/session.decorator'
import { SessionContainer } from 'supertokens-node/recipe/session'
import { UserService } from '../user/user.service'

@ApiTags('topics')
@Controller('topics')

export class TopicsController {
	constructor(private readonly topicService: TopicService, private readonly userService: UserService) {}

	@Get(':topicId')
	@ApiOperation({ summary: 'Get topic' })
	@ApiResponse({ status: 200, description: 'Topic successfully received' })
	@ApiResponse({ status: 404, description: 'Topic with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getTopic(@Param('topicId') topicId: number): Promise<Topic> {
		const topic = await this.topicService.get(topicId)
		if (topic == undefined) {
			throw new HttpException('Not Found', 404)
		}
		return topic
	}

	@Get('page/:pageNumber')
	@ApiOperation({summary: 'Get certain page'})
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getPage(@Param('pageNumber') pageNumber: number) : Promise<Topic[]> {
		return this.topicService.getPage(pageNumber)
	}

	@Post()
	@ApiBody({ type: TopicDto })
	@ApiOperation({ summary: 'Create topic' })
	@ApiResponse({ status: 200, description: 'Topic successfully created' })
	@ApiResponse({ status: 400, description: 'Invalid data' })
	@ApiResponse({ status: 403, description: 'User can\'t create topics' }) @ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async createTopic(@Session() session: SessionContainer,@Body() topic: Topic): Promise<Topic> {
		return this.topicService.add(topic, session.getUserId())
	}
	@Delete(':topicId')
	@ApiOperation({ summary: 'Delete topic' })
	@ApiResponse({ status: 200, description: 'Topic successfully deleted' })
	@ApiResponse({ status: 403, description: 'User can\'t delete topics' })
	@ApiResponse({ status: 500, description: 'Internal error'})
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async deleteTopic(@Session() session: SessionContainer,@Param('topicId') topicId: number) {
		if (await this.userService.getUserRole(session.getUserId()) == Role.ADMIN || (await this.topicService.get(topicId)).authorId == session.getUserId()) {
			return this.topicService.deleteTopic(topicId)
		} else {
			throw new HttpException('Forbidden', 403)
		}
	}
	@Put(':topicId')
	@ApiBody({ type: TopicDto })
	@ApiOperation({ summary: 'Update topic text' })
	@ApiResponse({ status: 200, description: 'Topic successfully updated' })
	@ApiResponse({ status: 400, description: 'Invalid data' })
	@ApiResponse({ status: 403, description: 'User can\'t update topics' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async updateTopic(@Session() session: SessionContainer, @Param('topicId') topicId: number, @Body() topic: TopicDto) {
		if (await this.userService.getUserRole(session.getUserId()) == Role.ADMIN || (await this.topicService.get(topicId)).authorId == session.getUserId()) {
			return this.topicService.update(topicId, topic)
		} else {
			throw new HttpException('Forbidden', 403)
		}
	}
}