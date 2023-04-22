import { ApiBody, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	Get, HttpException,
	Param,
	Patch,
	Post,
	UseFilters,
	UseGuards
} from '@nestjs/common';
import { Article, Role } from '@prisma/client';
import { InputArticleDto } from './article.dto';
import { ArticleService } from './article.service';
import { PrismaKnownRequestFilter, PrismaValidationErrorFilter } from 'src/prisma-exception-filter/prisma-known-request.filter';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Session } from 'src/auth/session.decorator';
import { UserService } from '../user/user.service';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
	constructor(private readonly articleService: ArticleService, private readonly userService: UserService){}
	@Get(':articleId')
	@ApiOperation({ summary: 'Get article by id' })
	@ApiResponse({ status: 200, description: 'Article exists and can be received' })
	@ApiResponse({ status: 403, description: 'User is not allowed to view this article' })
	@ApiResponse({ status: 404, description: 'Article with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getArticle(@Param('articleId') articleId: number): Promise<Article> {
		const article = await this.articleService.getById(articleId);
		if (article == undefined) {
			throw new HttpException('Not Found', 404);
		}
		return article;
	}

	@Get('/category/:categoryId')
	@ApiOperation({summary: 'Get articles by categoryId'})
	@ApiResponse({ status: 200, description: 'Article exists and can be received' })
	@ApiResponse({ status: 403, description: 'User is not allowed to view this article' })
	@ApiResponse({ status: 404, description: 'Article with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getArticleByCategoryId(@Param('articleId') articleId: number): Promise<Article[]> {
		return this.articleService.getByCategoryId(articleId);
	}

	@Post('')
	@ApiOperation({ summary: 'Create a new article' })
	@ApiBody({ type: InputArticleDto })
	@ApiResponse({ status: 200, description: 'Article created successfully' })
	@ApiResponse({ status: 403, description: 'User is not allowed to create articles' })
	@ApiResponse({ status: 400, description: 'Request contains invalid data' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async createArticle(@Session() session: SessionContainer, @Body() article: InputArticleDto) {
		if (await this.userService.getUserRole(session.getUserId()) != Role.ADMIN) {
			throw new HttpException('Only admins can create articles', 403);
		}
		return this.articleService.createArticle(article);
	}

	@Delete(':articleId')
	@ApiOperation({ summary: 'Delete article by id' })
	@ApiResponse({ status: 200, description: 'Article deleted' })
	@ApiResponse({ status: 403, description: 'User is not allowed to delete this article' })
	@ApiResponse({ status: 404, description: 'Article with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async deleteArticle(@Session() session: SessionContainer, @Param('articleId') articleId: number) {
		if (await this.userService.getUserRole(session.getUserId()) != Role.ADMIN) {
			throw new HttpException('Only admins can create articles', 403);
		}
		return this.articleService.remove(articleId);
	}

	@Patch('/:articleId')
	@ApiOperation({ summary: 'Update metadata such as description, etc of article by id' })
	@ApiResponse({ status: 200, description: 'Article updated' })
	@ApiResponse({ status: 403, description: 'User is not allowed to update this article' })
	@ApiResponse({ status: 404, description: 'Article with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async updateMetadata(@Session() session: SessionContainer, @Param('articleId') articleId: number, @Body() article: InputArticleDto) {
		if (await this.userService.getUserRole(session.getUserId()) != Role.ADMIN) {
			throw new HttpException('Only admins can create articles', 403);
		}
		return this.articleService.updateArticle(articleId, article);
	}
}



