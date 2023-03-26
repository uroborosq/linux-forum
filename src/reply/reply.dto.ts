import { ApiProperty } from '@nestjs/swagger';

export class ReplyDto {
	@ApiProperty()
		text: string;
	@ApiProperty()
		topicId: number;
}