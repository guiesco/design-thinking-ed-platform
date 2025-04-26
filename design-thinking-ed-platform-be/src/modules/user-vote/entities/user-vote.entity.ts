import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
