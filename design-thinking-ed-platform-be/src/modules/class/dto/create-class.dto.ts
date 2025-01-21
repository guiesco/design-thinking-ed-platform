import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectSteps } from 'src/common/enum/project.enum';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  className: string;

  @IsString()
  @IsNotEmpty()
  semester: string;

  @IsArray()
  @IsNotEmpty()
  invitedStudents: string[];

  @IsObject()
  professor: CreateUserDto;

  @IsEnum(ProjectSteps)
  @IsOptional()
  projectStep: ProjectSteps;
}
