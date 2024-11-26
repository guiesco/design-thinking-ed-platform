import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from './modules/class/class.module';
import { UserEntity } from './modules/user/entities/user.entity';
import { ClassEntity } from './modules/class/entities/class.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'dtep',
      username: 'dtep',
      entities: [UserEntity, ClassEntity],
      database: 'dtep',
      synchronize: true,
      logging: true,
    }),
    ClassModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
