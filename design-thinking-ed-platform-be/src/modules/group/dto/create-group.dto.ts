import { IsArray, IsObject, IsString } from 'class-validator';
import { ClassEntity } from 'src/modules/class/entities/class.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class CreateGroupDto {
  @IsString()
  groupName: string;

  @IsArray()
  students: UserEntity[];

  @IsObject()
  class: ClassEntity;
}
