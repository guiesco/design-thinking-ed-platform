import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ClassEntity } from '../class/entities/class.entity';
import { MailModule } from '../mail/mail.module';
import { ClassService } from '../class/class.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ClassEntity]), MailModule],
  controllers: [UserController],
  providers: [UserService, ClassService],
  exports: [UserService],
})
export class UserModule { }
