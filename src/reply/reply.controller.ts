import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from "@nestjs/common";
import { Reply } from "@prisma/client";

@ApiTags("replies")
@Controller("replies")
export class ReplyController {
  constructor() {
  }

  @Get('/id/:replyId')
  async getReply(@Param('replyId') postId: number): Promise<Reply> {
    throw new HttpException('Not implemented', 501)
  }

  @Get('/topic/:topicId')
  async getRepliesByTopicId(@Param('topicId') topicId: number): Promise<Reply[]> {
    throw new HttpException('Not implemented', 501)
  }

  @Post("")
  async createReply(@Body() data: Reply) {
    throw new HttpException('Not implemented', 501)
  }

  @Patch("/text/:replyId")
  async updateText(@Param('replyId') replyId: number) {
    throw new HttpException('Not implemented', 501)
  }

  @Delete(":replyId")
  async deleteReply(@Param("replyId") replyId: number) {
    throw new HttpException('Not implemented', 501)
  }

}
