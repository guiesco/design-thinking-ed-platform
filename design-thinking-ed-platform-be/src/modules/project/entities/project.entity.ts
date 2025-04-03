import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GroupEntity } from '../../group/entities/group.entity';
import { EmpathyMap } from '../../empathy-map/entities/empathy-map.entity';
import { EmpathyMapResponse } from '../../empathy-map/entities/empathy-map-response.entity';
import { ChallengeDefinitionResponse } from '../../challenge-definition/entities/challenge-definition-response.entity';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => GroupEntity, (group) => group.project)
  @JoinColumn()
  group: GroupEntity;

  @OneToMany(() => EmpathyMap, (empathyMap) => empathyMap.project)
  empathyMaps: EmpathyMap[];

  @OneToMany(() => EmpathyMapResponse, (response) => response.project)
  empathyMapResponses: EmpathyMapResponse[];

  @OneToMany(() => ChallengeDefinitionResponse, (response) => response.project)
  challengeDefinitionResponses: ChallengeDefinitionResponse[];

  @Column({ nullable: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
