import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemDefinitionController } from './problem-definition.controller';
import { ProblemDefinitionService } from './problem-definition.service';
import { ProblemDefinitionResponse } from './entities/problem-definition-response.entity';
import { UserVoteModule } from '../user-vote/user-vote.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProblemDefinitionResponse]),
    UserVoteModule,
  ],
  controllers: [ProblemDefinitionController],
  providers: [ProblemDefinitionService],
  exports: [ProblemDefinitionService],
})
export class ProblemDefinitionModule {}
