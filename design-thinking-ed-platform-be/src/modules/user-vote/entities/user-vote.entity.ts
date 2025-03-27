import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { VoteType, VoteableEntityType } from '../enums/vote.enum';

@Entity('user_votes')
export class UserVote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({
    type: 'enum',
    enum: VoteableEntityType,
  })
  entityType: VoteableEntityType;

  @Column({ name: 'entity_id' })
  entityId: number;

  @Column({
    type: 'enum',
    enum: VoteType,
  })
  voteType: VoteType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
