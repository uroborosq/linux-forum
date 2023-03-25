import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Topic } from "@prisma/client";
import { TopicDto } from "./topic.dto";

@ApiTags("topics")
@Controller("topics")

export class TopicsController {
  constructor() {
  }

  @Get(':topicId')
  @ApiParam({
    name: "topicId",
    type: "int"
  })
  @ApiOperation({
    summary: "Get topic"
  })
  @ApiResponse({
    status: 200,
    description: "Topic successfully received"
  })
  @ApiResponse({
    status: 404,
    description: "Topic with such id doesn't exist"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async getTopic(@Param('topicId') topicId: number): Promise<Topic> {
    throw new HttpException('Not implemented', 501)
  }

  @Post()
  @ApiBody({
    type: TopicDto
  })
  @ApiOperation({
    summary: "Create topic"
  })
  @ApiResponse({
    status: 200,
    description: "Topic successfully created"
  })
  @ApiResponse({
    status: 400,
    description: "Invalid data"
  })
  @ApiResponse({
    status: 403,
    description: "User can't create topics"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async createTopic(@Body() topic: Topic): Promise<Topic> {
    throw new HttpException('Not implemented', 501)
  }

  @Delete(':topicId')
  @ApiParam({
    name: "topicId",
    type: "int"
  })
  @ApiOperation({
    summary: "Delete topic"
  })
  @ApiResponse({
    status: 200,
    description: "Topic successfully deleted"
  })
  @ApiResponse({
    status: 403,
    description: "User can't delete topics"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async deleteTopic(@Param(':topicId') topicId: number) {
    throw new HttpException('Not implemented', 501)
  }

  @Put(':topicId')
  @ApiBody({
    type: TopicDto
  })
  @ApiParam({
    name: "topicId",
    type: "int"
  })
  @ApiOperation({
    summary: "Update topic text"
  })
  @ApiResponse({
    status: 200,
    description: "Topic successfully updated"
  })
  @ApiResponse({
    status: 400,
    description: "Invalid data"
  })
  @ApiResponse({
    status: 403,
    description: "User can't update topics"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async updateTopic(@Param('topicId') topicId: number) {
    throw new HttpException('Not implemented', 501)
  }
}