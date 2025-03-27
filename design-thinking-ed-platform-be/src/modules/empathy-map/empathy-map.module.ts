import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpathyMapController } from './empathy-map.controller';
import { EmpathyMapService } from './empathy-map.service';
import { EmpathyMap } from './entities/empathy-map.entity';
import { EmpathyMapResponse } from './entities/empathy-map-response.entity';
import { UserVoteModule } from '../user-vote/user-vote.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmpathyMap, EmpathyMapResponse]),
    UserVoteModule,
  ],
  controllers: [EmpathyMapController],
  providers: [EmpathyMapService],
  exports: [EmpathyMapService],
})
export class EmpathyMapModule {}
