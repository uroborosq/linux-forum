import { PrismaService } from 'nestjs-prisma'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { NewsArticle } from '@prisma/client'
import { NewsArticleDto } from './news.dto'
@Injectable()
export class NewsService extends PrismaService implements OnModuleInit {
	constructor() {
		super()
	}

	async onModuleInit() : Promise<void> {
		await this.$connect()
	}

	async getAll() : Promise<NewsArticle[]> {
		return this.newsArticle.findMany()
	}
	async getById(id: number): Promise<NewsArticle> {
		return this.newsArticle.findUnique({
			where: {
				id: id
			}
		})
	}
	async createArticle(article: NewsArticleDto, userId: string) : Promise<NewsArticle> {
		return this.newsArticle.create({
			data: {
				authorId: userId,
				title: article.title,
				text: article.text,
			}
		})
	}

	async updateArticle(id: number, article: NewsArticleDto): Promise<NewsArticle> {
		return  this.newsArticle.update({
			where: {
				id: id
			},
			data: {
				title: article.title,
				text: article.text
			}
		})
	}

	async deleteArticle(id: number): Promise<NewsArticle> {
		return this.newsArticle.delete({
			where: {
				id: id
			}
		})
	}

	async getLastNews(n: number) : Promise<NewsArticle[]> {
		return this.newsArticle.findMany({
			orderBy: {
				updatedAt: 'desc'
			},
			take: n
		})
	}
}