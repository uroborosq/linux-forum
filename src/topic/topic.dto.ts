import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TopicDto {
	@IsString()
	@ApiProperty()
		description: string;
	@IsString()
	@ApiProperty()
		title: string;
}