import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
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
} from '@nestjs/common'
import { ArticleCategory, Role } from '@prisma/client'
import { InputCategoryDto } from './category.dto'
import { CategoryService } from './category.service'
import {
	PrismaKnownRequestFilter,
	PrismaValidationErrorFilter
} from '../prisma-exception-filter/prisma-known-request.filter'
import { UserService } from '../user/user.service'
import { AuthGuard } from '../auth/auth.guard'
import { SessionContainer } from 'supertokens-node/recipe/session'
import { Session } from '../auth/session.decorator'

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService, private readonly userService: UserService) {}
	@Get()
	@ApiOperation({ summary: 'Get all categories' })
	@ApiResponse({ status: 200, description: 'Get all categories without problems' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getCategories(): Promise<ArticleCategory[]> {
		return this.categoryService.getAll()
	}

	@Post()
	@ApiOperation({ summary: 'Create a new category' })
	@ApiResponse({ status: 200, description: 'Category created successfully' })
	@ApiResponse({ status: 403, description: 'You don\'t have permission to create categories' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	@ApiResponse({ status: 400, description: 'Data is invalid' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async addCategory(@Session() session: SessionContainer,@Body() category: InputCategoryDto): Promise<ArticleCategory> {
		if (await this.userService.getUserRole(session.getUserId()) != Role.ADMIN) {
			throw new HttpException('Only admins can modify this data', 403)
		}
		return this.categoryService.createCategory(category)
	}

	@Patch(':id')
	@ApiOperation({summary: 'Update category'})
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async update(@Session() session: SessionContainer,@Param('id') id: number, @Body() category: InputCategoryDto) {
		if (await this.userService.getUserRole(session.getUserId()) != Role.ADMIN) {
			throw new HttpException('Only admins can modify this data', 403)
		}
		return this.categoryService.updateCategory(id, category)
	}

	@Delete(':id')
	@ApiOperation({summary: 'Delete category'})
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	@UseGuards(new AuthGuard())
	@ApiCookieAuth()
	async delete(@Session() session: SessionContainer,@Param('id') id: number) {
		if (await this.userService.getUserRole(session.getUserId()) != Role.ADMIN) {
			throw new HttpException('Only admins can modify this data', 403)
		}
		const response = await this.categoryService.remove(id)
		if (response == null) {
			throw new HttpException('Category have children', 400)
		}
		return response
	}

	@Get(':categoryId')
	@ApiOperation({summary: 'Get category'})
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async get(@Param('categoryId') categoryId: number) {
		return this.categoryService.get(categoryId)
	}

}
