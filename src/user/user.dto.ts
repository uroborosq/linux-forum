import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class UserDto {
	@IsEmail()
	@ApiProperty()
		email: string
	@ApiProperty()
		name: string | null
	@ApiProperty()
		country: string | null
}