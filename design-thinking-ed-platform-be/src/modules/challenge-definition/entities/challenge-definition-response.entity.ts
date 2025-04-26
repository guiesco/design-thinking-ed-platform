import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserVote } from '../../user-vote/entities/user-vote.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';

export enum ResponseType {
  PROBLEMS = 'PROBLEMS',
  TARGET_AUDIENCE = 'TARGET_AUDIENCE',
  HOW_WE_CAN = 'HOW_WE_CAN',
  BRAINSTORM = 'BRAINSTORM',
}

@Entity()
export class ChallengeDefinitionResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ResponseType,
  })
  type: ResponseType;

  @Column('text')
  content: string;

  @Column({ default: false })
  isSelected: boolean;

  @ManyToOne(() => UserEntity, (user) => user.challengeDefinitionResponses)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.challengeDefinitionResponses,
  )
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @Column({ name: 'project_id' })
  projectId: number;

  @OneToMany(() => UserVote, (vote) => vote.entityId)
  votes: UserVote[];

  @Column({ default: 0 })
  upvotes: number;

  hasVoted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
