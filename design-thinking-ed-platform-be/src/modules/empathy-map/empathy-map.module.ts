import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpathyMapService } from './empathy-map.service';
import { EmpathyMapController } from './empathy-map.controller';
import { EmpathyMap } from './entities/empathy-map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmpathyMap])],
  controllers: [EmpathyMapController],
  providers: [EmpathyMapService],
  exports: [EmpathyMapService],
})
export class EmpathyMapModule {}
