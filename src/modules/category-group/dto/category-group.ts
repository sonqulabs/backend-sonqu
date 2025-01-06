import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CategoryGroupDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name: string;
}
