import { OnModuleInit } from '@nestjs/common';
import { PrismaClient, Reply } from '@prisma/client';
import { ReplyDto } from './reply.dto';
import { isUUID } from 'class-validator';

export class ReplyService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	async get(id: number): Promise<Reply> {
		return this.reply.findUnique({
			where: {
				id: id
			}
		});
	}

	async getByTopicId(id: number, pageNumber: number) {
		return this.reply.findMany({
			skip: 25 * (pageNumber - 1),
			take: 25,
			where: {
				topicId: id
			},
			orderBy: {
				createdAt: 'asc'
			},
			include: {
				author: {
					select: {
						name: true
					}
				}
			}
		});
	}

	async create(reply: ReplyDto, userId: string): Promise<Reply> {
		if (isUUID(userId)) {
			const newReply = await this.reply.create({
				data: {
					topicId: reply.topicId,
					text: reply.text,
					authorId: userId,
				}
			});

			await this.topic.update({
				where: {
					id: reply.topicId
				},
				data: {
					updatedAt: new Date(),
				}
			});
			return newReply;
		} else {
			return undefined;
		}
	}

	async updateText(id: number, text: string) {
		return this.reply.update({
			where: {
				id: id
			},
			data: {
				text: text
			}
		});
	}

	async delete(id: number) {
		return this.reply.delete({
			where: {
				id: id
			}
		});
	}

	async getNumberPages(topicId: number) {
		const replies = await this.reply.aggregate({
			_count: {
				id: true
			},
			where: {
				topicId: topicId
			}
		});
		return Math.ceil(Number(replies._count.id) / 25);
	}
}

