import { ProjectSteps } from 'src/common/enum/project.enum';
import { GroupEntity } from 'src/modules/group/entities/group.entity';
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

  @OneToMany(() => GroupEntity, (group) => group.class)
  groups: GroupEntity[];

  @Column({ type: 'enum', enum: ProjectSteps })
  projectStep: ProjectSteps;

  @ManyToOne(() => UserEntity, (user) => user.professorClasses, { onDelete: 'SET NULL' })
  professor: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.studentClass, { onDelete: 'SET NULL' })
  students: UserEntity[];
}
