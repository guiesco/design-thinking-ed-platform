import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
})
export class ProjectModule {}
