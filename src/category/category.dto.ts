import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class InputCategoryDto{
	@IsString()
	@ApiProperty()
		name: string
	@IsNumber()
	@ApiProperty()
		parentId: number
}