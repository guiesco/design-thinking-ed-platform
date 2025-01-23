import { ClassEntity } from 'src/modules/class/entities/class.entity';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  groupName: string;

  @OneToMany(() => UserEntity, (user) => user.group, {
    onDelete: 'SET NULL',
  })
  students: UserEntity[];

  @ManyToOne(() => ClassEntity, (classEntity) => classEntity.groups, {
    onDelete: 'SET NULL',
  })
  class: ClassEntity;

  @OneToOne(() => ProjectEntity, (projectEntity) => projectEntity.group, {
    onDelete: 'SET NULL',
  })
  project: ProjectEntity;
}
