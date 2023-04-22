import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { NewsArticleDto } from './news.dto';
import {
	PrismaKnownRequestFilter,
	PrismaValidationErrorFilter
} from '../prisma-exception-filter/prisma-known-request.filter';
import { NewsService } from './news.service';
import { NewsArticle, Role } from '@prisma/client';
import { Session } from '../auth/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../user/user.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
	constructor(private readonly newsService: NewsService, private readonly userService: UserService) {}
	@Get()
	@ApiOperation({ summary: 'Get all news' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getAllNews(): Promise<NewsArticle[]> {
		return this.newsService.getAll();
	}
	@Get(':newsId')
	@ApiOperation({ summary: 'Get specific article by id' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getNewsArticleById(@Param('newsId') newsId: number): Promise<NewsArticle> {
		const news = await this.newsService.getById(newsId);
		if (news == undefined) {
			throw new HttpException('Not Found', 404);
		}
		return news;
	}
	@Post()
	@ApiOperation({ summary: 'Create new news article' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async createNewsArticle(@Session() session: SessionContainer, @Body() article: NewsArticleDto) {
		return this.newsService.createArticle(article, session.getUserId());
	}

	@Patch(':newsId')
	@ApiOperation({summary: 'Update news article'})
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async updateNewsArticle(@Session() session: SessionContainer,@Param('newsId') id: number, @Body() article: NewsArticleDto) {
		if (await this.userService.getUserRole(session.getUserId()) != Role.ADMIN) {
			throw new HttpException('Only admin can modify this data', 403);
		}
		return this.newsService.updateArticle(id, article);
	}

	@Delete(':newsId')
	@ApiOperation({summary: 'Remove news article'})
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async removeNewsArticle(@Session() session: SessionContainer, @Param('newsId') id: number) {
		if (await this.userService.getUserRole(session.getUserId()) != Role.ADMIN) {
			throw new HttpException('Only admin can modify this data', 403);
		}
		return this.newsService.deleteArticle(id);
	}
}