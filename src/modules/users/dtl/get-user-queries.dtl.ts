import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { SortOrder } from 'src/enums/order.enum';
import { toBoolean } from 'src/transformers/boolean.transformer';
import { SortedUserField } from '../enums/sort-user-field.enum';

export class GetUserQueriesDTL {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit = 25;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  offset = 0;

  @ApiProperty()
  @IsOptional()
  @IsEnum(SortOrder)
  order: SortOrder = SortOrder.ASC;

  @ApiProperty()
  @IsOptional()
  @IsEnum(SortedUserField)
  sort: SortedUserField = SortedUserField.ID;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => toBoolean(value))
  show_deleted = false;
}
