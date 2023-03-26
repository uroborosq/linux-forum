import { ApiProperty } from '@nestjs/swagger';

export class InputCategoryDto{
	@ApiProperty()
		name: string;
	@ApiProperty()
		parentId: number;
}