import { ArticleCategory, PrismaClient } from '@prisma/client'
import { OnModuleInit } from '@nestjs/common'
import { InputCategoryDto } from './category.dto'

export class CategoryService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect()
	}

	async getAll(): Promise<ArticleCategory[]> {
		return this.articleCategory.findMany({
			orderBy: {
				id: 'asc'
			}
		})
	}
	async createCategory(category: InputCategoryDto): Promise<ArticleCategory> {
		return this.articleCategory.create({
			data: {
				name: category.name,
				parentId: category.parentId
			}
		})
	}

	async updateCategory(id: number, category: InputCategoryDto): Promise<ArticleCategory> {
		return this.articleCategory.update({
			where: {
				id: id
			},
			data: {
				name: category.name,
				parentId: category.parentId,
			}
		})
	}

	async remove(id: number) {
		const children = await this.articleCategory.findMany({
			where: {
				parentId: id
			}
		})
		if (children.length != 0) {
			return null
		}

		return this.articleCategory.delete({
			where: {
				id: id,
			}
		})
	}	

	async get(id: number) {
		return this.articleCategory.findUnique({
			where: {
				id: id
			}
		})
	}
}