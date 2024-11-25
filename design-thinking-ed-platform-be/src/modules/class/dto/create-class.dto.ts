import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectSteps } from 'src/common/enum/project.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class CreateClassDto {
  @IsString()
  className: string;

  @IsString()
  semester: string;

  @IsArray()
  invitedStudents: string[];

  @IsObject()
  professor: UserEntity;

  @IsEnum(ProjectSteps)
  @IsOptional()
  projectStep: ProjectSteps;
}
