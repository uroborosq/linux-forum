import { OnModuleInit } from '@nestjs/common'
import { Article, PrismaClient } from '@prisma/client'
import { InputArticleDto } from './article.dto'

export class ArticleService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect()
	}
	async getById(id: number): Promise<Article> {
		return this.article.findUnique({
			where: {
				id: id
			}
		})
	}

	async getByCategoryId(id: number): Promise<Article[]> {
		return this.article.findMany({
			where: {
				categoryId: id
			}
		})
	}

	async createArticle(articleDto: InputArticleDto): Promise<Article> {
		const article = await this.article.create({
			data: {
				text: articleDto.text,
				categoryId: articleDto.categoryId,
				title: articleDto.title
			}
		})
		return article
	}

	async remove(id: number) {
		return this.article.delete({
			where: {
				id: id
			}
		})
		// this.userOnArticles.delete({
		// 	where: {
		// 		userId_articleI: id
		// 	}
		// })
	}

	async updateArticle(id: number, article: InputArticleDto): Promise<Article> {
		return this.article.update({
			where: {
				id: id
			},
			data: {
				categoryId: article.categoryId,
				title: article.title,
				text: article.text,
			}
		})
	}
}