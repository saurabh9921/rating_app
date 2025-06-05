import { IsEmail, IsEnum, IsString, Length, Matches, MaxLength } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
// import { Role } from '../../common/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  @Length(20, 60)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(400)
  address: string;

  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])/, {
    message: 'Password must include one uppercase letter and one special character',
  })
  password: string;

  @IsEnum(Role)
  role: Role;
}