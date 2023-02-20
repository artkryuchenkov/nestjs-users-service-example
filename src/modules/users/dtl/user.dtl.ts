import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTL {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiPropertyOptional()
  deletedAt?: Date;
}
