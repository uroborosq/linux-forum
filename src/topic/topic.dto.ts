import { ApiProperty } from '@nestjs/swagger';

export class TopicDto {
	@ApiProperty()
		description: string;
}