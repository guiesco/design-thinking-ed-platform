import { ProjectSteps } from 'src/common/enum/project.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'enum', enum: ProjectSteps })
  projectStep: ProjectSteps;

  @ManyToOne(() => UserEntity, (user) => user.professorClasses)
  professor: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.studentClass)
  students: UserEntity[];
}
