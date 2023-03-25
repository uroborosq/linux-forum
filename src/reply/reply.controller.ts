import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from "@nestjs/common";
import { Reply } from "@prisma/client";
import { ReplyDto } from "./reply.dto";

@ApiTags("replies")
@Controller("replies")
export class ReplyController {
  constructor() {
  }

  @Get('/id/:replyId')
  @ApiOperation({
    summary: "Get reply by id"
  })
  @ApiParam({
    name: "replyId",
    type: "int"
  })
  @ApiResponse({
    status: 200,
    description: "Reply exists and can be received"
  })
  @ApiResponse({
    status: 403,
    description: "User is not allowed to view this reply"
  })
  @ApiResponse({
    status: 404,
    description: "Reply with such id doesn't exist"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async getReply(@Param('replyId') postId: number): Promise<Reply> {
    throw new HttpException('Not implemented', 501)
  }

  @Get('/topic/:topicId')
  @ApiOperation({
    summary: "Get reply by topic id"
  })
  @ApiParam({
    name: "replyId",
    type: "int"
  })
  @ApiResponse({
    status: 200,
    description: "Replies exists and can be received"
  })
  @ApiResponse({
    status: 403,
    description: "User is not allowed to view these replies"
  })
  @ApiResponse({
    status: 404,
    description: "Topic with such id doesn't exist"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async getRepliesByTopicId(@Param('topicId') topicId: number): Promise<Reply[]> {
    throw new HttpException('Not implemented', 501)
  }

  @Post("")
  @ApiBody({
    type: ReplyDto
  })
  @ApiOperation({
    summary: "Create reply"
  })
  @ApiResponse({
    status: 200,
    description: "Reply successfully posted"
  })
  @ApiResponse({
    status: 403,
    description: "User is not allowed to post this reply"
  })
  @ApiResponse({
    status: 404,
    description: "Topic with such id doesn't exist"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async createReply(@Body() data: Reply) {
    throw new HttpException('Not implemented', 501)
  }

  @Patch("/text/:replyId")
  @ApiBody({
    type: String
  })
  @ApiParam({
    name: "replyId",
    type: "int"
  })
  @ApiOperation({
    summary: "Update reply's text"
  })
  @ApiResponse({
    status: 200,
    description: "Reply successfully updated"
  })
  @ApiResponse({
    status: 403,
    description: "User is not allowed to update this reply"
  })
  @ApiResponse({
    status: 404,
    description: "Reply with such id doesn't exist"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async updateText(@Param('replyId') replyId: number) {
    throw new HttpException('Not implemented', 501)
  }

  @Delete(":replyId")
  @ApiParam({
    name: "replyId",
    type: "int"
  })
  @ApiOperation({
    summary: "Delete reply"
  })
  @ApiResponse({
    status: 200,
    description: "Reply successfully deleted"
  })
  @ApiResponse({
    status: 403,
    description: "User is not allowed to delete this reply"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  async deleteReply(@Param("replyId") replyId: number) {
    throw new HttpException('Not implemented', 501)
  }

}
