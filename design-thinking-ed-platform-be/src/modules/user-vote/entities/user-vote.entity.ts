import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { EmpathyMapResponse } from '../../empathy-map/entities/empathy-map-response.entity';
import { ChallengeDefinitionResponse } from '../../challenge-definition/entities/challenge-definition-response.entity';
import { VoteableEntityType } from '../enums/voteable-entity-type.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';
@Entity()
export class UserVote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: VoteableEntityType,
  })
  entityType: VoteableEntityType;

  @Column()
  entityId: number;

  @ManyToOne(() => EmpathyMapResponse)
  empathyMapResponse: EmpathyMapResponse;

  @ManyToOne(() => ChallengeDefinitionResponse)
  challengeDefinitionResponse: ChallengeDefinitionResponse;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
