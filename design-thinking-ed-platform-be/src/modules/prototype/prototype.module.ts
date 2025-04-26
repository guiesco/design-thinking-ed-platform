import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prototype } from './entities/prototype.entity';
import { PrototypeService } from './prototype.service';
import { PrototypeController } from './prototype.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Prototype])],
  controllers: [PrototypeController],
  providers: [PrototypeService],
  exports: [PrototypeService],
})
export class PrototypeModule {}
