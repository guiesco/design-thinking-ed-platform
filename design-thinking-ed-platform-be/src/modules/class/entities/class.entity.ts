import { ProjectSteps } from 'src/common/enum/project.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'enum', enum: ProjectSteps })
  projectStep: ProjectSteps;
}
