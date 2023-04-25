import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class NewsArticleDto {
	@IsString()
	@ApiProperty()
		title: string
	@IsString()
	@ApiProperty()
		text: string
}