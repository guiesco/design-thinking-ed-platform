import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { UserModule } from '../user/user.module';
import { ProjectEntity } from '../project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, ProjectEntity]), UserModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
