import { ClassEntity } from 'src/modules/class/entities/class.entity';
import { GroupEntity } from 'src/modules/group/entities/group.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['student', 'professor'] })
  userType: string;

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.professor, {
    onDelete: 'SET NULL',
    eager: true,
  })
  professorClasses: ClassEntity[];

  @ManyToOne(() => ClassEntity, (ClassEntity) => ClassEntity.students, {
    onDelete: 'SET NULL',
    eager: true,
  })
  studentClass: ClassEntity;

  @ManyToOne(() => GroupEntity, (groupEntity) => groupEntity.students, {
    onDelete: 'SET NULL',
    eager: true,
  })
  group: GroupEntity;
}
