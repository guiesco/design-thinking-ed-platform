import { ProjectSteps } from 'src/common/enum/project.enum';
import { ClassEntity } from 'src/modules/class/entities/class.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class GroupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  groupName: string;

  @OneToMany(() => UserEntity, (user) => user.name)
  students: UserEntity[];

  @ManyToOne(() => ClassEntity, (classEntity) => classEntity.groups)
  class: ClassEntity;
}

