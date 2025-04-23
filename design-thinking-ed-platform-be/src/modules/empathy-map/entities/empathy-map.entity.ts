import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ProjectEntity } from '../../project/entities/project.entity';

@Entity('empathy_maps')
export class EmpathyMap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true, array: true })
  think: string[];

  @Column({ type: 'text', nullable: true, array: true })
  feel: string[];

  @Column({ type: 'text', nullable: true, array: true })
  say: string[];

  @Column({ type: 'text', nullable: true, array: true })
  do: string[];

  @Column({ type: 'text', nullable: true, array: true })
  pains: string[];

  @Column({ type: 'text', nullable: true, array: true })
  needs: string[];

  @OneToMany(() => UserEntity, (user) => user.empathyMap)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => ProjectEntity, (project) => project.empathyMap)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @Column({ name: 'project_id' })
  projectId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
