import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVoteService } from './user-vote.service';
import { UserVote } from './entities/user-vote.entity';
import { UserModule } from '../user/user.module';
import { EmpathyMapModule } from '../empathy-map/empathy-map.module';
import { ChallengeDefinitionModule } from '../challenge-definition/challenge-definition.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserVote]), UserModule],
  providers: [UserVoteService],
  exports: [UserVoteService],
})
export class UserVoteModule {}
