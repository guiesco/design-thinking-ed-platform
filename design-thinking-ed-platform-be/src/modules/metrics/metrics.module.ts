import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { ProjectEntity } from '../project/entities/project.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserVote } from '../user-vote/entities/user-vote.entity';
import { UserVoteService } from '../user-vote/user-vote.service';
import { EmpathyMapResponse } from '../empathy-map/entities/empathy-map-response.entity';
import { ProblemDefinitionResponse } from '../problem-definition/entities/problem-definition-response.entity';
import { ChallengeDefinitionResponse } from '../challenge-definition/entities/challenge-definition-response.entity';
import { IdeationIdea } from '../ideation/entities/ideation-idea.entity';
import { IdeationPoint } from '../ideation/entities/ideation-point.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      UserEntity,
      UserVote,
      EmpathyMapResponse,
      ProblemDefinitionResponse,
      ChallengeDefinitionResponse,
      IdeationIdea,
      IdeationPoint,
    ]),
  ],
  controllers: [MetricsController],
  providers: [MetricsService, UserVoteService],
  exports: [MetricsService],
})
export class MetricsModule {}
