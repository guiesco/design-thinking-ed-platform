import {
  IsEmail,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ClassEntity } from 'src/modules/class/entities/class.entity';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsString()
  @IsEnum(['student', 'professor'])
  @IsOptional()
  userType?: string;

  @IsNotEmpty()
  //   @Matches(passwordRegEx, {
  //     message: `Password must contain Minimum 8 and maximum 20 characters,
  //       at least one uppercase letter,
  //       one lowercase letter,
  //       one number and
  //       one special character`,
  //   })
  password: string;

  @IsNotEmpty()
  class: ClassEntity;
}
