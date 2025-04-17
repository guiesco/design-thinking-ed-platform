import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { GroupEntity } from '../group/entities/group.entity';
import { EmpathyMap } from '../empathy-map/entities/empathy-map.entity';
import { ChallengeDefinition } from '../challenge-definition/entities/challenge-definition.entity';
import { ProblemDefinition } from '../problem-definition/entities/problem-definition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      GroupEntity,
      EmpathyMap,
      ChallengeDefinition,
      ProblemDefinition,
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
