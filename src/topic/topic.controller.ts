import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Topic } from "@prisma/client";

@ApiTags("topics")
@Controller("topics")

export class TopicsController {
  constructor() {
  }

  @Get(':topicId')
  async getTopic(@Param('topicId') topicId: number): Promise<Topic> {
    throw new HttpException('Not implemented', 501)
  }

  @Post()
  async createTopic(@Body() topic: Topic): Promise<Topic> {
    throw new HttpException('Not implemented', 501)
  }

  @Delete(':topicId')
  async deleteTopic(@Param(':topicId') topicId: number) {
    throw new HttpException('Not implemented', 501)
  }

  @Put(':topicId')
  async updateTopic(@Param('topicId') topicId: number) {
    throw new HttpException('Not implemented', 501)
  }
}