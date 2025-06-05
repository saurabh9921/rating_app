import { IsString, Length, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*\W).*$/, {
    message: 'Password must contain at least one uppercase letter and one special character',
  })
  newPassword: string;
}