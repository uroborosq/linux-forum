import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Controller, Get, HttpException, Post } from "@nestjs/common";
import { ArticleCategory } from "@prisma/client";
import { InputArticleDto } from "../article/article.dto";

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
    constructor() {
    }

    @Get()
    async getCategories(): Promise<ArticleCategory[]> {
      throw new HttpException('Not implemented', 501)
    }

    @Post()
    @ApiBody({type: InputArticleDto})
    async addCategory(): Promise<ArticleCategory> {
      throw new HttpException('Not implemented', 501)
    }
}
