import {
	Body,
	Controller,
	Get,
	HttpException,
	Param,
	Patch,
	Post,
	Put,
	Query,
	UseFilters
} from '@nestjs/common'

import {
	ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags
} from '@nestjs/swagger'
import { User, Role } from '@prisma/client'
import { UserService } from './user.service'
import { UserDto } from './user.dto'
import { PrismaKnownRequestFilter, PrismaValidationErrorFilter } from '../prisma-exception-filter/prisma-known-request.filter'


@ApiTags('users')
@Controller('users')
@UseFilters(PrismaKnownRequestFilter)
@UseFilters(PrismaValidationErrorFilter)
export class UserController {
	constructor(private readonly userService: UserService) {
	}
	@Get(':userId')
	@ApiParam({ name: 'userId', type: 'number' })
	@ApiOperation({ summary: 'Get user info' })
	@ApiResponse({ status: 200, description: 'User info successfully received' })
	@ApiResponse({ status: 404, description: 'User with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getUser(@Param('userId') userId: string): Promise<User> {
		const user = await this.userService.getUser(userId)
		if (user == undefined) {
			throw new HttpException('Not Found', 404)
		}
		return user
	}
	@Patch(':userId')
	@ApiOperation({ summary: 'Change role of user' })
	@ApiResponse({ status: 200, description: 'User info successfully received' })
	@ApiResponse({ status: 404, description: 'User with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async changeRole(@Param('userId') userId: string, @Query('role') role: Role): Promise<User> {
		const user = await this.userService.changeRole(userId, role)
		if (user == undefined) {
			throw new HttpException('Not found', 404)
		}
		return user
	}
	@Put(':userId')
	@ApiOperation({ summary: 'Change user info' })
	@ApiResponse({ status: 200, description: 'User info successfully updated' })
	@ApiResponse({ status: 404, description: 'User with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async updateUser(@Param('userId') userId: string, @Body() user: UserDto) {
		return this.userService.updateUser(userId, user)
	}
	@Get('/role/:userId')
	@ApiOperation({ summary: 'Get user role' })
	@ApiResponse({ status: 200, description: 'User info successfully updated' })
	@ApiResponse({ status: 404, description: 'User with such id doesn\'t exist' })
	@ApiResponse({ status: 500, description: 'Internal error' })
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getUserRole(@Param('userId') userId: string): Promise<Role> {
		const role = await this.userService.getUserRole(userId)
		if (role == undefined) {
			throw new HttpException('Not Found', 404)
		}
		return role
	}
	@Get('/page/:pageNumber')
	@ApiOperation({summary: 'Get certain page'})
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getPage(@Param('pageNumber') pageNumber: number): Promise<User[]> {
		return this.userService.getPage(pageNumber)
	}

	@Get('/pages')
	@UseFilters(PrismaKnownRequestFilter)
	@UseFilters(PrismaValidationErrorFilter)
	async getNumberOfPages() {
		return this.getNumberOfPages()
	}
}
