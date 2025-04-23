import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ProjectEntity } from '../../project/entities/project.entity';
@Entity('problem_definitions')
export class ProblemDefinition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true, array: true })
  mainQuestion: string[];

  @Column({ type: 'text', nullable: true, array: true })
  targetAudience: string[];

  @Column({ type: 'text', nullable: true, array: true })
  consequences: string[];

  @Column({ type: 'text', nullable: true, array: true })
  alternativeView: string[];

  @Column({ type: 'text', nullable: true, array: true })
  socialFactors: string[];

  @Column({ type: 'text', nullable: true, array: true })
  problemDefinition: string[];

  @OneToMany(() => UserEntity, (user) => user.problemDefinition)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => ProjectEntity, (project) => project.problemDefinition)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @Column({ name: 'project_id' })
  projectId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
