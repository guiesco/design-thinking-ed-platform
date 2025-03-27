import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVote } from './entities/user-vote.entity';
import { UserVoteService } from './user-vote.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserVote])],
  providers: [UserVoteService],
  exports: [UserVoteService],
})
export class UserVoteModule {}
