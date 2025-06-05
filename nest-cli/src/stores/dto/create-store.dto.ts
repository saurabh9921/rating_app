import { IsEmail, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MaxLength(60)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(400)
  address: string;

   @IsNumber()
  userId: number;
}