import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { ProjectEntity } from '../project/entities/project.entity';
import { UserEntity } from '../user/entities/user.entity';
import { EmpathyMapResponse } from '../empathy-map/entities/empathy-map-response.entity';
import { ProblemDefinitionResponse } from '../problem-definition/entities/problem-definition-response.entity';
import { ChallengeDefinitionResponse } from '../challenge-definition/entities/challenge-definition-response.entity';
import { IdeationIdea } from '../ideation/entities/ideation-idea.entity';
import { IdeationPoint } from '../ideation/entities/ideation-point.entity';
import { UserVoteModule } from '../user-vote/user-vote.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      UserEntity,
      EmpathyMapResponse,
      ProblemDefinitionResponse,
      ChallengeDefinitionResponse,
      IdeationIdea,
      IdeationPoint,
    ]),
    UserVoteModule,
  ],
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class MetricsModule {}
