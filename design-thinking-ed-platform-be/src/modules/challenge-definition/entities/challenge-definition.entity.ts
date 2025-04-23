import { ProjectEntity } from 'src/modules/project/entities/project.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity('challenge_definition')
export class ChallengeDefinition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'problems', type: 'text', nullable: true, array: true })
  problems: string[];

  @Column({
    name: 'target_audience',
    type: 'text',
    nullable: true,
    array: true,
  })
  targetAudience: string[];

  @Column({
    name: 'how_we_can',
    type: 'text',
    nullable: true,
    array: true,
  })
  howWeCan: string[];

  @Column({
    name: 'brainstorm',
    type: 'text',
    nullable: true,
    array: true,
  })
  brainstorm: string[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => UserEntity, (user) => user.challengeDefinition)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => ProjectEntity, (project) => project.challengeDefinition)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @Column({ name: 'project_id' })
  projectId: number;
}
