import { ClassEntity } from 'src/modules/class/entities/class.entity';
import { GroupEntity } from 'src/modules/group/entities/group.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmpathyMapResponse } from '../../empathy-map/entities/empathy-map-response.entity';
import { ChallengeDefinitionResponse } from '../../challenge-definition/entities/challenge-definition-response.entity';

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

  @OneToMany(() => EmpathyMapResponse, (response) => response.user)
  empathyMapResponses: EmpathyMapResponse[];

  @OneToMany(() => ChallengeDefinitionResponse, (response) => response.user)
  challengeDefinitionResponses: ChallengeDefinitionResponse[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
