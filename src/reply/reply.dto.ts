import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class ReplyDto {
	@IsString()
	@ApiProperty()
		text: string
	@IsNumber()
	@ApiProperty()
		topicId: number
}

export class TextDto {
	@IsString()
	@ApiProperty()
		text: string
}