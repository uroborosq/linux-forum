import { PrismaClient, User, Role } from '@prisma/client'
import { NotImplementedException, OnModuleInit } from '@nestjs/common'
import { UserDto } from './user.dto'
import { isUUID } from 'class-validator'
export class UserService extends PrismaClient implements OnModuleInit{
	async onModuleInit() {
		await this.$connect()
	}

	async getUser(id: string): Promise<User> {
		return this.user.findFirst({
			where: {
				id : id
			}
		})
	}

	async addUser(user: UserDto, userId: string): Promise<User> {
		if (isUUID(userId)) {
			return this.user.create({
				data: {
					id: userId,
					email: user.email,
					name: user.name,
					country: user.country
				}
			})
		}
		return undefined
	}
	async changeRole(id: string, role: Role): Promise<User> {
		return this.user.update({
			where: {
				id : id
			},
			data : {
				role: role
			}
		})
	}
	async getUserRole(id: string): Promise<Role> {
		const role = await this.user.findUnique({
			where: {
				id : id
			},
			select: {
				role : true
			},
		})
		if (role == null) {
			return null
		}
		return role.role
	}

	async updateUser(id: string, user: UserDto) {
		return this.user.update({
			where: {
				id : id
			},
			data : {
				name : user.name,
				country : user.country,
				email : user.email
			}
		})
	}

	async getPage(pageNumber: number) {
		return this.user.findMany({
			skip: 25 * (pageNumber - 1),
			take: 25,
			orderBy: {
				id: 'asc'
			}
		})
	}

	async getPageNumber() {
		const replies = await this.user.aggregate({
			_count: {
				id: true
			},
		})
		return Math.ceil(Number(replies._count.id) / 25)
	}
}