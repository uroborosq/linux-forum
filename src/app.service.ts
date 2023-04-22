import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit{
	async onModuleInit() {
		await this.$connect();
	}
	async getLatestNews(n: number) {
		return this.newsArticle.findMany({
			take: n,
			orderBy: {
				updatedAt: 'desc'
			},
			select: {
				title: true
			}
		});
	}

	async getTopicName(topicId: number) {
		return this.topic.findUnique({
			where: {
				id: topicId
			},
			select: {
				title: true
			}
		});
	}
}
