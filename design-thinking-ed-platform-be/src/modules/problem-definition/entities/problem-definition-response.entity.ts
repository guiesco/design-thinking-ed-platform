import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ProjectEntity } from '../../project/entities/project.entity';

export enum ProblemDefinitionType {
  MAIN_QUESTION = 'main_question',
  TARGET_AUDIENCE = 'target_audience',
  CONSEQUENCES = 'consequences',
  DIFFERENT_PERSPECTIVE = 'different_perspective',
  SOCIAL_FACTORS = 'social_factors',
  ONE_SENTENCE = 'one_sentence',
}

@Entity('problem_definition_responses')
export class ProblemDefinitionResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ProblemDefinitionType,
    nullable: false,
  })
  type: ProblemDefinitionType;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: false })
  isSelected: boolean;

  hasVoted: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @Column({ name: 'project_id' })
  projectId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
