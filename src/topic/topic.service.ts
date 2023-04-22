import { OnModuleInit } from '@nestjs/common';
import { PrismaClient, Topic } from '@prisma/client';
import { TopicDto } from './topic.dto';
import { isUUID } from 'class-validator';

export class TopicService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	async get(id: number) : Promise<Topic> {
		return this.topic.findUnique({
			where: {
				id: id
			}
		});
	}

	async add(topic: TopicDto, userId:  string) {
		if (isUUID(userId)) {
			return this.topic.create({
				data: {
					description: topic.description,
					title: topic.title,
					authorId: userId,
				}
			});
		} else {
			return undefined;
		}
	}

	async deleteTopic(id: number) {
		await this.reply.deleteMany({
			where: {
				topicId: id
			}
		});
		return this.topic.delete({
			where: {
				id: id
			}
		});
	}

	async update(id: number, topic: TopicDto) {
		return this.topic.update({
			where: {
				id: id
			},
			data: {
				description: topic.description,
				title: topic.title,
			}
		});
	}

	async getPage(pageNumber: number) {
		return this.topic.findMany({
			skip: 25 * (pageNumber - 1),
			take: 25,
			orderBy: {
				updatedAt: 'desc'
			}
		});
	}


}