import { ClassEntity } from 'src/modules/class/entities/class.entity';
import { GroupEntity } from 'src/modules/group/entities/group.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['student', 'professor'] })
  userType: string;

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.professor, { onDelete: 'SET NULL' })
  professorClasses: ClassEntity[];

  @ManyToOne(() => ClassEntity, (ClassEntity) => ClassEntity.students, { onDelete: 'SET NULL' })
  studentClass: ClassEntity;

  @ManyToOne(() => GroupEntity, (groupEntity) => groupEntity.students, { onDelete: 'SET NULL' })
  groups: GroupEntity;
}
