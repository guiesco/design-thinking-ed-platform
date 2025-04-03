import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChallengeDefinitionResponse } from './entities/challenge-definition-response.entity';
import { UserVoteModule } from '../user-vote/user-vote.module';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';
import { ChallengeDefinitionController } from './challenge-definition.controller';
import { ChallengeDefinitionService } from './challenge-definition.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChallengeDefinitionResponse]),
    UserVoteModule,
    UserModule,
    ProjectModule,
  ],
  controllers: [ChallengeDefinitionController],
  providers: [ChallengeDefinitionService],
  exports: [ChallengeDefinitionService],
})
export class ChallengeDefinitionModule {}
