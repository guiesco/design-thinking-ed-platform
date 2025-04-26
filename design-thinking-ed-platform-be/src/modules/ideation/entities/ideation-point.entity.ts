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
import { IdeationIdea } from './ideation-idea.entity';

export enum IdeationPointType {
  PRO = 'pro',
  CON = 'con',
}

@Entity('ideation_points')
export class IdeationPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: IdeationPointType,
  })
  type: IdeationPointType;

  @Column({ default: 0 })
  upvotes: number;

  hasVoted: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => IdeationIdea, (idea) => idea.points, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idea_id' })
  idea: IdeationIdea;

  @Column({ name: 'idea_id' })
  ideaId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
