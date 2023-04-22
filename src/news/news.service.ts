import { PrismaService } from 'nestjs-prisma';
import { OnModuleInit } from '@nestjs/common';
import { Article, NewsArticle } from '@prisma/client';
import { NewsArticleDto } from './news.dto';
export class NewsService extends PrismaService implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	async getAll() : Promise<NewsArticle[]> {
		return this.newsArticle.findMany();
	}
	async getById(id: number): Promise<NewsArticle> {
		return this.newsArticle.findUnique({
			where: {
				id: id
			}
		});
	}
	async createArticle(article: NewsArticleDto, userId: string) : Promise<NewsArticle> {
		return this.newsArticle.create({
			data: {
				authorId: userId,
				title: article.title,
				text: article.text,
			}
		});
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
		});
	}

	async deleteArticle(id: number): Promise<NewsArticle> {
		return this.newsArticle.delete({
			where: {
				id: id
			}
		});
	}

}