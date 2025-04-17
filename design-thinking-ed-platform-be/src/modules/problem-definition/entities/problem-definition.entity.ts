import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
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

  @Column()
  mainQuestion: string;

  @Column()
  targetAudience: string;

  @Column()
  consequences: string;

  @Column()
  alternativeView: string;

  @Column()
  socialFactors: string;

  @Column()
  problemDefinition: string;

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
