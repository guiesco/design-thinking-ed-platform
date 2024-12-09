import { ProjectSteps } from 'src/common/enum/project.enum';
import { GroupsEntity } from 'src/modules/groups/entities/group.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  className: string;

  @Column({ type: 'varchar', length: 30 })
  semester: string;

  @Column({ type: 'text', nullable: true, array: true })
  invitedStudents: string[];

  @ManyToOne(() => UserEntity, (user) => user.classes)
  professor: UserEntity;

  @OneToMany(() => GroupsEntity, (group) => group.class)
  groups: GroupsEntity;

  @Column({ type: 'enum', enum: ProjectSteps })
  projectStep: ProjectSteps;
}
