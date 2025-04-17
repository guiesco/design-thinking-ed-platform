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
import { ProblemDefinitionResponse } from 'src/modules/problem-definition/entities/problem-definition-response.entity';
import { ChallengeDefinition } from 'src/modules/challenge-definition/entities/challenge-definition.entity';
import { ProblemDefinition } from 'src/modules/problem-definition/entities/problem-definition.entity';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => GroupEntity, (group) => group.project)
  @JoinColumn()
  group: GroupEntity;

  @OneToOne(() => EmpathyMap, (empathyMap) => empathyMap.project)
  empathyMap: EmpathyMap;

  @OneToOne(
    () => ChallengeDefinition,
    (challengeDefinition) => challengeDefinition.project,
  )
  challengeDefinition: ChallengeDefinition;

  @OneToOne(
    () => ProblemDefinition,
    (problemDefinition) => problemDefinition.project,
  )
  problemDefinition: ProblemDefinition;

  @OneToMany(() => EmpathyMapResponse, (response) => response.project)
  empathyMapResponses: EmpathyMapResponse[];

  @OneToMany(() => ChallengeDefinitionResponse, (response) => response.project)
  challengeDefinitionResponses: ChallengeDefinitionResponse[];

  @OneToMany(() => ProblemDefinitionResponse, (response) => response.project)
  problemDefinitionResponses: ProblemDefinitionResponse[];

  @Column({ nullable: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
