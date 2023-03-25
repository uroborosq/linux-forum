import { Body, Controller, Get, HttpException, Param, Patch, Post, Put, Query } from "@nestjs/common";

import {
  ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags
} from "@nestjs/swagger";
import { Role, User } from "@prisma/client";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get(":userId")
  @ApiParam({
    name: "userId",
    type: "int"
  })
  @ApiOperation({
    summary: "Get user info"
  })
  @ApiResponse({
    status: 200,
    description: "User info successfully received"
  })
  @ApiResponse({
    status: 404,
    description: "User with such id doesn't exist"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async getUser(@Param("userId") userId: number): Promise<User> {
    throw new HttpException('Not Implemented', 501)
    // return this.userService.getUser(userId)
  }
  @Post()
  @ApiBody({
    type: UserDto
  })
  @ApiOperation({
    summary: "Create new user"
  })
  @ApiResponse({
    status: 200,
    description: "User info successfully received"
  })
  @ApiResponse({
    status: 404,
    description: "User with such id doesn't exist"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async addUser(@Query('email') email: string, @Query('name') name: string, @Query('country') country: string): Promise<User> {
    throw new HttpException('Not Implemented', 501)
    // return this.userService.addUser(email, name, country)
  }
  @Patch(':userId')
  @ApiOperation({
    summary: "Change role of user"
  })
  @ApiResponse({
    status: 200,
    description: "User info successfully received"
  })
  @ApiResponse({
    status: 404,
    description: "User with such id doesn't exist"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async changeRole(@Param('userId') userId: number, @Query('role') role: Role) {
    throw new HttpException('Not Implemented', 501)
    // return this.userService.changeRole(userId, role)
  }
  @Put(":userId")
  @ApiOperation({
    summary: "Change user info"
  })
  @ApiResponse({
    status: 200,
    description: "User info successfully updated"
  })
  @ApiResponse({
    status: 404,
    description: "User with such id doesn't exist"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async updateUser(@Param('userId') userId: number, @Body() user: UserDto) {
    throw new HttpException('Not Implemented', 501)
  }

  @Get('/role/:userId')
  @ApiOperation({
    summary: "Get user role"
  })
  @ApiResponse({
    status: 200,
    description: "User info successfully updated"
  })
  @ApiResponse({
    status: 404,
    description: "User with such id doesn't exist"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async getUserRole(@Param('userId') userId: number): Promise<Role> {
    throw new HttpException('Not implemented', 501)
  }
}