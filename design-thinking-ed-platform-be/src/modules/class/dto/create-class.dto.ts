import { IsEnum, IsObject, IsString } from 'class-validator';
import { ProjectSteps } from 'src/common/enum/project.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class CreateClassDto {
  @IsString()
  className: string;

  @IsString()
  semester: string;

  @IsString()
  students: string;

  @IsObject()
  professor: UserEntity;

  @IsEnum(ProjectSteps)
  projectStep: ProjectSteps;
}
