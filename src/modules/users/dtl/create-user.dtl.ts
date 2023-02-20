import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDTL {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  lastName: string;
}
