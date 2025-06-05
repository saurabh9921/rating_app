
import { IsOptional, IsString } from 'class-validator';

export class FilterStoreDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;
}