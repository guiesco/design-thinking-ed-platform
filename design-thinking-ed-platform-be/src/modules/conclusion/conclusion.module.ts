import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conclusion } from './entities/conclusion.entity';
import { ConclusionService } from './conclusion.service';
import { ConclusionController } from './conclusion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Conclusion])],
  controllers: [ConclusionController],
  providers: [ConclusionService],
  exports: [ConclusionService],
})
export class ConclusionModule {}
