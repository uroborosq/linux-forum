import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class UserDto {
  @ApiProperty()
  email: string
  @ApiProperty()
  name: string | null
  @ApiProperty()
  country: string | null
}