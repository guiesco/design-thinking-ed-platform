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

@Entity('empathy_maps')
export class EmpathyMap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  think: string;

  @Column()
  feel: string;

  @Column()
  say: string;

  @Column()
  do: string;

  @Column()
  pains: string;

  @Column()
  needs: string;

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: false })
  isSelected: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => ProjectEntity, (project) => project.empathyMaps)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @Column({ name: 'project_id' })
  projectId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
