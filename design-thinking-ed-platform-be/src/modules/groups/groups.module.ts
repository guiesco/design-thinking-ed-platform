import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsEntity } from './entities/group.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([GroupsEntity]), UserModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
