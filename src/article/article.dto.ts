import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class InputArticleDto {
	@ApiProperty()
		title: string
	@ApiProperty()
		text: string
	@IsNumber()
	@ApiProperty()
		categoryId: number
}