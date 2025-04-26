import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeationIdea } from './entities/ideation-idea.entity';
import { IdeationPoint } from './entities/ideation-point.entity';
import { UserVoteModule } from '../user-vote/user-vote.module';
import { IdeationController } from './ideation.controller';
import { IdeationService } from './ideation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IdeationIdea, IdeationPoint]),
    UserVoteModule,
  ],
  controllers: [IdeationController],
  providers: [IdeationService],
  exports: [IdeationService],
})
export class IdeationModule {}
