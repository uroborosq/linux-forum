import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	NotImplementedException,
	Param,
	Patch,
	Post
} from '@nestjs/common';
import { Article } from '@prisma/client';
import { throwIfEmpty } from 'rxjs';
import { InputArticleDto } from './article.dto';

@ApiTags('articles')
@Controller('controllers')
export class ArticleController {
	@Get(':articleId')
	@ApiOperation({
		summary: 'Get article by id'
	})
	@ApiParam({
		name: 'articleId',
		type: 'int'
	})
	@ApiResponse({
		status: 200,
		description: 'Article exists and can be received'
	})
	@ApiResponse({
		status: 403,
		description: 'User is not allowed to view this article'
	})
	@ApiResponse({
		status: 404,
		description: 'Article with such id doesn\'t exist'
	})
	@ApiResponse({
		status: 500,
		description: 'Internal error'
	})
	async getArticle(@Param('articleId') articleId: number): Promise<Article> {
		throw new HttpException('Not Implemented', 501);
	}

	@Post()
	@ApiOperation({
		summary: 'Create a new article'
	})
	@ApiBody({
		type: InputArticleDto
	})
	@ApiResponse({
		status: 200,
		description: 'Article created successfully'
	})
	@ApiResponse({
		status: 403,
		description: 'User is not allowed to create articles'
	})
	@ApiResponse({
		status: 400,
		description: 'Request contains invalid data'
	})
	@ApiResponse({
		status: 500,
		description: 'Internal error'
	})
	async createArticle(@Body() article: Article) {
		throw new HttpException('Not implemented', 501);
	}

	@Delete(':articleId')
	@ApiOperation({
		summary: 'Delete article by id'
	})
	@ApiParam({
		name: 'articleId',
		type: 'int'
	})
	@ApiResponse({
		status: 200,
		description: 'Article deleted'
	})
	@ApiResponse({
		status: 403,
		description: 'User is not allowed to delete this article'
	})
	@ApiResponse({
		status: 404,
		description: 'Article with such id doesn\'t exist'
	})
	@ApiResponse({
		status: 500,
		description: 'Internal error'
	})
	async deleteArticle(@Param('articleId') articleId: number) {
		throw new HttpException('Not implemented', 501);
	}

	@Patch('/text/:articleId')
	@ApiOperation({
		summary: 'Edit text of a reply by id'
	})
	@ApiParam({
		name: 'articleId',
		type: 'int'
	})
	@ApiBody({ type: String })
	@ApiResponse({
		status: 200,
		description: 'Article deleted'
	})
	@ApiResponse({
		status: 403,
		description: 'User is not allowed to delete this article'
	})
	@ApiResponse({
		status: 404,
		description: 'Article with such id doesn\'t exist'
	})
	@ApiResponse({
		status: 500,
		description: 'Internal error'
	})
	async editText(@Param('articleId') articleId: number, @Body() text: string) {
		throw new HttpException('Not implemented', 501);
	}

	@Patch('/metadata/:articleId')
	@ApiOperation({
		summary: 'Update metadata such as description, etc of article by id'
	})
	@ApiParam({
		name: 'articleId',
		type: 'int'
	})
	@ApiResponse({
		status: 200,
		description: 'Article updated'
	})
	@ApiResponse({
		status: 403,
		description: 'User is not allowed to update this article'
	})
	@ApiResponse({
		status: 404,
		description: 'Article with such id doesn\'t exist'
	})
	@ApiResponse({
		status: 500,
		description: 'Internal error'
	})
	async updateMetadata(@Param('articleId') articleId: number, @Body() b: any) {
		throw new HttpException('Not implemented', 501);
	}
}



