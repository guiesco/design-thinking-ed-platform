import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpathyMapService } from './empathy-map.service';
import { EmpathyMapController } from './empathy-map.controller';
import { EmpathyMap } from './entities/empathy-map.entity';
import { EmpathyMapResponse } from './entities/empathy-map-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmpathyMap, EmpathyMapResponse])],
  controllers: [EmpathyMapController],
  providers: [EmpathyMapService],
  exports: [EmpathyMapService],
})
export class EmpathyMapModule {}
