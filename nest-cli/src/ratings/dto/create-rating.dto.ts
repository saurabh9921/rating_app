import { IsInt, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsInt()
  userId: number;

  @IsInt()
  storeId: number;
}