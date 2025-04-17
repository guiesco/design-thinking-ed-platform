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
