import { Controller, Get, HttpException, Param, Patch, Post, Query } from "@nestjs/common";

import {
  ApiBearerAuth, ApiTags
} from "@nestjs/swagger";
import { Role, User } from "@prisma/client";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get(":userId")
  async getUser(@Param("userId") userId: number): Promise<User> {
    throw new HttpException('Not Implemented', 501)
    // return this.userService.getUser(userId)
  }
  @Post()
  async addUser(@Query('email') email: string, @Query('name') name: string, @Query('country') country: string): Promise<User> {
    throw new HttpException('Not Implemented', 501)

    return this.userService.addUser(email, name, country)
  }
  @Patch(':userId')
async changeRole(@Param('userId') userId: number, @Query('role') role: Role) {
    throw new HttpException('Not Implemented', 501)

    return this.userService.changeRole(userId, role)
  }
}