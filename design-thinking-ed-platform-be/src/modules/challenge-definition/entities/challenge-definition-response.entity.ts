import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
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
  user: UserEntity;

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.challengeDefinitionResponses,
  )
  project: ProjectEntity;

  @OneToMany(() => UserVote, (vote) => vote.challengeDefinitionResponse)
  votes: UserVote[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
