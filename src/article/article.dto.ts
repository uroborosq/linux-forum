import { ApiProduces, ApiProperty } from '@nestjs/swagger';

export class InputArticleDto {
	@ApiProperty()
		title: string;
	@ApiProperty()
		text: string;
	@ApiProperty()
		categoryId: number;
	@ApiProperty()
		maintainerIds: number[];
}