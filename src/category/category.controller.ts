import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpException, Post } from '@nestjs/common';
import { ArticleCategory } from '@prisma/client';
import { InputArticleDto } from '../article/article.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {


	@Get()
	@ApiOperation({
		summary: 'Get all categories'
	})
	@ApiResponse({
		status: 200,
		description: 'Get all categories without problems'
	})
	@ApiResponse({
		status: 500,
		description: 'Internal error'
	})
	async getCategories(): Promise<ArticleCategory[]> {
		throw new HttpException('Not implemented', 501);
	}

	@Post()
	@ApiOperation({
		summary: 'Create a new category'
	})
	@ApiBody({ type: InputArticleDto })
	@ApiResponse({
		status: 200,
		description: 'Category created successfully'
	})
	@ApiResponse({
		status: 403,
		description: 'You don\'t have permission to create categories'
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error'
	})
	@ApiResponse({
		status: 400,
		description: 'Data is invalid'
	})
	async addCategory(): Promise<ArticleCategory> {
		throw new HttpException('Not implemented', 501);
	}
}
