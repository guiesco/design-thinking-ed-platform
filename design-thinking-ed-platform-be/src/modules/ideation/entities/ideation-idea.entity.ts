import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ProjectEntity } from '../../project/entities/project.entity';
import { IdeationPoint } from './ideation-point.entity';

@Entity('ideation_ideas')
export class IdeationIdea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

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

  @ManyToOne(() => ProjectEntity, (project) => project.ideationIdeas)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @Column({ name: 'project_id' })
  projectId: number;

  @OneToMany(() => IdeationPoint, (point) => point.idea, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  points: IdeationPoint[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
